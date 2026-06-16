"use client";
/** Row 2 — Fine grid (16 cols landing / 48 cols home). Border only, no fill colour. */
import React from "react";
import { motion } from "framer-motion";
import { CanvasPage, CANVAS } from "./WorkingCanvas";
import { useTheme } from "@/context/ThemeContext";
import styles from "./CanvasRows.module.css";

export function CanvasRow2({ page, cols: colsProp }: { page: CanvasPage; cols?: number }) {
  const { isOnLanding } = useTheme();
  const cols = colsProp ?? (page === "landing" ? CANVAS.ROW2_COLS_LANDING : CANVAS.ROW2_COLS_HOME);
  const isHome = page === "home";
  return (
    <div
      className={`${styles.row} ${styles.row2} ${styles[page]}`}
      style={page === "home" ? { gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined}
    >
      {Array.from({ length: cols }).map((_, i) => (
        // Home grid cells reveal left→right (staggered by column) when the home
        // page is entered; landing cells render statically.
        <motion.div
          key={i}
          className={styles.cell}
          animate={isHome ? { opacity: isOnLanding ? 0 : 1 } : undefined}
          transition={isHome ? { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: ((i + 0.5) / cols) * CANVAS.WAVE } : undefined}
        />
      ))}
    </div>
  );
}
