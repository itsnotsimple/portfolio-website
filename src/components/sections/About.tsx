import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ABOUT, SITE_CONFIG } from '../../data/content';
import ScrollRevealText from '../ui/ScrollRevealText';
import ScrollParallax from '../ui/ScrollParallax';
import styles from './About.module.css';
import alexPhoto from '../assets/453769781_1145851049814387_2954952142584413301_n.jpg';

const tools = ABOUT.tools;



const PremiereIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
    <path d="M15 3H9v2H7v2H5v2H3v6h2v2h2v2h2v2h6v-2h2v-2h2v-2h2V9h-2V7h-2V5h-2V3z"/>
  </svg>
);
const LayersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" aria-hidden="true">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const chips = [
  { label: 'Premiere Pro', icon: <PremiereIcon />, cls: styles.chip1 },
  { label: 'After Effects', icon: <LayersIcon />,  cls: styles.chip2 },
  { label: 'Capcut Pro',    icon: <CheckIcon />,   cls: styles.chip3 },
];

const instagramSvg = (
  <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const isMobileDevice = () =>
  typeof window !== 'undefined' &&
  (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = isMobileDevice();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yParallax      = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const rotateParallax = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section ref={containerRef} className={styles.section} id="about" aria-labelledby="about-heading">
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <ScrollParallax speed={-15}>
            <span className="section-tag">{ABOUT.tag}</span>
          </ScrollParallax>
          <ScrollParallax speed={18}>
            <h2 className="section-title" id="about-heading">
              {ABOUT.heading}{' '}
              <span className="text-gradient">{ABOUT.headingAccent}</span>
            </h2>
          </ScrollParallax>
        </motion.div>

        <div className={styles.grid}>
          <ScrollParallax speed={-45} className={styles.visual}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <div className={styles.cardStack}>
                <motion.div
                  className={styles.mainCard}
                  style={isMobile ? {} : { rotateZ: rotateParallax }}
                  whileHover={isMobile ? {} : { scale: 1.02, rotateX: 5, rotateY: -5, boxShadow: '0 20px 40px rgba(37,150,190,0.25)' }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <motion.img
                    src={alexPhoto}
                    alt="Alex - Video Editor"
                    className={styles.aboutImage}
                    style={isMobile ? {} : { y: yParallax }}
                    whileHover={isMobile ? {} : { scale: 1.06 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className={styles.imageOverlay} />
                  <div className={styles.shineEffect} />
                  <div className={styles.expBadge}>
                    <span className={styles.expNum}>{ABOUT.yearsExp}</span>
                    <span className={styles.expLabel}>{ABOUT.yearsLabel}</span>
                  </div>
                </motion.div>
                {chips.map(chip => (
                  <div key={chip.label} className={`${styles.chip} ${chip.cls}`} aria-hidden="true">
                    <span className={styles.chipIcon}>{chip.icon}</span>
                    {chip.label}
                  </div>
                ))}
              </div>
            </motion.div>
          </ScrollParallax>

          <ScrollParallax speed={25} className={styles.textSide}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
            >
              {ABOUT.paragraphs.map((p, i) => (
                <ScrollRevealText key={i} text={p} className={styles.para} />
              ))}
              <div className={styles.toolsGrid} aria-label="Tools I use">
                {tools.map(tool => (
                  <span key={tool} className={styles.toolTag}>{tool}</span>
                ))}
              </div>
              <div className={styles.ctaRow}>
                <motion.a href="#contact" className="btn btn-primary" id="about-contact-btn"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.26, ease: [0.25, 1, 0.5, 1] }}>
                  <span>{ABOUT.ctaWork}</span>
                </motion.a>
                <motion.a href={SITE_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer"
                  className="btn btn-ghost" id="about-instagram-btn"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.26, ease: [0.25, 1, 0.5, 1] }}>
                  {instagramSvg}
                  <span>{ABOUT.ctaSocial}</span>
                </motion.a>
              </div>
            </motion.div>
          </ScrollParallax>
        </div>
      </div>
    </section>
  );
}
