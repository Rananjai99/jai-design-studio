"use client";
/**
 * CanvasRow1 — Header bar (full width, single column)
 * Landing: Studio name + EN|HI language toggle
 * Home: Studio name, bio, email, phone (left); email, phone (right)
 * Style: border only, #fff0cc fill
 */
import React from "react";
import { CanvasPage } from "./WorkingCanvas";
import styles from "./CanvasRows.module.css";

interface CanvasRow1Props {
  page: CanvasPage;
  language?: "en" | "hi";
  onLanguageToggle?: () => void;
}

const BIO = "Holistic design spanning architecture, urbanism, interiors, and craft. Calibrated precisely to our roots—the latitude of home. Where precision is a function of place, and perspective is fluid. We make the familiar new and the new familiar.";
const EMAIL = "architects.jai@gmail.com";
const PHONE = "+1-224-829-5822";

export function CanvasRow1({ page, language = "en", onLanguageToggle }: CanvasRow1Props) {
  return (
    <div className={`${styles.row} ${styles.row1} ${styles[page]}`}>
      <div className={styles.row1Left}>
        <span className={`${styles.studioName} langdon`}>JAI DESIGN STUDIO</span>
        {page === "landing" ? (
          <div className={styles.langToggle}>
            <button
              className={`${styles.langBtn} ${language === "en" ? styles.langActive : ""} moon`}
              onClick={onLanguageToggle}
            >ENGLISH</button>
            <span className={styles.langDot}>•</span>
            <button
              className={`${styles.langBtn} ${language === "hi" ? styles.langActive : ""} moon`}
              onClick={onLanguageToggle}
            >HINDI</button>
          </div>
        ) : (
          <p className={`${styles.bio} montserrat`}>{BIO}</p>
        )}
      </div>
      {page === "home" && (
        <div className={styles.row1Right}>
          <a href={`mailto:${EMAIL}`} className={`${styles.contact} montserrat`}>{EMAIL}</a>
          <a href={`tel:${PHONE}`} className={`${styles.contact} montserrat`}>{PHONE}</a>
        </div>
      )}
    </div>
  );
}
