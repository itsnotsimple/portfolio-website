import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import ScrollReveal from '../ui/effects/ScrollReveal';
import ScrollParallax from '../ui/effects/ScrollParallax';
import Lightbox from '../ui/media/Lightbox';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

interface ResultItem {
  src: string;
  caption?: string;
}

function ResultImage({ src, caption, index, onClick }: { src: string; caption?: string; index: number; onClick: () => void }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -4, boxShadow: '0 0 28px rgba(37,150,190,0.18), var(--shadow-card)', borderColor: 'rgba(37,150,190,0.45)' }}
      onClick={onClick}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        background: 'var(--bg-surface)',
        boxShadow: 'var(--shadow-card)',
        cursor: 'zoom-in',
      }}
    >
      <img
        src={src}
        alt={caption ?? `Client result ${index + 1}`}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      {caption && (
        <div style={{
          padding: '0.6rem 0.85rem 0.75rem',
          fontFamily: 'var(--font-body)', fontSize: '0.78rem',
          color: 'var(--text-muted)', lineHeight: 1.4,
          borderTop: '1px solid var(--border)',
        }}>
          {caption}
        </div>
      )}
    </motion.div>
  );
}

export default function Results() {
  const { content } = useLanguage();
  const { RESULTS, RESULTS_SECTION } = content;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section
      id="results"
      aria-labelledby="results-heading"
      style={{ padding: 'clamp(3rem, 7vw, 5rem) 0', position: 'relative', overflowX: 'clip' }}
    >
      {/* Gradient top divider */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '60%', maxWidth: '600px', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(37,150,190,0.5), transparent)',
        }}
      />

      <div className="container">
        <ScrollParallax speed={22}>
          <motion.div
            style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-tag">{RESULTS_SECTION.tag}</span>
            <h2
              id="results-heading"
              className="section-title"
              style={{ marginTop: '0.6rem' }}
            >
              {RESULTS_SECTION.heading}{' '}
              <span className="text-gradient">{RESULTS_SECTION.headingAccent}</span>
            </h2>
            {RESULTS_SECTION.subtitle && (
              <ScrollReveal
                baseOpacity={0}
                enableBlur
                blurStrength={4}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                  color: 'var(--text-muted)', marginTop: '0.75rem', maxWidth: '480px', margin: '0.75rem auto 0',
                }}
              >
                {RESULTS_SECTION.subtitle}
              </ScrollReveal>
            )}
          </motion.div>
        </ScrollParallax>

        <ScrollParallax speed={-22}>
          <div className="results-grid">
            {RESULTS.map((item, i) => (
              <ResultImage
                key={item.src}
                src={item.src}
                caption={item.caption}
                index={i}
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </div>
        </ScrollParallax>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={RESULTS as ResultItem[]}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
