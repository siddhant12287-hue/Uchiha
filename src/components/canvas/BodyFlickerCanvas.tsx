import React, { useRef, useCallback, useEffect } from 'react';
import { useAnimationLoop } from '../../hooks/useAnimationLoop';
import { useSettings } from '../../hooks/useSettings';

export interface FlickerTarget {
  id: number;
  x: number;
  y: number;
}

export interface BodyFlickerCanvasProps {
  destination: FlickerTarget | null;
  className?: string;
}

interface SpeedStreak {
  x: number;
  y: number;
  vx: number;
  length: number;
  width: number;
  color: string;
  alpha: number;
}

interface GhostAfterimage {
  active: boolean;
  x: number;
  y: number;
  alpha: number;
  scale: number;
  life: number;
  maxLife: number;
  color: string;
}

const MAX_STREAKS = 40;
const MAX_AFTERIMAGES = 32;

function createInitialAfterimages(): GhostAfterimage[] {
  const list: GhostAfterimage[] = [];
  for (let i = 0; i < MAX_AFTERIMAGES; i++) {
    list.push({
      active: false,
      x: 0,
      y: 0,
      alpha: 0,
      scale: 1,
      life: 0,
      maxLife: 1.0,
      color: '#00e5a3',
    });
  }
  return list;
}

function createInitialStreaks(): SpeedStreak[] {
  const list: SpeedStreak[] = [];
  for (let i = 0; i < MAX_STREAKS; i++) {
    const isJade = Math.random() > 0.35;
    list.push({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      vx: (isJade ? 350 : 250) + Math.random() * 400,
      length: 50 + Math.random() * 120,
      width: 1 + Math.random() * 2,
      color: isJade ? '#00e5a3' : '#e61919',
      alpha: 0.15 + Math.random() * 0.45,
    });
  }
  return list;
}

export const BodyFlickerCanvas: React.FC<BodyFlickerCanvasProps> = ({
  destination,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { settings } = useSettings();

  const streaksRef = useRef<SpeedStreak[]>(createInitialStreaks());
  const ghostsRef = useRef<GhostAfterimage[]>(createInitialAfterimages());
  const ghostHeadRef = useRef<number>(0);
  const lastTargetIdRef = useRef<number | null>(null);

  // Current entity position for continuous afterimage interpolation
  const currentPosRef = useRef<{ x: number; y: number }>({ x: 500, y: 300 });

  // When a new destination arrives, spawn afterimages along path
  useEffect(() => {
    if (!destination || destination.id === lastTargetIdRef.current) return;
    lastTargetIdRef.current = destination.id;

    const startX = currentPosRef.current.x;
    const startY = currentPosRef.current.y;
    const endX = destination.x;
    const endY = destination.y;

    const steps = 7;
    const ghosts = ghostsRef.current;

    for (let i = 1; i <= steps; i++) {
      const frac = i / steps;
      const gx = startX + (endX - startX) * frac;
      const gy = startY + (endY - startY) * frac;

      const gIdx = ghostHeadRef.current;
      ghostHeadRef.current = (ghostHeadRef.current + 1) % MAX_AFTERIMAGES;

      const g = ghosts[gIdx];
      g.active = true;
      g.x = gx;
      g.y = gy;
      g.alpha = 0.85;
      g.scale = 0.9 + Math.random() * 0.2;
      g.life = 0;
      g.maxLife = 0.8 + frac * 0.4;
      g.color = frac === 1 ? '#00e5a3' : frac % 2 === 0 ? '#10b981' : '#ff3333';
    }

    // Update current position
    currentPosRef.current = { x: endX, y: endY };
  }, [destination]);

  const render = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      dt: number
    ) => {
      ctx.clearRect(0, 0, width, height);

      const motionScale = settings.reducedMotion ? 0.2 : 1.0;
      const streaks = streaksRef.current;
      const ghosts = ghostsRef.current;

      // 1. Ambient Speed Streaks
      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];
        s.x += s.vx * dt * motionScale;

        if (s.x > width + s.length) {
          s.x = -s.length;
          s.y = Math.random() * height;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha * settings.visualIntensity;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.width;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length, s.y);
        ctx.stroke();

        ctx.restore();
      }

      // 2. Body Flicker Fading Ghost Afterimages
      for (let i = 0; i < MAX_AFTERIMAGES; i++) {
        const g = ghosts[i];
        if (!g.active) continue;

        g.life += dt * motionScale;
        if (g.life >= g.maxLife) {
          g.active = false;
          continue;
        }

        const progress = g.life / g.maxLife;
        const currentAlpha = (1 - progress) * 0.8;

        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = g.color;
        ctx.shadowBlur = 14;

        // Draw stylized phantom shinobi silhouette afterimage
        ctx.strokeStyle = g.color;
        ctx.lineWidth = 1.8;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';

        // Phantom Head
        ctx.beginPath();
        ctx.arc(0, -28, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Phantom Torso
        ctx.beginPath();
        ctx.moveTo(-16, -14);
        ctx.lineTo(16, -14);
        ctx.lineTo(12, 22);
        ctx.lineTo(-12, 22);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Phantom Speed Trail Feints
        ctx.beginPath();
        ctx.moveTo(-20, -10);
        ctx.lineTo(-32, -4);
        ctx.moveTo(20, -10);
        ctx.lineTo(32, -4);
        ctx.stroke();

        ctx.restore();
      }
    },
    [settings.reducedMotion, settings.visualIntensity]
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
