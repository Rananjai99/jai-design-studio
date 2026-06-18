"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { playTick } from "@/lib/tickSound";
import styles from "./PageRows.module.css";

const SWATCH_UNIT = 2480 / 24;
const SELECTED_W  = SWATCH_UNIT * 20;
const COLLAPSED_W = (SWATCH_UNIT * 4) / 5;
const HIGHLIGHT_W = SELECTED_W / 4;          // 5 swatch units
const NARROW_W    = COLLAPSED_W / 4;         // 1/5 swatch unit

const EASE = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

/** Left position of flat cell index in row 8 (0-23). */
function cellLeft(flatIdx: number, sel: number | null): number {
  const proj = Math.floor(flatIdx / 4);
  const h    = flatIdx % 4;
  if (sel === null) return flatIdx * SWATCH_UNIT;
  if (proj === sel) return h * HIGHLIGHT_W;
  const k = proj < sel ? proj : proj - 1;
  return SELECTED_W + (k * 4 + h) * NARROW_W;
}

/** Width of flat cell index in row 8 (0-23). */
function cellWidth(flatIdx: number, sel: number | null): number {
  if (sel === null) return SWATCH_UNIT;
  return Math.floor(flatIdx / 4) === sel ? HIGHLIGHT_W : NARROW_W;
}

interface PageRow8Props {
  selectedProject: number | null;
  isFlyActive?: boolean;
}

export function PageRow8({ selectedProject, isFlyActive }: PageRow8Props) {
  const { theme } = useTheme();
  const { row8 } = theme.pageColors;
  const labelColor = theme.id === "blue" ? theme.pageColors.labelColor : "#1a1a1a";

  return (
    <motion.div
      className={`${styles.row} ${styles.row8}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={EASE}
    >
      {Array.from({ length: 24 }, (_, flatIdx) => {
        const proj = Math.floor(flatIdx / 4);
        const h    = flatIdx % 4;
        const isHighlight = selectedProject !== null && proj === selectedProject;
        const bg = row8[flatIdx] ?? "#fff0cc";
        const targetLeft  = cellLeft(flatIdx, selectedProject);
        const targetWidth = cellWidth(flatIdx, selectedProject);

        return (
          <motion.div
            key={flatIdx}
            className={isHighlight ? styles.highlightCell : styles.row8Cell}
            style={{ position: "absolute", top: 0, height: "100%", overflow: "hidden", zIndex: 24 - flatIdx }}
            animate={{ left: targetLeft, width: targetWidth + 1, backgroundColor: bg }}
            transition={isFlyActive ? { ...EASE, delay: 0.18 } : EASE}
            onMouseEnter={isHighlight ? undefined : playTick}
          >
            {isHighlight && (
              <span className={`${styles.highlightLabel} moon`} style={{ color: labelColor }}>
                HIGHLIGHT {h + 1}
              </span>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
