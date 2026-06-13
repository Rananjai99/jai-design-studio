/**
 * themes.config.ts — Jai Design Studio
 * Complete colour theme definitions for all 10 themes.
 *
 * Blue and Default have fully specified hex values from design artboards.
 * All other themes follow the same brighten/darken derivation logic.
 */

export type ThemeId =
  | "red" | "pink" | "blue" | "white" | "black"
  | "green" | "purple" | "yellow" | "orange" | "default";

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
}

// ─── BLUE (reference theme — all hex from artboards) ─────────────────────────
const blue: ColourTheme = {
  id: "blue", label: "Blue", baseHex: "#1341ff",
  row3Labels: [
    ["#0b2ebe","Blue Screen of Death"],["#0f37de",""],
    ["#1341ff","Magic Ink"],["#2960ff","Blueocratic"],
    ["#4278ff","Secret of Mana"],["#5c8eff","Cornflower Blue"],
    ["#76a3ff","Fennel Flower"],["#90b6ff","Kitten's Eye"],
    ["#abc9ff","Night Snow"],["#ccdfff","Icy Plains"],
    ["#0900de",""],["#0600be",""],
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
  home: {
    row4_5: ["#0b2ebe","#0f37de","#1341ff","#2960ff","#4278ff","#5c8eff","#76a3ff","#90b6ff","#abc9ff","#ccdfff"],
    row6: [
      "#426dd6","#0f37de","#2a5ced","#1139ca","#2a5ced","#1139ca","#426dd6","#0f37de",
      "#426dd6","#0f37de","#275cff","#0f37de","#3d74ff","#2252de","#5487ff","#3867de",
      "#6c9aff","#4f7bde","#83adff","#668dde","#9bbeff","#7d9ede","#b3ceff","#94aede",
    ],
    row7: [
      "#698fe2","#567edc","#2052d4","#1142b0","#5685f4","#4071f1","#0c2fac","#082690",
      "#4c7ffd","#3469fa","#0620b4","#041997","#4c7ffd","#3469fa","#0827d3","#0620b4",
      "#4278ff","#2960ff","#0900de","#0600be","#5487ff","#3d73ff","#0b2ebe","#07259e",
      "#6696ff","#5285ff","#1c45be","#15389e","#79a4ff","#6696ff","#2f57be","#25489e",
      "#8bb2ff","#7ba6ff","#4f7bde","#3d569e","#9ebfff","#91b6ff","#668dde","#5678be",
      "#b1ccff","#a6c5ff","#7d9ede","#6a86be","#c4d9ff","#bcd4ff","#7e95be","#687c9e",
    ],
    row8Gradient: ["#0b2ebe","#ccdfff"],
  },
};

// ─── DEFAULT (hardcoded preset — grey→cream→yellow→pink→red) ─────────────────
const defaultTheme: ColourTheme = {
  id: "default", label: "Default", baseHex: "#ffc300",
  row3Labels: [
    ["#0b2ebe","Blue Screen of Death"],["#0f37de",""],
    ["#ffc300","Magic Ink"],["#ff44a1","Blueocratic"],
    ["#ff0073","Secret of Mana"],["#ff0009","Cornflower Blue"],
    ["#76a3ff","Fennel Flower"],["#90b6ff","Kitten's Eye"],
    ["#abc9ff","Night Snow"],["#ccdfff","Icy Plains"],
    ["#0900de",""],["#0600be",""],
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
  home: {
    row4_5: ["#898989","#ababab","#ffc300","#ffca42","#ff44a1","#ff5eaa","#ff0073","#ff0009","#ff5e4e","#ffa192"],
    row6: [
      "#646464","#535353","#ffca42","#dea900","#ff5eaa","#de3a8b","#ff769b","#be3076",
      "#9e2b62","#ff5d8e","#be0054","#9e0043","#ff7766","#ff5e4e","#be0003","#9e0003",
      "#ababab","#7d7d7d","#ffd060","#dea900","#ff85be","#de3076","#ff7766","#be0003",
    ],
    row7: [
      "#535353","#646464","#9f9f9f","#ababab","#686868","#7d7d7d","#bababa","#c3c3c3",
      "#878787","#a2a2a2","#e2e2e2","#e6e6e6","#cac7be","#d7d3c8","#fffbf2","#fff4db",
      "#ffecc0","#bea878","#9e8c63","#ffd679","#ffd060","#c19200","#a57c00","#ffcb76",
      "#ffc35e","#be8400","#9e6e00","#ffa688","#ff9876","#be5a3a","#9e4a2f","#ff87bc",
      "#ff73b3","#be3076","#9e2962","#ff76b7","#ff5ead","#be0070","#9e005d","#ff769b",
      "#ff5d8e","#be0054","#9e0045","#ff7766","#ff5e4e","#be0005","#9e0003","#9e0003",
    ],
    row8Gradient: ["#898989","#ffe3a3","#ffc300","#ff44a1","#ff0073","#ff0009"],
  },
};

// ─── RED ──────────────────────────────────────────────────────────────────────
const red: ColourTheme = {
  id: "red", label: "Red", baseHex: "#ff0009",
  row3Labels: [
    ["#ba0005","Bloody Mary"],["#d00007",""],["#ff0009","Marinara Red"],
    ["#ff4034","Red Orange"],["#ff5e40","Sunset Orange"],["#ff7766","Peachy Pink"],
    ["#ff8c7c","Kissable"],["#ffa192","Frozen Salmon"],["#ffb5a9","Peach Bud"],
    ["#ffcdc9","Peach Fuzz"],["#ba0005",""],["#ff0009",""],
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
  home: {
    row4_5: ["#be0005","#de0007","#ff0009","#ff4034","#ff5e4e","#ff7766","#ff8c7c","#ffa192","#ffb5a8","#ffc8bd"],
    row6: [
      "#c8352b","#a50004","#ff4034","#de0007","#ff5b4c","#de362c","#ff7161","#be2d24",
      "#9e241c","#ff8373","#de5143","#9e372d","#ff9585","#be574a","#9e473c","#ffa394",
      "#de796b","#9e5a3a","#ffb5a8","#de8b7e","#ffc8bd","#deaea4","#ff9889","#be7766",
    ],
    row7: [
      "#da695b","#d15144","#8c0003","#750002","#ff7061","#eb5849","#a50004","#890002",
      "#ff7766","#ff5e4e","#de0007","#9e0003","#ff7766","#ff5e4e","#de0007","#9e0003",
      "#ff8575","#ff7161","#be2d24","#9e241c","#ff8373","#de5143","#9e372d","#be4438",
      "#ff9585","#ff8676","#be574a","#9e473c","#ffa394","#ff9889","#de796b","#9e5a3a",
      "#ffb5a8","#ffa89a","#de8b7e","#be6766","#ffc8bd","#ffbdb1","#de9d92","#be867c",
      "#ffd4d3","#ffc9c4","#deaea4","#be948c","#ffe0dd","#ffd4d0","#deb8b0","#be9c94",
    ],
    row8Gradient: ["#be0005","#ff0009","#ffc8bd"],
  },
};

// ─── PINK ─────────────────────────────────────────────────────────────────────
const pink: ColourTheme = {
  id: "pink", label: "Pink", baseHex: "#ff0099",
  row3Labels: [
    ["#be0070","Aztec Warrior"],["#d40080",""],["#ff0099","Big Bang Pink"],
    ["#ff4ba3","Major Magenta"],["#ff5ead","Hot Pink"],["#ff76b7","Dream Setting"],
    ["#ff8cc1","Shimmering Lilac"],["#ffa0cb","Pastel Magenta"],
    ["#ffb5d5","Candy Bar"],["#ffd0e5","Sugarwinkle"],["#be0070",""],["#d40080",""],
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
  home: {
    row4_5: ["#be0070","#de0084","#ff0099","#ff40a3","#ff5ead","#ff76b7","#ff8cc1","#ffa0cb","#ffb5d5","#ffc7e0"],
    row6: [
      "#c8347d","#a50060","#ff40a3","#de0084","#ff5bac","#de368d","#ff71b5","#be2d78",
      "#9e2962","#ff83bd","#de5196","#9e3a76","#ff94c5","#be447f","#9e3d6f","#ffa6cf",
      "#de669f","#9e4a86","#ffb5d5","#de8bbe","#ffc7e0","#dea0c5","#ff98c0","#be7095",
    ],
    row7: [
      "#d96899","#d1508b","#a50060","#750043","#f06fa7","#eb579b","#c10072","#a50060",
      "#ff76b7","#ff5ead","#de0084","#be0070","#ff85be","#ff71b5","#de368d","#be2d78",
      "#ff94c5","#ff83bd","#de5196","#be447f","#ffa2cc","#ff94c5","#de669f","#be5687",
      "#ffb1d8","#ffa6cf","#de7ba8","#be6796","#ffbfdd","#ffb5d5","#de8bbe","#be769f",
      "#ffcce4","#ffc2dc","#de9ec8","#be85af","#ffd9eb","#ffceea","#deafd2","#be94bd",
      "#ffe5f2","#ffdaf0","#debfdb","#bea3c9","#fff0f8","#ffe5f6","#decfe4","#beb2d3",
    ],
    row8Gradient: ["#be0070","#ff0099","#ffc7e0"],
  },
};

// ─── YELLOW ───────────────────────────────────────────────────────────────────
const yellow: ColourTheme = {
  id: "yellow", label: "Yellow", baseHex: "#ffc300",
  row3Labels: [
    ["#be9000","Moutarde de Dijon"],["#d4a000",""],["#ffc300","Citrus Splash"],
    ["#ffca42","Habanero Gold"],["#ffd060","Chickadee"],["#ffd879","Yuma Gold"],
    ["#ffe08f","Banana Republic"],["#ffe8a3","Honey Bee"],
    ["#fff0b5","Mouse Nose"],["#fff8c5","Biscuit"],["#be9000",""],["#d4a000",""],
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
  home: {
    row4_5: ["#be9000","#dea900","#ffc300","#ffca42","#ffd060","#ffd679","#ffe08f","#ffe8a3","#fff0b5","#ffeec9"],
    row6: [
      "#c59b36","#a57d00","#ffca42","#dea900","#ffd05e","#deaf38","#ffd574","#deb552",
      "#9e8038","#ffdf97","#deba68","#9e8448","#ffe3a5","#deba68","#9e8857","#ffe6ad",
      "#dec07c","#9e9b6f","#fff0cf","#decfae","#fff5d9","#ded5b8","#ffdb88","#deaf38",
    ],
    row7: [
      "#d2b26b","#cba653","#8c6a00","#755700","#e8c472","#e5bb5a","#a57c00","#896900",
      "#ffd679","#ffd060","#be9000","#9e7800","#ffd679","#ffd060","#be9000","#9e7800",
      "#ffdb88","#ffd574","#deaf38","#9e7c25","#ffdf97","#ffda86","#deb552","#9e8038",
      "#ffe3a5","#ffdf97","#deba68","#9e8448","#ffe8be","#ffe4a7","#bea469","#9e8857",
      "#ffecc0","#ffe9b6","#bea878","#9e8c63","#fff0cf","#ffedc5","#beac86","#9e906f",
      "#fff3d9","#fff1d4","#beb195","#9e937c","#fff8e3","#fff5dd","#beb6a3","#9e9787",
    ],
    row8Gradient: ["#be9000","#ffc300","#ffeec9"],
  },
};

// ─── ORANGE ───────────────────────────────────────────────────────────────────
const orange: ColourTheme = {
  id: "orange", label: "Orange", baseHex: "#ff7700",
  row3Labels: [
    ["#be5800","Burnt Sienna"],["#d46400",""],["#ff7700","Blaze"],
    ["#ff8f30","Apricot"],["#ffa048","Peach Fuzz"],["#ffb060","Sandy"],
    ["#ffc078","Desert"],["#ffd090","Warm Sand"],["#ffe0a8","Cream Gold"],
    ["#fff0c5","Ivory"],["#be5800",""],["#d46400",""],
  ],
  row4_5: [
    "#be5800","#d46400","#ff7700","#ff8f30",
    "#ffa048","#ffb060","#ffc078","#ffd090",
    "#ffe0a8","#fff0c5","#fff0cc","#fff0cc",
  ],
  row6: [
    "#d46400","#be5800","#ffa048","#d47820","#ffb060","#d48830","#ffc078","#d49840",
    "#ffd090","#d4a850","#ffe0a8","#d4b860","#ffeca0","#d4c470","#fff4c0","#d4d080",
    "#d4d080","#beb865","#ffc078","#d49840","#ffc480","#d49a44","#ffce88","#d4a250",
  ],
  row7: [
    "#ff8800","#ff7700","#d46400","#be5000","#ffa030","#ff9020","#d47810","#be6000",
    "#ffb850","#ffa840","#d48830","#be7020","#ffc870","#ffb860","#d49848","#be7830",
    "#ffd890","#ffc880","#d4a860","#be8840","#ffe8a8","#ffd898","#d4b878","#be9858",
    "#ff8800","#ff7700","#d46400","#be5000","#ffa030","#ff9020","#d47810","#be6000",
    "#ffb850","#ffa840","#d48830","#be7020","#ffc870","#ffb860","#d49848","#be7830",
    "#ffd890","#ffc880","#d4a860","#be8840","#ffe8a8","#ffd898","#d4b878","#be9858",
  ],
  row8Gradient: ["#be5800","#ff7700","#ffa048","#ffd090","#fff0c5"],
  shadowColours: ["#be5800","#ff7700","#ffa048","#ffd090","#fff0c5"],
  swatchGradient: "linear-gradient(to bottom, #ff7700, #ffb060)",
};

// ─── GREEN ────────────────────────────────────────────────────────────────────
const green: ColourTheme = {
  id: "green", label: "Green", baseHex: "#80b155",
  row3Labels: [
    ["#547838","Forest Floor"],["#698e44",""],["#80b155","Herb Garden"],
    ["#90be68","Fresh Lime"],["#a0c878","Pistachio"],["#b0d488","Sage"],
    ["#c0de98","Mint Cream"],["#d0e8a8","Pale Moss"],["#e0f0b8","Spring Dew"],
    ["#eef8cc","Alabaster"],["#547838",""],["#698e44",""],
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
};

// ─── PURPLE ───────────────────────────────────────────────────────────────────
const purple: ColourTheme = {
  id: "purple", label: "Purple", baseHex: "#b57aed",
  row3Labels: [
    ["#8040c8","Deep Violet"],["#9a58da",""],["#b57aed","Wisteria"],
    ["#c090f0","Lavender"],["#c8a0f4","Soft Lilac"],["#d0b0f6","Pale Violet"],
    ["#d8c0f8","Moonlight"],["#e0d0fa","Blush Lilac"],["#e8e0fc","Whisper"],
    ["#f2eeff","Ghost Petal"],["#8040c8",""],["#9a58da",""],
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
};

// ─── WHITE ────────────────────────────────────────────────────────────────────
const white: ColourTheme = {
  id: "white", label: "White", baseHex: "#ffffff",
  row3Labels: [
    ["#b0b0b0","Ash"],["#c8c8c8",""],["#ffffff","Pure White"],["#f5f5f5","Snow"],
    ["#eeeeee","Platinum"],["#e8e8e8","Gainsboro"],["#e0e0e0","White Smoke"],
    ["#d8d8d8","Light Grey"],["#d0d0d0","Pale Silver"],["#c8c8c8","Lavender Mist"],
    ["#b0b0b0",""],["#c8c8c8",""],
  ],
  row4_5: [
    "#b0b0b0","#c8c8c8","#ffffff","#f5f5f5",
    "#eeeeee","#e8e8e8","#e0e0e0","#d8d8d8",
    "#d0d0d0","#c8c8c8","#fff0cc","#fff0cc",
  ],
  row6: [
    "#c8c8c8","#b0b0b0","#eeeeee","#d0d0d0","#e8e8e8","#d4d4d4","#e0e0e0","#d8d8d8",
    "#d8d8d8","#cccccc","#d4d4d4","#c8c8c8","#e8e8e8","#dcdcdc","#f0f0f0","#e4e4e4",
    "#e4e4e4","#d8d8d8","#e0e0e0","#d8d8d8","#e4e4e4","#d8d8d8","#e8e8e8","#dcdcdc",
  ],
  row7: [
    "#f8f8f8","#f5f5f5","#eeeeee","#e8e8e8","#e4e4e4","#e0e0e0","#dcdcdc","#d8d8d8",
    "#d4d4d4","#d0d0d0","#cccccc","#c8c8c8","#f0f0f0","#ececec","#e8e8e8","#e4e4e4",
    "#e0e0e0","#dcdcdc","#d8d8d8","#d4d4d4","#d0d0d0","#cccccc","#c8c8c8","#c4c4c4",
    "#f8f8f8","#f5f5f5","#eeeeee","#e8e8e8","#e4e4e4","#e0e0e0","#dcdcdc","#d8d8d8",
    "#d4d4d4","#d0d0d0","#cccccc","#c8c8c8","#f0f0f0","#ececec","#e8e8e8","#e4e4e4",
    "#e0e0e0","#dcdcdc","#d8d8d8","#d4d4d4","#d0d0d0","#cccccc","#c8c8c8","#c4c4c4",
  ],
  row8Gradient: ["#909090","#b0b0b0","#d0d0d0","#eeeeee","#ffffff"],
  shadowColours: ["#909090","#b0b0b0","#d0d0d0","#eeeeee","#ffffff"],
  swatchGradient: "linear-gradient(to bottom, #888888, #ffffff)",
};

// ─── BLACK ────────────────────────────────────────────────────────────────────
const black: ColourTheme = {
  id: "black", label: "Black", baseHex: "#000000",
  row3Labels: [
    ["#000000","Void"],["#0a0a0a",""],["#111111","Charcoal"],["#222222","Ebony"],
    ["#333333","Carbon"],["#444444","Dark Slate"],["#555555","Graphite"],
    ["#666666","Dim Grey"],["#777777","Sonic Silver"],["#888888","Battleship"],
    ["#000000",""],["#111111",""],
  ],
  row4_5: [
    "#000000","#0a0a0a","#111111","#222222",
    "#333333","#444444","#555555","#666666",
    "#777777","#888888","#fff0cc","#fff0cc",
  ],
  row6: [
    "#0a0a0a","#000000","#333333","#111111","#444444","#222222","#555555","#333333",
    "#666666","#444444","#777777","#555555","#888888","#666666","#999999","#777777",
    "#777777","#555555","#555555","#333333","#888888","#666666","#999999","#777777",
  ],
  row7: [
    "#080808","#050505","#000000","#000000","#181818","#121212","#0a0a0a","#050505",
    "#282828","#202020","#181818","#101010","#383838","#303030","#282828","#202020",
    "#484848","#404040","#383838","#303030","#585858","#505050","#484848","#404040",
    "#080808","#050505","#000000","#000000","#181818","#121212","#0a0a0a","#050505",
    "#282828","#202020","#181818","#101010","#383838","#303030","#282828","#202020",
    "#484848","#404040","#383838","#303030","#585858","#505050","#484848","#404040",
  ],
  row8Gradient: ["#000000","#111111","#333333","#666666","#888888"],
  shadowColours: ["#000000","#111111","#333333","#666666","#888888"],
  swatchGradient: "linear-gradient(to bottom, #000000, #666666)",
};

// ─── EXPORTS ──────────────────────────────────────────────────────────────────
export const themes: Record<ThemeId, ColourTheme> = {
  red, pink, blue, white, black, green, purple, yellow, orange, default: defaultTheme,
};

export const themeOrder: ThemeId[] = [
  "red","pink","blue","white","black","green","purple","yellow","orange","default",
];

export const DEFAULT_THEME_ID: ThemeId = "default";
