import type { Palette, WaveHeroConfig, WaveLayer } from "./types";
import { palettes, type PaletteName } from "./palettes";

/**
 * Base geometry — the layout, wavelengths, speeds, amplitudes, and stop
 * placements that define the WaveHero's *motion and structure*. Colours
 * are provided separately by a Palette. All tuning done in the wave
 * explainer playground bakes into these values.
 *
 * If you need to change motion/shape for a specific project, don't edit
 * this; create a one-off config by spreading `makeTheme(...)` and
 * overriding the fields you want.
 */
const baseGeometry = {
  outerHeightClass: "h-[36vh] md:h-[46vh]",
  innerHeightClass: "h-[24vh] md:h-[32vh]",
  blur: "80px",
  background: "#FFFFFF",

  primary: {
    wavelength: 2200,
    baseline: 50,   // % of content region
    amplitude: 48,  // % (half peak-to-trough)
    speed: 9,
    // Stops are positioned at 0%/55%/100% with these opacities — the
    // palette supplies the colour at each stop.
    gradient: {
      y1: 0,
      y2: 800,
      stops: [
        { offset: 0, color: "#000000", opacity: 0.9 },   // replaced by palette
        { offset: 55, color: "#000000", opacity: 0.75 }, // replaced by palette
        { offset: 100, color: "#000000", opacity: 0 },   // replaced by palette
      ],
    },
  } satisfies WaveLayer,

  // TWO clippers running in opposite directions, both fillBelow, both
  // white — they ERASE wave 1's bottom edge to give a fluid, non-sine
  // appearance. If a project needs stronger/weaker disruption, change
  // each clipper's `clipPower`.
  clippers: [
    // Clipper 01 — large amplitude, reverse direction, opacity-dip pattern
    // (stop at 14% drops to 0.1 before climbing back) which creates a
    // thin translucent band right at wave 1's bottom edge.
    {
      wavelength: 1600,
      baseline: 50,
      amplitude: 50,
      speed: 7,
      fillBelow: true,
      reverse: true,
      clipPower: 1,
      gradient: {
        y1: 0,
        y2: 800,
        stops: [
          { offset: 5, color: "#FFFFFF", opacity: 1 },
          { offset: 14, color: "#FFFFFF", opacity: 0.1 },
          { offset: 36, color: "#FFFFFF", opacity: 1 },
        ],
      },
    },
    // Clipper 02 — smaller amplitude, forward direction, conventional
    // gradient. Runs against clipper 01 so the bite pattern never
    // repeats the same way twice.
    {
      wavelength: 1600,
      baseline: 50,
      amplitude: 35,
      speed: 11,
      fillBelow: true,
      clipPower: 1,
      gradient: {
        y1: 0,
        y2: 800,
        stops: [
          { offset: 0, color: "#FFFFFF", opacity: 0.7 },
          { offset: 55, color: "#FFFFFF", opacity: 0.35 },
          { offset: 100, color: "#FFFFFF", opacity: 0 },
        ],
      },
    },
  ] satisfies WaveLayer[],

  // Highlight wave — tight wavelength, slow speed, warm tint. Sits on
  // top of everything so the warmth reads over the chewed shape.
  highlight: {
    wavelength: 800,
    baseline: 52,
    amplitude: 28,
    speed: 14,
    reverse: true,
    gradient: {
      y1: 0,
      y2: 800,
      stops: [
        { offset: 0, color: "#000000", opacity: 0.75 }, // replaced by palette
        { offset: 60, color: "#000000", opacity: 0.35 }, // replaced by palette
        { offset: 100, color: "#000000", opacity: 0 },   // replaced by palette
      ],
    },
  } satisfies WaveLayer,
};

/** Stitch a palette into the base geometry. */
export function makeTheme(paletteOrName: Palette | PaletteName): WaveHeroConfig {
  const palette: Palette =
    typeof paletteOrName === "string" ? palettes[paletteOrName] : paletteOrName;

  return {
    ...baseGeometry,
    primary: {
      ...baseGeometry.primary,
      gradient: {
        ...baseGeometry.primary.gradient,
        stops: [
          { offset: 0, color: palette.primary[0], opacity: 0.9 },
          { offset: 55, color: palette.primary[1], opacity: 0.75 },
          { offset: 100, color: palette.primary[2], opacity: 0 },
        ],
      },
    },
    clippers: baseGeometry.clippers, // always white — palette-independent
    highlight: {
      ...baseGeometry.highlight,
      gradient: {
        ...baseGeometry.highlight.gradient,
        stops: [
          { offset: 0, color: palette.highlight[0], opacity: 0.75 },
          { offset: 60, color: palette.highlight[1], opacity: 0.35 },
          { offset: 100, color: palette.highlight[2], opacity: 0 },
        ],
      },
    },
  };
}

/** Ready-made themes (palette + base geometry). */
export const orangeTheme = makeTheme("orange");
export const blueTheme = makeTheme("blue");
export const purpleTheme = makeTheme("purple");
export const greenTheme = makeTheme("green");
export const goldTheme = makeTheme("gold");
export const pinkTheme = makeTheme("pink");
export const tealTheme = makeTheme("teal");
