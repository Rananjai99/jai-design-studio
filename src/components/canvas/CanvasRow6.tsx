"use client";
/**
 * Row 6 — Solid colour cells. 8 cols landing / 24 cols home. No border.
 * Columns 5–8 (idx 4–7) are merged into a single cell on both pages.
 */
import React from "react";
import { motion } from "framer-motion";
import { CanvasPage, CANVAS } from "./WorkingCanvas";
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
  const { theme } = useTheme();
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
            />
          );
        })}
      </div>
    );
  }

  // HOME — 24 solid cells subdivided from the theme palette (the provided
  // Row 4+5 codes), 2 cells per colour, so the gradient runs dark→light to the
  // end. The logo zone (cols 5–8) is merged open and borderless; the colour just
  // after it is the primary (palette[2]), matching Row 4+5's block.
  const palette = theme.home?.row4_5 ?? theme.row4_5;
  const segments = segmentsWithMerge(cols, 4, 4);
  return (
    <div className={`${styles.row} ${styles.row6} ${styles.home}`}>
      {segments.map((seg) => {
        const merged = seg.span > 1;
        // Pre-gap: colours 0–1 (2 cells each). Post-gap: continue from the
        // primary (index 2) onward, 2 cells each, ending on the lightest.
        const idx = seg.start < 4 ? Math.floor(seg.start / 2) : 2 + Math.floor((seg.start - 8) / 2);
        const colour = merged ? "#fff0cc" : (palette[idx] ?? "#fff0cc");
        return (
          <motion.div
            key={seg.start}
            className={`${styles.solidCell} ${merged ? styles.mergedCell : ""}`}
            style={{ backgroundColor: colour, gridColumn: `span ${seg.span}` }}
            animate={{ backgroundColor: colour }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: ((seg.start + seg.span / 2) / cols) * CANVAS.WAVE }}
          />
        );
      })}
    </div>
  );
}
