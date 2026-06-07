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
  threshold?: number;
  stagger?: number;
  duration?: number;
  style?: React.CSSProperties;
}

const makeVisibleTransition = (wordIndex: number, stagger: number, duration: number) => ({
  delay: wordIndex * stagger,
  duration,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
});

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
  // ref ALWAYS attached to the rendered div so useInView observer is set up correctly
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () =>
      setIsMobile(/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // once: true — fires the first time element enters viewport, then observer is removed
  const isInView = useInView(ref, { once: true, amount: threshold });

  const words = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/);
  }, [children]);

  let wordCount = 0;
  const textKey = typeof children === 'string' ? children : undefined;

  return (
    // ref always attached here — fixes the race condition where isMobile starts true
    // and the observer was set up with ref.current = null
    <div ref={ref} className={`scroll-reveal ${containerClassName}`} style={style}>
      <p key={textKey} className={`scroll-reveal-text ${textClassName}`}>
        {isMobile ? (
          children
        ) : (
          words.map((chunk, i) => {
            if (chunk.match(/^\s+$/)) return chunk;
            const idx = wordCount++;
            return (
              <motion.span
                key={i}
                className="word"
                initial={{
                  opacity: isInView ? 1 : baseOpacity,
                  filter: isInView ? 'blur(0px)' : (enableBlur ? `blur(${blurStrength}px)` : 'none'),
                  y: isInView ? 0 : 8,
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
                        transition: { delay: 0, duration: 0.28, ease: 'easeIn' },
                      }
                }
              >
                {chunk}
              </motion.span>
            );
          })
        )}
      </p>
    </div>
  );
};

export default ScrollReveal;
