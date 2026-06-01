import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollParallaxProps {
  children: React.ReactNode;
  speed?: number; // Y translation range in pixels: [speed, -speed]
  className?: string;
  style?: React.CSSProperties;
}

const checkIsMobile = () => {
  if (typeof window !== 'undefined') {
    return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768;
  }
  return false;
};

function ActiveScrollParallax({ children, speed = 30, className, style }: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the wrapper relative to the viewport boundaries
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Translate vertical offset on Y-axis. Protect against NaN if the page is not scrollable.
  const y = useTransform(scrollYProgress, (latest) => {
    if (isNaN(latest)) return 0;
    // Map 0 -> 1 to speed -> -speed
    return speed - latest * (speed * 2);
  });

  return (
    <motion.div ref={ref} style={{ y, ...style } as any} className={className}>
      {children}
    </motion.div>
  );
}

export default function ScrollParallax(props: ScrollParallaxProps) {
  const isMobile = checkIsMobile();

  if (isMobile) {
    return (
      <div className={props.className} style={props.style}>
        {props.children}
      </div>
    );
  }

  return <ActiveScrollParallax {...props} />;
}
