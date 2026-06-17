"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import styles from "./PageRows.module.css";

const PROJECT_COUNT = 6;

export function PageRow2() {
  const { theme } = useTheme();
  const { row2, labelColor, hexColor } = theme.pageColors;

  return (
    <div className={`${styles.row} ${styles.row2}`}>
      {Array.from({ length: PROJECT_COUNT }, (_, i) => {
        const bg = row2[i] ?? "#fff0cc";
        return (
          <motion.div
            key={i}
            className={styles.row2Cell}
            style={{ backgroundColor: bg }}
            animate={{ backgroundColor: bg }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i / PROJECT_COUNT) * 0.4 }}
          >
            <span className={`${styles.projectLabel} moon`} style={{ color: "#1a1a1a" }}>
              PROJECT {i + 1}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
