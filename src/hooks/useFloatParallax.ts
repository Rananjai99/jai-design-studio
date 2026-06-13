"use client";
/**
 * useFloatParallax — subtle "floating" parallax for an element.
 *
 * The element drifts a few pixels in the OPPOSITE direction to the cursor's
 * offset from the element's centre, eased with a spring so it feels like it's
 * gently floating. Returns spring-smoothed x/y motion values to spread on a
 * `motion.*` element's style.
 *
 * The drift is expressed in the element's LOCAL space, so pass `scale` (the
 * transform scale the element is rendered at) to keep the on-screen drift
 * constant regardless of how much a parent has scaled it down.
 *
 * Pass `frozen` to spring the element back to its resting centre and ignore
 * cursor movement (e.g. while the cursor is busy over an overlapping UI).
 *
 * Respects `prefers-reduced-motion`.
 */
import { RefObject, useEffect } from "react";
import { useMotionValue, useSpring, MotionValue } from "framer-motion";

export function useFloatParallax(
  ref: RefObject<HTMLElement>,
  scale: number = 1,
  maxPx: number = 6,
  frozen: boolean = false,
): { x: MotionValue<number>; y: MotionValue<number> } {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 90, damping: 18, mass: 0.7 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    // While frozen, recentre and don't track the cursor.
    if (frozen) { x.set(0); y.set(0); return; }

    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const px = e.clientX;
      const py = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        // Cursor offset from the element's centre, normalised to [-1, 1].
        const dx = clamp((px - (r.left + r.width / 2)) / (r.width / 2));
        const dy = clamp((py - (r.top + r.height / 2)) / (r.height / 2));
        const s = scale > 0 ? scale : 1;
        // Move OPPOSITE to the cursor; divide by scale so the on-screen drift
        // matches maxPx whatever the parent scale is.
        x.set((-dx * maxPx) / s);
        y.set((-dy * maxPx) / s);
      });
    };
    const recentre = () => { x.set(0); y.set(0); };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", recentre);
    window.addEventListener("blur", recentre);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", recentre);
      window.removeEventListener("blur", recentre);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, scale, maxPx, frozen, x, y]);

  return { x: sx, y: sy };
}
