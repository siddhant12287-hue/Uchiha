import React, { useId } from 'react';
import type { EyeProps } from '../../types';
import { cn } from '../../utils/cn';

export const Jogan: React.FC<EyeProps> = ({
  size = 200,
  pupilScale = 1.0,
  glowIntensity = 0.8,
  rotationSpeed: _rotationSpeed = 0,
  isAwakened = false,
  className = '',
}) => {
  const rawId = useId().replace(/:/g, '');
  const filterId = `jogan-glow-${rawId}`;
  const irisGradId = `jogan-iris-${rawId}`;
  const scleraGradId = `jogan-sclera-${rawId}`;

  const effectiveGlow = isAwakened ? Math.min(1.0, glowIntensity * 1.4) : glowIntensity;
  const glowBlur = effectiveGlow * 6;

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
        aria-label="Jōgan (Pure Eye - Boruto Era)"
      >
        <defs>
          {/* Pitch-black to Charcoal Sclera Gradient */}
          <radialGradient id={scleraGradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="60%" stopColor="#0f172a" />
            <stop offset="90%" stopColor="#05070f" />
            <stop offset="100%" stopColor="#020307" />
          </radialGradient>

          {/* Eerie Cyan/Ice Blue Iris Gradient */}
          <radialGradient id={irisGradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="40%" stopColor="#7dd3fc" />
            <stop offset="75%" stopColor="#0284c7" />
            <stop offset="92%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </radialGradient>

          {/* Cyan Ethereal Glow Filter */}
          <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={glowBlur} result="blur" />
            <feComponentTransfer in="blur" result="glow">
              <feFuncA type="linear" slope={effectiveGlow * 1.5} />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter={`url(#${filterId})`}>
          {/* Dark Charcoal Eye Sclera */}
          <circle cx="100" cy="100" r="98" fill={`url(#${scleraGradId})`} stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />

          {/* Subtle Sclera Vein / Energy Strands */}
          <circle cx="100" cy="100" r="86" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="6 4" />

          {/* Luminous Ice-Blue Iris */}
          <circle
            cx="100"
            cy="100"
            r={54 * Math.max(0.85, Math.min(1.2, pupilScale))}
            fill={`url(#${irisGradId})`}
            stroke="#bae6fd"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />

          {/* Internal Iris Electric Halo Ring */}
          <circle
            cx="100"
            cy="100"
            r={38 * Math.max(0.85, Math.min(1.2, pupilScale))}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            strokeOpacity="0.85"
            strokeDasharray="2 3"
          />

          {/* Glowing White Pupil Singularity */}
          <circle
            cx="100"
            cy="100"
            r={16 * Math.max(0.7, Math.min(1.3, pupilScale))}
            fill="#ffffff"
            filter="drop-shadow(0 0 6px #7dd3fc)"
          />
          <circle
            cx="100"
            cy="100"
            r={6 * Math.max(0.7, Math.min(1.3, pupilScale))}
            fill="#e0f2fe"
          />
        </g>
      </svg>
    </div>
  );
};
