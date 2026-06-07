"use client";
import { useId, useCallback } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

interface SparklesProps {
  className?: string;
  size?: number;
  minSize?: number | null;
  density?: number;
  speed?: number;
  minSpeed?: number | null;
  opacity?: number;
  opacitySpeed?: number;
  minOpacity?: number | null;
  color?: string;
  background?: string;
  options?: Partial<ISourceOptions>;
}

export function Sparkles({
  className,
  size = 1,
  minSize = null,
  density = 800,
  speed = 1,
  minSpeed = null,
  opacity = 1,
  opacitySpeed = 3,
  minOpacity = null,
  color = "#FFFFFF",
  background = "transparent",
  options = {},
}: SparklesProps) {
  const id = useId();

  // Stable init callback — only created once
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const init = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  const defaultOptions: ISourceOptions = {
    background: { color: { value: background } },
    fullScreen: { enable: false, zIndex: 0 },
    fpsLimit: 60,
    particles: {
      color: { value: color },
      move: {
        enable: true,
        direction: "none",
        speed: { min: minSpeed ?? speed / 10, max: speed },
        straight: false,
      },
      number: { value: density },
      opacity: {
        value: { min: minOpacity ?? opacity / 10, max: opacity },
        animation: { enable: true, sync: false, speed: opacitySpeed },
      },
      size: { value: { min: minSize ?? size / 2.5, max: size } },
    },
    detectRetina: true,
  };

  const merged: ISourceOptions = { ...defaultOptions, ...options };

  return (
    <ParticlesProvider init={init}>
      <Particles
        id={id}
        options={merged}
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </ParticlesProvider>
  );
}
