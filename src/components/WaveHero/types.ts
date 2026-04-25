/**
 * WaveHero — types
 *
 * A "wave hero" is a stack of blurred SVG wave layers used as an animated
 * project header. The visible area is the inner `wave-area` (e.g. 32vh
 * tall); the outer `wave-hero` section is taller so the blur has bottom
 * padding to fade into. All y values in gradients and baselines are
 * expressed in CONTENT-RELATIVE coords (0 = top of content, 800 = bottom
 * of content). The component adds the internal +560 buffer offset when
 * it renders so callers never have to think about it.
 */

/** One stop in a vertical linear gradient. */
export type WaveStop = {
  /** 0–100, position along the gradient. */
  offset: number;
  /** CSS hex color, e.g. "#C2410C". */
  color: string;
  /** 0–1 alpha. */
  opacity: number;
};

/** A vertical gradient inside one wave layer. */
export type WaveGradient = {
  /** Content-relative top of gradient (0 = top of content region). */
  y1: number;
  /** Content-relative bottom of gradient (800 = bottom of content). */
  y2: number;
  /** Any number of stops; 3 is typical. */
  stops: WaveStop[];
};

/** One animated wave layer (primary wave, clipper, or highlight). */
export type WaveLayer = {
  /** Wavelength in viewBox units, e.g. 1600. */
  wavelength: number;
  /** 0–100, % of content region. 50 = vertically centred. */
  baseline: number;
  /** 0–50, % of content region. Half of peak-to-trough distance. */
  amplitude: number;
  /** Seconds per full animation loop. */
  speed: number;
  /** Swap peak/trough phase of the bezier curve. Default false. */
  flip?: boolean;
  /** Close the path to bottom corners so fill sits BELOW the wave line.
   *  True for clippers (they eat into wave 1's bottom edge). */
  fillBelow?: boolean;
  /** Reverse the CSS animation direction. */
  reverse?: boolean;
  /** 0–1, multiplier applied to every stop's opacity. For clippers this
   *  acts as a master "strength" knob (1 = full effect, 0 = invisible). */
  clipPower?: number;
  /** Gradient fill. */
  gradient: WaveGradient;
};

/** A minimal colour theme. Clippers are intentionally NOT in here —
 *  they always paint white (or whatever matches the background) so they
 *  truly erase rather than tint. */
export type Palette = {
  /** 3 colours for the primary wave gradient: [deep, mid, fade]. */
  primary: [string, string, string];
  /** 3 colours for the highlight wave: [accent, mid, white-fade]. */
  highlight: [string, string, string];
};

/** Full configuration for one WaveHero instance. */
export type WaveHeroConfig = {
  /** Tailwind class for the outer section, e.g. "h-[36vh] md:h-[46vh]".
   *  Make this taller than the inner area so the blur's bottom half has
   *  empty white space to fade into. */
  outerHeightClass: string;
  /** Tailwind class for the inner wave-area, e.g. "h-[24vh] md:h-[32vh]".
   *  The waves render at this height; the outer section extends below. */
  innerHeightClass: string;
  /** CSS blur radius applied to every wave SVG, e.g. "80px". */
  blur: string;
  /** CSS background for the outer section (colour or gradient). */
  background: string;
  /** Main wave, z-index 1. */
  primary: WaveLayer;
  /** Clipper waves, z-indexed upward starting from 2. Always white for
   *  maximum "erase" effect. Pass an empty array to disable clipping. */
  clippers: WaveLayer[];
  /** Optional top-layer highlight. z-indexed above all clippers. */
  highlight?: WaveLayer;
};
