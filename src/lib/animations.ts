import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register immediately on import so every consumer has the plugin ready
gsap.registerPlugin(ScrollTrigger);

let configured = false;

export function registerGSAP() {
  if (configured) return;

  // Respect reduced motion globally
  if (typeof window !== "undefined") {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.defaults({ duration: 0 });
      ScrollTrigger.defaults({ animation: undefined });
    }
  }

  configured = true;
}

export { gsap, ScrollTrigger };
