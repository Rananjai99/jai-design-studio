"use client";
/**
 * WorkingCanvas — The master grid container used on all pages.
 * Provides the 8-row grid, drop shadow (45°, theme-coloured), and GSAP-ready layer.
 * 
 * Landing: 826.6655 × 1450px  |  Home: 2480 × 1450px
 * Row height: 181.25px each (1450 / 8)
 */
import React, { forwardRef } from "react";
import { useTheme } from "@/context/ThemeContext";
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
} as const;

interface WorkingCanvasProps {
  page: CanvasPage;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const WorkingCanvas = forwardRef<HTMLDivElement, WorkingCanvasProps>(
  function WorkingCanvas({ page, children, className, style }, ref) {
    const { theme } = useTheme();
    const sc1 = theme.shadowColours[0] ?? "#000";
    const sc2 = theme.shadowColours[Math.floor(theme.shadowColours.length / 2)] ?? sc1;
    const sc3 = theme.shadowColours[theme.shadowColours.length - 1] ?? sc2;

    return (
      <div
        ref={ref}
        className={[styles.canvasWrapper, className].filter(Boolean).join(" ")}
        data-page={page}
        style={{
          "--shadow-c1": sc1, "--shadow-c2": sc2, "--shadow-c3": sc3,
          "--canvas-w": page === "landing" ? `${CANVAS.LANDING_WIDTH}px` : `${CANVAS.HOME_WIDTH}px`,
          ...style,
        } as React.CSSProperties}
      >
        <div className={styles.canvas}>{children}</div>
      </div>
    );
  }
);
WorkingCanvas.displayName = "WorkingCanvas";
