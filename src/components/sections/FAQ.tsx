import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import FAQItem from '../ui/primitives/FAQItem';
import ScrollReveal from '../ui/effects/ScrollReveal';
import ScrollParallax from '../ui/effects/ScrollParallax';


function MiniRadar() {
  return (
    <div
      className="faq-mini-radar"
      style={{ position: 'relative', width: '200px', height: '200px', marginTop: '2.5rem', flexShrink: 0 }}
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: '-20px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,150,190,0.12) 0%, transparent 65%)',
        filter: 'blur(15px)',
      }} />

      {/* Ring 1 — outer slow spin */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        border: '1px dashed rgba(37,150,190,0.18)',
        animation: 'spinCW 55s linear infinite',
      }} />

      {/* Ring 2 — middle counter-spin */}
      <div style={{
        position: 'absolute', inset: '28px', borderRadius: '50%',
        border: '1px dashed rgba(37,150,190,0.20)',
        animation: 'spinCCW 38s linear infinite',
      }} />

      {/* Ring 3 — inner fast */}
      <div style={{
        position: 'absolute', inset: '56px', borderRadius: '50%',
        border: '1px solid rgba(37,150,190,0.42)',
        boxShadow: '0 0 18px rgba(37,150,190,0.07) inset',
        animation: 'spinCW 22s linear infinite',
      }} />

      {/* Center — question mark icon */}
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        animate={{
          boxShadow: [
            '0 0 0 transparent',
            '0 0 0 transparent',
          ],
        }}
      >
        <motion.div
          style={{
            width: '68px', height: '68px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,150,190,0.22) 0%, rgba(4,8,12,0.96) 100%)',
            border: '1px solid rgba(37,150,190,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 12px rgba(37,150,190,0.04), 0 0 0 24px rgba(37,150,190,0.025)',
          }}
          animate={{
            boxShadow: [
              '0 0 18px rgba(37,150,190,0.28), 0 0 50px rgba(37,150,190,0.07)',
              '0 0 38px rgba(37,150,190,0.52), 0 0 90px rgba(37,150,190,0.18)',
              '0 0 18px rgba(37,150,190,0.28), 0 0 50px rgba(37,150,190,0.07)',
            ],
          }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            viewBox="0 0 24 24" fill="none" stroke="#2596be"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            width="28" height="28"
          >
            <circle cx="12" cy="12" r="10" opacity="0.4" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function FAQ() {
  const { content } = useLanguage();
  const { FAQ_ITEMS, FAQ_SECTION } = content;

  return (
    <section
      style={{
        padding: 'var(--section-py) 0',
        background: 'rgba(5,10,16,0.22)',
        position: 'relative', overflowX: 'clip',
      }}
      aria-labelledby="faq-heading"
    >
      {/* Gradient top divider */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '8%', right: '8%', height: '1px', pointerEvents: 'none',
        background: 'linear-gradient(90deg, transparent, rgba(37,150,190,0.30) 50%, transparent)',
      }} />

      {/* Section number watermark */}
      <ScrollParallax speed={-20} style={{ position: 'absolute', right: '-0.05em', top: '-0.1em', pointerEvents: 'none', zIndex: 0 }}>
        <span aria-hidden="true" style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(7rem, 18vw, 13rem)',
          fontWeight: 400, color: 'var(--primary)', opacity: 0.06,
          lineHeight: 1, userSelect: 'none', letterSpacing: '-0.02em',
          display: 'block',
        }}>05</span>
      </ScrollParallax>

      {/* Background ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: '-80px -60px', pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 40%, rgba(37,150,190,0.05) 0%, transparent 65%)',
      }} />

      <div className="container">
        <div className="faq-split">

          {/* LEFT — Sticky header + mini radar */}
          <motion.div
            className="faq-sticky-col"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">{FAQ_SECTION.tag}</span>

            <h2
              className="section-title faq-header-title"
              id="faq-heading"
              style={{ marginTop: '0.5rem', marginBottom: '0.75rem' }}
            >
              {FAQ_SECTION.heading}{' '}
              <span className="text-gradient">{FAQ_SECTION.headingAccent}</span>
            </h2>

            <ScrollReveal
              baseOpacity={0}
              enableBlur
              blurStrength={4}
              style={{
                color: '#8fb8cc',
                fontSize: '0.97rem',
                lineHeight: 1.76,
                fontFamily: 'var(--font-body)',
                maxWidth: '340px',
              }}
            >
              {FAQ_SECTION.subtitle}
            </ScrollReveal>

            {/* Mini decorative radar — hidden on mobile */}
            <ScrollParallax speed={10}>
              <MiniRadar />
            </ScrollParallax>
          </motion.div>

          {/* RIGHT — Accordion */}
          <ScrollParallax speed={6} style={{ width: '100%' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
              role="list"
              aria-label="Frequently asked questions"
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            >
              {FAQ_ITEMS.map((item, i) => (
                <FAQItem key={item.id} item={item} index={i} />
              ))}
            </motion.div>
          </ScrollParallax>

        </div>

        {/* CTA — centered at the bottom of the section */}
        <motion.div
          style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <motion.a
            href="#contact"
            className="btn btn-secondary"
            style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.26, ease: [0.25, 1, 0.5, 1] }}
          >
            <span>{FAQ_SECTION.ctaText}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
