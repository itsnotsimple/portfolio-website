import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import CountUp from '../ui/CountUp';
import ProfileCard from '../ui/ProfileCard';
import ScrollReveal from '../ui/ScrollReveal';
import ScrollParallax from '../ui/ScrollParallax';
import alexPhoto from '../assets/453769781_1145851049814387_2954952142584413301_n-removebg-preview.webp';
import aeLogo from '../assets/aeLogo.webp';
import psLogo from '../assets/psLogo.webp';
import prLogo from '../assets/prLogo.webp';
import ccLogo from '../assets/ccLogo.webp';
import topazLogo from '../assets/topazLogo.webp';



const instagramSvg = (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const SKILLS = [
  { name: 'Premiere Pro',  pct: 98, color: '#0dd3f0', trackColor: 'rgba(13,211,240,0.12)' },
  { name: 'After Effects', pct: 90, color: '#3ab8e2', trackColor: 'rgba(58,184,226,0.12)' },
  { name: 'CapCut',        pct: 85, color: '#2ecc71', trackColor: 'rgba(46,204,113,0.10)' },
];

const TOOL_LOGOS = [
  { label: 'Premiere Pro',  img: prLogo },
  { label: 'After Effects', img: aeLogo },
  { label: 'CapCut Pro',    img: ccLogo },
  { label: 'Photoshop',     img: psLogo },
  { label: 'Topaz AI',      img: topazLogo },
];

function ToolLogoTile({ img, label }: typeof TOOL_LOGOS[0]) {
  return (
    <div
      title={label}
      aria-label={label}
      style={{
        width: '44px', height: '44px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, userSelect: 'none',
      }}
    >
      <img
        src={img}
        alt={label}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
        loading="lazy"
      />
    </div>
  );
}

function ToolsMarquee() {
  const tiles = TOOL_LOGOS.map((tile, i) => (
    <ToolLogoTile key={i} {...tile} />
  ));

  return (
    <div style={{
      width: '100%', maxWidth: '400px', margin: '0 auto', overflow: 'hidden', display: 'flex',
      maskImage: 'linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)',
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 60px, black calc(100% - 60px), transparent 100%)',
    }}>
      <div style={{
        display: 'flex', width: 'max-content', gap: '32px',
        animation: 'marqueeLeft 28s linear infinite',
        willChange: 'transform',
      }}>
        {tiles}
        {tiles}
      </div>
    </div>
  );
}

function SkillBars() {
  return (
    <div style={{ width: '100%', maxWidth: '100%', marginBottom: '1.5rem', boxSizing: 'border-box' }}>
      {SKILLS.map((skill, i) => (
        <div key={skill.name} style={{ marginBottom: i < SKILLS.length - 1 ? '0.85rem' : 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.32rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#8fb8cc', letterSpacing: '0.01em' }}>
              {skill.name}
            </span>
            <motion.span
              style={{ fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 700, color: skill.color, letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'baseline', gap: '1px' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.12 + 0.15 }}
            >
              <CountUp from={0} to={skill.pct} duration={1.1} delay={i * 0.1 + 0.2} />
              <span>%</span>
            </motion.span>
          </div>
          <div style={{ height: '4px', borderRadius: '2px', background: skill.trackColor, overflow: 'hidden', position: 'relative' }}>
            <motion.div
              style={{
                height: '100%', borderRadius: '2px',
                background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                boxShadow: `0 0 8px ${skill.color}66`,
              }}
              initial={{ width: '0%' }}
              whileInView={{ width: `${skill.pct}%` }}
              viewport={{ once: true, margin: '0px' }}
              transition={{ duration: 1.1, delay: i * 0.1 + 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function About() {
  const { content } = useLanguage();
  const { ABOUT, SITE_CONFIG } = content;
  const tools = ABOUT.tools;

  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      style={{ padding: 'var(--section-py) 0', background: 'transparent', position: 'relative', overflowX: 'clip' }}
    >
      {/* Gradient top divider */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, left: '8%', right: '8%', height: '1px', pointerEvents: 'none',
          background: 'linear-gradient(90deg, transparent, rgba(37,150,190,0.35) 50%, transparent)',
        }}
      />

      {/* Section number watermark */}
      <ScrollParallax speed={-20} style={{ position: 'absolute', right: '-0.05em', top: '-0.1em', pointerEvents: 'none', zIndex: 0 } as any}>
        <span
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(7rem, 18vw, 13rem)',
            fontWeight: 400, color: 'var(--primary)', opacity: 0.06,
            lineHeight: 1, userSelect: 'none', letterSpacing: '-0.02em',
            display: 'block',
          }}
        >03</span>
      </ScrollParallax>

      {/* Ambient side glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 50% 50% at 8% 50%, rgba(37,150,190,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="container">

        {/* Section header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-tag">{ABOUT.tag}</span>
          <h2 className="section-title" id="about-heading">
            {ABOUT.heading}{' '}
            <span className="text-gradient">{ABOUT.headingAccent}</span>
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="about-grid">

          {/* Left — ProfileCard with floating achievement chips */}
          <ScrollParallax speed={15} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' } as any}>
            <motion.div
              style={{
                position: 'relative',
                display: 'flex', justifyContent: 'center',
                maxWidth: 'min(100%, 400px)', width: '100%',
                transformPerspective: 1200,
              }}
              initial={{ opacity: 0, rotateY: -32, rotateX: 14, scale: 0.78, y: 90 }}
              whileInView={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ type: 'spring', damping: 18, stiffness: 55, mass: 1.1, opacity: { duration: 0.4, ease: 'easeOut' } }}
            >
              {/* Card ambient glow */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: '-30px',
                  background: 'radial-gradient(circle at 50% 60%, rgba(37,150,190,0.35) 0%, rgba(37,150,190,0.06) 55%, transparent 70%)',
                  filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none',
                  animation: 'glowPulse 4s ease-in-out infinite',
                }}
              />

              <ProfileCard
                avatarUrl={alexPhoto}
                name="Alex"
                title="Video Editor"
                handle="alex.cc077"
                status="Available"
                contactText="Work with me"
                showUserInfo
                enableTilt={true}
                behindGlowEnabled
                behindGlowColor="rgba(37, 150, 190, 0.38)"
                innerGradient="linear-gradient(145deg, #0a2a3a8c 0%, #2596be44 100%)"
                onContactClick={() => { window.location.href = '#contact'; }}
              />
            </motion.div>
          </ScrollParallax>

          {/* Right — Text content */}
          <ScrollParallax speed={-8} style={{ width: '100%' } as any}>
            <motion.div
              className="about-text-side"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            >
              {ABOUT.paragraphs.map((p, i) => (
                <ScrollReveal
                  key={i}
                  baseOpacity={0}
                  enableBlur
                  baseRotation={1}
                  blurStrength={4}
                  textClassName="para-text"
                  threshold={0.1}
                >
                  {p}
                </ScrollReveal>
              ))}

              <SkillBars />

              <div className="about-tools-grid">
                {tools.map(tool => (
                  <span
                    key={tool}
                    style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 500,
                      padding: '0.28rem 0.75rem', borderRadius: 'var(--radius-sm)',
                      background: 'linear-gradient(135deg, rgba(37,150,190,0.12) 0%, rgba(131,80,232,0.07) 100%)',
                      border: '1px solid rgba(37,150,190,0.26)',
                      color: 'var(--primary-light)',
                      transition: 'border-color 0.28s ease, box-shadow 0.28s ease',
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="about-cta-row">
                <motion.a
                  href="#contact"
                  className="btn btn-primary"
                  id="about-contact-btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.22 }}
                >
                  <span>{ABOUT.ctaWork}</span>
                </motion.a>
                <motion.a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  id="about-instagram-btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.22 }}
                >
                  {instagramSvg}
                  <span>{ABOUT.ctaSocial}</span>
                </motion.a>
              </div>
            </motion.div>
          </ScrollParallax>
        </div>

        {/* Tool logo marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            marginTop: '3.5rem',
            padding: '1rem 0',
          }}
        >
          <ToolsMarquee />
        </motion.div>
      </div>
    </section>
  );
}
