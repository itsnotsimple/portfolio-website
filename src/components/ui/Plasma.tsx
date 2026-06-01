import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './Plasma.css';

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: 'forward' | 'reverse' | 'pingpong';
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
  onReady?: () => void;
  isLoaded?: boolean;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;
  
  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);
  
  float i = 0.0, d = 0.0, z = 0.0, T = iTime * uSpeed * uDirection;
  vec3 O = vec3(0.0), p, S;

  for (vec2 r = iResolution.xy, Q; ++i < 60.; O += o.w/d*o.xyz) {
    vec3 dir = normalize(vec3(C-.5*r, r.y));
    // Tilt the camera upwards (pitch rotation) to push the horizon completely off-screen on tall mobile viewports
    float theta = -0.62;
    float cT = cos(theta), sT = sin(theta);
    dir.yz = mat2(cT, -sT, sT, cT) * dir.yz;
    
    p = z*dir; 
    p.z -= 4.; 
    S = p;
    d = p.y-T;
    
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); 
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); 
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4; 
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
  }
  
  o.xyz = tanh(O/1e4);
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r) ? c.r : 0.0,
    finite1(c.g) ? c.g : 0.0,
    finite1(c.b) ? c.b : 0.0
  );
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);
  
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 customColor = intensity * uCustomColor;
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));
  
  float alpha = length(rgb) * uOpacity;
  fragColor = vec4(finalColor, alpha);
}`;

export const Plasma: React.FC<PlasmaProps> = ({
  color = '#ffffff',
  speed = 1,
  direction = 'forward',
  scale = 1,
  opacity = 1,
  mouseInteractive = true,
  onReady,
  isLoaded = false
}) => {
  const [isCompiled, setIsCompiled] = React.useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const onReadyRef = useRef(onReady);
  // Stored so the outer cleanup can remove it even though it's defined inside initWebGL
  const mouseMoveHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    if (!isLoaded) {
      setIsCompiled(false);
      return;
    }
    if (!containerRef.current) return;
    const containerEl = containerRef.current;

    // Cancelled flag so cleanup works even before idle callback fires
    let cancelled = false;
    let raf = 0;
    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    let canvas: HTMLCanvasElement | null = null;

    // ─── Defer ALL heavy WebGL work to browser idle time ───────────────────
    // new Program() compiles the GLSL shader synchronously on the main thread
    // (~300–700ms on mobile). Running it in rIC keeps it completely off any
    // visible paint frame, eliminating the freeze.
    const initWebGL = () => {
      if (cancelled) return;

      const useCustomColor = color ? 1.0 : 0.0;
      const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];
      const directionMultiplier = direction === 'reverse' ? -1.0 : 1.0;

      // Cap mobile DPR at 1 to prevent performance overhead while keeping desktop pixel ratio crisp
      const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768;
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);

      let renderer: Renderer;
      try {
        renderer = new Renderer({
          webgl: 2,
          alpha: true,
          antialias: false,
          dpr,
          powerPreference: 'low-power'
        });
      } catch {
        return;
      }
      const gl = renderer.gl;
      if (!gl || cancelled) return;

      canvas = gl.canvas as HTMLCanvasElement;
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      containerEl.appendChild(canvas);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const geometry = new Triangle(gl) as any;

      const maxIterations = isMobile ? '24.' : '55.';
      const finalFragment = fragment.replace('++i < 60.', `++i < ${maxIterations}`);

      // ── THIS is the synchronous shader compile — safely deferred now ──
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const program = new Program(gl, {
        vertex: vertex,
        fragment: finalFragment,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new Float32Array([1, 1]) },
          uCustomColor: { value: new Float32Array(customColorRgb) },
          uUseCustomColor: { value: useCustomColor },
          uSpeed: { value: speed * 0.4 },
          uDirection: { value: directionMultiplier },
          uScale: { value: scale },
          uOpacity: { value: opacity },
          uMouse: { value: new Float32Array([0, 0]) },
          uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 }
        }
      }) as any;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mesh = new Mesh(gl, { geometry, program }) as any;

      const handleMouseMove = (e: MouseEvent) => {
        if (!mouseInteractive) return;
        const rect = containerEl.getBoundingClientRect();
        mousePos.current.x = e.clientX - rect.left;
        mousePos.current.y = e.clientY - rect.top;
        const mouseUniform = program.uniforms.uMouse.value as Float32Array;
        mouseUniform[0] = mousePos.current.x;
        mouseUniform[1] = mousePos.current.y;
      };
      mouseMoveHandlerRef.current = handleMouseMove;

      if (mouseInteractive) {
        containerEl.addEventListener('mousemove', handleMouseMove);
      }

      let prevWidth = 0;
      let prevHeight = 0;

      const setSize = () => {
        const rect = containerEl.getBoundingClientRect();
        const width = Math.max(1, Math.floor(rect.width));
        const height = Math.max(1, Math.floor(rect.height));

        // On mobile, ignore small height changes (address bar toggle) but allow initial setup and major resizes
        const isMobileResize = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768;
        const heightDiff = Math.abs(height - prevHeight);
        if (isMobileResize) {
          if (width === prevWidth && heightDiff < 150 && prevHeight !== 0) return;
        } else {
          if (width === prevWidth && height === prevHeight) return;
        }

        prevWidth = width;
        prevHeight = height;

        renderer.setSize(width, height);
        const res = program.uniforms.iResolution.value as Float32Array;
        res[0] = gl.drawingBufferWidth;
        res[1] = gl.drawingBufferHeight;
      };

      ro = new ResizeObserver(setSize);
      ro.observe(containerEl);
      setSize();

      let contextLost = false;
      let isVisible = true;
      const t0 = performance.now();
      let hasReportedReady = false;

      const loop = (t: number) => {
        if (contextLost || !isVisible) return;
        let timeValue = (t - t0) * 0.001;
        if (direction === 'pingpong') {
          const pingpongDuration = 10;
          const segmentTime = timeValue % pingpongDuration;
          const isForward = Math.floor(timeValue / pingpongDuration) % 2 === 0;
          const u = segmentTime / pingpongDuration;
          const smooth = u * u * (3 - 2 * u);
          const pingpongTime = isForward ? smooth * pingpongDuration : (1 - smooth) * pingpongDuration;
          (program.uniforms.uDirection as any).value = 1.0;
          (program.uniforms.iTime as any).value = pingpongTime;
        } else {
          (program.uniforms.iTime as any).value = timeValue;
        }
        renderer.render({ scene: mesh });

        if (!hasReportedReady) {
          hasReportedReady = true;
          if (onReadyRef.current) {
            // Defer slightly to ensure browser finishes rendering pipeline paint
            setTimeout(() => {
              onReadyRef.current?.();
            }, 80);
          }
        }

        raf = requestAnimationFrame(loop);
      };

      const handleContextLost = (e: Event) => {
        e.preventDefault();
        contextLost = true;
        cancelAnimationFrame(raf);
      };
      const handleContextRestored = () => {
        contextLost = false;
        if (isVisible) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(loop);
        }
      };
      canvas!.addEventListener('webglcontextlost', handleContextLost);
      canvas!.addEventListener('webglcontextrestored', handleContextRestored);

      io = new IntersectionObserver(([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible && !contextLost) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(loop);
        }
      }, { threshold: 0 });
      io.observe(containerEl);

      // Start the animation loop
      raf = requestAnimationFrame(loop);

      // Fade in the canvas elegantly over 1.5s
      setIsCompiled(true);

      if (onReadyRef.current) onReadyRef.current();
    }; // ─── end initWebGL ───────────────────────────────────────────────────────

    // Schedule WebGL init after a delay when the page is quiet.
    // 1200ms delay ensures all entrance transitions (Navbar, Hero, etc.) are 100% completed.
    let ricHandle = 0;
    let stHandle = 0;
    let stDelayHandle = window.setTimeout(() => {
      if (typeof requestIdleCallback !== 'undefined') {
        ricHandle = requestIdleCallback(initWebGL, { timeout: 200 });
      } else {
        stHandle = window.setTimeout(initWebGL, 1);
      }
    }, 1200);

    return () => {
      cancelled = true;
      if (stDelayHandle) clearTimeout(stDelayHandle);
      // Cancel before idle callback fires (component unmounted early)
      if (ricHandle) cancelIdleCallback(ricHandle);
      if (stHandle) clearTimeout(stHandle);

      cancelAnimationFrame(raf);
      ro?.disconnect();
      io?.disconnect();
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', () => {});
        canvas.removeEventListener('webglcontextrestored', () => {});
        try { containerEl?.removeChild(canvas); } catch {}
      }
      if (mouseInteractive && containerEl && mouseMoveHandlerRef.current) {
        containerEl.removeEventListener('mousemove', mouseMoveHandlerRef.current);
      }
    };
  }, [color, speed, direction, scale, opacity, mouseInteractive, isLoaded]);


  return (
    <div
      ref={containerRef}
      className="plasma-container"
      style={{
        opacity: isCompiled ? 1 : 0,
        transition: 'opacity 1.5s ease-in-out',
        willChange: 'opacity'
      }}
    />
  );
};

export default Plasma;
