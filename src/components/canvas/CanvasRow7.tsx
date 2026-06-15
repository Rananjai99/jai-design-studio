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
  // Home uses its own 48-value palette; each cell is its exact theme.home.row7 hex.
  const homePalette = theme.home?.row7 ?? theme.row7;
  return (
    <div className={`${styles.row} ${styles.row7} ${styles[page]}`}>
      {Array.from({ length: cols }).map((_, i) => {
        let colour: string;
        if (page === "home") {
          colour = homePalette[i] ?? "#fff0cc";
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
