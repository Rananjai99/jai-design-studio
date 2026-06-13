"use client";
/**
 * useCanvasPan — GSAP-powered camera that frames the working canvas.
 *
 * Both the landing and home canvases share the same top-left origin inside a
 * single "stage". The stage is transformed (translate + scale) to frame either:
 *   - the LANDING canvas (narrow box, anchored with equal left/top/bottom margins), or
 *   - the HOME canvas (wider box, centred with equal margins all round).
 *
 * Because the home canvas is wider and shares the landing's left edge, panning
 * from landing → home makes the home page feel like it extends off the right
 * edge of the landing box rather than sitting beside it.
 *
 * Returns { panRef, triggerPan, triggerReturn }.
 *   panRef       — attach to the stage element
 *   triggerPan   — landing → home (called on colour select)
 *   triggerReturn— home → landing
 */
import { useRef, useCallback, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { useTheme } from "@/context/ThemeContext";

export interface Cam {
  x: number;
  y: number;
  scale: number;
}

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useCanvasPan(landingCam: Cam, homeCam: Cam) {
  const stageRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const { isOnLanding, navigateToHome, navigateToLanding } = useTheme();

  // Keep the stage framed on the active view. Runs on mount and whenever the
  // viewport (and therefore the camera maths) changes — instant, no tween.
  // Skipped while a pan animation owns the transform.
  useIsoLayoutEffect(() => {
    if (!stageRef.current || animatingRef.current) return;
    const cam = isOnLanding ? landingCam : homeCam;
    // Reveal the stage only once the framing transform is applied. The stage
    // starts at opacity 0 (CSS) so the un-transformed, full-size SSR paint is
    // never shown — preventing the "zoomed-in" flash before hydration.
    gsap.set(stageRef.current, { transformOrigin: "0 0", x: cam.x, y: cam.y, scale: cam.scale, opacity: 1 });
  }, [
    isOnLanding,
    landingCam.x, landingCam.y, landingCam.scale,
    homeCam.x, homeCam.y, homeCam.scale,
  ]);

  const animate = useCallback((cam: Cam, navigate: () => void) => {
    const el = stageRef.current;
    if (!el) return;
    animatingRef.current = true;
    navigate();
    gsap.to(el, {
      x: cam.x,
      y: cam.y,
      scale: cam.scale,
      transformOrigin: "0 0",
      duration: 0.9,
      ease: "power3.inOut",
      onComplete: () => { animatingRef.current = false; },
    });
  }, []);

  const triggerPan = useCallback(() => animate(homeCam, navigateToHome), [animate, homeCam, navigateToHome]);
  const triggerReturn = useCallback(() => animate(landingCam, navigateToLanding), [animate, landingCam, navigateToLanding]);

  return { panRef: stageRef, triggerPan, triggerReturn };
}
