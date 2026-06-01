import { motion } from 'framer-motion';
import type { Video } from '../../types';
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
  return (
    <motion.article
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
      <img
        className={styles.thumb}
        src={video.thumb}
        alt={`${video.title} thumbnail`}
        loading="lazy"
      />

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
