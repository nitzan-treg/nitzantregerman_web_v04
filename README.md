# nitzantregerman.com

Portfolio site — 3D animation & VFX work by Nitzan Tregerman. Built with Next.js 16, React 19, Tailwind v4, GSAP, and framer-motion.

## Structure

- `src/app/` — routes: `/` (home grid), `/about`, `/work/[slug]`, plus auto-generated `/sitemap.xml` and `/_not-found`.
- `src/components/WaveHero/` — animated SVG hero used across project pages.
- `src/components/animation/` — GSAP-driven scroll primitives (`FadeIn`, `TextReveal`).
- `src/data/nitzan-projects.ts` — every project's metadata, copy, and asset paths.
- `public/assets/images/` — posters, portraits, icons, favicons.
- Root: `next.config.ts`, `tsconfig.json`, `package.json`, `eslint.config.mjs`, `postcss.config.mjs`.
