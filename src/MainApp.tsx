import { useState, useEffect } from 'react';
import { useScroll, motion } from 'framer-motion';
import GlobalBackground from './components/ui/GlobalBackground';
import Navbar   from './components/layout/Navbar';
import Hero     from './components/sections/Hero';
import Work     from './components/sections/Work';
import About    from './components/sections/About';
import Reviews  from './components/sections/Reviews';
import FAQ      from './components/sections/FAQ';
import Contact  from './components/sections/Contact';
import Footer   from './components/layout/Footer';
import styles   from './App.module.css';

export default function MainApp({ isLoaded }: { isLoaded: boolean }) {
  const { scrollYProgress } = useScroll();

  // Background activates 300ms AFTER hero reveal starts.
  // Hero gets isLoaded immediately — its CSS transitions start first.
  // GlobalBackground activation (blob rendering, particle init) is deferred
  // so it doesn't compete with hero's first transition frames.
  const [bgActive, setBgActive] = useState(false);
  useEffect(() => {
    if (!isLoaded) return;
    const t = setTimeout(() => setBgActive(true), 300);
    return () => clearTimeout(t);
  }, [isLoaded]);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed', top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #2596be, #0dd3f0)',
          transformOrigin: '0%',
          zIndex: 99998,
          pointerEvents: 'none',
          opacity: bgActive ? 1 : 0,
        }}
      />

      {/* Fixed background — activates 300ms after hero */}
      <GlobalBackground isLoaded={bgActive} />

      <div className={styles.app}>
        <Navbar />
        <main id="main-content">
          <Hero isLoaded={isLoaded} />
          <Work />
          <About />
          <Reviews />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
