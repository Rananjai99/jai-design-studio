"use client";
/**
 * Row 6 — Solid colour cells. 8 cols landing / 24 cols home. No border.
 * Landing keeps the merged logo zone (cols 5–8 open). Home is a full run of 24
 * independent cells, each its exact theme.home.row6 hex (no merge).
 */
import React from "react";
import { motion } from "framer-motion";
import { CanvasPage, CANVAS } from "./WorkingCanvas";
import { playTick } from "@/lib/tickSound";
import { useTheme } from "@/context/ThemeContext";
import styles from "./CanvasRows.module.css";

function segmentsWithMerge(cols: number, mergeStart: number, mergeSpan: number) {
  const segs: Array<{ start: number; span: number }> = [];
  for (let i = 0; i < cols; ) {
    if (i === mergeStart) { segs.push({ start: i, span: mergeSpan }); i += mergeSpan; }
    else { segs.push({ start: i, span: 1 }); i += 1; }
  }
  return segs;
}

export function CanvasRow6({ page, cols: colsProp }: { page: CanvasPage; cols?: number }) {
  const { theme, isOnLanding } = useTheme();
  const cols = colsProp ?? (page === "landing" ? CANVAS.ROW6_COLS_LANDING : CANVAS.ROW6_COLS_HOME);

  if (page === "landing") {
    // Landing retains the merged logo zone (cols 5–8 open).
    const segments = segmentsWithMerge(cols, 4, 4);
    return (
      <div className={`${styles.row} ${styles.row6} ${styles.landing}`}>
        {segments.map((seg) => {
          const merged = seg.span > 1;
          const colour = merged ? "#fff0cc" : (theme.row6[seg.start % theme.row6.length] ?? "#fff0cc");
          return (
            <motion.div
              key={seg.start}
              className={`${styles.solidCell} ${merged ? styles.mergedCell : ""}`}
              style={{ backgroundColor: colour, gridColumn: `span ${seg.span}` }}
              animate={{ backgroundColor: colour }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: ((seg.start + seg.span / 2) / cols) * CANVAS.WAVE }}
              onMouseEnter={merged ? undefined : playTick}
            />
          );
        })}
      </div>
    );
  }

  // HOME — 24 independent solid cells, each its exact theme.home.row6 hex.
  const palette = theme.home?.row6 ?? theme.row6;
  return (
    <div className={`${styles.row} ${styles.row6} ${styles.home}`}>
      {Array.from({ length: cols }).map((_, i) => {
        const colour = palette[i] ?? "#fff0cc";
        return (
          <motion.div
            key={i}
            className={styles.solidCell}
            style={{ backgroundColor: colour }}
            animate={{ backgroundColor: colour, opacity: isOnLanding ? 0 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: ((i + 0.5) / cols) * CANVAS.WAVE }}
            onMouseEnter={i >= 4 && i <= 7 ? undefined : playTick}
          />
        );
      })}
    </div>
  );
}
