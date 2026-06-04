"use client";
/**
 * Landing Page — The entry point of the website.
 * 
 * Layout:
 *  - Fixed logo above everything (sticky, animates on load)
 *  - A wide horizontal pan container holding both [landing canvas] [home canvas] side by side
 *  - Colour picker appears to the right of landing canvas after logo animation
 *  - On ENTER: canvas pans left to reveal home canvas
 */
import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useCanvasPan } from "@/hooks/useCanvasPan";
import { WorkingCanvas } from "@/components/canvas/WorkingCanvas";
import { CanvasRow1 } from "@/components/canvas/CanvasRow1";
import { CanvasRow2 } from "@/components/canvas/CanvasRow2";
import { CanvasRow3 } from "@/components/canvas/CanvasRow3";
import { CanvasRow45 } from "@/components/canvas/CanvasRow45";
import { CanvasRow6 } from "@/components/canvas/CanvasRow6";
import { CanvasRow7 } from "@/components/canvas/CanvasRow7";
import { CanvasRow8 } from "@/components/canvas/CanvasRow8";
import { ColourPicker } from "@/components/theme/ColourPicker";
import styles from "./page.module.css";

export default function RootPage() {
  const { isOnLanding } = useTheme();
  const { panRef, triggerPan } = useCanvasPan();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");

  // Show colour picker after logo animation completes (~2.5s)
  useEffect(() => {
    if (isOnLanding) {
      const t = setTimeout(() => setPickerVisible(true), 2600);
      return () => clearTimeout(t);
    }
  }, [isOnLanding]);

  // Scale canvas to fit viewport
  const scale = typeof window !== "undefined"
    ? Math.min(1, (window.innerHeight - 80) / 1450)
    : 0.5;

  return (
    <div className={styles.pageRoot}>
      {/* Main scene — viewport clips, pan container scrolls */}
      <div className={styles.viewport}>
        <div
          ref={panRef}
          className={styles.panContainer}
        >
          {/* ── LANDING CANVAS ───────────────────── */}
          <div className={styles.canvasScene}>
            <div className={styles.canvasScale} style={{ transform: `scale(${scale})` }}>
              <WorkingCanvas page="landing">
                <CanvasRow1 page="landing" language={language} onLanguageToggle={() => setLanguage(l => l === "en" ? "hi" : "en")} />
                <CanvasRow2 page="landing" />
                <CanvasRow3 page="landing" />
                <CanvasRow45 page="landing" />
                <CanvasRow6 page="landing" />
                <CanvasRow7 page="landing" />
                <CanvasRow8 page="landing" />
              </WorkingCanvas>
            </div>

            {/* Colour picker — floats to the right of canvas */}
            <div className={styles.pickerZone}>
              <ColourPicker visible={pickerVisible} onProceed={triggerPan} />
            </div>
          </div>

          {/* ── HOME CANVAS ──────────────────────── */}
          <div className={styles.canvasScene}>
            <div className={styles.canvasScale} style={{ transform: `scale(${scale})` }}>
              <WorkingCanvas page="home">
                <CanvasRow1 page="home" />
                <CanvasRow2 page="home" />
                <CanvasRow3 page="home" />
                <CanvasRow45 page="home" />
                <CanvasRow6 page="home" />
                <CanvasRow7 page="home" />
                <CanvasRow8 page="home" />
              </WorkingCanvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
