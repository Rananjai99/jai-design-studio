"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { playTick } from "@/lib/tickSound";
import styles from "./PageRows.module.css";

const MAX_PHOTOS = 4; // placeholder count — replace when real photos are wired up

const SWATCH_UNIT = 2480 / 24;
const SELECTED_W  = SWATCH_UNIT * 20;
const COLLAPSED_W = (SWATCH_UNIT * 4) / 5;
const NATURAL_W   = 2480 / 6;

const EASE = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

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

interface PageRow37Props {
  hoveredCol: number | null;
  onColEnter: (col: number) => void;
  onColLeave: () => void;
  selectedProject: number | null;
  onProjectClick: (col: number) => void;
  /** Suppresses the in-cell photo while the page-level flying photo is animating. */
  isFlyActive?: boolean;
}

export function PageRow37({ hoveredCol, onColEnter, onColLeave, selectedProject, onProjectClick, isFlyActive }: PageRow37Props) {
  const { theme } = useTheme();
  const { row37, hexColor } = theme.pageColors;

  const [photoIndex, setPhotoIndex] = useState(0);

  // Reset photo index when selected project changes
  useEffect(() => { setPhotoIndex(0); }, [selectedProject]);

  const isAnySelected = selectedProject !== null;

  return (
    <div className={`${styles.row} ${styles.row37}`}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const bg = row37[i] ?? "#fff0cc";
        const isThisSelected = isAnySelected && i === selectedProject;
        const isHovered = hoveredCol === i && !isThisSelected;
        const targetLeft  = cellLeft(i, selectedProject);
        const targetWidth = cellWidth(i, selectedProject);

        return (
          <motion.div
            key={i}
            className={`${styles.row37Cell}${isAnySelected ? ` ${styles.row37CellBordered}` : ''}`}
            style={{
              position: "absolute",
              top: 0, height: "100%",
              overflow: "hidden",
              boxShadow: isHovered ? "0 0 28px 6px rgba(0,0,0,0.45)" : undefined,
              clipPath: isHovered ? "inset(0px -40px -40px -40px)" : undefined,
              zIndex: isThisSelected || isHovered ? 10 : 6 - i,
              borderLeft: isThisSelected ? "var(--bw) solid #1a1a1a" : undefined,
            }}
            animate={{ left: targetLeft, width: targetWidth + 1, backgroundColor: bg }}
            transition={isFlyActive ? { ...EASE, delay: 0.18 } : EASE}
            onMouseEnter={() => { onColEnter(i); playTick(); }}
            onMouseLeave={onColLeave}
            onClick={() => onProjectClick(i)}
          >
            <AnimatePresence>
              {/* Hide while the page-level flying photo is animating; fade in after. */}
              {isThisSelected && !isFlyActive && (
                <motion.div
                  key={`photo-${i}`}
                  className={styles.photoContent}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={e => e.stopPropagation()}
                  style={{ pointerEvents: "auto" }}
                >
                  {/* Left arrow — only shown past the first photo */}
                  {photoIndex > 0 && (
                    <button
                      className={`${styles.photoArrow} ${styles.photoArrowLeft}`}
                      onClick={e => { e.stopPropagation(); setPhotoIndex(p => p - 1); }}
                      aria-label="Previous photo"
                    >
                      <svg viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="30,5 10,30 30,55" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}

                  <div className={styles.photoRect} style={{ backgroundColor: hexColor }} />

                  {/* Right arrow — always shown (more photos available) */}
                  {photoIndex < MAX_PHOTOS - 1 && (
                    <button
                      className={`${styles.photoArrow} ${styles.photoArrowRight}`}
                      onClick={e => { e.stopPropagation(); setPhotoIndex(p => p + 1); }}
                      aria-label="Next photo"
                    >
                      <svg viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="10,5 30,30 10,55" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
