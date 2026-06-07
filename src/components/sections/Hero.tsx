import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { MotionValue, MotionStyle } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTypewriter } from '../../hooks/useTypewriter';
import CountUp from '../ui/primitives/CountUp';
import ScrollParallax from '../ui/effects/ScrollParallax';
import styles from './Hero.module.css';


const STAGGER = [0, 0, 0, 0, 0, 0] as const;

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

const isMobileDevice = typeof window !== 'undefined' && (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768);

function TypewriterText() {
  const { content } = useLanguage();
  const { text, isWaiting } = useTypewriter(content.TYPEWRITER_WORDS);
  return (
    <span className={styles.typeLine} aria-live="polite">
      <span className={styles.typeText}>{text || ' '}</span>
      <span className={`${styles.cursor} ${isWaiting ? styles.cursorBlink : ''}`} aria-hidden="true">|</span>
    </span>
  );
}


function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className={styles.stat}>
      <div className={styles.statNum}>
        <CountUp from={0} to={value} duration={1.5} delay={0} />
        <span className={styles.statSuffix}>{suffix}</span>
      </div>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

// ── Decorative right-column visual (desktop only) ─────────────────────────────
function HeroVisual({ mouseX, mouseY }: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
  const { content } = useLanguage();
  const { HERO_SECTION } = content;

  // Proportional translations for dynamic layering
  const gridX = useTransform(mouseX, (x) => x * 12);
  const gridY = useTransform(mouseY, (y) => y * 12);
  
  const glowX = useTransform(mouseX, (x) => x * 18);
  const glowY = useTransform(mouseY, (y) => y * 18);

  // 3D rotations for concentric rings
  const ringRotateX = useTransform(mouseY, (y) => y * -12);
  const ringRotateY = useTransform(mouseX, (x) => x * 12);

  const ring1X = useTransform(mouseX, (x) => x * 8);
  const ring1Y = useTransform(mouseY, (y) => y * 8);

  const ring2X = useTransform(mouseX, (x) => x * -14);
  const ring2Y = useTransform(mouseY, (y) => y * -14);

  const ring3X = useTransform(mouseX, (x) => x * 18);
  const ring3Y = useTransform(mouseY, (y) => y * 18);

  const playBtnX = useTransform(mouseX, (x) => x * 26);
  const playBtnY = useTransform(mouseY, (y) => y * 26);

  // Proportional card offsets
  const card1X = useTransform(mouseX, (x) => x * 36);
  const card1Y = useTransform(mouseY, (y) => y * 36);

  const card2X = useTransform(mouseX, (x) => x * -30);
  const card2Y = useTransform(mouseY, (y) => y * -30);

  const card3X = useTransform(mouseX, (x) => x * 44);
  const card3Y = useTransform(mouseY, (y) => y * 44);

  return (
    <div className={styles.visualWrap} style={{ perspective: 1200, transformStyle: 'preserve-3d' }} aria-hidden="true">
      {/* Dot-grid background fading from center */}
      <motion.div className={styles.visualGrid} style={{ x: gridX, y: gridY }} />
      {/* Ambient glow */}
      <motion.div className={styles.visualGlow} style={{ x: glowX, y: glowY }} />

      {/* Concentric rings — 3D tilting container */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          rotateX: ringRotateX,
          rotateY: ringRotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div className={styles.ring1} style={{ x: ring1X, y: ring1Y, z: 15 } as MotionStyle} />
        <motion.div className={styles.ring2} style={{ x: ring2X, y: ring2Y, z: -10 } as MotionStyle} />
        <motion.div className={styles.ring3} style={{ x: ring3X, y: ring3Y, z: 30 } as MotionStyle} />
      </motion.div>

      {/* Center play button with pulsing glow */}
      <motion.div
        className={styles.ringCenter}
        style={{
          x: playBtnX,
          y: playBtnY,
          z: 50,
        } as MotionStyle}
        animate={{
          boxShadow: [
            '0 0 18px rgba(37,150,190,0.28), 0 0 50px rgba(37,150,190,0.07)',
            '0 0 38px rgba(37,150,190,0.52), 0 0 90px rgba(37,150,190,0.18)',
            '0 0 18px rgba(37,150,190,0.28), 0 0 50px rgba(37,150,190,0.07)',
          ],
        }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
          <path d="M5 3l14 9-14 9V3z" fill="#2596be" />
        </svg>
      </motion.div>

      {/* Floating stat cards — premium rectangular design */}

      {/* Top-right: Projects */}
      <motion.div
        style={{
          position: 'absolute',
          top: '4%',
          right: '2%',
          x: card1X,
          y: card1Y,
          z: 70,
        } as MotionStyle}
      >
        <div className={`${styles.statCard} ${styles.statCardFloat1}`}>
          <div className={styles.statCardLine} style={{ background: 'linear-gradient(90deg, transparent, rgba(13,211,240,0.7), transparent)' }} aria-hidden="true" />
          <div className={styles.statCardIcon} style={{ color: '#0dd3f0', background: 'rgba(13,211,240,0.1)', border: '1px solid rgba(13,211,240,0.25)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
            </svg>
          </div>
          <div>
            <div className={styles.statCardValue}>300+</div>
            <div className={styles.statCardLabel}>{HERO_SECTION.visualProjects}</div>
          </div>
        </div>
      </motion.div>

      {/* Right-middle: 4K Quality */}
      <motion.div
        style={{
          position: 'absolute',
          top: '42%',
          right: '-6%',
          x: card2X,
          y: card2Y,
          z: 60,
        } as MotionStyle}
      >
        <div className={`${styles.statCard} ${styles.statCardFloat2}`}>
          <div className={styles.statCardLine} style={{ background: 'linear-gradient(90deg, transparent, rgba(37,150,190,0.7), transparent)' }} aria-hidden="true" />
          <div className={styles.statCardIcon} style={{ color: '#2596be', background: 'rgba(37,150,190,0.1)', border: '1px solid rgba(37,150,190,0.25)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
            </svg>
          </div>
          <div>
            <div className={styles.statCardValue}>4K</div>
            <div className={styles.statCardLabel}>{HERO_SECTION.visualQuality}</div>
          </div>
        </div>
      </motion.div>

      {/* Bottom-left: Tools */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '4%',
          left: '4%',
          x: card3X,
          y: card3Y,
          z: 80,
        } as MotionStyle}
      >
        <div className={`${styles.statCard} ${styles.statCardFloat3}`}>
          <div className={styles.statCardLine} style={{ background: 'linear-gradient(90deg, transparent, rgba(13,211,240,0.6), transparent)' }} aria-hidden="true" />
          <div className={styles.statCardIcon} style={{ color: '#0dd3f0', background: 'rgba(13,211,240,0.08)', border: '1px solid rgba(13,211,240,0.22)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <div>
            <div className={styles.statCardValue}>Pr · Ae</div>
            <div className={styles.statCardLabel}>& CC</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const { content } = useLanguage();
  const { SITE_CONFIG, STATS, HERO_SECTION } = content;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 140, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobileDevice) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const xVal = (clientX - centerX) / (width / 2);
    const yVal = (clientY - centerY) / (height / 2);
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const item = (_i: number, extra = '') =>
    `${styles.item} ${styles.visible} ${extra}`.trim();


  return (
    <section
      className={styles.hero}
      id="hero"
      aria-label="Hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className={styles.content}>
        <div className={styles.inner}>

          {/* ── LEFT COLUMN — all text content ─────────────────── */}
          <div className={styles.left}>
            <ScrollParallax speed={-18} style={{ display: 'flex', flexDirection: 'column', alignItems: 'inherit', gap: '1.5rem', width: '100%' }}>
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
                {isMobileDevice ? (
                  <>
                    <a
                      href={SITE_CONFIG.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      id="hero-insta-btn"
                    >
                      <InstaIcon /><span>{HERO_SECTION.ctaInsta}</span>
                    </a>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="btn btn-secondary"
                      id="hero-email-btn"
                    >
                      <EmailIcon /><span>{HERO_SECTION.ctaEmail}</span>
                    </a>
                  </>
                ) : (
                  <>
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
                  </>
                )}
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
            </ScrollParallax>
          </div>

          {/* ── RIGHT COLUMN — decorative visual, desktop only ─── */}
          <div className={styles.right}>
            <ScrollParallax speed={18}>
              <HeroVisual mouseX={smoothX} mouseY={smoothY} />
            </ScrollParallax>
          </div>

        </div>
      </div>

      {/* 5 — Scroll hint */}
      <a
        href="#work"
        className={`${styles.scrollHint} ${styles.item} ${styles.visible}`}
        style={{ transitionDelay: `${STAGGER[5]}ms` }}
        aria-label="Scroll to work"
      >
        <span className={styles.scrollLabel}>{HERO_SECTION.scrollLabel}</span>
        {isMobileDevice ? (
          <span><ChevronDown /></span>
        ) : (
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
            <ChevronDown />
          </motion.span>
        )}
      </a>
    </section>
  );
}
