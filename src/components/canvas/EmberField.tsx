import React, { useRef, useCallback } from 'react';
import { useAnimationLoop } from '../../hooks/useAnimationLoop';
import { useSettings } from '../../hooks/useSettings';

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  isBlackAsh: boolean;
  pulsePhase: number;
  swayFreq: number;
}

export interface EmberFieldProps {
  className?: string;
  intensity?: number;
}

export const EmberField: React.FC<EmberFieldProps> = ({
  className = '',
  intensity = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { settings } = useSettings();
  const embersRef = useRef<Ember[]>([]);

  const render = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      dt: number
    ) => {
      ctx.clearRect(0, 0, width, height);

      const motionScale = settings.reducedMotion ? 0.2 : 1.0;
      const targetCount = Math.floor(180 * settings.visualIntensity * intensity);
      const embers = embersRef.current;

      while (embers.length < targetCount) {
        const isAsh = Math.random() < 0.35;
        embers.push({
          x: Math.random() * width,
          y: height + Math.random() * 40,
          vx: (Math.random() - 0.5) * 15,
          vy: - (18 + Math.random() * 38),
          size: isAsh ? 1.5 + Math.random() * 2.5 : 1.0 + Math.random() * 2.2,
          life: Math.random() * 3,
          maxLife: 3 + Math.random() * 4,
          isBlackAsh: isAsh,
          pulsePhase: Math.random() * Math.PI * 2,
          swayFreq: 1 + Math.random() * 2,
        });
      }

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.life += dt * motionScale;

        if (e.life >= e.maxLife || e.y < -20) {
          // Recycle ember directly to bottom
          e.x = Math.random() * width;
          e.y = height + Math.random() * 20;
          e.life = 0;
          continue;
        }

        const progress = e.life / e.maxLife;
        // Horizontal sinusoidal drift
        e.x += (e.vx + Math.sin(e.life * e.swayFreq + e.pulsePhase) * 14) * dt * motionScale;
        e.y += e.vy * dt * motionScale;

        // Alpha fade envelope
        const alpha = Math.sin(progress * Math.PI) * (e.isBlackAsh ? 0.6 : 0.85);

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

        if (e.isBlackAsh) {
          // Charcoal / black cinder
          ctx.fillStyle = '#08080c';
          ctx.shadowColor = '#1c0d12';
          ctx.shadowBlur = 4;
        } else {
          // Glowing crimson chakra ember
          ctx.fillStyle = progress < 0.3 ? '#ff3b30' : '#c80000';
          ctx.shadowColor = '#e61919';
          ctx.shadowBlur = 8;
        }

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    },
    [settings.reducedMotion, settings.visualIntensity, intensity]
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
