'use client';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { CSSProperties } from 'react';

type Direction = 'top' | 'right' | 'bottom' | 'left';

const GRADIENT_ANGLES: Record<Direction, number> = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
};

interface ProgressiveBlurProps extends Omit<HTMLMotionProps<'div'>, 'style'> {
  direction?: Direction;
  blurLayers?: number;
  className?: string;
  style?: CSSProperties;
  blurIntensity?: number;
}

export function ProgressiveBlur({
  direction = 'bottom',
  blurLayers = 8,
  className,
  style,
  blurIntensity = 0.25,
  ...props
}: ProgressiveBlurProps) {
  const layers = Math.max(blurLayers, 2);
  const segmentSize = 1 / (blurLayers + 1);

  return (
    <div
      className={className}
      style={{ position: 'relative', ...style }}
    >
      {Array.from({ length: layers }).map((_, index) => {
        const angle = GRADIENT_ANGLES[direction];
        const stops = [
          index * segmentSize,
          (index + 1) * segmentSize,
          (index + 2) * segmentSize,
          (index + 3) * segmentSize,
        ].map((pos, posIndex) => {
          const alpha = posIndex === 1 || posIndex === 2 ? 1 : 0;
          return `rgba(255,255,255,${alpha}) ${pos * 100}%`;
        });
        const gradient = `linear-gradient(${angle}deg, ${stops.join(', ')})`;

        return (
          <motion.div
            key={index}
            style={{
              pointerEvents: 'none',
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${index * blurIntensity}px)`,
            }}
            {...props}
          />
        );
      })}
    </div>
  );
}
