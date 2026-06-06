import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Plasma from './Plasma';
import styles from './GlobalBackground.module.css';

export default function GlobalBackground({
  isLoaded = false,
  onPlasmaReady,
}: {
  isLoaded?: boolean;
  onPlasmaReady?: () => void;
}) {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(true); // Default to static blobs during initial hydration

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth scroll translation with spring physics
  const smoothScrollY = useSpring(scrollY, { stiffness: 80, damping: 25, mass: 0.15 });

  const yBlob1 = useTransform(smoothScrollY, (y) => isMobile ? 0 : -y * 0.18);
  const yBlob2 = useTransform(smoothScrollY, (y) => isMobile ? 0 : -y * 0.26);
  const yBlob3 = useTransform(smoothScrollY, (y) => isMobile ? 0 : -y * 0.10);

  return (
    <div className={styles.root} aria-hidden="true">
      {/*
        WebGL Plasma on ALL devices.
        Plasma.tsx auto-detects mobile and:
          - uses mobileFragment (zero loops, 2D sine waves — compiles 20× faster)
          - renders at 50% drawing-buffer resolution (stretched via CSS)
          - fires onReady after 3 GPU-flushed frames, same as desktop
        This produces smooth fluid colors identical in quality to the desktop
        version, vs CSS gradients which look pixelated on mobile GPUs.
      */}
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

      {/* Nebula blobs — static on mobile, spring-smoothed parallax on desktop */}
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
    </div>
  );
}
