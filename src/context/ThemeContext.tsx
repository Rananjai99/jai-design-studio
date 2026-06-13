"use client";
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { ThemeId, ColourTheme, themes, DEFAULT_THEME_ID } from "@/lib/themes.config";

interface ThemeContextValue {
  themeId: ThemeId;
  theme: ColourTheme;
  selectTheme: (id: ThemeId) => void;
  previewTheme: (id: ThemeId | null) => void;
  resetTheme: () => void;
  hasExplicitChoice: boolean;
  isOnLanding: boolean;
  navigateToHome: () => void;
  navigateToLanding: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

function injectThemeCSSVars(theme: ColourTheme): void {
  const root = document.documentElement;
  theme.row4_5.forEach((c, i) => root.style.setProperty(`--theme-row45-col${i + 1}`, c));
  theme.row6.forEach((c, i) => root.style.setProperty(`--theme-row6-col${i + 1}`, c));
  theme.row7.forEach((c, i) => root.style.setProperty(`--theme-row7-col${i + 1}`, c));
  theme.row8Gradient.forEach((c, i) => root.style.setProperty(`--theme-row8-stop${i + 1}`, c));
  const g8 = theme.row8Gradient.map((c, i) =>
    `${c} ${Math.round((i / (theme.row8Gradient.length - 1)) * 100)}%`).join(", ");
  root.style.setProperty("--theme-row8-gradient", `linear-gradient(to right, ${g8})`);
  const gs = theme.shadowColours.map((c, i) =>
    `${c} ${Math.round((i / (theme.shadowColours.length - 1)) * 100)}%`).join(", ");
  root.style.setProperty("--theme-shadow-gradient", `linear-gradient(135deg, ${gs})`);
  root.style.setProperty("--theme-shadow-colour", theme.shadowColours[0]);
  root.style.setProperty("--theme-shadow-mid", theme.shadowColours[Math.floor(theme.shadowColours.length / 2)]);
  root.style.setProperty("--theme-base-hex", theme.baseHex);
  root.style.setProperty("--theme-swatch-gradient", theme.swatchGradient);
}

export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('jai-theme');if(s)document.documentElement.setAttribute('data-theme',s);}catch(e){}})();`;

const STORAGE_KEY = "jai-theme";
const EXPLICIT_KEY = "jai-theme-explicit";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME_ID);
  const [previewId, setPreviewId] = useState<ThemeId | null>(null);
  const [hasExplicitChoice, setHasExplicitChoice] = useState(false);
  const [isOnLanding, setIsOnLanding] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
      const explicit = localStorage.getItem(EXPLICIT_KEY);
      if (saved && themes[saved]) {
        setThemeId(saved);
        setHasExplicitChoice(explicit === "true");
        injectThemeCSSVars(themes[saved]);
      } else {
        injectThemeCSSVars(themes[DEFAULT_THEME_ID]);
      }
    } catch {
      injectThemeCSSVars(themes[DEFAULT_THEME_ID]);
    }
  }, []);

  // Hovering a colour previews it without committing; the effective theme drives
  // all canvas rendering (CSS vars + the `theme` object the rows read).
  const effectiveId = previewId ?? themeId;
  const theme = useMemo(() => themes[effectiveId], [effectiveId]);

  useEffect(() => {
    injectThemeCSSVars(theme);
    document.documentElement.setAttribute("data-theme", effectiveId);
  }, [theme, effectiveId]);

  const selectTheme = useCallback((id: ThemeId) => {
    setThemeId(id);
    setPreviewId(null); // clicking commits — drop any hover preview
    setHasExplicitChoice(true);
    try { localStorage.setItem(STORAGE_KEY, id); localStorage.setItem(EXPLICIT_KEY, "true"); } catch {}
  }, []);

  const previewTheme = useCallback((id: ThemeId | null) => setPreviewId(id), []);

  const resetTheme = useCallback(() => {
    setThemeId(DEFAULT_THEME_ID);
    setPreviewId(null);
    setHasExplicitChoice(false);
    try { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(EXPLICIT_KEY); } catch {}
  }, []);

  const navigateToHome = useCallback(() => setIsOnLanding(false), []);
  const navigateToLanding = useCallback(() => setIsOnLanding(true), []);

  return (
    <ThemeContext.Provider value={{ themeId, theme, selectTheme, previewTheme, resetTheme, hasExplicitChoice, isOnLanding, navigateToHome, navigateToLanding }}>
      {children}
    </ThemeContext.Provider>
  );
}
