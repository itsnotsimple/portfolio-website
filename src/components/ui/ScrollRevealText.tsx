import { useRef, useState, useEffect } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';

interface WordRevealProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function WordReveal({ word, progress, range }: WordRevealProps) {
  // Fades the word from a subtle muted opacity to fully visible
  const opacity = useTransform(progress, range, [0.15, 1]);
  // Add a slight vertical translation for extra fluidity
  const y = useTransform(progress, range, [4, 0]);

  return (
    <motion.span 
      style={{ 
        opacity,
        y,
        display: 'inline-block',
        whiteSpace: 'pre'
      }}
    >
      {word}{' '}
    </motion.span>
  );
}

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

function ActiveScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  // Track the scrolling progress of the paragraph container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start revealing when paragraph is 85% down the viewport, finish by 45% down
    offset: ["start 85%", "start 45%"]
  });

  const words = text.split(/\s+/);
  const totalWords = words.length;

  return (
    <p ref={containerRef} className={className} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
      {words.map((word, i) => {
        // Calculate the progressive activation range for each word
        const start = i / totalWords;
        const end = Math.min(1, (i + 1.2) / totalWords);
        return (
          <WordReveal
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
}

export default function ScrollRevealText(props: ScrollRevealTextProps) {
  const [isMobile, setIsMobile] = useState(true); // Default to static text during initial hydration

  useEffect(() => {
    setIsMobile(/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 1024);
  }, []);

  if (isMobile) {
    return <p className={props.className}>{props.text}</p>;
  }
  return <ActiveScrollRevealText {...props} />;
}
