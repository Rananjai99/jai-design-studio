"use client";
/** Row 7 — Solid colour cells. 16 cols landing / 48 cols home. No border. */
import React from "react";
import { motion } from "framer-motion";
import { CanvasPage, CANVAS } from "./WorkingCanvas";
import { useTheme } from "@/context/ThemeContext";
import styles from "./CanvasRows.module.css";

export function CanvasRow7({ page, cols: colsProp }: { page: CanvasPage; cols?: number }) {
  const { theme } = useTheme();
  const cols = colsProp ?? (page === "landing" ? CANVAS.ROW7_COLS_LANDING : CANVAS.ROW7_COLS_HOME);
  // Home colours are subdivided from the theme palette (the provided Row 4+5
  // codes) so the gradient runs dark→light to the end, aligned to Row 4+5's 12
  // columns (4 cells each).
  const homePalette = theme.home?.row4_5 ?? theme.row4_5;
  return (
    <div className={`${styles.row} ${styles.row7} ${styles[page]}`}>
      {Array.from({ length: cols }).map((_, i) => {
        let colour: string;
        if (page === "home") {
          // Which of Row 4+5's 12 columns this cell sits under, then the same
          // block/shift mapping: cols 3–5 are the primary (palette[2]); columns
          // after shift back by 2 so the row ends on the lightest colour.
          const c12 = Math.min(11, Math.floor((i * 12) / cols));
          const idx = c12 < 2 ? c12 : c12 <= 4 ? 2 : c12 - 2;
          colour = homePalette[idx] ?? "#fff0cc";
        } else {
          // Landing: cycle the palette so colour runs to the right edge.
          colour = theme.row7[i % theme.row7.length] ?? "#fff0cc";
        }
        return (
          <motion.div
            key={i} className={styles.solidCell}
            style={{ backgroundColor: colour }}
            animate={{ backgroundColor: colour }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: ((i + 0.5) / cols) * CANVAS.WAVE }}
          />
        );
      })}
    </div>
  );
}
