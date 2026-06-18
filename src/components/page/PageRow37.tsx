"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { playTick } from "@/lib/tickSound";
import styles from "./PageRows.module.css";

const SWATCH_UNIT = 2480 / 24;
const SELECTED_W  = SWATCH_UNIT * 20;
const COLLAPSED_W = (SWATCH_UNIT * 4) / 5;
const NATURAL_W   = 2480 / 6;
const ROW_37_H    = 906.25;

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

interface FlyState {
  key: number;
  color: string;
  fromX: number;
  fromW: number;
  toX: number;
  toW: number;
  y: number;
  h: number;
}

interface PageRow37Props {
  hoveredCol: number | null;
  onColEnter: (col: number) => void;
  onColLeave: () => void;
  selectedProject: number | null;
  onProjectClick: (col: number) => void;
}

export function PageRow37({ hoveredCol, onColEnter, onColLeave, selectedProject, onProjectClick }: PageRow37Props) {
  const { theme } = useTheme();
  const { row37, hexColor } = theme.pageColors;

  // Track previous selection and the current theme color via refs so the
  // fly-trigger effect only depends on selectedProject (not hexColor).
  const prevSelRef   = useRef<number | null>(null);
  const hexColorRef  = useRef(hexColor);
  const flyKeyRef    = useRef(0);
  const [flyState, setFlyState] = useState<FlyState | null>(null);

  // Keep hexColorRef current so the fly snapshot always uses the right color.
  useEffect(() => { hexColorRef.current = hexColor; }, [hexColor]);

  useEffect(() => {
    const prevSel = prevSelRef.current;
    prevSelRef.current = selectedProject;

    if (prevSel !== null && selectedProject !== null && prevSel !== selectedProject) {
      // Switching projects: fly the photo from the squeezed source position.
      const fromLeft = cellLeft(selectedProject, prevSel);
      flyKeyRef.current += 1;
      setFlyState({
        key:   flyKeyRef.current,
        color: hexColorRef.current,
        fromX: fromLeft + COLLAPSED_W * 0.125,
        fromW: COLLAPSED_W * 0.75,
        toX:   SELECTED_W * 0.125,
        toW:   SELECTED_W * 0.75,
        y:     ROW_37_H  * 0.125,
        h:     ROW_37_H  * 0.75,
      });

      // Fallback clear after animation duration + buffer.
      const timer = setTimeout(() => setFlyState(null), 700);
      return () => clearTimeout(timer);
    }
  }, [selectedProject]);

  const isAnySelected = selectedProject !== null;
  const isFlyActive   = flyState !== null;

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
            transition={EASE}
            onMouseEnter={() => { onColEnter(i); playTick(); }}
            onMouseLeave={onColLeave}
            onClick={() => onProjectClick(i)}
          >
            <AnimatePresence>
              {/* Hide the in-cell photo while the flying photo is animating;
                  fade it in once the fly completes. */}
              {isThisSelected && !isFlyActive && (
                <motion.div
                  key={`photo-${i}`}
                  className={styles.photoContent}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.photoRect} style={{ backgroundColor: hexColor }} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Flying photo — absolutely positioned in Row 37, above all cells.
          Slides left and grows from the squeezed column to the expanded column. */}
      {flyState && (
        <motion.div
          key={flyState.key}
          style={{
            position:       "absolute",
            top:            flyState.y,
            left:           flyState.fromX,
            width:          flyState.fromW,
            height:         flyState.h,
            backgroundColor: flyState.color,
            zIndex:         20,
            pointerEvents:  "none",
          }}
          animate={{ left: flyState.toX, width: flyState.toW }}
          transition={EASE}
          onAnimationComplete={() => setFlyState(null)}
        />
      )}
    </div>
  );
}
