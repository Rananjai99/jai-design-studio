"use client";
/** Row 6 — Solid colour cells. 8 cols landing / 24 cols home. No border. */
import React from "react";
import { motion } from "framer-motion";
import { CanvasPage, CANVAS } from "./WorkingCanvas";
import { useTheme } from "@/context/ThemeContext";
import styles from "./CanvasRows.module.css";

export function CanvasRow6({ page }: { page: CanvasPage }) {
  const { theme } = useTheme();
  const cols = page === "landing" ? CANVAS.ROW6_COLS_LANDING : CANVAS.ROW6_COLS_HOME;
  return (
    <div className={`${styles.row} ${styles.row6} ${styles[page]}`}>
      {Array.from({ length: cols }).map((_, i) => (
        <motion.div
          key={i} className={styles.solidCell}
          style={{ backgroundColor: theme.row6[i] ?? "#fff0cc" }}
          animate={{ backgroundColor: theme.row6[i] ?? "#fff0cc" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.01 }}
        />
      ))}
    </div>
  );
}
