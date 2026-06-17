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

  if (!isHome) {
    const landingSegs = [
      { start: 0, span: 1 },
      { start: 1, span: 1 },
      { start: 2, span: 2 },
    ];
    return (
      <div className={`${styles.row} ${styles.row45} ${styles.landing}`}>
        {landingSegs.map((seg) => {
          const merged = seg.span > 1;
          const colour = merged ? "#fff0cc" : (theme.row4_5[seg.start] ?? "#fff0cc");
          const delay = ((seg.start + seg.span / 2) / 4) * CANVAS.WAVE;
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

  const homeCells = cols ?? COLS;
  const palette = theme.home?.row4_5 ?? theme.row4_5;
  const segs = segmentsWithMerge(homeCells, 2, 3);

  const segLabels: Array<{ text: string; clickable: boolean } | null> = [
    { text: "Socials",                  clickable: true  },
    { text: "About Us",                 clickable: true  },
    { text: "Latitude of Home",         clickable: false },
    { text: "Urban Design",             clickable: true  },
    { text: "Architecture & Interiors", clickable: true  },
    { text: "Industrial Design",        clickable: true  },
    { text: "Furniture Design",         clickable: true  },
    { text: "Photography",              clickable: true  },
    { text: "Graphic Design",           clickable: true  },
    { text: "Apparel Design",           clickable: true  },
  ];

  return (
    <div className={`${styles.row} ${styles.row45} ${styles.home}`}>
      {segs.map((seg, i) => {
        const merged = seg.span > 1;
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
            style={{
              backgroundColor: colour,
              gridColumn: `span ${seg.span}`,
              position: merged ? "relative" : undefined,
            }}
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
                // Clip region starts at the "I" of the JAI logo (~49% from the
                // merged cell's left edge). The tagline slides x:-350→0 so it
                // appears to emerge from behind the "I" stroke.
                <div style={{
                  position: "absolute",
                  left: "49%",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: "40px",
                }}>
                  <motion.div
                    initial={{ x: -350 }}
                    animate={{ x: isOnLanding ? -350 : 0 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: isOnLanding ? 0 : 0.55 }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <span className={styles.tagline}>
                      LATITUDE<br />OF{" "}HOME
                    </span>
                  </motion.div>
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
