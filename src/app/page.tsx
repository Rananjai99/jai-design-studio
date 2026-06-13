"use client";
/**
 * Landing Page — The entry point of the website.
 *
 * Layout:
 *  - A single "stage" holds the landing and home canvases at a shared top-left
 *    origin. A GSAP camera frames one or the other.
 *  - LANDING: the narrow working canvas is framed with equal margins on the
 *    left, top and bottom; its right side stays open for the colour picker,
 *    which floats one margin-width to the right of the box.
 *  - HOME: the wider canvas is framed with equal margins all round. Because it
 *    shares the landing's left edge, selecting a colour makes it feel like the
 *    home page extends off the right edge of the landing box.
 */
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useCanvasPan } from "@/hooks/useCanvasPan";
import { useFloatParallax } from "@/hooks/useFloatParallax";
import { WorkingCanvas, CANVAS } from "@/components/canvas/WorkingCanvas";
import { CanvasRow1 } from "@/components/canvas/CanvasRow1";
import { CanvasRow2 } from "@/components/canvas/CanvasRow2";
import { CanvasRow3 } from "@/components/canvas/CanvasRow3";
import { CanvasRow45 } from "@/components/canvas/CanvasRow45";
import { CanvasRow6 } from "@/components/canvas/CanvasRow6";
import { CanvasRow7 } from "@/components/canvas/CanvasRow7";
import { CanvasRow8 } from "@/components/canvas/CanvasRow8";
import { ColourPicker } from "@/components/theme/ColourPicker";
import styles from "./page.module.css";

// Frame margin around the working canvas (px). Equal on all sides of the box.
const OFFSET = 48;

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function RootPage() {
  const { isOnLanding } = useTheme();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerHovered, setPickerHovered] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [vp, setVp] = useState({ w: 1440, h: 900 });

  // Measure viewport before paint, then track resizes.
  useIsoLayoutEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Show colour picker after a beat on the landing page.
  useEffect(() => {
    if (isOnLanding) {
      const t = setTimeout(() => setPickerVisible(true), 600);
      return () => clearTimeout(t);
    }
    setPickerVisible(false);
  }, [isOnLanding]);

  // ── Camera maths ──────────────────────────────────────────────
  // Landing: height-fit so the box sits with equal margins L/T/B.
  const sL = (vp.h - 2 * OFFSET) / CANVAS.HEIGHT;

  // Home shares the landing's scale + top-left origin (so the landing rectangle
  // is identical), and is widened to the right so its RIGHT margin equals the
  // landing's LEFT margin (OFFSET). Its width is therefore dynamic.
  const homeWidth = Math.max(CANVAS.LANDING_WIDTH, (vp.w - 2 * OFFSET) / sL);
  // Fixed home grid — a true 3× extension of the landing's 16-track grid:
  // Row 2 = 48, Row 3 = 24, Row 4+5 = 12, Row 6 = 24, Row 7 = 48. Hardcoded
  // (not viewport-derived) so the counts never drift on wide/narrow screens.
  const homeCols = { row2: 48, row3: 24, row6: 24, row7: 48, row45: 12 };
  // Home logo zone = Row 3/6 cols 5–8 (= Row 4+5 cols 3–4): left edge & width
  // 8/48 of the canvas (≈ 16.67%).
  const homeLogoFrac = 8 / 48;

  // Both cameras frame the box at the same scale + top-left; landing→home just
  // reveals the wider home canvas (it extends off the right of the landing box).
  const landingCam = { x: OFFSET, y: OFFSET, scale: sL };
  const homeCam = { x: OFFSET, y: OFFSET, scale: sL };

  // Picker sits one margin-width to the right of the landing box's right edge.
  const pickerLeft = OFFSET + CANVAS.LANDING_WIDTH * sL + OFFSET;

  const { panRef, triggerPan } = useCanvasPan(landingCam, homeCam);

  // One shared float-parallax offset for BOTH canvases, anchored on the landing
  // box. They share a top-left origin, so applying the same drift keeps their
  // left/top/bottom edges exactly coincident (only home's right edge differs).
  // Frozen while the cursor is over the colour picker.
  const floatAnchorRef = useRef<HTMLDivElement>(null);
  const { x: floatX, y: floatY } = useFloatParallax(floatAnchorRef, sL, undefined, pickerHovered);

  return (
    <div className={styles.pageRoot}>
      <div className={styles.viewport}>
        {/* Stage — GSAP camera frames the active canvas. Both canvases share
            the same top-left origin; the home canvas is simply wider. */}
        <div ref={panRef} className={styles.stage}>
          {/* ── LANDING CANVAS ───────────────────── */}
          <div
            className={styles.canvasLayer}
            style={{ opacity: isOnLanding ? 1 : 0, pointerEvents: isOnLanding ? "auto" : "none" }}
          >
            <WorkingCanvas ref={floatAnchorRef} page="landing" scale={sL} floatX={floatX} floatY={floatY}>
              <CanvasRow1 page="landing" language={language} onLanguageToggle={() => setLanguage(l => l === "en" ? "hi" : "en")} />
              <CanvasRow2 page="landing" />
              <CanvasRow3 page="landing" />
              <CanvasRow45 page="landing" />
              <CanvasRow6 page="landing" />
              <CanvasRow7 page="landing" />
              <CanvasRow8 page="landing" />
            </WorkingCanvas>
          </div>

          {/* ── HOME CANVAS ──────────────────────── */}
          <div
            className={styles.canvasLayer}
            style={{ opacity: isOnLanding ? 0 : 1, pointerEvents: isOnLanding ? "none" : "auto" }}
          >
            <WorkingCanvas page="home" scale={sL} width={homeWidth} logoLeft={homeLogoFrac} logoWidth={homeLogoFrac} floatX={floatX} floatY={floatY}>
              <CanvasRow1 page="home" />
              <CanvasRow2 page="home" cols={homeCols.row2} />
              <CanvasRow3 page="home" cols={homeCols.row3} />
              <CanvasRow45 page="home" cols={homeCols.row45} />
              <CanvasRow6 page="home" cols={homeCols.row6} />
              <CanvasRow7 page="home" cols={homeCols.row7} />
              <CanvasRow8 page="home" />
            </WorkingCanvas>
          </div>
        </div>

        {/* Colour picker — screen-space, one margin-width right of the box,
            top-aligned with the canvas top (Row 1). */}
        <div
          className={styles.pickerZone}
          style={{ left: pickerLeft, top: OFFSET, opacity: isOnLanding ? 1 : 0, pointerEvents: isOnLanding ? "auto" : "none" }}
        >
          <ColourPicker visible={pickerVisible && isOnLanding} onProceed={triggerPan} onOptionsHover={setPickerHovered} />
        </div>
      </div>
    </div>
  );
}
