/**
 * themes.config.ts — Jai Design Studio
 * Complete colour theme definitions for all 10 themes.
 *
 * Blue and Default have fully specified hex values from design artboards.
 * All other themes follow the same brighten/darken derivation logic.
 */

export type ThemeId =
  | "red" | "pink" | "blue"
  | "green" | "purple" | "yellow" | "orange" | "default";

/** Colours for the category/service detail pages. */
export interface PageColours {
  row2: string[];    // 6 hex values — project header column backgrounds
  row37: string[];   // 6 hex values — large merged colour block
  row8: string[];    // 24 hex values — bottom swatch strip
  labelColor: string; // "PROJECT N" text colour
  hexColor: string;   // hex label text colour (Row 2, Row 3-7, Row 8)
}

/** Per-page colour overrides for the home canvas. Any field omitted falls back
 *  to the matching landing array. Lets home + landing show different palettes. */
export interface HomeColours {
  row3Labels?: Array<[string, string]>;
  row4_5?: string[];
  row6?: string[];
  row7?: string[];
  row8Gradient?: string[];
}

export interface ColourTheme {
  id: ThemeId;
  label: string;
  baseHex: string;
  row3Labels: Array<[string, string]>;  // [hex, name]
  row4_5: string[];      // 12 columns
  row6: string[];        // 24 values
  row7: string[];        // 48 values (first 24 used on landing)
  row8Gradient: string[];
  shadowColours: string[];
  swatchGradient: string;
  /** Home-canvas colour overrides (the landing arrays above stay landing-only). */
  home?: HomeColours;
  /** Category/service page colour palette. */
  pageColors: PageColours;
}

// ─── BLUE (reference theme — all hex from artboards) ─────────────────────────
const blue: ColourTheme = {
  id: "blue", label: "Blue", baseHex: "#1341ff",
  row3Labels: [
    ["#1341ff","Magic Ink"],["#2960ff","Bluerocratic"],
    ["#1341ff","Magic Ink"],["#2960ff","Blueocratic"],
    ["#4278ff","Secret of Mana"],["#5c8eff","Cornflower Blue"],
    ["#76a3ff","Fennel Flower"],["#90b6ff","Kitten's Eye"],
    ["#abc9ff","Night Snow"],["#ccdfff","Icy Plains"],
    ["#0900de","Ultramarine"],["#0600be","Medium Blue"],
  ],
  row4_5: [
    "#1341ff","#2960ff","#1341ff","#2960ff",
    "#4278ff","#5c8eff","#76a3ff","#90b6ff",
    "#abc9ff","#ccdfff","#fff0cc","#fff0cc",
  ],
  row6: [
    "#426dd6","#0f57de","#275cff","#0f57de",
    "#3d74ff","#2252de","#5487ff","#3867de",
    "#6c9aff","#4f7bde","#83adff","#668dde",
    "#9bbeff","#7d9ede","#b3ceff","#99b0de",
    "#7d9ede","#668dde","#83adff","#5ead91",
    "#91b6ff","#668dde","#9bbeff","#94aede",
  ],
  row7: [
    "#4278ff","#2960ff","#0900de","#0600be","#5487ff","#3d73ff","#0b2ebe","#07259e",
    "#6696ff","#5285ff","#1c45be","#15389e","#79a4ff","#6696ff","#2f57be","#25489e",
    "#9ebfff","#91b6ff","#668dde","#c4d9ff","#bcd4ff","#a6c5ff","#87c9e0","#687c9e",
    "#698fe2","#567edc","#3469fa","#0620b4","#0900de","#0600be","#5487ff","#3d73ff",
    "#2285ff","#5285ff","#1c53be","#1389e0","#79a4ff","#6696ff","#6696ff","#2f97be",
    "#9ebfff","#91b6ff","#668dde","#c4d9ff","#bcd4ff","#a6c5ff","#87c9e0","#687c9e",
  ],
  row8Gradient: ["#1341ff","#5c8eff"],
  shadowColours: ["#0b2ebe","#1341ff","#4278ff","#90b6ff","#ccdfff"],
  swatchGradient: "linear-gradient(to bottom, #1341ff, #4278ff)",
  pageColors: {
    row2:  ["#275cff","#275cff","#3d74ff","#5487ff","#6c9aff","#83adff"],
    row37: ["#1341ff","#2960ff","#4278ff","#5c8eff","#76a3ff","#90b6ff"],
    row8:  [
      "#4278ff","#2960ff","#0900de","#0600be",
      "#5487ff","#3d73ff","#0b2ebe","#07259e",
      "#6696ff","#5285ff","#1c45be","#15389e",
      "#79a4ff","#6696ff","#2f57be","#25489e",
      "#8bb2ff","#7ba6ff","#4f7bde","#36569e",
      "#9ebfff","#91b6ff","#668dde","#5678be",
    ],
    labelColor: "#ffffff",
    hexColor:   "#ff0009",
  },
  home: {
    row3Labels: [
      ["#0b2ebe","Blue Screens of Death"],["#0f37de","Sapphire Glitter"],
      ["",""],["",""],["",""],["",""],
      ["#1341ff","Magic Ink"],["#2960ff","Bluerocratic"],
      ["#4278ff","Secret of Mana"],["#5c8eff","Cornflower Blue"],
      ["#76a3ff","Fennel Flower"],["#90b6ff","Kitten's Eye"],
      ["#abc9ff","Night Snow"],["#ccdfff","Icy Plains"],
    ],
    row4_5: ["#0b2ebe","#0f37de","#1341ff","#2960ff","#4278ff","#5c8eff","#76a3ff","#90b6ff","#abc9ff","#ccdfff"],
    row6: [
      "#426dd6","#274eb5","#2a5ced","#1139ca","#ffeec0","#ffeec0","#ffeec0","#ffeec0",
      "#426dd6","#0f37de","#275cff","#0f37de","#3d74ff","#2252de","#5487ff","#3867de",
      "#6c9aff","#4f7bde","#83adff","#668dde","#9bbeff","#7d9ede","#b3ceff","#94aede",
    ],
    row7: [
      "#698fe2","#567edc","#20419a","#193580","#5685f4","#4071f1","#0c2fac","#082690",
      "#4c7ffd","#3469fa","#0620b4","#041997","#4c7ffd","#3469fa","#0827d3","#0620b4",
      "#4278ff","#2960ff","#0900de","#0600be","#5487ff","#3d73ff","#0b2ebe","#07259e",
      "#6696ff","#5285ff","#1245be","#15389e","#79a4ff","#6696ff","#2757be","#25489e",
      "#8bb2ff","#7ba6ff","#4f7bde","#36569e","#9ebfff","#91b6ff","#668dde","#5678be",
      "#b1ccff","#a6c5ff","#7d9ede","#6a86be","#c4d9ff","#bcd4ff","#7e95be","#687c9e",
    ],
    row8Gradient: ["#0b2ebe","#ccdfff"],
  },
};

// ─── DEFAULT (hardcoded preset — grey→cream→yellow→pink→red) ─────────────────
const defaultTheme: ColourTheme = {
  id: "default", label: "Default", baseHex: "#ffc300",
  row3Labels: [
    ["#ffc300","Citrus Splash"],["#ff44a1","Major Magenta"],
    ["#ffc300","Magic Ink"],["#ff44a1","Blueocratic"],
    ["#ff0073","Secret of Mana"],["#ff0009","Cornflower Blue"],
    ["#76a3ff","Fennel Flower"],["#90b6ff","Kitten's Eye"],
    ["#abc9ff","Night Snow"],["#ccdfff","Icy Plains"],
    ["#0900de","Ultramarine"],["#0600be","Medium Blue"],
  ],
  row4_5: [
    "#ffc300","#ff44a1","#fff0cc","#ffe3a3",
    "#ffc300","#ff44a1","#ff0073","#ff0009",
    "#fff0cc","#fff0cc","#fff0cc","#fff0cc",
  ],
  row6: [
    "#ffca42","#dea900","#ff5eaa","#de3a8b",
    "#ff5eaa","#de3a8b","#ff769b","#be3076",
    "#be3076","#9e2b62","#ff5d8e","#be0054",
    "#be0054","#9e0043","#ff7766","#ff5e4e",
    "#ff5e4e","#be0003","#9e0003","#be0003",
    "#9e0003","#ff7766","#ff5e4e","#be0003",
  ],
  row7: [
    "#ffd679","#ffd060","#be9000","#9e7800","#ff87bc","#ff73b3","#be3076","#9e2b62",
    "#ff769b","#be2b62","#ff769b","#be0045","#9e0045","#ff7766","#ff5e4e","#be0003",
    "#9e0003","#be0003","#9e0003","#ff7766","#ff5e4e","#be0003","#9e0003","#9e0003",
    "#ffd679","#ff0000","#be9000","#9e7800","#ff87bc","#ff73b3","#be3076","#9e2b62",
    "#ff769b","#be2b62","#ff769b","#be0045","#9e0045","#ff7766","#ff5e4e","#be0003",
    "#9e0003","#be0003","#9e0003","#ff7766","#ff5e4e","#be0003","#9e0003","#9e0003",
  ],
  row8Gradient: ["#ffc300","#ff44a1","#ff0073","#ff0009"],
  shadowColours: ["#898989","#ffe3a3","#ffc300","#ff44a1","#ff0073","#ff0009"],
  swatchGradient: "linear-gradient(to bottom, #898989, #ffc300, #ff44a1, #ff0009)",
  pageColors: {
    row2:  ["#ffca42","#ffbb40","#ff8a64","#ff5eaa","#ff40a3","#ff4034"],
    row37: ["#ffc300","#ffb300","#ff7c51","#ff44a1","#ff0073","#ff0009"],
    row8:  [
      "#ffd679","#ffd060","#c19200","#a57c00",
      "#ffcb76","#ffc35e","#be8400","#9e6e00",
      "#ffa688","#ff9876","#be5a3a","#9e4a2f",
      "#ff87bc","#a57c00","#be3076","#9e2662",
      "#ff76b7","#ff5ead","#be0070","#9e005d",
      "#ff7766","#ff5e4e","#be0005","#9e0003",
    ],
    labelColor: "#fff0cc",
    hexColor:   "#de0007",
  },
  home: {
    row3Labels: [
      ["#898989","Argent"],["#aaaaaa","Dark Gray"],
      ["",""],["",""],["",""],["",""],
      ["#ffe3a3","Honey Bee"],["#ffc300","Citrus Splash"],
      ["#ffb300","Imperial Yellow"],["#ff7c51","Coral"],
      ["#ff44a1","Major Magenta"],["#ff0099","Big Bang Pink"],
      ["#ff0073","Retro Pink Pop"],["#ff0009","Maharaja Red"],
    ],
    row4_5: ["#898989","#aaaaaa","#ffe3a3","#ffc300","#ffb300","#ff7c51","#ff44a1","#ff0099","#ff0073","#ff0009"],
    row6: [
      "#767676","#848484","#939393","#b2b2b2","#ffeec0","#ffeec0","#ffeec0","#ffeec0",
      "#ffe9b6","#dec58d","#ffca42","#dea900","#ffbb40","#de9b00","#ff8a64","#de6b45",
      "#ff5eaa","#de3a8b","#ff40a3","#de0084","#ff3f80","#de0063","#ff4034","#de0007",
    ],
    row7: [
      "#535353","#646464","#9f9f9f","#ababab","#686868","#7d7d7d","#bababa","#c3c3c3",
      "#878787","#a2a2a2","#e2e2e2","#e6e6e6","#cac7be","#d7d3c8","#fffbf2","#ffffff",
      "#fff4db","#ffecc0","#bea878","#9e8c63","#ffd679","#ffd060","#c19200","#a57c00",
      "#ffcb76","#ffc35e","#be8400","#9e6e00","#ffa688","#ff9876","#be5a3a","#9e4a2f",
      "#ff87bc","#ff73b3","#be3076","#9e2662","#ff76b7","#ff5ead","#be0070","#9e005d",
      "#ff769b","#ff5d8e","#be0054","#9e0045","#ff7766","#ff5e4e","#be0005","#9e0003",
    ],
    row8Gradient: ["#898989","#ffe3a3","#ffc300","#ff44a1","#ff0073","#ff0009"],
  },
};

// ─── RED ──────────────────────────────────────────────────────────────────────
const red: ColourTheme = {
  id: "red", label: "Red", baseHex: "#ff0009",
  row3Labels: [
    ["#ff0009","Maharaja Red"],["#ff4034","Red Orange"],["#ff0009","Marinara Red"],
    ["#ff4034","Red Orange"],["#ff5e40","Sunset Orange"],["#ff7766","Peachy Pink"],
    ["#ff8c7c","Kissable"],["#ffa192","Frozen Salmon"],["#ffb5a9","Peach Bud"],
    ["#ffcdc9","Peach Fuzz"],["#ba0005","Bloody Mary"],["#ff0009","Marinara Red"],
  ],
  row4_5: [
    "#ff0009","#ff4034","#ff0009","#ff4034",
    "#ff5e40","#ff7766","#ff8c7c","#ffa192",
    "#ffb5a9","#ffcdc9","#fff0cc","#fff0cc",
  ],
  row6: [
    "#ff4034","#de0007","#ff5b4c","#de362c","#ff6e50","#d04a30","#ff8870","#d06050",
    "#ffa090","#d07870","#ffb4a5","#d09085","#ffc8bb","#d0a89a","#ffdad5","#d0bcb6",
    "#d0bcb6","#ba9f9a","#ff8870","#d06050","#ff9982","#d07260","#ffaa96","#d08270",
  ],
  row7: [
    "#ff7766","#ff5e4e","#de0007","#9e0003","#ff8575","#ff7161","#be2d24","#9e241c",
    "#9e372d","#be4438","#ff8373","#ff9484","#9e473c","#be574a","#ff9585","#ffa394",
    "#ffb0a0","#ff9890","#d09080","#ba7070","#ffd0c5","#ffb8b0","#d0b0a0","#ba9090",
    "#ff2020","#ff0000","#d01010","#ba0000","#ff5040","#ff3025","#d03020","#ba2015",
    "#ff7060","#ff5550","#d05040","#ba3030","#ff9080","#ff7870","#d07060","#ba5050",
    "#ffb0a0","#ff9890","#d09080","#ba7070","#ffd0c5","#ffb8b0","#d0b0a0","#ba9090",
  ],
  row8Gradient: ["#ff0009","#ff7766"],
  shadowColours: ["#ba0005","#ff0009","#ff5e40","#ffa192","#ffcdc9"],
  swatchGradient: "linear-gradient(to bottom, #ff0009, #ff7766)",
  pageColors: {
    row2:  ["#ff4034","#ff5b4c","#ff7161","#ff8676","#ff9889","#ffab9d"],
    row37: ["#ff0009","#ff4034","#ff5e4e","#ff7766","#ff8c7c","#ffa192"],
    row8:  [
      "#ff7766","#ff5e4e","#de0007","#9e0003",
      "#ff8575","#ff7161","#be2d24","#9e241c",
      "#ff9484","#ff8373","#de5143","#9e372d",
      "#ffa394","#ff9585","#be574a","#9e473c",
      "#ffb0a3","#ffa496","#de796b","#be675a",
      "#ffbeb2","#ffb4a8","#de8b7e","#be766b",
    ],
    labelColor: "#fff0cc",
    hexColor:   "#ffca42",
  },
  home: {
    row3Labels: [
      ["#be0005","Bloody Mary"],["#de0007","Red Pegasus"],
      ["",""],["",""],["",""],["",""],
      ["#ff0009","Maharaja Red"],["#ff4034","Red Orange"],
      ["#ff5e4e","Sunset Orange"],["#ff7766","Peachy Pinky"],
      ["#ff8c7c","Kissable"],["#ffa192","Frozen Salmon"],
      ["#ffb5a8","Peach Bud"],["#ffc8bd","Peach Fuzz"],
    ],
    row4_5: ["#be0005","#de0007","#ff0009","#ff4034","#ff5e4e","#ff7766","#ff8c7c","#ffa192","#ffb5a8","#ffc8bd"],
    row6: [
      "#c8352b","#a50004","#e53b2f","#c10005","#ffeec0","#ffeec0","#ffeec0","#ffeec0",
      "#ff4034","#de0007","#ff5b4c","#de362c","#ff7161","#de5143","#ff8676","#de6758",
      "#ff9889","#de796b","#ffab9d","#de8b7e","#ffbdb1","#de9d92","#ffcec4","#deaea4",
    ],
    row7: [
      "#da695b","#d15144","#8c0003","#750002","#f17061","#eb5849","#a50004","#890002",
      "#ff7766","#ff5e4e","#de0007","#9e0003","#ff7766","#ff5e4e","#de0007","#9e0003",
      "#ff7766","#ff5e4e","#de0007","#9e0003","#ff8575","#ff7161","#be2d24","#9e241c",
      "#ff9484","#ff8373","#de5143","#9e372d","#ffa394","#ff9585","#be574a","#9e473c",
      "#ffb0a3","#ffa496","#de796b","#be675a","#ffbeb2","#ffb4a8","#de8b7e","#be766b",
      "#ffc4b9","#ffbcb2","#de9d92","#be867c","#ffdac4","#ffd1ca","#deaea4","#be948c",
    ],
    row8Gradient: ["#be0005","#ff0009","#ffc8bd"],
  },
};

// ─── PINK ─────────────────────────────────────────────────────────────────────
const pink: ColourTheme = {
  id: "pink", label: "Pink", baseHex: "#ff0099",
  row3Labels: [
    ["#ff0099","Big Bang Pink"],["#ff40a3","Major Magenta"],["#ff0099","Big Bang Pink"],
    ["#ff4ba3","Major Magenta"],["#ff5ead","Hot Pink"],["#ff76b7","Dream Setting"],
    ["#ff8cc1","Shimmering Lilac"],["#ffa0cb","Pastel Magenta"],
    ["#ffb5d5","Candy Bar"],["#ffd0e5","Sugarwinkle"],["#be0070","Aztec Warrior"],["#d40080","Deep Magenta"],
  ],
  row4_5: [
    "#ff0099","#ff40a3","#ff0099","#ff4ba3",
    "#ff5ead","#ff76b7","#ff8cc1","#ffa0cb",
    "#ffb5d5","#ffd0e5","#fff0cc","#fff0cc",
  ],
  row6: [
    "#ff40a3","#de0084","#ff5bac","#de368d","#ff76b7","#d44a88","#ff8cc1","#d46090",
    "#ffa0cb","#d47898","#ffb5d5","#d490a2","#ffc8e0","#d4a8b0","#ffdaec","#d4bcbe",
    "#d4bcbe","#be9eaa","#ff8cc1","#d46090","#ff9ab8","#d47290","#ffaac5","#d482a0",
  ],
  row7: [
    "#ff76b7","#ff5ead","#de0084","#be0070","#ff85be","#ff71b5","#de368d","#be2d78",
    "#ff94c5","#ff83bd","#de5196","#be447f","#ffa2cc","#ff94c5","#de669f","#be5687",
    "#ffb0d5","#ff98c0","#d090b0","#be7095","#ffd0e8","#ffb8d8","#d0b0c8","#be90ab",
    "#ff2299","#ff0088","#d01070","#be0060","#ff50a5","#ff3090","#d03080","#be2065",
    "#ff70b5","#ff55a0","#d05090","#be3075","#ff90c5","#ff78b0","#d070a0","#be5085",
    "#ffb0d5","#ff98c0","#d090b0","#be7095","#ffd0e8","#ffb8d8","#d0b0c8","#be90ab",
  ],
  row8Gradient: ["#ff0099","#ff76b7"],
  shadowColours: ["#be0070","#ff0099","#ff5ead","#ffa0cb","#ffd0e5"],
  swatchGradient: "linear-gradient(to bottom, #ff0099, #ff76b7)",
  pageColors: {
    row2:  ["#ff40a3","#ff5bac","#ff71b5","#ff85be","#ff98c7","#ffaad0"],
    row37: ["#ff0099","#ff40a3","#ff5ead","#ff76b7","#ff8cc1","#ffaad0"],
    row8:  [
      "#ff76b7","#ff5ead","#de0084","#be0070",
      "#ff85be","#ff71b5","#de368d","#be2d78",
      "#ff94c5","#ff83bd","#de5196","#be447f",
      "#ffa2cc","#ff94c5","#de669f","#be5687",
      "#ffb0d3","#ffa4cd","#be678f","#9e5577",
      "#ffbdda","#ffb3d5","#be7696","#9e617d",
    ],
    labelColor: "#ffc300",
    hexColor:   "#ffc300",
  },
  home: {
    row3Labels: [
      ["#be0070","Aztec Warrior"],["#de0084","Vampire Love Story"],
      ["",""],["",""],["",""],["",""],
      ["#ff0099","Big Bang Pink"],["#ff40a3","Major Magenta"],
      ["#ff5ead","Hot Pink"],["#ff76b7","Dream Setting"],
      ["#ff8cc1","Dream Setting"],["#ffa0cb","Pastel Magenta"],
      ["#ffb4d5","Candy Bar"],["#ffc7e0","Sugar Winkle"],
    ],
    row4_5: ["#be0070","#de0084","#ff0099","#ff40a3","#ff5ead","#ff76b7","#ff8cc1","#ffa0cb","#ffb4d5","#ffc7e0"],
    row6: [
      "#c8347d","#a50060","#e53a90","#c10072","#ffeec0","#ffeec0","#ffeec0","#ffeec0",
      "#ff40a3","#de0084","#ff5bac","#de368d","#ff71b5","#de5196","#ff85be","#de669f",
      "#ff98c7","#de79a7","#ffaad0","#de8bb0","#ffbcd9","#de9cb9","#ffcde3","#deadc3",
    ],
    row7: [
      "#d96899","#d1508b","#a50060","#91025a","#f06fa7","#eb579b","#c10072","#a50060",
      "#ff76b7","#ff5ead","#de0084","#be0070","#ff76b7","#ff5ead","#de0084","#be0070",
      "#ff76b7","#ff5ead","#de0084","#be0070","#ff85be","#ff71b5","#de368d","#be2d78",
      "#ff94c5","#ff83bd","#de5196","#be447f","#ffa2cc","#ff94c5","#de669f","#be5687",
      "#ffb0d3","#ffa4cd","#be678f","#9e5577","#ffbdda","#ffb3d5","#be7696","#9e617d",
      "#ffcbe1","#ffc1d4","#be859e","#9e6e83","#ffdae9","#ffd2e4","#be93a6","#9e7a8a",
    ],
    row8Gradient: ["#be0070","#ff0099","#ffc7e0"],
  },
};

// ─── YELLOW ───────────────────────────────────────────────────────────────────
const yellow: ColourTheme = {
  id: "yellow", label: "Yellow", baseHex: "#ffc300",
  row3Labels: [
    ["#ffc300","Citrus Splash"],["#ffca42","Habañero Gold"],["#ffc300","Citrus Splash"],
    ["#ffca42","Habanero Gold"],["#ffd060","Chickadee"],["#ffd879","Yuma Gold"],
    ["#ffe08f","Banana Republic"],["#ffe8a3","Honey Bee"],
    ["#fff0b5","Mouse Nose"],["#fff8c5","Biscuit"],["#be9000","Moutarde de Dijon"],["#d4a000","Dark Goldenrod"],
  ],
  row4_5: [
    "#ffc300","#ffca42","#ffc300","#ffca42",
    "#ffd060","#ffd879","#ffe08f","#ffe8a3",
    "#fff0b5","#fff8c5","#fff0cc","#fff0cc",
  ],
  row6: [
    "#ffca42","#dea900","#ffd05e","#deaf38","#ffd879","#d4b045","#ffe08f","#d4ba58",
    "#ffe8a3","#d4c268","#fff0b5","#d4ca78","#fff4c2","#d4d088","#fff8d0","#d4d898",
    "#d4d898","#bebc80","#ffe08f","#d4ba58","#ffc480","#d49a44","#ffce88","#d4a250",
  ],
  row7: [
    "#ffd679","#ffd060","#be9000","#9e7800","#ffdb88","#ffd574","#deaf38","#9e7c25",
    "#ffdf97","#ffda86","#deb552","#9e8038","#ffe3a5","#ffdf97","#deba68","#9e8448",
    "#ffe89a","#ffe090","#d4c275","#beac55","#fff0b5","#ffe8a8","#d4ca90","#bebc70",
    "#ffc800","#ffbe00","#d4a000","#be9000","#ffd042","#ffca30","#d4a820","#be9010",
    "#ffd862","#ffd050","#d4b040","#be9828","#ffe080","#ffd878","#d4ba60","#be9e40",
    "#ffe89a","#ffe090","#d4c275","#beac55","#fff0b5","#ffe8a8","#d4ca90","#bebc70",
  ],
  row8Gradient: ["#ffc300","#ffd679"],
  shadowColours: ["#be9000","#ffc300","#ffd879","#ffe8a3","#fff8c5"],
  swatchGradient: "linear-gradient(to bottom, #ffc300, #ffd879)",
  pageColors: {
    row2:  ["#ffca42","#ffd05e","#ffd574","#ffda88","#ffe19b","#ffe6ad"],
    row37: ["#ffc300","#ffca42","#ffd060","#ffd679","#ffdd8f","#ffe3a3"],
    row8:  [
      "#ffd679","#ffd060","#be9000","#9e7800",
      "#ffdb88","#ffd574","#deaf38","#9e7c25",
      "#ffdf97","#ffda86","#deb552","#9e8038",
      "#ffe3a5","#f2cb7c","#e2bf79","#9e8448",
      "#ffe8b3","#ffe4a7","#bea469","#9e8857",
      "#ffecc0","#ffe9b6","#bea878","#9e8c63",
    ],
    labelColor: "#de0007",
    hexColor:   "#de0007",
  },
  home: {
    row3Labels: [
      ["#be9000","Argent"],["#dea900","Dark Gray"],
      ["",""],["",""],["",""],["",""],
      ["#ffc300","Honey Bee"],["#ffca42","Citrus Splash"],
      ["#ffd060","Imperial Yellow"],["#ffd679","Coral"],
      ["#ffdd8f","Major Magenta"],["#ffe3a3","Honey Bee"],
      ["#ffe8b6","Mouse Nose"],["#ffeec9","Biscuit"],
    ],
    row4_5: ["#be9000","#dea900","#ffc300","#ffca42","#ffd060","#ffd679","#ffdd8f","#ffe3a3","#ffe8b6","#ffeec9"],
    row6: [
      "#c59b36","#a57d00","#e2b23c","#c19200","#ffeec0","#ffeec0","#ffeec0","#ffeec0",
      "#ffca42","#dea900","#ffd05e","#deaf38","#ffd574","#deb552","#ffda88","#deba68",
      "#ffe19b","#dec07c","#ffe6ad","#dec58d","#ffeabe","#deca9e","#fff0cf","#decfae",
    ],
    row7: [
      "#d2b26b","#cba653","#8c6a00","#755700","#e8c472","#e5bb5a","#a57c00","#896700",
      "#ffd679","#ffd060","#be9000","#9e7800","#ffd679","#ffd060","#be9000","#9e7800",
      "#ffd679","#ffd060","#be9000","#9e7800","#ffdb88","#ffd574","#deaf38","#9e7c25",
      "#ffdf97","#ffda86","#deb552","#9e8038","#ffe3a5","#f2cb7c","#e2bf79","#9e8448",
      "#ffe8b3","#ffe4a7","#bea469","#9e8857","#ffecc0","#ffe9b6","#bea878","#9e8c63",
      "#ffefcc","#ffedc5","#beac86","#9e906f","#fff3d9","#fff1d4","#beb195","#9e937c",
    ],
    row8Gradient: ["#be9000","#ffc300","#ffeec9"],
  },
};

// ─── ORANGE ───────────────────────────────────────────────────────────────────
const orange: ColourTheme = {
  id: "orange", label: "Orange", baseHex: "#ff7700",
  row3Labels: [
    ["#ff7700","Heat Wave"],["#ff8638","Wildfire"],["#ff7700","Blaze"],
    ["#ff8f30","Apricot"],["#ffa048","Peach Fuzz"],["#ffb060","Sandy"],
    ["#ffc078","Desert"],["#ffd090","Warm Sand"],["#ffe0a8","Cream Gold"],
    ["#fff0c5","Ivory"],["#be5800","Burnt Sienna"],["#d46400","Burnt Orange"],
  ],
  row4_5: [
    "#ff7700","#ff8638","#ff7700","#ff8f30",
    "#ffa048","#ffb060","#ffc078","#ffd090",
    "#ffe0a8","#fff0c5","#fff0cc","#fff0cc",
  ],
  row6: [
    "#ff8638","#de6700","#ff9352","#de742f","#ffb060","#d48830","#ffc078","#d49840",
    "#ffd090","#d4a850","#ffe0a8","#d4b860","#ffeca0","#d4c470","#fff4c0","#d4d080",
    "#d4d080","#beb865","#ffc078","#d49840","#ffc480","#d49a44","#ffce88","#d4a250",
  ],
  row7: [
    "#ff9352","#de742f","#e8884f","#c15900",
    "#ffaa78","#de7f46","#e79160","#c16427",
  ],
  row8Gradient: ["#ff7700","#ffa36d"],
  shadowColours: ["#be5800","#ff7700","#ffa048","#ffd090","#fff0c5"],
  swatchGradient: "linear-gradient(to bottom, #ff7700, #ffb060)",
  pageColors: {
    row2:  ["#ff8638","#ff9352","#ffa068","#ffad7d","#ffc19c","#ffccae"],
    row37: ["#ff7700","#ff8638","#ff9555","#ffa36d","#ffb183","#ffbf99"],
    row8:  [
      "#ff9352","#de742f","#e8884f","#c15900",
      "#ffaa78","#de7f46","#e79160","#c16427",
      "#ffb488","#de8b59","#e79b70","#c16f3e",
      "#ffbe98","#de966c","#e6a47f","#c17a51",
      "#ffceb0","#dea787","#e6ad8d","#c18461",
      "#ffd6be","#deb197","#e5b89c","#c19072",
    ],
    labelColor: "#fff0cc",
    hexColor:   "#7a2000",
  },
  home: {
    row3Labels: [
      ["#be5700","Fire Ant"],["#de6700","Ochre Spice"],
      ["",""],["",""],["",""],["",""],
      ["#ff7700","Heat Wave"],["#ff8638","Wildfire"],
      ["#ff9555","Pastel Orange"],["#ffa36d","Butternut"],
      ["#ffb183","Peach"],["#ffbf99","Blushing Cinnamon"],
      ["#ffccad","Lips of Apricot"],["#ffd9c2","Persian Melon"],
    ],
    row4_5: ["#be5700","#de6700","#ff7700","#ff8638","#ff9555","#ffa36d","#ffb183","#ffbf99","#ffccad","#ffd9c2"],
    row6: [
      "#c6692e","#a54b00","#e37834","#c15900","#ffeec0","#ffeec0","#ffeec0","#ffeec0",
      "#ff8638","#de6700","#ff9352","#de742f","#ffa068","#de8149","#ffad7d","#de8d5e",
      "#ffc19c","#de9971","#ffccae","#dea684","#ffdcbd","#deb196","#ffedce","#debca8",
    ],
    row7: [
      "#d4885c","#ac5a27","#ba6f45","#804000","#eb9463","#c5672c","#d07c4a","#a74c00",
      "#ff9352","#de742f","#e8884f","#c15900","#ff9352","#de742f","#e8884f","#c15900",
      "#ff9352","#de742f","#e8884f","#c15900","#ffaa78","#de7f46","#e79160","#c16427",
      "#ffb488","#de8b59","#e79b70","#c16f3e","#ffbe98","#de966c","#e6a47f","#c17a51",
      "#ffceb0","#dea787","#e6ad8d","#c18461","#ffd6be","#deb197","#e5b89c","#c19072",
      "#ffdeca","#debaa4","#e5c0ab","#c19982","#ffe7d8","#dec4b3","#e8d0c2","#c1a392",
    ],
    row8Gradient: ["#be5700","#ff7700","#ffd9c2"],
  },
};

// ─── GREEN ────────────────────────────────────────────────────────────────────
const green: ColourTheme = {
  id: "green", label: "Green", baseHex: "#80b155",
  row3Labels: [
    ["#80b155","Asparagus"],["#8cb967","Dollar Bill"],["#80b155","Herb Garden"],
    ["#90be68","Fresh Lime"],["#a0c878","Pistachio"],["#b0d488","Sage"],
    ["#c0de98","Mint Cream"],["#d0e8a8","Pale Moss"],["#e0f0b8","Spring Dew"],
    ["#eef8cc","Alabaster"],["#547838","Forest Floor"],["#698e44","Olive Green"],
  ],
  row4_5: [
    "#80b155","#8cb967","#80b155","#90be68",
    "#a0c878","#b0d488","#c0de98","#d0e8a8",
    "#e0f0b8","#eef8cc","#fff0cc","#fff0cc",
  ],
  row6: [
    "#8cb967","#6e9949","#97c077","#79a059","#b0d488","#80a450","#c0de98","#90b060",
    "#d0e8a8","#a0c070","#e0f0b8","#b0d080","#ecf8c8","#c0dc90","#f4fcd8","#d0e8a0",
    "#d0e8a0","#b8ce88","#c0de98","#90b060","#c8e0a0","#98b468","#d0e8a8","#a0bc70",
  ],
  row7: [
    "#b7d4a1","#8fae77","#a3c787","#84a768","#a1c685","#83a767","#86a96a","#688b4c",
    "#97c077","#79a059","#8fae77","#799565","#c1daaf","#bad6a5","#9ab586","#839b72",
    "#c8e498","#b8d88c","#a8c878","#90b060","#d8f0a8","#c8e49c","#b8d888","#a0c070",
    "#85b558","#7aaa50","#698e44","#547838","#95c268","#88b85c","#789848","#658030",
    "#a8ce78","#98c26c","#84a858","#708c40","#b8d888","#a8cc7c","#98b868","#80a050",
    "#c8e498","#b8d88c","#a8c878","#90b060","#d8f0a8","#c8e49c","#b8d888","#a0c070",
  ],
  row8Gradient: ["#80b155","#a5c98a"],
  shadowColours: ["#547838","#80b155","#a0c878","#d0e8a8","#eef8cc"],
  swatchGradient: "linear-gradient(to bottom, #80b155, #b0d488)",
  pageColors: {
    row2:  ["#8cb967","#97c077","#a3c787","#aece96","#bad6a5","#c4dcb3"],
    row37: ["#80b155","#8cb967","#99c179","#99c179","#b2d19b","#bed8ab"],
    row8:  [
      "#a2c786","#79a059","#8baf68","#5f843e",
      "#a1c685","#83a767","#8faf74","#688b4c",
      "#accd93","#8dad75","#9bba7f","#729159",
      "#bbd3a9","#97b382","#a5be92","#7c9767",
      "#c8deb7","#a1ba8f","#aec49e","#859d74",
      "#d0e3c2","#aabf9b","#b7c9a9","#8fa380",
    ],
    labelColor: "#ffffff",
    hexColor:   "#de0007",
  },
  home: {
    row3Labels: [
      ["#5d833d","Hidden Paradise"],["#6e9949","Kiwi"],
      ["",""],["",""],["",""],["",""],
      ["#80b155","Asparagus"],["#8cb967","Dollar Bill"],
      ["#99c179","Pistachio"],["#a5c98a","Gossip"],
      ["#b2d19b","Greenhorn"],["#bed8ab","Morris Leaf"],
      ["#cbe0bc","Ambrosia"],["#d8e8cd","Peppermint"],
    ],
    row4_5: ["#5d833d","#6e9949","#80b155","#8cb967","#99c179","#a5c98a","#b2d19b","#bed8ab","#cbe0bc","#d8e8cd"],
    row6: [
      "#6e9052","#527235","#7ca35c","#5f843e","#ffeec0","#ffeec0","#ffeec0","#ffeec0",
      "#8cb967","#6e9949","#97c077","#79a059","#a3c787","#84a768","#aece96","#8fae77",
      "#bad6a5","#9ab586","#c4dcb3","#a5bc94","#c4dcb3","#a5bc94","#dcead2","#bccab2",
    ],
    row7: [
      "#7c9b63","#5f7d46","#6b8751","#46622d","#89ac6c","#6b8d4f","#7c995f","#527235",
      "#a2c786","#79a059","#8baf68","#5f843e","#a2c786","#79a059","#8baf68","#5f843e",
      "#a2c786","#79a059","#8baf68","#5f843e","#a1c685","#83a767","#8faf74","#688b4c",
      "#accd93","#8dad75","#9bba7f","#729159","#bbd3a9","#97b382","#a5be92","#7c9767",
      "#c8deb7","#a1ba8f","#aec49e","#859d74","#d0e3c2","#aabf9b","#b7c9a9","#8fa380",
      "#d0e3c2","#aabf9b","#b7c9a9","#8fa380","#e6f0df","#bfcbb6","#c9d4c1","#a3af9a",
    ],
    row8Gradient: ["#5d833d","#80b155","#d8e8cd"],
  },
};

// ─── PURPLE ───────────────────────────────────────────────────────────────────
const purple: ColourTheme = {
  id: "purple", label: "Purple", baseHex: "#b57aed",
  row3Labels: [
    ["#b57aed","Illicit Purple"],["#bc88f0","Luminous Lavender"],["#b57aed","Wisteria"],
    ["#c090f0","Lavender"],["#c8a0f4","Soft Lilac"],["#d0b0f6","Pale Violet"],
    ["#d8c0f8","Moonlight"],["#e0d0fa","Blush Lilac"],["#e8e0fc","Whisper"],
    ["#f2eeff","Ghost Petal"],["#8040c8","Deep Violet"],["#9a58da","Medium Purple"],
  ],
  row4_5: [
    "#8040c8","#9a58da","#b57aed","#c090f0",
    "#c8a0f4","#d0b0f6","#d8c0f8","#e0d0fa",
    "#e8e0fc","#f2eeff","#fff0cc","#fff0cc",
  ],
  row6: [
    "#9a58da","#8040c8","#c8a0f4","#9868d8","#d0b0f6","#a078e0","#d8c0f8","#a888e8",
    "#e0d0fa","#b098ef","#e8deff","#b8a8f4","#f0e8ff","#c0b8f8","#f8f4ff","#c8c8fc",
    "#c8c8fc","#b0b0e8","#d8c0f8","#a888e8","#d0baf6","#a080de","#d8c4f8","#a890e4",
  ],
  row7: [
    "#b87ef0","#ac72ec","#9a58da","#8040c8","#c090f2","#b882ee","#a068e0","#8848cc",
    "#c8a0f5","#c094f3","#a878e2","#9060ce","#d0b0f6","#c8a8f5","#b088e8","#9870d4",
    "#d8c0f8","#d0b8f7","#b898ee","#a080da","#e0d0fa","#d8c8f9","#c0a8f4","#a890e0",
    "#b87ef0","#ac72ec","#9a58da","#8040c8","#c090f2","#b882ee","#a068e0","#8848cc",
    "#c8a0f5","#c094f3","#a878e2","#9060ce","#d0b0f6","#c8a8f5","#b088e8","#9870d4",
    "#d8c0f8","#d0b8f7","#b898ee","#a080da","#e0d0fa","#d8c8f9","#c0a8f4","#a890e0",
  ],
  row8Gradient: ["#8040c8","#b57aed","#c8a0f4","#e0d0fa","#f2eeff"],
  shadowColours: ["#8040c8","#b57aed","#c8a0f4","#e0d0fa","#f2eeff"],
  swatchGradient: "linear-gradient(to bottom, #b57aed, #d0b0f6)",
  pageColors: {
    row2:  ["#bc88f0","#c394f2","#c9a1f4","#d0acf6","#d6b8f8","#ddc5fa"],
    row37: ["#b57aed","#bc88f0","#c396f2","#cba3f5","#d2b0f7","#d9bef9"],
    row8:  [
      "#c394f2","#a375d1","#8d69b7","#885ab3",
      "#c99ff4","#a980d2","#b591db","#8d65b5",
      "#d4b4f7","#ae8bd4","#ba9bdc","#9270b6",
      "#d5b4f7","#b595d6","#bfa4de","#997ab9",
      "#bfa4de","#997ab9","#bfa4de","#997ab9",
      "#e4d1fb","#c0abd9","#c9b7e1","#a38fbc",
    ],
    labelColor: "#ffc300",
    hexColor:   "#ffc300",
  },
  home: {
    row3Labels: [
      ["#8659b0","Lusty Lavender"],["#9d69ce","Legendary Lavender"],
      ["",""],["",""],["",""],["",""],
      ["#b57aed","Illicit Purple"],["#bc88f0","Luminous Lavender"],
      ["#c396f2","Dream Vapor"],["#cba3f5","Lilac"],
      ["#d2b0f7","Light Violet"],["#d9bef9","Neon Boneyard"],
      ["#e1cbfa","Foggy Heath"],["#e8d8fc","Peppermint"],
    ],
    row4_5: ["#8659b0","#9d69ce","#b57aed","#bc88f0","#c396f2","#cba3f5","#d2b0f7","#d9bef9","#e1cbfb","#e8d8fc"],
    row6: [
      "#916ab8","#744c99","#a678d4","#885ab3","#ffeec0","#ffeec0","#ffeec0","#ffeec0",
      "#bc88f0","#9d69ce","#c394f2","#a375d1","#c9a1f4","#a982d2","#d0acf6","#b08dd5",
      "#d6b8f8","#b699d7","#ddc5fa","#bca5d9","#e7d5fb","#c4b0d9","#efe4fd","#cabcdb",
    ],
    row7: [
      "#9b79c0","#7d5ba0","#8e6fae","#644184","#b793de","#9067b8","#9f7bc3","#754d9b",
      "#c394f2","#a375d1","#8b63b2","#885ab3","#c394f2","#a375d1","#8b63b2","#885ab3",
      "#c394f2","#a375d1","#8d69b7","#885ab3","#c99ff4","#a980d2","#b591db","#8d65b5",
      "#d4b4f7","#ba9bdc","#9270b6","#9270b6","#d5b4f7","#b595d6","#bfa4de","#997ab9",
      "#bfa4de","#997ab9","#bfa4de","#997ab9","#e4dffb","#c0abd9","#c9b7e1","#a38fbc",
      "#ecddfc","#c9b9da","#ecddfc","#c9b9da","#f2e9fd","#d0c6dc","#dbd0e6","#afa3be",
    ],
    row8Gradient: ["#8659b0","#b57aed","#e8d8fc"],
  },
};

// ─── EXPORTS ──────────────────────────────────────────────────────────────────
export const themes: Record<ThemeId, ColourTheme> = {
  red, pink, blue, green, purple, yellow, orange, default: defaultTheme,
};

export const themeOrder: ThemeId[] = [
  "default","yellow","orange","pink","red","green","purple","blue",
];

export const DEFAULT_THEME_ID: ThemeId = "default";
