"use client";
import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { PageRow1 } from "@/components/page/PageRow1";
import { PageRow2 } from "@/components/page/PageRow2";
import { PageRow37 } from "@/components/page/PageRow37";
import { PageRow8 } from "@/components/page/PageRow8";
import styles from "./page.module.css";

const CANVAS_W = 2480;
const CANVAS_H = 1450;
const OFFSET   = 48;

const PAGE_TITLES: Record<string, string> = {
  "urban-design":              "Urban Design",
  "architecture-interiors":    "Architecture & Interiors",
  "industrial-design":         "Industrial Design",
  "furniture-design":          "Furniture Design",
  "photography":               "Photography",
  "graphic-design":            "Graphic Design",
  "apparel-design":            "Apparel Design",
  "about":                     "About Us",
  "socials":                   "Socials",
};

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const router = useRouter();
  const { navigateToLanding } = useTheme();
  const pageTitle = PAGE_TITLES[category];

  const [vp, setVp] = useState({ w: 1440, h: 900 });
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  useIsoLayoutEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const onColEnter = useCallback((col: number) => setHoveredCol(col), []);
  const onColLeave = useCallback(() => setHoveredCol(null), []);

  const scale   = (vp.h - 2 * OFFSET) / CANVAS_H;
  const scaledW = CANVAS_W * scale;
  const backLeft = OFFSET + scaledW + OFFSET;

  if (!pageTitle) return notFound();

  return (
    <div className={styles.pageRoot}>
      <div className={styles.viewport}>
        <div
          className={styles.canvasPositioner}
          style={{
            transform: `translate(${OFFSET}px, ${OFFSET}px) scale(${scale})`,
            ["--canvas-scale" as string]: scale,
          }}
        >
          <div style={{ width: CANVAS_W, height: CANVAS_H }}>
            <div className={styles.shadow} aria-hidden="true">
              <div className={styles.shadowShape} />
            </div>
            <div className={styles.canvas}>
              <PageRow1 pageTitle={pageTitle} />
              <PageRow2 hoveredCol={hoveredCol} onColEnter={onColEnter} onColLeave={onColLeave} />
              <PageRow37 hoveredCol={hoveredCol} onColEnter={onColEnter} onColLeave={onColLeave} />
              <PageRow8 />
            </div>
          </div>
        </div>

        {/* Temp nav buttons — screen-space, right of the canvas */}
        <button
          className={styles.backBtn}
          style={{ left: backLeft, top: OFFSET }}
          onClick={() => router.back()}
        >
          ← Back
        </button>
        <button
          className={styles.backBtn}
          style={{ left: backLeft, top: OFFSET + 60 }}
          onClick={() => { navigateToLanding(); router.push("/"); }}
        >
          ⌂ First Page
        </button>
      </div>
    </div>
  );
}
