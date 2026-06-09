import { motion } from 'framer-motion';
import { useLanguage } from '../../../../context/LanguageContext';
import { StatCard } from './StatCard';
import type { StatCardProps } from './StatCard';

export function ReviewStatsPanel() {
  const { content } = useLanguage();
  const { REVIEWS_SECTION } = content;

  const stats: StatCardProps['stat'][] = [
    {
      value: '4.8',
      label: REVIEWS_SECTION.avgRating,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#f5c842" aria-hidden="true"
          style={{ filter: 'drop-shadow(0 0 4px rgba(245,200,66,0.6))' }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
        </svg>
      ),
      color: '#f5c842',
      border: 'rgba(245,200,66,0.22)',
      glowColor: '245, 200, 66',
      iconAnim: { rotate: 180, scale: 1.15 },
    },
    {
      value: '35+',
      label: REVIEWS_SECTION.happyClients,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0dd3f0" strokeWidth="1.8" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      color: '#0dd3f0',
      border: 'rgba(13,211,240,0.22)',
      glowColor: '13, 211, 240',
      iconAnim: { y: [0, -3, 0], transition: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' } },
    },
    {
      value: '300+',
      label: REVIEWS_SECTION.projectsDone,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2596be" strokeWidth="1.8" aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        </svg>
      ),
      color: '#2596be',
      border: 'rgba(37,150,190,0.22)',
      glowColor: '37, 150, 190',
      iconAnim: { rotate: [0, -8, 8, -8, 0], transition: { duration: 0.5 } },
    },
    {
      value: '98%',
      label: REVIEWS_SECTION.satisfactionRate,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="1.8" aria-hidden="true">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"/>
          <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
        </svg>
      ),
      color: '#2ecc71',
      border: 'rgba(46,204,113,0.22)',
      glowColor: '46, 204, 113',
      iconAnim: { scale: 1.25, y: -2 },
    },
  ];

  return (
    <div className="reviews-stats-panel" aria-label="Review statistics">
      <div style={{ marginBottom: '0.5rem' }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.69rem', fontWeight: 600,
          color: 'rgba(37,150,190,0.65)', letterSpacing: '0.1em', textTransform: 'uppercase',
          marginBottom: '0.3rem',
        }}>
          {REVIEWS_SECTION.clientReviewsLabel}
        </p>
        <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(37,150,190,0.4), transparent)' }} aria-hidden="true" />
      </div>

      {stats.map((stat, i) => (
        <StatCard key={stat.label} stat={stat} index={i} />
      ))}

      {/* Available badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.45 }}
        whileHover={{ borderColor: 'rgba(46,204,113,0.32)', boxShadow: '0 4px 22px rgba(46,204,113,0.1)' }}
        style={{
          position: 'relative',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.7rem 1rem',
          borderRadius: '10px',
          background: 'rgba(46,204,113,0.04)',
          border: '1px solid rgba(46,204,113,0.13)',
          overflow: 'hidden',
          cursor: 'default',
        }}
      >
        {/* Animated left accent bar */}
        <div aria-hidden="true" style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: '3px',
          borderRadius: '10px 0 0 10px',
          background: 'linear-gradient(180deg, transparent 0%, #2ecc71 50%, transparent 100%)',
          animation: 'accentBarGlow 2.5s ease-in-out infinite',
        }} />

        {/* Check circle */}
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
          background: 'rgba(46,204,113,0.1)',
          border: '1px solid rgba(46,204,113,0.28)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 10px rgba(46,204,113,0.12)',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>

        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.74rem', fontWeight: 600, color: 'rgba(46,204,113,0.82)', letterSpacing: '0.03em' }}>
          {REVIEWS_SECTION.availableLabel}
        </span>
      </motion.div>
    </div>
  );
}
