import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../effects/ScrollReveal';
import ScrollParallax from '../effects/ScrollParallax';

const clamp = (n: number) => Math.max(0, Math.min(100, n));

// Cinematic graded look (shown until /images/grading/after.webp is added)
const AFTER_GRADIENT =
  'radial-gradient(circle at 72% 28%, rgba(13,211,240,0.4), transparent 55%), linear-gradient(135deg, #06283d 0%, #1b6f8c 42%, #2596be 62%, #6a35c9 100%)';
// Flat, desaturated "raw" look (shown until /images/grading/before.webp is added)
const BEFORE_GRADIENT =
  'linear-gradient(135deg, #4a4f50 0%, #6f7775 55%, #8a918d 100%)';

const labelPill: React.CSSProperties = {
  position: 'absolute', top: '0.85rem', zIndex: 2,
  fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 700,
  letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff',
  padding: '0.28rem 0.7rem', borderRadius: '100px',
  background: 'rgba(4,8,12,0.55)', border: '1px solid rgba(255,255,255,0.18)',
  backdropFilter: 'blur(6px)', pointerEvents: 'none',
};

interface CompareLayerProps {
  src: string;
  alt: string;
  gradient: string;
  filter?: string;
  label: string;
  side: 'left' | 'right';
}

function CompareLayer({ src, alt, gradient, filter, label, side }: CompareLayerProps) {
  const [status, setStatus] = useState<'pending' | 'ok' | 'error'>('pending');
  return (
    <>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: gradient, filter }} />
      {status !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          draggable={false}
          onLoad={() => setStatus('ok')}
          onError={() => setStatus('error')}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', display: 'block', pointerEvents: 'none',
            opacity: status === 'ok' ? 1 : 0, transition: 'opacity 0.4s ease',
          }}
        />
      )}
      <span style={{ ...labelPill, left: side === 'left' ? '0.85rem' : undefined, right: side === 'right' ? '0.85rem' : undefined }}>
        {label}
      </span>
    </>
  );
}

export default function BeforeAfter() {
  const { content } = useLanguage();
  const { BEFORE_AFTER } = content;

  const containerRef = useRef<HTMLDivElement>(null);
  const beforeVideoRef = useRef<HTMLVideoElement>(null);
  const afterVideoRef = useRef<HTMLVideoElement>(null);

  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  // States to track if videos are ready and loaded
  const [beforeReady, setBeforeReady] = useState(false);
  const [afterReady, setAfterReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const hasVideoUrls = !!(BEFORE_AFTER.beforeVideoUrl && BEFORE_AFTER.afterVideoUrl);
  const useVideo = hasVideoUrls && beforeReady && afterReady && !videoError;

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) updateFromClientX(e.clientX);
  };
  const endDrag = () => setDragging(false);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') { setPos((p) => clamp(p - 3)); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { setPos((p) => clamp(p + 3)); e.preventDefault(); }
    else if (e.key === 'Home') { setPos(0); e.preventDefault(); }
    else if (e.key === 'End') { setPos(100); e.preventDefault(); }
  };

  const moveTransition = dragging ? 'none' : 'left 0.18s ease, clip-path 0.18s ease';

  // Synchronize play/pause, time, and handle IntersectionObserver for CPU saving
  useEffect(() => {
    if (!useVideo) return;

    const vBefore = beforeVideoRef.current;
    const vAfter = afterVideoRef.current;
    if (!vBefore || !vAfter) return;

    // Start playing initially
    vBefore.play().catch(() => {});
    vAfter.play().catch(() => {});

    const handlePlay = () => {
      if (vBefore.paused) vBefore.play().catch(() => {});
    };

    const handlePause = () => {
      if (!vBefore.paused) vBefore.pause();
    };

    // Frame/time synchronization to prevent audio-less drift
    const handleTimeUpdate = () => {
      const diff = Math.abs(vBefore.currentTime - vAfter.currentTime);
      if (diff > 0.08) {
        vBefore.currentTime = vAfter.currentTime;
      }
      if (vBefore.playbackRate !== vAfter.playbackRate) {
        vBefore.playbackRate = vAfter.playbackRate;
      }
    };

    vAfter.addEventListener('play', handlePlay);
    vAfter.addEventListener('pause', handlePause);
    vAfter.addEventListener('timeupdate', handleTimeUpdate);

    // IntersectionObserver to pause when out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            vBefore.play().catch(() => {});
            vAfter.play().catch(() => {});
          } else {
            vBefore.pause();
            vAfter.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    const container = containerRef.current;
    if (container) {
      observer.observe(container);
    }

    return () => {
      vAfter.removeEventListener('play', handlePlay);
      vAfter.removeEventListener('pause', handlePause);
      vAfter.removeEventListener('timeupdate', handleTimeUpdate);
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [useVideo]);

  return (
    <section
      aria-label={BEFORE_AFTER.tag}
      style={{ padding: 'var(--section-py) 0', background: 'transparent', position: 'relative', overflowX: 'clip' }}
    >
      {/* Gradient top divider */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, left: '8%', right: '8%', height: '1px', pointerEvents: 'none',
          background: 'linear-gradient(90deg, transparent, rgba(37,150,190,0.35) 50%, transparent)',
        }}
      />

      <div className="container">
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-tag">{BEFORE_AFTER.tag}</span>
          <h2 className="section-title">
            {BEFORE_AFTER.heading}{' '}
            <span className="text-gradient">{BEFORE_AFTER.headingAccent}</span>
          </h2>
          <ScrollReveal baseOpacity={0} enableBlur blurStrength={4} textClassName="section-subtitle">
            {BEFORE_AFTER.subtitle}
          </ScrollReveal>
        </motion.div>

        {/* Slider */}
        <ScrollParallax speed={10}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: '900px', margin: '0 auto' }}
          >
            <div
              ref={containerRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              style={{
                position: 'relative', width: '100%', aspectRatio: '16 / 9',
                borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                border: '1px solid rgba(37,150,190,0.3)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 50px rgba(37,150,190,0.1)',
                cursor: dragging ? 'grabbing' : 'ew-resize',
                touchAction: 'none', userSelect: 'none',
              }}
            >
              {/* VIDEO VERSION */}
              {hasVideoUrls && !videoError && (
                <>
                  {/* AFTER Video (base layer, full width) */}
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <video
                      ref={afterVideoRef}
                      src={BEFORE_AFTER.afterVideoUrl}
                      muted
                      loop
                      playsInline
                      autoPlay
                      onCanPlay={() => setAfterReady(true)}
                      onError={() => setVideoError(true)}
                      style={{
                        position: 'absolute', inset: 0, width: '100%', height: '100%',
                        objectFit: 'cover', display: 'block', pointerEvents: 'none',
                        opacity: useVideo ? 1 : 0, transition: 'opacity 0.4s ease'
                      }}
                    />
                    {useVideo && (
                      <span style={{ ...labelPill, right: '0.85rem' }}>
                        {BEFORE_AFTER.afterLabel}
                      </span>
                    )}
                  </div>

                  {/* BEFORE Video (overlay, clipped) */}
                  <div
                    style={{
                      position: 'absolute', inset: 0,
                      clipPath: `inset(0 ${100 - pos}% 0 0)`,
                      WebkitClipPath: `inset(0 ${100 - pos}% 0 0)`,
                      transition: moveTransition,
                      zIndex: 2,
                    }}
                  >
                    <video
                      ref={beforeVideoRef}
                      src={BEFORE_AFTER.beforeVideoUrl}
                      muted
                      loop
                      playsInline
                      autoPlay
                      onCanPlay={() => setBeforeReady(true)}
                      onError={() => setVideoError(true)}
                      style={{
                        position: 'absolute', inset: 0, width: '100%', height: '100%',
                        objectFit: 'cover', display: 'block', pointerEvents: 'none',
                        opacity: useVideo ? 1 : 0, transition: 'opacity 0.4s ease'
                      }}
                    />
                    {useVideo && (
                      <span style={{ ...labelPill, left: '0.85rem' }}>
                        {BEFORE_AFTER.beforeLabel}
                      </span>
                    )}
                  </div>
                </>
              )}

              {/* FALLBACK STATIC VERSION (used if videos fail to load or URLs not set) */}
              {(!useVideo || videoError) && (
                <>
                  {/* AFTER (base layer, full width) */}
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <CompareLayer
                      src="/images/grading/after.webp"
                      alt={`${BEFORE_AFTER.afterLabel} — graded`}
                      gradient={AFTER_GRADIENT}
                      label={BEFORE_AFTER.afterLabel}
                      side="right"
                    />
                  </div>

                  {/* BEFORE (overlay, clipped) */}
                  <div
                    style={{
                      position: 'absolute', inset: 0,
                      clipPath: `inset(0 ${100 - pos}% 0 0)`,
                      WebkitClipPath: `inset(0 ${100 - pos}% 0 0)`,
                      transition: moveTransition,
                    }}
                  >
                    <CompareLayer
                      src="/images/grading/before.webp"
                      alt={`${BEFORE_AFTER.beforeLabel} — raw`}
                      gradient={BEFORE_GRADIENT}
                      filter="saturate(0.6) contrast(0.92)"
                      label={BEFORE_AFTER.beforeLabel}
                      side="left"
                    />
                  </div>
                </>
              )}

              {/* Handle */}
              <div
                role="slider"
                tabIndex={0}
                aria-label={BEFORE_AFTER.hint}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                onKeyDown={onKeyDown}
                style={{
                  position: 'absolute', top: 0, bottom: 0, left: `${pos}%`,
                  transform: 'translateX(-50%)', width: '44px', zIndex: 3,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: dragging ? 'grabbing' : 'ew-resize',
                  transition: moveTransition, outlineOffset: '4px',
                }}
              >
                {/* Vertical divider line */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute', top: 0, bottom: 0, left: '50%', width: '2px',
                    transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 0 12px rgba(37,150,190,0.85)',
                  }}
                />
                {/* Grabber knob */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'relative', width: '42px', height: '42px', borderRadius: '50%',
                    background: 'rgba(8,14,22,0.85)', border: '2px solid #fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(4px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.5), 0 0 20px rgba(37,150,190,0.55)',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
                    <polyline points="13 7 8 12 13 17" />
                    <polyline points="11 7 16 12 11 17" />
                  </svg>
                </div>
              </div>

              {/* Hint pill */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', bottom: '0.85rem', left: '50%', transform: 'translateX(-50%)',
                  zIndex: 4, fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.85)',
                  padding: '0.3rem 0.8rem', borderRadius: '100px',
                  background: 'rgba(4,8,12,0.5)', border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(6px)', pointerEvents: 'none', whiteSpace: 'nowrap',
                }}
              >
                {BEFORE_AFTER.hint}
              </div>
            </div>
          </motion.div>
        </ScrollParallax>
      </div>
    </section>
  );
}
