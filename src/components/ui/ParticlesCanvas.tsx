import { useEffect, useRef } from 'react';

interface ParticlesCanvasProps {
  className?: string;
}

export default function ParticlesCanvas({ className }: ParticlesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    let animId: number;
    const PRIMARY = { r: 37, g: 150, b: 190 };
    const ACCENT   = { r: 13,  g: 211, b: 240 };
    const COUNT = window.innerWidth < 768 ? 30 : 75;

    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    class Particle {
      x = 0; y = 0; vx = 0; vy = 0;
      r = 0; alpha = 0; life = 0; maxLife = 0;
      useAccent = false;

      constructor() { this.reset(true); }

      reset(init = false) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : H + 10;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = -(Math.random() * 0.45 + 0.12);
        this.r  = Math.random() * 2.2 + 0.4;
        this.alpha = Math.random() * 0.55 + 0.08;
        this.life = 0;
        this.maxLife = Math.random() * 320 + 180;
        this.useAccent = Math.random() < 0.15;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (this.life > this.maxLife || this.y < -10) this.reset();
      }

      draw() {
        const fade = this.life < 40
          ? this.life / 40
          : this.life > this.maxLife - 40
          ? (this.maxLife - this.life) / 40
          : 1;
        const c = this.useAccent ? ACCENT : PRIMARY;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${this.alpha * fade})`;
        ctx.fill();
      }
    }

    let particles: Particle[] = [];

    const drawConnections = () => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${PRIMARY.r},${PRIMARY.g},${PRIMARY.b},0.08)`;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 13225) { // 115^2 = 13225
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
          }
        }
      }
      ctx.stroke();
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      drawConnections();
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(loop);
    };

    const init = () => {
      resize();
      particles = Array.from({ length: COUNT }, () => new Particle());
      loop();
    };

    let lastWidth = window.innerWidth;
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768;
      const currentWidth = window.innerWidth;

      if (isMobile && currentWidth === lastWidth) {
        return; // Ignore height-only resizes on mobile (e.g. address bar show/hide)
      }
      lastWidth = currentWidth;

      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(animId);
        init();
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    init();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
}
