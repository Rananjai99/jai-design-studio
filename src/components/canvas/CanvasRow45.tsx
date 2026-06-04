"use client";
/**
 * CanvasRow45 — Merged rows 4+5 (double height = 362.5px)
 * Landing: 12 colour swatch columns + logo in centre columns
 * Home: 12 columns, each is a nav page title link
 * Colours animate from landing swatches → slide right → home columns during pan
 */
import React from "react";
import { motion } from "framer-motion";
import { CanvasPage, CANVAS } from "./WorkingCanvas";
import { useTheme } from "@/context/ThemeContext";
import styles from "./CanvasRows.module.css";

interface CanvasRow45Props {
  page: CanvasPage;
  onNavClick?: (slug: string) => void;
}

const NAV_ITEMS = [
  { label: "ABOUT US", slug: "about" },
  { label: "COMPANY\nTIMELINE", slug: "timeline" },
  { label: "URBAN\nDESIGN", slug: "urban-design" },
  { label: "ARCHITECTURE\n& INTERIORS", slug: "architecture-interiors" },
  { label: "INDUSTRIAL\nDESIGN", slug: "industrial-design" },
  { label: "FURNITURE\nDESIGN", slug: "furniture-design" },
  { label: "PHOTOGRAPHY", slug: "photography" },
  { label: "GRAPHIC\nDESIGN", slug: "graphic-design" },
  { label: "APPAREL\nDESIGN", slug: "apparel-design" },
];

export function CanvasRow45({ page, onNavClick }: CanvasRow45Props) {
  const { theme } = useTheme();
  const isHome = page === "home";

  return (
    <div className={`${styles.row} ${styles.row45} ${styles[page]}`}>
      {theme.row4_5.map((colour, i) => {
        const navItem = isHome ? NAV_ITEMS[i] : null;
        const isLogoZone = !isHome && (i === 4 || i === 5); // logo sits here on landing

        return (
          <motion.div
            key={i}
            className={`${styles.row45Cell} ${navItem ? styles.navCell : ""}`}
            style={{ backgroundColor: colour }}
            animate={{ backgroundColor: colour }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={navItem && onNavClick ? () => onNavClick(navItem.slug) : undefined}
          >
            {navItem && (
              <span className={`${styles.pageTitle} langdon`}>
                {navItem.label.split("\n").map((line, li) => (
                  <React.Fragment key={li}>{line}{li < navItem.label.split("\n").length - 1 && <br />}</React.Fragment>
                ))}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
