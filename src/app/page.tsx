"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/animations";
import {
  nitzanProfile,
  nitzanProjects,
  type NitzanProject,
} from "@/data/nitzan-projects";
import NitzanFooter from "./NitzanFooter";

/* ------------------------------------------------------------------ */
/*  Project Card — matches Qavim ProjectCard exactly                   */
/* ------------------------------------------------------------------ */

function NitzanProjectCard({ project }: { project: NitzanProject }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      scroll={false}
      className="group block"
    >
      <figure className="relative aspect-[16/9] overflow-hidden">
        {project.thumbnailVideo ? (
          <video
            src={project.thumbnailVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover scale-[1.15] transition-transform duration-500 ease-out group-hover:scale-[1.18]"
          />
        ) : (
          <Image
            src={project.thumbnail}
            alt={`${project.title} — ${project.subtitle}`}
            fill
            sizes="(max-width: 768px) 80vw, 40vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        )}
      </figure>

      <hgroup className="mt-4">
        <h2 className="text-brand-text text-lg font-medium tracking-tight md:text-xl">
          {project.title}
        </h2>
        <h3 className="text-brand-muted text-lg font-light tracking-tight">
          {project.subtitle}
        </h3>
      </hgroup>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Project Grid — matches Qavim offset two-column layout              */
/* ------------------------------------------------------------------ */

function NitzanProjectGrid({ projects }: { projects: NitzanProject[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const items = grid.querySelectorAll<HTMLElement>("[data-grid-item]");
    if (items.length === 0) return;

    gsap.set(items, { opacity: 0, y: 24 });

    items.forEach((item, i) => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: (i % 6) * 0.05,
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          once: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        const trigger = t.trigger;
        if (trigger && grid.contains(trigger)) t.kill();
      });
    };
  }, [projects]);

  const leftCol = projects.filter((_, i) => i % 2 === 0);
  const rightCol = projects.filter((_, i) => i % 2 === 1);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-x-4 md:grid-cols-2 md:gap-x-5 lg:gap-x-6"
    >
      {/* Left column */}
      <div className="flex flex-col gap-10 md:gap-14">
        {leftCol.map((project) => (
          <div key={project.slug} data-grid-item>
            <NitzanProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Right column — offset down */}
      <div className="mt-10 flex flex-col gap-10 md:mt-[12vw] md:gap-14">
        {rightCol.map((project) => (
          <div key={project.slug} data-grid-item>
            <NitzanProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function NitzanHomePage() {
  return (
    <>
      {/* ── HERO VIDEO (showreel teaser) ──────────────────── */}
      <section className="relative h-[57.5vh] overflow-hidden bg-black">
        <video
          src={nitzanProfile.showreelTease}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      </section>

      {/* ── TAGLINE VIDEO (animated text render) ──────────── */}
      <section className="flex min-h-[calc(100vh-57.5vh)] items-center bg-white px-6 md:px-10 lg:px-16">
        <div className="max-w-[1243px]">
          <video
            src={nitzanProfile.heroVideo}
            autoPlay
            muted
            playsInline
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────── */}
      <section
        id="work"
        className="pt-6 pb-6 md:pt-8 md:pb-8 lg:pt-10 lg:pb-10"
      >
        <div className="w-full px-12 md:px-20 lg:px-32">
          <NitzanProjectGrid projects={nitzanProjects} />
        </div>
      </section>

      <NitzanFooter contentClassName="w-full px-12 md:px-20 lg:px-32" />
    </>
  );
}
