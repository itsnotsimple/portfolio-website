<div align="center">

```
 █████╗ ██╗     ███████╗██╗  ██╗     ██╗███████╗    ███████╗██╗      ██████╗ ██╗    ██╗
██╔══██╗██║     ██╔════╝╚██╗██╔╝    ╚██╗██╔════╝    ██╔════╝██║     ██╔═══██╗██║    ██║
███████║██║     █████╗   ╚███╔╝      ╚██╗█████╗      █████╗  ██║     ██║   ██║██║ █╗ ██║
██╔══██║██║     ██╔══╝   ██╔██╗      ██╔╝██╔══╝      ██╔══╝  ██║     ██║   ██║██║███╗██║
██║  ██║███████╗███████╗██╔╝ ██╗    ██╔╝ ███████╗    ██║     ███████╗╚██████╔╝╚███╔███╔╝
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚══════╝    ╚═╝     ╚══════╝ ╚═════╝  ╚══╝╚══╝
```

### *"I make your story move."*

<br/>

[![Live Site](https://img.shields.io/badge/🌐_LIVE_SITE-Visit_Portfolio-2596be?style=for-the-badge&labelColor=0d0d0d)](https://www.instagram.com/alex.cc077/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Deployed-F38020?style=for-the-badge&logo=cloudflare&logoColor=white&labelColor=0d0d0d)](https://pages.cloudflare.com)
[![Status](https://img.shields.io/badge/Status-Live_&_Active-00c853?style=for-the-badge&labelColor=0d0d0d)](https://github.com/itsnotsimple/portfolio-website)

<br/>

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_6-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-fbf0df?style=flat-square&logo=bun&logoColor=black)

</div>

---

A fully custom portfolio site I built for a video editor client — no templates, no page builders, no shortcuts.

The goal was simple: make the site feel as premium as the work it showcases. That meant writing a custom WebGL plasma shader, building a 3D draggable card deck for testimonials, animating every section entrance with spring physics, and shipping a bilingual experience (EN/BG) with a live toggle — all while keeping load times fast through code splitting and lazy loading.

---

## 🔥 Features

### 🌊 WebGL Plasma Background
Custom GLSL fragment shader built on [OGL](https://github.com/oframe/ogl). Desktop runs a 60-iteration raymarching shader with 4 animated gradient blobs. Mobile falls back to an optimized 2D sine-wave shader (~20× faster to compile) rendered at 50% resolution and stretched via CSS. Shader compilation is deferred 50ms to never block the first paint frame.

### 🎬 Cinematic Preloader
A dual-gate boot system that eliminates all flash-of-unstyled-content:
- **Gate 1** — layout paint confirmed after 2× `requestAnimationFrame` + 200ms cushion
- **Gate 2** — GPU flush confirmed via `gl.readPixels` after 10 rendered WebGL frames

Both must pass before the preloader fades out.

### 🏠 Hero Section
- Typewriter word cycle: `move.` / `speak.` / `sell.` / `go viral.` / `inspire.`
- Staggered motion entrance with custom spring curves
- Animated stat counters via CountUp component
- ElectricBorder glow on the CTA button
- Interactive 3D pointer parallax on desktop (spring-smoothed)

### 📁 Work Section — 3D Folder Cards + Modal
Interactive 3D Folder component per project category. Clicking one opens a premium modal with a dot-grid overlay, gradient divider, and folder-platform glow. All transitions are driven by Framer Motion layout animations.

### 👤 About Section — Sparkles + Infinite Slider
Sparkles particle burst behind the profile photo, InfiniteSlider tool logo marquee with ProgressiveBlur fade masks on both edges, a 3D tilt ProfileCard, and floating achievement chips visible on wide viewports.

### 🃏 Reviews Section — 3D Shuffle Deck
Draggable 3D card stack built with spring physics. Users can physically shuffle through testimonials. Includes a star-rating summary badge and real client avatars (WebP).

### ❓ FAQ Section — Split Layout + MiniRadar
On desktop: a sticky left column with an animated MiniRadar component and spinning decorative rings, paired with a smooth accordion on the right. On mobile: full-width accordion only. FAQItem uses an animated SVG ChevronDown instead of plain text.

### 📬 Contact Section
Staggered Framer Motion card entrance, top gradient accent line per card, and a `liveRadarPulse` CSS keyframe animation. Cards: Email · Instagram · Response Time.

### 🔤 Bilingual Support — EN / BG
Full English and Bulgarian site copy managed via React Context. Live toggle with zero page reload. Defaults to English on every load. All copy lives in `src/data/content.ts` (EN) and `src/data/contentBG.ts` (BG).

### 🧭 Navbar — Glass Filter + Active Pill
SVG GlassFilter backdrop (no `backdrop-filter` artifacts), a sliding purple active indicator pill that follows the current section, and `pointer-events: none` on the outer shell to fix a dead-on-frame-0 blocking bug.

### ⚡ Performance
- `React.lazy` + `Suspense` for Reviews, FAQ, and Contact
- `IntersectionObserver` via `LazySection` — sections load only when approaching the viewport
- Terser with 3 compression passes and toplevel mangling
- Hash-only filenames, no source maps in production
- All images converted to WebP (profile photo, tool logos, review avatars)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + TypeScript 6 | Component framework with full type safety |
| Vite 8 | Build tool and dev server |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion 12 | Spring animations and layout transitions |
| GSAP 3 | Timeline-based animation sequences |
| OGL | Lightweight WebGL — custom plasma shader |
| tsParticles Slim | Sparkles particle system |
| Radix UI | Accessible radio group primitive |

### Build & Deployment
| Technology | Purpose |
|---|---|
| Bun | Package manager and script runner |
| Terser | 3-pass JS minification with toplevel mangling |
| Sharp | WebP image conversion pipeline |
| vite-plugin-javascript-obfuscator | Selective JS obfuscation |
| Cloudflare Pages | Hosting — auto-deploys on every push to `main` |

---

## 🎨 Design System

**Colors**
| Token | Hex | Usage |
|---|---|---|
| Primary | `#2596be` | Cyan — buttons, links, accents |
| Accent | `#8350e8` | Electric purple — active states, glows |
| Surface | `#0d0d0d` | Near black — backgrounds |

**Fonts**
| Variable | Font | Usage |
|---|---|---|
| `--font-head` | Syne | Display headings |
| `--font-display` | Bebas Neue | Large decorative text |
| `--font-body` | Inter | Body copy and UI |

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Hero, Work, About, Reviews, FAQ, Contact
│   └── ui/              # All reusable components
├── context/
│   └── LanguageContext.tsx
├── data/
│   ├── content.ts       # ← Single source of truth (EN)
│   └── contentBG.ts     # Bulgarian translations
├── lib/
│   └── utils.ts         # cn() helper
├── styles/
│   └── globals.css      # Global keyframes + shared layout classes
└── types/
    └── index.ts         # TypeScript interfaces
```

> All site text, stats, work items, reviews, and FAQ entries live in `src/data/content.ts`. Edit there — no component changes needed.

---

## 🚀 Getting Started

**Requires:** [Bun](https://bun.sh) · Node 18+

```bash
# Clone the repo
git clone https://github.com/itsnotsimple/portfolio-website.git
cd portfolio-website

# Install dependencies
bun install

# Start dev server → http://localhost:5173
bun run dev

# Production build
bun run build

# Preview production build locally
bun run preview
```

---

## ☁️ Deployment

Auto-deploys to **Cloudflare Pages** on every push to `main`.

| Setting | Value |
|---|---|
| Build command | `bun run build` |
| Output directory | `dist` |
| Framework preset | None (custom Vite) |

---

## 📄 License

MIT © [itsnotsimple](https://github.com/itsnotsimple)
