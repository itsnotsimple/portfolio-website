import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useAnimation } from 'framer-motion';
import type { MotionValue, MotionStyle } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTypewriter } from '../../hooks/useTypewriter';
import CountUp from '../ui/primitives/CountUp';
import ScrollParallax from '../ui/effects/ScrollParallax';
import styles from './Hero.module.css';
import { isMobileDevice as detectMobile } from '../../lib/device';


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

const isMobileDevice = detectMobile();

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

function Timecode() {
  const [frames, setFrames] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setFrames((f) => (f + 1) % 30);
    }, 33);
    return () => clearInterval(timer);
  }, []);
  const frameStr = frames.toString().padStart(2, '0');
  return <span className={styles.timecode}>00:18:24:{frameStr}</span>;
}

// ── Decorative right-column visual (desktop only) ─────────────────────────────
function HeroVisual({ mouseX, mouseY }: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
  const { language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const deckControls = useAnimation();

  // Floating particle field with mouse attraction and auto-drift
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = 520, H = 520;
    canvas.width = W;
    canvas.height = H;

    type P = { x: number; y: number; r: number; vx: number; vy: number; life: number; maxLife: number; hue: number; base: number };
    const spawn = (): P => ({
      x: 30 + Math.random() * 460,
      y: H + 5,
      r: 0.5 + Math.random() * 2.0,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.4 - Math.random() * 0.8,
      life: 0,
      maxLife: 120 + Math.random() * 200,
      hue: 180 + Math.random() * 45,
      base: 0.35 + Math.random() * 0.6,
    });
    const pts: P[] = Array.from({ length: 55 }, () => {
      const p = spawn();
      p.y = Math.random() * H;
      p.life = Math.random() * p.maxLife;
      return p;
    });

    let raf: number;
    let frame = 0;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;
      
      // Auto-drift offsets for background dust particles
      const driftX = Math.sin(frame * 0.008) * 80;
      const driftY = Math.cos(frame * 0.01) * 80;

      // Base mouse position + auto drift
      const mx = mouseX.get() * 260 + 260 + driftX;
      const my = mouseY.get() * 260 + 260 + driftY;

      for (const p of pts) {
        // Dynamic mouse attraction
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (1 - dist / 180) * 0.06;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Apply friction to keep movement smooth
        p.vx *= 0.98;
        p.vy = p.vy * 0.98 - 0.015;

        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const t = p.life / p.maxLife;
        const alpha = p.base * (t < 0.12 ? t / 0.12 : t > 0.82 ? (1 - t) / 0.18 : 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},85%,72%,${alpha.toFixed(3)})`;
        ctx.shadowColor = `hsla(${p.hue},100%,72%,${(alpha * 0.5).toFixed(3)})`;
        ctx.shadowBlur = p.r * 5;
        ctx.fill();

        if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > W + 10) {
          Object.assign(p, spawn());
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [mouseX, mouseY]);

  useEffect(() => {
    // 3D sequence start controls
    const runSequence = async () => {
      // Set initial
      deckControls.set({
        opacity: 0,
        rotateX: 42,
        rotateY: -48,
        scale: 0.84,
        z: -160
      });
      
      // Animate directly to tilted position
      await deckControls.start({
        opacity: 1,
        rotateX: 14,
        rotateY: -26,
        scale: 1,
        z: 0,
        transition: {
          duration: 2.6,
          ease: [0.25, 1, 0.3, 1],
          delay: 0.3,
        }
      });
      
      // Phase 2: Loop rotation
      deckControls.start({
        rotateX: [14, 16.5, 14, 11.5, 14],
        rotateY: [-26, -21, -26, -31, -26],
        transition: {
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.25, 0.5, 0.75, 1],
        }
      });
    };
    runSequence();
  }, [deckControls]);

  return (
    <div className={styles.visualWrap} style={{ perspective: 400, transformStyle: 'preserve-3d' }} aria-hidden="true">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className={styles.particleCanvas} aria-hidden="true" />

      {/* 3D Entrance Wrapper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute' }}
      >
        {/* Dot-grid background sitting deep */}
        <motion.div
          className={styles.visualGrid}
          animate={{
            z: [-80, -75, -80],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            z: -80,
          } as MotionStyle}
        />
        {/* Ambient glow */}
        <motion.div
          className={styles.visualGlow}
          animate={{
            z: [-100, -95, -100],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.4,
          }}
          style={{
            z: -100,
          } as MotionStyle}
        />

        {/* Main Timeline Deck */}
        <motion.div
          className={styles.timelineDeck}
          animate={deckControls}
          initial={{ opacity: 0, rotateX: 42, rotateY: -48, scale: 0.84, z: -160 }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          style={{
            transformStyle: 'preserve-3d',
            z: 10,
          } as MotionStyle}
        >
          {/* Holographic surface overlay */}
          <div className={styles.holoOverlay} aria-hidden="true" />
          {/* CRT scanlines */}
          <div className={styles.scanlines} aria-hidden="true" />

          {/* Timeline Header / Timecode */}
          <div className={styles.timelineHeader}>
            <div className={styles.timecodeContainer}>
              <div className={styles.statusDot} />
              <Timecode />
            </div>
            <div className={styles.timelineTitle}>Timeline_v1.prproj</div>
            <div className={styles.timelineControls}>
              <div className={styles.controlBtn}><span className={styles.playIcon} /></div>
              <div className={styles.controlSeparator} />
              <div className={styles.activeToolIndicator}>{language === 'bg' ? 'Рязане [C]' : 'Razor [C]'}</div>
            </div>
          </div>

          {/* Tracks Grid */}
          <div className={styles.tracksContainer}>
            {/* Timeline Ruler */}
            <div className={styles.timelineRuler}>
              <div className={styles.rulerTime}>00:00</div>
              <div className={styles.rulerTime}>05:00</div>
              <div className={styles.rulerTime}>10:00</div>
              <div className={styles.rulerTime}>15:00</div>
              <div className={styles.rulerTime}>20:00</div>
              <div className={styles.rulerTime}>25:00</div>
              <div className={styles.rulerTicks}>
                <div className={styles.rulerMarker} style={{ left: '26%' }} />
                <div className={styles.rulerMarker} style={{ left: '53%' }} />
                <div className={styles.rulerMarker} style={{ left: '78%' }} />
              </div>
            </div>

            {/* V2 Track */}
            <div className={styles.trackRow}>
              <div className={styles.trackHeader}>
                <span className={styles.trackLabel}>V2</span>
                <div className={styles.trackHeaderControls}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.trackHeaderIcon}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.trackHeaderIcon}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
              </div>
              <div className={styles.trackTimeline}>
                <div className={`${styles.clip} ${styles.clipGrade}`} style={{ left: '15%', width: '70%' }}>
                  <span className={styles.clipText}>{language === 'bg' ? 'Цветови корекции / LUTs' : 'Grade / LUTS'}</span>
                </div>
              </div>
            </div>

            {/* V1 Track */}
            <div className={styles.trackRow}>
              <div className={styles.trackHeader}>
                <span className={styles.trackLabel}>V1</span>
                <div className={styles.trackHeaderControls}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.trackHeaderIcon}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.trackHeaderIcon}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
              </div>
              <div className={styles.trackTimeline}>
                <div className={`${styles.clip} ${styles.clipVfx}`} style={{ left: '5%', width: '30%' }}>
                  <span className={styles.clipText}>VFX_Intro.mp4</span>
                </div>
                <div className={`${styles.clip} ${styles.clipVideo}`} style={{ left: '38%', width: '45%' }}>
                  <span className={styles.clipText}>B-Roll_A_Cut.mov</span>
                </div>
              </div>
            </div>

            {/* A1 Track (Audio visualizer) */}
            <div className={styles.trackRow}>
              <div className={styles.trackHeader}>
                <span className={styles.trackLabel}>A1</span>
                <div className={styles.trackHeaderControls}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.trackHeaderIcon}>
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  </svg>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.trackHeaderIcon}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
              </div>
              <div className={styles.trackTimeline} style={{ display: 'flex', alignItems: 'center', gap: '2px', paddingLeft: '5%', paddingRight: '5%' }}>
                <div className={styles.audioWaveContainer}>
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className={styles.waveBar}
                      style={{
                        height: `${14 + Math.sin(i * 0.5) * 11}px`,
                        animationDelay: `${i * 0.08}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Vertical Playhead line */}
            <motion.div
              className={styles.playheadLine}
              animate={{ left: ['5%', '95%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              <div className={styles.playheadHeader}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 12h20L12 2z"/>
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Floating 3D Program Monitor Preview Window */}
          <motion.div
            className={styles.programMonitor}
            style={{
              position: 'absolute',
              top: '-35%',
              left: '-8%',
            } as MotionStyle}
            animate={{
              z: [120, 132, 120],
              y: [0, -4, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          >
            <div className={styles.monitorHoverContainer}>
              <div className={styles.monitorWrapper}>
                <div className={styles.monitorHeader}>
                  <div className={styles.monitorRec}>
                    <span className={styles.recDot} />
                    <span>REC</span>
                  </div>
                  <div className={styles.monitorRes}>4K 60</div>
                </div>
                
                <div className={styles.monitorScreen}>
                  <div className={styles.screenGrid} />
                  <div className={styles.screenGlow} />
                  <div className={styles.screenWave} />
                  <div className={styles.monitorPlayBtn}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6 3 20 12 6 21 6 3"/>
                    </svg>
                  </div>
                </div>
                
                <div className={styles.monitorFooter}>
                  <span className={styles.monitorTimecode}>00:18:24:12</span>
                  <span className={styles.monitorStatus}>PRVW</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating 3D widgets nested inside the rotating deck to share rotation and tilt */}

          {/* Transitions Badge (Top Right) */}
          <motion.div
            className={styles.toolBadge}
            style={{
              position: 'absolute',
              top: '-12%',
              right: '-10%',
            } as MotionStyle}
            animate={{
              z: [180, 195, 180],
              y: [0, -6, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className={styles.badgeHoverContainer}>
              <div className={`${styles.badgeWrapper} ${styles.badgeFloat1}`}>
                <div className={styles.badgeLine} />
                <div className={styles.badgeIconWrapper} style={{ color: '#0dd3f0', background: 'rgba(13,211,240,0.1)', border: '1px solid rgba(13,211,240,0.25)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="3" width="7" height="9" rx="1" />
                    <rect x="14" y="12" width="7" height="9" rx="1" />
                    <path d="M10 8h4v8h-4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                  </svg>
                </div>
                <div>
                  <div className={styles.badgeVal}>Transitions</div>
                  <div className={styles.badgeSub}>{language === 'bg' ? 'Гладки преходи' : 'Smooth Cuts'}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Speed Ramp Badge (Middle Right) */}
          <motion.div
            className={styles.toolBadge}
            style={{
              position: 'absolute',
              top: '42%',
              right: '-14%',
            } as MotionStyle}
            animate={{
              z: [130, 142, 130],
              y: [0, 5, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          >
            <div className={styles.badgeHoverContainer}>
              <div className={`${styles.badgeWrapper} ${styles.badgeFloat2}`}>
                <div className={styles.badgeLine} style={{ background: 'linear-gradient(90deg, transparent, rgba(37,150,190,0.7), transparent)' }} aria-hidden="true" />
                <div className={styles.badgeIconWrapper} style={{ color: '#2596be', background: 'rgba(37,150,190,0.1)', border: '1px solid rgba(37,150,190,0.25)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 19c6 0 8-14 18-14" />
                    <circle cx="3" cy="19" r="2" fill="currentColor" />
                    <circle cx="11" cy="12" r="2" fill="currentColor" />
                    <circle cx="21" cy="5" r="2" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <div className={styles.badgeVal}>Speed Ramp</div>
                  <div className={styles.badgeSub}>{language === 'bg' ? 'Скоростна крива' : 'Velocity Curve'}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sound Design Badge (Bottom Left) */}
          <motion.div
            className={styles.toolBadge}
            style={{
              position: 'absolute',
              bottom: '-12%',
              left: '-10%',
            } as MotionStyle}
            animate={{
              z: [200, 212, 200],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2,
            }}
          >
            <div className={styles.badgeHoverContainer}>
              <div className={`${styles.badgeWrapper} ${styles.badgeFloat3}`}>
                <div className={styles.badgeLine} />
                <div className={styles.badgeIconWrapper} style={{ color: '#0dd3f0', background: 'rgba(13,211,240,0.08)', border: '1px solid rgba(13,211,240,0.22)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                </div>
                <div>
                  <div className={styles.badgeVal}>Sound Design</div>
                  <div className={styles.badgeSub}>{language === 'bg' ? 'Звуков дизайн' : 'SFX & Beats'}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
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
          {!isMobileDevice && (
            <div className={styles.right}>
              <ScrollParallax speed={18}>
                <HeroVisual mouseX={smoothX} mouseY={smoothY} />
              </ScrollParallax>
            </div>
          )}

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
