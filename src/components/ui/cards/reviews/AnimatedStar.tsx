import { motion } from 'framer-motion';

export function AnimatedStar({ index, size = 14, fillPercent = 100 }: { index: number; size?: number; fillPercent?: number }) {
  const gradientId = `star-grad-${index}-${fillPercent}`;
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 24 24"
      aria-hidden="true"
      initial={{ scale: 0, opacity: 0, y: 6 }}
      animate={{
        scale: [null, 1.15, 1],
        opacity: [0, 1, 0.7, 1],
        y: 0,
      }}
      style={{
        filter: 'drop-shadow(0 0 3px rgba(245,200,66,0.65))',
      }}
      transition={{
        scale: { delay: index * 0.08, type: 'spring', stiffness: 320, damping: 14 },
        opacity: {
          times: [0, 0.1, 0.5, 1],
          delay: index * 0.08,
          duration: 2.2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        y: { delay: index * 0.08, type: 'spring', stiffness: 320, damping: 14 },
      }}
    >
      {fillPercent < 100 && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset={`${fillPercent}%`} stopColor="#F5C842" />
            <stop offset={`${fillPercent}%`} stopColor="rgba(255,255,255,0.15)" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.333 3.857 1.4-8.168L.133 9.209l8.2-1.191L12 .587z"
        fill={fillPercent < 100 ? `url(#${gradientId})` : "#F5C842"}
      />
    </motion.svg>
  );
}
