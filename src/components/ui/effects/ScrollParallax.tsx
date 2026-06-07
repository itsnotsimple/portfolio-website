import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollParallaxProps {
  children: React.ReactNode;
  speed?: number; // Distance in pixels to offset at ends of scroll progress
  direction?: 'up' | 'down';
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollParallax({
  children,
  speed = 40,
  direction = 'up',
  className,
  style,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true); // Default to static element during initial hydration

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track the scroll progress of the element relative to the viewport boundaries
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Map progress (0 to 1) to offset (speed to -speed or vice-versa)
  const startOffset = direction === 'up' ? speed : -speed;
  const endOffset = direction === 'up' ? -speed : speed;

  const yTransform = useTransform(scrollYProgress, [0, 1], [startOffset, endOffset]);

  // Apply spring smoothing for momentum physics
  const y = useSpring(yTransform, {
    stiffness: 90,
    damping: 24,
    mass: 0.15,
  });

  if (isMobile) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y, ...style } as React.ComponentProps<typeof motion.div>['style']} className={className}>
      {children}
    </motion.div>
  );
}
