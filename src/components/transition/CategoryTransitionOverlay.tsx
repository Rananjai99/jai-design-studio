"use client";
import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

const CANVAS_W  = 2480;
const CANVAS_H  = 1450;
const ROW_H     = 181.25;
const OFFSET    = 48;
const COLS_2    = 48;    // Row 2 home columns
const COLS_45   = 12;    // Row 4+5 columns
const SWATCHES  = 24;    // Row 8 swatch count

// Canvas-space y positions
const R2_Y   = 1 * ROW_H;   // Row 2  top — Row 1 sits above
const R45_Y  = 3 * ROW_H;   // Row 4+5 top — rows 1,2,3 sit above
const R37_Y  = 2 * ROW_H;   // Row 3-7 top — rows 1,2 sit above
const R8_Y   = 7 * ROW_H;   // Row 8  top — rows 1-7 sit above
const R2_H   = ROW_H;       // Row 2 is 1 row tall
const R45_H  = 2 * ROW_H;   // Row 4+5 spans 2 rows
const R37_H  = 5 * ROW_H;   // Row 3-7 spans 5 rows
const R8_H   = ROW_H;       // Row 8 is 1 row tall

const MERGE_2  = COLS_2 / 6;   // 8 columns collapse into 1 for Row 2

const useIsoLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function CategoryTransitionOverlay() {
  const { theme, pageTransition, clearPageTransition } = useTheme();
  const router = useRouter();

  const col2Refs  = useRef<(HTMLDivElement | null)[]>(Array(COLS_2).fill(null));
  const col37Refs = useRef<(HTMLDivElement | null)[]>(Array(COLS_45).fill(null));
  const col8Refs  = useRef<(HTMLDivElement | null)[]>(Array(SWATCHES).fill(null));

  const [vp, setVp] = useState({ w: 1440, h: 900 });

  useIsoLayout(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const s = (vp.h - 2 * OFFSET) / CANVAS_H;

  // Row 2 (48 → 6, purely horizontal merge)
  const cW48  = (CANVAS_W / 48) * s;
  const r2Top = OFFSET + R2_Y * s;
  const r2H   = R2_H * s;

  // Row 3-7 (12 → 6, horizontal merge + vertical expand)
  const cW12   = (CANVAS_W / 12) * s;
  const cW6    = (CANVAS_W / 6)  * s;
  const r45Top = OFFSET + R45_Y  * s;
  const r37Top = OFFSET + R37_Y  * s;
  const r45H   = R45_H * s;
  const r37H   = R37_H * s;

  // Row 8 (24 swatches, slide up + fade in)
  const swW   = (CANVAS_W / 24) * s;
  const r8Top = OFFSET + R8_Y * s;
  const r8H   = R8_H * s;

  const col2Colors  = theme.pageColors.row2;   // 6 colours
  const col37Colors = theme.pageColors.row37;  // 6 colours
  const col8Colors  = theme.pageColors.row8;   // 24 colours

  useIsoLayout(() => {
    if (!pageTransition) return;

    // Capture dimensions at transition start
    const _cW6 = cW6;
    const _r37Top = r37Top, _r37H = r37H;
    const _r8Top = r8Top;

    // Merge + fade start simultaneously (double rAF commits initial paint first),
    // and navigation fires immediately so the category page mounts behind the overlay.
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Position transitions for the merge/expand animation
        const mergeBase = [
          "left   0.55s cubic-bezier(0.16, 1, 0.3, 1)",
          "top    0.55s cubic-bezier(0.16, 1, 0.3, 1)",
          "width  0.55s cubic-bezier(0.16, 1, 0.3, 1)",
          "height 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
        ].join(", ");

        // Navigate now — category page mounts behind the fading overlay
        router.push(pageTransition.targetRoute);

        // Row 2: merge horizontally + fade left-to-right simultaneously
        col2Refs.current.forEach((el, i) => {
          if (!el) return;
          const isLeader = i % MERGE_2 === 0;
          const groupIdx = Math.floor(i / MERGE_2);
          el.style.transition = `${mergeBase}, opacity 0.22s ease ${groupIdx * 80}ms`;
          el.style.width   = isLeader ? `${_cW6}px` : "0px";
          el.style.opacity = "0";
        });

        // Row 3-7: expand vertically + merge horizontally + fade left-to-right simultaneously
        col37Refs.current.forEach((el, i) => {
          if (!el) return;
          const isEven = i % 2 === 0;
          const pairIdx = Math.floor(i / 2);
          el.style.transition = `${mergeBase}, opacity 0.22s ease ${pairIdx * 80}ms`;
          el.style.top    = `${_r37Top}px`;
          el.style.height = `${_r37H}px`;
          el.style.width  = isEven ? `${_cW6}px` : "0px";
          el.style.opacity = "0";
        });

        // Row 8: slide into position (stays transparent, removed with overlay)
        col8Refs.current.forEach((el) => {
          if (!el) return;
          el.style.transition = "top 0.55s cubic-bezier(0.16, 1, 0.3, 1)";
          el.style.top = `${_r8Top}px`;
        });
      });
    });

    // Remove overlay after the last fade group finishes (5×80ms stagger + 220ms fade + buffer)
    const clearId = setTimeout(clearPageTransition, 700);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(clearId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTransition?.targetRoute]);

  if (!pageTransition) return null;

  return (
    <>
      {/* Row 2: 48 thin columns that merge horizontally into 6 */}
      {Array.from({ length: COLS_2 }, (_, i) => {
        const groupIdx = Math.floor(i / MERGE_2);
        return (
          <div
            key={`r2-${i}`}
            ref={el => { col2Refs.current[i] = el; }}
            style={{
              position:        "fixed",
              zIndex:          300,
              left:            OFFSET + i * cW48,
              top:             r2Top,
              width:           cW48,
              height:          r2H,
              backgroundColor: col2Colors[groupIdx] ?? "#fff0cc",
              borderRight:     i < COLS_2 - 1 ? "1px solid rgba(26,26,26,0.15)" : "none",
              boxSizing:       "border-box",
            }}
          />
        );
      })}

      {/* Row 3-7: 12 columns that merge into 6 while expanding vertically */}
      {Array.from({ length: COLS_45 }, (_, i) => {
        const pairIdx = Math.floor(i / 2);
        return (
          <div
            key={`r37-${i}`}
            ref={el => { col37Refs.current[i] = el; }}
            style={{
              position:        "fixed",
              zIndex:          300,
              left:            OFFSET + i * cW12,
              top:             r45Top,
              width:           cW12,
              height:          r45H,
              backgroundColor: col37Colors[pairIdx] ?? "#fff0cc",
              borderRight:     i < COLS_45 - 1 ? "1px solid rgba(26,26,26,0.2)" : "none",
              boxSizing:       "border-box",
              overflow:        "hidden",
            }}
          />
        );
      })}

      {/* Row 8: 24 swatches slide up from slightly below their final position */}
      {Array.from({ length: SWATCHES }, (_, i) => (
        <div
          key={`r8-${i}`}
          ref={el => { col8Refs.current[i] = el; }}
          style={{
            position:        "fixed",
            zIndex:          300,
            left:            OFFSET + i * swW,
            top:             r8Top + r8H * 0.25,
            width:           swW,
            height:          r8H,
            backgroundColor: col8Colors[i] ?? "#fff0cc",
            borderRight:     i < SWATCHES - 1 ? "1px solid rgba(26,26,26,0.15)" : "none",
            boxSizing:       "border-box",
            opacity:         0,
          }}
        />
      ))}
    </>
  );
}
