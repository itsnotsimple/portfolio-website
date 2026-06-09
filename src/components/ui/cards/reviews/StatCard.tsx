import { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import type { TargetAndTransition } from 'framer-motion';

function AnimatedStatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(match[1]);
    const suffix = match[2];
    const isDecimal = match[1].includes('.');
    const decimalPlaces = isDecimal ? match[1].split('.')[1].length : 0;

    const controls = animate(0, targetNum, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(latest.toFixed(decimalPlaces) + suffix);
      },
    });
    return () => controls.stop();
  }, [value, isInView]);

  return <span ref={ref}>{displayValue}</span>;
}

export interface StatCardProps {
  stat: {
    value: string;
    label: string;
    icon: React.ReactNode;
    color: string;
    border: string;
    glowColor: string;
    iconAnim: TargetAndTransition;
  };
  index: number;
}

export function StatCard({ stat, index }: StatCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.42, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      style={{
        padding: '1px',
        borderRadius: '12px',
        background: isHovered
          ? `radial-gradient(120px circle at var(--mouse-x) var(--mouse-y), rgba(${stat.glowColor}, 0.5), transparent 80%), rgba(255,255,255,0.06)`
          : `linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)`,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        boxShadow: isHovered
          ? `0 8px 30px rgba(${stat.glowColor}, 0.08)`
          : '0 4px 12px rgba(0, 0, 0, 0.15)',
        '--mouse-x': `${coords.x}px`,
        '--mouse-y': `${coords.y}px`,
      } as React.CSSProperties}
    >
      <motion.div
        animate={{ y: isHovered ? 0 : [0, -4, 0] }}
        transition={{
          duration: 4.2 + index * 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.3,
        }}
        style={{ width: '100%', height: '100%', borderRadius: '11px', overflow: 'hidden' }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 0.9rem',
          background: isHovered ? 'rgba(7, 12, 20, 0.94)' : 'rgba(8, 14, 22, 0.72)',
          border: 'none',
          borderRadius: '11px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          transition: 'background 0.3s ease',
        }}>
          {isHovered && (
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: -1,
              pointerEvents: 'none',
              background: `radial-gradient(140px circle at var(--mouse-x) var(--mouse-y), rgba(${stat.glowColor}, 0.06), transparent 80%)`,
            }} />
          )}

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
            transform: 'translateX(-150%) skewX(-25deg)',
            animation: 'shimmer 6s infinite ease-in-out',
            animationDelay: `${index * 1.5}s`,
            pointerEvents: 'none',
            zIndex: 2,
          }} />

          <motion.div
            aria-hidden="true"
            animate={{ opacity: isHovered ? 1 : [0.35, 0.75, 0.35] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
            style={{
              position: 'absolute',
              top: 0,
              left: '0.6rem',
              right: '0.6rem',
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
              zIndex: 3,
            }}
          />

          <motion.div
            animate={isHovered ? {
              scale: 1.1,
              boxShadow: `0 0 15px rgba(${stat.glowColor}, 0.45)`,
              borderColor: stat.color,
              backgroundColor: `${stat.color}20`,
            } : {
              scale: 1,
              boxShadow: `0 0 0px rgba(${stat.glowColor}, 0)`,
              borderColor: stat.border,
              backgroundColor: `${stat.color}12`,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '9px',
              border: `1px solid ${stat.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <motion.div
              animate={isHovered ? stat.iconAnim : { scale: 1, rotate: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 12 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {stat.icon}
            </motion.div>
          </motion.div>

          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: 'var(--font-head)',
              fontSize: '1.15rem',
              fontWeight: 800,
              color: stat.color,
              lineHeight: 1,
              letterSpacing: '-0.01em',
            }}>
              <AnimatedStatValue value={stat.value} />
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              color: isHovered ? '#a3d1e6' : '#8fb8cc',
              marginTop: '2px',
              transition: 'color 0.3s ease',
            }}>
              {stat.label}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
