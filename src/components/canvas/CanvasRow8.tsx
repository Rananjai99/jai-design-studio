"use client";
/** Row 8 — Full-width gradient bar. No border. Gradient matches theme Row 4+5 colours. */
import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import { CanvasPage } from "./WorkingCanvas";
import { useTheme } from "@/context/ThemeContext";
import styles from "./CanvasRows.module.css";

export function CanvasRow8({ page }: { page: CanvasPage }) {
  const { theme, isOnLanding } = useTheme();
  const isHome = page === "home";
  const stops = isHome ? (theme.home?.row8Gradient ?? theme.row8Gradient) : theme.row8Gradient;
  const gradientCSS = `linear-gradient(to right, ${stops.join(", ")})`;

  return (
    <div className={`${styles.row} ${styles.row8} ${styles[page]}`}>
      <motion.div
        className={styles.gradientBar}
        style={{ background: gradientCSS }}
        key={theme.id} // re-trigger animation on theme change
        // Home: wipe the gradient in left→right on home entry. Landing: fade in.
        initial={isHome ? { clipPath: "inset(0 100% 0 0)" } : { opacity: 0.6 }}
        animate={
          isHome
            ? { clipPath: isOnLanding ? "inset(0 100% 0 0)" : "inset(0 0 0 0)" }
            : { opacity: 1 }
        }
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
