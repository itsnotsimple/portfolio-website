import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FAQItem as FAQItemType } from '../../types';

interface FAQItemProps { item: FAQItemType; index: number; }

export default function FAQItem({ item, index }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      role="listitem"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.045, ease: [0.4, 0, 0.2, 1] }}
      layout="position"
      style={{
        border: `1px solid ${open ? 'rgba(37,150,190,0.32)' : 'rgba(37,150,190,0.14)'}`,
        borderRadius: 'var(--radius)',
        background: open ? 'rgba(37,150,190,0.05)' : 'var(--bg-card)',
        boxShadow: open
          ? '0 6px 32px rgba(37,150,190,0.12), inset 0 0 0 1px rgba(37,150,190,0.06)'
          : 'none',
        transition: 'border-color 0.28s ease, box-shadow 0.28s ease, background 0.28s ease',
        position: 'relative', overflow: 'hidden',
        willChange: 'auto',
      }}
    >
      {/* Left gradient accent bar — visible only when open */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', left: 0, top: '14%', bottom: '14%',
          width: '3px',
          background: 'linear-gradient(to bottom, var(--accent), var(--primary))',
          borderRadius: '0 3px 3px 0',
          opacity: open ? 1 : 0,
          transform: open ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
          transition: 'opacity 0.25s var(--ease-expo), transform 0.3s var(--ease-expo)',
        }}
      />

      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-trigger-${item.id}`}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '1rem',
          padding: '1.2rem 1.35rem', textAlign: 'left',
          cursor: 'pointer', background: 'transparent', border: 'none',
          fontFamily: 'inherit', borderRadius: 'var(--radius)',
          transition: 'background 0.15s ease',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
          {/* Numbered badge */}
          <span
            aria-hidden="true"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.88rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: open ? 'var(--accent)' : 'rgba(37,150,190,0.38)',
              minWidth: '24px',
              flexShrink: 0,
              lineHeight: 1,
              transition: 'color 0.22s ease',
              userSelect: 'none',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <span style={{
            fontFamily: 'var(--font-head)', fontSize: '0.97rem', fontWeight: 700,
            color: open ? 'var(--primary-light)' : 'var(--text)',
            lineHeight: 1.45, overflow: 'visible',
            transition: 'color 0.22s ease',
          }}>
            {item.question}
          </span>
        </span>

        {/* Chevron */}
        <motion.span
          style={{
            width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
            background: open ? 'rgba(37,150,190,0.2)' : 'var(--primary-subtle)',
            border: `1px solid ${open ? 'var(--primary)' : 'var(--border-hover)'}`,
            boxShadow: open ? '0 0 14px rgba(37,150,190,0.28)' : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--primary-light)',
            transition: 'background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease',
          }}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${item.id}`}
            role="region"
            aria-labelledby={`faq-trigger-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0.9rem 1.35rem 1.2rem',
              color: '#8fb8cc', fontFamily: 'var(--font-body)',
              fontSize: '0.93rem', lineHeight: 1.8,
              borderTop: '1px solid rgba(37,150,190,0.15)',
              margin: '0 1.35rem',
              paddingTop: '0.9rem', marginBottom: '1.2rem',
            }}>
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
