import { useState, useRef, useEffect } from 'react';

interface LazySectionProps {
  children: React.ReactNode | (() => React.ReactNode);
  height?: string; // Estimated height to reserve scroll space and prevent layout shifts
  id?: string;     // Anchor id — placed on the outer wrapper so the target exists before lazy-mount
}

export default function LazySection({ children, height = '80vh', id }: LazySectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check support for IntersectionObserver
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMounted(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '400px', // Pre-mount 400px before the section enters the viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children();
    }
    return children;
  };

  return (
    <div
      id={id}
      ref={containerRef}
      style={{
        minHeight: isMounted ? 'auto' : (height || '200px'),
        width: '100%',
        display: 'block',
      }}
    >
      {isMounted ? renderChildren() : <div style={{ height: height || '200px' }} aria-hidden="true" />}
    </div>
  );
}
