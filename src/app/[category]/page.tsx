"use client";
import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { PageRow1 } from "@/components/page/PageRow1";
import { PageRow2 } from "@/components/page/PageRow2";
import { PageRow37 } from "@/components/page/PageRow37";
import { PageRow8 } from "@/components/page/PageRow8";
import styles from "./page.module.css";

const CANVAS_W    = 2480;
const CANVAS_H    = 1450;
const OFFSET      = 48;
const ROW_H       = 181.25;            // 1 row
const ROW_37_H    = 5 * ROW_H;        // rows 3-7
const ROW_37_TOP  = 2 * ROW_H;        // rows 1+2 above
const SWATCH_UNIT = CANVAS_W / 24;
const SELECTED_W  = SWATCH_UNIT * 20;
const COLLAPSED_W = (SWATCH_UNIT * 4) / 5;

const PAGE_TITLES: Record<string, string> = {
  "urban-design":              "Urban Design",
  "architecture-interiors":    "Architecture & Interiors",
  "industrial-design":         "Industrial Design",
  "furniture-design":          "Furniture Design",
  "photography":               "Photography",
  "graphic-design":            "Graphic Design",
  "apparel-design":            "Apparel Design",
  "about":                     "About Us",
  "socials":                   "Socials",
};

/** Canvas-space left edge of project i when prevSel is the active project. */
function squeezedLeft(newSel: number, prevSel: number): number {
  const j = newSel < prevSel ? newSel : newSel - 1;
  return SELECTED_W + j * COLLAPSED_W;
}

interface FlyPhoto {
  key: number;
  color: string;
  /** Screen-space starting rect */
  fromLeft: number; fromTop: number; fromW: number; fromH: number;
  /** Screen-space destination (same top/height) */
  toLeft: number; toW: number;
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const router = useRouter();
  const { navigateToLanding, theme } = useTheme();
  const pageTitle = PAGE_TITLES[category];

  const [vp, setVp] = useState({ w: 1440, h: 900 });
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [flyPhoto, setFlyPhoto] = useState<FlyPhoto | null>(null);

  // Refs so the fly effect always has the latest values without re-running on every change
  const prevSelRef   = useRef<number | null>(null);
  const scaleRef     = useRef(1);
  const hexColorRef  = useRef(theme.pageColors.hexColor);
  const flyKeyRef    = useRef(0);

  useIsoLayoutEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scale   = (vp.h - 2 * OFFSET) / CANVAS_H;
  const scaledW = CANVAS_W * scale;
  const backLeft = OFFSET + scaledW + OFFSET;

  // Keep refs current
  useEffect(() => { scaleRef.current = scale; }, [scale]);
  useEffect(() => { hexColorRef.current = theme.pageColors.hexColor; }, [theme]);

  // Trigger flying photo when switching between open projects
  useEffect(() => {
    const prevSel = prevSelRef.current;
    prevSelRef.current = selectedProject;

    if (prevSel !== null && selectedProject !== null && prevSel !== selectedProject) {
      const s = scaleRef.current;

      // Canvas-space photo rect at the squeezed source position
      const srcColLeft = squeezedLeft(selectedProject, prevSel);
      const srcX = srcColLeft + COLLAPSED_W * 0.125;
      const srcY = ROW_37_TOP + ROW_37_H * 0.125;
      const srcW = COLLAPSED_W * 0.75;
      const srcH = ROW_37_H * 0.75;

      // Canvas-space photo rect at the expanded destination
      const dstX = SELECTED_W * 0.125;
      const dstW = SELECTED_W * 0.75;

      flyKeyRef.current += 1;
      setFlyPhoto({
        key:      flyKeyRef.current,
        color:    hexColorRef.current,
        fromLeft: OFFSET + srcX * s,
        fromTop:  OFFSET + srcY * s,
        fromW:    srcW * s,
        fromH:    srcH * s,
        toLeft:   OFFSET + dstX * s,
        toW:      dstW * s,
      });

      const timer = setTimeout(() => setFlyPhoto(null), 700);
      return () => clearTimeout(timer);
    }
  }, [selectedProject]);

  const onColEnter = useCallback((col: number) => setHoveredCol(col), []);
  const onColLeave = useCallback(() => setHoveredCol(null), []);
  const onProjectClick = useCallback((col: number) => {
    setSelectedProject(prev => (prev === col ? prev : col));
  }, []);
  const onDeselect = useCallback(() => setSelectedProject(null), []);

  if (!pageTitle) return notFound();

  return (
    <div className={styles.pageRoot} onClick={onDeselect}>
      <div className={styles.viewport}>
        <div
          className={styles.canvasPositioner}
          style={{
            transform: `translate(${OFFSET}px, ${OFFSET}px) scale(${scale})`,
            ["--canvas-scale" as string]: scale,
          }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ width: CANVAS_W, height: CANVAS_H }}>
            <div className={styles.shadow} aria-hidden="true">
              <div className={styles.shadowShape} />
            </div>
            <div className={styles.canvas}>
              <PageRow1 pageTitle={pageTitle} />
              <PageRow2
                hoveredCol={hoveredCol} onColEnter={onColEnter} onColLeave={onColLeave}
                selectedProject={selectedProject} onProjectClick={onProjectClick}
                isFlyActive={flyPhoto !== null}
              />
              <PageRow37
                hoveredCol={hoveredCol} onColEnter={onColEnter} onColLeave={onColLeave}
                selectedProject={selectedProject} onProjectClick={onProjectClick}
                isFlyActive={flyPhoto !== null}
              />
              <PageRow8 selectedProject={selectedProject} isFlyActive={flyPhoto !== null} />
            </div>
          </div>
        </div>

        {/* Flying photo — position:fixed so it escapes the canvas overflow:hidden
            and slides above every layer while the project switch animates. */}
        {flyPhoto && (
          <motion.div
            key={flyPhoto.key}
            initial={{ left: flyPhoto.fromLeft, width: flyPhoto.fromW }}
            animate={{ left: flyPhoto.toLeft,   width: flyPhoto.toW   }}
            style={{
              position:        "fixed",
              top:             flyPhoto.fromTop,
              height:          flyPhoto.fromH,
              backgroundColor: flyPhoto.color,
              zIndex:          9999,
              pointerEvents:   "none",
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => setFlyPhoto(null)}
          />
        )}

        {/* Nav buttons — screen-space, right of the canvas */}
        <button
          className={styles.backBtn}
          style={{ left: backLeft, top: OFFSET }}
          onClick={() => selectedProject !== null ? onDeselect() : router.back()}
        >
          ← Back
        </button>
        <button
          className={styles.backBtn}
          style={{ left: backLeft, top: OFFSET + 60 }}
          onClick={() => { navigateToLanding(); router.push("/"); }}
        >
          ⌂ First Page
        </button>
      </div>
    </div>
  );
}
