"use client";
import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { PageRow1 } from "@/components/page/PageRow1";
import { PageRow2 } from "@/components/page/PageRow2";
import { PageRow37 } from "@/components/page/PageRow37";
import { PageRow8 } from "@/components/page/PageRow8";
import styles from "./page.module.css";

const CANVAS_W    = 2480;
const CANVAS_H    = 1450;
const OFFSET      = 48;
const ROW_H       = 181.25;            // 1 row
const ROW_37_H    = 5 * ROW_H;        // rows 3-7
const ROW_37_TOP  = 2 * ROW_H;        // rows 1+2 above
const SWATCH_UNIT = CANVAS_W / 24;
const SELECTED_W  = SWATCH_UNIT * 20;
const COLLAPSED_W = (SWATCH_UNIT * 4) / 5;

const PAGE_TITLES: Record<string, string> = {
  "urban-design":              "Urban Design",
  "architecture-interiors":    "Architecture & Interiors",
  "industrial-design":         "Industrial Design",
  "furniture-design":          "Furniture Design",
  "photography":               "Photography",
  "graphic-design":            "Graphic Design",
  "apparel-design":            "Apparel Design",
  "about":                     "About Us",
  "socials":                   "Socials",
};

interface ProjectMedia { cover?: string; photos: string[]; }

const PROJECT_MEDIA: Record<string, Record<number, ProjectMedia>> = {
  "architecture-interiors": {
    0: {
      cover: "/images/architecture-interiors/project-1/cover/poster8.jpg",
      photos: [
        "/images/architecture-interiors/project-1/photos/poster1.jpg",
        "/images/architecture-interiors/project-1/photos/poster4.jpg",
        "/images/architecture-interiors/project-1/photos/poster6.jpg",
        "/images/architecture-interiors/project-1/photos/poster7.jpg",
        "/images/architecture-interiors/project-1/photos/poster8.jpg",
      ],
    },
    1: {
      cover: "/images/architecture-interiors/project-2/cover/poster (1).jpg",
      photos: [
        "/images/architecture-interiors/project-2/photos/poster (1).jpg",
      ],
    },
    2: {
      cover: "/images/architecture-interiors/project-3/cover/poster 01.jpg",
      photos: [
        "/images/architecture-interiors/project-3/photos/poster 00.jpg",
        "/images/architecture-interiors/project-3/photos/poster 01.jpg",
        "/images/architecture-interiors/project-3/photos/poster 02.jpg",
        "/images/architecture-interiors/project-3/photos/poster 04.jpg",
        "/images/architecture-interiors/project-3/photos/poster 05.jpg",
        "/images/architecture-interiors/project-3/photos/poster 06.jpg",
      ],
    },
    3: {
      cover: "/images/architecture-interiors/project-4/cover/1 Tiny House.jpg",
      photos: [
        "/images/architecture-interiors/project-4/photos/1 Tiny House.jpg",
        "/images/architecture-interiors/project-4/photos/01.jpg",
        "/images/architecture-interiors/project-4/photos/02.jpg",
        "/images/architecture-interiors/project-4/photos/03.jpg",
        "/images/architecture-interiors/project-4/photos/3.jpg",
        "/images/architecture-interiors/project-4/photos/4.png",
        "/images/architecture-interiors/project-4/photos/5.png",
        "/images/architecture-interiors/project-4/photos/6.png",
        "/images/architecture-interiors/project-4/photos/7.png",
      ],
    },
    4: {
      photos: [],
    },
    5: {
      photos: [],
    },
  },
  "furniture-design": {
    0: {
      cover: "/images/furniture-design/project-2/cover/Maithu_04 Poster (1).jpg",
      photos: [
        "/images/furniture-design/project-2/photos/03 (1).jpg",
        "/images/furniture-design/project-2/photos/Maithu_04 Poster (1).jpg",
      ],
    },
    1: {
      photos: [
        "/images/furniture-design/project-3/photos/1 Main.jpg",
        "/images/furniture-design/project-3/photos/2 Side 1.jpg",
        "/images/furniture-design/project-3/photos/3 Side 2.jpg",
      ],
    },
  },
  "industrial-design": {
    0: {
      cover: "/images/industrial-design/project-1/cover/60f849692e5019fbc452d770440388a3.jpg",
      photos: [
        "/images/industrial-design/project-1/photos/000256aed5a573d4ac92fb9cdb554803.jpg",
        "/images/industrial-design/project-1/photos/27afd8d9b09bc7ddec578bdc08cccde6.jpg",
        "/images/industrial-design/project-1/photos/3e5bf38d52cd4c63299852ef1fd10743.jpg",
        "/images/industrial-design/project-1/photos/444cdf0bbc89f760082ee18957db8b29.jpg",
        "/images/industrial-design/project-1/photos/4990cd2e6de00a61750386e29494f03d.jpg",
        "/images/industrial-design/project-1/photos/60f849692e5019fbc452d770440388a3.jpg",
        "/images/industrial-design/project-1/photos/92e19b2253c3abca4ccc49efc4b97b52.jpg",
        "/images/industrial-design/project-1/photos/99ef76ec7f0481309652f8d596b04ec0.jpg",
        "/images/industrial-design/project-1/photos/a4264f6305ad146a8e237d06a53a2a04.jpg",
      ],
    },
  },
  "photography": {
    0: {
      cover: "/images/photography/project-1/cover/_DSC2513.jpg",
      photos: [
        "/images/photography/project-1/photos/_DSC1971.jpg",
        "/images/photography/project-1/photos/_DSC2276-Edit.jpg",
        "/images/photography/project-1/photos/_DSC2328-HDR.jpg",
        "/images/photography/project-1/photos/_DSC2350-HDR-Edit.jpg",
        "/images/photography/project-1/photos/_DSC2482.jpg",
        "/images/photography/project-1/photos/_DSC2493.jpg",
        "/images/photography/project-1/photos/_DSC2513.jpg",
        "/images/photography/project-1/photos/_DSC2634.jpg",
        "/images/photography/project-1/photos/_DSC2635.jpg",
        "/images/photography/project-1/photos/_DSC2637.jpg",
        "/images/photography/project-1/photos/_DSC2684.jpg",
        "/images/photography/project-1/photos/_DSC2706.jpg",
        "/images/photography/project-1/photos/_DSC2714.jpg",
        "/images/photography/project-1/photos/_DSC2716.jpg",
        "/images/photography/project-1/photos/_DSC2722.jpg",
      ],
    },
    1: {
      cover: "/images/photography/project-2/cover/Tiger4.jpg",
      photos: [
        "/images/photography/project-2/photos/Laxmi.jpg",
        "/images/photography/project-2/photos/Laxmi2.jpg",
        "/images/photography/project-2/photos/Tiger4.jpg",
      ],
    },
    2: {
      cover: "/images/photography/project-3/cover/rebari3-Edit.jpg",
      photos: [
        "/images/photography/project-3/photos/DSC_0806.jpg",
        "/images/photography/project-3/photos/DSC_0855-Edit.jpg",
        "/images/photography/project-3/photos/DSC_0864-Edit-Edit.jpg",
        "/images/photography/project-3/photos/DSC_7003-Edit.jpg",
        "/images/photography/project-3/photos/Pushkar.jpg",
        "/images/photography/project-3/photos/rebari3-Edit.jpg",
        "/images/photography/project-3/photos/_DSC2433-Edit.jpg",
      ],
    },
    3: {
      cover: "/images/photography/project-4/cover/Chicago COla Complete.jpg",
      photos: [
        "/images/photography/project-4/photos/1.jpg",
        "/images/photography/project-4/photos/6 Chicago Bold Uncoloured.jpg",
        "/images/photography/project-4/photos/8.jpg",
        "/images/photography/project-4/photos/Chicago Dystopia.jpg",
        "/images/photography/project-4/photos/Chicagi Ird.jpg",
        "/images/photography/project-4/photos/Chicago Cerise.jpg",
        "/images/photography/project-4/photos/Chicago COla Complete.jpg",
        "/images/photography/project-4/photos/Chicago Moon no text.jpg",
        "/images/photography/project-4/photos/Chicago Neon 1.jpg",
        "/images/photography/project-4/photos/Neon UIC 1.jpg",
        "/images/photography/project-4/photos/The Carlyle Poster.jpg",
      ],
    },
    4: {
      cover: "/images/photography/project-5/cover/Birdie.jpg",
      photos: [
        "/images/photography/project-5/photos/Birdie.jpg",
        "/images/photography/project-5/photos/DSC01847.JPG",
        "/images/photography/project-5/photos/DSC_0621.jpg",
        "/images/photography/project-5/photos/DSC_7356.jpg",
        "/images/photography/project-5/photos/The Golden Oriole.jpg",
      ],
    },
    5: {
      cover: "/images/photography/project-6/cover/_DSC5620-Pano-Edit-Edit.jpg",
      photos: [
        "/images/photography/project-6/photos/IMG_20200624_170523.jpg",
        "/images/photography/project-6/photos/IMG_20200624_191856.jpg",
        "/images/photography/project-6/photos/_DSC0588.jpg",
        "/images/photography/project-6/photos/_DSC0727.jpg",
        "/images/photography/project-6/photos/_DSC5620-Pano-Edit-Edit.jpg",
        "/images/photography/project-6/photos/_DSC9748-2.jpg",
        "/images/photography/project-6/photos/base.jpg",
      ],
    },
  },
};

const PROJECT_NAMES: Record<string, string[]> = {
  "architecture-interiors": [
    "'Gunijan Khana'\nArtist Homes",
    "'Khandal House'\nPrivate Residence",
    "'Domotex'\nGermany",
    "Tiny House Project,\nUSA",
    "Chaksu House",
    "Kimbal",
  ],
  "furniture-design": [
    "Project 1",
    "Project 2",
  ],
  "industrial-design": [
    "Project 1",
  ],
  "photography": [
    "CHICAGO:\nThis vs This",
    "WILDLIFE:\nTigers",
    "COLOURS I:\nRajasthan",
    "COLOURS II:\nChicago",
    "STREETSCAPE:\nIndia",
    "BLACK & WHITE:\nTrial",
  ],
};

/** Canvas-space left edge of project i when prevSel is the active project. */
function squeezedLeft(newSel: number, prevSel: number): number {
  const j = newSel < prevSel ? newSel : newSel - 1;
  return SELECTED_W + j * COLLAPSED_W;
}

interface FlyPhoto {
  key: number;
  photoSrc: string;
  overlayColor: string;
  /** Screen-space starting rect */
  fromLeft: number; fromTop: number; fromW: number; fromH: number;
  /** Screen-space destination (same top/height, same width — translation only) */
  toLeft: number; toW: number;
}


const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const router = useRouter();
  const { navigateToLanding, theme } = useTheme();
  const pageTitle = PAGE_TITLES[category];

  const [vp, setVp] = useState({ w: 1440, h: 900 });
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [flyPhoto, setFlyPhoto] = useState<FlyPhoto | null>(null);

  // Refs so the fly effect always has the latest values without re-running on every change
  const prevSelRef   = useRef<number | null>(null);
  const scaleRef     = useRef(1);
  const hexColorRef  = useRef(theme.pageColors.hexColor);
  const flyKeyRef    = useRef(0);

  useIsoLayoutEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scale   = (vp.h - 2 * OFFSET) / CANVAS_H;
  const scaledW = CANVAS_W * scale;
  const backLeft = OFFSET + scaledW + OFFSET;

  // Keep refs current
  useEffect(() => { scaleRef.current = scale; }, [scale]);
  useEffect(() => { hexColorRef.current = theme.pageColors.hexColor; }, [theme]);

  // Trigger flying photo when switching between open projects.
  // useIsoLayoutEffect so setFlyPhoto fires before the browser paints — this ensures
  // isFlyActive=true on the very first frame, preventing the new project's bg photo
  // from appearing at the wrong (narrow) column width.
  useIsoLayoutEffect(() => {
    const prevSel = prevSelRef.current;
    prevSelRef.current = selectedProject;

    if (prevSel !== null && selectedProject !== null && prevSel !== selectedProject) {
      const s = scale; // use current render's scale directly

      // Fly-in: new project's photo+overlay at FULL size, starting at the new
      // project's current narrow-column left edge, sliding LEFT to canvas left=0.
      const newColLeft   = squeezedLeft(selectedProject, prevSel);
      const rowTop       = OFFSET + ROW_37_TOP * s;
      const rowH         = ROW_37_H * s;
      const fullW        = SELECTED_W * s;
      const firstPhoto   = PROJECT_MEDIA[category]?.[selectedProject]?.photos[0] ?? "";
      const newOverlay   = (theme.pageColors.row37 as string[])[selectedProject] ?? "#fff0cc";
      flyKeyRef.current += 1;
      setFlyPhoto({
        key:          flyKeyRef.current,
        photoSrc:     firstPhoto,
        overlayColor: newOverlay,
        fromLeft: OFFSET + newColLeft * s,
        fromTop:  rowTop,
        fromW:    fullW,
        fromH:    rowH,
        toLeft:   OFFSET,
        toW:      fullW,
      });

      const timer = setTimeout(() => setFlyPhoto(null), 700);
      return () => clearTimeout(timer);
    }
  }, [selectedProject, scale]);

  const onColEnter = useCallback((col: number) => setHoveredCol(col), []);
  const onColLeave = useCallback(() => setHoveredCol(null), []);
  const onProjectClick = useCallback((col: number) => {
    setSelectedProject(prev => (prev === col ? prev : col));
  }, []);
  const onDeselect = useCallback(() => setSelectedProject(null), []);

  if (!pageTitle) return notFound();

  return (
    <div className={styles.pageRoot} onClick={onDeselect}>
      <div className={styles.viewport}>
        <div
          className={styles.canvasPositioner}
          style={{
            transform: `translate(${OFFSET}px, ${OFFSET}px) scale(${scale})`,
            ["--canvas-scale" as string]: scale,
          }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ width: CANVAS_W, height: CANVAS_H }}>
            <div className={styles.shadow} aria-hidden="true">
              <div className={styles.shadowShape} />
            </div>
            <div className={styles.canvas}>
              <PageRow1 pageTitle={pageTitle} />
              <PageRow2
                hoveredCol={hoveredCol} onColEnter={onColEnter} onColLeave={onColLeave}
                selectedProject={selectedProject} onProjectClick={onProjectClick}
                isFlyActive={flyPhoto !== null}
                projectNames={PROJECT_NAMES[category]}
              />
              <PageRow37
                hoveredCol={hoveredCol} onColEnter={onColEnter} onColLeave={onColLeave}
                selectedProject={selectedProject} onProjectClick={onProjectClick}
                isFlyActive={flyPhoto !== null}
                media={PROJECT_MEDIA[category]}
                canvasScale={scale}
              />
              <PageRow8 selectedProject={selectedProject} isFlyActive={flyPhoto !== null} />
            </div>
          </div>
        </div>

        {/* Flying photo — position:fixed so it escapes the canvas overflow:hidden
            and slides above every layer while the project switch animates. */}
        {/* Fly-in: new project's photo+overlay at full size, slides left to position 0 */}
        {flyPhoto && (
          <motion.div
            key={flyPhoto.key}
            initial={{ left: flyPhoto.fromLeft, width: flyPhoto.fromW }}
            animate={{ left: flyPhoto.toLeft,   width: flyPhoto.toW   }}
            style={{
              position:      "fixed",
              top:           flyPhoto.fromTop,
              height:        flyPhoto.fromH,
              overflow:      "hidden",
              zIndex:        9999,
              pointerEvents: "none",
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => setFlyPhoto(null)}
          >
            <img
              src={flyPhoto.photoSrc} alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div
              style={{ position: "absolute", inset: 0, backgroundColor: flyPhoto.overlayColor, opacity: 0.5 }}
            />
          </motion.div>
        )}

        {/* Nav buttons — screen-space, right of the canvas */}
        <button
          className={styles.backBtn}
          style={{ left: backLeft, top: OFFSET }}
          onClick={() => selectedProject !== null ? onDeselect() : router.back()}
        >
          ← Back
        </button>
        <button
          className={styles.backBtn}
          style={{ left: backLeft, top: OFFSET + 60 }}
          onClick={() => { navigateToLanding(); router.push("/"); }}
        >
          ⌂ First Page
        </button>
      </div>
    </div>
  );
}
