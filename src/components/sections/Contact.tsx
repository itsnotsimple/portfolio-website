import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { SITE_CONFIG, CONTACT_SECTION } from '../../data/content';
import ScrollParallax from '../ui/ScrollParallax';
import styles from './Contact.module.css';

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
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
} as const;

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50, 
    rotateX: 20, 
    z: -60 
  },
  show: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0, 
    z: 0, 
    transition: { 
      type: "spring", 
      stiffness: 90, 
      damping: 14 
    } 
  }
} as const;

interface TiltCardProps {
  href: string;
  className: string;
  id: string;
  ariaLabel: string;
  glowClass: string;
  iconClass: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  actionText: string;
  actionIcon: React.ReactNode;
  whileTap: any;
  variants: any;
  spotlightGlow: string;
  delayBob: number;
}

function TiltCard({
  href,
  className,
  id,
  ariaLabel,
  glowClass,
  iconClass,
  icon,
  title,
  desc,
  actionText,
  actionIcon,
  whileTap,
  variants,
  spotlightGlow,
  delayBob
}: TiltCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  
  // Motion values for normalized cursor coordinates (0 to 1)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth springs for 3D rotation
  const springConfig = { damping: 22, stiffness: 180, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), springConfig);

  // Spotlight coordinates relative to card size
  const spotlightX = useSpring(useTransform(x, [0, 1], [-60, 260]), springConfig);
  const spotlightY = useSpring(useTransform(y, [0, 1], [-60, 260]), springConfig);

  // yOffset for the continuous bobbing effect
  const yOffset = useMotionValue(0);

  useEffect(() => {
    const controls = animate(yOffset, [0, -8, 0], {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delayBob
    });
    return () => controls.stop();
  }, [yOffset, delayBob]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;
    
    x.set(cursorX / rect.width);
    y.set(cursorY / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.a
      ref={cardRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      id={id}
      aria-label={ariaLabel}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        y: yOffset,
        transformStyle: 'preserve-3d',
      }}
      whileTap={whileTap}
    >
      {/* Spotlight Cursor-following layer */}
      <motion.div
        className={styles.spotlight}
        style={{
          left: spotlightX,
          top: spotlightY,
          background: spotlightGlow,
        }}
        aria-hidden="true"
      />

      <div className={glowClass} aria-hidden="true" />
      
      {/* 3D Content Container: pushes child elements outward on the Z-axis */}
      <div className={styles.cardContent}>
        <div className={iconClass}>
          {icon}
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardText}>{desc}</p>
        <span className={styles.cardAction}>
          <span>{actionText}</span>
          {actionIcon}
        </span>
      </div>
    </motion.a>
  );
}

export default function Contact() {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-heading">
      <div className={styles.bgDecor} aria-hidden="true" />
      <div className="container">
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65 }}
        >
          <ScrollParallax speed={-15}>
            <span className="section-tag">{CONTACT_SECTION.tag}</span>
          </ScrollParallax>
          <ScrollParallax speed={18}>
            <h2 className={styles.heading} id="contact-heading">
              {CONTACT_SECTION.heading} <span className="text-gradient">{CONTACT_SECTION.headingAccent}</span>
            </h2>
          </ScrollParallax>
          <ScrollParallax speed={6}>
            <p className={styles.sub}>
              {CONTACT_SECTION.subtitle}
            </p>
          </ScrollParallax>

          <motion.div 
            className={styles.cardGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-45px" }}
          >
            {/* Instagram card */}
            <ScrollParallax speed={-20}>
              <TiltCard
                href={SITE_CONFIG.instagramUrl}
                className={`${styles.card} ${styles.instaCard}`}
                id="contact-instagram-card"
                ariaLabel="Visit Instagram"
                glowClass={`${styles.cardGlow} ${styles.instaGlow}`}
                iconClass={`${styles.cardIcon} ${styles.instaIcon}`}
                icon={<InstagramIcon />}
                title={CONTACT_SECTION.instaTitle}
                desc={CONTACT_SECTION.instaDesc}
                actionText={SITE_CONFIG.instagramHandle}
                actionIcon={<ArrowIcon />}
                variants={cardVariants}
                whileTap={{ scale: 0.94 }}
                spotlightGlow="radial-gradient(circle, rgba(188,42,141,0.22) 0%, transparent 70%)"
                delayBob={0}
              />
            </ScrollParallax>

            {/* Email card */}
            <ScrollParallax speed={20}>
              <TiltCard
                href={`mailto:${SITE_CONFIG.email}`}
                className={`${styles.card} ${styles.emailCard}`}
                id="contact-email-card"
                ariaLabel="Send email"
                glowClass={`${styles.cardGlow} ${styles.emailGlow}`}
                iconClass={`${styles.cardIcon} ${styles.emailIcon}`}
                icon={<EmailIcon />}
                title={CONTACT_SECTION.emailTitle}
                desc={CONTACT_SECTION.emailDesc}
                actionText={SITE_CONFIG.email}
                actionIcon={<ArrowIcon />}
                variants={cardVariants}
                whileTap={{ scale: 0.94 }}
                spotlightGlow="radial-gradient(circle, rgba(37,150,190,0.22) 0%, transparent 70%)"
                delayBob={2.5}
              />
            </ScrollParallax>
          </motion.div>

          <p className={styles.responseTime}>
            <span className={styles.responseDot} aria-hidden="true" />
            {SITE_CONFIG.responseTime}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
