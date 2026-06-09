"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import ScrollReveal from '../effects/ScrollReveal';
import ScrollParallax from '../effects/ScrollParallax';
import { AnimatedStar } from './reviews/AnimatedStar';
import { ReviewsVideoModal } from './reviews/ReviewsVideoModal';
import { VideoTestimonialCard } from './reviews/VideoTestimonialCard';
import { TestimonialCard } from './reviews/TestimonialCard';
import { ReviewStatsPanel } from './reviews/ReviewStatsPanel';

type ReviewId = string;

export default function ShuffleCards() {
  const { content, language } = useLanguage();
  const { REVIEWS, REVIEWS_SECTION } = content;

  const [order, setOrder] = useState<ReviewId[]>(
    REVIEWS.slice(0, 3).map(r => r.id)
  );
  const [pressed, setPressed] = useState(false);

  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [selectedVideoName, setSelectedVideoName] = useState<string>('');

  const shuffle = () => {
    setOrder(prev => {
      const next = [...prev];
      const last = next.pop()!;
      next.unshift(last);
      return next;
    });
  };

  const displayReviews = REVIEWS.slice(0, 3);

  return (
    <section
      style={{ padding: 'var(--section-py) 0', background: 'transparent', position: 'relative', overflowX: 'clip', zIndex: 6, isolation: 'isolate' }}
      id="reviews"
      aria-labelledby="reviews-heading"
    >
      {/* Gradient top divider */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '8%', right: '8%', height: '1px', pointerEvents: 'none',
        background: 'linear-gradient(90deg, transparent, rgba(37,150,190,0.32) 50%, transparent)',
      }} />

      {/* Section number watermark */}
      <ScrollParallax speed={-55} style={{ position: 'absolute', right: '-0.05em', top: '-0.1em', pointerEvents: 'none', zIndex: 0 }}>
        <span aria-hidden="true" style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(7rem, 18vw, 13rem)',
          fontWeight: 400, color: 'var(--primary)', opacity: 0.06,
          lineHeight: 1, userSelect: 'none', letterSpacing: '-0.02em',
          display: 'block',
        }}>04</span>
      </ScrollParallax>

      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '700px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,150,190,0.08) 0%, transparent 70%)',
        filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Dot-grid texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(37,150,190,0.07) 1px, transparent 1px)',
        backgroundSize: '38px 38px',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 80%)',
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 80%)',
        zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">{REVIEWS_SECTION.tag}</span>
          <h2 className="section-title" id="reviews-heading" style={{ marginTop: '0.5rem' }}>
            {REVIEWS_SECTION.heading}{' '}
            <span className="text-gradient">{REVIEWS_SECTION.headingAccent}</span>
          </h2>
          <ScrollReveal
            baseOpacity={0}
            enableBlur
            blurStrength={4}
            textClassName="section-subtitle"
            style={{ margin: '0.75rem auto 0' }}
          >
            {REVIEWS_SECTION.subtitle}
          </ScrollReveal>
        </motion.div>

        {/* Rating badge */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '1.75rem' }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
            padding: '0.45rem 1.1rem', borderRadius: '100px',
            background: 'rgba(37,150,190,0.07)',
            border: '1px solid rgba(37,150,190,0.32)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 20px rgba(37,150,190,0.06)',
          }}>
            <span aria-label="4.8 out of 5 stars" style={{ display: 'flex', gap: '2px' }}>
              {Array.from({ length: 5 }).map((_, i) => {
                const fillPercent = i === 4 ? 80 : 100;
                return <AnimatedStar key={i} index={i} size={13} fillPercent={fillPercent} />;
              })}
            </span>
            <span style={{ color: '#f0f6fb', fontWeight: 700, fontSize: '0.84rem', fontFamily: 'var(--font-head)' }}>4.8</span>
            <span style={{ color: '#8fb8cc', fontSize: '0.74rem', fontFamily: 'var(--font-body)' }}>
              {REVIEWS_SECTION.ratingFrom} 35+ {REVIEWS_SECTION.ratingClients}
            </span>
          </div>
        </motion.div>

        {/* Asymmetric layout */}
        <motion.div
          className="reviews-layout"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Card column */}
          <ScrollParallax speed={30} className="reviews-card-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '310px', overflow: 'visible' }}>
              {displayReviews.map((review) => {
                const posMap: Record<number, 'front' | 'middle' | 'back'> = { 0: 'front', 1: 'middle', 2: 'back' };
                const orderIndex = order.indexOf(review.id);
                const position = posMap[orderIndex] ?? 'back';
                return (
                  <TestimonialCard
                    key={`${language}-${review.id}`}
                    handleShuffle={shuffle}
                    text={review.text}
                    position={position}
                    author={review.name}
                    role={review.role}
                    initials={review.initials}
                    gradient={review.avatarGradient}
                    dragLabel={REVIEWS_SECTION.dragToShuffle}
                    photo={review.photo}
                    socialLink={review.socialLink}
                    socialType={review.socialType}
                    socialStats={review.socialStats}
                  />
                );
              })}
            </div>

            {/* Shuffle button */}
            <motion.button
              onClick={shuffle}
              onPointerDown={() => setPressed(true)}
              onPointerUp={() => setPressed(false)}
              onPointerLeave={() => setPressed(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.55rem',
                padding: '0.75rem 1.8rem', borderRadius: '100px',
                background: pressed ? 'rgba(37,150,190,0.18)' : 'rgba(37,150,190,0.07)',
                border: '1px solid rgba(37,150,190,0.34)',
                backdropFilter: 'blur(14px)',
                boxShadow: pressed
                  ? 'inset 0 0 0 1px rgba(13,211,240,0.35), 0 0 24px rgba(37,150,190,0.22)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.08)',
                color: 'var(--primary-light)',
                fontSize: '0.82rem', fontWeight: 600, fontFamily: 'var(--font-body)',
                letterSpacing: '0.05em', cursor: 'pointer',
              }}
              whileHover={{ background: 'rgba(37,150,190,0.12)', y: -2 }}
              whileTap={{ scale: 0.93, y: 2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="17 1 21 5 17 9"/>
                <path d="M3 11V9a4 4 0 014-4h14"/>
                <polyline points="7 23 3 19 7 15"/>
                <path d="M21 13v2a4 4 0 01-4 4H3"/>
              </svg>
              {REVIEWS_SECTION.nextReview}
            </motion.button>
          </ScrollParallax>

          {/* Stats panel — desktop only */}
          <ScrollParallax speed={-30}>
            <ReviewStatsPanel />
          </ScrollParallax>
        </motion.div>

        {/* Video testimonials grid */}
        {content.VIDEO_TESTIMONIALS && (
          <div style={{ marginTop: '5.5rem', width: '100%', position: 'relative', zIndex: 2 }}>
            <motion.div
              style={{ textAlign: 'center', marginBottom: '2.5rem' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-tag" style={{ color: 'var(--primary-light)' }}>
                {language === 'bg' ? 'ВИДЕО ОТЗИВИ' : 'VIDEO REVIEWS'}
              </span>
              <h3 style={{
                fontFamily: 'var(--font-head)',
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-0.01em',
                marginTop: '0.5rem',
                lineHeight: 1.15,
              }}>
                {language === 'bg' ? 'Клиентски ' : 'Client '}
                <span style={{
                  background: 'linear-gradient(90deg, var(--primary) 0%, #0dd3f0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {language === 'bg' ? 'Видео Отзиви' : 'Video Reviews'}
                </span>
              </h3>
              <div style={{
                width: '40px', height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(13,211,240,0.6), transparent)',
                margin: '0.75rem auto 0',
              }} aria-hidden="true" />
            </motion.div>

            <ScrollParallax speed={-25}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1.75rem',
                width: '100%',
              }}>
                {content.VIDEO_TESTIMONIALS.map((vt) => (
                  <VideoTestimonialCard
                    key={`${language}-${vt.id}`}
                    name={vt.name}
                    role={vt.role}
                    videoUrl={vt.videoUrl}
                    onClick={() => {
                      setSelectedVideoUrl(vt.videoUrl);
                      setSelectedVideoName(vt.name);
                    }}
                  />
                ))}
              </div>
            </ScrollParallax>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedVideoUrl && (
          <ReviewsVideoModal
            videoUrl={selectedVideoUrl}
            name={selectedVideoName}
            onClose={() => {
              setSelectedVideoUrl(null);
              setSelectedVideoName('');
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
