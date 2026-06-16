"use client";
/**
 * CanvasLogo — the stylised "JAI" logo placed inside the big merged rectangle
 * on the landing canvas (right half, rows 3–6).
 *
 * Entrance animation (GSAP stroke-draw): each stroke starts from a point and
 * "flows" along the letter's direction (round line-caps give the starting dot).
 *  - "J" and "I" flow from the TOP downward (drawn from their top start point).
 *  - "A" flows straight up from the BOTTOM (main arch drawn from its bottom leg;
 *    the inner stroke is drawn in reverse so it too originates at the bottom).
 *
 * Replays each time the landing page becomes active.
 */
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useTheme } from "@/context/ThemeContext";
import { CanvasPage } from "@/components/canvas/WorkingCanvas";
import styles from "./CanvasLogo.module.css";

const STROKE = {
  fill: "none" as const,
  stroke: "#1a1a1a",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeMiterlimit: 10,
  strokeWidth: 9, // ~3px on screen (≈ +1px over the previous 6 / ~2px)
};

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : () => {};

interface CanvasLogoProps {
  page?: CanvasPage;
  /** Logo-zone left edge & width as fractions of the canvas (the merged block). */
  left?: number;
  width?: number;
}

export function CanvasLogo({ page = "landing", left = 0.5, width = 0.5 }: CanvasLogoProps) {
  const { isOnLanding } = useTheme();
  // Only the landing logo stroke-draws (when the landing is active). The home
  // logo never animates — it renders fully drawn and static.
  const active = page === "landing" && isOnLanding;
  const jStem = useRef<SVGPathElement>(null);
  const jDot = useRef<SVGCircleElement>(null);
  const iStem = useRef<SVGPathElement>(null);
  const iDot = useRef<SVGCircleElement>(null);
  const aMain = useRef<SVGPathElement>(null);
  const aInner = useRef<SVGPathElement>(null);

  useIsoLayoutEffect(() => {
    if (!active) return;
    const refs = [jStem, jDot, iStem, iDot, aMain, aInner];
    if (refs.some((r) => !r.current)) return;

    const lenOf = (el: SVGGeometryElement) => {
      try { return el.getTotalLength(); } catch { return 0; }
    };

    const ctx = gsap.context(() => {
      // Hide each stroke. dashoffset = +len draws forward (from the path's start
      // point); -len draws in reverse (from the path's end point).
      const arm = (el: SVGGeometryElement, reverse = false) => {
        const L = lenOf(el);
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: reverse ? -L : L });
      };
      arm(jStem.current!);        // starts at the top → flows down
      arm(jDot.current!);
      arm(iStem.current!);        // starts at the top → flows down
      arm(iDot.current!);
      arm(aMain.current!);        // starts at the bottom leg → flows up & over
      arm(aInner.current!, true); // reversed → flows up from the bottom

      const tl = gsap.timeline();
      const draw = (el: SVGGeometryElement, dur: number, at: number) =>
        tl.to(el, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut" }, at);

      // J — flows from the top
      draw(jDot.current!, 0.45, 0.1);
      draw(jStem.current!, 1.2, 0.2);
      // I — flows from the top
      draw(iDot.current!, 0.45, 0.25);
      draw(iStem.current!, 1.2, 0.35);
      // A — flows straight up from the bottom
      draw(aMain.current!, 1.5, 0.55);
      draw(aInner.current!, 1.2, 0.75);
    });
    return () => ctx.revert();
  }, [active]);

  return (
    <div
      className={styles.logoZone}
      style={{ left: `${left * 100}%`, width: `${width * 100}%` }}
      aria-hidden="true"
    >
      <svg
        className={styles.logoSvg}
        viewBox="0 0 760.57 1485.46"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Jai Design Studio logo"
      >
        {/* J — left stem + dot (flows from the top) */}
        <path ref={jStem} d="M160.1,732.88v592.47c0,87.04-70.56,157.6-157.6,157.6" {...STROKE} />
        <circle ref={jDot} cx="160.1" cy="661.65" r="27.4" {...STROKE} />

        {/* I — right stem + dot (flows from the top) */}
        <path ref={iStem} d="M600.47,100.95v1224.41c0,87.04,70.56,157.6,157.6,157.6" {...STROKE} />
        <circle ref={iDot} cx="600.47" cy="29.9" r="27.4" {...STROKE} />

        {/* A — double arch (flows up from the bottom) */}
        <path ref={aMain} d="M537.89,1482.96V475.31c0-87.04-70.56-157.6-157.6-157.6s-157.6,70.56-157.6,157.6v1007.65" {...STROKE} />
        <path ref={aInner} d="M419.69,322.67c-67.98,17.5-118.2,79.2-118.2,152.64v850.05" {...STROKE} />
      </svg>
    </div>
  );
}
