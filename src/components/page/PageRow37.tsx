"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { playTick } from "@/lib/tickSound";
import styles from "./PageRows.module.css";

const COL_COUNT = 6;

export function PageRow37() {
  const { theme } = useTheme();
  const { row37, hexColor } = theme.pageColors;

  return (
    <div className={`${styles.row} ${styles.row37}`}>
      {Array.from({ length: COL_COUNT }, (_, i) => {
        const bg = row37[i] ?? "#fff0cc";
        return (
          <motion.div
            key={i}
            className={styles.row37Cell}
            style={{ backgroundColor: bg }}
            animate={{ backgroundColor: bg }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i / COL_COUNT) * 0.4 }}
            onMouseEnter={playTick}
          />

        );
      })}
    </div>
  );
}
