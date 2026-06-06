import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import type { Video } from '../../types';
import ScrollReveal from '../ui/ScrollReveal';
import ScrollParallax from '../ui/ScrollParallax';
import Folder from '../ui/Folder';


const isMobile = typeof window !== 'undefined' &&
  (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent));

function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;

      // Hard-stop the video on unmount — prevents audio playing during exit animation
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
      aria-label={`Video: ${video.title}`}
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

      {/* Floating close button — absolute to viewport, avoiding player element overlap */}
      <button
        onClick={e => { e.stopPropagation(); onClose(); }}
        aria-label="Close video"
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

      <motion.div
        initial={{ scale: 0.75, opacity: 0, y: 60, rotateX: 30, rotateY: -20, z: -150 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0, rotateY: 0, z: 0 }}
        exit={{ scale: 0.82, opacity: 0, y: 40, rotateX: -22, rotateY: 15, z: -100 }}
        transition={{ type: 'spring', stiffness: 140, damping: 20 }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', width: '100%', maxWidth: '860px',
          background: 'rgba(8,14,22,0.97)',
          border: '1px solid rgba(37,150,190,0.45)',
          borderRadius: '24px', overflow: 'hidden',
          boxShadow: '0 0 0 1px rgba(37,150,190,0.06) inset, 0 50px 100px rgba(0,0,0,0.8), 0 0 80px rgba(37,150,190,0.14)',
          backdropFilter: 'blur(24px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Top cyan gradient line */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: '2rem', right: '2rem', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(13,211,240,0.85), transparent)',
            zIndex: 3,
          }}
        />

        <div style={{ aspectRatio: '16/9', width: '100%', background: '#02060c', position: 'relative' }}>
          {video.videoUrl ? (
            <video
              ref={videoRef}
              src={video.videoUrl}
              controls
              autoPlay
              playsInline
              controlsList="nodownload"
              onContextMenu={e => e.preventDefault()}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%', minHeight: '220px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '0.85rem', padding: '2.5rem', textAlign: 'center',
              background: 'radial-gradient(ellipse at center, rgba(37,150,190,0.11) 0%, transparent 70%)',
            }}>
              <motion.div
                animate={{
                  filter: [
                    'drop-shadow(0 0 18px rgba(37,150,190,0.5))',
                    'drop-shadow(0 0 36px rgba(37,150,190,0.85))',
                    'drop-shadow(0 0 18px rgba(37,150,190,0.5))',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: '3.5rem', color: 'var(--primary)' }}
              >▶</motion.div>
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>{video.title}</h3>
              <p style={{ fontSize: '0.87rem', color: '#8fb8cc', maxWidth: '440px', lineHeight: 1.7 }}>{video.description}</p>
              <span style={{
                fontSize: '0.73rem', color: 'var(--text-muted)',
                border: '1px dashed rgba(37,150,190,0.32)',
                padding: '0.3rem 0.85rem', borderRadius: '8px',
              }}>
                Replace with your actual video file
              </span>
            </div>
          )}
        </div>

        {/* Video details display below player (only if videoUrl exists) */}
        {video.videoUrl && (
          <div style={{
            padding: '1.25rem 1.75rem 1.75rem',
            background: 'linear-gradient(to bottom, rgba(8,14,22,0.8), rgba(4,8,12,0.96))',
            borderTop: '1px solid rgba(37,150,190,0.15)',
          }}>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--primary)',
              letterSpacing: '0.08em',
              display: 'inline-block',
              marginBottom: '0.4rem',
            }}>
              {video.categoryLabel}
            </span>
            <h3 style={{
              fontFamily: 'var(--font-head)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '0.5rem',
              lineHeight: 1.3,
            }}>
              {video.title}
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              color: '#8fb8cc',
              lineHeight: 1.5,
              margin: 0,
            }}>
              {video.description}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function VideoPaper({ video }: { video: Video }) {
  const playSize = isMobile ? '18px' : '14px';
  const labelSize = isMobile ? '9px' : '6px';
  const titleSize = isMobile ? '8px' : '6px';
  const paperRef = useRef<HTMLDivElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // Lazy-load: only fetch video metadata when the folder paper enters the viewport
  useEffect(() => {
    if (!video.videoUrl || !paperRef.current) return;
    const el = paperRef.current;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVideoSrc(`${video.videoUrl}#t=0.1`); obs.disconnect(); } },
      { rootMargin: '300px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [video.videoUrl]);

  return (
    <div ref={paperRef} style={{
      position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', width: '100%', height: '100%',
      padding: '6px 4px', gap: '3px',
      borderRadius: '8px', overflow: 'hidden', userSelect: 'none',
      background: '#040a14',
    }}>
      {/* Background Video Preview — lazy-loaded via IntersectionObserver */}
      {videoSrc ? (
        <video
          src={videoSrc}
          preload="metadata"
          playsInline
          muted
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 0.35,
          }}
        />
      ) : video.thumb ? (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${video.thumb})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          opacity: 0.35,
        }} />
      ) : null}

      {/* Dark tint gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(145deg, rgba(10, 22, 40, 0.55), rgba(14, 32, 56, 0.72))',
        zIndex: 1,
      }} />

      {/* Text and play button on top */}
      <div style={{ fontSize: playSize, color: '#2596be', lineHeight: 1, filter: 'drop-shadow(0 0 5px rgba(37,150,190,0.7))', zIndex: 2 }}>▶</div>
      <span style={{ fontSize: labelSize, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2596be', lineHeight: 1, zIndex: 2 }}>{video.categoryLabel}</span>
      <span style={{ fontSize: titleSize, color: 'rgba(240,246,251,0.85)', textAlign: 'center', lineHeight: 1.3, maxHeight: '28px', overflow: 'hidden', zIndex: 2 }}>{video.title}</span>
    </div>
  );
}

const FOLDER_COLORS: Record<string, string> = {
  all: '#2596be',
  'after-effects': '#8B5CF6',
  'brand-promoting': '#2596be',
  'food-videos': '#f97316',
  'simple-editing': '#14b8a6',
  'youtube-shorts': '#ef4444',
};

export default function Work() {
  const { content } = useLanguage();
  const { VIDEOS, FILTER_CATEGORIES, WORK_SECTION } = content;

  function getVideosForCategory(key: string): Video[] {
    if (key === 'all') return VIDEOS.slice(0, 3);
    return VIDEOS.filter(v => v.category === key);
  }

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const toggle = (key: string) => setActiveFilter(prev => (prev === key ? null : key));
  const folderSize = isMobile ? 0.8 : 0.72;

  const folderRow = (
    <div
      role="tablist"
      aria-label="Filter projects"
      style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: isMobile ? '0.6rem 1rem' : '1rem 1.8rem',
        marginBottom: '3rem', paddingTop: isMobile ? '2.5rem' : '3.5rem',
        position: 'relative', overflow: 'visible',
      }}
    >
      {/* Ambient glow platform */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: '-60px -80px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at 50% 70%, rgba(37,150,190,0.08) 0%, transparent 65%)',
        }}
      />

      {FILTER_CATEGORIES.map((cat, catIndex) => {
        const catVideos = getVideosForCategory(cat.key);
        const isActive = activeFilter === cat.key;
        const paperItems = catVideos.slice(0, 3).map(v => <VideoPaper key={v.id} video={v} />);

        const inner = (
          <>
            <Folder
              size={folderSize}
              color={FOLDER_COLORS[cat.key] ?? '#2596be'}
              open={isActive}
              onToggle={() => toggle(cat.key)}
              items={paperItems}
              onItemClick={idx => {
                const v = catVideos[idx];
                if (v) setSelectedVideo(v);
              }}
            />
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 500,
              color: isActive ? '#fff' : '#8fb8cc', letterSpacing: '0.04em',
              whiteSpace: 'nowrap', transition: 'color 0.15s ease',
              textShadow: isActive ? '0 0 12px rgba(37,150,190,0.7)' : 'none',
            }}>{cat.label}</span>
          </>
        );

        const btnBase: React.CSSProperties = {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '0.5rem', background: 'none', border: 'none',
          cursor: 'pointer', padding: 0, overflow: 'visible',
          position: 'relative', zIndex: 1,
        };

        if (isMobile) {
          return (
            <motion.button
              key={cat.key}
              style={btnBase}
              onClick={() => toggle(cat.key)}
              role="tab"
              aria-selected={isActive}
              id={`filter-${cat.key}`}
              type="button"
              aria-label={`Filter by ${cat.label}`}
              initial={{ opacity: 0, y: 40, scale: 0.88 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.55, delay: catIndex * 0.09, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {inner}
            </motion.button>
          );
        }

        return (
          <button
            key={cat.key}
            style={btnBase}
            onClick={() => toggle(cat.key)}
            role="tab"
            aria-selected={isActive}
            id={`filter-${cat.key}`}
            type="button"
            aria-label={`Filter by ${cat.label}`}
          >
            {inner}
          </button>
        );
      })}
    </div>
  );

  const header = (
    <motion.div
      style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      <span className="section-tag">{WORK_SECTION.tag}</span>
      <h2 className="section-title" id="work-heading">
        {WORK_SECTION.heading} <span className="text-gradient">{WORK_SECTION.headingAccent}</span>
      </h2>
      <ScrollReveal baseOpacity={0} enableBlur baseRotation={isMobile ? undefined : 2} blurStrength={4} textClassName="section-subtitle">
        {WORK_SECTION.subtitle}
      </ScrollReveal>
    </motion.div>
  );

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
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

      {/* Section number watermark */}
      <ScrollParallax speed={-20} style={{ position: 'absolute', right: '-0.05em', top: '-0.1em', pointerEvents: 'none', zIndex: 0 } as any}>
        <span
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(7rem, 18vw, 13rem)',
            fontWeight: 400, color: 'var(--primary)', opacity: 0.06,
            lineHeight: 1, userSelect: 'none', letterSpacing: '-0.02em',
            display: 'block',
          }}
        >02</span>
      </ScrollParallax>


      <div className="container">
        {header}
        {isMobile ? folderRow : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {folderRow}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
