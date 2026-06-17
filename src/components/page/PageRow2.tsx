"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { playTick } from "@/lib/tickSound";
import styles from "./PageRows.module.css";

const PROJECT_COUNT = 6;

interface PageRow2Props {
  hoveredCol: number | null;
  onColEnter: (col: number) => void;
  onColLeave: () => void;
}

export function PageRow2({ hoveredCol, onColEnter, onColLeave }: PageRow2Props) {
  const { theme } = useTheme();
  const { row2 } = theme.pageColors;

  return (
    <div className={`${styles.row} ${styles.row2}`}>
      {Array.from({ length: PROJECT_COUNT }, (_, i) => {
        const bg = row2[i] ?? "#fff0cc";
        const active = hoveredCol === i;
        return (
          <motion.div
            key={i}
            className={styles.row2Cell}
            style={{
              backgroundColor: bg,
              boxShadow: active ? "0 0 28px 6px rgba(0,0,0,0.45)" : undefined,
              clipPath: active ? "inset(-40px -40px 0px -40px)" : undefined,
              zIndex: active ? 2 : undefined,
            }}
            animate={{ backgroundColor: bg }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => { onColEnter(i); playTick(); }}
            onMouseLeave={onColLeave}
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
