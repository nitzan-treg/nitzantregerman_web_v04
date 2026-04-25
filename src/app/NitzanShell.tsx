"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { nitzanProfile, nitzanNav } from "@/data/nitzan-projects";

/* ------------------------------------------------------------------ */
/*  Nav                                                                */
/* ------------------------------------------------------------------ */

function NitzanNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const hasAnimated = useRef(false);
  const isFirstLoad = !hasAnimated.current;

  useEffect(() => {
    hasAnimated.current = true;
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <nav
      aria-label="Portfolio navigation"
      className={`fixed top-0 left-0 right-0 z-50 bg-white md:bg-transparent ${
        menuOpen ? "" : "md:mix-blend-difference"
      }`}
    >
      <div className="flex items-center justify-between px-6 pt-10 pb-5 md:px-10 lg:px-16">
        <motion.div
          initial={isFirstLoad ? { opacity: 0, y: -10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            href="/"
            scroll={false}
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-5"
          >
            <Image
              src={nitzanProfile.logo}
              alt=""
              width={104}
              height={104}
              className={`h-10 w-auto ${menuOpen ? "" : "md:invert"}`}
              priority
            />
            <span
              className={`text-lg tracking-wide ${
                menuOpen ? "text-brand-text" : "text-brand-text md:text-white"
              }`}
            >
              nitzan tregerman
            </span>
          </Link>
        </motion.div>

        {/* Desktop links */}
        <ul className="hidden gap-8 md:flex">
          {nitzanNav.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <motion.li
                key={link.href}
                initial={isFirstLoad ? { opacity: 0, x: 12 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + i * 0.05,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={link.href}
                  scroll={false}
                  className={`nav-link relative text-lg tracking-wide transition-opacity duration-300 ${
                    isActive
                      ? "text-white nav-link-active"
                      : "text-white hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="relative z-50 flex h-14 w-14 items-center justify-center md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="nitzan-mobile-menu"
          aria-label="Portfolio menu"
        >
          <div className="flex w-[26px] flex-col gap-[6px]">
            <span
              className={`block h-[1.5px] w-full transition-transform duration-300 ${
                menuOpen ? "bg-brand-text translate-y-[6.5px] rotate-45" : "bg-brand-text md:bg-white"
              }`}
            />
            <span
              className={`block h-[1.5px] w-full transition-opacity duration-300 ${
                menuOpen ? "bg-brand-text opacity-0" : "bg-brand-text md:bg-white"
              }`}
            />
            <span
              className={`block h-[1.5px] w-full transition-transform duration-300 ${
                menuOpen ? "bg-brand-text -translate-y-[6.5px] -rotate-45" : "bg-brand-text md:bg-white"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="nitzan-mobile-menu"
            role="dialog"
            aria-modal={true}
            aria-label="Portfolio menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="bg-brand-bg fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
          >
            <ul className="flex flex-col items-center gap-8">
              {nitzanNav.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.15 + i * 0.08,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={link.href}
                    scroll={false}
                    className="text-brand-text text-2xl font-light tracking-wide"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Page transition — DOM-snapshot crossfade                            */
/* ------------------------------------------------------------------ */

function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef(pathname);
  const savedHTMLRef = useRef("");
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (pathname === prevPathRef.current) return;
    prevPathRef.current = pathname;

    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay || !savedHTMLRef.current) return;

    isTransitioningRef.current = true;
    const scrollY = window.scrollY;

    overlay.innerHTML = savedHTMLRef.current;
    overlay.style.top = `-${scrollY}px`;
    overlay.style.display = "block";
    overlay.style.opacity = "1";
    overlay.style.transition = "none";

    container.style.opacity = "0";
    container.style.transition = "none";

    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

    requestAnimationFrame(() => {
      overlay.style.transition = "opacity 0.8s ease-in-out";
      overlay.style.opacity = "0";
      container.style.transition = "opacity 0.8s ease-in-out";
      container.style.opacity = "1";
    });

    const timer = setTimeout(() => {
      overlay.style.display = "none";
      overlay.style.transition = "";
      overlay.style.top = "0";
      overlay.innerHTML = "";
      container.style.transition = "";
      isTransitioningRef.current = false;
      savedHTMLRef.current = container.innerHTML;
    }, 900);

    return () => {
      clearTimeout(timer);
      if (overlay) {
        overlay.style.display = "none";
        overlay.innerHTML = "";
      }
      if (container) {
        container.style.opacity = "";
        container.style.transition = "";
      }
      isTransitioningRef.current = false;
    };
  }, [pathname]);

  useLayoutEffect(() => {
    if (!isTransitioningRef.current && containerRef.current) {
      savedHTMLRef.current = containerRef.current.innerHTML;
    }
  });

  return (
    <div style={{ position: "relative" }}>
      <div ref={containerRef}>{children}</div>
      <div
        ref={overlayRef}
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          display: "none",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shell                                                              */
/* ------------------------------------------------------------------ */

export default function NitzanShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-brand-bg text-brand-text min-h-screen">
      <NitzanNav />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
