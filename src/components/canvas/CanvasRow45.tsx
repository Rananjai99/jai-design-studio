"use client";
/**
 * CanvasRow45 — Merged rows 4+5 (double height = 362.5px)
 * Landing: 4 rectangles — cols 1 & 2 colour, cols 3 & 4 merged (open logo zone).
 * Home: cols 1 & 2 colour, cols 3 & 4 merged (open LOGO zone — the logo overlay
 *   sits here), cols 5 & 6 merged (TAGLINE), remaining cols solid colour.
 */
import React from "react";
import { motion } from "framer-motion";
import { playTick } from "@/lib/tickSound";
import { CanvasPage, CANVAS } from "./WorkingCanvas";
import { useTheme } from "@/context/ThemeContext";
import styles from "./CanvasRows.module.css";

const LABEL_TO_ROUTE: Record<string, string> = {
  "Socials":                   "/socials",
  "About Us":                  "/about",
  "Urban Design":              "/urban-design",
  "Architecture & Interiors":  "/architecture-interiors",
  "Industrial Design":         "/industrial-design",
  "Furniture Design":          "/furniture-design",
  "Photography":               "/photography",
  "Graphic Design":            "/graphic-design",
  "Apparel Design":            "/apparel-design",
};

interface CanvasRow45Props {
  page: CanvasPage;
  cols?: number;
}

const COLS = 12;

// Build the row's cells as segments; a span > 1 is a merged cell.
function segmentsWithMerge(cols: number, mergeStart: number, mergeSpan: number) {
  const segs: Array<{ start: number; span: number }> = [];
  for (let i = 0; i < cols; ) {
    if (i === mergeStart) { segs.push({ start: i, span: mergeSpan }); i += mergeSpan; }
    else { segs.push({ start: i, span: 1 }); i += 1; }
  }
  return segs;
}

export function CanvasRow45({ page, cols }: CanvasRow45Props) {
  const { theme, isOnLanding, startPageTransition } = useTheme();
  const isHome = page === "home";

  // LANDING — 4 rectangles: cols 1 & 2 carry colour; cols 3 & 4 merge into one
  // open (no-colour) cell that forms the right half of the big merged block.
  if (!isHome) {
    const landingSegs = [
      { start: 0, span: 1 },
      { start: 1, span: 1 },
      { start: 2, span: 2 }, // cols 3 & 4 merged → open logo zone
    ];
    return (
      <div className={`${styles.row} ${styles.row45} ${styles.landing}`}>
        {landingSegs.map((seg) => {
          const merged = seg.span > 1;
          const colour = merged ? "#fff0cc" : (theme.row4_5[seg.start] ?? "#fff0cc");
          const delay = ((seg.start + seg.span / 2) / 4) * CANVAS.WAVE; // left→right wave
          return (
            <motion.div
              key={seg.start}
              className={`${styles.row45Cell} ${merged ? styles.mergedCell : styles.navCell}`}
              style={{ backgroundColor: colour, gridColumn: `span ${seg.span}` }}
              animate={{ backgroundColor: colour }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
              onMouseEnter={playTick}
            />
          );
        })}
      </div>
    );
  }

  // HOME — 12 solid colour cells. The logo block (cols 3–5) is merged into one
  // cell filled with the theme's primary colour (baseHex); the logo overlay sits
  // over its left portion (cols 3–4) and col 5 is labelled by Row 3. The other
  // cells use the exact theme palette (theme.home.row4_5).
  //
  // Because the 3-wide block represents ONE colour, the columns AFTER it continue
  // the palette from where col 4 left off (index shifted back by 2), so the
  // gradient runs dark→light to the very end instead of wrapping into the dark
  // filler shades.
  const homeCells = cols ?? COLS;
  const palette = theme.home?.row4_5 ?? theme.row4_5;
  const segs = segmentsWithMerge(homeCells, 2, 3); // merge cols 3–5 (idx 2–4)

  // Labels for each segment in order (merged tagline zone is index 2).
  const segLabels: Array<{ text: string; clickable: boolean } | null> = [
    { text: "Socials",                  clickable: true  }, // col 1
    { text: "About Us",                 clickable: true  }, // col 2
    { text: "Latitude of Home",         clickable: false }, // cols 3–5 (merged tagline)
    { text: "Urban Design",             clickable: true  }, // col 6
    { text: "Architecture & Interiors", clickable: true  }, // col 7
    { text: "Industrial Design",        clickable: true  }, // col 8
    { text: "Furniture Design",         clickable: true  }, // col 9
    { text: "Photography",              clickable: true  }, // col 10
    { text: "Graphic Design",           clickable: true  }, // col 11
    { text: "Apparel Design",           clickable: true  }, // col 12
  ];

  return (
    <div className={`${styles.row} ${styles.row45} ${styles.home}`}>
      {segs.map((seg, i) => {
        const merged = seg.span > 1;
        // Pre-block cols keep their index; post-block cols shift back by 2.
        const idx = seg.start < 2 ? seg.start : seg.start - 2;
        const colour = merged ? (palette[2] ?? theme.baseHex) : (palette[idx] ?? "#fff0cc");
        const label = segLabels[i] ?? null;
        const cellClass = [
          styles.row45Cell,
          merged ? styles.taglineCell : "",
          label?.clickable ? styles.navCell : "",
        ].filter(Boolean).join(" ");

        return (
          <motion.div
            key={seg.start}
            className={cellClass}
            style={{ backgroundColor: colour, gridColumn: `span ${seg.span}` }}
            animate={{ backgroundColor: colour, opacity: isOnLanding ? 0 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: ((seg.start + seg.span / 2) / homeCells) * CANVAS.WAVE }}
            onMouseEnter={merged ? undefined : playTick}
            {...(label?.clickable ? {
              role: "button",
              tabIndex: 0,
              onClick: () => { const route = LABEL_TO_ROUTE[label.text]; if (route) startPageTransition(route); },
              onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { const route = LABEL_TO_ROUTE[label.text]; if (route) startPageTransition(route); } },
            } : {})}
          >
            {label && (
              merged ? (
                // Col-5 zone: rightmost third of the 3-col merged cell.
                // marginLeft:auto pushes it right; width:33.33% matches one column.
                <div style={{ width: "33.33%", marginLeft: "auto", marginRight: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <span className={styles.tagline}>
                    LATITUDE<br />OF{" "}HOME
                  </span>
                </div>
              ) : (
                <span className={styles.pageTitle}>
                  {label.text}
                </span>
              )
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
