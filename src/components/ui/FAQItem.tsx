import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FAQItem as FAQItemType } from '../../types';
import styles from './FAQItem.module.css';

interface FAQItemProps { item: FAQItemType; index: number; }

export default function FAQItem({ item, index }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    /* No whileInView on the item itself — prevents scroll choppiness.
       The parent FAQ section animates in as a whole instead. */
    <motion.div
      className={`${styles.item} ${open ? styles.open : ''}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.045, ease: [0.4, 0, 0.2, 1] }}
      layout="position"
    >
      <button
        className={styles.trigger}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-trigger-${item.id}`}
      >
        <span className={styles.question}>{item.question}</span>
        <motion.span
          className={styles.icon}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden="true"
        >+</motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${item.id}`}
            role="region"
            aria-labelledby={`faq-trigger-${item.id}`}
            className={styles.answer}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className={styles.answerInner}>{item.answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
