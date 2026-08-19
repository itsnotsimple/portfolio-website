<div align="center">

```
 █████╗ ██████╗     ███╗   ███╗███████╗██████╗ ██╗ █████╗ 
██╔══██╗██╔══██╗    ████╗ ████║██╔════╝██╔══██╗██║██╔══██╗
███████║██████╔╝    ██╔████╔██║█████╗  ██║  ██║██║███████║
██╔══██║██╔═══╝     ██║╚██╔╝██║██╔══╝  ██║  ██║██║██╔══██║
██║  ██║██║         ██║ ╚═╝ ██║███████╗██████╔╝██║██║  ██║
╚═╝  ╚═╝╚═╝         ╚═╝     ╚═╝╚══════╝╚═════╝ ╚═╝╚═╝  ╚═╝
```

### *"I make your story move."*
**AP Media · Alex | Video Editor Portfolio**

<br/>

[![Live Site](https://img.shields.io/badge/🌐_LIVE_PORTFOLIO-Visit_Site-2596be?style=for-the-badge&labelColor=04080c)](https://www.instagram.com/alex.cc077/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Deployed-F38020?style=for-the-badge&logo=cloudflare&logoColor=white&labelColor=04080c)](https://pages.cloudflare.com)
[![Status](https://img.shields.io/badge/Status-Live_&_Production_Ready-00c853?style=for-the-badge&labelColor=04080c)](https://github.com/itsnotsimple/portfolio-website)

<br/>

![React 19](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript 6](https://img.shields.io/badge/TypeScript_6-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite 8](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Framer Motion 12](https://img.shields.io/badge/Framer_Motion_12-0055FF?style=flat-square&logo=framer&logoColor=white)
![OGL](https://img.shields.io/badge/OGL_WebGL-FF5722?style=flat-square&logo=webgl&logoColor=white)

</div>

---

A high-performance, dark-mode showcase built for **AP Media (Alex | Video Editor)**. Designed to deliver an immersive visual experience with custom WebGL shaders, 3D physics-driven micro-interactions, responsive video players, interactive color grading comparisons, and complete bilingual support (English & Bulgarian).

---

## 🔥 Features & Architecture

### 🌊 WebGL Plasma Shader & Cinematic Canvas
- Custom GLSL raymarching fragment shader powered by **[OGL](https://github.com/oframe/ogl)**.
- Desktop executes an animated 3D gradient fluid shader with dynamic mouse interaction.
- Mobile falls back to a high-speed 2D wave shader rendered at half resolution to guarantee 60 FPS on all devices.
- Non-blocking asynchronous compilation with GPU flush checks.

### 🎬 Dual-Gate Preloader
- Eliminates Flash-of-Unstyled-Content (FOUC):
  - **Gate 1:** Layout paint confirmed via double `requestAnimationFrame` + safety timer.
  - **Gate 2:** GPU readiness confirmed via WebGL frame rendering.

### ⚡ Hero Section
- Dynamic typewriter keyword rotator (`move.` / `speak.` / `sell.` / `go viral.` / `inspire.`).
- Smooth spring-animated statistics counters (`300+ Projects`, `3+ Years Exp.`, `98% Happy Clients`).
- 3D cursor-tracking parallax depth on desktop.
- Instant CTA triggers for Instagram and direct inquiries.

### 🎥 Selected Work & Custom Video Player
- Categorized portfolio grid:
  - **After Effects** (VFX, 3D motion graphics)
  - **Brand Promoting** (Commercial campaigns & social media cuts)
  - **Food Videos** (Culinary art & fast-paced commercial editing)
  - **Simple Editing** (Clean pacing, narrative rhythm, dialogues)
  - **YouTube Shorts** (High-energy sync edits for TikTok / Reels / Shorts)
- Interactive category filtering with spring-animated layout transitions.
- Custom video modal overlay with sound controls, scrub bar, and keyboard navigation (`Esc` to close).

### 🎨 Color Grading (Before & After) Comparator
- Interactive interactive look comparison displaying raw camera log footage side-by-side with the final color graded output.

### 📈 Client Results Proof Gallery
- High-resolution visual gallery showcasing verified view counts, audience retention spikes, and viral reach metrics across YouTube and Instagram.

### 🃏 Testimonials & 3D Interactive Shuffle Deck
- **Video Testimonials:** Embedded creator feedback with instant playback.
- **3D Card Deck:** Physics-based draggable card stack that users can shuffle through interactively.
- Star rating summary badge and real client avatars.

### ❓ FAQ Section
- Asymmetric split layout with sticky section navigation on desktop.
- Smooth accordion transitions with custom animated icons.

### 📬 Contact Section & Electric Border
- Interactive 3D tilt cards featuring **ElectricBorder** — a custom canvas-based lightning contour algorithm that hugs the exact card boundary in real-time.
- Direct links to Instagram DM and Email inquiries.
- Live response time badge indicator with animated signal waves.

### 🌐 Complete Bilingual Support (EN / BG)
- Seamless real-time switching between English and Bulgarian without page reloads.
- Managed via `LanguageContext` with persistent `localStorage` user preferences.
- Type-safe mirrored content architecture: `src/data/content.ts` (EN) and `src/data/contentBG.ts` (BG).

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Core Framework** | React 19 | Latest concurrent features and component architecture |
| **Language** | TypeScript 6 | Full compile-time type safety and interface validation |
| **Bundler & Tooling** | Vite 8 | Instant HMR and optimized asset pipeline |
| **Styling** | Tailwind CSS v4 & Vanilla CSS | Modern CSS variables, design tokens, and glassmorphism |
| **Animations** | Framer Motion 12 | Gesture physics, layout animations, and spring transitions |
| **WebGL & 3D** | OGL | Lightweight WebGL library for GPU fluid background shaders |
| **Asset Optimization** | Sharp & Terser | WebP image conversion pipeline and 3-pass script compression |

---

## 🎨 Design System

### Color Palette
- **Primary Brand (Cyan):** `#2596be` / `#3ab8e2` (`--primary`, `--primary-light`)
- **Accent (Electric Aqua):** `#0dd3f0` (`--accent`)
- **Secondary (Purple):** `#8350e8` / `#a97af5` (`--secondary`, `--secondary-light`)
- **Background:** `#04080c` (Deep Obsidian Void)
- **Glass Card:** `rgba(10, 18, 28, 0.88)` with `backdrop-filter: blur(10px)`

### Typography
- **Headings (`--font-head`):** `Outfit`, system-ui, sans-serif
- **Display Watermarks (`--font-display`):** `Bebas Neue`, sans-serif
- **Body Text (`--font-body`):** `Inter`, system-ui, sans-serif

---

## 🗂️ Project Structure

```
portfolio-site/
├── public/
│   ├── images/          # Results gallery, review avatars
│   ├── APMEDIA.png      # Brand logo
│   └── _redirects       # SPA fallback routing rules
├── src/
│   ├── components/
│   │   ├── layout/      # Navbar, Footer
│   │   ├── sections/    # Hero, Work, BeforeAfter, Results, About, Reviews, FAQ, Contact
│   │   └── ui/          # ElectricBorder, ScrollParallax, ScrollReveal, VideoModal, etc.
│   ├── context/
│   │   └── LanguageContext.tsx   # Bilingual provider (EN/BG)
│   ├── data/
│   │   ├── content.ts   # Centralized English content (single source of truth)
│   │   └── contentBG.ts # Centralized Bulgarian content
│   ├── lib/             # Device detection and utilities
│   ├── styles/
│   │   └── globals.css  # Design tokens, keyframes, layout grid classes
│   └── types/
│       └── index.ts     # Shared TypeScript interfaces
├── package.json
└── vite.config.ts
```

> **Centralized Content:** All text, video links, reviews, and FAQs are managed in `src/data/content.ts` (EN) and `src/data/contentBG.ts` (BG). Editing these files updates the entire site automatically.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) (v18+) or [Bun](https://bun.sh)

### Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/itsnotsimple/portfolio-website.git
cd portfolio-website

# 2. Install dependencies
npm install
# or
bun install

# 3. Start local development server (http://localhost:5173)
npm run dev

# 4. Create production build
npm run build

# 5. Preview production build
npm run preview
```

---

## ☁️ Deployment

Configured for seamless deployment on **Cloudflare Pages**, **Vercel**, or **Netlify**:

| Setting | Value |
|---|---|
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Node Version** | `18+` / `20+` |

---

## 👨‍💻 Credits & Author

- **Client:** AP Media (Alex | Video Editor) — [@alex.cc077](https://www.instagram.com/alex.cc077/)
- **Designed & Developed by:** Kristiyan — [@kristiyan.1337](https://www.instagram.com/kristiyan.1337/)

---

## 📄 License

MIT License © [itsnotsimple](https://github.com/itsnotsimple)
