import { useState } from 'react';
import { motion } from 'framer-motion';
import { VIDEOS, FILTER_CATEGORIES, WORK_SECTION } from '../../data/content';
import type { Video } from '../../types';
import VideoCard from '../ui/VideoCard';
import ScrollParallax from '../ui/ScrollParallax';
import styles from './Work.module.css';

function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Video: ${video.title}`}
    >
      <motion.div
        className={styles.modal}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.modalClose} onClick={onClose} aria-label="Close video">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div className={styles.modalVideo}>
          <div className={styles.modalPlaceholder}>
            <div className={styles.modalPlay} aria-hidden="true">▶</div>
            <h3 className={styles.modalTitle}>{video.title}</h3>
            <p className={styles.modalDesc}>{video.description}</p>
            <span className={styles.modalNote}>Replace with your actual video file</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const filtered = activeFilter === 'all'
    ? VIDEOS
    : VIDEOS.filter(v => v.category === activeFilter);

  return (
    <section className={styles.section} id="work" aria-labelledby="work-heading">
      <div className="container">
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <ScrollParallax speed={-15}>
            <span className="section-tag">{WORK_SECTION.tag}</span>
          </ScrollParallax>
          <ScrollParallax speed={18}>
            <h2 className="section-title" id="work-heading">
              {WORK_SECTION.heading} <span className="text-gradient">{WORK_SECTION.headingAccent}</span>
            </h2>
          </ScrollParallax>
          <ScrollParallax speed={6}>
            <p className="section-subtitle">
              {WORK_SECTION.subtitle}
            </p>
          </ScrollParallax>
        </motion.div>

        {/* Filters */}
        <motion.div
          className={styles.filters}
          role="tablist"
          aria-label="Filter projects"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {FILTER_CATEGORIES.map(cat => (
            <motion.button
              key={cat.key}
              className={`${styles.filterBtn} ${activeFilter === cat.key ? styles.filterActive : ''}`}
              onClick={() => setActiveFilter(cat.key)}
              role="tab"
              aria-selected={activeFilter === cat.key}
              id={`filter-${cat.key}`}
              whileTap={{ scale: 0.95 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className={styles.grid} role="list" aria-label="Portfolio projects">
          {filtered.map((video, i) => {
            const column = i % 3;
            const speed = video.featured ? 0 : column === 0 ? -35 : column === 1 ? 20 : -15;
            return (
              <ScrollParallax
                key={video.id}
                speed={speed}
                style={{ gridColumn: video.featured ? '1 / -1' : undefined }}
              >
                <VideoCard
                  video={video}
                  index={i}
                  onClick={setSelectedVideo}
                />
              </ScrollParallax>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </section>
  );
}
