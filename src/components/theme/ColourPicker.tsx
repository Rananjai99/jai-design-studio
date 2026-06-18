"use client";
/**
 * ColourPicker — Landing page colour selection list.
 * Appears to the RIGHT of the canvas after logo animation completes.
 * Shows all 10 themes as a vertical list with colour swatches.
 * Clicking a colour name selects that theme and enters the home page.
 */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeId, themeOrder, themes } from "@/lib/themes.config";
import { useTheme } from "@/context/ThemeContext";
import { playTick } from "@/lib/tickSound";
import styles from "./ColourPicker.module.css";

interface ColourPickerProps {
  visible: boolean;
  onProceed: () => void;
  /** Fired when the cursor enters/leaves the colour options (swatches + text),
   *  so the canvas parallax can recentre while they're being hovered. */
  onOptionsHover?: (hovering: boolean) => void;
}

export function ColourPicker({ visible, onProceed, onOptionsHover }: ColourPickerProps) {
  const { themeId, selectTheme, previewTheme } = useTheme();
  const [hoverId, setHoverId] = useState<ThemeId | null>(null);
  // The marker sits next to whichever option the cursor is over; with nothing
  // hovered it rests beside the selected theme.
  const markedId = hoverId ?? themeId;
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
          onMouseLeave={() => { previewTheme(null); onOptionsHover?.(false); }}
        >
          <p className={`${styles.label} moon`}>CHOOSE A COLOUR:</p>
          <ul
            className={styles.list}
            onMouseEnter={() => onOptionsHover?.(true)}
            onMouseLeave={() => { onOptionsHover?.(false); setHoverId(null); }}
          >
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
                    onMouseEnter={() => { previewTheme(id); setHoverId(id); playTick(); }}
                    onFocus={() => { previewTheme(id); setHoverId(id); }}
                    onBlur={() => { previewTheme(null); setHoverId(null); }}
                    aria-pressed={sel}
                  >
                    <span className={styles.swatch} style={{ background: t.swatchGradient }} aria-hidden="true" />
                    <span className={`${styles.optLabel} moon`}>{t.label.toUpperCase()}</span>
                    {markedId === id && <span className={styles.dot} aria-hidden="true">○</span>}
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
