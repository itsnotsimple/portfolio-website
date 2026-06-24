import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { TargetAndTransition } from 'framer-motion';
import { AnimatedStar } from './AnimatedStar';

export interface CardProps {
  text: string;
  position: 'front' | 'middle' | 'back';
  author: string;
  role: string;
  initials: string;
  gradient: string;
  photo?: string;
  socialLink?: string;
  socialType?: 'youtube' | 'instagram' | 'tiktok';
  socialStats?: string;
}

export function TestimonialCard({
  text,
  position,
  author,
  role,
  initials,
  gradient,
  photo,
  socialLink,
  socialType,
  socialStats,
}: CardProps) {
  const isFront = position === 'front';

  const positionStyles: Record<string, TargetAndTransition> = {
    front:  { zIndex: 3, rotate: '-3deg', x: '0%' },
    middle: { zIndex: 2, rotate: '2deg',  x: '16%' },
    back:   { zIndex: 1, rotate: '5deg',  x: '28%' },
  };

  // Shadow settings for high rendering performance.
  const shadowValue = isFront
    ? '0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(37, 150, 190, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
    : '0 6px 16px rgba(0, 0, 0, 0.4)';

  // Track position changes to trigger high-end swipe animation when moving from front to back
  const prevPositionRef = useRef(position);
  const [animationState, setAnimationState] = useState<'normal' | 'shuffling'>('normal');

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (position === 'back' && prevPositionRef.current === 'front') {
      setAnimationState('shuffling');
      t = setTimeout(() => {
        setAnimationState('normal');
      }, 650);
    } else {
      setAnimationState('normal');
    }
    prevPositionRef.current = position;

    return () => {
      if (t) clearTimeout(t);
    };
  }, [position]);

  const isShufflingToBack = animationState === 'shuffling';
  const flyOutX = '-110%';
  const flyOutRotate = -15;

  return (
    <motion.div
      animate={
        isShufflingToBack
          ? { zIndex: [3, 1, 1], rotate: ['-3deg', `${flyOutRotate}deg`, '5deg'], x: ['0%', flyOutX, '28%'] }
          : positionStyles[position]
      }
      transition={
        isShufflingToBack
          ? { duration: 0.65, ease: [0.25, 1, 0.5, 1], times: [0, 0.35, 1] }
          : { duration: 0.35, type: 'spring', stiffness: 200, damping: 22 }
      }
      style={{
        ...(isFront
          ? { position: 'relative', width: '100%', height: '425px' }
          : { position: 'absolute', left: 0, top: 0, width: '100%', height: '425px' }),
        cursor: 'default',
        userSelect: 'none', borderRadius: '20px',
        background: 'rgba(8, 14, 26, 0.96)', // slightly more opaque to compensate for removing backdrop-filter
        border: `1px solid ${isFront ? 'rgba(37,150,190,0.32)' : 'rgba(37,150,190,0.12)'}`,
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

      {/* Author name and role */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0.4rem', flexShrink: 0 }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f0f6fb', fontFamily: 'var(--font-head)', textAlign: 'center' }}>
          {author}
        </div>
        <div style={{ fontSize: '0.74rem', color: 'var(--primary-light)', fontFamily: 'var(--font-body)', textAlign: 'center', marginTop: '2px' }}>
          {role}
        </div>
      </div>

      {/* Stars */}
      <div style={{ display: 'flex', gap: '3px', marginBottom: '0.5rem', flexShrink: 0 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <AnimatedStar key={i} index={i} size={15} />
        ))}
      </div>

      {/* Social badge or spacer */}
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
        /* Spacer to maintain vertical alignment when no social badge */
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


    </motion.div>
  );
}
