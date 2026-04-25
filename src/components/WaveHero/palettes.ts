import type { Palette } from "./types";

/**
 * Preset colour palettes for WaveHero. Each palette is just two arrays of
 * three colours — the geometry (wavelengths, speeds, amplitudes, etc.)
 * stays the same across palettes, so swapping a palette is a pure visual
 * recolour.
 *
 * Format per array: [deepColor, midColor, fadeTargetColor]
 * The fade target is typically the container background (white) so the
 * wave fades cleanly to nothing at the bottom.
 *
 * To add a palette: pick 3 tones from deep to fade for `primary`, and
 * 3 warmer/lighter tones for `highlight`. Test in the wave-explainer
 * playground before shipping.
 */
export const palettes = {
  /** Warm vivid orange — the default showreel palette. */
  orange: {
    primary: ["#C2410C", "#EA580C", "#FDBA74"],
    highlight: ["#FE9239", "#FED7AA", "#FFFFFF"],
  },

  /** Deep ocean blue. */
  blue: {
    primary: ["#1E3A8A", "#2563EB", "#93C5FD"],
    highlight: ["#38BDF8", "#BAE6FD", "#FFFFFF"],
  },

  /** Dreamy violet / magenta. */
  purple: {
    primary: ["#581C87", "#7C3AED", "#C4B5FD"],
    highlight: ["#D946EF", "#E9D5FF", "#FFFFFF"],
  },

  /** Fresh emerald green. */
  green: {
    primary: ["#14532D", "#16A34A", "#86EFAC"],
    highlight: ["#34D399", "#A7F3D0", "#FFFFFF"],
  },

  /** Regal amber gold. */
  gold: {
    primary: ["#78350F", "#D97706", "#FDE68A"],
    highlight: ["#FBBF24", "#FEF3C7", "#FFFFFF"],
  },

  /** Rose / soft pink. */
  pink: {
    primary: ["#9F1239", "#E11D48", "#FDA4AF"],
    highlight: ["#F472B6", "#FBCFE8", "#FFFFFF"],
  },

  /** Teal aqua — ocean meets sky. */
  teal: {
    primary: ["#134E4A", "#0D9488", "#5EEAD4"],
    highlight: ["#67E8F9", "#CFFAFE", "#FFFFFF"],
  },
} satisfies Record<string, Palette>;

export type PaletteName = keyof typeof palettes;
