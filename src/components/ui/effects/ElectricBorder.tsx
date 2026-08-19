import React, { useEffect, useRef, useCallback } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import './ElectricBorder.css';

interface ElectricBorderProps {
  children?: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  className?: string;
  style?: CSSProperties;
  /** Disables the blurred background glow that bleeds outside the element */
  noGlow?: boolean;
}

interface PointWithNormal {
  x: number;
  y: number;
  nx: number;
  ny: number;
}

const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  color = '#5227FF',
  speed = 1,
  chaos = 0.08,
  borderRadius = 24,
  className,
  style,
  noGlow = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  // Strictly centered in [-1, 1] with zero mean
  const random = useCallback((x: number): number => {
    const sin = Math.sin(x * 12.9898 + 78.233) * 43758.5453;
    return (sin - Math.floor(sin)) * 2 - 1;
  }, []);

  const noise2D = useCallback(
    (x: number, y: number): number => {
      const i = Math.floor(x);
      const j = Math.floor(y);
      const fx = x - i;
      const fy = y - j;
      const a = random(i + j * 57);
      const b = random(i + 1 + j * 57);
      const c = random(i + (j + 1) * 57);
      const d = random(i + 1 + (j + 1) * 57);
      const ux = fx * fx * (3.0 - 2.0 * fx);
      const uy = fy * fy * (3.0 - 2.0 * fy);
      return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
    },
    [random]
  );

  const octavedNoise = useCallback(
    (
      x: number,
      octaves: number,
      lacunarity: number,
      gain: number,
      baseFrequency: number,
      time: number,
      seed: number
    ): number => {
      let y = 0;
      let amplitude = 1;
      let frequency = baseFrequency;
      let maxAmp = 0;
      for (let i = 0; i < octaves; i++) {
        y += amplitude * noise2D(frequency * x + seed * 100, time * frequency * 0.35);
        maxAmp += amplitude;
        frequency *= lacunarity;
        amplitude *= gain;
      }
      return y / maxAmp; // Normalized to [-1, 1]
    },
    [noise2D]
  );

  const getRoundedRectPoint = useCallback(
    (t: number, left: number, top: number, width: number, height: number, radius: number): PointWithNormal => {
      const straightWidth = Math.max(0, width - 2 * radius);
      const straightHeight = Math.max(0, height - 2 * radius);
      const cornerArc = (Math.PI * radius) / 2;
      const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
      const distance = t * totalPerimeter;
      let accumulated = 0;

      // 1. Top Edge (left + radius -> left + width - radius)
      if (distance <= accumulated + straightWidth) {
        const progress = straightWidth > 0 ? (distance - accumulated) / straightWidth : 0;
        return {
          x: left + radius + progress * straightWidth,
          y: top,
          nx: 0,
          ny: -1,
        };
      }
      accumulated += straightWidth;

      // 2. Top-Right Corner
      if (distance <= accumulated + cornerArc) {
        const progress = cornerArc > 0 ? (distance - accumulated) / cornerArc : 0;
        const angle = -Math.PI / 2 + progress * (Math.PI / 2);
        return {
          x: left + width - radius + radius * Math.cos(angle),
          y: top + radius + radius * Math.sin(angle),
          nx: Math.cos(angle),
          ny: Math.sin(angle),
        };
      }
      accumulated += cornerArc;

      // 3. Right Edge
      if (distance <= accumulated + straightHeight) {
        const progress = straightHeight > 0 ? (distance - accumulated) / straightHeight : 0;
        return {
          x: left + width,
          y: top + radius + progress * straightHeight,
          nx: 1,
          ny: 0,
        };
      }
      accumulated += straightHeight;

      // 4. Bottom-Right Corner
      if (distance <= accumulated + cornerArc) {
        const progress = cornerArc > 0 ? (distance - accumulated) / cornerArc : 0;
        const angle = 0 + progress * (Math.PI / 2);
        return {
          x: left + width - radius + radius * Math.cos(angle),
          y: top + height - radius + radius * Math.sin(angle),
          nx: Math.cos(angle),
          ny: Math.sin(angle),
        };
      }
      accumulated += cornerArc;

      // 5. Bottom Edge
      if (distance <= accumulated + straightWidth) {
        const progress = straightWidth > 0 ? (distance - accumulated) / straightWidth : 0;
        return {
          x: left + width - radius - progress * straightWidth,
          y: top + height,
          nx: 0,
          ny: 1,
        };
      }
      accumulated += straightWidth;

      // 6. Bottom-Left Corner
      if (distance <= accumulated + cornerArc) {
        const progress = cornerArc > 0 ? (distance - accumulated) / cornerArc : 0;
        const angle = Math.PI / 2 + progress * (Math.PI / 2);
        return {
          x: left + radius + radius * Math.cos(angle),
          y: top + height - radius + radius * Math.sin(angle),
          nx: Math.cos(angle),
          ny: Math.sin(angle),
        };
      }
      accumulated += cornerArc;

      // 7. Left Edge
      if (distance <= accumulated + straightHeight) {
        const progress = straightHeight > 0 ? (distance - accumulated) / straightHeight : 0;
        return {
          x: left,
          y: top + height - radius - progress * straightHeight,
          nx: -1,
          ny: 0,
        };
      }
      accumulated += straightHeight;

      // 8. Top-Left Corner
      const progress = cornerArc > 0 ? (distance - accumulated) / cornerArc : 0;
      const angle = Math.PI + progress * (Math.PI / 2);
      return {
        x: left + radius + radius * Math.cos(angle),
        y: top + radius + radius * Math.sin(angle),
        nx: Math.cos(angle),
        ny: Math.sin(angle),
      };
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const octaves = 5;
    const lacunarity = 1.8;
    const gain = 0.6;
    const baseFrequency = 7;
    const borderOffset = 30;

    const updateSize = () => {
      if (!container || !canvas || !ctx) return { width: 0, height: 0, rectWidth: 0, rectHeight: 0 };
      const rectWidth = container.offsetWidth || container.getBoundingClientRect().width;
      const rectHeight = container.offsetHeight || container.getBoundingClientRect().height;
      if (rectWidth === 0 || rectHeight === 0) return { width: 0, height: 0, rectWidth: 0, rectHeight: 0 };

      const width = rectWidth + borderOffset * 2;
      const height = rectHeight + borderOffset * 2;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const targetWidth = Math.round(width * dpr);
      const targetHeight = Math.round(height * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      return { width, height, rectWidth, rectHeight };
    };

    let size = updateSize();
    let lastDpr = Math.min(window.devicePixelRatio || 1, 2);

    const drawElectricBorder = (currentTime: number) => {
      if (!canvas || !ctx || !container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const currentRectWidth = container.offsetWidth;
      const currentRectHeight = container.offsetHeight;

      if (dpr !== lastDpr || (currentRectWidth > 0 && currentRectWidth !== size.rectWidth) || (currentRectHeight > 0 && currentRectHeight !== size.rectHeight)) {
        lastDpr = dpr;
        size = updateSize();
      }

      if (size.rectWidth === 0 || size.rectHeight === 0) {
        animationRef.current = requestAnimationFrame(drawElectricBorder);
        return;
      }

      const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000;
      timeRef.current += deltaTime * speed;
      lastFrameTimeRef.current = currentTime;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      const left = borderOffset;
      const top = borderOffset;
      const borderWidth = size.rectWidth;
      const borderHeight = size.rectHeight;
      const maxRadius = Math.min(borderWidth, borderHeight) / 2;
      const radius = Math.min(borderRadius, maxRadius);
      const approximatePerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
      const sampleCount = Math.max(100, Math.floor(approximatePerimeter / 2.5));
      // Subtle micro-displacement (gentle electric tremor)
      const maxDisplacement = Math.max(0.6, chaos * 14);

      // Build path points along exact perimeter
      const points: { x: number; y: number }[] = [];
      for (let i = 0; i <= sampleCount; i++) {
        const progress = i / sampleCount;
        const pt = getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);
        const noise = octavedNoise(progress * 8, octaves, lacunarity, gain, baseFrequency, timeRef.current, 0);
        const displacement = noise * maxDisplacement;
        points.push({
          x: pt.x + pt.nx * displacement,
          y: pt.y + pt.ny * displacement,
        });
      }

      if (points.length === 0) {
        animationRef.current = requestAnimationFrame(drawElectricBorder);
        return;
      }

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Subtle, sleek, delicate glowing electric outline (just like original)
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      ctx.stroke();

      animationRef.current = requestAnimationFrame(drawElectricBorder);
    };

    const resizeObserver = new ResizeObserver(() => {
      size = updateSize();
    });
    resizeObserver.observe(container);
    animationRef.current = requestAnimationFrame(drawElectricBorder);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
    };
  }, [color, speed, chaos, borderRadius, octavedNoise, getRoundedRectPoint]);

  const vars = { '--electric-border-color': color, borderRadius } as CSSProperties;

  return (
    <div ref={containerRef} className={`electric-border ${className ?? ''}`} style={{ ...vars, ...style }}>
      <div className="eb-canvas-container">
        <canvas ref={canvasRef} className="eb-canvas" />
      </div>
      {!noGlow && (
        <div className="eb-layers">
          <div className="eb-background-glow" />
        </div>
      )}
      <div className="eb-content">{children}</div>
    </div>
  );
};

export default ElectricBorder;
