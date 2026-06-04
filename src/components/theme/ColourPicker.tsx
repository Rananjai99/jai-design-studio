"use client";
/**
 * ColourPicker — Landing page colour selection list.
 * Appears to the RIGHT of the canvas after logo animation completes.
 * Shows all 10 themes as a vertical list with colour swatches.
 * Clicking a colour name selects that theme and enters the home page.
 */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeId, themeOrder, themes } from "@/lib/themes.config";
import { useTheme } from "@/context/ThemeContext";
import styles from "./ColourPicker.module.css";

interface ColourPickerProps {
  visible: boolean;
  onProceed: () => void;
}

export function ColourPicker({ visible, onProceed }: ColourPickerProps) {
  const { themeId, selectTheme } = useTheme();
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={`${styles.label} moon`}>CHOOSE A COLOUR:</p>
          <ul className={styles.list}>
            {themeOrder.map((id) => {
              const t = themes[id];
              const sel = themeId === id;
              return (
                <li key={id}>
                  <button
                    className={`${styles.option} ${sel ? styles.selected : ""}`}
                    onClick={() => {
                      selectTheme(id);
                      onProceed();
                    }}
                    aria-pressed={sel}
                  >
                    <span className={styles.swatch} style={{ background: t.swatchGradient }} aria-hidden="true" />
                    <span className={`${styles.optLabel} moon`}>{t.label.toUpperCase()}</span>
                    {sel && <span className={styles.dot} aria-hidden="true">○</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
