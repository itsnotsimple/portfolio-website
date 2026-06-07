import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import type { Video } from '../../../types';
import styles from './VideoCard.module.css';

interface VideoCardProps {
  video: Video;
  index: number;
  onClick: (video: Video) => void;
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" aria-hidden="true" width="24" height="24">
    <path d="M5 3l14 9-14 9V3z" />
  </svg>
);

export default function VideoCard({ video, index, onClick }: VideoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile] = useState(() => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 1024);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // Lazy-load video src — only start fetching metadata when card scrolls into view.
  // Without this, all 11 portfolio videos issue simultaneous range requests on load,
  // causing extreme TBT and network saturation.
  useEffect(() => {
    if (!video.videoUrl || !cardRef.current) return;
    const el = cardRef.current;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVideoSrc(`${video.videoUrl}#t=0.1`); obs.disconnect(); } },
      { rootMargin: '400px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [video.videoUrl]);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);
  const smoothY = useSpring(yTransform, {
    stiffness: 90,
    damping: 25,
    mass: 0.15,
  });

  // On mobile: render a lightweight static card with no Framer Motion observers,
  // no 3D transforms, and no gesture tracking to avoid locking the JS main thread
  if (isMobile) {
    return (
      <article
        ref={cardRef}
        className={`${styles.card} ${video.featured ? styles.featured : ''}`}
        onClick={() => onClick(video)}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick(video)}
        tabIndex={0}
        role="button"
        aria-label={`Play ${video.title}`}
      >
        {videoSrc ? (
          <video
            className={styles.thumb}
            src={videoSrc}
            preload="metadata"
            playsInline
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : video.thumb ? (
          <img
            className={styles.thumb}
            src={video.thumb}
            alt={`${video.title} thumbnail`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={styles.thumb} style={{ background: '#040a14' }} />
        )}

        {/* Overlay */}
        <div className={styles.overlay}>
          <span className={styles.category}>{video.categoryLabel}</span>
          <h3 className={styles.title}>{video.title}</h3>
        </div>

        {/* Static play button — no motion observers */}
        <div className={styles.playBtn} aria-hidden="true">
          <PlayIcon />
        </div>

        {/* Duration badge */}
        <span className={styles.duration}>{video.duration}</span>
      </article>
    );
  }

  // Desktop: full animated card with 3D entry, whileInView, and hover lift
  return (
    <motion.article
      ref={cardRef}
      className={`${styles.card} ${video.featured ? styles.featured : ''}`}
      initial={{ opacity: 0, y: 40, rotateX: 12, z: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onClick={() => onClick(video)}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick(video)}
      tabIndex={0}
      role="button"
      aria-label={`Play ${video.title}`}
    >
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit' }}>
        {videoSrc ? (
          <motion.video
            className={styles.thumb}
            src={videoSrc}
            preload="metadata"
            playsInline
            muted
            style={{ y: smoothY, scale: 1.30, width: '100%', height: '100%', objectFit: 'cover' }}
            whileHover={{ scale: 1.40 }}
            transition={{ duration: 0.4 }}
          />
        ) : video.thumb ? (
          <motion.img
            className={styles.thumb}
            src={video.thumb}
            alt={`${video.title} thumbnail`}
            style={{ y: smoothY, scale: 1.30, width: '100%', height: '100%', objectFit: 'cover' }}
            whileHover={{ scale: 1.40 }}
            transition={{ duration: 0.4 }}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={styles.thumb} style={{ background: '#040a14' }} />
        )}
      </div>

      {/* Overlay */}
      <div className={styles.overlay}>
        <span className={styles.category}>{video.categoryLabel}</span>
        <h3 className={styles.title}>{video.title}</h3>
      </div>

      {/* Play button */}
      <motion.div
        className={styles.playBtn}
        initial={{ opacity: 0, scale: 0.75 }}
        whileHover={{ opacity: 1, scale: 1 }}
        aria-hidden="true"
      >
        <PlayIcon />
      </motion.div>

      {/* Duration badge */}
      <span className={styles.duration}>{video.duration}</span>
    </motion.article>
  );
}
