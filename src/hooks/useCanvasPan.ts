"use client";
/**
 * useCanvasPan — GSAP-powered horizontal pan from landing → home canvas.
 * Returns: { panRef, triggerPan }
 * panRef: attach to the outer scroll/pan container div
 * triggerPan(): call when user clicks ENTER on colour picker
 */
import { useRef, useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";

export function useCanvasPan() {
  const panRef = useRef<HTMLDivElement>(null);
  const { navigateToHome, navigateToLanding } = useTheme();

  const triggerPan = useCallback(async () => {
    // Dynamic import GSAP to avoid SSR issues
    const { gsap } = await import("gsap");
    const el = panRef.current;
    if (!el) return;

    navigateToHome();

    gsap.to(el, {
      x: "-826.6655px",   // pan left by landing canvas width (revealing home canvas)
      duration: 0.9,
      ease: "power3.inOut",
    });
  }, [navigateToHome]);

  const triggerReturn = useCallback(async () => {
    const { gsap } = await import("gsap");
    const el = panRef.current;
    if (!el) return;

    navigateToLanding();

    gsap.to(el, {
      x: "0px",
      duration: 0.9,
      ease: "power3.inOut",
    });
  }, [navigateToLanding]);

  return { panRef, triggerPan, triggerReturn };
}
