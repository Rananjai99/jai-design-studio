"use client";
/**
 * useLogoAnimation — Controls the logo animation trigger state.
 * Returns shouldAnimate (true when on landing page).
 */
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export function useLogoAnimation() {
  const { isOnLanding } = useTheme();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isOnLanding) {
      setShouldAnimate(false);
      const t = setTimeout(() => setShouldAnimate(true), 50);
      return () => clearTimeout(t);
    } else {
      setShouldAnimate(false);
    }
  }, [isOnLanding]);

  return { shouldAnimate };
}
