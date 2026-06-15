"use client";
/**
 * WorkingCanvas — The master grid container used on all pages.
 * Provides the 8-row grid, drop shadow (45°, theme-coloured), and GSAP-ready layer.
 * 
 * Landing: 826.6655 × 1450px  |  Home: 2480 × 1450px
 * Row height: 181.25px each (1450 / 8)
 */
import React, { forwardRef, useRef } from "react";
import { motion, MotionValue } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useFloatParallax } from "@/hooks/useFloatParallax";
import { CanvasLogo } from "@/components/logo/CanvasLogo";
import styles from "./WorkingCanvas.module.css";

export type CanvasPage = "landing" | "home";

export const CANVAS = {
  LANDING_WIDTH: 826.6655, HOME_WIDTH: 2480, HEIGHT: 1450, ROW_HEIGHT: 181.25,
  ROW2_COLS_LANDING: 16, ROW2_COLS_HOME: 48,
  ROW3_COLS_LANDING: 8,  ROW3_COLS_HOME: 24,
  ROW45_COLS: 12,
  ROW6_COLS_LANDING: 8,  ROW6_COLS_HOME: 24,
  ROW7_COLS_LANDING: 16, ROW7_COLS_HOME: 48,
  BASE: "#fff0cc", BORDER: "#1a1a1a",
  // Max stagger (seconds) for the left→right colour-change "wave". Each cell's
  // delay = (its horizontal centre, 0–1 across the canvas) * WAVE.
  WAVE: 0.4,
} as const;

interface WorkingCanvasProps {
  page: CanvasPage;
  children: React.ReactNode;
  /** The transform scale this canvas is rendered at, so 1px borders can be
   *  counter-scaled to stay crisp (otherwise they thin/drop under scale-down). */
  scale?: number;
  /** Explicit canvas width (px, in canvas units). Overrides the per-page default
   *  — used to widen the home canvas dynamically to fill the viewport. */
  width?: number;
  /** Logo-zone left edge & width as fractions of the canvas (the merged block).
   *  Defaults to the landing right-half (0.5 / 0.5). */
  logoLeft?: number;
  logoWidth?: number;
  /** Shared float-parallax offset (canvas-local px). When provided, the canvas
   *  uses these instead of computing its own — so canvases that share an origin
   *  (landing + home) drift in lock-step and keep their common edges aligned. */
  floatX?: MotionValue<number>;
  floatY?: MotionValue<number>;
  className?: string;
  style?: React.CSSProperties;
}

export const WorkingCanvas = forwardRef<HTMLDivElement, WorkingCanvasProps>(
  function WorkingCanvas({ page, children, scale = 1, width, logoLeft, logoWidth, floatX, floatY, className, style }, ref) {
    const { theme } = useTheme();
    // Drop shadow is tinted with Row 8's left→right gradient (same stops/logic as
    // CanvasRow8), so the shadow's right edge matches the gradient's rightmost stop.
    const row8Stops = page === "home" ? (theme.home?.row8Gradient ?? theme.row8Gradient) : theme.row8Gradient;
    const shadowGradient = `linear-gradient(to right, ${row8Stops.join(", ")})`;

    // Subtle floating parallax: the whole canvas (and its drop shadow) drifts a
    // few px opposite to the cursor's offset from the canvas centre. When a
    // shared offset is supplied, use it (and freeze the local one) so sibling
    // canvases stay edge-aligned; otherwise compute our own.
    const localRef = useRef<HTMLDivElement | null>(null);
    const hasSharedFloat = floatX != null && floatY != null;
    const local = useFloatParallax(localRef, scale, undefined, hasSharedFloat);
    const x = floatX ?? local.x;
    const y = floatY ?? local.y;

    return (
      <motion.div
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={[styles.canvasWrapper, className].filter(Boolean).join(" ")}
        data-page={page}
        style={{
          "--shadow-gradient": shadowGradient,
          "--canvas-w": width != null
            ? `${width}px`
            : page === "landing" ? `${CANVAS.LANDING_WIDTH}px` : `${CANVAS.HOME_WIDTH}px`,
          "--canvas-scale": scale > 0 ? scale : 1,
          x, y,
          ...style,
        } as Record<string, unknown>}
      >
        {/* Drop shadow. Two layers so the clip runs BEFORE the blur: the inner
            shape is hard-clipped (gap at the top-right & bottom-left), then the
            outer layer blurs + grains it via #shadowGrain — softening the clip
            edges so the gap blends instead of showing a hard line. */}
        <div className={styles.shadow} aria-hidden="true">
          <div className={styles.shadowShape} />
        </div>
        <div className={styles.canvas}>
          {children}
          {/* Logo lives inside the big merged rectangle (right-half on landing,
              centre block on home). */}
          <CanvasLogo page={page} left={logoLeft} width={logoWidth} />
        </div>
      </motion.div>
    );
  }
);
WorkingCanvas.displayName = "WorkingCanvas";
