"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./PageRows.module.css";

const EMAIL = "architects.jai@gmail.com";
const PHONE = "+1-224-829-5822";

const STROKE = {
  fill: "none",
  stroke: "#1a1a1a",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeMiterlimit: 10,
  strokeWidth: 18,
};

interface PageRow1Props {
  pageTitle: string;
}

export function PageRow1({ pageTitle }: PageRow1Props) {
  const router = useRouter();
  return (
    <div className={`${styles.row} ${styles.row1}`}>

      {/* Column 1 — logo, one swatch wide */}
      <div className={styles.row1LogoCol}>
        <svg
          className={styles.row1LogoSvg}
          viewBox="0 0 760.57 1485.46"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Jai Design Studio logo"
        >
          <path d="M160.1,732.88v592.47c0,87.04-70.56,157.6-157.6,157.6" {...STROKE} />
          <circle cx="160.1" cy="661.65" r="27.4" {...STROKE} />
          <path d="M600.47,100.95v1224.41c0,87.04,70.56,157.6,157.6,157.6" {...STROKE} />
          <circle cx="600.47" cy="29.9" r="27.4" {...STROKE} />
          <path d="M537.89,1482.96V475.31c0-87.04-70.56-157.6-157.6-157.6s-157.6,70.56-157.6,157.6v1007.65" {...STROKE} />
          <path d="M419.69,322.67c-67.98,17.5-118.2,79.2-118.2,152.64v850.05" {...STROKE} />
        </svg>
      </div>

      {/* Column 2 — studio name, category, contact */}
      <div className={styles.row1Body}>
        <div className={styles.row1Left}>
          <span
            className={`${styles.studioName} langdon`}
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
            title="Back to home"
          >
            JAI DESIGN STUDIO
          </span>
          <span className={`${styles.pageSubtitle} langdon`}>{pageTitle}</span>
        </div>
        <div className={styles.row1Right}>
          <a href={`mailto:${EMAIL}`} className={`${styles.contact} montserrat`}>{EMAIL.toUpperCase()}</a>
          <a href={`tel:${PHONE}`}    className={`${styles.contact} montserrat`}>{PHONE}</a>
        </div>
      </div>

    </div>
  );
}
