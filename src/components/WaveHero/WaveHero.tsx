import type { CSSProperties } from "react";
import type { Palette, WaveHeroConfig, WaveLayer } from "./types";
import { palettes, type PaletteName } from "./palettes";
import { makeTheme } from "./themes";

/* ──────────────────────────────────────────────────────────
 * Props
 * ────────────────────────────────────────────────────────── */

type Props = {
  /** Pick a preset palette name, or pass a custom Palette. Default "orange". */
  palette?: PaletteName | Palette;
  /** Full config override. If provided, `palette` is ignored. */
  config?: WaveHeroConfig;
};

/* ──────────────────────────────────────────────────────────
 * Internal constants — don't touch unless you know the buffer math.
 * ────────────────────────────────────────────────────────── */

/**
 * Every SVG viewBox is 1920 tall = 560 (top buffer) + 800 (content) +
 * 560 (bottom buffer). The buffer is what makes the filter:blur edge
 * fade happen OUTSIDE the visible container (clipped by overflow:hidden).
 * User-facing gradient y values (0–800) are content-relative; the
 * component adds OFFSET_Y when it renders.
 */
const OFFSET_Y = 560;
const VIEWBOX_HEIGHT = 1920;

/* ──────────────────────────────────────────────────────────
 * Helpers
 * ────────────────────────────────────────────────────────── */

/**
 * Given a wavelength, compute the viewBox width and SVG CSS width/left
 * such that the animation loops seamlessly. The CSS @keyframes waveDrift
 * translates exactly -33.333% of the SVG width per loop, so the viewBox
 * must contain cycles × wavelength where cycles is a MULTIPLE OF 3
 * (otherwise -1/3 isn't an integer number of wavelengths and the loop
 * snaps). CSS width scales with viewBox width so the CSS wavelength
 * stays constant across different wavelength choices. Left offset matches
 * the hand-tuned values used in the showreel hero.
 */
function layoutForWavelength(wavelength: number): {
  vbW: number;
  cssWidth: number;
  cssLeft: number;
} {
  const cycles = 3 * Math.max(1, Math.round(4800 / (3 * wavelength)));
  const vbW = cycles * wavelength;
  const cssWidth = Math.max(400, vbW / 12);
  const cssLeft = cssWidth > 400 ? -(cssWidth - 100) / 2 : -100;
  return { vbW, cssWidth, cssLeft };
}

/**
 * Build the SVG path `d` string for one wave layer. Produces `cycles` of
 * alternating cubic-bezier arcs (dip + rise = one wavelength), then
 * closes either to the top corners (fill above) or bottom corners (fill
 * below).
 */
function buildPath(
  layer: WaveLayer,
  vbW: number,
  vbH: number,
): string {
  const baseline = (layer.baseline / 100) * 800 + OFFSET_Y;
  const amplitude = (layer.amplitude / 100) * 800;
  const wavelength = layer.wavelength;
  const cycles = Math.max(1, Math.round(vbW / wavelength));
  const step = wavelength / 2;
  const ctrlOff = step / 3;
  const peakY = baseline - amplitude;
  const troughY = baseline + amplitude;
  const flip = layer.flip ?? false;

  let d = `M0,${baseline.toFixed(0)}`;
  for (let i = 0; i < cycles * 2; i++) {
    const startX = i * step;
    const endX = startX + step;
    const cp1x = startX + ctrlOff;
    const cp2x = endX - ctrlOff;
    const isEven = i % 2 === 0;
    // XOR so even halves dip normally; flipping swaps dip/rise.
    const ctrlY = isEven !== flip ? troughY : peakY;
    d += ` C${cp1x.toFixed(0)},${ctrlY.toFixed(0)} ${cp2x.toFixed(0)},${ctrlY.toFixed(0)} ${endX.toFixed(0)},${baseline.toFixed(0)}`;
  }
  d += layer.fillBelow
    ? ` L${vbW},${vbH} L0,${vbH} Z`
    : ` L${vbW},0 L0,0 Z`;
  return d;
}

/* ──────────────────────────────────────────────────────────
 * Single wave SVG subcomponent
 * ────────────────────────────────────────────────────────── */

function WaveSvg({
  layer,
  zIndex,
  gradId,
}: {
  layer: WaveLayer;
  zIndex: number;
  gradId: string;
}) {
  const layout = layoutForWavelength(layer.wavelength);
  const clipPower = layer.clipPower ?? 1;

  const style: CSSProperties = {
    left: `${layout.cssLeft}%`,
    width: `${layout.cssWidth}%`,
    animation: `waveDrift ${layer.speed}s linear infinite${layer.reverse ? " reverse" : ""}`,
    zIndex,
  };

  const path = buildPath(layer, layout.vbW, VIEWBOX_HEIGHT);

  return (
    <svg
      className="wave-svg"
      viewBox={`0 0 ${layout.vbW} ${VIEWBOX_HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={style}
    >
      <defs>
        <linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={layer.gradient.y1 + OFFSET_Y}
          x2="0"
          y2={layer.gradient.y2 + OFFSET_Y}
        >
          {layer.gradient.stops.map((stop, i) => (
            <stop
              key={i}
              offset={`${stop.offset}%`}
              stopColor={stop.color}
              stopOpacity={stop.opacity * clipPower}
            />
          ))}
        </linearGradient>
      </defs>
      <path d={path} fill={`url(#${gradId})`} />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────
 * Main component
 * ────────────────────────────────────────────────────────── */

export default function WaveHero({ palette = "orange", config }: Props) {
  const cfg: WaveHeroConfig = config ?? makeTheme(
    typeof palette === "string" ? palettes[palette] : palette
  );

  const outerStyle: CSSProperties = {
    background: cfg.background,
    // The .wave-svg class reads --wave-blur with an 80px fallback. Set
    // it here so each instance can have its own blur without touching CSS.
    ["--wave-blur" as never]: cfg.blur,
  };

  const zBase = 1;
  const primaryZ = zBase;
  const clipperZStart = zBase + 1;
  const highlightZ = clipperZStart + cfg.clippers.length;

  return (
    <section
      className={`wave-hero w-full ${cfg.outerHeightClass}`}
      style={outerStyle}
    >
      <div className={`wave-area w-full ${cfg.innerHeightClass}`}>
        <WaveSvg
          layer={cfg.primary}
          zIndex={primaryZ}
          gradId="wave-hero-primary"
        />
        {cfg.clippers.map((clipper, i) => (
          <WaveSvg
            key={i}
            layer={clipper}
            zIndex={clipperZStart + i}
            gradId={`wave-hero-clipper-${i + 1}`}
          />
        ))}
        {cfg.highlight && (
          <WaveSvg
            layer={cfg.highlight}
            zIndex={highlightZ}
            gradId="wave-hero-highlight"
          />
        )}
      </div>
    </section>
  );
}
