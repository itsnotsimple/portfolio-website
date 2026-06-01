import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SITE_CONFIG, STATS, TYPEWRITER_WORDS, HERO_SECTION } from '../../data/content';
import { useTypewriter } from '../../hooks/useTypewriter';
import styles from './Hero.module.css';

// ── Stagger delays (ms) relative to when isLoaded becomes true ───────────
// These are CSS transition-delays, NOT animation-delays.
// Transitions fire from property changes — immune to browser deferral.
const STAGGER = [0, 80, 160, 250, 340, 640] as const;

// ── Icons ────────────────────────────────────────────────────────────────
const InstaIcon = () => (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const EmailIcon = () => (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,12 2,6"/>
  </svg>
);

const ChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden="true">
    <polyline points="6,9 12,15 18,9"/>
  </svg>
);

// ── Typewriter ────────────────────────────────────────────────────────────
function TypewriterText() {
  const { text, isWaiting } = useTypewriter(TYPEWRITER_WORDS);
  return (
    <span className={styles.typeLine} aria-live="polite">
      <span className={styles.typeText}>{text || '\u00A0'}</span>
      <span className={`${styles.cursor} ${isWaiting ? styles.cursorBlink : ''}`} aria-hidden="true">|</span>
    </span>
  );
}

// ── Stat counter (digit roller) ───────────────────────────────────────────
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className={styles.stat}>
      <div className={styles.statNum}>
        {value.toString().split('').map((digit, idx) => {
          const n = parseInt(digit, 10);
          const isNum = !isNaN(n);
          if (!isNum) return <span key={idx}>{digit}</span>;
          return (
            <span key={idx} className={styles.digitWrapper}>
              <span
                className={styles.digitTrack}
                style={{ transform: inView ? `translateY(-${n * 100}%)` : 'translateY(0%)' }}
              >
                {[0,1,2,3,4,5,6,7,8,9].map(d => (
                  <span key={d} className={styles.digit}>{d}</span>
                ))}
              </span>
            </span>
          );
        })}
        <span className={styles.statSuffix}>{suffix}</span>
      </div>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────
export default function Hero({ isLoaded }: { isLoaded: boolean }) {
  const vis = isLoaded ? styles.visible : '';

  const item = (_i: number, extra = '') =>
    `${styles.item} ${vis} ${extra}`.trim();

  return (
    <section className={styles.hero} id="hero" aria-label="Hero">
      <div className={styles.content}>
        <div className={styles.inner}>

          {/* 0 — Badge */}
          <div
            className={item(0, styles.badge)}
            style={{ transitionDelay: `${STAGGER[0]}ms` }}
          >
            <span className={styles.dot} aria-hidden="true" />
            {SITE_CONFIG.availabilityText}
          </div>

          {/* 1 — Heading */}
          <h1
            className={item(1, styles.heading)}
            style={{ transitionDelay: `${STAGGER[1]}ms` }}
          >
            <span className={styles.preText}>{HERO_SECTION.preHeading}</span>
            <span className={styles.storyLine}>{HERO_SECTION.storyHeading}</span>
            <TypewriterText />
          </h1>

          {/* 2 — Subtitle */}
          <p
            className={item(2, styles.subtitle)}
            style={{ transitionDelay: `${STAGGER[2]}ms` }}
          >
            {SITE_CONFIG.subTagline}
          </p>

          {/* 3 — CTA buttons */}
          <div
            className={item(3, styles.ctaRow)}
            style={{ transitionDelay: `${STAGGER[3]}ms` }}
          >
            <motion.a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              id="hero-insta-btn"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <InstaIcon /><span>{HERO_SECTION.ctaInsta}</span>
            </motion.a>
            <motion.a
              href={`mailto:${SITE_CONFIG.email}`}
              className="btn btn-secondary"
              id="hero-email-btn"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <EmailIcon /><span>{HERO_SECTION.ctaEmail}</span>
            </motion.a>
          </div>

          {/* 4 — Stats */}
          <div
            className={item(4, styles.stats)}
            style={{ transitionDelay: `${STAGGER[4]}ms` }}
          >
            {STATS.map((s, i) => (
              <div key={s.label} style={{ display: 'contents' }}>
                {i > 0 && <div className={styles.statDivider} aria-hidden="true" />}
                <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 5 — Scroll hint */}
      <a
        href="#work"
        className={`${styles.scrollHint} ${styles.item} ${vis}`}
        style={{ transitionDelay: `${STAGGER[5]}ms` }}
        aria-label="Scroll to work"
      >
        <span className={styles.scrollLabel}>{HERO_SECTION.scrollLabel}</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <ChevronDown />
        </motion.span>
      </a>
    </section>
  );
}
