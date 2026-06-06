"use client";
import { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import type { TargetAndTransition } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import ScrollReveal from './ScrollReveal';
import ScrollParallax from './ScrollParallax';


/* ── Animated twinkling star ─────────────────────────────── */
function AnimatedStar({ index, size = 14, fillPercent = 100 }: { index: number; size?: number; fillPercent?: number }) {
  const gradientId = `star-grad-${index}-${fillPercent}`;
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 24 24"
      aria-hidden="true"
      initial={{ scale: 0, opacity: 0, y: 6 }}
      animate={{
        scale: [null, 1.15, 1],
        opacity: [0, 1, 0.7, 1],
        y: 0,
      }}
      style={{
        filter: 'drop-shadow(0 0 3px rgba(245,200,66,0.65))',
      }}
      transition={{
        scale: { delay: index * 0.08, type: 'spring', stiffness: 320, damping: 14 },
        opacity: { 
          times: [0, 0.1, 0.5, 1],
          delay: index * 0.08, 
          duration: 2.2, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        },
        y: { delay: index * 0.08, type: 'spring', stiffness: 320, damping: 14 },
      }}
    >
      {fillPercent < 100 && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset={`${fillPercent}%`} stopColor="#f5c842" />
            <stop offset={`${fillPercent}%`} stopColor="rgba(255, 255, 255, 0.15)" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"
        fill={fillPercent < 100 ? `url(#${gradientId})` : "#f5c842"}
      />
    </motion.svg>
  );
}

/* ── Reviews Video Modal ─────────────────────────────────── */
function ReviewsVideoModal({ videoUrl, name, onClose }: { videoUrl: string; name: string; onClose: () => void }) {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMobile(/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768);

    // Disable scrolling
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;

      // Hard-stop the video on unmount — prevents audio playing during exit animation
      // or lingering in browser memory after the modal closes
      const vid = videoRef.current;
      if (vid) {
        vid.pause();
        vid.src = '';
        vid.load();
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Video Testimonial from ${name}`}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(4,8,12,0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        perspective: 1200,
      }}
    >
      {/* Dot-grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(37,150,190,0.14) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* Close button at top right */}
      <button
        onClick={e => { e.stopPropagation(); onClose(); }}
        aria-label="Close video testimonial"
        style={{
          position: 'absolute',
          top: isMobile ? '1.25rem' : '2.5rem',
          right: isMobile ? '1.25rem' : '2.5rem',
          zIndex: 10000,
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          cursor: 'pointer',
          transition: 'all 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
        }}
        onMouseOver={e => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)';
          e.currentTarget.style.transform = 'scale(1.06)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Cinematic 3D Modal Card - optimized for 9:16 layout */}
      <motion.div
        initial={{ scale: 0.75, opacity: 0, y: 60, rotateX: 30, rotateY: -20, z: -150 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0, rotateY: 0, z: 0 }}
        exit={{ scale: 0.82, opacity: 0, y: 40, rotateX: -22, rotateY: 15, z: -100 }}
        transition={{ type: 'spring', stiffness: 140, damping: 20 }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '380px',
          aspectRatio: '9/16',
          background: 'rgba(8,14,22,0.97)',
          border: '1px solid rgba(37,150,190,0.45)',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 0 0 1px rgba(37,150,190,0.06) inset, 0 50px 100px rgba(0,0,0,0.8), 0 0 80px rgba(37,150,190,0.14)',
          backdropFilter: 'blur(24px)',
          transformStyle: 'preserve-3d',
        }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          autoPlay
          playsInline
          controlsList="nodownload"
          onContextMenu={e => e.preventDefault()}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ── Video Testimonial Card ──────────────────────────────── */
function VideoTestimonialCard({
  name,
  role,
  videoUrl,
  onClick,
}: {
  name: string;
  role: string;
  videoUrl: string;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Lazy-load video src via IntersectionObserver — prevents all 4 cards
  // from issuing network requests simultaneously on page load
  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoSrc(`${videoUrl}#t=0.1`);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // start loading 200px before entering viewport
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [videoUrl]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: 1.04, y: -6 }}
      onClick={onClick}
      style={{
        position: 'relative',
        width: '200px',
        height: '340px',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(37, 150, 190, 0.25)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        cursor: 'pointer',
        background: '#040a14',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '1.25rem 1rem',
      }}
    >
      {/* Static poster image — shown instantly, no network delay */}
      {/* Video preview — lazy-loaded, shows first frame once metadata arrives */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          preload="metadata"
          playsInline
          muted
          onLoadedData={() => setVideoReady(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: videoReady ? 0.65 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />
      )}

      {/* Dark gradient overlay on top of video */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent 40%, rgba(4, 10, 20, 0.85) 75%, rgba(3, 7, 14, 0.98) 100%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Ambient hover glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, rgba(37, 150, 190, 0.15) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Play button overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2,
      }}>
        <motion.div
          whileHover={{ scale: 1.15 }}
          style={{
            width: '46px', height: '46px', borderRadius: '50%',
            background: 'var(--primary)',
            boxShadow: '0 0 16px var(--primary-glow)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff',
            fontSize: '1rem',
            paddingLeft: '3px',
          }}
        >
          ▶
        </motion.div>
      </div>

      {/* Card Info */}
      <div style={{ zIndex: 3, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <h4 style={{
          fontFamily: 'var(--font-head)',
          fontSize: '0.95rem',
          fontWeight: 700,
          color: '#fff',
          margin: 0,
          textAlign: 'center',
        }}>
          {name}
        </h4>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          color: 'var(--primary-light)',
          margin: '2px 0 0',
          textAlign: 'center',
        }}>
          {role}
        </p>
      </div>
    </motion.div>
  );
}

interface CardProps {
  handleShuffle: () => void;
  text: string;
  position: 'front' | 'middle' | 'back';
  author: string;
  role: string;
  initials: string;
  gradient: string;
  dragLabel: string;
  photo?: string;
  socialLink?: string;
  socialType?: 'youtube' | 'instagram' | 'tiktok';
  socialStats?: string;
}

function TestimonialCard({
  handleShuffle,
  text,
  position,
  author,
  role,
  initials,
  gradient,
  dragLabel,
  photo,
  socialLink,
  socialType,
  socialStats
}: CardProps) {
  const dragRef = useRef(0);
  const isFront = position === 'front';
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768);
  }, []);

  const positionStyles: Record<string, TargetAndTransition> = {
    front:  { zIndex: 3, rotate: '-3deg', x: '0%' },
    middle: { zIndex: 2, rotate: '2deg',  x: '16%' },
    back:   { zIndex: 1, rotate: '5deg',  x: '28%' },
  };

  // Determine backdrop filter style
  // Disable backdropFilter during drag to boost performance on mobile browsers
  // Also reduce backdropFilter on mobile standard state for general scrolling performance
  const backdropFilterValue = isDragging
    ? 'none'
    : isMobile
      ? 'blur(8px)'
      : 'blur(18px)';

  // Simplify shadows when dragging to bypass complex GPU shadow rasterization costs
  const shadowValue = isDragging
    ? '0 16px 36px rgba(0,0,0,0.55)'
    : isFront
      ? '0 12px 40px rgba(0,0,0,0.6), 0 0 30px rgba(37,150,190,0.1), inset 0 1px 0 rgba(255,255,255,0.07)'
      : '0 8px 24px rgba(0,0,0,0.4)';

  return (
    <motion.div
      animate={positionStyles[position]}
      drag={isFront}
      dragElastic={0.35}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(_e, info) => {
        dragRef.current = info.point.x;
        setIsDragging(true);
      }}
      onDragEnd={(_e, info) => {
        if (dragRef.current - info.point.x > 120) handleShuffle();
        dragRef.current = 0;
        setIsDragging(false);
      }}
      transition={{ duration: 0.35, type: 'spring', stiffness: 200, damping: 22 }}
      style={{
        ...(isFront
          ? { position: 'relative', width: '100%', height: '425px' }
          : { position: 'absolute', left: 0, top: 0, width: '100%', height: '425px' }),
        cursor: isFront ? (isDragging ? 'grabbing' : 'grab') : 'default',
        userSelect: 'none', borderRadius: '20px',
        background: 'rgba(8, 14, 26, 0.92)',
        border: `1px solid ${isFront ? 'rgba(37,150,190,0.38)' : 'rgba(37,150,190,0.18)'}`,
        backdropFilter: backdropFilterValue,
        WebkitBackdropFilter: backdropFilterValue,
        boxShadow: shadowValue,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'flex-start', padding: '2.25rem 1.75rem 1.25rem',
        overflow: 'hidden',
        willChange: 'transform',
      }}
    >


      {/* Top cyan glow line */}
      <div style={{
        position: 'absolute', top: 0, left: '1.5rem', right: '1.5rem', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(13,211,240,0.7), transparent)',
      }} aria-hidden="true" />

      <div style={{
        position: 'absolute', top: '-40px', right: '-40px',
        width: '160px', height: '160px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,150,190,0.10) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      {/* Avatar */}
      <div style={{
        width: '76px', height: '76px', borderRadius: '50%',
        background: photo ? 'transparent' : gradient,
        border: '2px solid rgba(37,150,190,0.5)',
        boxShadow: '0 0 20px rgba(37,150,190,0.32), inset 0 1px 0 rgba(255,255,255,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.15rem', fontWeight: 700, color: '#fff',
        letterSpacing: '0.03em', flexShrink: 0,
        overflow: 'hidden',
        marginBottom: '0.5rem',
      }}>
        {photo ? (
          <img
            src={photo}
            alt={author}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            draggable="false"
          />
        ) : (
          initials
        )}
      </div>

      {/* Author Name and Role directly under the photo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0.4rem', flexShrink: 0 }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f0f6fb', fontFamily: 'var(--font-head)', textAlign: 'center' }}>
          {author}
        </div>
        <div style={{ fontSize: '0.74rem', color: 'var(--primary-light)', fontFamily: 'var(--font-body)', textAlign: 'center', marginTop: '2px' }}>
          {role}
        </div>
      </div>

      {/* Stars — animated in all cards */}
      <div style={{ display: 'flex', gap: '3px', marginBottom: '0.5rem', flexShrink: 0 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <AnimatedStar key={i} index={i} size={15} />
        ))}
      </div>

      {/* Social Badge or Spacer */}
      {socialStats && socialLink && socialType ? (
        <motion.a
          href={socialLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          whileHover={{ scale: 1.05, y: -1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '100px',
            background: 'rgba(37, 150, 190, 0.06)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            fontSize: '0.74rem',
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
            color: '#fff',
            textDecoration: 'none',
            border: socialType === 'youtube'
              ? '1px solid rgba(255, 0, 0, 0.35)'
              : '1px solid rgba(225, 48, 108, 0.35)',
            boxShadow: socialType === 'youtube'
              ? '0 0 12px rgba(255, 0, 0, 0.08)'
              : '0 0 12px rgba(225, 48, 108, 0.08)',
            marginBottom: '0.6rem',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = socialType === 'youtube'
              ? 'rgba(255, 0, 0, 0.85)'
              : 'rgba(225, 48, 108, 0.85)';
            e.currentTarget.style.boxShadow = socialType === 'youtube'
              ? '0 0 18px rgba(255, 0, 0, 0.3)'
              : '0 0 18px rgba(225, 48, 108, 0.3)';
            e.currentTarget.style.backgroundColor = socialType === 'youtube'
              ? 'rgba(255, 0, 0, 0.12)'
              : 'rgba(225, 48, 108, 0.12)';
            const arrow = e.currentTarget.querySelector('.link-arrow') as HTMLElement;
            if (arrow) arrow.style.transform = 'translate(1px, -1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = socialType === 'youtube'
              ? 'rgba(255, 0, 0, 0.35)'
              : 'rgba(225, 48, 108, 0.35)';
            e.currentTarget.style.boxShadow = socialType === 'youtube'
              ? '0 0 12px rgba(255, 0, 0, 0.08)'
              : '0 0 12px rgba(225, 48, 108, 0.08)';
            e.currentTarget.style.backgroundColor = 'rgba(37, 150, 190, 0.06)';
            const arrow = e.currentTarget.querySelector('.link-arrow') as HTMLElement;
            if (arrow) arrow.style.transform = 'translate(0, 0)';
          }}
        >
          {socialType === 'youtube' ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#ff0000', filter: 'drop-shadow(0 0 2px rgba(255, 0, 0, 0.3))' }}>
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#e1306c', filter: 'drop-shadow(0 0 2px rgba(225, 48, 108, 0.3))' }}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          )}
          <span>{socialStats}</span>
          <svg className="link-arrow" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ opacity: 0.8, marginLeft: '1px', transition: 'transform 0.2s ease' }}>
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </motion.a>
      ) : (
        /* Spacer placeholder to maintain visual vertical alignment consistency with non-social reviews */
        <div style={{ height: '26px', marginBottom: '0.6rem', flexShrink: 0 }} aria-hidden="true" />
      )}

      {/* Quote */}
      <div
        className="hide-scrollbar"
        style={{
          height: '130px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          overflowY: 'auto',
          marginBottom: '1rem',
        }}
      >
        <p style={{
          textAlign: 'center', fontSize: '0.84rem', fontStyle: 'italic',
          color: '#9ec5d8', lineHeight: 1.6, fontFamily: 'var(--font-body)',
          margin: 0,
        }}>
          "{text}"
        </p>
      </div>

      {/* Drag hint — always in DOM, visibility-toggled to avoid remount on language change */}
      <div style={{
        position: 'absolute', bottom: '0.85rem', left: 0, right: 0,
        fontSize: '0.64rem', color: 'rgba(37,150,190,0.5)',
        letterSpacing: '0.08em', textTransform: 'uppercase',
        fontFamily: 'var(--font-body)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
        whiteSpace: 'nowrap',
        visibility: isFront ? 'visible' : 'hidden',
        pointerEvents: 'none',
      }}>
        <span>{dragLabel}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </motion.div>
  );
}

/* ── Stat animations and counter ────────────────────────── */
function AnimatedStatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(match[1]);
    const suffix = match[2];
    const isDecimal = match[1].includes('.');
    const decimalPlaces = isDecimal ? match[1].split('.')[1].length : 0;

    const controls = animate(0, targetNum, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate: (latest) => {
        setDisplayValue(latest.toFixed(decimalPlaces) + suffix);
      }
    });
    return () => controls.stop();
  }, [value, isInView]);

  return <span ref={ref}>{displayValue}</span>;
}

interface StatCardProps {
  stat: {
    value: string;
    label: string;
    icon: React.ReactNode;
    color: string;
    border: string;
    glowColor: string;
    iconAnim: TargetAndTransition;
  };
  index: number;
}

function StatCard({ stat, index }: StatCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.42, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      style={{
        padding: '1px',
        borderRadius: '12px',
        background: isHovered
          ? `radial-gradient(120px circle at var(--mouse-x) var(--mouse-y), rgba(${stat.glowColor}, 0.5), transparent 80%), rgba(255,255,255,0.06)`
          : `linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)`,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        boxShadow: isHovered
          ? `0 8px 30px rgba(${stat.glowColor}, 0.08)`
          : '0 4px 12px rgba(0, 0, 0, 0.15)',
        '--mouse-x': `${coords.x}px`,
        '--mouse-y': `${coords.y}px`,
      } as React.CSSProperties}
    >
      <motion.div
        animate={{
          y: isHovered ? 0 : [0, -4, 0],
        }}
        transition={{
          duration: 4.2 + index * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '11px',
          overflow: 'hidden',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 0.9rem',
          background: isHovered ? 'rgba(7, 12, 20, 0.94)' : 'rgba(8, 14, 22, 0.72)',
          border: 'none',
          borderRadius: '11px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          transition: 'background 0.3s ease',
        }}>
          {isHovered && (
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: -1,
              pointerEvents: 'none',
              background: `radial-gradient(140px circle at var(--mouse-x) var(--mouse-y), rgba(${stat.glowColor}, 0.06), transparent 80%)`,
            }} />
          )}

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
            transform: 'translateX(-150%) skewX(-25deg)',
            animation: 'shimmer 6s infinite ease-in-out',
            animationDelay: `${index * 1.5}s`,
            pointerEvents: 'none',
            zIndex: 2,
          }} />

          <motion.div
            aria-hidden="true"
            animate={{
              opacity: isHovered ? 1 : [0.35, 0.75, 0.35],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: '0.6rem',
              right: '0.6rem',
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
              zIndex: 3,
            }}
          />

          <motion.div
            animate={isHovered ? {
              scale: 1.1,
              boxShadow: `0 0 15px rgba(${stat.glowColor}, 0.45)`,
              borderColor: stat.color,
              backgroundColor: `${stat.color}20`
            } : {
              scale: 1,
              boxShadow: `0 0 0px rgba(${stat.glowColor}, 0)`,
              borderColor: stat.border,
              backgroundColor: `${stat.color}12`
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '9px',
              border: `1px solid ${stat.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <motion.div
              animate={isHovered ? stat.iconAnim : { scale: 1, rotate: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 12 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {stat.icon}
            </motion.div>
          </motion.div>

          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: 'var(--font-head)',
              fontSize: '1.15rem',
              fontWeight: 800,
              color: stat.color,
              lineHeight: 1,
              letterSpacing: '-0.01em',
            }}>
              <AnimatedStatValue value={stat.value} />
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              color: isHovered ? '#a3d1e6' : '#8fb8cc',
              marginTop: '2px',
              transition: 'color 0.3s ease',
            }}>
              {stat.label}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Desktop stats panel ─────────────────────────────────── */
function ReviewStatsPanel() {
  const { content } = useLanguage();
  const { REVIEWS_SECTION } = content;

  const stats: StatCardProps['stat'][] = [
    {
      value: '4.8',
      label: REVIEWS_SECTION.avgRating,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#f5c842" aria-hidden="true"
          style={{ filter: 'drop-shadow(0 0 4px rgba(245,200,66,0.6))' }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
        </svg>
      ),
      color: '#f5c842',
      border: 'rgba(245,200,66,0.22)',
      glowColor: '245, 200, 66',
      iconAnim: { rotate: 180, scale: 1.15 }
    },
    {
      value: '35+',
      label: REVIEWS_SECTION.happyClients,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0dd3f0" strokeWidth="1.8" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      color: '#0dd3f0',
      border: 'rgba(13,211,240,0.22)',
      glowColor: '13, 211, 240',
      iconAnim: { y: [0, -3, 0], transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" } }
    },
    {
      value: '300+',
      label: REVIEWS_SECTION.projectsDone,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2596be" strokeWidth="1.8" aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        </svg>
      ),
      color: '#2596be',
      border: 'rgba(37,150,190,0.22)',
      glowColor: '37, 150, 190',
      iconAnim: { rotate: [0, -8, 8, -8, 0], transition: { duration: 0.5 } }
    },
    {
      value: '98%',
      label: REVIEWS_SECTION.satisfactionRate,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="1.8" aria-hidden="true">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"/>
          <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
        </svg>
      ),
      color: '#2ecc71',
      border: 'rgba(46,204,113,0.22)',
      glowColor: '46, 204, 113',
      iconAnim: { scale: 1.25, y: -2 }
    },
  ];

  return (
    <div className="reviews-stats-panel" aria-label="Review statistics">
      <div style={{ marginBottom: '0.5rem' }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.69rem', fontWeight: 600,
          color: 'rgba(37,150,190,0.65)', letterSpacing: '0.1em', textTransform: 'uppercase',
          marginBottom: '0.3rem',
        }}>
          {REVIEWS_SECTION.clientReviewsLabel}
        </p>
        <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(37,150,190,0.4), transparent)' }} aria-hidden="true" />
      </div>

      {stats.map((stat, i) => (
        <StatCard key={stat.label} stat={stat} index={i} />
      ))}

      {/* Available badge */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.45 }}
        whileHover={{
          scale: 1.03,
          backgroundColor: 'rgba(46,204,113,0.12)',
          borderColor: 'rgba(46,204,113,0.45)',
          boxShadow: '0 4px 20px rgba(46,204,113,0.15)',
        }}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.6rem 0.9rem',
          background: 'rgba(46,204,113,0.06)',
          border: '1px solid rgba(46,204,113,0.22)',
          borderRadius: '10px',
          cursor: 'default',
          transition: 'all 0.3s ease',
        }}
      >
        <span style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
          <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#2ecc71', boxShadow: '0 0 6px rgba(46,204,113,0.7)' }} />
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%', background: '#2ecc71',
            animation: 'liveRadarPulse 2s cubic-bezier(0.25,0.46,0.45,0.94) infinite',
          }} aria-hidden="true" />
        </span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, color: 'rgba(46,204,113,0.85)' }}>
          {REVIEWS_SECTION.availableLabel}
        </span>
      </motion.div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────── */
type ReviewId = string;

export default function ShuffleCards() {
  const { content, language } = useLanguage();
  const { REVIEWS, REVIEWS_SECTION } = content;

  const [order, setOrder] = useState<ReviewId[]>(
    REVIEWS.slice(0, 3).map(r => r.id)
  );
  const [pressed, setPressed] = useState(false);

  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [selectedVideoName, setSelectedVideoName] = useState<string>('');


  const shuffle = () => {
    setOrder(prev => {
      const next = [...prev];
      const last = next.pop()!;
      next.unshift(last);
      return next;
    });
  };

  const displayReviews = REVIEWS.slice(0, 3);

  return (
    <section
      style={{ padding: 'var(--section-py) 0', background: 'transparent', position: 'relative', overflowX: 'clip' }}
      id="reviews"
      aria-labelledby="reviews-heading"
    >
      {/* Gradient top divider */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '8%', right: '8%', height: '1px', pointerEvents: 'none',
        background: 'linear-gradient(90deg, transparent, rgba(37,150,190,0.32) 50%, transparent)',
      }} />

      {/* Section number watermark */}
      <ScrollParallax speed={-20} style={{ position: 'absolute', right: '-0.05em', top: '-0.1em', pointerEvents: 'none', zIndex: 0 } as any}>
        <span aria-hidden="true" style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(7rem, 18vw, 13rem)',
          fontWeight: 400, color: 'var(--primary)', opacity: 0.06,
          lineHeight: 1, userSelect: 'none', letterSpacing: '-0.02em',
          display: 'block',
        }}>04</span>
      </ScrollParallax>

      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '700px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,150,190,0.08) 0%, transparent 70%)',
        filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Dot-grid texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(37,150,190,0.07) 1px, transparent 1px)',
        backgroundSize: '38px 38px',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 80%)',
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 80%)',
        zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">{REVIEWS_SECTION.tag}</span>
          <h2 className="section-title" id="reviews-heading" style={{ marginTop: '0.5rem' }}>
            {REVIEWS_SECTION.heading}{' '}
            <span className="text-gradient">{REVIEWS_SECTION.headingAccent}</span>
          </h2>
          <ScrollReveal
            baseOpacity={0}
            enableBlur
            blurStrength={4}
            textClassName="section-subtitle"
            style={{ margin: '0.75rem auto 0' }}
          >
            {REVIEWS_SECTION.subtitle}
          </ScrollReveal>
        </motion.div>

        {/* Rating badge — centered above the full layout */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '1.75rem' }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
            padding: '0.45rem 1.1rem', borderRadius: '100px',
            background: 'rgba(37,150,190,0.07)',
            border: '1px solid rgba(37,150,190,0.32)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 20px rgba(37,150,190,0.06)',
          }}>
            <span aria-label="4.8 out of 5 stars" style={{ display: 'flex', gap: '2px' }}>
              {Array.from({ length: 5 }).map((_, i) => {
                const fillPercent = i === 4 ? 80 : 100;
                return <AnimatedStar key={i} index={i} size={13} fillPercent={fillPercent} />;
              })}
            </span>
            <span style={{ color: '#f0f6fb', fontWeight: 700, fontSize: '0.84rem', fontFamily: 'var(--font-head)' }}>4.8</span>
            <span style={{ color: '#8fb8cc', fontSize: '0.74rem', fontFamily: 'var(--font-body)' }}>
              {REVIEWS_SECTION.ratingFrom} 35+ {REVIEWS_SECTION.ratingClients}
            </span>
          </div>
        </motion.div>

        {/* Asymmetric layout */}
        <motion.div
          className="reviews-layout"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Card column */}
          <ScrollParallax speed={12} className="reviews-card-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' } as any}>
            {/* Card stack — visible overflow so drag gesture isn't clipped */}
            <div style={{
              position: 'relative',
              width: '310px',
              overflow: 'visible',
            }}>
              {displayReviews.map((review) => {
                const posMap: Record<number, 'front' | 'middle' | 'back'> = { 0: 'front', 1: 'middle', 2: 'back' };
                const orderIndex = order.indexOf(review.id);
                const position = posMap[orderIndex] ?? 'back';
                return (
                  <TestimonialCard
                    key={review.id}
                    handleShuffle={shuffle}
                    text={review.text}
                    position={position}
                    author={review.name}
                    role={review.role}
                    initials={review.initials}
                    gradient={review.avatarGradient}
                    dragLabel={REVIEWS_SECTION.dragToShuffle}
                    photo={review.photo}
                    socialLink={review.socialLink}
                    socialType={review.socialType}
                    socialStats={review.socialStats}
                  />
                );
              })}
            </div>

            {/* Shuffle button */}
            <motion.button
              onClick={shuffle}
              onPointerDown={() => setPressed(true)}
              onPointerUp={() => setPressed(false)}
              onPointerLeave={() => setPressed(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.55rem',
                padding: '0.75rem 1.8rem', borderRadius: '100px',
                background: pressed ? 'rgba(37,150,190,0.18)' : 'rgba(37,150,190,0.07)',
                border: '1px solid rgba(37,150,190,0.34)',
                backdropFilter: 'blur(14px)',
                boxShadow: pressed
                  ? 'inset 0 0 0 1px rgba(13,211,240,0.35), 0 0 24px rgba(37,150,190,0.22)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.08)',
                color: 'var(--primary-light)',
                fontSize: '0.82rem', fontWeight: 600, fontFamily: 'var(--font-body)',
                letterSpacing: '0.05em', cursor: 'pointer',
              }}
              whileHover={{ background: 'rgba(37,150,190,0.12)', y: -2 }}
              whileTap={{ scale: 0.93, y: 2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="17 1 21 5 17 9"/>
                <path d="M3 11V9a4 4 0 014-4h14"/>
                <polyline points="7 23 3 19 7 15"/>
                <path d="M21 13v2a4 4 0 01-4 4H3"/>
              </svg>
              {REVIEWS_SECTION.nextReview}
            </motion.button>
          </ScrollParallax>

          {/* Stats panel — desktop only */}
          <ScrollParallax speed={-12}>
            <ReviewStatsPanel />
          </ScrollParallax>
        </motion.div>

        {/* Video Testimonials grid */}
        {content.VIDEO_TESTIMONIALS && (
          <div style={{ marginTop: '5.5rem', width: '100%', position: 'relative', zIndex: 2 }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag" style={{ color: 'var(--primary-light)' }}>
                {language === 'bg' ? 'ВИДЕО ОТЗИВИ' : 'VIDEO REVIEWS'}
              </span>
              <h3 style={{
                fontFamily: 'var(--font-head)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.02em',
                marginTop: '0.4rem',
              }}>
                {language === 'bg' ? 'Клиентски Видео Отзиви' : 'Client Video Reviews'}
              </h3>
              <div style={{
                width: '40px', height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(13,211,240,0.6), transparent)',
                margin: '0.75rem auto 0',
              }} aria-hidden="true" />
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.75rem',
              width: '100%',
            }}>
              {content.VIDEO_TESTIMONIALS.map((vt) => (
                <VideoTestimonialCard
                  key={vt.id}
                  name={vt.name}
                  role={vt.role}
                  videoUrl={vt.videoUrl}
                  onClick={() => {
                    setSelectedVideoUrl(vt.videoUrl);
                    setSelectedVideoName(vt.name);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedVideoUrl && (
          <ReviewsVideoModal
            videoUrl={selectedVideoUrl}
            name={selectedVideoName}
            onClose={() => {
              setSelectedVideoUrl(null);
              setSelectedVideoName('');
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
