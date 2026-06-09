import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { isMobileDevice } from '../../../lib/device';

interface ScrollParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollParallax({
  children,
  speed = 40,
  className,
  style,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(!isMobileDevice(1024));
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const y = useSpring(yTransform, { stiffness: 90, damping: 24, mass: 0.15 });

  // Always render motion.div with ref so useScroll has a valid target from the first render.
  // Conditionally apply y only on desktop + no reduced-motion preference.
  const shouldAnimate = isDesktop && !prefersReducedMotion;

  return (
    <motion.div
      ref={ref}
      style={{ y: shouldAnimate ? y : 0, ...style } as React.ComponentProps<typeof motion.div>['style']}
      className={className}
    >
      {children}
    </motion.div>
  );
}
