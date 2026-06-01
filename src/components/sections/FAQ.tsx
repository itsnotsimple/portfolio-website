import { motion } from 'framer-motion';
import { FAQ_ITEMS, FAQ_SECTION } from '../../data/content';
import FAQItem from '../ui/FAQItem';
import ScrollParallax from '../ui/ScrollParallax';
import styles from './FAQ.module.css';

export default function FAQ() {
  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-heading">
      <div className="container">
        
        {/* Centered Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <ScrollParallax speed={-15}>
            <span className="section-tag">{FAQ_SECTION.tag}</span>
          </ScrollParallax>
          <ScrollParallax speed={18}>
            <h2 className="section-title" id="faq-heading">
              {FAQ_SECTION.heading} <span className="text-gradient">{FAQ_SECTION.headingAccent}</span>
            </h2>
          </ScrollParallax>
          <ScrollParallax speed={6}>
            <p className="section-subtitle">
              {FAQ_SECTION.subtitle}
            </p>
          </ScrollParallax>
        </motion.div>

        {/* Accordion container */}
        <ScrollParallax speed={20} className={styles.accordionContainer}>
          <div className={styles.right} role="list" aria-label="Frequently asked questions">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={item.id} item={item} index={i} />
            ))}
          </div>

          <div className={styles.ctaWrapper}>
            <motion.a
              href="#contact"
              className={`btn btn-secondary ${styles.ctaBtn}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.26, ease: [0.25, 1, 0.5, 1] }}
            >
              <span>{FAQ_SECTION.ctaText}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.a>
          </div>
        </ScrollParallax>

      </div>
    </section>
  );
}
