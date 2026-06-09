import type { ReactNode, CSSProperties, ElementType } from 'react';
import styles from './StarBorder.module.css';

interface StarBorderProps {
  children: ReactNode;
  as?: ElementType;
  color?: string;
  speed?: string;
  thickness?: number;
  className?: string;
  style?: CSSProperties;
}

export default function StarBorder({
  as: Component = 'div',
  children,
  color = '#0dd3f0',
  speed = '5s',
  thickness = 1,
  className = '',
  style,
}: StarBorderProps) {
  const gradient = `radial-gradient(circle, ${color}, transparent 10%)`;

  return (
    <Component
      className={`${styles.container} ${className}`}
      style={{ padding: `${thickness}px 0`, '--speed': speed, ...style } as CSSProperties}
    >
      <div className={styles.gradientBottom} style={{ background: gradient }} />
      <div className={styles.gradientTop} style={{ background: gradient }} />
      <div className={styles.inner}>{children}</div>
    </Component>
  );
}
