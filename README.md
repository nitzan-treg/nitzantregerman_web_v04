# nitzantregerman.com

Personal portfolio site for Nitzan Tregerman — 3D Animation & VFX.

Built with Next.js 16 (App Router) + React 19 + Tailwind v4 + GSAP + framer-motion. Deployed on Vercel.

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm run lint
npm run typecheck
```

## Environment

Heavy MP4 assets are hosted as GitHub Release assets on this repo and served via a 308 redirect from `/assets/videos/*` → release URL, so they don't count against the Vercel bandwidth budget.

Set in Vercel (and locally in `.env.local` for testing):

```
NEXT_PUBLIC_VIDEO_CDN=https://github.com/nitzan-treg/nitzantregerman.com/releases/download/videos-v1
```

When unset, videos load from `public/assets/videos/` directly.
