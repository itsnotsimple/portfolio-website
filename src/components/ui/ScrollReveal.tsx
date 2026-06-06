import React, { useRef, useMemo, useState, useEffect } from 'react';
import type { ReactNode, RefObject } from 'react';
import { motion, useInView } from 'framer-motion';
import './ScrollReveal.css';

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  /** Fraction of element visible before triggering (0–1). Default 0.15 */
  threshold?: number;
  /** Stagger delay between words in seconds. Default 0.045 */
  stagger?: number;
  /** Forward reveal duration per word in seconds. Default 0.6 */
  duration?: number;
  style?: React.CSSProperties;
}

// Forward: staggered smooth reveal
const makeVisibleTransition = (wordIndex: number, stagger: number, duration: number) => ({
  delay: wordIndex * stagger,
  duration,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // expo-out — fast start, silky finish
});

// Backward: all words fade out together quickly, no stagger
const hiddenTransition = {
  delay: 0,
  duration: 0.28,
  ease: 'easeIn' as const,
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  enableBlur = true,
  baseOpacity = 0,
  blurStrength = 6,
  containerClassName = '',
  textClassName = '',
  threshold = 0.15,
  stagger = 0.045,
  duration = 0.6,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true); // Default to static text during initial hydration

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // once: false  → re-triggers every time element enters/leaves viewport
  const isInView = useInView(ref, { once: false, amount: threshold });

  const words = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/);
  }, [children]);

  if (isMobile) {
    return (
      <div className={`scroll-reveal ${containerClassName}`} style={style}>
        <p className={`scroll-reveal-text ${textClassName}`}>
          {children}
        </p>
      </div>
    );
  }

  // Count actual (non-space) words for stagger index
  let wordCount = 0;

  return (
    <div ref={ref} className={`scroll-reveal ${containerClassName}`} style={style}>
      <p className={`scroll-reveal-text ${textClassName}`}>
        {words.map((chunk, i) => {
          if (chunk.match(/^\s+$/)) return chunk;
          const idx = wordCount++;
          return (
            <motion.span
              key={i}
              className="word"
              initial={{
                opacity: baseOpacity,
                filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
                y: 8,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      filter: 'blur(0px)',
                      y: 0,
                      transition: makeVisibleTransition(idx, stagger, duration),
                    }
                  : {
                      opacity: baseOpacity,
                      filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
                      y: 8,
                      transition: hiddenTransition,
                    }
              }
            >
              {chunk}
            </motion.span>
          );
        })}
      </p>
    </div>
  );
};

export default ScrollReveal;
