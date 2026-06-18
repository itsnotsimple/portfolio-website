import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import CustomVideoPlayer from '../../media/CustomVideoPlayer';
import type { CustomVideoPlayerRef } from '../../media/CustomVideoPlayer';
import { isMobileDevice } from '../../../../lib/device';
import { useFocusTrap } from '../../../../hooks/useFocusTrap';

export function ReviewsVideoModal({ videoUrl, name, onClose }: { videoUrl: string; name: string; onClose: () => void }) {
  const [isMobile] = useState(() => isMobileDevice());
  const videoRef = useRef<CustomVideoPlayerRef>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, onClose);

  useEffect(() => {
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const currentVideo = videoRef.current;
    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      currentVideo?.pause();
    };
  }, []);

  return createPortal(
    <motion.div
      ref={modalRef}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Video Testimonial from ${name}`}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(4,8,12,0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
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

      {/* Cinematic 3D modal card */}
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
        }}
      >
        <CustomVideoPlayer
          ref={videoRef}
          src={videoUrl}
          objectFit="cover"
          autoPlay={true}
          playsInline={true}
          muted={false}
        />
      </motion.div>

      {/* Close button */}
      <button
        onClick={e => { e.stopPropagation(); onClose(); }}
        aria-label="Close video testimonial"
        style={{
          position: 'absolute',
          top: isMobile ? '1.25rem' : '2.5rem',
          right: isMobile ? '1.25rem' : '2.5rem',
          zIndex: 100000,
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
    </motion.div>,
    document.body
  );
}
