import React, { useRef, useCallback } from 'react';
import { useAnimationLoop } from '../../hooks/useAnimationLoop';
import { useSettings } from '../../hooks/useSettings';

interface BlueChakraParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  swaySpeed: number;
}

interface FloatingRock {
  x: number;
  y: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  size: number;
  vertices: [number, number][];
  alpha: number;
}

const MAX_CHAKRA = 140;
const MAX_ROCKS = 24;

function generateRockVertices(radius: number): [number, number][] {
  const points: [number, number][] = [];
  const sides = 5 + Math.floor(Math.random() * 3);
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2;
    const r = radius * (0.7 + Math.random() * 0.5);
    points.push([Math.cos(angle) * r, Math.sin(angle) * r]);
  }
  return points;
}

function createInitialChakra(): BlueChakraParticle[] {
  const list: BlueChakraParticle[] = [];
  for (let i = 0; i < MAX_CHAKRA; i++) {
    list.push({
      x: Math.random() * 1200,
      y: 800 + Math.random() * 200,
      vx: (Math.random() - 0.5) * 20,
      vy: - (40 + Math.random() * 60),
      size: 2 + Math.random() * 4,
      life: Math.random() * 2,
      maxLife: 1.5 + Math.random() * 1.5,
      swaySpeed: 2 + Math.random() * 3,
    });
  }
  return list;
}

function createInitialRocks(): FloatingRock[] {
  const list: FloatingRock[] = [];
  for (let i = 0; i < MAX_ROCKS; i++) {
    const r = 6 + Math.random() * 14;
    list.push({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      vy: - (8 + Math.random() * 18), // levitating slowly upward
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.8,
      size: r,
      vertices: generateRockVertices(r),
      alpha: 0.35 + Math.random() * 0.45,
    });
  }
  return list;
}

export const MadaraChakraCanvas: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { settings } = useSettings();

  const chakraRef = useRef<BlueChakraParticle[]>(createInitialChakra());
  const rocksRef = useRef<FloatingRock[]>(createInitialRocks());

  const render = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      dt: number
    ) => {
      ctx.clearRect(0, 0, width, height);

      const motionScale = settings.reducedMotion ? 0.2 : 1.0;
      const chakraList = chakraRef.current;
      const rocksList = rocksRef.current;

      // 1. Rising Blue Susanoo Chakra Flames
      for (let i = 0; i < chakraList.length; i++) {
        const c = chakraList[i];
        c.life += dt * motionScale;

        if (c.life >= c.maxLife || c.y < -20) {
          c.x = Math.random() * width;
          c.y = height + Math.random() * 20;
          c.life = 0;
          continue;
        }

        const progress = c.life / c.maxLife;
        c.x += (c.vx + Math.sin(c.life * c.swaySpeed) * 10) * dt * motionScale;
        c.y += c.vy * dt * motionScale;

        const currentAlpha = Math.sin(progress * Math.PI) * 0.75 * settings.visualIntensity;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
        ctx.fillStyle = progress < 0.3 ? '#60a5fa' : '#2563eb';
        ctx.shadowColor = '#3b82f6';
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size * (1 - progress * 0.4), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Floating Levitating Rock Debris
      for (let i = 0; i < rocksList.length; i++) {
        const r = rocksList[i];
        r.y += r.vy * dt * motionScale;
        r.rotation += r.rotSpeed * dt * motionScale;

        if (r.y < -40) {
          r.y = height + 40;
          r.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(r.x, r.y);
        ctx.rotate(r.rotation);
        ctx.globalAlpha = r.alpha * settings.visualIntensity;

        ctx.fillStyle = '#0f111a';
        ctx.strokeStyle = '#252e47';
        ctx.lineWidth = 1.2;
        ctx.shadowColor = '#1d4ed8';
        ctx.shadowBlur = 4;

        ctx.beginPath();
        if (r.vertices.length > 0) {
          ctx.moveTo(r.vertices[0][0], r.vertices[0][1]);
          for (let j = 1; j < r.vertices.length; j++) {
            ctx.lineTo(r.vertices[j][0], r.vertices[j][1]);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }

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
