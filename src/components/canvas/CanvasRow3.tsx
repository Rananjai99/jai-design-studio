"use client";
/**
 * Row 3 — Colour hex codes and names.
 * Landing: 8 cols, shows 4 labels (first 4 of active theme)
 * Home: 24 cols, shows all labels — expands during pan animation
 */
import React from "react";
import { motion } from "framer-motion";
import { CanvasPage, CANVAS } from "./WorkingCanvas";
import { useTheme } from "@/context/ThemeContext";
import styles from "./CanvasRows.module.css";

export function CanvasRow3({ page }: { page: CanvasPage }) {
  const { theme } = useTheme();
  const cols = page === "landing" ? CANVAS.ROW3_COLS_LANDING : CANVAS.ROW3_COLS_HOME;
  const visibleLabels = page === "landing" ? 4 : 24;

  return (
    <div className={`${styles.row} ${styles.row3} ${styles[page]}`}>
      {Array.from({ length: cols }).map((_, i) => {
        const label = theme.row3Labels[i];
        const showLabel = i < visibleLabels && label;
        return (
          <div key={i} className={`${styles.cell} ${styles.row3Cell}`}>
            {showLabel && (
              <motion.div
                className={styles.row3Label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <span className={`${styles.hexCode} montserrat`}>{label[0]}</span>
                {label[1] && <span className={`${styles.colourName} montserrat`}>{label[1]}</span>}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
