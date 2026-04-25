"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/animation/FadeIn";
import type { NitzanProject } from "@/data/nitzan-projects";
import NitzanFooter from "@/app/NitzanFooter";
import WaveHero, { makeTheme } from "@/components/WaveHero";

/* ── Category display labels ──────────────────────────── */

const categoryLabels: Record<string, string> = {
  showreel: "Showreel",
  "vfx-commercial": "VFX Commercial",
  "open-source": "Open Source",
  community: "Community",
  projection: "Projection Mapping",
};

/* ── Accent colors per category ───────────────────────── */

const categoryAccent: Record<string, string> = {
  showreel: "#111111",
  "vfx-commercial": "#0D0D14",
  "open-source": "#0A0F0A",
  community: "#0F0D14",
  projection: "#0D1014",
};

/* ── Peres Academy WaveHero config ────────────────────── */
/* The WaveHero's default highlight layer paints at 0.75 opacity across
   the entire top of the wave. With a saturated blue there, blue washes
   out the whole hero even when the primary wave is orange (verified
   empirically: palette-only attempts all read as "too blue"). So we
   build the peres-academy hero from makeTheme and then dim the
   highlight's opacity stops (0.75→0.25, 0.35→0.12) so the blue reads
   as a cool accent at the top, letting the warm orange/brown primary
   carry the composition. Component internals are untouched — this is
   just per-instance parameterisation through the documented config API. */
const peresAcademyWaveConfig = (() => {
  const base = makeTheme({
    primary: ["#C2410C", "#F97316", "#FDBA74"],   // burnt orange → bright orange → peach
    highlight: ["#60A5FA", "#BFDBFE", "#FFFFFF"], // sky blue hint
  });
  return {
    ...base,
    highlight: {
      ...base.highlight!,
      gradient: {
        ...base.highlight!.gradient,
        stops: [
          { offset: 0, color: "#60A5FA", opacity: 0.25 },
          { offset: 60, color: "#BFDBFE", opacity: 0.12 },
          { offset: 100, color: "#FFFFFF", opacity: 0 },
        ],
      },
    },
  };
})();

/* ── Paz Charge WaveHero config ───────────────────────── */
/* Goal: a soft/faded yellow atmosphere with visible bright-yellow
   "highlight" peaks punching through (the Paz fluffy-creature look:
   golden fur mostly in soft light, with bright catchlights on top).
   Achieved by DROPPING the primary layer's opacities (so the base
   reads as a faded yellow wash) while keeping the highlight's
   opacities relatively strong — that way the highlight layer
   contrasts against the faded base and reads as bright peaks
   riding on a soft background, rather than a uniform saturated
   block. */
const pazChargeWaveConfig = (() => {
  const base = makeTheme({
    primary: ["#854D0E", "#FDE047", "#FEFCE8"],   // mustard → bright yellow → near-white
    highlight: ["#FFEB3B", "#FEF08A", "#FFFFFF"], // pure bright → pale yellow → white
  });
  return {
    ...base,
    primary: {
      ...base.primary,
      gradient: {
        ...base.primary.gradient,
        stops: [
          { offset: 0, color: "#854D0E", opacity: 0.42 },  // was 0.5 — 15% reduction
          { offset: 55, color: "#FDE047", opacity: 0.3 },  // was 0.35
          { offset: 100, color: "#FEFCE8", opacity: 0 },
        ],
      },
    },
    highlight: {
      ...base.highlight!,
      gradient: {
        ...base.highlight!.gradient,
        stops: [
          { offset: 0, color: "#FFEB3B", opacity: 0.42 },  // was 0.5 — 15% reduction
          { offset: 60, color: "#FDE047", opacity: 0.3 },  // was 0.35
          { offset: 100, color: "#FFFFFF", opacity: 0 },
        ],
      },
    },
  };
})();

/* ── ntLib WaveHero config ────────────────────────────── */
/* Primary transitions deep indigo → emerald → pale mint; highlight
   is bright sky-blue. All opacities reduced by 15% from the defaults
   (primary 0.9→0.76, 0.75→0.64; highlight 0.75→0.64, 0.35→0.3) so
   the whole hero reads slightly softer on the page. */
const ntlibWaveConfig = (() => {
  const base = makeTheme({
    primary: ["#1E40AF", "#059669", "#A7F3D0"],   // deep indigo → emerald → pale mint
    highlight: ["#38BDF8", "#BAE6FD", "#FFFFFF"], // bright sky-blue kiss
  });
  return {
    ...base,
    primary: {
      ...base.primary,
      gradient: {
        ...base.primary.gradient,
        stops: [
          { offset: 0, color: "#1E40AF", opacity: 0.49 },  // another 20% reduction
          { offset: 55, color: "#059669", opacity: 0.41 },
          { offset: 100, color: "#A7F3D0", opacity: 0 },
        ],
      },
    },
    highlight: {
      ...base.highlight!,
      gradient: {
        ...base.highlight!.gradient,
        stops: [
          { offset: 0, color: "#38BDF8", opacity: 0.41 },
          { offset: 60, color: "#BAE6FD", opacity: 0.19 },
          { offset: 100, color: "#FFFFFF", opacity: 0 },
        ],
      },
    },
  };
})();

/* ── Meshek Tzuriel WaveHero config ───────────────────── */
/* The initial Tailwind-green palette (#16A34A / #4ADE80) read way too
   vivid — real grass isn't a clean saturated green, it's an olive-
   sage with brown/yellow undertones and low saturation. So we use
   custom muted olive colours AND reduce opacity for a calm, natural
   grass wash rather than a neon pop. */
const meshekTzurielWaveConfig = (() => {
  const base = makeTheme({
    primary: ["#86A947", "#B8CC87", "#E4EBC6"],   // fresh spring-grass → pale sage → near-cream
    highlight: ["#EAB308", "#FEF3C7", "#FFFFFF"], // small yellow kiss on wave 2 for visible motion contrast
  });
  return {
    ...base,
    primary: {
      ...base.primary,
      gradient: {
        ...base.primary.gradient,
        stops: [
          { offset: 0, color: "#86A947", opacity: 0.55 },
          { offset: 55, color: "#B8CC87", opacity: 0.4 },
          { offset: 100, color: "#E4EBC6", opacity: 0 },
        ],
      },
    },
    highlight: {
      ...base.highlight!,
      gradient: {
        ...base.highlight!.gradient,
        stops: [
          { offset: 0, color: "#EAB308", opacity: 0.22 },  // small yellow kiss — shows wave 2 motion
          { offset: 60, color: "#FEF3C7", opacity: 0.1 },
          { offset: 100, color: "#FFFFFF", opacity: 0 },
        ],
      },
    },
  };
})();

/* ── Whakatane WaveHero config ────────────────────────── */
/* Sampled from the Whakatane reference still: vivid tropical cyan
   swirls with a glowing warm-orange centre. First attempt with sky-500
   (#0EA5E9) + orange-600 (#EA580C) read too dark & under-saturated,
   so we pushed to the cyan family (#06B6D4 / #22D3EE / #A5F3FC) which
   is visibly brighter and punchier, and a more vivid pure orange
   (#F97316) at a slightly stronger opacity so the warm focal stands
   out as a saturated pop rather than a muted tint. */
const whakataneWaveConfig = (() => {
  const base = makeTheme({
    primary: ["#0EA5E9", "#38BDF8", "#BAE6FD"],   // sky-500 → sky-400 → sky-200 (saturated blue sky)
    highlight: ["#FB923C", "#FED7AA", "#FFFFFF"], // orange-400 → orange-200 → white (softer)
  });
  return {
    ...base,
    primary: {
      ...base.primary,
      gradient: {
        ...base.primary.gradient,
        stops: [
          { offset: 0, color: "#0EA5E9", opacity: 0.65 },  // saturated blue hue, lighter opacity
          { offset: 55, color: "#38BDF8", opacity: 0.5 },
          { offset: 100, color: "#BAE6FD", opacity: 0 },
        ],
      },
    },
    highlight: {
      ...base.highlight!,
      gradient: {
        ...base.highlight!.gradient,
        stops: [
          { offset: 0, color: "#F97316", opacity: 0.5 },   // more saturated vivid orange
          { offset: 60, color: "#FDBA74", opacity: 0.28 },
          { offset: 100, color: "#FFFFFF", opacity: 0 },
        ],
      },
    },
  };
})();

/* ── Partner Fiber WaveHero config ────────────────────── */
/* Turquoise primary with a dimmed yellow accent. The first attempt at
   teal-800 (#115E59) read too dark and saturated, so the primary uses
   lighter teal family colours AND reduced opacity to get a bright,
   airy turquoise wash rather than a heavy block. Yellow highlight is
   dimmed for the same reason as peres-academy (warm-over-cool washes
   the hero at default 0.75 opacity). */
const partnerFiberWaveConfig = (() => {
  const base = makeTheme({
    primary: ["#2DD4BF", "#5EEAD4", "#CCFBF1"],   // teal-400 → teal-300 → teal-100 (lighter)
    highlight: ["#FDE047", "#FEF3C7", "#FFFFFF"], // yellow-300 → pale → white
  });
  return {
    ...base,
    primary: {
      ...base.primary,
      gradient: {
        ...base.primary.gradient,
        stops: [
          { offset: 0, color: "#2DD4BF", opacity: 0.55 },  // reduced from 0.9
          { offset: 55, color: "#5EEAD4", opacity: 0.4 },  // reduced from 0.75
          { offset: 100, color: "#CCFBF1", opacity: 0 },
        ],
      },
    },
    highlight: {
      ...base.highlight!,
      gradient: {
        ...base.highlight!.gradient,
        stops: [
          { offset: 0, color: "#FDE047", opacity: 0.3 },   // dimmed yellow accent
          { offset: 60, color: "#FEF3C7", opacity: 0.15 },
          { offset: 100, color: "#FFFFFF", opacity: 0 },
        ],
      },
    },
  };
})();

/* ── Cellcom Fiber WaveHero config ────────────────────── */
/* Same pure-purple palette, but both the primary and highlight layers
   are dimmed from their default opacities so the whole hero reads as
   a softer, more faded purple wash rather than a saturated block of
   colour. Primary 0.9/0.75 → 0.55/0.4; highlight 0.75/0.35 → 0.35/0.15.
   The wave geometry is identical to every other project. */
const cellcomFiberWaveConfig = (() => {
  const base = makeTheme({
    primary: ["#4C1D95", "#9333EA", "#DDD6FE"],   // violet-900 → purple-600 → lavender
    highlight: ["#A78BFA", "#DDD6FE", "#FFFFFF"], // violet-400 → lavender → white
  });
  return {
    ...base,
    primary: {
      ...base.primary,
      gradient: {
        ...base.primary.gradient,
        stops: [
          { offset: 0, color: "#4C1D95", opacity: 0.55 },
          { offset: 55, color: "#9333EA", opacity: 0.4 },
          { offset: 100, color: "#DDD6FE", opacity: 0 },
        ],
      },
    },
    highlight: {
      ...base.highlight!,
      gradient: {
        ...base.highlight!.gradient,
        stops: [
          { offset: 0, color: "#A78BFA", opacity: 0.35 },
          { offset: 60, color: "#DDD6FE", opacity: 0.15 },
          { offset: 100, color: "#FFFFFF", opacity: 0 },
        ],
      },
    },
  };
})();

/* ── Vimeo embed ──────────────────────────────────────── */

function VimeoEmbed({ id, title }: { id: string; title: string }) {
  return (
    <FadeIn direction="up">
      <div
        className="relative w-full overflow-hidden rounded-sm bg-black"
        style={{ aspectRatio: "16/9" }}
      >
        <iframe
          src={`https://player.vimeo.com/video/${id}?dnt=1&quality=auto`}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          title={title}
        />
      </div>
    </FadeIn>
  );
}

/* ── YouTube embed ────────────────────────────────────── */

function YouTubeEmbed({
  id,
  title,
  start,
}: {
  id: string;
  title: string;
  start?: number;
}) {
  const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
  if (start && start > 0) params.set("start", String(start));
  return (
    <FadeIn direction="up">
      <div
        className="relative w-full overflow-hidden rounded-sm bg-black"
        style={{ aspectRatio: "16/9" }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${id}?${params.toString()}`}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          title={title}
        />
      </div>
    </FadeIn>
  );
}

/* ── Inline looping video ─────────────────────────────── */

function InlineVideo({
  src,
  aspect = "16/9",
}: {
  src: string;
  aspect?: string;
}) {
  return (
    <FadeIn direction="up">
      <div
        className="relative w-full overflow-hidden rounded-sm bg-black"
        style={{ aspectRatio: aspect }}
      >
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </FadeIn>
  );
}

/* ── Image primitive ──────────────────────────────────── */

function Img({
  src,
  alt,
  aspect = "16/9",
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  aspect?: string;
  sizes?: string;
}) {
  return (
    <FadeIn direction="up">
      <div
        className="relative w-full overflow-hidden rounded-sm"
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          loading="lazy"
        />
      </div>
    </FadeIn>
  );
}

/* ── Smart media grid: arranges items in 2-up and 3-up rows ── */

function MediaGrid({
  videos,
  images,
  title,
}: {
  videos: string[];
  images: string[];
  title: string;
}) {
  // Combine all media into a flat list, videos first then remaining images
  const allMedia: { type: "video" | "image"; src: string }[] = [];

  videos.forEach((src) => allMedia.push({ type: "video", src }));
  // Only add images that aren't redundant with the thumbnail (skip first)
  images.slice(1).forEach((src) => allMedia.push({ type: "image", src }));

  if (allMedia.length === 0) return null;

  // Build rows: alternate between 2-up and single, creating visual rhythm
  const rows: React.ReactNode[] = [];
  let idx = 0;

  while (idx < allMedia.length) {
    const remaining = allMedia.length - idx;

    if (remaining >= 2) {
      // 2-up row
      const a = allMedia[idx];
      const b = allMedia[idx + 1];
      rows.push(
        <div
          key={`row-${idx}`}
          className="grid grid-cols-1 gap-3 md:grid-cols-2"
        >
          {a.type === "video" ? (
            <InlineVideo src={a.src} aspect="16/9" />
          ) : (
            <Img
              src={a.src}
              alt={`${title} — ${idx + 1}`}
              aspect="16/9"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          )}
          {b.type === "video" ? (
            <InlineVideo src={b.src} aspect="16/9" />
          ) : (
            <Img
              src={b.src}
              alt={`${title} — ${idx + 2}`}
              aspect="16/9"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          )}
        </div>
      );
      idx += 2;
    } else {
      // Single item — centered at ~60% width
      const item = allMedia[idx];
      rows.push(
        <div key={`row-${idx}`} className="mx-auto max-w-[65%]">
          {item.type === "video" ? (
            <InlineVideo src={item.src} aspect="16/9" />
          ) : (
            <Img
              src={item.src}
              alt={`${title} — ${idx + 1}`}
              aspect="16/9"
              sizes="65vw"
            />
          )}
        </div>
      );
      idx += 1;
    }
  }

  return <div className="space-y-3">{rows}</div>;
}

/* ── Image-only grid (no videos) ──────────────────────── */

function ImageGrid({ images, title }: { images: string[]; title: string }) {
  if (images.length <= 1) return null;
  const imgs = images.slice(0); // all images

  if (imgs.length === 2) {
    return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {imgs.map((src, i) => (
          <Img
            key={src}
            src={src}
            alt={`${title} — ${i + 1}`}
            aspect="4/3"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        ))}
      </div>
    );
  }

  if (imgs.length === 3) {
    return (
      <div className="space-y-3">
        <div className="mx-auto max-w-[65%]">
          <Img src={imgs[0]} alt={`${title} — 1`} aspect="16/9" sizes="65vw" />
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {imgs.slice(1).map((src, i) => (
            <Img
              key={src}
              src={src}
              alt={`${title} — ${i + 2}`}
              aspect="4/3"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          ))}
        </div>
      </div>
    );
  }

  // 4+ images: first row 2-up, then pairs
  const rows: React.ReactNode[] = [];
  for (let i = 0; i < imgs.length; i += 2) {
    const pair = imgs.slice(i, i + 2);
    rows.push(
      <div
        key={i}
        className={`grid gap-3 ${pair.length === 2 ? "grid-cols-1 md:grid-cols-2" : ""}`}
      >
        {pair.map((src, j) => (
          <Img
            key={src}
            src={src}
            alt={`${title} — ${i + j + 1}`}
            aspect={pair.length === 1 ? "16/9" : "4/3"}
            sizes={pair.length === 2 ? "(min-width: 768px) 50vw, 100vw" : "65vw"}
          />
        ))}
      </div>
    );
  }
  return <div className="space-y-3">{rows}</div>;
}

/* ── Props ─────────────────────────────────────────────── */

type Props = {
  project: NitzanProject;
  prevProject: NitzanProject;
  nextProject: NitzanProject;
};

/* ── Main component ───────────────────────────────────── */

export default function ProjectDetailClient({
  project,
  prevProject,
  nextProject,
}: Props) {
  const hasMultipleVimeo =
    project.vimeoIds && project.vimeoIds.length > 1;
  const hasSingleVimeo = !hasMultipleVimeo && project.vimeoId;
  const accent = categoryAccent[project.category] ?? "#0D0D14";
  const hasVideos = project.videos && project.videos.length > 0;

  // Projects that use the animated <WaveHero> gradient as their hero
  // instead of an image/video. They share a layout treatment: category
  // label + subtitle hidden, title centered, pulled up with a big
  // negative margin so the title sits near the nav rather than floating
  // below the blurred wave.
  const isWaveHero =
    project.slug === "showreel-2025" ||
    project.slug === "pelephone-5g" ||
    project.slug === "peres-academy" ||
    project.slug === "cellcom-fiber" ||
    project.slug === "paz-charge" ||
    project.slug === "partner-fiber" ||
    project.slug === "whakatane" ||
    project.slug === "meshek-tzuriel" ||
    project.slug === "ntlib";

  return (
    <>
      {/* ── HERO IMAGE (compact, full-cover) ──────────── */}
      {project.slug !== "showreel-2025" && project.slug !== "peres-academy" && project.slug !== "cellcom-fiber" && project.slug !== "pelephone-5g" && project.slug !== "paz-charge" && project.slug !== "partner-fiber" && project.slug !== "whakatane" && project.slug !== "meshek-tzuriel" && project.slug !== "ntlib" && project.slug !== "tlv-hug" && (
        <section className="relative w-full overflow-hidden h-[50vh] md:h-[60vh]">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
        </section>
      )}

      {/* ── PELEPHONE 5G: sky-blue with a purple hint WaveHero ── */}
      {/* Palette sampled from the project's "Bouncy" game-world artwork —
          deep sky shadow → vivid cyan-sky → pale cyan fade for the main
          wave. Highlight layer carries the small purple accent on top so
          the overall composition reads mostly blue with just a tint. */}
      {project.slug === "pelephone-5g" && (
        <WaveHero palette={{
          primary: ["#0C4A6E", "#0EA5E9", "#BAE6FD"],
          highlight: ["#A78BFA", "#DDD6FE", "#FFFFFF"],
        }} />
      )}

      {/* ── PERES ACADEMY: orange-dominant "Doctor Strange portal" WaveHero ── */}
      {/* Config is built above (peresAcademyWaveConfig) because we need
          to dim the highlight opacity — the standard palette API runs
          the highlight at 0.75 opacity which causes saturated blue to
          dominate. Dimmed to ~0.25 it reads as a cool accent only. */}
      {project.slug === "peres-academy" && (
        <WaveHero config={peresAcademyWaveConfig} />
      )}

      {/* ── CELLCOM FIBER: pure purple WaveHero ───────── */}
      {/* Config is built above (cellcomFiberWaveConfig) because we dim
          both the primary and highlight opacities for a softer, more
          faded purple wash — the default saturations read too heavy
          for this project's atmosphere. */}
      {project.slug === "cellcom-fiber" && (
        <WaveHero config={cellcomFiberWaveConfig} />
      )}

      {/* ── PAZ CHARGE: sunny yellow WaveHero ─────────── */}
      {/* Config is built above (pazChargeWaveConfig) because we boost
          the primary's mid-stop and the highlight to pure vivid yellow
          for multiple layers of bright-yellow moments — a plain
          palette-only version felt too unified. */}
      {project.slug === "paz-charge" && (
        <WaveHero config={pazChargeWaveConfig} />
      )}

      {/* ── PARTNER FIBER: turquoise + yellow WaveHero ── */}
      {/* Config is built above (partnerFiberWaveConfig) because we dim
          the warm yellow highlight so the cool turquoise primary stays
          dominant — matching the Partner fiber brand film's turquoise-
          field-with-yellow-accent-lines composition. */}
      {project.slug === "partner-fiber" && (
        <WaveHero config={partnerFiberWaveConfig} />
      )}

      {/* ── WHAKATANE: sky blue + orange wood WaveHero ── */}
      {/* Config is built above (whakataneWaveConfig). Bright sky-blue
          primary with a moderately dimmed orange highlight — the warm
          centre of the Whakatane reference artwork against its cool
          surround. */}
      {project.slug === "whakatane" && (
        <WaveHero config={whakataneWaveConfig} />
      )}

      {/* ── MESHEK TZURIEL: natural grass green WaveHero ── */}
      {/* Config is built above (meshekTzurielWaveConfig) because we use
          desaturated olive-sage tones at reduced opacity — real grass,
          not neon Tailwind green. */}
      {project.slug === "meshek-tzuriel" && (
        <WaveHero config={meshekTzurielWaveConfig} />
      )}

      {/* ── ntLib: deep blue → green + bright sky highlight ── */}
      {/* Config is built above (ntlibWaveConfig) — opacities reduced
          15% from defaults for a softer overall presence. */}
      {project.slug === "ntlib" && (
        <WaveHero config={ntlibWaveConfig} />
      )}

      {/* ── SHOWREEL: blurred orange wave hero ──────── */}
      {/* See /src/components/WaveHero/README.md for the full API. To
          change palette per project: just pass a different preset name
          ("blue" | "purple" | "green" | "gold" | "pink" | "teal") or a
          custom { primary: [...], highlight: [...] } object. */}
      {project.slug === "showreel-2025" && <WaveHero palette="orange" />}

      {/* ── TITLE + META ──────────────────────────────── */}
      {/* For WaveHero projects we NEVER change the WaveHero itself — its
          dimensions and fade geometry are tuned and locked. Instead we
          pull the entire rest of the page UP with a negative margin on
          the title section (everything below flows up with it) so the
          title sits near the nav at a normal hero position, and the
          bottom padding matches the video's bottom padding so the gap
          title→video equals video→next-text. tlv-hug renders its own
          centered title (icon + text) inside its custom section below. */}
      {project.slug !== "tlv-hug" && (
        <div
          className={`${
            isWaveHero
              ? "pt-0 pb-10 md:pb-14 -mt-[25vh] md:-mt-[34vh]"
              : "py-12 md:py-16"
          } px-[20%] relative z-10`}
        >
          <div className={` ${isWaveHero ? "text-center" : ""}`}>
            {!isWaveHero && (
              <FadeIn direction="up">
                <p className="text-brand-muted text-sm font-medium tracking-[0.2em] uppercase mb-4">
                  {categoryLabels[project.category] ?? project.category}
                </p>
              </FadeIn>
            )}
            <FadeIn direction="up" delay={0.08}>
              <h1
                className="text-brand-text font-light tracking-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                {project.title}
              </h1>
            </FadeIn>
            {!isWaveHero && (
              <FadeIn direction="up" delay={0.16}>
                <p className="text-brand-muted mt-2 text-xl md:text-2xl font-light">
                  {project.subtitle}
                </p>
              </FadeIn>
            )}
          </div>
        </div>
      )}

      {/* ── PLAYABLE VIDEO (with controls, ~60% width) ── */}
      {(project.heroVideo || hasSingleVimeo || hasMultipleVimeo || project.youtubeId) && (
        <div className="px-[20%] pb-10 md:pb-14">
          <div className="">
            <FadeIn direction="up">
              {project.youtubeId ? (
                <YouTubeEmbed
                  id={project.youtubeId}
                  title={project.title}
                  start={project.youtubeStart}
                />
              ) : project.heroVideo && project.slug !== "showreel-2025" ? (
                <div
                  className="relative w-full overflow-hidden rounded-sm bg-black"
                  style={{ aspectRatio: "16/9" }}
                >
                  <video
                    src={project.heroVideo}
                    controls
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-contain bg-black"
                  />
                </div>
              ) : hasSingleVimeo ? (
                <VimeoEmbed id={project.vimeoId!} title={project.title} />
              ) : (
                <VimeoEmbed
                  id={project.vimeoIds![0]}
                  title={project.title}
                />
              )}
            </FadeIn>
          </div>
        </div>
      )}

      {/* ── BRIEF (offset text) ───────────────────────── */}
      {project.slug !== "showreel-2025" && project.slug !== "peres-academy" && project.slug !== "pelephone-5g" && project.slug !== "cellcom-fiber" && project.slug !== "tlv-hug" && project.slug !== "partner-fiber" && project.slug !== "whakatane" && project.slug !== "meshek-tzuriel" && project.slug !== "paz-charge" && project.slug !== "ntlib" && (
        <div className="pb-12 md:pb-16 px-[20%]">
          <div className="">
            <div className="md:ml-[25%] md:max-w-[600px] space-y-5">
              {project.description.map((paragraph, i) => (
                <FadeIn key={i} direction="up" delay={i * 0.06}>
                  <p
                    className="text-brand-text font-light leading-[1.7]"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                  >
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── PERES ACADEMY: custom layout ──────────────── */}
      {project.slug === "peres-academy" && (
        <>
          {/* ── "The Portal" — first 3 paragraphs ──────── */}
          <section className="pb-14 md:pb-20 px-[20%]">
            <div className=" space-y-5">
              <FadeIn direction="up">
                <h2
                  className="text-brand-text font-medium"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                >
                  The Portal
                </h2>
              </FadeIn>
              {project.description.slice(0, 3).map((paragraph, i) => (
                <FadeIn key={i} direction="up" delay={(i + 1) * 0.06}>
                  <p
                    className="text-brand-text font-light leading-[1.7]"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                  >
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* ── 2-up video grid + "Behind the Scenes" on dark accent ── */}
          <section
            className="py-16 md:py-24 px-[20%]"
            style={{ backgroundColor: "#0D0D14" }}
          >
            <div className="">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {project.videos?.map((src, i) => (
                  <InlineVideo key={src} src={src} aspect="16/9" />
                ))}
              </div>
            </div>

            <div className=" space-y-5 pt-14 md:pt-20">
              <FadeIn direction="up">
                <h2
                  className="text-white/90 font-medium"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                >
                  Behind the Scenes
                </h2>
              </FadeIn>
              {project.description.slice(3).map((paragraph, i) => (
                <FadeIn key={i} direction="up" delay={(i + 1) * 0.06}>
                  <p
                    className="text-white/70 font-light leading-[1.7]"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                  >
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── SHOWREEL: thanks paragraph + R&D heading + R&D Vimeo ── */}
      {project.slug === "showreel-2025" && hasMultipleVimeo && (
        <>
          <div className="pb-12 md:pb-16 px-[20%]">
            <div className="">
              <FadeIn direction="up">
                <p
                  className="text-brand-text font-light leading-[1.7] text-center"
                  style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                >
                  {project.description[0]}
                </p>
              </FadeIn>
            </div>
          </div>

          <div className="pb-8 md:pb-10 px-[20%]">
            <div className="">
              <FadeIn direction="up">
                <h2
                  className="text-brand-text font-light tracking-tight text-center"
                  style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
                >
                  {project.description[1]}
                </h2>
              </FadeIn>
            </div>
          </div>

          <div className="px-[20%] pb-10 md:pb-14">
            <div className="">
              <VimeoEmbed
                id={project.vimeoIds![1]}
                title="Research & Development Reel"
              />
            </div>
          </div>
        </>
      )}

      {/* ── ADDITIONAL VIMEO EMBEDS (non-showreel, non-ntlib projects) ── */}
      {project.slug !== "showreel-2025" && project.slug !== "ntlib" && project.slug !== "partner-fiber" && project.heroVideo && hasMultipleVimeo && (
        <div className="px-[20%] pb-10 md:pb-14">
          <div className=" space-y-6">
            {project.vimeoIds!.map((id, i) => (
              <VimeoEmbed
                key={id}
                id={id}
                title={`${project.title} — video ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
      {project.slug !== "ntlib" && project.slug !== "tlv-hug" && project.heroVideo && hasSingleVimeo && (
        <div className="px-[20%] pb-10 md:pb-14">
          <div className="">
            <VimeoEmbed id={project.vimeoId!} title={project.title} />
          </div>
        </div>
      )}

      {/* ── ntLib: CUSTOM FEATURE SECTIONS WITH MEDIA ── */}
      {project.slug === "ntlib" && (
        <>
          {/* ── Intro: subheader + description + community buttons ── */}
          {/* Container width matches the video sections below (1200px)
              so the two intro paragraphs fit the full video-column
              width. First paragraph (description[0]) renders as a
              larger subheader, second (description[1]) as the body
              detail line below it. */}
          <section className="pb-14 md:pb-20 px-[20%]">
            <div className=" space-y-10 md:space-y-14 text-center">
              {project.description[0] && (
                <FadeIn direction="up">
                  <h2
                    className="text-brand-text font-light leading-[1.3]"
                    style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)" }}
                  >
                    {project.description[0]}
                  </h2>
                </FadeIn>
              )}
              {project.description[1] && (
                <FadeIn direction="up" delay={0.08}>
                  <p
                    className="text-brand-text font-light leading-[1.7]"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                  >
                    {project.description[1]}
                  </p>
                </FadeIn>
              )}
              {project.links && project.links.length > 0 && (
                <FadeIn direction="up" delay={0.18}>
                  <div className="flex flex-wrap justify-center gap-12 md:gap-16 pt-6">
                    {project.links.map((link) => {
                      const isGithub = link.label.toLowerCase().includes("github");
                      return (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col items-center gap-3 text-brand-text"
                        >
                          <span className="text-base font-light">
                            {link.label}
                          </span>
                          {isGithub ? (
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
                            >
                              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.509 11.509 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                          ) : (
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
                            >
                              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                          )}
                        </a>
                      );
                    })}
                  </div>
                </FadeIn>
              )}
            </div>
          </section>

          {/* ── Extrude Subdivision (3 videos, 3-up) ────── */}
          <section className="py-10 md:py-14 px-[20%]">
            <div className="">
              <div className="mb-8 md:mb-10">
                <FadeIn direction="up">
                  <h2
                    className="text-brand-text font-medium"
                    style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                  >
                    Extrude Subdivision
                  </h2>
                </FadeIn>
                <FadeIn direction="up" delay={0.06}>
                  <p
                    className="text-brand-text font-light leading-[1.7] mt-4"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                  >
                    {project.features?.[0]?.description}
                  </p>
                </FadeIn>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <InlineVideo src="/assets/videos/ntlib-extrude-main.mp4" />
                <InlineVideo src="/assets/videos/ntlib-extrude-compressed.mp4" />
                <InlineVideo src="/assets/videos/ntlib-extrude3.mp4" />
              </div>
            </div>
          </section>

          {/* ── 2D Smoke Solver (3 videos, 3-up) ────────── */}
          <section className="py-10 md:py-14 px-[20%]">
            <div className="">
              <div className="mb-8 md:mb-10">
                <FadeIn direction="up">
                  <h2
                    className="text-brand-text font-medium"
                    style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                  >
                    2D Smoke Solver
                  </h2>
                </FadeIn>
                <FadeIn direction="up" delay={0.06}>
                  <p
                    className="text-brand-text font-light leading-[1.7] mt-4"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                  >
                    {project.features?.[1]?.description}
                  </p>
                </FadeIn>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <InlineVideo src="/assets/videos/ntlib-velocity.mp4" />
                <InlineVideo src="/assets/videos/ntlib-smoke-solver.mp4" />
                <InlineVideo src="/assets/videos/ntlib-smoke-solver2.mp4" />
              </div>
            </div>
          </section>

          {/* ── 3D Chlandi Noise (3 videos, 3-up) ──────── */}
          <section className="py-10 md:py-14 px-[20%]">
            <div className="">
              <div className="mb-8 md:mb-10">
                <FadeIn direction="up">
                  <h2
                    className="text-brand-text font-medium"
                    style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                  >
                    3D Chlandi Noise
                  </h2>
                </FadeIn>
                <FadeIn direction="up" delay={0.06}>
                  <p
                    className="text-brand-text font-light leading-[1.7] mt-4"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                  >
                    {project.features?.[2]?.description}
                  </p>
                </FadeIn>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <InlineVideo src="/assets/videos/ntlib-chladni.mp4" />
                <InlineVideo src="/assets/videos/ntlib-chladni2.mp4" />
                <InlineVideo src="/assets/videos/ntlib-chladni3.mp4" />
              </div>
            </div>
          </section>

          {/* ── Infection Solver (3 videos, 3-up) ────────── */}
          <section className="py-10 md:py-14 px-[20%]">
            <div className="">
              <div className="mb-8 md:mb-10">
                <FadeIn direction="up">
                  <h2
                    className="text-brand-text font-medium"
                    style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                  >
                    Infection Solver
                  </h2>
                </FadeIn>
                <FadeIn direction="up" delay={0.06}>
                  <p
                    className="text-brand-text font-light leading-[1.7] mt-4"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                  >
                    {project.features?.[3]?.description}
                  </p>
                </FadeIn>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <InlineVideo src="/assets/videos/ntlib-assemble.mp4" />
                <InlineVideo src="/assets/videos/ntlib-infection.mp4" />
                <InlineVideo src="/assets/videos/ntlib-infection-texture.mp4" />
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── PELEPHONE 5G: custom layout ──────────────── */}
      {project.slug === "pelephone-5g" && (
        <>
          {/* ── "The Environment" — intro text ──────────── */}
          <section className="pb-14 md:pb-20 px-[20%]">
            <div className=" space-y-5">
              <FadeIn direction="up">
                <h2
                  className="text-brand-text font-medium"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                >
                  The Environment
                </h2>
              </FadeIn>
              <FadeIn direction="up" delay={0.06}>
                <p
                  className="text-brand-text font-light leading-[1.7]"
                  style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                >
                  {project.description[0]}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* ── Dark section: BTS video → text → 2 stills ─── */}
          <section
            className="py-16 md:py-24 px-[20%]"
            style={{ backgroundColor: "#0D0D14" }}
          >
            <div className="">
              <InlineVideo
                src="/assets/videos/pelephone-bts.mp4"
                aspect="16/9"
              />
            </div>

            <div className=" space-y-5 pt-14 md:pt-20">
              <FadeIn direction="up">
                <h2
                  className="text-white/90 font-medium"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                >
                  Behind The Scenes
                </h2>
              </FadeIn>
              {project.description.slice(1).map((paragraph, i) => (
                <FadeIn key={i} direction="up" delay={(i + 1) * 0.06}>
                  <p
                    className="text-white/70 font-light leading-[1.7]"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                  >
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>

            <div className=" pt-14 md:pt-20">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Img
                  src={project.images[1]}
                  alt={`${project.title} — scene`}
                  aspect="16/9"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <Img
                  src={project.images[0]}
                  alt={`${project.title} — environment`}
                  aspect="16/9"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── CELLCOM FIBER: custom layout ──────────────── */}
      {project.slug === "cellcom-fiber" && (
        <>
          {/* ── "The Portal" — intro text ──────────────── */}
          <section className="pb-14 md:pb-20 px-[20%]">
            <div className=" space-y-5">
              <FadeIn direction="up">
                <h2
                  className="text-brand-text font-medium"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                >
                  The Portal
                </h2>
              </FadeIn>
              <FadeIn direction="up" delay={0.06}>
                <p
                  className="text-brand-text font-light leading-[1.7]"
                  style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                >
                  {project.description[0]}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* ── Dark section: 2-up breakdown videos + "Behind The Scenes" ── */}
          <section
            className="py-16 md:py-24 px-[20%]"
            style={{ backgroundColor: "#0D0D14" }}
          >
            <div className="">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {project.videos?.map((src) => (
                  <InlineVideo key={src} src={src} aspect="16/9" />
                ))}
              </div>
            </div>

            <div className=" space-y-5 pt-14 md:pt-20">
              <FadeIn direction="up">
                <h2
                  className="text-white/90 font-medium"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                >
                  Behind The Scenes
                </h2>
              </FadeIn>
              {project.description.slice(1).map((paragraph, i) => (
                <FadeIn key={i} direction="up" delay={(i + 1) * 0.06}>
                  <p
                    className="text-white/70 font-light leading-[1.7]"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                  >
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── TLV HUG: custom layout ──────────────────── */}
      {project.slug === "tlv-hug" && (
        <>
          {/* ── Centered title: SideFX Houdini mark + group name ── */}
          <section className="pt-24 md:pt-32 pb-8 md:pb-10 px-[20%]">
            <FadeIn direction="up">
              <div className="flex items-center justify-center gap-3 md:gap-4">
                <Image
                  src="/assets/images/sidefx-banner.png"
                  alt=""
                  width={512}
                  height={512}
                  className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0 object-contain"
                  priority
                />
                <h1
                  className="text-brand-text font-light tracking-tight"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
                >
                  {project.title}
                </h1>
              </div>
            </FadeIn>
          </section>

          {/* ── Intro paragraph (centered, bold) ── */}
          <section className="pb-16 md:pb-24 px-[20%]">
            <FadeIn direction="up">
              <p
                className="text-brand-text text-center font-light leading-[1.5]"
                style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.9rem)" }}
              >
                {project.description[0]}
              </p>
            </FadeIn>
          </section>

          {/* ── Alternating 2-column grid ─────────────────── */}
          {/* Rows alternate text/media, media/text, text/media, media/text.
              Mobile collapses to a single column in DOM order. */}
          <section className="pb-20 md:pb-28 px-[20%]">
            <div className="space-y-16 md:space-y-28">

              {/* Row 1: TEXT (Save the Date + links) | MEDIA (art sim) */}
              <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
                <FadeIn direction="up">
                  <div className="space-y-6">
                    <h2
                      className="text-brand-text font-medium"
                      style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                    >
                      Save the Date: TLV HUG 2026
                    </h2>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-4">
                        <Image
                          src="/assets/images/artboard-1b.png"
                          alt=""
                          width={100}
                          height={100}
                          className="h-11 w-11 flex-shrink-0 object-contain"
                        />
                        <a
                          href={project.links![0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-light text-[#2F6FEB] hover:underline"
                          style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                        >
                          Sign Up for the Next Meetup (January 2026)
                        </a>
                      </li>
                      <li className="flex items-center gap-4">
                        <Image
                          src="/assets/images/discord-round-black.png"
                          alt=""
                          width={100}
                          height={100}
                          className="h-11 w-11 flex-shrink-0 object-contain"
                        />
                        <a
                          href={project.links![1].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-light text-[#2F6FEB] hover:underline"
                          style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                        >
                          Join our Discord Channel
                        </a>
                      </li>
                      <li className="flex items-center gap-4">
                        <Image
                          src="/assets/images/whatsapp-round-black.png"
                          alt=""
                          width={100}
                          height={100}
                          className="h-11 w-11 flex-shrink-0 object-contain"
                        />
                        <a
                          href={project.links![2].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-light text-[#2F6FEB] hover:underline"
                          style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                        >
                          Join our Whatsapp Group
                        </a>
                      </li>
                    </ul>
                  </div>
                </FadeIn>
                <InlineVideo
                  src="/assets/videos/tlvhug-art.mp4"
                  aspect="16/9"
                />
              </div>

              {/* Row 2: MEDIA (people at meetup) | TEXT (Community & Content) */}
              <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
                <InlineVideo
                  src="/assets/videos/tlvhug-people.mp4"
                  aspect="16/9"
                />
                <FadeIn direction="up">
                  <div className="space-y-5">
                    <h2
                      className="text-brand-text font-medium"
                      style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                    >
                      The Community &amp; Content
                    </h2>
                    <p
                      className="text-brand-text font-light leading-[1.7]"
                      style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                    >
                      {project.description[1]}
                    </p>
                  </div>
                </FadeIn>
              </div>

              {/* Row 3: TEXT (Event Design) | MEDIA (mix compilation) */}
              <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
                <FadeIn direction="up">
                  <div className="space-y-5">
                    <h2
                      className="text-brand-text font-medium"
                      style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                    >
                      Event Design
                    </h2>
                    <p
                      className="text-brand-text font-light leading-[1.7]"
                      style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                    >
                      {project.description[2]}
                    </p>
                  </div>
                </FadeIn>
                <InlineVideo
                  src="/assets/videos/tlvhug-mix.mp4"
                  aspect="16/9"
                />
              </div>

              {/* Row 4: MEDIA (group photo) | TEXT (Behind the Scenes) */}
              <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
                <Img
                  src={project.images[0]}
                  alt={`${project.title} — community photo`}
                  aspect="16/9"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <FadeIn direction="up">
                  <div className="space-y-5">
                    <h2
                      className="text-brand-text font-medium"
                      style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                    >
                      Behind the Scenes
                    </h2>
                    <p
                      className="text-brand-text font-light leading-[1.7]"
                      style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                    >
                      {project.description[3]}
                    </p>
                  </div>
                </FadeIn>
              </div>

            </div>
          </section>
        </>
      )}

      {/* ── PARTNER FIBER: custom layout ────────────── */}
      {project.slug === "partner-fiber" && (
        <>
          {/* ── "Fiber Trails" — intro text ──────────────── */}
          <section className="pb-14 md:pb-20 px-[20%]">
            <div className=" space-y-5">
              <FadeIn direction="up">
                <h2
                  className="text-brand-text font-medium"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                >
                  Fiber Trails
                </h2>
              </FadeIn>
              {project.description.map((paragraph, i) => (
                <FadeIn key={i} direction="up" delay={(i + 1) * 0.06}>
                  <p
                    className="text-brand-text font-light leading-[1.7]"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                  >
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* ── Dark section: Sweep HDA → "Behind The Scenes" → 4 BTS clips ── */}
          <section
            className="py-16 md:py-24 px-[20%]"
            style={{ backgroundColor: "#0D0D14" }}
          >
            {project.videos?.[0] && (
              <div className="">
                <div className="mx-auto max-w-[65%]">
                  <InlineVideo src={project.videos[0]} aspect="16/9" />
                </div>
              </div>
            )}

            <div className=" space-y-5 pt-14 md:pt-20">
              <FadeIn direction="up">
                <h2
                  className="text-white/90 font-medium"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                >
                  Behind The Scenes
                </h2>
              </FadeIn>
              {project.behindTheScenes?.map((paragraph, i) => (
                <FadeIn key={i} direction="up" delay={(i + 1) * 0.06}>
                  <p
                    className="text-white/70 font-light leading-[1.7]"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                  >
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>

            <div className=" space-y-3 pt-14 md:pt-20">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {project.videos?.slice(1, 3).map((src) => (
                  <InlineVideo key={src} src={src} aspect="16/9" />
                ))}
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {project.videos?.slice(3, 5).map((src) => (
                  <InlineVideo key={src} src={src} aspect="16/9" />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── WHAKATANE: custom layout ────────────────── */}
      {project.slug === "whakatane" && (
        <>
          {/* ── "Polar Deformation" — intro text ──────────── */}
          <section className="pb-14 md:pb-20 px-[20%]">
            <div className=" space-y-5">
              <FadeIn direction="up">
                <h2
                  className="text-brand-text font-medium"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                >
                  Polar Deformation
                </h2>
              </FadeIn>
              {project.description.slice(0, 3).map((paragraph, i) => (
                <FadeIn key={i} direction="up" delay={(i + 1) * 0.06}>
                  <p
                    className="text-brand-text font-light leading-[1.7]"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                  >
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* ── Dark section: R&D Reel → "The Mathematics" → bts1 + bts2 ── */}
          <section
            className="py-10 md:py-14 px-[20%]"
            style={{ backgroundColor: "#0D1014" }}
          >
            <div className="">
              <YouTubeEmbed id="ObXw3_nl09I" title={`${project.title} — R&D reel`} />
            </div>

            <div className=" space-y-5 pt-14 md:pt-20">
              <FadeIn direction="up">
                <h2
                  className="text-white/90 font-medium"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                >
                  Behind The Scenes
                </h2>
              </FadeIn>
              {project.description.slice(3).map((paragraph, i) => (
                <FadeIn key={i} direction="up" delay={(i + 1) * 0.06}>
                  <p
                    className="text-white/70 font-light leading-[1.7]"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                  >
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>

            <div className=" pt-14 md:pt-20">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {project.videos?.[0] && (
                  <InlineVideo src={project.videos[0]} aspect="16/9" />
                )}
                {project.videos?.[1] && (
                  <InlineVideo src={project.videos[1]} aspect="16/9" />
                )}
              </div>
            </div>
          </section>

          {/* ── Tutorial section (white) ──────────────────── */}
          <section className="py-14 md:py-20 px-[20%]">
            <div className=" space-y-5">
              <FadeIn direction="up">
                <h2
                  className="text-brand-text font-medium"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                >
                  Tutorial
                </h2>
              </FadeIn>
              <FadeIn direction="up" delay={0.06}>
                <p
                  className="text-brand-text font-light leading-[1.7]"
                  style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                >
                  The Polar Coordiantes deformation was so inspiring for me, i decided to concise it to a Houdini tutorial and share it with the community
                </p>
              </FadeIn>
            </div>
            <div className=" pt-8 md:pt-10">
              <YouTubeEmbed id="9MPGec7JNyA" title={`${project.title} — tutorial`} />
            </div>
          </section>
        </>
      )}

      {/* ── MESHEK TZURIEL: custom layout ────────────── */}
      {project.slug === "meshek-tzuriel" && (
        <>
          {/* ── "The Goat" — intro text ──────────────────── */}
          <section className="pb-14 md:pb-20 px-[20%]">
            <div className=" space-y-5">
              <FadeIn direction="up">
                <h2
                  className="text-brand-text font-medium"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                >
                  The Goat
                </h2>
              </FadeIn>
              <FadeIn direction="up" delay={0.06}>
                <p
                  className="text-brand-text font-light leading-[1.7]"
                  style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                >
                  {project.description[0]}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* ── Dark section: 2 videos → BTS text → 2 videos ── */}
          <section
            className="py-16 md:py-24 px-[20%]"
            style={{ backgroundColor: "#0D0D14" }}
          >
            <div className="">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {project.videos?.slice(0, 2).map((src) => (
                  <InlineVideo key={src} src={src} aspect="16/9" />
                ))}
              </div>
            </div>

            <div className=" space-y-5 py-14 md:py-20">
              <FadeIn direction="up">
                <h2
                  className="text-white/90 font-medium"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                >
                  Behind The Scenes
                </h2>
              </FadeIn>
              <FadeIn direction="up" delay={0.06}>
                <p
                  className="text-white/70 font-light leading-[1.7]"
                  style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                >
                  The task involved two key stages:
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.12}>
                <ul
                  className="list-disc pl-6 space-y-3 text-white/70 font-light leading-[1.7] marker:text-white/40"
                  style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                >
                  <li>
                    <span className="text-white/90 font-medium">Grooming:</span>{" "}
                    I developed a procedural grooming setup to craft realistic
                    fur across the goat&apos;s body, with ongoing revisions to
                    meet the client&apos;s feedback.
                  </li>
                  <li>
                    <span className="text-white/90 font-medium">
                      Cloth Tear:
                    </span>{" "}
                    For the shirt-tearing scene, I created a Houdini Vellum
                    simulation to depict the cloth tearing by the goat.
                  </li>
                </ul>
              </FadeIn>
              <FadeIn direction="up" delay={0.18}>
                <p
                  className="text-white/70 font-light leading-[1.7]"
                  style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                >
                  After completing the VFX, I rendered the goat with Redshift.
                </p>
              </FadeIn>
            </div>

            <div className="">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {project.videos?.slice(2, 4).map((src) => (
                  <InlineVideo key={src} src={src} aspect="16/9" />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── PAZ CHARGE: custom layout ──────────────── */}
      {project.slug === "paz-charge" && (
        <>
          {/* ── "The Character" — intro text ──────────────── */}
          <section className="pb-14 md:pb-20 px-[20%]">
            <div className=" space-y-5">
              <FadeIn direction="up">
                <h2
                  className="text-brand-text font-medium"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                >
                  The Character
                </h2>
              </FadeIn>
              <FadeIn direction="up" delay={0.06}>
                <p
                  className="text-brand-text font-light leading-[1.7]"
                  style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                >
                  {project.description[0]}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* ── Dark section: "Behind The Scenes" text → 2×2 square image grid ── */}
          <section
            className="py-16 md:py-24 px-[20%]"
            style={{ backgroundColor: "#0D0D14" }}
          >
            <div className=" space-y-5">
              <FadeIn direction="up">
                <h2
                  className="text-white/90 font-medium"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                >
                  Behind The Scenes
                </h2>
              </FadeIn>
              <FadeIn direction="up" delay={0.06}>
                <p
                  className="text-white/70 font-light leading-[1.7]"
                  style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                >
                  {project.description[1]}
                </p>
              </FadeIn>
            </div>

            <div className=" pt-14 md:pt-20">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {project.images.slice(0, 4).map((src, i) => (
                  <Img
                    key={src}
                    src={src}
                    alt={`${project.title} — ${i + 1}`}
                    aspect="1/1"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── MEDIA GALLERY (smart grid: 2-up rows) ─────── */}
      {project.slug !== "ntlib" && project.slug !== "peres-academy" && project.slug !== "pelephone-5g" && project.slug !== "cellcom-fiber" && project.slug !== "tlv-hug" && project.slug !== "partner-fiber" && project.slug !== "whakatane" && project.slug !== "meshek-tzuriel" && project.slug !== "paz-charge" && (
        <div className="px-[20%] pb-10 md:pb-14">
          <div className="">
            {hasVideos ? (
              <MediaGrid
                videos={project.videos!}
                images={project.images}
                title={project.title}
              />
            ) : project.images.length > 1 ? (
              <ImageGrid images={project.images} title={project.title} />
            ) : null}
          </div>
        </div>
      )}

      {/* ── BEHIND THE SCENES ─────────────────────────── */}
      {project.slug !== "partner-fiber" && project.behindTheScenes && project.behindTheScenes.length > 0 && (
        <div className="py-14 md:py-20 px-[20%]">
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="hidden md:block md:col-span-5 lg:col-span-6" />
              <div className="md:col-span-7 lg:col-span-5">
                <FadeIn direction="up">
                  <h2
                    className="text-brand-text mb-5 font-medium"
                    style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                  >
                    Behind the Scenes
                  </h2>
                </FadeIn>
                {project.behindTheScenes.map((p, i) => (
                  <FadeIn key={i} direction="up" delay={0.1}>
                    <p className="text-brand-muted text-[1.15rem] leading-[1.7]">
                      {p}
                    </p>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FEATURES on accent bg (skip for ntlib — handled above) ── */}
      {project.slug !== "ntlib" && project.features && project.features.length > 0 && (
        <div
          className="py-16 md:py-24 px-[20%]"
          style={{ backgroundColor: accent }}
        >
          <div className="">
            <FadeIn direction="up">
              <h2 className="text-white/90 font-medium tracking-tight mb-10 text-xl md:text-2xl">
                Features
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {project.features.map((feat, i) => (
                <FadeIn key={feat.name} direction="up" delay={i * 0.08}>
                  <div className="space-y-2">
                    <h3 className="text-white/80 font-medium text-base tracking-wide">
                      {feat.name}
                    </h3>
                    <p className="text-white/50 leading-relaxed text-base">
                      {feat.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── LINKS (GitHub / Discord) ──────────────────── */}
      {project.slug !== "ntlib" && project.slug !== "tlv-hug" && project.links && project.links.length > 0 && (
        <div className="py-10 md:py-14 px-[20%]">
          <div className="">
            <FadeIn direction="up">
              <div className="flex flex-wrap gap-4">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-brand-text text-brand-text hover:bg-brand-text hover:text-brand-bg inline-flex items-center gap-2 border px-6 py-3 text-base font-medium tracking-wider uppercase transition-all duration-300"
                  >
                    {link.label}
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      )}

      {/* ── THE TEAM ──────────────────────────────────── */}
      {project.slug !== "showreel-2025" && project.slug !== "ntlib" && project.slug !== "tlv-hug" && (project.credits.length > 0 ||
        project.agency ||
        project.tools.length > 0) && (() => {
          const rows: { role: string; name: string }[] = [];
          if (project.agency) rows.push({ role: "Agency", name: project.agency });
          project.credits.forEach((c) => rows.push({ role: c.role, name: c.name }));
          if (project.tools.length > 0)
            rows.push({ role: "Tools", name: project.tools.join(" · ") });

          return (
            <section className="py-14 md:py-20 px-[20%]">
              <div className="">
                <FadeIn direction="up">
                  <h2
                    className="text-brand-text font-medium mb-8 md:mb-10"
                    style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)" }}
                  >
                    The Team
                  </h2>
                </FadeIn>
                <div>
                  {rows.map((row, i) => (
                    <FadeIn key={`${row.role}-${i}`} direction="up" delay={(i + 1) * 0.06}>
                      <div className="grid grid-cols-[9rem_1fr] md:grid-cols-[14rem_1fr] items-baseline gap-x-6 gap-y-1 border-t border-brand-border py-4 md:py-5">
                        <span
                          className="text-brand-muted uppercase tracking-[0.18em] font-medium"
                          style={{ fontSize: "clamp(0.8rem, 1vw, 0.95rem)" }}
                        >
                          {row.role}
                        </span>
                        <span
                          className="text-brand-text font-light leading-[1.5]"
                          style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                        >
                          {row.name}
                        </span>
                      </div>
                    </FadeIn>
                  ))}
                  <div className="border-t border-brand-border" />
                </div>
              </div>
            </section>
          );
        })()}

      {/* ── NEXT PROJECT ──────────────────────────────── */}
      <section className="pt-8 pb-16 md:pb-24 px-[20%]">
        <div className="">
          <Link
            href={`/work/${nextProject.slug}`}
            scroll={false}
            className="group block"
          >
            <FadeIn direction="up">
              <p className="text-brand-muted mb-2 text-[1.05rem] font-medium tracking-widest uppercase">
                Next Project
              </p>
              <h2
                className="text-brand-text mb-6 font-light tracking-tight group-hover:opacity-70 transition-opacity"
                style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
              >
                {nextProject.title}
              </h2>
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={nextProject.thumbnail}
                  alt={nextProject.title}
                  fill
                  sizes="(min-width: 1200px) 1200px, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </Link>
        </div>
      </section>

      <NitzanFooter />
    </>
  );
}
