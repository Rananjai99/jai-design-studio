"use client";
/** Row 2 — Fine grid (16 cols landing / 48 cols home). Border only, no fill colour. */
import React from "react";
import { CanvasPage, CANVAS } from "./WorkingCanvas";
import styles from "./CanvasRows.module.css";

export function CanvasRow2({ page }: { page: CanvasPage }) {
  const cols = page === "landing" ? CANVAS.ROW2_COLS_LANDING : CANVAS.ROW2_COLS_HOME;
  return (
    <div className={`${styles.row} ${styles.row2} ${styles[page]}`}>
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className={styles.cell} />
      ))}
    </div>
  );
}
