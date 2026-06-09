import { useState, useEffect, Suspense, lazy } from 'react';
import { useScroll, motion, useMotionValue, useMotionValueEvent } from 'framer-motion';
import GlobalBackground from './components/ui/background/GlobalBackground';
import Navbar   from './components/layout/Navbar';
import Hero     from './components/sections/Hero';
import LazySection from './components/ui/primitives/LazySection';
import ErrorBoundary from './components/ui/primitives/ErrorBoundary';
import Footer   from './components/layout/Footer';
import styles   from './App.module.css';

import Work from './components/sections/Work';
import BeforeAfter from './components/ui/media/BeforeAfter';
import About from './components/sections/About';
import Results from './components/sections/Results';

// Dynamic imports for code splitting / lazy loading
const Reviews = lazy(() => import('./components/sections/Reviews'));
const FAQ = lazy(() => import('./components/sections/FAQ'));
const Contact = lazy(() => import('./components/sections/Contact'));

interface MainAppProps {
  onLayoutFinished: () => void;
  onPlasmaReady: () => void;
  isReady?: boolean;
}

export default function MainApp({ onLayoutFinished, onPlasmaReady, isReady = false }: MainAppProps) {
  const { scrollYProgress } = useScroll();
  const progressVal = useMotionValue(0);

  // Synchronize scroll progress value only when not scroll-locked (menu not open)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const isLocked = document.body.classList.contains('menu-open');
    if (!isLocked) {
      progressVal.set(latest);
    }
  });

  // Scroll progress bar fades in after mount — purely cosmetic, no layout impact
  const [showProgress, setShowProgress] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowProgress(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Double requestAnimationFrame ensures React mounting AND browser painting are 100% finished
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Add a tiny 200ms extra cushion for mobile thread stabilization
        setTimeout(() => {
          onLayoutFinished();
        }, 200);
      });
    });
  }, [onLayoutFinished]);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX: progressVal,
          position: 'fixed', top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #2596be, #0dd3f0)',
          transformOrigin: '0%',
          zIndex: 99998,
          pointerEvents: 'none',
          opacity: showProgress ? 1 : 0,
        }}
      />

      {/* Fixed background — Plasma compiles immediately (desktop) or uses CSS (mobile) */}
      <GlobalBackground isLoaded={true} onPlasmaReady={onPlasmaReady} />

      <div className={styles.app}>
        {/* Invisible sentinel for scroll-free active header state */}
        <div id="nav-sentinel" style={{ position: 'absolute', top: 0, left: 0, height: '60px', width: '100%', pointerEvents: 'none', zIndex: -1 }} />

        <Navbar />

        {/* ── Intro — page fades/scales in after preloader ── */}
        <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={isReady ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <main id="main-content">
              <ErrorBoundary>
                <Hero />

                <Work />
                <BeforeAfter />
                <About />

                <LazySection id="reviews" height="70vh">
                  {() => (
                    <Suspense fallback={<div style={{ minHeight: '70vh', width: '100%' }} />}>
                      <Reviews />
                    </Suspense>
                  )}
                </LazySection>

                <Results />

                <LazySection id="faq" height="60vh">
                  {() => (
                    <Suspense fallback={<div style={{ minHeight: '60vh', width: '100%' }} />}>
                      <FAQ />
                    </Suspense>
                  )}
                </LazySection>

                <LazySection id="contact" height="60vh">
                  {() => (
                    <Suspense fallback={<div style={{ minHeight: '60vh', width: '100%' }} />}>
                      <Contact />
                    </Suspense>
                  )}
                </LazySection>
              </ErrorBoundary>
            </main>
            <Footer />
          </motion.div>
      </div>
    </>
  );
}
