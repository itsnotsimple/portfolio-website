<div align="center">

# ✦ Alex & Flow — Portfolio

**Premium video editor portfolio. Built for impact.**

*"I make your story move."*

[![Cloudflare Pages](https://img.shields.io/badge/Deployed_on-Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://portfolio-website.pages.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## Overview

Single-page portfolio for video editor **Alex** ([@alex.cc077](https://www.instagram.com/alex.cc077/)) — built to convert visitors into clients. Cinematic entrance animations, a WebGL plasma background, bilingual support (EN/BG), and a fully code-split architecture for instant load times.

**300+ projects. 3+ years. 98% happy clients.**

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 6 |
| Build | Vite 8 + Bun |
| Styling | Tailwind CSS v4 + CSS Modules |
| Animation | Framer Motion 12 + GSAP 3 |
| 3D / WebGL | OGL (custom plasma raymarching shader) |
| Particles | tsParticles (Sparkles component) |
| Deployment | Cloudflare Pages |

---

## Features

- **WebGL Plasma Background** — 60-iteration raymarching GLSL shader on desktop, optimized 2D sine-wave fallback on mobile
- **Cinematic Preloader** — dual-gate (layout ready + GPU flushed) ensures zero flash-of-unstyled content
- **Bilingual (EN / BG)** — live language toggle with zero page reload via React Context
- **3D Folder Work Cards** — interactive project category cards with premium modal overlay
- **3D Shuffle Reviews** — draggable testimonial card deck with star-rating summary
- **About Section** — Sparkles particle burst, InfiniteSlider tool marquee, floating achievement chips
- **FAQ Split Layout** — sticky MiniRadar with spinning rings on desktop, smooth accordion
- **Scroll Parallax System** — spring-smoothed momentum parallax across all sections
- **Code Splitting** — Reviews, FAQ, Contact load only when near the viewport
- **Optimized Build** — Terser 3-pass compression, hash-only filenames, no source maps

---

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Hero, Work, About, Reviews, FAQ, Contact
│   └── ui/              # Reusable components (Folder, ProfileCard, ElectricBorder, ...)
├── context/             # LanguageContext (EN/BG)
├── data/
│   ├── content.ts       # Single source of truth for all site copy (EN)
│   └── contentBG.ts     # Bulgarian translations
├── lib/
│   └── utils.ts         # cn() helper
├── styles/
│   └── globals.css      # Global keyframes + shared layout classes
└── types/
    └── index.ts         # TypeScript interfaces
```

> All site text, stats, reviews, and work items live in `src/data/content.ts`. Edit there — nothing else needs to change.

---

## Getting Started

**Prerequisites:** [Bun](https://bun.sh)

```bash
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

## Deployment

The site auto-deploys to Cloudflare Pages on every push to `main`.

| Setting | Value |
|---|---|
| Build command | `bun run build` |
| Output directory | `dist` |
| Node version | 18+ |

---

## UI Components

Custom-built component library powering the site:

`Sparkles` · `InfiniteSlider` · `ProgressiveBlur` · `TestimonialCards` · `LiquidRadio` · `CountUp` · `ElectricBorder` · `Folder` · `ProfileCard` · `ScrollReveal` · `LanguageToggle`

---

## Contact

**Alex** — [@alex.cc077](https://www.instagram.com/alex.cc077/) · alexperchinkov77@gmail.com

---

<div align="center">

*Built with precision. Deployed with purpose.*

</div>
