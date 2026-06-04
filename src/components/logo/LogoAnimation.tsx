"use client";
/**
 * LogoAnimation — Fixed sticky logo above the canvas.
 * SVG draw/reveal animation via stroke-dashoffset (GSAP-ready).
 * Fires on every landing page load/return. Frozen on home page.
 * Tagline overlay appears on home page only, with rectangle cutting across the "i".
 */
import React, { useEffect, useRef, useCallback } from "react";
import styles from "./LogoAnimation.module.css";

interface LogoAnimationProps {
  animate: boolean;
  showTagline?: boolean;
  taglineBackgroundColour?: string;
  className?: string;
}

export function LogoAnimation({ animate, showTagline = false, taglineBackgroundColour = "#fff0cc", className }: LogoAnimationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const animatingRef = useRef(false);

  const getLen = (el: SVGGeometryElement | null) => { try { return el ? el.getTotalLength() : 0; } catch { return 0; } };

  const hideAll = useCallback(() => {
    if (!svgRef.current) return;
    svgRef.current.querySelectorAll<SVGGeometryElement>("path, circle").forEach((el) => {
      const len = getLen(el);
      el.style.transition = "none";
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      el.style.opacity = "0";
    });
  }, []);

  const reveal = (el: SVGGeometryElement | null, delay: number, dur: number): Promise<void> =>
    new Promise((res) => {
      if (!el) { res(); return; }
      setTimeout(() => {
        el.style.transition = `stroke-dashoffset ${dur}ms cubic-bezier(0.4,0,0.2,1), opacity 80ms`;
        el.style.strokeDashoffset = "0";
        el.style.opacity = "1";
        setTimeout(res, dur);
      }, delay);
    });

  const runAnimation = useCallback(async () => {
    if (!svgRef.current || animatingRef.current) return;
    animatingRef.current = true;
    hideAll();
    await new Promise(r => setTimeout(r, 80)); // allow repaint after hide
    const paths = svgRef.current.querySelectorAll<SVGGeometryElement>("path, circle");
    const [p1, p2, p3, p4, c1, c2] = Array.from(paths);
    await reveal(p4, 0, 600);
    await reveal(c1, 100, 300);
    await reveal(p1, 200, 800);
    await reveal(p2, 400, 600);
    await reveal(p3, 600, 600);
    await reveal(c2, 700, 300);
    animatingRef.current = false;
  }, [hideAll]);

  useEffect(() => {
    if (animate) {
      const t = setTimeout(runAnimation, 150);
      return () => clearTimeout(t);
    }
  }, [animate, runAnimation]);

  return (
    <div className={[styles.logoContainer, className].filter(Boolean).join(" ")}>
      <div className={styles.logoInner}>
        <div className={styles.ruleLine} />
        <div className={styles.svgWrapper}>
          <svg ref={svgRef} viewBox="0 0 760.57 1485.46" xmlns="http://www.w3.org/2000/svg"
            className={styles.logoSvg} aria-label="Jai Design Studio logo" role="img">
            {/* Main arch */}
            <path d="M537.89,1482.96V475.31c0-87.04-70.56-157.6-157.6-157.6s-157.6,70.56-157.6,157.6v1007.65"
              fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5"/>
            {/* Inner arch */}
            <path d="M419.69,322.67c-67.98,17.5-118.2,79.2-118.2,152.64v850.05"
              fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5"/>
            {/* Left stem + arc */}
            <path d="M160.1,732.88v592.47c0,87.04-70.56,157.6-157.6,157.6"
              fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5"/>
            {/* Right stem */}
            <path d="M600.47,100.95v1224.41c0,87.04,70.56,157.6,157.6,157.6"
              fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5"/>
            {/* Top circle */}
            <circle cx="600.47" cy="29.9" r="27.4"
              fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5"/>
            {/* Mid circle */}
            <circle cx="160.1" cy="661.65" r="27.4"
              fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5"/>
          </svg>
          {showTagline && (
            <div className={styles.taglineOverlay} style={{ backgroundColor: taglineBackgroundColour }}>
              <span className={styles.taglineText}>LATITUDE OF HOME</span>
            </div>
          )}
        </div>
        <div className={styles.ruleLine} />
      </div>
    </div>
  );
}
