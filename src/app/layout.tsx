import type { Metadata } from "next";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/context/ThemeContext";
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
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
