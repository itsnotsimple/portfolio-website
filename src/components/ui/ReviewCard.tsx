import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Review } from '../../types';
import styles from './ReviewCard.module.css';

interface ReviewCardProps { review: Review; index: number; }

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`${styles.star} ${filled ? styles.starFilled : styles.starEmpty}`}
    viewBox="0 0 24 24" aria-hidden="true" width="14" height="14">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"
      fill="currentColor"/>
  </svg>
);

const isMobileDevice = () =>
  typeof window !== 'undefined' &&
  (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768);

export default function ReviewCard({ review, index }: ReviewCardProps) {
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = isMobileDevice();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  const scale   = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.72]);
  const filter  = useTransform(scrollYProgress, [0, 1], ["brightness(1)", "brightness(0.6)"]);

  const motionStyle = isMobile
    ? {}
    : { scale, opacity, filter };

  return (
    <motion.article
      ref={cardRef}
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      style={{ ...motionStyle, ['--index' as any]: index, zIndex: index + 1 } as any}
      role="listitem"
    >
      <div className={styles.topLine} aria-hidden="true" />
      <span className={styles.quote} aria-hidden="true">"</span>
      <div className={styles.stars} role="img" aria-label={`${review.stars} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} filled={i < review.stars} />
        ))}
      </div>
      <p className={styles.text}>{review.text}</p>
      <div className={styles.author}>
        {review.photo && !imageError ? (
          <img
            src={review.photo}
            alt={review.name}
            className={styles.avatarPhoto}
            width={44}
            height={44}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className={styles.avatarInitials}
            style={{ background: review.avatarGradient }}
            aria-hidden="true"
          >
            {review.initials}
          </div>
        )}
        <div className={styles.authorInfo}>
          <span className={styles.name}>{review.name}</span>
          <span className={styles.role}>{review.role} · {review.company}</span>
          <span className={styles.project}>{review.project}</span>
        </div>
      </div>
    </motion.article>
  );
}
