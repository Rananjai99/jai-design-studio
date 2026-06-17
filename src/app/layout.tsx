import type { Metadata } from "next";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/context/ThemeContext";
import { CategoryTransitionOverlay } from "@/components/transition/CategoryTransitionOverlay";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Jai Design Studio",
  description: "Holistic design spanning architecture, urbanism, interiors, and craft.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Inject theme before paint to prevent FOUC */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        {/* Reusable SVG filter that gives the working-canvas drop shadow its soft
            blur + a grainy speckle. The blur runs first, then fractal-noise grain
            is composited INTO the blurred shadow's own alpha — so the grain stays
            crisp (it isn't blurred) and fades out with the shadow at its edges. */}
        <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
          <filter id="shadowGrain" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="13" result="blur" />
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7" stitchTiles="stitch" result="noise" />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0.825 0"
              result="grain"
            />
            <feComposite in="grain" in2="blur" operator="in" result="grainShape" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="grainShape" />
            </feMerge>
          </filter>
        </svg>
        <ThemeProvider>
          {children}
          <CategoryTransitionOverlay />
        </ThemeProvider>
      </body>
    </html>
  );
}
