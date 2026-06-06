<div align="center">

<br/>

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

[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript_6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)](https://framer.com/motion)
[![Bun](https://img.shields.io/badge/Bun-fbf0df?style=flat-square&logo=bun&logoColor=black)](https://bun.sh)

<br/>

</div>

---

<div align="center">

## ✦ What is This?

</div>

A **cinematic, high-performance portfolio** for video editor **Alex** ([@alex.cc077](https://www.instagram.com/alex.cc077/)) — engineered from the ground up to convert visitors into paying clients. Every detail — from the WebGL plasma shader to the 3D shuffle card deck — was crafted with intention.

This is not a template. This is a custom-built creative weapon.

<br/>

<div align="center">

| 300+ | 3+ | 98% |
|:---:|:---:|:---:|
| Projects Delivered | Years Experience | Happy Clients |

</div>

---

## ⚡ Tech Stack

```
Frontend          React 19 + TypeScript 6
Build Tool        Vite 8 (Bun as package manager)
Styling           Tailwind CSS v4 + CSS Modules
Animation         Framer Motion 12 + GSAP 3
3D / WebGL        OGL — custom GLSL raymarching shader
Particles         tsParticles Slim
UI Primitives     Radix UI (Radio Group)
Deployment        Cloudflare Pages (auto-deploy on push)
Compression       Terser — 3-pass, toplevel mangling
Obfuscation       vite-plugin-javascript-obfuscator (selective)
Image Processing  Sharp (WebP conversion pipeline)
```

---

## 🎨 Design System

**Color Palette**
```
Primary   #2596be  ━━━━━━━━━━━  Cyan Blue
Accent    #8350e8  ━━━━━━━━━━━  Electric Purple
Surface   #0d0d0d  ━━━━━━━━━━━  Near Black
```

**Typography**
```
--font-head     Syne          Display headings
--font-display  Bebas Neue    Large decorative text
--font-body     Inter         Body copy & UI
```

---

## 🔥 Features

### ◈ WebGL Plasma Background
Custom-built GLSL fragment shader running on [OGL](https://github.com/oframe/ogl):
- **Desktop** — 60-iteration raymarching shader (capped to 30 for perf), 4 animated gradient blobs
- **Mobile** — optimized 2D sine-wave shader (~20× faster compile), renders at 50% resolution stretched via CSS
- Shader compilation deferred 50ms via `setTimeout` to never block first paint
- GPU-flush gate via `gl.readPixels` — preloader holds until GPU actually has frames

### ◈ Cinematic Preloader
Zero-flash boot sequence with a **dual-gate system**:
1. Layout gate — fires after 2× `requestAnimationFrame` + 200ms cushion (browser paint complete)
2. Plasma gate — fires after 10 WebGL frames confirmed rendered
Both must pass before the preloader fades. Eliminates all FOUC.

### ◈ Hero Section
- Staggered motion entrance with custom timing curves
- **Typewriter word cycle** — cycles through: `move.` / `speak.` / `sell.` / `go viral.` / `inspire.`
- Animated stat counters (CountUp) — 300+ Projects · 3+ Years · 98% Happy Clients
- ElectricBorder glow on CTA button
- Interactive 3D pointer parallax (desktop only, spring-smoothed)

### ◈ Work Section — Folder Cards + Premium Modal
- 3D **Folder** component per project category (Brand · Commercial · Music · Social · Travel)
- Click to open a **premium project modal** with:
  - Dot-grid overlay backdrop
  - Gradient divider
  - Folder-platform glow effect
  - Section watermark `02`
- Fully animated open/close with Framer Motion layout transitions

### ◈ About Section — Sparkles + Infinite Slider
- **Sparkles** particle burst behind profile photo (tsParticles)
- **InfiniteSlider** tool logo marquee — Premiere Pro · After Effects · CapCut Pro
- **ProgressiveBlur** fade masks on marquee edges
- **ProfileCard** with custom CSS 3D tilt effect
- Floating achievement chips: `5+ Years` · `150+ Projects` · `98% Satisfaction` (visible ≥1100px)

### ◈ Reviews Section — 3D Shuffle Deck
- **TestimonialCards** — draggable 3D card stack with spring physics
- Shuffle button with satisfying re-stack animation
- Dot-grid backdrop
- Star-rating summary badge
- Real client avatars (WebP optimized)

### ◈ FAQ Section — Split Layout + MiniRadar
- **Desktop:** sticky left column with animated **MiniRadar** component + spinning decorative rings
- **Mobile:** full-width accordion
- FAQItem uses **animated ChevronDown SVG** (replaces plain text `+`)
- Section watermark `05`

### ◈ Contact Section — Animated Cards
- Each contact card animates in with Framer Motion stagger
- Top gradient accent line per card
- **liveRadarPulse** CSS keyframe animation
- Section watermark `06`
- Cards: Email · Instagram · Response Time

### ◈ Footer — Gradient Branding
- 3-column layout: Identity / Nav Links / Status + Social
- **ALEX&FLOW** brand text in cyan→purple gradient
- Decorative ring animations
- Pulsing brand glow
- Instagram icon with brand-pink hover state

### ◈ Navbar — Glass Filter + Active Pill
- SVG **GlassFilter** backdrop blur (no CSS `backdrop-filter` artifacts)
- **Sliding purple active indicator pill** — follows current section
- `pointer-events: none` on outer shell → `auto` on interactive elements (fixes dead-on-frame-0 bug)
- Language toggle integrated inline

### ◈ Bilingual Support — EN / BG
- Full **English + Bulgarian** site copy
- Live toggle with zero page reload (React Context)
- Defaults to English on every load
- All copy managed in `src/data/content.ts` (EN) and `src/data/contentBG.ts` (BG)

### ◈ Scroll Parallax System
Spring-smoothed momentum parallax across the entire page (desktop):
- Background watermarks (`02`–`06`) scroll behind content
- Staggered columns in Hero, About, Reviews, FAQ, Contact translate at opposing speeds
- VideoCard thumbnails translate inside their frames (image-in-frame parallax)
- Nebula blobs drift on scroll

### ◈ Performance Architecture
- **Code splitting** — Reviews, FAQ, Contact are `React.lazy` + `Suspense`
- **LazySection** — IntersectionObserver loads sections only when approaching viewport
- **Terser** — 3 compression passes, toplevel mangling, hash-only filenames
- **WebP everywhere** — all images converted (profile photo, tool logos, review avatars)
- Source maps disabled in production
- No unused CSS shipped (Tailwind v4 scans at build time)

---

## 🗂 Project Structure

```
portfolio-website/
├── public/
│   └── images/
│       └── reviews/            # Client avatar WebP images
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Glass nav + sliding pill + language toggle
│   │   │   └── Footer.tsx      # 3-column gradient footer
│   │   ├── sections/
│   │   │   ├── Hero.tsx        # Typewriter + parallax + ElectricBorder CTA
│   │   │   ├── Work.tsx        # Folder cards + premium modal
│   │   │   ├── About.tsx       # Sparkles + InfiniteSlider + ProfileCard
│   │   │   ├── Reviews.tsx     # 3D shuffle testimonial deck
│   │   │   ├── FAQ.tsx         # Split layout + MiniRadar + accordion
│   │   │   └── Contact.tsx     # Animated contact cards
│   │   ├── assets/             # WebP logos and profile image
│   │   └── ui/
│   │       ├── Plasma.tsx      # WebGL OGL shader
│   │       ├── GlobalBackground.tsx
│   │       ├── Preloader.tsx   # Dual-gate cinematic preloader
│   │       ├── ElectricBorder.tsx
│   │       ├── Folder.tsx      # 3D folder card
│   │       ├── ProfileCard.tsx
│   │       ├── CountUp.tsx
│   │       ├── sparkles.tsx
│   │       ├── infinite-slider.tsx
│   │       ├── progressive-blur.tsx
│   │       ├── testimonial-cards.tsx
│   │       ├── liquid-radio.tsx
│   │       ├── ScrollReveal.tsx
│   │       ├── ScrollParallax.tsx
│   │       ├── LazySection.tsx
│   │       ├── VideoCard.tsx
│   │       └── LanguageToggle.tsx
│   ├── context/
│   │   └── LanguageContext.tsx # EN/BG language provider
│   ├── data/
│   │   ├── content.ts          # ← Single source of truth (EN)
│   │   └── contentBG.ts        # Bulgarian translations
│   ├── lib/
│   │   └── utils.ts            # cn() className helper
│   ├── styles/
│   │   └── globals.css         # Global keyframes + shared layout classes
│   └── types/
│       └── index.ts            # TypeScript interfaces
├── index.html
├── vite.config.ts
├── package.json
└── bun.lock
```

> **Single source of truth:** All site text, stats, work items, reviews, and FAQ entries live in `src/data/content.ts`. Edit there — no component changes needed.

---

## 🚀 Getting Started

**Requires:** [Bun](https://bun.sh) · Node 18+

```bash
# Clone the repo
git clone https://github.com/itsnotsimple/portfolio-website.git
cd portfolio-website

# Install dependencies
bun install

# Start dev server
bun run dev
# → http://localhost:5173

# Production build
bun run build

# Preview production build locally
bun run preview

# Lint
bun run lint
```

---

## ☁️ Deployment

Auto-deploys to **Cloudflare Pages** on every push to `main`.

| Setting | Value |
|---|---|
| Build command | `bun run build` |
| Output directory | `dist` |
| Framework preset | None (custom Vite) |
| Node compatibility | ✓ Enabled |

Zero config needed — push to `main` and it's live.

---

## 🖥 Boot Sequence

```
main.tsx
  └── bootstrap.tsx
        └── App.tsx              ← root shell, manages readiness gates
              └── MainApp.tsx    ← renders all sections
                    ├── Plasma.tsx     (gate 2: GPU flush after 10 frames)
                    └── [sections]     (gate 1: layout paint complete)
```

Both gates must pass → Preloader fades → Site is visible.

---

## 📬 Contact

**Kristian Djenev** — Developer & Builder

[![GitHub](https://img.shields.io/badge/@itsnotsimple-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/itsnotsimple)

---

<div align="center">

<br/>

*Built with precision. Every pixel, intentional.*

<br/>

![](https://img.shields.io/badge/Made_with-❤️_and_too_much_coffee-2596be?style=flat-square&labelColor=0d0d0d)

</div>
