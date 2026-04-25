"use client";

import { useRef, useEffect, createElement, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";

type TextRevealProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  delay?: number;
  className?: string;
};

export default function TextReveal({
  children,
  as = "p",
  delay = 0,
  className = "",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Skip animation if reduced motion preferred
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Ensure ScrollTrigger is registered
    if (!ScrollTrigger) return;

    const words = el.querySelectorAll<HTMLSpanElement>("[data-word]");

    gsap.set(words, { y: "100%", opacity: 0 });

    gsap.to(words, {
      y: "0%",
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.05,
      delay,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [delay]);

  const words = children.split(/\s+/).filter(Boolean);

  const inner: ReactNode = words.map((word, i) => (
    <span key={i} className="inline-block overflow-hidden">
      <span data-word className="inline-block">
        {word}
      </span>
      {i < words.length - 1 && <>&nbsp;</>}
    </span>
  ));

  return createElement(
    as,
    { ref: containerRef, className },
    inner
  );
}
