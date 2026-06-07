# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Uses **bun** as the package manager (see `bun.lock`).

```bash
bun run dev       # start dev server at http://localhost:5173 (auto-opens browser)
bun run build     # TypeScript check + Vite production build → dist/
bun run lint      # ESLint
bun run preview   # preview the production build locally
```

## Architecture

Single-page portfolio for a video editor. React 19 + TypeScript + Vite, styled with CSS Modules, animated with Framer Motion.

### Boot sequence

`main.tsx` → `bootstrap.tsx` → `App.tsx` → `MainApp.tsx`

`App.tsx` is the root shell. It gates the UI with a two-phase readiness signal:
1. **Layout finished** — triggered by `MainApp` after two `requestAnimationFrame` ticks + 200ms cushion (ensures browser paint completes before showing anything).
2. **Plasma ready** — fired by `Plasma.tsx` after 10 WebGL frames are rendered and GPU-flushed via `gl.readPixels`.

Both flags must be `true` before `Preloader` fades out.

### Content

**All site text and data lives in `src/data/content.ts`** — the single source of truth for copy, stats, video metadata, reviews, and FAQ entries. Edit there; components consume named exports.

The site is bilingual (EN/BG). **Any copy change must be mirrored in `src/data/contentBG.ts`** — the Bulgarian translation file with identical structure. Language state is managed by `src/context/LanguageContext.tsx` and defaults to English on every load.

Types for `Video`, `Review`, `FAQItem`, `Stat`, `NavLink` are in `src/types/index.ts`.

### Background layer

`GlobalBackground` renders two stacked layers behind all content (`z-index: -1`):
- **Plasma shader** (`Plasma.tsx`): WebGL via OGL. Desktop uses a 60-iteration raymarching GLSL fragment shader capped to 30 iterations; mobile uses a simpler 2D sine-wave shader (~20× faster compile). Shader compilation is deferred 50ms via `setTimeout` so it doesn't block the first paint frame. Mobile also renders at 50% drawing-buffer resolution stretched via CSS `object-fit: cover`.
- **Nebula blobs**: Three gradient blobs with spring-smoothed Framer Motion scroll parallax on desktop; static on mobile.
- **Hero visual**: Interactive 3D pointer parallax on desktop using spring-smoothed Framer Motion transforms; static on mobile.

Mobile detection is UA + `window.innerWidth < 768`.

### Scroll Parallax System

The site utilizes a unified, spring-smoothed momentum scroll parallax system (`ScrollParallax.tsx`) on desktop:
- **Background watermarks** ("02" - "06") scroll dynamically behind content (speed: -20).
- **Staggered columns** in Hero, About, Reviews, FAQ, and Contact translate at opposing/offset speeds.
- **VideoCard thumbnails** translate inside their cards (image-in-frame parallax).
- **Nebula blobs** drift slowly based on smooth scroll position.

### Sections and lazy loading

Page sections in render order: `Hero` → `Work` → `About` → `Reviews` → `FAQ` → `Contact` → `Footer`

`Reviews`, `FAQ`, and `Contact` are code-split (`React.lazy`) and wrapped in `LazySection` (IntersectionObserver-based) + `Suspense`. They only load when near the viewport.

### Styling

Styling uses **both Tailwind CSS v4 and CSS Modules in parallel** — not one or the other. Tailwind handles utility classes (integrated via `@tailwindcss/vite`); CSS Modules (`.module.css` files co-located with components) handle component-specific or complex styles. Global keyframes and shared layout classes live in `src/styles/globals.css`.

Design tokens (set as CSS custom properties):

| Variable | Value | Usage |
|---|---|---|
| Primary | `#2596be` | Cyan — buttons, links, accents |
| Accent | `#8350e8` | Electric purple — active states, glows |
| Surface | `#0d0d0d` | Near-black — backgrounds |
| `--font-head` | Syne | Display headings |
| `--font-display` | Bebas Neue | Large decorative text |
| `--font-body` | Inter | Body copy and UI |

### Deployment

Hosted on **Cloudflare Pages** — auto-deploys on every push to `main`. Build command: `bun run build`. Output: `dist/`. The `public/_headers` file sets HTTP response headers (cache control, security headers).

### Build output

Production builds use Terser with `toplevel` mangling, 3 compression passes, and hash-only filenames (`assets/[hash].js`). Source maps are disabled. The JavaScript obfuscator plugin is intentionally disabled — it caused 2–3s startup freezes and massive bundle size with no meaningful security benefit.
