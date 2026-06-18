"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { playTick } from "@/lib/tickSound";
import styles from "./PageRows.module.css";

const SWATCH_UNIT = 2480 / 24;
const SELECTED_W  = SWATCH_UNIT * 20;
const COLLAPSED_W = (SWATCH_UNIT * 4) / 5;
const NATURAL_W   = 2480 / 6;
const LABEL_W     = SWATCH_UNIT * 4;

const EASE = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

/** Left position of project i given current selection. */
function cellLeft(i: number, sel: number | null): number {
  if (sel === null) return i * NATURAL_W;
  if (i === sel) return 0;
  const j = i < sel ? i : i - 1;
  return SELECTED_W + j * COLLAPSED_W;
}

/** Width of project i given current selection. */
function cellWidth(i: number, sel: number | null): number {
  if (sel === null) return NATURAL_W;
  return i === sel ? SELECTED_W : COLLAPSED_W;
}

interface PageRow2Props {
  hoveredCol: number | null;
  onColEnter: (col: number) => void;
  onColLeave: () => void;
  selectedProject: number | null;
  onProjectClick: (col: number) => void;
}

export function PageRow2({ hoveredCol, onColEnter, onColLeave, selectedProject, onProjectClick }: PageRow2Props) {
  const { theme } = useTheme();
  const { row2 } = theme.pageColors;
  const labelColor = theme.id === "blue" ? theme.pageColors.labelColor : "#1a1a1a";

  const isAnySelected = selectedProject !== null;

  return (
    <div className={`${styles.row} ${styles.row2}`}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const bg = row2[i] ?? "#fff0cc";
        const isThisSelected = isAnySelected && i === selectedProject;
        const isHovered = hoveredCol === i && !isThisSelected;
        const targetLeft  = cellLeft(i, selectedProject);
        const targetWidth = cellWidth(i, selectedProject);

        return (
          <motion.div
            key={i}
            className={styles.row2Cell}
            style={{
              position: "absolute",
              top: 0, height: "100%",
              overflow: "hidden",
              boxShadow: isHovered ? "0 0 28px 6px rgba(0,0,0,0.45)" : undefined,
              clipPath: isHovered ? "inset(-40px -40px 0px -40px)" : undefined,
              zIndex: isThisSelected || isHovered ? 10 : 6 - i,
            }}
            animate={{ left: targetLeft, width: targetWidth + 1, backgroundColor: bg }}
            transition={EASE}
            onMouseEnter={() => { onColEnter(i); playTick(); }}
            onMouseLeave={onColLeave}
            onClick={() => onProjectClick(i)}
          >
            <AnimatePresence mode="wait">
              {isThisSelected ? (
                <motion.div
                  key="selected"
                  className={styles.row2SelectedInner}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className={styles.row2LabelSection} style={{ width: LABEL_W }}>
                    <span className={`${styles.projectLabel} moon`} style={{ color: labelColor }}>
                      PROJECT {i + 1}
                    </span>
                  </div>
                  <div className={styles.row2BioSection}>
                    <span className={`${styles.projectBio} moon`} style={{ color: labelColor }}>
                      {Array(25).fill("Project Bio").join(" ")}
                    </span>
                  </div>
                </motion.div>
              ) : isAnySelected ? (
                <motion.span
                  key="number"
                  className={`${styles.projectNumber} moon`}
                  style={{ color: labelColor }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {i + 1}
                </motion.span>
              ) : (
                <motion.span
                  key="label"
                  className={`${styles.projectLabel} moon`}
                  style={{ color: "#1a1a1a" }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  PROJECT {i + 1}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
