import React, { useRef, useCallback, useEffect } from 'react';
import { useAnimationLoop } from '../../hooks/useAnimationLoop';
import { useSettings } from '../../hooks/useSettings';
import { audioEngine } from '../../utils/audioEngine';

interface RockFragment {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  vertices: { x: number; y: number }[];
  color: string;
  alpha: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  alpha: number;
}

interface BanshoVortex {
  x: number;
  y: number;
  radius: number;
  duration: number;
  elapsed: number;
}

interface RainStreak {
  x: number;
  y: number;
  speed: number;
  length: number;
  alpha: number;
}

export interface PainCanvasProps {
  isChibakuActive: boolean;
  triggerShinraSignal?: number;
  banshoTargetPoint?: { x: number; y: number } | null;
  onCanvasClick?: (x: number, y: number) => void;
  className?: string;
}

export const PainCanvas: React.FC<PainCanvasProps> = ({
  isChibakuActive,
  triggerShinraSignal = 0,
  banshoTargetPoint = null,
  onCanvasClick,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { settings } = useSettings();

  // Simulation persistent state (no re-allocations in loop)
  const rocksRef = useRef<RockFragment[]>([]);
  const rainRef = useRef<RainStreak[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const banshoVortexesRef = useRef<BanshoVortex[]>([]);
  const flashAlphaRef = useRef<number>(0);
  const chibakuRadiusRef = useRef<number>(24);
  const prevSignalRef = useRef<number>(triggerShinraSignal);

  // Initialize Rock Fragments pool
  const initRocks = (width: number, height: number, count: number) => {
    const rocks: RockFragment[] = [];
    const colors = ['#64748b', '#475569', '#334155', '#94a3b8', '#1e293b'];

    for (let i = 0; i < count; i++) {
      const size = 3 + Math.random() * 7;
      // Procedural rocky polygonal vertices (5-6 points)
      const numPoints = 5 + Math.floor(Math.random() * 3);
      const vertices: { x: number; y: number }[] = [];
      for (let p = 0; p < numPoints; p++) {
        const angle = (p / numPoints) * Math.PI * 2;
        const rad = size * (0.65 + Math.random() * 0.45);
        vertices.push({
          x: Math.cos(angle) * rad,
          y: Math.sin(angle) * rad,
        });
      }

      rocks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12 - 4, // subtle upward draft
        size,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.8,
        vertices,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.35 + Math.random() * 0.45,
      });
    }
    return rocks;
  };

  // Initialize Rain Streaks pool
  const initRain = (width: number, height: number, count: number) => {
    const rain: RainStreak[] = [];
    for (let i = 0; i < count; i++) {
      rain.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 550 + Math.random() * 350,
        length: 14 + Math.random() * 18,
        alpha: 0.15 + Math.random() * 0.3,
      });
    }
    return rain;
  };

  // Trigger Shinra Tensei concussive repulsion shockwave
  const triggerShinraTenseiInternal = useCallback(
    (cx: number, cy: number) => {
      // Screen flash
      flashAlphaRef.current = 0.55;

      // Add expanding concentric shockwave rings
      shockwavesRef.current.push(
        {
          x: cx,
          y: cy,
          radius: 10,
          maxRadius: Math.max(window.innerWidth, window.innerHeight) * 1.1,
          speed: 1200,
          alpha: 0.9,
        },
        {
          x: cx,
          y: cy,
          radius: 0,
          maxRadius: Math.max(window.innerWidth, window.innerHeight) * 1.0,
          speed: 950,
          alpha: 0.7,
        }
      );

      // Repel all debris outward with 1/r falloff
      const rocks = rocksRef.current;
      for (let i = 0; i < rocks.length; i++) {
        const r = rocks[i];
        const dx = r.x - cx;
        const dy = r.y - cy;
        const dist = Math.max(15, Math.sqrt(dx * dx + dy * dy));
        const falloff = 14000 / (dist + 60);
        r.vx += (dx / dist) * falloff;
        r.vy += (dy / dist) * falloff;
      }
    },
    []
  );

  // Trigger Bansho Tenin attraction vortex
  const triggerBanshoInternal = useCallback((tx: number, ty: number) => {
    banshoVortexesRef.current.push({
      x: tx,
      y: ty,
      radius: 80,
      duration: 1.6,
      elapsed: 0,
    });
  }, []);

  // Listen to Shinra signal from props
  useEffect(() => {
    if (triggerShinraSignal > prevSignalRef.current && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      triggerShinraTenseiInternal(rect.width / 2, rect.height / 2);
    }
    prevSignalRef.current = triggerShinraSignal;
  }, [triggerShinraSignal, triggerShinraTenseiInternal]);

  // Listen to external Bansho target
  useEffect(() => {
    if (banshoTargetPoint) {
      triggerBanshoInternal(banshoTargetPoint.x, banshoTargetPoint.y);
    }
  }, [banshoTargetPoint, triggerBanshoInternal]);

  // Handle canvas click to trigger Bansho Ten'in
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    audioEngine.playActivation();
    triggerBanshoInternal(x, y);
    if (onCanvasClick) {
      onCanvasClick(x, y);
    }
  };

  // Main Render Loop
  const render = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      dt: number
    ) => {
      ctx.clearRect(0, 0, width, height);

      const motionScale = settings.reducedMotion ? 0.25 : 1.0;
      const intensity = settings.visualIntensity;
      const cx = width / 2;
      const cy = height / 2;

      // 1. Maintain Rain Pool
      const targetRainCount = Math.floor(130 * intensity);
      if (rainRef.current.length === 0) {
        rainRef.current = initRain(width, height, targetRainCount);
      }
      const rain = rainRef.current;
      ctx.save();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      for (let i = 0; i < rain.length; i++) {
        const d = rain[i];
        d.y += d.speed * dt * motionScale;
        d.x += d.speed * 0.06 * dt * motionScale; // slight Amegakure storm slant

        if (d.y > height + 25) {
          d.y = -25;
          d.x = Math.random() * width;
        }

        ctx.globalAlpha = d.alpha * (settings.reducedMotion ? 0.3 : 0.6);
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + 1.2, d.y + d.length);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Maintain Rock Fragments Pool
      const targetRockCount = Math.floor(140 * intensity);
      if (rocksRef.current.length === 0) {
        rocksRef.current = initRocks(width, height, targetRockCount);
      }
      const rocks = rocksRef.current;

      // Chibaku Tensei Accretion Mechanics
      if (isChibakuActive) {
        chibakuRadiusRef.current = Math.min(
          64,
          chibakuRadiusRef.current + dt * 2.5 * motionScale
        );
      } else {
        chibakuRadiusRef.current = Math.max(
          24,
          chibakuRadiusRef.current - dt * 18 * motionScale
        );
      }
      const sphereRadius = chibakuRadiusRef.current;

      // Update & Draw Bansho Vortexes
      const vortexes = banshoVortexesRef.current;
      for (let vIdx = vortexes.length - 1; vIdx >= 0; vIdx--) {
        const v = vortexes[vIdx];
        v.elapsed += dt;
        if (v.elapsed >= v.duration) {
          vortexes.splice(vIdx, 1);
          continue;
        }

        const progress = v.elapsed / v.duration;
        const vRadius = v.radius * (1 - progress * 0.7);
        const vAlpha = (1 - progress) * 0.75;

        // Draw collapsing gravitational ring
        ctx.save();
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = vAlpha;
        ctx.beginPath();
        ctx.arc(v.x, v.y, vRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(v.x, v.y, vRadius * 0.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Apply Bansho attraction to rocks
        for (let rIdx = 0; rIdx < rocks.length; rIdx++) {
          const r = rocks[rIdx];
          const dx = v.x - r.x;
          const dy = v.y - r.y;
          const dist = Math.max(10, Math.sqrt(dx * dx + dy * dy));
          const force = (380 * (1 - progress)) / (dist + 40);
          r.vx += (dx / dist) * force * 15 * dt * motionScale;
          r.vy += (dy / dist) * force * 15 * dt * motionScale;
        }
      }

      // Update & Draw Rocks
      for (let i = 0; i < rocks.length; i++) {
        const r = rocks[i];

        // Chibaku Tensei gravity attraction toward center
        if (isChibakuActive) {
          const dx = cx - r.x;
          const dy = cy - r.y;
          const dist = Math.max(5, Math.sqrt(dx * dx + dy * dy));

          // Tangential spiral + radial gravity
          const gravityForce = 450 / Math.pow(dist + 30, 0.95);
          const tangX = -dy / dist;
          const tangY = dx / dist;

          r.vx += ((dx / dist) * gravityForce + tangX * 22) * dt * 45 * motionScale;
          r.vy += ((dy / dist) * gravityForce + tangY * 22) * dt * 45 * motionScale;

          // Absorb if caught inside black gravity sphere
          if (dist < sphereRadius + 6) {
            // Recycle particle to outside boundary
            const edgeAngle = Math.random() * Math.PI * 2;
            const spawnDist = Math.max(width, height) * 0.75 + Math.random() * 80;
            r.x = cx + Math.cos(edgeAngle) * spawnDist;
            r.y = cy + Math.sin(edgeAngle) * spawnDist;
            r.vx = (Math.random() - 0.5) * 20;
            r.vy = (Math.random() - 0.5) * 20;
          }
        }

        // Apply friction / air drag
        r.vx *= Math.pow(0.96, dt * 60);
        r.vy *= Math.pow(0.96, dt * 60);

        r.x += r.vx * dt * motionScale;
        r.y += r.vy * dt * motionScale;
        r.rotation += r.rotationSpeed * dt * motionScale;

        // Normal wrapping when not in Chibaku mode
        if (!isChibakuActive) {
          if (r.x < -40) r.x = width + 30;
          if (r.x > width + 40) r.x = -30;
          if (r.y < -40) r.y = height + 30;
          if (r.y > height + 40) r.y = -30;
        }

        // Render Rock Polygon
        ctx.save();
        ctx.translate(r.x, r.y);
        ctx.rotate(r.rotation);
        ctx.fillStyle = r.color;
        ctx.globalAlpha = r.alpha;
        ctx.beginPath();
        for (let p = 0; p < r.vertices.length; p++) {
          const pt = r.vertices[p];
          if (p === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.closePath();
        ctx.fill();

        // Metallic edge highlight
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 0.6;
        ctx.globalAlpha = r.alpha * 0.45;
        ctx.stroke();
        ctx.restore();
      }

      // 3. Central Chibaku Gravity Sphere (when active or lingering)
      if (isChibakuActive || sphereRadius > 25) {
        ctx.save();
        // Outer gravity distortion glow
        const glowGrad = ctx.createRadialGradient(
          cx,
          cy,
          sphereRadius * 0.4,
          cx,
          cy,
          sphereRadius * 2.4
        );
        glowGrad.addColorStop(0, 'rgba(124, 58, 237, 0.45)');
        glowGrad.addColorStop(0.6, 'rgba(30, 16, 53, 0.25)');
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, sphereRadius * 2.4, 0, Math.PI * 2);
        ctx.fill();

        // Pulsating celestial accretion ring
        const pulse = 1 + Math.sin(performance.now() * 0.005) * 0.08;
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = 0.65;
        ctx.beginPath();
        ctx.arc(cx, cy, sphereRadius * 1.35 * pulse, 0, Math.PI * 2);
        ctx.stroke();

        // Dark singularity core
        const coreGrad = ctx.createRadialGradient(
          cx,
          cy,
          0,
          cx,
          cy,
          sphereRadius
        );
        coreGrad.addColorStop(0, '#020005');
        coreGrad.addColorStop(0.7, '#070212');
        coreGrad.addColorStop(1, '#6b21a8');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. Update & Draw Shinra Shockwaves
      const shockwaves = shockwavesRef.current;
      for (let sIdx = shockwaves.length - 1; sIdx >= 0; sIdx--) {
        const sw = shockwaves[sIdx];
        sw.radius += sw.speed * dt * motionScale;
        sw.alpha = Math.max(0, 1 - sw.radius / sw.maxRadius);

        if (sw.radius >= sw.maxRadius || sw.alpha <= 0.01) {
          shockwaves.splice(sIdx, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = Math.max(1, 4 * (1 - sw.radius / sw.maxRadius));
        ctx.globalAlpha = sw.alpha * 0.85;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = sw.alpha * 0.6;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, Math.max(0, sw.radius - 8), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 5. Shinra Concussive Screen Flash
      if (flashAlphaRef.current > 0.01) {
        ctx.save();
        ctx.fillStyle = 'rgba(235, 230, 255, 1)';
        ctx.globalAlpha = flashAlphaRef.current;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
        flashAlphaRef.current = Math.max(
          0,
          flashAlphaRef.current - dt * 3.5 * motionScale
        );
      }
    },
    [isChibakuActive, settings.reducedMotion, settings.visualIntensity]
  );

  useAnimationLoop(canvasRef, render);

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      className={`absolute inset-0 w-full h-full pointer-events-auto cursor-crosshair ${className}`}
      title="Click anywhere to manifest Bansho Ten'in attraction vortex"
    />
  );
};
