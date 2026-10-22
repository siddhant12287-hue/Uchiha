import React, { useId } from 'react';
import type { EyeProps } from '../../types';
import { useSettings } from '../../hooks/useSettings';
import { cn } from '../../utils/cn';

export const MadaraEternalMangekyo: React.FC<EyeProps> = ({
  size = 200,
  pupilScale = 1.0,
  glowIntensity = 0.8,
  rotationSpeed = 14,
  isAwakened = false,
  className = '',
}) => {
  const { settings } = useSettings();
  const rawId = useId().replace(/:/g, '');
  const filterId = `madara-ems-glow-${rawId}`;
  const gradId = `madara-ems-grad-${rawId}`;

  const currentSpeed = isAwakened ? Math.min(rotationSpeed, 3.5) : rotationSpeed;
  const shouldAnimate = !settings.reducedMotion && currentSpeed > 0;
  const effectiveGlow = isAwakened ? Math.min(1.0, glowIntensity * 1.6) : glowIntensity;
  const glowBlur = effectiveGlow * 6.5;

  const tripleAngles = [0, 120, 240];

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
        aria-label="Madara Uchiha Eternal Mangekyo Sharingan (EMS)"
      >
        <defs>
          <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff2424" />
            <stop offset="45%" stopColor="#cc0612" />
            <stop offset="80%" stopColor="#780208" />
            <stop offset="100%" stopColor="#200003" />
          </radialGradient>

          <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={glowBlur} result="blur" />
            <feComponentTransfer in="blur" result="glow">
              <feFuncA type="linear" slope={effectiveGlow * 1.8} />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Sclera */}
        <circle cx="100" cy="100" r="94" fill="#0b0a10" stroke="#1d1928" strokeWidth="2" />

        {/* Iris Base */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill={`url(#${gradId})`}
          filter={`url(#${filterId})`}
        />

        {/* Rotating EMS Interlocking Geometry */}
        <g
          style={{
            transformOrigin: '100px 100px',
            animation: shouldAnimate ? `eye-spin ${currentSpeed}s linear infinite` : 'none',
          }}
        >
          {/* Layer 1: Izuna's thick intersecting 3-blade base */}
          {tripleAngles.map((angle) => (
            <g key={`izuna-${angle}`} transform={`rotate(${angle + 60}, 100, 100)`}>
              <path
                d="M 94,100 L 96,36 C 98,34 102,34 104,36 L 106,100 Z"
                fill="#060608"
              />
              <circle cx="100" cy="38" r="8" fill="#060608" />
            </g>
          ))}

          {/* Layer 2: Madara's Curved Scythe Forms */}
          {tripleAngles.map((angle) => (
            <g key={`madara-${angle}`} transform={`rotate(${angle}, 100, 100)`}>
              {/* Thick curved blade intersecting from center outward */}
              <path
                d="M 100,100 C 112,75 136,54 165,36 C 148,68 122,90 100,100 Z"
                fill="#060608"
              />
              {/* Outer Scythe Hook Curve */}
              <path
                d="M 165,36 C 172,48 168,64 154,75 C 158,62 162,50 165,36 Z"
                fill="#060608"
              />
            </g>
          ))}

          {/* Interlocking Concentric Inner Ring */}
          <circle
            cx="100"
            cy="100"
            r="44"
            fill="none"
            stroke="#060608"
            strokeWidth="8.5"
          />

          {/* Secondary thin guide ring */}
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="#150103"
            strokeWidth="1.5"
          />

          {/* Center Pupil Core */}
          <circle
            cx="100"
            cy="100"
            r={16 * pupilScale}
            fill="#060608"
            stroke="#210205"
            strokeWidth="2"
          />

          <circle cx="100" cy="100" r={8 * pupilScale} fill="#0d0102" />

          {/* Specular Highlight */}
          <circle cx="95" cy="94" r="3" fill="#ffffff" fillOpacity="0.28" />
        </g>

        {/* Outer Iris Edge */}
        <circle cx="100" cy="100" r="80" fill="none" stroke="#07060a" strokeWidth="3.5" />
      </svg>
    </div>
  );
};
