"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { playTick } from "@/lib/tickSound";
import styles from "./PageRows.module.css";

const CANVAS_W    = 2480;
const CANVAS_H    = 1450;
const SWATCH_UNIT = CANVAS_W / 24;
const SELECTED_W  = SWATCH_UNIT * 20;
const COLLAPSED_W = (SWATCH_UNIT * 4) / 5;
const NATURAL_W   = CANVAS_W / 6;
const OFFSET      = 48; // canvas margin in px

// Lightbox frame constants (all in screen px)
const FRAME_PX      = 15;  // outer frame border
const CONTENT_INSET = 40;  // total mat padding from canvas edge to photo area
const MAT_BEVEL     = 10;  // how many px the mat lip overlaps the photo on each side
const LABEL_GAP_PX  = 16;  // gap between photo right edge and museum label

const EASE = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };
const HERO = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

function cellLeft(i: number, sel: number | null): number {
  if (sel === null) return i * NATURAL_W;
  if (i === sel) return 0;
  const j = i < sel ? i : i - 1;
  return SELECTED_W + j * COLLAPSED_W;
}
function cellWidth(i: number, sel: number | null): number {
  if (sel === null) return NATURAL_W;
  return i === sel ? SELECTED_W : COLLAPSED_W;
}

interface ProjectMedia { cover?: string; photos: string[]; }

interface PageRow37Props {
  hoveredCol: number | null;
  onColEnter: (col: number) => void;
  onColLeave: () => void;
  selectedProject: number | null;
  onProjectClick: (col: number) => void;
  isFlyActive?: boolean;
  media?: Record<number, ProjectMedia>;
  canvasScale: number;
}

function ChevronLeft({ color = "#1a1a1a", size = 40 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="30,5 10,30 30,55" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ChevronRight({ color = "#1a1a1a", size = 40 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="10,5 30,30 10,55" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

interface HeroData {
  fromRect: { top: number; left: number; width: number; height: number };
  aspectRatio: number;
  key: number;
}

export function PageRow37({ hoveredCol, onColEnter, onColLeave, selectedProject, onProjectClick, isFlyActive, media, canvasScale }: PageRow37Props) {
  const { theme } = useTheme();
  const { row37, hexColor } = theme.pageColors;

  const [photoIndex, setPhotoIndex]     = useState(0);
  const [photoHidden, setPhotoHidden]   = useState(false);
  const [heroData, setHeroData]         = useState<HeroData | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxClosing, setLightboxClosing] = useState(false);
  const heroKeyRef = useRef(0);

  // Track which column was selected before the fly started.
  // Only updated when fly is NOT active, so during a switch it still holds the OLD selection.
  const prevSelectedRef = useRef<number | null>(null);
  useEffect(() => {
    if (!isFlyActive) prevSelectedRef.current = selectedProject;
  }, [isFlyActive, selectedProject]);

  // True for exactly the one render where the fly just completed.
  // Used to mount the NEW project's content instantly (no fade-in delay).
  const prevIsFlyActiveRef = useRef(false);
  const justFinishedFly = prevIsFlyActiveRef.current && !isFlyActive && selectedProject !== null;
  prevIsFlyActiveRef.current = !!isFlyActive;

  // Keep a ref for maxPhotos so the keyboard handler is always current
  const maxPhotosRef = useRef(0);

  useEffect(() => {
    setPhotoIndex(0);
    setPhotoHidden(false);
    setHeroData(null);
    setLightboxOpen(false);
    setLightboxClosing(false);
  }, [selectedProject]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedProject === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  setPhotoIndex(p => Math.max(0, p - 1));
      if (e.key === "ArrowRight") setPhotoIndex(p => Math.min(maxPhotosRef.current - 1, p + 1));
      if (e.key === "Escape")     closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedProject]); // eslint-disable-line

  // Begin closing — AnimatePresence exit animation plays, then onExitComplete fires
  const closeLightbox = useCallback(() => {
    setLightboxClosing(true);
  }, []);

  // Called by AnimatePresence after exit animation finishes
  const finishClose = useCallback(() => {
    setLightboxOpen(false);
    setLightboxClosing(false);
    setHeroData(null);
    setPhotoHidden(false);
  }, []);

  const openLightbox = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    const img = e.currentTarget as HTMLImageElement;
    const rect = img.getBoundingClientRect();
    // Use natural dims if loaded, else fall back to rendered rect ratio
    const ar = img.naturalWidth && img.naturalHeight
      ? img.naturalWidth / img.naturalHeight
      : rect.width / rect.height || 1;
    heroKeyRef.current += 1;
    setPhotoHidden(true);
    setHeroData({
      fromRect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      aspectRatio: ar,
      key: heroKeyRef.current,
    });
    setLightboxOpen(true);
  }, []);

  const isAnySelected = selectedProject !== null;
  const selectedPhotos = selectedProject !== null ? (media?.[selectedProject]?.photos ?? []) : [];
  maxPhotosRef.current = selectedPhotos.length;

  const csW = CANVAS_W * canvasScale;
  const csH = CANVAS_H * canvasScale;

  // Photo always fills the full mat height; width follows aspect ratio (mat lip clips excess width).
  const photoMaxW = csW - 2 * CONTENT_INSET;
  const photoMaxH = csH - 2 * CONTENT_INSET;
  const lightboxFinal = heroData ? (() => {
    const finalH = photoMaxH;
    const finalW = finalH * heroData.aspectRatio;
    return {
      top:    OFFSET + CONTENT_INSET,
      left:   OFFSET + CONTENT_INSET + (photoMaxW - finalW) / 2,
      width:  finalW,
      height: finalH,
    };
  })() : null;

  const arrowBtn: React.CSSProperties = {
    background: "none", border: "none", cursor: "pointer",
    padding: "0 16px", display: "flex", alignItems: "center",
    flexShrink: 0, pointerEvents: "auto",
  };

  return (
    <>
      <div className={`${styles.row} ${styles.row37}`}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const bg             = row37[i] ?? "#fff0cc";
          const isThisSelected = isAnySelected && i === selectedProject;
          const isHovered      = hoveredCol === i && !isThisSelected;
          const targetLeft     = cellLeft(i, selectedProject);
          const targetWidth    = cellWidth(i, selectedProject);
          const projectMedia   = media?.[i];
          const carouselPhotos = projectMedia?.photos ?? [];
          const maxPhotos      = carouselPhotos.length;

          // Keep old project's content visible throughout the fly (column collapses beneath it).
          // Only hide it once the fly finishes and B's content is already mounted at opacity 1.
          const wasThisSelected = !!isFlyActive && i === prevSelectedRef.current;
          const showContent = (isThisSelected && !isFlyActive) || wasThisSelected;

          return (
            <motion.div
              key={i}
              className={`${styles.row37Cell}${isAnySelected ? ` ${styles.row37CellBordered}` : ''}`}
              style={{
                position: "absolute", top: 0, height: "100%", overflow: "hidden",
                boxShadow: isHovered ? "0 0 28px 6px rgba(0,0,0,0.45)" : undefined,
                clipPath:  isHovered ? "inset(0px -40px -40px -40px)" : undefined,
                zIndex: isThisSelected || isHovered ? 10 : 6 - i,
                borderLeft: isThisSelected ? "var(--bw) solid #1a1a1a" : undefined,
              }}
              animate={{ left: targetLeft, width: targetWidth + 1, backgroundColor: bg }}
              transition={isFlyActive ? { ...EASE, delay: 0.18 } : EASE}
              onMouseEnter={() => { onColEnter(i); playTick(); }}
              onMouseLeave={onColLeave}
              onClick={() => onProjectClick(i)}
            >
              {/* Cover — unselected state */}
              {!isThisSelected && projectMedia?.cover && (
                <img
                  src={projectMedia.cover} alt=""
                  style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover", display: "block", pointerEvents: "none",
                    objectPosition: (i === 1 && isAnySelected && selectedProject !== null && i > selectedProject)
                      ? "calc(50% + 40px) 50%"
                      : (i === 0 && isAnySelected && selectedProject !== 0)
                      ? "calc(50% - 25px) 50%"
                      : "50% 50%",
                    transform: i === 1 ? "scale(1.5)" : undefined,
                    transformOrigin: "center center",
                  }}
                />
              )}

              {/* Full-bleed background photo — waits for column to finish expanding,
                  then fades in without overlay; overlay + fg follow together */}
              {/* Background photo — re-mounts on photo change */}
              <AnimatePresence>
                {showContent && carouselPhotos[photoIndex] && (
                  <motion.img
                    key={`bgphoto-${i}-${photoIndex}`}
                    src={carouselPhotos[photoIndex]} alt=""
                    initial={{ opacity: justFinishedFly ? 1 : 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    transition={{ duration: 0.35, delay: justFinishedFly ? 0 : EASE.duration }}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
                  />
                )}
              </AnimatePresence>

              {/* Colour overlay — persists across photo changes, no re-mount delay */}
              <AnimatePresence>
                {showContent && (
                  <motion.div
                    key={`bgoverlay-${i}`}
                    initial={{ opacity: justFinishedFly ? 0.5 : 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    transition={{ duration: 0.5, delay: justFinishedFly ? 0 : EASE.duration + 0.35 }}
                    style={{ position: "absolute", inset: 0, backgroundColor: bg, pointerEvents: "none" }}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showContent && (
                  <motion.div
                    key={`photo-${i}`}
                    className={styles.photoContent}
                    initial={{ opacity: justFinishedFly ? 1 : 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.5, delay: justFinishedFly ? 0 : EASE.duration + 0.35 } }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                    onClick={e => e.stopPropagation()}
                    style={{ pointerEvents: wasThisSelected ? "none" : "auto" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "75%" }}>

                      <button
                        style={{ ...arrowBtn, visibility: (photoIndex > 0 && !photoHidden) ? "visible" : "hidden" }}
                        onClick={e => { e.stopPropagation(); setPhotoIndex(p => Math.max(0, p - 1)); }}
                        aria-label="Previous photo"
                      >
                        <ChevronLeft size={25} />
                      </button>

                      {carouselPhotos[photoIndex] ? (
                        <img
                          src={carouselPhotos[photoIndex]} alt=""
                          style={{
                            maxHeight: "100%", maxWidth: "calc(100% - 160px)",
                            objectFit: "contain", display: "block",
                            cursor: "zoom-in", flexShrink: 1,
                            // Hide while hero animation is flying
                            opacity: photoHidden && i === selectedProject ? 0 : 1,
                            transition: "opacity 0s",
                          }}
                          onClick={openLightbox}
                        />
                      ) : (
                        <div style={{ flex: 1, height: "100%", backgroundColor: hexColor }} />
                      )}

                      <button
                        style={{ ...arrowBtn, visibility: (photoIndex < maxPhotos - 1 && !photoHidden) ? "visible" : "hidden" }}
                        onClick={e => { e.stopPropagation(); setPhotoIndex(p => Math.min(maxPhotos - 1, p + 1)); }}
                        aria-label="Next photo"
                      >
                        <ChevronRight size={25} />
                      </button>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox — portal into document.body to escape the canvas CSS transform */}
      {lightboxOpen && heroData && lightboxFinal && selectedProject !== null && createPortal(
        <AnimatePresence onExitComplete={finishClose}>
          {!lightboxClosing && (
            <>
              {/* 1. Desaturated backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ position: "fixed", inset: 0, zIndex: 9996, backdropFilter: "saturate(0) brightness(0.35)", WebkitBackdropFilter: "saturate(0) brightness(0.35)" }}
                onClick={closeLightbox}
              />

              {/* 2. Frame border + warm mat surface */}
              <motion.div
                key="canvas-bg"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "fixed", top: OFFSET, left: OFFSET, width: csW, height: csH,
                  backgroundColor: "#f5f2ed",
                  border: `${FRAME_PX}px solid #1a1a1a`,
                  boxSizing: "border-box",
                  boxShadow: "0 8px 48px rgba(0,0,0,0.6), inset -24px 0 40px rgba(0,0,0,0.18), inset 0 -24px 40px rgba(0,0,0,0.18)",
                  zIndex: 9997, pointerEvents: "none",
                }}
              />

              {/* 3. Photo — sits behind the mat lip (lower z than mat strips) */}
              <motion.img
                key={`hero-${heroData.key}`}
                src={selectedPhotos[photoIndex]}
                alt=""
                initial={heroData.fromRect}
                animate={lightboxFinal}
                exit={heroData.fromRect}
                transition={HERO}
                style={{ position: "fixed", zIndex: 9998, objectFit: "contain", display: "block", cursor: "zoom-out" }}
                onClick={closeLightbox}
                onLoad={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  if (img.naturalWidth && img.naturalHeight) {
                    const newAR = img.naturalWidth / img.naturalHeight;
                    setHeroData(prev => prev ? { ...prev, aspectRatio: newAR } : null);
                  }
                }}
              />

              {/* 5. Mat lip strips — overlap photo edges by MAT_BEVEL, same colour as mat */}
              {(() => {
                const { top: pt, left: pl, width: pw, height: ph } = lightboxFinal;
                const matTop  = OFFSET + FRAME_PX, matLeft = OFFSET + FRAME_PX;
                const matW    = csW - 2 * FRAME_PX, matH = csH - 2 * FRAME_PX;
                const bevel   = MAT_BEVEL;
                const bg      = "#f5f2ed";
                const z       = 9999;
                const base: React.CSSProperties = { position: "fixed", backgroundColor: bg, zIndex: z, pointerEvents: "none" };
                return (
                  <motion.div key="mat-strips" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} style={{ position: "fixed", inset: 0, zIndex: z, pointerEvents: "none" }}>
                    {/* top strip */}
                    <div style={{ ...base, top: matTop, left: matLeft, width: matW, height: pt - matTop + bevel }} />
                    {/* bottom strip */}
                    <div style={{ ...base, top: pt + ph - bevel, left: matLeft, width: matW, height: matTop + matH - (pt + ph - bevel) }} />
                    {/* left strip (between top and bottom) */}
                    <div style={{ ...base, top: pt + bevel, left: matLeft, width: pl - matLeft + bevel, height: ph - 2 * bevel }} />
                    {/* right strip */}
                    <div style={{ ...base, top: pt + bevel, left: pl + pw - bevel, width: matLeft + matW - (pl + pw - bevel), height: ph - 2 * bevel }} />
                  </motion.div>
                );
              })()}

              {/* 6. Mat cut bevel — 45° mitered corners, white top/left face, dark bottom/right face */}
              {(() => {
                const { top: pt, left: pl, width: pw, height: ph } = lightboxFinal;
                const B  = MAT_BEVEL; // mat lip thickness (10px)
                const BW = 3;         // visible bevel face width (px)
                const W  = pw, H = ph;
                const white = "#ffffff";
                const dark  = "rgba(55,55,55,0.7)";
                return (
                  <motion.div
                    key="mat-cut-bevel"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ position: "fixed", top: pt, left: pl, width: W, height: H, zIndex: 10000, pointerEvents: "none" }}
                  >
                    <svg width={W} height={H} style={{ display: "block" }}>
                      {/* White top — on mat surface, inner edge at y=B (photo boundary), 45° miter at top-right */}
                      <polygon points={`${B-BW},${B-BW} ${W-B+BW},${B-BW} ${W-B},${B} ${B},${B}`} fill={white} />
                      {/* White left — on mat surface, inner edge at x=B, 45° miter at bottom-left */}
                      <polygon points={`${B-BW},${B-BW} ${B},${B} ${B},${H-B} ${B-BW},${H-B+BW}`} fill={white} />
                      {/* Dark bottom — on mat surface, inner edge at y=H-B, 45° miter at bottom-left */}
                      <polygon points={`${B},${H-B} ${W-B},${H-B} ${W-B+BW},${H-B+BW} ${B-BW},${H-B+BW}`} fill={dark} />
                      {/* Dark right — on mat surface, inner edge at x=W-B, 45° miter at top-right */}
                      <polygon points={`${W-B},${B} ${W-B+BW},${B-BW} ${W-B+BW},${H-B+BW} ${W-B},${H-B}`} fill={dark} />
                    </svg>
                  </motion.div>
                );
              })()}

              {/* 7. Museum label — outside canvas, bottom-right of viewport */}
              {lightboxFinal && (
                <motion.div
                  key="museum-label"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: HERO.duration }}
                  style={{
                    position: "fixed",
                    bottom: OFFSET,
                    right:  OFFSET,
                    zIndex: 10001, pointerEvents: "none",
                    display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6,
                  }}
                >
                  <div style={{ width: 24, height: 1, backgroundColor: "#f5f2ed", marginBottom: 2 }} />
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#f5f2ed", lineHeight: 1.4, textAlign: "right" }}>
                    Project Title
                  </div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: "0.06em", color: "rgba(245,242,237,0.55)", lineHeight: 1.6, textAlign: "right" }}>
                    Year · Location or medium
                  </div>
                </motion.div>
              )}

              {/* 8. Arrows — on the mat surface beside the photo window */}
              <motion.div
                key="arrow-left"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ delay: HERO.duration, duration: 0.15 }}
                style={{
                  position: "fixed", zIndex: 10001,
                  top: lightboxFinal.top + lightboxFinal.height / 2,
                  left: lightboxFinal.left - MAT_BEVEL,
                  transform: "translate(-100%, -50%)",
                  pointerEvents: photoIndex > 0 ? "auto" : "none",
                }}
              >
                <button style={{ ...arrowBtn, visibility: photoIndex > 0 ? "visible" : "hidden" }} onClick={() => setPhotoIndex(p => Math.max(0, p - 1))} aria-label="Previous photo">
                  <ChevronLeft color="#1a1a1a" size={25} />
                </button>
              </motion.div>

              <motion.div
                key="arrow-right"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ delay: HERO.duration, duration: 0.15 }}
                style={{
                  position: "fixed", zIndex: 10001,
                  top: lightboxFinal.top + lightboxFinal.height / 2,
                  left: lightboxFinal.left + lightboxFinal.width - MAT_BEVEL,
                  transform: "translateY(-50%)",
                  pointerEvents: photoIndex < selectedPhotos.length - 1 ? "auto" : "none",
                }}
              >
                <button style={{ ...arrowBtn, visibility: photoIndex < selectedPhotos.length - 1 ? "visible" : "hidden" }} onClick={() => setPhotoIndex(p => Math.min(selectedPhotos.length - 1, p + 1))} aria-label="Next photo">
                  <ChevronRight color="#1a1a1a" size={25} />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
