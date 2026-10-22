import React, { useRef, useCallback, useEffect } from 'react';
import { useAnimationLoop } from '../../hooks/useAnimationLoop';
import { useSettings } from '../../hooks/useSettings';

interface Crow {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetVx: number;
  targetVy: number;
  wingPhase: number;
  wingSpeed: number;
  scale: number;
  alpha: number;
  scatterTimer: number;
}

export interface RavenSwarmProps {
  className?: string;
  scatterRadius?: number;
}

export const RavenSwarm: React.FC<RavenSwarmProps> = ({
  className = '',
  scatterRadius = 140,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { settings } = useSettings();
  const crowsRef = useRef<Crow[]>([]);
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  // Track cursor position on window / canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onMouseLeave = () => {
      mousePosRef.current.active = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const render = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      dt: number
    ) => {
      ctx.clearRect(0, 0, width, height);

      const motionScale = settings.reducedMotion ? 0.2 : 1.0;
      // Cap at ~60 crows scaled by intensity (min 15)
      const maxCrows = Math.max(15, Math.floor(60 * settings.visualIntensity));
      const crows = crowsRef.current;

      while (crows.length < maxCrows) {
        crows.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 40,
          vy: (Math.random() - 0.5) * 30,
          targetVx: (Math.random() > 0.5 ? 1 : -1) * (20 + Math.random() * 30),
          targetVy: (Math.random() - 0.5) * 20,
          wingPhase: Math.random() * Math.PI * 2,
          wingSpeed: 5 + Math.random() * 4,
          scale: 0.6 + Math.random() * 0.6,
          alpha: 0.35 + Math.random() * 0.55,
          scatterTimer: 0,
        });
      }

      const mouse = mousePosRef.current;

      for (let i = 0; i < crows.length; i++) {
        const c = crows[i];

        // Cursor smooth repulsion
        if (mouse.active) {
          const dx = c.x - mouse.x;
          const dy = c.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < scatterRadius && dist > 1) {
            const force = (1 - dist / scatterRadius) * 260;
            c.vx += (dx / dist) * force * dt;
            c.vy += (dy / dist) * force * dt;
            c.scatterTimer = 1.8; // scatter mode duration in seconds
          }
        }

        // Regrouping toward target velocity
        if (c.scatterTimer > 0) {
          c.scatterTimer -= dt;
          // Dampen explosive scatter velocity smoothly
          c.vx *= 0.96;
          c.vy *= 0.96;
        } else {
          // Ambient flocking drift
          c.vx += (c.targetVx - c.vx) * dt * 0.8;
          c.vy += (c.targetVy - c.vy) * dt * 0.8;

          // Gentle sinusoidal soaring wave
          c.vy += Math.sin(c.wingPhase * 0.5) * 8 * dt;

          // Occasionally shift direction
          if (Math.random() < 0.005) {
            c.targetVx = (Math.random() > 0.5 ? 1 : -1) * (20 + Math.random() * 30);
            c.targetVy = (Math.random() - 0.5) * 25;
          }
        }

        // Update position
        c.x += c.vx * dt * motionScale;
        c.y += c.vy * dt * motionScale;
        c.wingPhase += c.wingSpeed * dt * motionScale;

        // Wrap around viewport bounds
        if (c.x < -40) c.x = width + 40;
        if (c.x > width + 40) c.x = -40;
        if (c.y < -40) c.y = height + 40;
        if (c.y > height + 40) c.y = -40;

        // Render procedural crow silhouette
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.globalAlpha = c.alpha;

        const isMovingRight = c.vx >= 0;
        ctx.scale(isMovingRight ? c.scale : -c.scale, c.scale);

        // Sinusoidal wing flap angle
        const wingFlap = Math.sin(c.wingPhase) * 11;

        ctx.fillStyle = '#0a0a10';
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 4;

        ctx.beginPath();
        // Sleek raven torso and beak
        ctx.ellipse(0, 0, 11, 3.8, 0.08, 0, Math.PI * 2);

        // Left primary wing
        ctx.moveTo(-2, -1);
        ctx.quadraticCurveTo(-7, -10 - wingFlap, -20, -5 - wingFlap * 0.5);
        ctx.quadraticCurveTo(-9, -2, -2, -1);

        // Right primary wing
        ctx.moveTo(3, -1);
        ctx.quadraticCurveTo(8, -12 - wingFlap, 22, -7 - wingFlap * 0.5);
        ctx.quadraticCurveTo(11, -2, 3, -1);

        // Subtle tail feathers
        ctx.moveTo(-9, 0);
        ctx.lineTo(-17, 3);
        ctx.lineTo(-10, 2);

        ctx.fill();
        ctx.restore();
      }
    },
    [settings.reducedMotion, settings.visualIntensity, scatterRadius]
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
