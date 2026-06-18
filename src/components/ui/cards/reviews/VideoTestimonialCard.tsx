import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function VideoTestimonialCard({
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

  // Lazy-load video src via IntersectionObserver — prevents all cards
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
      { rootMargin: '200px' }
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
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          preload="auto"
          playsInline
          muted
          autoPlay
          loop
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          controlsList="nodownload"
          disablePictureInPicture
          disableRemotePlayback
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

      {/* Dark gradient overlay */}
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

      {/* Play button */}
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

      {/* Card info */}
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
