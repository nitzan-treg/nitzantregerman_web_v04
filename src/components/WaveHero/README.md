# WaveHero

Animated, blurred layered-wave hero. Used as a project page header.

Four waves stacked in z-order:
1. **Primary** — the main orange wave
2. **Clipper 01** — white fill-below wave that erases the bottom edge of wave 1 (irregular "bite" effect)
3. **Clipper 02** — a second clipper running in the opposite direction, different amplitude
4. **Highlight** — warm-tint top layer

All blurred 80px by default. The outer container is intentionally taller than the wave area so the blur's bottom half has empty white space to fade into (no hard cut).

---

## Quick use

```tsx
import WaveHero from "@/components/WaveHero";

<WaveHero />                       // default: orange
<WaveHero palette="blue" />        // preset palette
<WaveHero palette="purple" />
```

Available palettes: **orange** (default), **blue**, **purple**, **green**, **gold**, **pink**, **teal**.

## Custom colours (same geometry)

```tsx
<WaveHero palette={{
  primary: ["#C2410C", "#EA580C", "#FDBA74"],   // deep, mid, fade
  highlight: ["#FE9239", "#FED7AA", "#FFFFFF"], // accent, mid, white
}} />
```

Each array is `[deep, mid, fade]` — from the most saturated stop at the top of the wave to the lightest/most transparent at the bottom. The three stops are positioned at offset 0% / 55% / 100% automatically.

## Full config (geometry + colours)

For project-specific tweaks to wavelength, speed, amplitude, blur, etc.:

```tsx
import WaveHero, { makeTheme } from "@/components/WaveHero";

<WaveHero config={{
  ...makeTheme("blue"),
  blur: "100px",
  primary: { ...makeTheme("blue").primary, speed: 12 },
}} />
```

Or bring in a whole named theme and mutate:

```tsx
import WaveHero, { orangeTheme } from "@/components/WaveHero";

<WaveHero config={{
  ...orangeTheme,
  outerHeightClass: "h-[40vh] md:h-[56vh]",  // taller hero
  innerHeightClass: "h-[28vh] md:h-[38vh]",
}} />
```

---

## File map

| File | What it holds |
|---|---|
| `types.ts` | `WaveStop`, `WaveGradient`, `WaveLayer`, `Palette`, `WaveHeroConfig` |
| `palettes.ts` | The 7 preset palettes (pure colour data) |
| `themes.ts` | `baseGeometry` + `makeTheme(palette)` — stitches palette into a full config |
| `WaveHero.tsx` | The React component + the path-building / layout helpers |
| `index.ts` | Public re-exports |

## Adding a new palette

Open `palettes.ts` and add an entry:

```ts
crimson: {
  primary: ["#7F1D1D", "#DC2626", "#FCA5A5"],
  highlight: ["#F87171", "#FECACA", "#FFFFFF"],
},
```

That's it — `<WaveHero palette="crimson" />` works immediately.

## Adding a new theme (geometry variant)

If you want a whole different geometry (e.g. a slower, more peaceful variant), add to `themes.ts`:

```ts
export const zenTheme: WaveHeroConfig = {
  ...makeTheme("blue"),
  primary: { ...makeTheme("blue").primary, speed: 20, amplitude: 25 },
  clippers: [],   // no clippers — smooth waves only
};
```

Then export from `index.ts`.

---

## Tuning in the playground

Open `http://localhost:3000/wave-explainer.html` — it lets you live-tune every parameter (wavelengths, amplitudes, speeds, stops, clip power, fill direction, etc.). When you find a look you like, grab the config block from the bottom of the page and either:

- Paste the colours into a new palette entry in `palettes.ts` (if the geometry matches the default), or
- Build a one-off theme in `themes.ts` for bigger changes.

## Type reference

```ts
type WaveStop     = { offset: 0-100, color: string, opacity: 0-1 };
type WaveGradient = { y1, y2, stops: WaveStop[] };
                    // y1/y2 are CONTENT-RELATIVE (0 = top of content,
                    // 800 = bottom). The component adds the internal
                    // +560 buffer offset when rendering.

type WaveLayer = {
  wavelength:  number,   // viewBox units
  baseline:    number,   // 0-100 % of content
  amplitude:   number,   // 0-50  % of content
  speed:       number,   // seconds per loop
  flip?:       boolean,  // swap peak/trough phase
  fillBelow?:  boolean,  // true for clippers
  reverse?:    boolean,  // reverse animation direction
  clipPower?:  0-1,      // master opacity multiplier (clippers)
  gradient:    WaveGradient,
};

type Palette = {
  primary:   [deep, mid, fade],     // 3 colors
  highlight: [accent, mid, white],
};

type WaveHeroConfig = {
  outerHeightClass: string,
  innerHeightClass: string,
  blur:             string,
  background:       string,
  primary:          WaveLayer,
  clippers:         WaveLayer[],
  highlight?:       WaveLayer,
};
```

---

## Gotchas

- **Wavelengths that don't divide cleanly** are handled automatically — the component expands the viewBox to `cycles × wavelength` where `cycles = 3 × round(4800 / (3 × wavelength))`, keeping the animation seamless at the standard `-33.333%` translation.
- **Clippers must be white** for the erase effect to work against a white background. If your background is a different colour, clippers should match that colour (use full `config` override).
- **Blur edge fade** is prevented by extending the SVG 70% of the wave-area height above AND below via the `.wave-svg` CSS. Don't remove `top: -70%` / `height: 240%`.
- **The bottom-padding trick**: the outer container (`outerHeightClass`) is taller than the inner (`innerHeightClass`) so the blur has a no-content zone to fade into cleanly. Don't shrink the outer below `innerHeight × ~1.5`.
