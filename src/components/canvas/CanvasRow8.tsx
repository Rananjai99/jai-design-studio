"use client";
/** Row 8 — Full-width gradient bar. No border. Gradient matches theme Row 4+5 colours. */
import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import { CanvasPage } from "./WorkingCanvas";
import { useTheme } from "@/context/ThemeContext";
import styles from "./CanvasRows.module.css";

export function CanvasRow8({ page }: { page: CanvasPage }) {
  const { theme } = useTheme();
  const stops = theme.row8Gradient;
  const gradientCSS = `linear-gradient(to right, ${stops.join(", ")})`;

  return (
    <div className={`${styles.row} ${styles.row8} ${styles[page]}`}>
      <motion.div
        className={styles.gradientBar}
        style={{ background: gradientCSS }}
        key={theme.id} // re-trigger animation on theme change
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
}
