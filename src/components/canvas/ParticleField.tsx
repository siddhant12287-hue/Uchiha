import React, { useRef, useMemo, useCallback } from 'react';
import { useAnimationLoop } from '../../hooks/useAnimationLoop';
import { useSettings } from '../../hooks/useSettings';

export interface ParticleFieldProps {
  palette?: string[];
  count?: number; // default 300
  drift?: 'up' | 'down' | 'drift' | 'radial';
  sizeMin?: number;
  sizeMax?: number;
  speedMultiplier?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  color: string;
  alpha: number;
  targetAlpha: number;
  pulseSpeed: number;
}

const DEFAULT_PALETTE = ['#e61919', '#b31217', '#ff4d4d', '#ff8080', '#3a131b'];

export const ParticleField: React.FC<ParticleFieldProps> = ({
  palette = DEFAULT_PALETTE,
  count = 300,
  drift = 'up',
  sizeMin = 1.0,
  sizeMax = 2.8,
  speedMultiplier = 1.0,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { settings } = useSettings();

  // Scale active particle count by Visual Intensity (0.25 - 1.0)
  const targetCount = useMemo(() => {
    return Math.max(20, Math.round(count * settings.visualIntensity));
  }, [count, settings.visualIntensity]);

  // Particles pool
  const particlesRef = useRef<Particle[]>([]);

  // Initialize or re-pool particles
  const initParticles = useCallback(
    (width: number, height: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < targetCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        let vx = (Math.random() - 0.5) * 15 * speedMultiplier;
        let vy = - (15 + Math.random() * 35) * speedMultiplier;

        if (drift === 'down') {
          vy = (15 + Math.random() * 35) * speedMultiplier;
        } else if (drift === 'drift') {
          vx = Math.cos(angle) * (10 + Math.random() * 20) * speedMultiplier;
          vy = Math.sin(angle) * (10 + Math.random() * 20) * speedMultiplier;
        } else if (drift === 'radial') {
          const speed = (20 + Math.random() * 40) * speedMultiplier;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
        }

        const color = palette[Math.floor(Math.random() * palette.length)];
        const baseSize = sizeMin + Math.random() * (sizeMax - sizeMin);

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx,
          vy,
          baseSize,
          color,
          alpha: 0.1 + Math.random() * 0.7,
          targetAlpha: 0.2 + Math.random() * 0.7,
          pulseSpeed: 0.8 + Math.random() * 1.5,
        });
      }
      particlesRef.current = particles;
    },
    [targetCount, drift, speedMultiplier, sizeMin, sizeMax, palette]
  );

  const render = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      dt: number,
      timestamp: number
    ) => {
      // Re-initialize if count changed or bounds were empty
      if (particlesRef.current.length !== targetCount) {
        initParticles(width, height);
      }

      ctx.clearRect(0, 0, width, height);

      const motionScale = settings.reducedMotion ? 0.08 : 1.0;
      const particles = particlesRef.current;
      const timeSec = timestamp / 1000;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Position update
        p.x += p.vx * dt * motionScale;
        p.y += p.vy * dt * motionScale;

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Subtle alpha breathing
        const pulse = Math.sin(timeSec * p.pulseSpeed + i);
        const currentAlpha = Math.max(0.05, Math.min(0.9, p.alpha + pulse * 0.2));

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    },
    [targetCount, initParticles, settings.reducedMotion]
  );

  useAnimationLoop(canvasRef, render);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full block ${className}`}
      aria-hidden="true"
    />
  );
};
