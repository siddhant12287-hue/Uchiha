import React, { useId } from 'react';
import type { EyeProps } from '../../types';
import { useSettings } from '../../hooks/useSettings';
import { cn } from '../../utils/cn';

export const Tenseigan: React.FC<EyeProps> = ({
  size = 200,
  pupilScale = 1.0,
  glowIntensity = 0.7,
  rotationSpeed = 0,
  isAwakened = false,
  className = '',
}) => {
  const { settings } = useSettings();
  const rawId = useId().replace(/:/g, '');
  const filterId = `tenseigan-glow-${rawId}`;
  const gradId = `tenseigan-grad-${rawId}`;
  const petalGradId = `tenseigan-petal-${rawId}`;

  const shouldAnimate = !settings.reducedMotion && (rotationSpeed > 0 || isAwakened);
  const effectiveGlow = isAwakened ? Math.min(1.0, glowIntensity * 1.5) : glowIntensity;
  const glowBlur = effectiveGlow * 6;

  // 8 Petal angles for the solar flower pattern
  const petalAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <div
      style={{ width: size, height: size }}
      className={cn('relative inline-flex items-center justify-center select-none', className)}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="w-full h-full overflow-visible"
        aria-label="Tenseigan (Reincarnation Eye)"
      >
        <defs>
          {/* Deep Cerulean Blue Iris Gradient */}
          <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="45%" stopColor="#0284c7" />
            <stop offset="75%" stopColor="#0369a1" />
            <stop offset="90%" stopColor="#082f49" />
            <stop offset="100%" stopColor="#030712" />
          </radialGradient>

          {/* Luminous White/Cyan Solar Petal Gradient */}
          <linearGradient id={petalGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#bae6fd" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
          </linearGradient>

          {/* Outer Luminous Glow Filter */}
          <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={glowBlur} result="blur" />
            <feComponentTransfer in="blur" result="glow">
              <feFuncA type="linear" slope={effectiveGlow * 1.6} />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter={`url(#${filterId})`}>
          {/* Outer Obsidian Ring */}
          <circle cx="100" cy="100" r="98" fill="#030712" stroke="#0284c7" strokeWidth="1.5" />

          {/* Glowing Cerulean Iris */}
          <circle cx="100" cy="100" r="94" fill={`url(#${gradId})`} />

          {/* Secondary Concentric Cerulean Radiance Ring */}
          <circle
            cx="100"
            cy="100"
            r="82"
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="0.75"
            strokeOpacity="0.6"
            strokeDasharray="4 2"
          />

          {/* Rotating Solar Petal Geometry */}
          <g
            style={
              shouldAnimate
                ? {
                    transformOrigin: '100px 100px',
                    animation: `spin ${Math.max(4, 28 - rotationSpeed * 2.5)}s linear infinite`,
                  }
                : undefined
            }
          >
            {/* 8 Outer Floral Rays */}
            {petalAngles.map((angle) => (
              <g key={angle} transform={`rotate(${angle} 100 100)`}>
                <polygon
                  points="100,22 108,70 100,85 92,70"
                  fill={`url(#${petalGradId})`}
                  filter="drop-shadow(0 0 4px #bae6fd)"
                />
                <circle cx="100" cy="22" r="2.5" fill="#ffffff" />
              </g>
            ))}

            {/* 8 Inner Secondary Offset Petals */}
            {petalAngles.map((angle) => (
              <g key={`inner-${angle}`} transform={`rotate(${angle + 22.5} 100 100)`}>
                <polygon
                  points="100,38 105,74 100,84 95,74"
                  fill="#e0f2fe"
                  fillOpacity="0.8"
                />
              </g>
            ))}
          </g>

          {/* Central Solar Core & Pupil */}
          <circle
            cx="100"
            cy="100"
            r={18 * Math.max(0.7, Math.min(1.4, pupilScale))}
            fill="#ffffff"
            filter="drop-shadow(0 0 8px #38bdf8)"
          />
          <circle
            cx="100"
            cy="100"
            r={10 * Math.max(0.7, Math.min(1.4, pupilScale))}
            fill="#0284c7"
          />
          <circle
            cx="100"
            cy="100"
            r={4 * Math.max(0.7, Math.min(1.4, pupilScale))}
            fill="#ffffff"
          />
        </g>
      </svg>
    </div>
  );
};
