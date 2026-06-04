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
    "#0b2ebe","#0f37de","#1341ff","#2960ff",
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
    "#698fe2","#567edc","#3469fa","#0620b4","#0900de","#0600be","#5487ff","#3d73ff",
    "#2285ff","#5285ff","#1c53be","#1389e0","#79a4ff","#6696ff","#6696ff","#2f97be",
    "#9ebfff","#91b6ff","#668dde","#c4d9ff","#bcd4ff","#a6c5ff","#87c9e0","#687c9e",
    "#698fe2","#567edc","#3469fa","#0620b4","#0900de","#0600be","#5487ff","#3d73ff",
    "#2285ff","#5285ff","#1c53be","#1389e0","#79a4ff","#6696ff","#6696ff","#2f97be",
    "#9ebfff","#91b6ff","#668dde","#c4d9ff","#bcd4ff","#a6c5ff","#87c9e0","#687c9e",
  ],
  row8Gradient: ["#0b2ebe","#1341ff","#4278ff","#90b6ff","#ccdfff"],
  shadowColours: ["#0b2ebe","#1341ff","#4278ff","#90b6ff","#ccdfff"],
  swatchGradient: "linear-gradient(to bottom, #1341ff, #4278ff)",
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
    "#0b2ebe","#0f37de","#fff0cc","#ffe3a3",
    "#ffc300","#ff44a1","#ff0073","#ff0009",
    "#fff0cc","#fff0cc","#fff0cc","#fff0cc",
  ],
  row6: [
    "#426dd6","#274eb5","#ffca42","#dea900",
    "#ff5eaa","#de3a8b","#ff769b","#be3076",
    "#be3076","#9e2b62","#ff5d8e","#be0054",
    "#be0054","#9e0043","#ff7766","#ff5e4e",
    "#ff5e4e","#be0003","#9e0003","#be0003",
    "#9e0003","#ff7766","#ff5e4e","#be0003",
  ],
  row7: [
    "#ffd679","#ff0000","#be9000","#9e7800","#ff87bc","#ff73b3","#be3076","#9e2b62",
    "#ff769b","#be2b62","#ff769b","#be0045","#9e0045","#ff7766","#ff5e4e","#be0003",
    "#9e0003","#be0003","#9e0003","#ff7766","#ff5e4e","#be0003","#9e0003","#9e0003",
    "#ffd679","#ff0000","#be9000","#9e7800","#ff87bc","#ff73b3","#be3076","#9e2b62",
    "#ff769b","#be2b62","#ff769b","#be0045","#9e0045","#ff7766","#ff5e4e","#be0003",
    "#9e0003","#be0003","#9e0003","#ff7766","#ff5e4e","#be0003","#9e0003","#9e0003",
  ],
  row8Gradient: ["#898989","#ffe3a3","#ffc300","#ff44a1","#ff0073","#ff0009"],
  shadowColours: ["#898989","#ffe3a3","#ffc300","#ff44a1","#ff0073","#ff0009"],
  swatchGradient: "linear-gradient(to bottom, #898989, #ffc300, #ff44a1, #ff0009)",
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
    "#ba0005","#d00007","#ff0009","#ff4034",
    "#ff5e40","#ff7766","#ff8c7c","#ffa192",
    "#ffb5a9","#ffcdc9","#fff0cc","#fff0cc",
  ],
  row6: [
    "#d00007","#ba0005","#ff5040","#d03020","#ff6e50","#d04a30","#ff8870","#d06050",
    "#ffa090","#d07870","#ffb4a5","#d09085","#ffc8bb","#d0a89a","#ffdad5","#d0bcb6",
    "#d0bcb6","#ba9f9a","#ff8870","#d06050","#ff9982","#d07260","#ffaa96","#d082 70",
  ],
  row7: [
    "#ff2020","#ff0000","#d01010","#ba0000","#ff5040","#ff3025","#d03020","#ba2015",
    "#ff7060","#ff5550","#d05040","#ba3030","#ff9080","#ff7870","#d07060","#ba5050",
    "#ffb0a0","#ff9890","#d09080","#ba7070","#ffd0c5","#ffb8b0","#d0b0a0","#ba9090",
    "#ff2020","#ff0000","#d01010","#ba0000","#ff5040","#ff3025","#d03020","#ba2015",
    "#ff7060","#ff5550","#d05040","#ba3030","#ff9080","#ff7870","#d07060","#ba5050",
    "#ffb0a0","#ff9890","#d09080","#ba7070","#ffd0c5","#ffb8b0","#d0b0a0","#ba9090",
  ],
  row8Gradient: ["#ba0005","#ff0009","#ff5e40","#ffa192","#ffcdc9"],
  shadowColours: ["#ba0005","#ff0009","#ff5e40","#ffa192","#ffcdc9"],
  swatchGradient: "linear-gradient(to bottom, #ff0009, #ff7766)",
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
    "#be0070","#d40080","#ff0099","#ff4ba3",
    "#ff5ead","#ff76b7","#ff8cc1","#ffa0cb",
    "#ffb5d5","#ffd0e5","#fff0cc","#fff0cc",
  ],
  row6: [
    "#d40080","#be0070","#ff5ead","#d43080","#ff76b7","#d44a88","#ff8cc1","#d46090",
    "#ffa0cb","#d47898","#ffb5d5","#d490a2","#ffc8e0","#d4a8b0","#ffdaec","#d4bcbe",
    "#d4bcbe","#be9eaa","#ff8cc1","#d46090","#ff9ab8","#d47290","#ffaac5","#d482a0",
  ],
  row7: [
    "#ff2299","#ff0088","#d01070","#be0060","#ff50a5","#ff3090","#d03080","#be2065",
    "#ff70b5","#ff55a0","#d05090","#be3075","#ff90c5","#ff78b0","#d070a0","#be5085",
    "#ffb0d5","#ff98c0","#d090b0","#be7095","#ffd0e8","#ffb8d8","#d0b0c8","#be90ab",
    "#ff2299","#ff0088","#d01070","#be0060","#ff50a5","#ff3090","#d03080","#be2065",
    "#ff70b5","#ff55a0","#d05090","#be3075","#ff90c5","#ff78b0","#d070a0","#be5085",
    "#ffb0d5","#ff98c0","#d090b0","#be7095","#ffd0e8","#ffb8d8","#d0b0c8","#be90ab",
  ],
  row8Gradient: ["#be0070","#ff0099","#ff5ead","#ffa0cb","#ffd0e5"],
  shadowColours: ["#be0070","#ff0099","#ff5ead","#ffa0cb","#ffd0e5"],
  swatchGradient: "linear-gradient(to bottom, #ff0099, #ff76b7)",
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
    "#be9000","#d4a000","#ffc300","#ffca42",
    "#ffd060","#ffd879","#ffe08f","#ffe8a3",
    "#fff0b5","#fff8c5","#fff0cc","#fff0cc",
  ],
  row6: [
    "#d4a000","#be9000","#ffd060","#d4a830","#ffd879","#d4b045","#ffe08f","#d4ba58",
    "#ffe8a3","#d4c268","#fff0b5","#d4ca78","#fff4c2","#d4d088","#fff8d0","#d4d898",
    "#d4d898","#bebc80","#ffe08f","#d4ba58","#ffc480","#d49a44","#ffce88","#d4a250",
  ],
  row7: [
    "#ffc800","#ffbe00","#d4a000","#be9000","#ffd042","#ffca30","#d4a820","#be9010",
    "#ffd862","#ffd050","#d4b040","#be9828","#ffe080","#ffd878","#d4ba60","#be9e40",
    "#ffe89a","#ffe090","#d4c275","#beac55","#fff0b5","#ffe8a8","#d4ca90","#bebc70",
    "#ffc800","#ffbe00","#d4a000","#be9000","#ffd042","#ffca30","#d4a820","#be9010",
    "#ffd862","#ffd050","#d4b040","#be9828","#ffe080","#ffd878","#d4ba60","#be9e40",
    "#ffe89a","#ffe090","#d4c275","#beac55","#fff0b5","#ffe8a8","#d4ca90","#bebc70",
  ],
  row8Gradient: ["#be9000","#ffc300","#ffd879","#ffe8a3","#fff8c5"],
  shadowColours: ["#be9000","#ffc300","#ffd879","#ffe8a3","#fff8c5"],
  swatchGradient: "linear-gradient(to bottom, #ffc300, #ffd879)",
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
    "#547838","#698e44","#80b155","#90be68",
    "#a0c878","#b0d488","#c0de98","#d0e8a8",
    "#e0f0b8","#eef8cc","#fff0cc","#fff0cc",
  ],
  row6: [
    "#698e44","#547838","#a0c878","#789848","#b0d488","#80a450","#c0de98","#90b060",
    "#d0e8a8","#a0c070","#e0f0b8","#b0d080","#ecf8c8","#c0dc90","#f4fcd8","#d0e8a0",
    "#d0e8a0","#b8ce88","#c0de98","#90b060","#c8e0a0","#98b468","#d0e8a8","#a0bc70",
  ],
  row7: [
    "#85b558","#7aaa50","#698e44","#547838","#95c268","#88b85c","#789848","#658030",
    "#a8ce78","#98c26c","#84a858","#708c40","#b8d888","#a8cc7c","#98b868","#80a050",
    "#c8e498","#b8d88c","#a8c878","#90b060","#d8f0a8","#c8e49c","#b8d888","#a0c070",
    "#85b558","#7aaa50","#698e44","#547838","#95c268","#88b85c","#789848","#658030",
    "#a8ce78","#98c26c","#84a858","#708c40","#b8d888","#a8cc7c","#98b868","#80a050",
    "#c8e498","#b8d88c","#a8c878","#90b060","#d8f0a8","#c8e49c","#b8d888","#a0c070",
  ],
  row8Gradient: ["#547838","#80b155","#a0c878","#d0e8a8","#eef8cc"],
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
