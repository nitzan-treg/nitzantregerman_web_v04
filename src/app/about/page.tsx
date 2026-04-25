"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import FadeIn from "@/components/animation/FadeIn";
import TextReveal from "@/components/animation/TextReveal";
import { nitzanProfile } from "@/data/nitzan-projects";
import NitzanFooter from "../NitzanFooter";

const img = (name: string) =>
  `/assets/images/${name}`;
const vid = (name: string) =>
  `/assets/videos/${name}`;

/* ── Carousel slides ──────────────────────────────────── */

const slides: { type: "image" | "video"; src: string }[] = [
  { type: "image", src: img("nitzan-portrait-01.webp") },
  { type: "video", src: vid("about-video.mp4") },
  { type: "image", src: img("nitzan-portrait-02.webp") },
  ...nitzanProfile.portraits.map((src) => ({ type: "image" as const, src })),
  { type: "video", src: nitzanProfile.aboutVideo },
];

/* ── Auto-sliding carousel ────────────────────────────── */

function PhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-[80%] overflow-hidden bg-neutral-100">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          {slide.type === "image" ? (
            <Image
              src={slide.src}
              alt={`Nitzan Tregerman — ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={i === 0}
            />
          ) : (
            <video
              src={slide.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
      ))}

    </div>
  );
}

/* ── Page ──────────────────────────────────────────────── */

export default function NitzanAboutPage() {
  return (
    <>
      {/* ── Intro grid (text left, carousel right) ─────── */}
      <section className="pt-40 pb-24 px-[20%]">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-32">
          {/* ── Left: text + social ─────────────────────── */}
          <div className="flex flex-col justify-center">
            <TextReveal
              as="h1"
              className="text-brand-text mb-10 text-3xl font-light tracking-tight md:text-4xl"
              delay={0.1}
            >
              Thanks for stopping by!
            </TextReveal>

            <div className="space-y-6">
              <FadeIn direction="up" delay={0.15}>
                <p
                  className="text-black font-light leading-[1.8]"
                  style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                >
                  {nitzanProfile.bio}
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <p
                  className="text-black font-light leading-[1.8]"
                  style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                >
                  {nitzanProfile.expertise}
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.25}>
                <p
                  className="text-black font-light leading-[1.8]"
                  style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                >
                  {nitzanProfile.philosophy}
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.3}>
                <p
                  className="text-black font-light leading-[1.8]"
                  style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                >
                  {nitzanProfile.personal}
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.35}>
                <p
                  className="text-black font-light leading-[1.8]"
                  style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}
                >
                  {nitzanProfile.contactCta}
                </p>
              </FadeIn>
            </div>
          </div>

          {/* ── Right: photo carousel ──────────────────── */}
          <FadeIn direction="up" delay={0.2}>
            <PhotoCarousel />
          </FadeIn>
        </div>
      </section>

      <NitzanFooter />
    </>
  );
}
