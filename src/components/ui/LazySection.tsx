import { useState, useRef, useEffect } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  height?: string; // Estimated height to reserve scroll space and prevent layout shifts
}

export default function LazySection({ children, height = '80vh' }: LazySectionProps) {
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

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: isMounted ? 'auto' : height,
        width: '100%',
        display: 'contents', // Let parent grid/flex layout apply directly to children if needed
      }}
    >
      {isMounted ? children : <div style={{ height }} aria-hidden="true" />}
    </div>
  );
}
