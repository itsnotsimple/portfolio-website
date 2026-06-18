import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { isMobileDevice } from '../../../lib/device';
import styles from './GlobalBackground.module.css';

export default function GlobalBackground({
  isLoaded = false,
  onPlasmaReady,
}: {
  isLoaded?: boolean;
  onPlasmaReady?: () => void;
}) {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true); // Default true during SSR/hydration

  useEffect(() => {
    const handleResize = () => setIsMobile(isMobileDevice(1024));
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── On mobile: fire onPlasmaReady immediately (no WebGL to wait for) ─────
  // On desktop this is called by Plasma after 3 GPU-flushed frames.
  useEffect(() => {
    if (!isMobile) return;
    if (!isLoaded) return;
    onPlasmaReady?.();
  }, [isMobile, isLoaded, onPlasmaReady]);

  // Smooth scroll spring — only meaningful on desktop where blobs move
  const smoothScrollY = useSpring(scrollY, { stiffness: 80, damping: 25, mass: 0.15 });
  const staticBg = isMobile || !!prefersReducedMotion;
  const yBlob1 = useTransform(smoothScrollY, (y) => staticBg ? 0 : -y * 0.18);
  const yBlob2 = useTransform(smoothScrollY, (y) => staticBg ? 0 : -y * 0.26);
  const yBlob3 = useTransform(smoothScrollY, (y) => staticBg ? 0 : -y * 0.10);

  return (
    <div className={styles.root} aria-hidden="true">
      {/*
        Mobile: NO WebGL/OGL/Plasma — just a static dark background with CSS blobs.
        Saves 42 KB (OGL) + shader compilation time + GPU usage on battery-constrained devices.
        Desktop: full Plasma WebGL effect as before.
      */}
      {!isMobile && (
        // Dynamic import keeps Plasma + OGL off the mobile JS bundle entirely
        <PlasmaLoader
          isLoaded={isLoaded}
          onPlasmaReady={onPlasmaReady}
        />
      )}

      {/* Nebula blobs — static on mobile / reduced-motion, spring parallax on desktop */}
      {staticBg ? (
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
    </div>
  );
}

// ── Plasma loader (desktop-only) ─────────────────────────────────────────────
// Rendered only when isMobile === false, so the import() + OGL never touch
// the mobile JS bundle.
import { lazy, Suspense } from 'react';
const Plasma = lazy(() => import('./Plasma'));

function PlasmaLoader({
  isLoaded,
  onPlasmaReady,
}: {
  isLoaded: boolean;
  onPlasmaReady?: () => void;
}) {
  return (
    <Suspense fallback={null}>
      <Plasma
        color="#2596be"
        speed={0.45}
        direction="forward"
        scale={1}
        opacity={0.62}
        mouseInteractive={false}
        isLoaded={isLoaded}
        onReady={onPlasmaReady}
      />
    </Suspense>
  );
}
