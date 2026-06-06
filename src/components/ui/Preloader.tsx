import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

interface PreloaderProps {
  ready: boolean;
}

export default function Preloader({ ready }: PreloaderProps) {
  const [phase, setPhase] = useState<'holding' | 'exit' | 'gone'>('holding');

  useEffect(() => {
    if (ready) {
      setPhase('exit');
    }
  }, [ready]);

  const handleAnimationEnd = () => {
    if (phase === 'exit') setPhase('gone');
  };

  if (phase === 'gone') return null;

  return (
    <div
      className={`${styles.overlay} ${phase === 'exit' ? styles.exit : ''}`}
      onAnimationEnd={handleAnimationEnd}
      aria-hidden="true"
    >
      {/* ── Branding ──────────────────────────────────────── */}
      <div className={styles.brand}>
        <div className={styles.hexWrap}>
          <svg
            className={styles.hexSvg}
            viewBox="0 0 56 64"
            fill="none"
            aria-hidden="true"
          >
            <polygon
              points="28,2 54,16 54,48 28,62 2,48 2,16"
              stroke="url(#hexGrad)"
              strokeWidth="2.5"
              fill="none"
            />
            <polygon
              points="28,10 46,20 46,44 28,54 10,44 10,20"
              stroke="url(#hexGrad)"
              strokeWidth="1"
              fill="rgba(37,150,190,0.06)"
              className={styles.hexInner}
            />
            <defs>
              <linearGradient id="hexGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0dd3f0" />
                <stop offset="100%" stopColor="#2596be" />
              </linearGradient>
            </defs>
          </svg>
          <div className={styles.pulseRing} />
        </div>

        <div className={styles.wordmark}>
          <span className={styles.wordmarkName}>Alex</span>
          <span className={styles.wordmarkAmp}>&amp;</span>
          <span className={styles.wordmarkFlow}>Flow</span>
        </div>

        <p className={styles.tagline}>I make your story move.</p>
      </div>

      {/* ── Indeterminate shimmer ──────────────────────────── */}
      <div className={styles.progressTrack}>
        <div className={styles.progressIndeterminate} />
      </div>
    </div>
  );
}
