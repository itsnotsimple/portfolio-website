import { useEffect, useRef } from 'react';
import styles from './Preloader.module.css';

interface PreloaderProps {
  /** Called when preloader is done — triggers hero reveal */
  onDone: () => void;
}

const DURATION_MS = 1800;

export default function Preloader({ onDone }: PreloaderProps) {
  const overlayRef   = useRef<HTMLDivElement>(null);
  const barRef       = useRef<HTMLDivElement>(null);
  const onDoneRef    = useRef(onDone);
  onDoneRef.current  = onDone;

  useEffect(() => {
    const start = performance.now();
    let raf: number;
    let done = false;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / DURATION_MS, 1);

      if (barRef.current) {
        barRef.current.style.width = `${pct * 100}%`;
      }

      if (pct < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (done) return;
      done = true;

      // ── Exit sequence ──────────────────────────────────────────────
      // Rule: remove scroll-lock FIRST (layout recalculation happens here).
      // Then wait 2 rAF frames for the browser to process it before triggering
      // the hero reveal. This prevents the layout burst from freezing the
      // main thread at the exact moment CSS transitions try to start.

      // 1. Snap bar to 100%
      if (barRef.current) barRef.current.style.width = '100%';

      // 2. Hide overlay immediately
      if (overlayRef.current) {
        overlayRef.current.style.opacity = '0';
        overlayRef.current.style.pointerEvents = 'none';
      }

      // 3. Remove scroll-lock so browser processes layout recalculation now
      document.body.classList.remove('scroll-locked');

      // 4. After 2 rAF frames (~33ms), call onDone → triggers hero CSS transitions
      //    By this point layout is settled and main thread is free
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          onDoneRef.current();
        });
      });
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove('scroll-locked');
    };
  }, []);

  return (
    <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
      <div className={styles.content}>
        {/* Brand */}
        <div className={styles.brand}>
          <svg className={styles.hex} viewBox="0 0 60 60" fill="none" aria-hidden="true">
            <polygon
              points="30,2 56,16 56,44 30,58 4,44 4,16"
              stroke="url(#hexGrad)"
              strokeWidth="2"
              fill="none"
            />
            <defs>
              <linearGradient id="hexGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0dd3f0" />
                <stop offset="100%" stopColor="#2596be" />
              </linearGradient>
            </defs>
          </svg>
          <span className={styles.brandName}>ALEX<span className={styles.amp}>&amp;</span>FLOW</span>
        </div>

        {/* Progress bar */}
        <div className={styles.track} role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
          <div ref={barRef} className={styles.bar} />
        </div>
      </div>
    </div>
  );
}
