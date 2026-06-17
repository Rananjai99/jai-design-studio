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
    const _cW48 = cW48, _cW6 = cW6, _cW12 = cW12;
    const _r2Top = r2Top, _r2H = r2H;
    const _r45Top = r45Top, _r37Top = r37Top, _r45H = r45H, _r37H = r37H;
    const _r8Top = r8Top, _r8H = r8H, _swW = swW;

    // Phase 1 — merge all three rows simultaneously (double rAF commits initial paint first)
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const merge = [
          "left   0.55s cubic-bezier(0.16, 1, 0.3, 1)",
          "top    0.55s cubic-bezier(0.16, 1, 0.3, 1)",
          "width  0.55s cubic-bezier(0.16, 1, 0.3, 1)",
          "height 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
          "opacity 0.35s ease",
        ].join(", ");

        // Row 2: 48 columns merge horizontally into 6 (groups of 8)
        col2Refs.current.forEach((el, i) => {
          if (!el) return;
          const isLeader = i % MERGE_2 === 0;
          el.style.transition = merge;
          // top and height don't change for Row 2
          if (isLeader) {
            el.style.width = `${_cW6}px`;   // expands to full group width
          } else {
            el.style.width   = "0px";        // collapses into the group leader
            el.style.opacity = "0";
          }
          void _cW48; void _r2Top; void _r2H; // captured
        });

        // Row 3-7: 12 columns merge into 6 while expanding vertically
        col37Refs.current.forEach((el, i) => {
          if (!el) return;
          const isEven = i % 2 === 0;
          el.style.transition = merge;
          el.style.top    = `${_r37Top}px`;
          el.style.height = `${_r37H}px`;
          if (isEven) {
            el.style.width = `${_cW6}px`;
          } else {
            el.style.width   = "0px";
            el.style.opacity = "0";
          }
          void _cW12;
        });

        // Row 8: swatches slide up from below and fade in
        col8Refs.current.forEach((el) => {
          if (!el) return;
          el.style.transition = [
            "top     0.55s cubic-bezier(0.16, 1, 0.3, 1)",
            "opacity 0.35s ease 0.15s",
          ].join(", ");
          el.style.top     = `${_r8Top}px`;
          el.style.opacity = "1";
          void _swW; void _r8H;
        });
      });
    });

    // Phase 2 — navigate early so category page mounts behind the still-solid overlay
    const navId = setTimeout(() => {
      router.push(pageTransition.targetRoute);
    }, 320);

    // Phase 3 — fade entire overlay out; category page is already rendered
    const fadeId = setTimeout(() => {
      const fade = "opacity 0.22s ease";
      [...col2Refs.current, ...col37Refs.current, ...col8Refs.current].forEach(el => {
        if (!el) return;
        el.style.transition = fade;
        el.style.opacity    = "0";
      });
    }, 680);

    // Phase 4 — remove overlay
    const clearId = setTimeout(clearPageTransition, 950);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(navId);
      clearTimeout(fadeId);
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
