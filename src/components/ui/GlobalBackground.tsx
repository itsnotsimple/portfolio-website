import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Plasma from './Plasma';
import ParticlesCanvas from './ParticlesCanvas';
import styles from './GlobalBackground.module.css';

/**
 * Fixed full-page Plasma, Particles, and scrolling Nebula background.
 * Sits behind all content at z-index 0.
 */
export default function GlobalBackground({ isLoaded = false }: { isLoaded?: boolean }) {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      setMounted(false);
      return;
    }
    // Defer particles canvas mounting until after the preloader has completely slid off-screen
    const timer = setTimeout(() => {
      setMounted(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  // Desktop-only parallax transforms — on mobile blobs are static (cheaper, scroll distance is short anyway)
  const yBlob1 = useTransform(scrollY, (y) => isMobile ? 0 : -y * 0.22);
  const yBlob2 = useTransform(scrollY, (y) => isMobile ? 0 : -y * 0.35);
  const yBlob3 = useTransform(scrollY, (y) => isMobile ? 0 : -y * 0.12);
  const yParticles = useTransform(scrollY, (y) => isMobile ? 0 : -y * 0.15);

  return (
    <div className={styles.root} aria-hidden="true">
      {/* Layer 1: Static Plasma Shader Background (deepest) — bypassed on mobile viewports */}
      {!isMobile && (
        <Plasma
          color="#2596be"
          speed={0.45}
          direction="forward"
          scale={1}
          opacity={0.38}
          mouseInteractive={false}
          isLoaded={isLoaded}
        />
      )}

      {/* Layer 2: Parallax Nebula blobs — static on mobile, animated on desktop */}
      {isMobile ? (
        <>
          <div className={`${styles.blob} ${styles.blob1}`} />
          <div className={`${styles.blob} ${styles.blob2}`} />
          <div className={`${styles.blob} ${styles.blob3}`} />
        </>
      ) : (
        <>
          <motion.div className={`${styles.blob} ${styles.blob1}`} style={{ y: yBlob1 }} />
          <motion.div className={`${styles.blob} ${styles.blob2}`} style={{ y: yBlob2 }} />
          <motion.div className={`${styles.blob} ${styles.blob3}`} style={{ y: yBlob3 }} />
        </>
      )}

      {/* Layer 3: Scrolling Parallax Particle Canvas */}
      {mounted && (
        isMobile ? (
          <div className={styles.particlesContainer}>
            <ParticlesCanvas className={styles.particles} />
          </div>
        ) : (
          <motion.div
            className={styles.particlesContainer}
            style={{ y: yParticles }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <ParticlesCanvas className={styles.particles} />
          </motion.div>
        )
      )}
    </div>
  );
}

