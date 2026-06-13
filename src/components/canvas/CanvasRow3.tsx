"use client";
/**
 * Row 3 — Colour reference labels.
 * Landing (8 cols): cells 1–4 carry the hex / name of the first two named
 *   swatches as (hex, name, hex, name); cells 5–8 are merged into one open
 *   cell (the logo zone).
 * Home (24 cols): cols 5–8 merge into the open logo zone; cols 9–10 label the
 *   merged Row 4+5 block's colour (theme primary); the rest carry hex + name
 *   labels for the surrounding palette colours.
 */
import React from "react";
import { motion } from "framer-motion";
import { CanvasPage, CANVAS } from "./WorkingCanvas";
import { useTheme } from "@/context/ThemeContext";
import styles from "./CanvasRows.module.css";

// Hex codes are displayed without the leading "#" (data keeps it for colours).
function stripHash(hex: string) {
  return hex.replace(/^#/, "");
}

export function CanvasRow3({ page, cols: colsProp }: { page: CanvasPage; cols?: number }) {
  const { theme } = useTheme();

  if (page === "landing") {
    // First two *named* swatches → hex/name pairs across cells 1–4.
    const named = theme.row3Labels.filter((l) => l[1]);
    const a = named[0] ?? ["", ""];
    const b = named[1] ?? ["", ""];
    const labelCells: Array<{ kind: "hex" | "name"; text: string }> = [
      { kind: "hex", text: stripHash(a[0]) },
      { kind: "name", text: a[1] },
      { kind: "hex", text: stripHash(b[0]) },
      { kind: "name", text: b[1] },
    ];

    return (
      <div className={`${styles.row} ${styles.row3} ${styles.landing}`}>
        {labelCells.map((c, i) => (
          <div key={i} className={`${styles.cell} ${styles.row3Cell}`} style={{ gridColumn: "span 2" }}>
            {/* key on theme re-mounts the label so it re-fades each time the
                colour changes; the delay makes labels refresh left→right. */}
            <motion.div
              key={theme.id}
              className={styles.row3Label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: ((2 * i + 1) / 16) * CANVAS.WAVE }}
            >
              <span className={`${c.kind === "hex" ? styles.hexCode : styles.colourName} montserrat`}>
                {c.text}
              </span>
            </motion.div>
          </div>
        ))}
        {/* cells 5–8 merged → one open cell (spans 8 of 16 tracks) */}
        <div className={`${styles.cell} ${styles.row3Cell} ${styles.mergedCell}`} style={{ gridColumn: "span 8" }} />
      </div>
    );
  }

  // HOME — 24 label columns (each spanning 2 of the 48 tracks) aligned to
  // Row 4+5's colour columns. Hex codes are the exact theme palette
  // (theme.home.row4_5); names are looked up from the label table by hex.
  //   cols 1–4   → palette colours 1 & 2 (hex, name each)
  //   cols 5–8   → merged open logo zone (no bottom border)
  //   cols 9–10  → the merged block's colour = theme primary (hex, name)
  //   cols 11–24 → palette continuing from index 3 (dark→light to the end)
  const palette = theme.home?.row4_5 ?? theme.row4_5;
  const labelTable = theme.home?.row3Labels ?? theme.row3Labels;
  const nameOf = (hex: string) =>
    labelTable.find(([h]) => h.toLowerCase() === hex.toLowerCase())?.[1] ?? "";
  const tracks = (colsProp ?? CANVAS.ROW3_COLS_HOME) * 2;

  type R3Cell = { kind: "hex" | "name"; text: string } | { kind: "logo" };
  const cells: R3Cell[] = [];
  const pushPair = (hex: string) => {
    cells.push({ kind: "hex", text: stripHash(hex) });
    cells.push({ kind: "name", text: nameOf(hex) });
  };
  pushPair(palette[0] ?? "");
  pushPair(palette[1] ?? "");
  cells.push({ kind: "logo" });           // cols 5–8 merged, open
  pushPair(theme.baseHex);                // cols 9–10 = primary block colour
  for (let i = 3; i < 10; i++) pushPair(palette[i] ?? ""); // cols 11–24, shifted

  let track = 0;
  return (
    <div
      className={`${styles.row} ${styles.row3} ${styles.home}`}
      style={{ gridTemplateColumns: `repeat(${tracks}, 1fr)` }}
    >
      {cells.map((c, i) => {
        const span = c.kind === "logo" ? 8 : 2; // logo spans cols 5–8 (8 tracks)
        const delay = (track / tracks) * CANVAS.WAVE;
        track += span;
        if (c.kind === "logo") {
          return (
            <div
              key={`logo-${i}`}
              className={`${styles.cell} ${styles.row3Cell} ${styles.mergedCell}`}
              style={{ gridColumn: `span ${span}` }}
            />
          );
        }
        return (
          <div key={i} className={`${styles.cell} ${styles.row3Cell}`} style={{ gridColumn: `span ${span}` }}>
            <motion.div
              key={theme.id}
              className={styles.row3Label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay }}
            >
              <span className={`${c.kind === "hex" ? styles.hexCode : styles.colourName} montserrat`}>{c.text}</span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
