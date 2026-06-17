"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { playTick } from "@/lib/tickSound";
import styles from "./PageRows.module.css";

const SWATCH_COUNT = 24;

export function PageRow8() {
  const { theme } = useTheme();
  const { row8, hexColor } = theme.pageColors;

  return (
    <div className={`${styles.row} ${styles.row8}`}>
      {Array.from({ length: SWATCH_COUNT }, (_, i) => {
        const bg = row8[i] ?? "#fff0cc";
        return (
          <motion.div
            key={i}
            className={styles.row8Cell}
            style={{ backgroundColor: bg }}
            animate={{ backgroundColor: bg }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i / SWATCH_COUNT) * 0.4 }}
            onMouseEnter={playTick}
          />
        );
      })}
    </div>
  );
}
