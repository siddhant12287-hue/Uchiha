import React, { useRef, useCallback, useEffect } from 'react';
import { useAnimationLoop } from '../../hooks/useAnimationLoop';
import { useSettings } from '../../hooks/useSettings';

export interface IgnitionPoint {
  id: number;
  x: number;
  y: number;
  createdAt: number;
}

export interface FlameBurstProps {
  ignitionPoints: IgnitionPoint[];
  className?: string;
}

interface FlameParticle {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  originX: number;
  originY: number;
  swaySpeed: number;
}

const MAX_PARTICLES = 500;

function createInitialPool(): FlameParticle[] {
  const initialPool: FlameParticle[] = [];
  for (let i = 0; i < MAX_PARTICLES; i++) {
    initialPool.push({
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      size: 0,
      life: 0,
      maxLife: 1.0,
      originX: 0,
      originY: 0,
      swaySpeed: 1.0,
    });
  }
  return initialPool;
}

export const FlameBurst: React.FC<FlameBurstProps> = ({
  ignitionPoints,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { settings } = useSettings();

  // Pre-allocated object pool of exactly 500 particles (zero per-frame allocations)
  const poolRef = useRef<FlameParticle[]>(createInitialPool());
  const poolHeadRef = useRef<number>(0);
  const prevPointsCountRef = useRef<number>(0);

  // Helper to activate next pooled particle, recycling oldest if pool is full
  const spawnParticle = useCallback((x: number, y: number, isInitialBurst: boolean) => {
    const pool = poolRef.current;
    const index = poolHeadRef.current;
    poolHeadRef.current = (poolHeadRef.current + 1) % MAX_PARTICLES;

    const p = pool[index];
    const angle = Math.random() * Math.PI * 2;
    const speed = isInitialBurst ? 30 + Math.random() * 70 : 15 + Math.random() * 35;

    p.active = true;
    p.originX = x;
    p.originY = y;
    p.x = x + (Math.random() - 0.5) * 16;
    p.y = y + (Math.random() - 0.5) * 12;
    p.vx = Math.cos(angle) * speed * 0.4;
    p.vy = - (35 + Math.random() * 65); // rises upward like black fire
    p.size = 3.5 + Math.random() * 5.0;
    p.life = 0;
    p.maxLife = 0.8 + Math.random() * 0.9;
    p.swaySpeed = 3 + Math.random() * 4;
  }, []);

  // When new ignition point added, trigger initial burst
  useEffect(() => {
    if (ignitionPoints.length > prevPointsCountRef.current) {
      const latest = ignitionPoints[ignitionPoints.length - 1];
      if (latest) {
        // Spawn 32 particles for impactful ignition burst
        for (let i = 0; i < 32; i++) {
          spawnParticle(latest.x, latest.y, true);
        }
      }
    }
    prevPointsCountRef.current = ignitionPoints.length;
  }, [ignitionPoints, spawnParticle]);

  // If points are cleared, deactivate all particles
  useEffect(() => {
    if (ignitionPoints.length === 0) {
      const pool = poolRef.current;
      for (let i = 0; i < MAX_PARTICLES; i++) {
        pool[i].active = false;
      }
    }
  }, [ignitionPoints.length]);

  const render = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      dt: number
    ) => {
      ctx.clearRect(0, 0, width, height);

      if (ignitionPoints.length === 0 && poolRef.current.every((p) => !p.active)) {
        return;
      }

      const motionScale = settings.reducedMotion ? 0.25 : 1.0;
      const pool = poolRef.current;

      // Continuously emit subtle black flame tongues from each active ignition point
      for (let i = 0; i < ignitionPoints.length; i++) {
        const pt = ignitionPoints[i];
        if (Math.random() < 0.45 * settings.visualIntensity) {
          spawnParticle(pt.x, pt.y, false);
        }
      }

      // Update & render pooled particles
      for (let i = 0; i < MAX_PARTICLES; i++) {
        const p = pool[i];
        if (!p.active) continue;

        p.life += dt * motionScale;
        if (p.life >= p.maxLife) {
          p.active = false;
          continue;
        }

        const progress = p.life / p.maxLife;

        // Position update with characteristic flickering flame lick
        p.x += (p.vx + Math.sin(p.life * p.swaySpeed) * 12) * dt * motionScale;
        p.y += p.vy * dt * motionScale;

        const currentSize = p.size * (1 - progress * 0.4);
        const alpha = Math.sin(progress * Math.PI) * 0.95;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

        // Crimson burning aura perimeter
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize + 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#b31217';
        ctx.shadowColor = '#ff2424';
        ctx.shadowBlur = 12;
        ctx.fill();

        // Inextinguishable jet-black Amaterasu core
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = '#060609';
        ctx.shadowColor = '#700008';
        ctx.shadowBlur = 4;
        ctx.fill();

        ctx.restore();
      }
    },
    [ignitionPoints, settings.reducedMotion, settings.visualIntensity, spawnParticle]
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
