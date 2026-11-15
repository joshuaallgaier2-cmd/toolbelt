export interface RgbaColor {
  r: number; // 0 - 255
  g: number; // 0 - 255
  b: number; // 0 - 255
  a: number; // 0 - 1
}

export interface HslColor {
  h: number; // 0 - 360
  s: number; // 0 - 100
  l: number; // 0 - 100
  a: number; // 0 - 1
}

export type ParseColorResult =
  | { ok: true; value: RgbaColor }
  | { ok: false; error: string };

export interface WcagRatingResult {
  normalText: {
    aa: boolean;
    aaa: boolean;
  };
  largeText: {
    aa: boolean;
    aaa: boolean;
  };
}

const CSS_NAMED_COLORS: Record<string, string> = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32",
};

/**
 * Converts an HSL color to RGBA.
 */
export function hslToRgb(hsl: HslColor): RgbaColor {
  const hNorm = ((hsl.h % 360) + 360) % 360;
  const sNorm = Math.max(0, Math.min(100, hsl.s)) / 100;
  const lNorm = Math.max(0, Math.min(100, hsl.l)) / 100;
  const aNorm = Math.max(0, Math.min(1, hsl.a));

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((hNorm / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let rPrime = 0;
  let gPrime = 0;
  let bPrime = 0;

  if (hNorm < 60) {
    rPrime = c;
    gPrime = x;
    bPrime = 0;
  } else if (hNorm < 120) {
    rPrime = x;
    gPrime = c;
    bPrime = 0;
  } else if (hNorm < 180) {
    rPrime = 0;
    gPrime = c;
    bPrime = x;
  } else if (hNorm < 240) {
    rPrime = 0;
    gPrime = x;
    bPrime = c;
  } else if (hNorm < 300) {
    rPrime = x;
    gPrime = 0;
    bPrime = c;
  } else {
    rPrime = c;
    gPrime = 0;
    bPrime = x;
  }

  return {
    r: Math.round((rPrime + m) * 255),
    g: Math.round((gPrime + m) * 255),
    b: Math.round((bPrime + m) * 255),
    a: aNorm,
  };
}

/**
 * Converts an RGBA color to HSL.
 */
export function rgbToHsl(color: RgbaColor): HslColor {
  const hsl = rgbToHslExact(color);
  return { ...hsl, h: Math.round(hsl.h) % 360, s: Math.round(hsl.s), l: Math.round(hsl.l) };
}

/** Converts without rounding, for lightness adjustments that preserve hue and saturation. */
export function rgbToHslExact(color: RgbaColor): HslColor {
  const rNorm = Math.max(0, Math.min(255, color.r)) / 255;
  const gNorm = Math.max(0, Math.min(255, color.g)) / 255;
  const bNorm = Math.max(0, Math.min(255, color.b)) / 255;
  const aNorm = Math.max(0, Math.min(1, color.a));

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  const l = (max + min) / 2;
  let s = 0;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  let h = 0;
  if (delta !== 0) {
    if (max === rNorm) {
      h = 60 * (((gNorm - bNorm) / delta) % 6);
    } else if (max === gNorm) {
      h = 60 * ((bNorm - rNorm) / delta + 2);
    } else {
      h = 60 * ((rNorm - gNorm) / delta + 4);
    }
  }

  if (h < 0) {
    h += 360;
  }

  return {
    h,
    s: s * 100,
    l: l * 100,
    a: aNorm,
  };
}

function parseHex(raw: string): ParseColorResult {
  const hex = raw.slice(1);
  if (!/^[0-9a-fA-F]+$/.test(hex)) {
    return { ok: false, error: "Invalid hexadecimal characters" };
  }

  if (hex.length === 3) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    return { ok: true, value: { r, g, b, a: 1 } };
  }

  if (hex.length === 4) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    const a = parseInt(hex[3] + hex[3], 16) / 255;
    return { ok: true, value: { r, g, b, a } };
  }

  if (hex.length === 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { ok: true, value: { r, g, b, a: 1 } };
  }

  if (hex.length === 8) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const a = parseInt(hex.slice(6, 8), 16) / 255;
    return { ok: true, value: { r, g, b, a } };
  }

  return {
    ok: false,
    error: `Invalid HEX length: #${hex} (expected 3, 4, 6, or 8 characters)`,
  };
}

function parseNumberToken(token: string): number | null {
  if (!/^[+-]?(?:\d*\.\d+|\d+)(?:e[+-]?\d+)?$/i.test(token)) return null;
  const num = Number(token);
  return Number.isFinite(num) ? num : null;
}

function parseAlphaToken(token: string): number | null {
  const trimmed = token.trim();
  if (trimmed.endsWith("%")) {
    const num = parseNumberToken(trimmed.slice(0, -1));
    if (num === null) return null;
    return Math.max(0, Math.min(1, num / 100));
  }
  const num = parseNumberToken(trimmed);
  if (num === null) return null;
  return Math.max(0, Math.min(1, num));
}

function parseRgbComponent(token: string): number | null {
  const trimmed = token.trim();
  if (trimmed.endsWith("%")) {
    const num = parseNumberToken(trimmed.slice(0, -1));
    if (num === null) return null;
    return Math.max(0, Math.min(255, (num / 100) * 255));
  }
  const num = parseNumberToken(trimmed);
  if (num === null) return null;
  return Math.max(0, Math.min(255, num));
}

function parseRgbTokens(content: string): {
  rStr: string;
  gStr: string;
  bStr: string;
  aStr?: string;
} | null {
  const trimmed = content.trim();
  if (trimmed.includes(",")) {
    if (trimmed.includes("/")) return null;
    const rawParts = trimmed.split(",");
    const parts = rawParts.map((s) => s.trim());
    if (parts.some((p) => p === "")) return null;
    if (parts.length === 3) {
      return { rStr: parts[0], gStr: parts[1], bStr: parts[2] };
    }
    if (parts.length === 4) {
      return { rStr: parts[0], gStr: parts[1], bStr: parts[2], aStr: parts[3] };
    }
    return null;
  }

  if (trimmed.includes("/")) {
    const slashParts = trimmed.split("/");
    if (slashParts.length !== 2) return null;
    const colorTokens = slashParts[0].trim().split(/\s+/);
    if (colorTokens.length !== 3 || colorTokens.some((p) => p === "")) return null;
    const aStr = slashParts[1].trim();
    if (!aStr) return null;
    return {
      rStr: colorTokens[0],
      gStr: colorTokens[1],
      bStr: colorTokens[2],
      aStr,
    };
  }

  const tokens = trimmed.split(/\s+/);
  if (tokens.some((p) => p === "")) return null;
  if (tokens.length === 3) {
    return { rStr: tokens[0], gStr: tokens[1], bStr: tokens[2] };
  }
  return null;
}

function parseRgb(content: string): ParseColorResult {
  const tokens = parseRgbTokens(content);
  if (!tokens) {
    return { ok: false, error: "Invalid rgb() syntax" };
  }

  const r = parseRgbComponent(tokens.rStr);
  const g = parseRgbComponent(tokens.gStr);
  const b = parseRgbComponent(tokens.bStr);

  if (r === null || g === null || b === null) {
    return { ok: false, error: "Invalid RGB color values" };
  }

  let a = 1;
  if (tokens.aStr !== undefined) {
    const parsedAlpha = parseAlphaToken(tokens.aStr);
    if (parsedAlpha === null) {
      return { ok: false, error: "Invalid alpha channel value" };
    }
    a = parsedAlpha;
  }

  return {
    ok: true,
    value: {
      r: Math.round(r),
      g: Math.round(g),
      b: Math.round(b),
      a,
    },
  };
}

function parseHue(token: string): number | null {
  const lower = token.trim().toLowerCase();
  const unit = lower.match(/(deg|grad|rad|turn)$/)?.[0];
  const num = parseNumberToken(unit ? lower.slice(0, -unit.length) : lower);
  if (num === null) return null;

  let h = num;
  if (unit === "grad") h = (num * 360) / 400;
  else if (unit === "rad") h = (num * 180) / Math.PI;
  else if (unit === "turn") h = num * 360;

  if (!Number.isFinite(h)) return null;
  return ((h % 360) + 360) % 360;
}

export type HslComponentsParseResult =
  | { ok: true; value: HslColor }
  | { ok: false; error: string };

/** Parses the HSL components from an hsl()/hsla() string without converting through RGB. */
export function parseHslComponents(input: string): HslComponentsParseResult {
  const match = input.trim().match(/^hsla?\s*\((.*)\)$/i);
  if (!match) return { ok: false, error: "Invalid hsl() syntax" };

  const tokens = parseRgbTokens(match[1]);
  if (!tokens) return { ok: false, error: "Invalid hsl() syntax" };

  const h = parseHue(tokens.rStr);
  if (h === null) return { ok: false, error: "Invalid hue value" };

  const sStr = tokens.gStr.trim();
  const sNum = parseNumberToken(sStr.endsWith("%") ? sStr.slice(0, -1) : sStr);
  if (sNum === null) return { ok: false, error: "Invalid saturation value" };

  const lStr = tokens.bStr.trim();
  const lNum = parseNumberToken(lStr.endsWith("%") ? lStr.slice(0, -1) : lStr);
  if (lNum === null) return { ok: false, error: "Invalid lightness value" };

  let a = 1;
  if (tokens.aStr !== undefined) {
    const parsedAlpha = parseAlphaToken(tokens.aStr);
    if (parsedAlpha === null) return { ok: false, error: "Invalid alpha channel value" };
    a = parsedAlpha;
  }

  return { ok: true, value: { h, s: Math.max(0, Math.min(100, sNum)), l: Math.max(0, Math.min(100, lNum)), a } };
}

function parseHsl(content: string): ParseColorResult {
  const components = parseHslComponents(`hsl(${content})`);
  if (!components.ok) return components;
  return { ok: true, value: hslToRgb(components.value) };
}

/**
 * Parses a color string in HEX (#rgb, #rgba, #rrggbb, #rrggbbaa), bare HEX,
 * CSS named colors, RGB / RGBA, or HSL / HSLA syntax.
 *
 * Normalizes alpha to [0, 1] and returns { ok: false, error: string } for invalid inputs.
 */
export function parseColor(input: string): ParseColorResult {
  if (!input || typeof input !== "string") {
    return { ok: false, error: "Input is empty or not a string" };
  }

  const str = input.trim();
  if (str === "") {
    return { ok: false, error: "Input is empty" };
  }

  // Hex
  if (str.startsWith("#")) {
    return parseHex(str);
  }

  // Bare HEX
  if (/^(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(str)) {
    return parseHex(`#${str}`);
  }

  // CSS named colors
  const namedColor = CSS_NAMED_COLORS[str.toLowerCase()];
  if (namedColor) {
    return parseHex(namedColor);
  }
  if (str.toLowerCase() === "transparent") {
    return { ok: true, value: { r: 0, g: 0, b: 0, a: 0 } };
  }
  if (str.toLowerCase() === "currentcolor") {
    return { ok: false, error: "currentcolor needs a surrounding CSS context" };
  }

  // RGB / RGBA
  const rgbMatch = str.match(/^rgba?\s*\((.*)\)$/i);
  if (rgbMatch) {
    return parseRgb(rgbMatch[1]);
  }

  // HSL / HSLA
  const hslMatch = str.match(/^hsla?\s*\((.*)\)$/i);
  if (hslMatch) {
    return parseHsl(hslMatch[1]);
  }

  return {
    ok: false,
    error: `Unrecognized color format: "${input}". Expected #HEX, bare HEX, a CSS color name, rgb(), rgba(), hsl(), or hsla().`,
  };
}

/**
 * Formats an RGBA color as a lowercase HEX string.
 * Emits 6 digits (#rrggbb) if alpha is 1, or 8 digits (#rrggbbaa) if alpha < 1.
 */
export function toHex(color: RgbaColor, options?: { forceAlpha?: boolean }): string {
  const r = Math.round(Math.max(0, Math.min(255, color.r)))
    .toString(16)
    .padStart(2, "0");
  const g = Math.round(Math.max(0, Math.min(255, color.g)))
    .toString(16)
    .padStart(2, "0");
  const b = Math.round(Math.max(0, Math.min(255, color.b)))
    .toString(16)
    .padStart(2, "0");
  const aNorm = Math.max(0, Math.min(1, color.a));

  if (options?.forceAlpha || aNorm < 1) {
    const a = Math.round(aNorm * 255)
      .toString(16)
      .padStart(2, "0");
    return `#${r}${g}${b}${a}`;
  }
  return `#${r}${g}${b}`;
}

/**
 * Formats an RGBA color as an rgb() or rgba() string.
 */
export function toRgbString(color: RgbaColor): string {
  const r = Math.round(Math.max(0, Math.min(255, color.r)));
  const g = Math.round(Math.max(0, Math.min(255, color.g)));
  const b = Math.round(Math.max(0, Math.min(255, color.b)));
  const aNorm = Math.max(0, Math.min(1, color.a));

  if (aNorm < 1) {
    const aFormatted = parseFloat(aNorm.toFixed(4)).toString();
    return `rgba(${r}, ${g}, ${b}, ${aFormatted})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Formats an RGBA or HSL color as an hsl() or hsla() string.
 */
export function toHslString(color: RgbaColor | HslColor): string {
  const hsl = "h" in color && "s" in color && "l" in color ? color : rgbToHsl(color);
  const h = Math.round(((hsl.h % 360) + 360) % 360);
  const s = Math.round(Math.max(0, Math.min(100, hsl.s)));
  const l = Math.round(Math.max(0, Math.min(100, hsl.l)));
  const aNorm = Math.max(0, Math.min(1, hsl.a));

  if (aNorm < 1) {
    const aFormatted = parseFloat(aNorm.toFixed(4)).toString();
    return `hsla(${h}, ${s}%, ${l}%, ${aFormatted})`;
  }
  return `hsl(${h}, ${s}%, ${l}%)`;
}

/** Formats HSL components without rounding hue, saturation, or lightness. */
export function toHslWithAlpha(hsl: HslColor, alpha: number): string {
  const aNorm = Math.max(0, Math.min(1, alpha));
  const aFormatted = parseFloat(aNorm.toFixed(4)).toString();
  return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${aFormatted})`;
}

/**
 * Calculates the relative luminance of an sRGB color per WCAG 2.1 specs.
 */
export function relativeLuminance(color: RgbaColor): number {
  const rNorm = Math.max(0, Math.min(255, color.r)) / 255;
  const gNorm = Math.max(0, Math.min(255, color.g)) / 255;
  const bNorm = Math.max(0, Math.min(255, color.b)) / 255;

  const R = rNorm <= 0.04045 ? rNorm / 12.92 : Math.pow((rNorm + 0.055) / 1.055, 2.4);
  const G = gNorm <= 0.04045 ? gNorm / 12.92 : Math.pow((gNorm + 0.055) / 1.055, 2.4);
  const B = bNorm <= 0.04045 ? bNorm / 12.92 : Math.pow((bNorm + 0.055) / 1.055, 2.4);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Calculates the WCAG 2.1 contrast ratio between two colors (ranging from 1 to 21).
 * If the background has alpha < 1, it is first composited onto white (#ffffff).
 * If the foreground has alpha < 1, it is then composited onto the resulting background.
 * The contrast ratio is calculated between the two final opaque colors.
 */
export function contrastRatio(color1: RgbaColor, color2: RgbaColor): number {
  const bgAlpha = Math.max(0, Math.min(1, color2.a));
  const bg: RgbaColor = {
    r: color2.r * bgAlpha + 255 * (1 - bgAlpha),
    g: color2.g * bgAlpha + 255 * (1 - bgAlpha),
    b: color2.b * bgAlpha + 255 * (1 - bgAlpha),
    a: 1,
  };

  const fgAlpha = Math.max(0, Math.min(1, color1.a));
  const fg: RgbaColor = {
    r: color1.r * fgAlpha + bg.r * (1 - fgAlpha),
    g: color1.g * fgAlpha + bg.g * (1 - fgAlpha),
    b: color1.b * fgAlpha + bg.b * (1 - fgAlpha),
    a: 1,
  };

  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Formats a contrast ratio for display with two decimals, truncated rather than rounded, so it
 * never shows more contrast than the colors have: WCAG doesn't round, and 4.4993 must not read
 * 4.50 next to a failed 4.5:1 check.
 */
export function formatContrastRatio(ratio: number): string {
  // toPrecision drops float noise before truncating: 4.56 * 100 is 455.99999999999994.
  return (Math.floor(Number((ratio * 100).toPrecision(12))) / 100).toFixed(2);
}

/**
 * Computes WCAG 2.1 AA and AAA compliance ratings for normal and large text.
 */
export function wcagRating(ratio: number): WcagRatingResult {
  return {
    normalText: {
      aa: ratio >= 4.5,
      aaa: ratio >= 7,
    },
    largeText: {
      aa: ratio >= 3,
      aaa: ratio >= 4.5,
    },
  };
}
