import { REVIEWS, REVIEWS_SECTION } from '../../data/content';
import ReviewCard from '../ui/ReviewCard';
import { motion } from 'framer-motion';
import ScrollParallax from '../ui/ScrollParallax';
import styles from './Reviews.module.css';

export default function Reviews() {
  return (
    <section className={styles.section} id="reviews" aria-labelledby="reviews-heading">
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <ScrollParallax speed={-15}>
            <span className="section-tag">{REVIEWS_SECTION.tag}</span>
          </ScrollParallax>
          <ScrollParallax speed={18}>
            <h2 className="section-title" id="reviews-heading">
              {REVIEWS_SECTION.heading} <span className="text-gradient">{REVIEWS_SECTION.headingAccent}</span>
            </h2>
          </ScrollParallax>
          <ScrollParallax speed={6}>
            <p className="section-subtitle">
              {REVIEWS_SECTION.subtitle}
            </p>
          </ScrollParallax>
        </motion.div>

        <div className={styles.grid} role="list" aria-label="Client reviews">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
