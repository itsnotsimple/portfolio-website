import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

import ElectricBorder from '../ui/effects/ElectricBorder';
import ScrollReveal from '../ui/effects/ScrollReveal';
import ScrollParallax from '../ui/effects/ScrollParallax';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,12 2,6"/>
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 20, z: -60 },
  show: { opacity: 1, y: 0, rotateX: 0, z: 0, transition: { type: 'spring', stiffness: 90, damping: 14 } },
} as const;

interface TiltCardProps {
  href: string;
  id: string;
  ariaLabel: string;
  glowGradient: string;
  glowBase: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  actionText: string;
  actionColor: string;
  variants: typeof cardVariants;
  spotlightGlow: string;
  delayBob: number;
  cardBorderColor: string;
  iconBg: string;
  iconShadow: string;
  iconGlowAnimation: { boxShadow: string[] };
}

function TiltCard({
  href, id, ariaLabel,
  glowGradient, glowBase,
  icon, title, desc, actionText, actionColor,
  variants, spotlightGlow, delayBob,
  cardBorderColor, iconBg, iconShadow,
  iconGlowAnimation,
}: TiltCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springConfig = { damping: 22, stiffness: 180, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), springConfig);
  const spotlightX = useSpring(useTransform(x, [0, 1], [-60, 260]), springConfig);
  const spotlightY = useSpring(useTransform(y, [0, 1], [-60, 260]), springConfig);
  const yOffset = useMotionValue(0);

  useEffect(() => {
    const controls = animate(yOffset, [0, -8, 0], {
      duration: 5, repeat: Infinity, ease: 'easeInOut', delay: delayBob,
    });
    return () => controls.stop();
  }, [yOffset, delayBob]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => { x.set(0.5); y.set(0.5); };

  return (
    <motion.a
      ref={cardRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      id={id}
      aria-label={ariaLabel}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX, rotateY, y: yOffset,
        transformStyle: 'preserve-3d',
        position: 'relative',
        background: 'var(--bg-card)',
        border: `1px solid ${cardBorderColor}`,
        borderRadius: 'var(--radius-xl)',
        padding: '2.2rem 1.7rem',
        textAlign: 'left',
        overflow: 'hidden',
        display: 'block',
        backdropFilter: 'blur(10px)',
      }}
      whileTap={{ scale: 0.94 }}
    >
      {/* Spotlight cursor-follow */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute', width: '320px', height: '320px',
          borderRadius: '50%', pointerEvents: 'none', zIndex: 1,
          transform: 'translate(-50%, -50%)',
          left: spotlightX, top: spotlightY,
          background: spotlightGlow,
        }}
      />

      {/* Corner ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', width: '220px', height: '220px',
          borderRadius: '50%', top: '-70px', right: '-70px',
          pointerEvents: 'none',
          background: glowGradient,
          transition: 'transform 0.55s ease',
        }}
      />

      {/* Top gradient line */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '1.5rem', right: '1.5rem', height: '1px',
        background: glowBase,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, transform: 'translateZ(40px)', transformStyle: 'preserve-3d', pointerEvents: 'none' }}>
        {/* Icon */}
        <motion.div
          style={{
            width: '56px', height: '56px', borderRadius: 'var(--radius)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '1.4rem', background: iconBg,
            boxShadow: iconShadow, color: 'white',
          }}
          animate={iconGlowAnimation}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
        >
          {icon}
        </motion.div>

        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>
          {title}
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', color: '#8fb8cc', fontSize: '0.87rem', lineHeight: 1.68, marginBottom: '1.4rem' }}>
          {desc}
        </p>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 600, color: actionColor }}>
          <span>{actionText}</span>
          <ArrowIcon />
        </span>
      </div>
    </motion.a>
  );
}

export default function Contact() {
  const { content } = useLanguage();
  const { SITE_CONFIG, CONTACT_SECTION } = content;

  return (
    <section
      style={{ padding: 'var(--section-py) 0', position: 'relative', overflowX: 'clip', background: 'transparent' }}
      aria-labelledby="contact-heading"
    >
      {/* Gradient top divider */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '8%', right: '8%', height: '1px', pointerEvents: 'none', zIndex: 1,
        background: 'linear-gradient(90deg, transparent, rgba(37,150,190,0.35) 50%, transparent)',
      }} />

      {/* Section number watermark */}
      <ScrollParallax speed={-55} style={{ position: 'absolute', right: '-0.05em', top: '-0.1em', pointerEvents: 'none', zIndex: 0 }}>
        <span aria-hidden="true" style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(7rem, 18vw, 13rem)',
          fontWeight: 400, color: 'var(--primary)', opacity: 0.06,
          lineHeight: 1, userSelect: 'none', letterSpacing: '-0.02em',
          display: 'block',
        }}>06</span>
      </ScrollParallax>

      {/* Vertical scan line — sweeps top to bottom */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute', left: 0, right: 0, height: '140px', pointerEvents: 'none', zIndex: 0,
          background: 'linear-gradient(to bottom, transparent, rgba(37,150,190,0.04) 35%, rgba(37,150,190,0.08) 50%, rgba(37,150,190,0.04) 65%, transparent)',
        }}
        animate={{ y: ['-140px', 'calc(100% + 140px)'] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
      />

      {/* Background gradient glows */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 55% at 50% 0%, rgba(37,150,190,0.10) 0%, transparent 60%),
          radial-gradient(ellipse 40% 60% at 0% 50%, rgba(37,150,190,0.04) 0%, transparent 65%)
        `,
      }} />

      <div className="container">
        <motion.div
          style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65 }}
        >
          <span className="section-tag">{CONTACT_SECTION.tag}</span>
          <h2
            style={{
              fontFamily: 'var(--font-head)',
              fontSize: 'clamp(2.4rem, 7vw, 4.2rem)',
              fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1,
              marginBottom: '1rem', overflow: 'visible', paddingBottom: '0.05em',
            }}
            id="contact-heading"
          >
            {CONTACT_SECTION.heading}{' '}
            <span className="text-gradient">{CONTACT_SECTION.headingAccent}</span>
          </h2>
          <ScrollReveal
            baseOpacity={0}
            enableBlur
            blurStrength={4}
            style={{
              fontFamily: 'var(--font-body)',
              color: '#8fb8cc',
              fontSize: '1.02rem',
              lineHeight: 1.78,
              marginBottom: '3rem',
              textAlign: 'center',
            }}
          >
            {CONTACT_SECTION.subtitle}
          </ScrollReveal>

          <motion.div
            className="contact-card-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-45px' }}
          >
            {/* Instagram card */}
            <ScrollParallax speed={-25}>
              <ElectricBorder color="#bc2a8d" speed={0.9} chaos={0.01} borderRadius={20} noGlow>
                <TiltCard
                  href={SITE_CONFIG.instagramUrl}
                  id="contact-instagram-card"
                  ariaLabel="Visit Instagram"
                  glowGradient="radial-gradient(circle, rgba(188,42,141,0.14) 0%, transparent 65%)"
                  glowBase="linear-gradient(90deg, transparent, rgba(188,42,141,0.55), transparent)"
                  icon={<InstagramIcon />}
                  title={CONTACT_SECTION.instaTitle}
                  desc={CONTACT_SECTION.instaDesc}
                  actionText={SITE_CONFIG.instagramHandle}
                  actionColor="var(--primary-light)"
                  variants={cardVariants}
                  spotlightGlow="radial-gradient(circle, rgba(188,42,141,0.22) 0%, transparent 70%)"
                  delayBob={0}
                  cardBorderColor="var(--border)"
                  iconBg="linear-gradient(135deg, #f09433, #e6683c, #bc2a8d, #833ab4)"
                  iconShadow="0 4px 22px rgba(188,42,141,0.28)"
                  iconGlowAnimation={{ boxShadow: ['0 4px 15px rgba(188,42,141,0.2)', '0 4px 25px rgba(188,42,141,0.65), 0 0 15px rgba(188,42,141,0.3)'] }}
                />
              </ElectricBorder>
            </ScrollParallax>

            {/* Email card */}
            <ScrollParallax speed={25}>
              <ElectricBorder color="#2596be" speed={0.9} chaos={0.01} borderRadius={20} noGlow>
                <TiltCard
                  href={`mailto:${SITE_CONFIG.email}`}
                  id="contact-email-card"
                  ariaLabel="Send email"
                  glowGradient="radial-gradient(circle, rgba(37,150,190,0.14) 0%, transparent 65%)"
                  glowBase="linear-gradient(90deg, transparent, rgba(37,150,190,0.55), transparent)"
                  icon={<EmailIcon />}
                  title={CONTACT_SECTION.emailTitle}
                  desc={CONTACT_SECTION.emailDesc}
                  actionText={SITE_CONFIG.email}
                  actionColor="var(--primary-light)"
                  variants={cardVariants}
                  spotlightGlow="radial-gradient(circle, rgba(37,150,190,0.22) 0%, transparent 70%)"
                  delayBob={2.5}
                  cardBorderColor="var(--border)"
                  iconBg="linear-gradient(135deg, var(--primary-dark), var(--primary-light))"
                  iconShadow="0 4px 22px var(--primary-glow)"
                  iconGlowAnimation={{ boxShadow: ['0 4px 15px rgba(37,150,190,0.2)', '0 4px 25px rgba(37,150,190,0.65), 0 0 15px rgba(37,150,190,0.3)'] }}
                />
              </ElectricBorder>
            </ScrollParallax>
          </motion.div>

          {/* Response time badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.85rem',
            padding: '0.55rem 1.1rem 0.55rem 0.85rem',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(46,204,113,0.07) 0%, rgba(4,9,18,0.82) 60%)',
            border: '1px solid rgba(46,204,113,0.18)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 2px 16px rgba(46,204,113,0.07), inset 0 1px 0 rgba(46,204,113,0.07)',
          }}>
            {/* Animated signal bars */}
            <div aria-hidden="true" style={{ display: 'flex', alignItems: 'flex-end', gap: '2.5px', height: '14px', flexShrink: 0 }}>
              {([5, 8, 11, 14] as const).map((h, i) => (
                <div key={i} style={{
                  width: '3px',
                  height: `${h}px`,
                  borderRadius: '1.5px',
                  background: '#2ecc71',
                  boxShadow: '0 0 4px rgba(46,204,113,0.5)',
                  animation: `signalBar 1.5s ease-in-out ${i * 0.18}s infinite`,
                }} />
              ))}
            </div>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: 500,
              color: 'rgba(200, 235, 210, 0.8)',
              letterSpacing: '0.02em',
            }}>
              {SITE_CONFIG.responseTime}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
