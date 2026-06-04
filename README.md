# Jai Design Studio — Portfolio Website Boilerplate

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Add required fonts (see public/fonts/FONTS_REQUIRED.txt)
#    Place Langdon.woff2, Langdon.woff, Moon.woff2, Moon.woff
#    in the /public/fonts/ folder

# 3. Start development server
npm run dev

# 4. Open http://localhost:3000
```

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — theme colour transitions, ColourPicker fade-in
- **GSAP** — logo SVG draw animation, canvas pan
- **next-intl** — English + Hindi bilingual support

## Project Structure
```
src/
├── app/
│   └── page.tsx              # Entry point — landing + home canvas in pan container
├── components/
│   ├── canvas/
│   │   ├── WorkingCanvas.tsx       # Master 8-row grid container
│   │   ├── CanvasRow1.tsx          # Header: studio name, bio, contact, EN|HI toggle
│   │   ├── CanvasRow2.tsx          # Fine grid (16/48 cols) — border only
│   │   ├── CanvasRow3.tsx          # Colour labels (8/24 cols)
│   │   ├── CanvasRow45.tsx         # Merged double-height: swatches / nav titles
│   │   ├── CanvasRow6.tsx          # Solid colour cells (8/24 cols)
│   │   ├── CanvasRow7.tsx          # Solid colour cells (16/48 cols)
│   │   └── CanvasRow8.tsx          # Full-width gradient bar
│   ├── logo/
│   │   └── LogoAnimation.tsx       # Fixed sticky logo + SVG draw animation
│   └── theme/
│       └── ColourPicker.tsx        # Landing page colour selection list
├── context/
│   └── ThemeContext.tsx            # Theme state, CSS var injection, localStorage
├── hooks/
│   ├── useLogoAnimation.ts         # Logo animation trigger logic
│   └── useCanvasPan.ts             # GSAP horizontal pan (landing → home)
├── lib/
│   └── themes.config.ts            # All 10 colour themes, complete hex palettes
├── styles/
│   └── globals.css                 # Font faces, CSS custom properties, resets
└── messages/
    ├── en.json                     # English strings
    └── hi.json                     # Hindi strings
```

## Colour Themes
10 options: Red, Pink, Blue, White, Black, Green, Purple, Yellow, Orange, Default.
- **Blue** and **Default**: exact hex values from design artboards
- **All others**: follow the same brighten/darken derivation logic
- **Default**: hardcoded 6-stop gradient preset (grey → yellow → pink → red)

Theme is stored in `localStorage` and restored before first paint (no flash).

## Canvas Grid (design spec)
| Row | Height | Landing cols | Home cols | Style |
|-----|--------|-------------|-----------|-------|
| 1 | 181.25px | 1 | 1 | Border + #fff0cc |
| 2 | 181.25px | 16 | 48 | Border + #fff0cc |
| 3 | 181.25px | 8 | 24 | Border + hex labels |
| 4+5 | 362.5px | 12 merged | 12 merged | No border, solid colour |
| 6 | 181.25px | 8 | 24 | No border, solid colour |
| 7 | 181.25px | 16 | 48 | No border, solid colour |
| 8 | 181.25px | 1 | 1 | No border, gradient |

## Key Interaction Flow
1. Page loads → logo SVG draw animation fires
2. Animation completes → ColourPicker fades in to the right of canvas
3. User selects colour → all cells morph via Framer Motion
4. User clicks ENTER → GSAP pans canvas left, home canvas slides in
5. Row 3 expands 4→24 labels; Row 4+5 shows nav page titles
6. Logo stays fixed; tagline overlay appears cutting across the "i"

## Next Steps
- Add individual project pages (canvas morphs into project layout)
- Set up Sanity.io CMS for project content
- Complete Hindi translations in messages/hi.json
- Add Sanity Studio at /studio
- Implement scroll behaviour within project pages
