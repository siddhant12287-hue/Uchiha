import React, { useId } from 'react';
import type { EyeProps } from '../../types';
import { useSettings } from '../../hooks/useSettings';
import { cn } from '../../utils/cn';

export const Rinnegan: React.FC<EyeProps> = ({
  size = 200,
  pupilScale = 1.0,
  glowIntensity = 0.7,
  rotationSpeed = 0, // Rinnegan is typically stationary, but supports slow rotation
  isAwakened = false,
  className = '',
}) => {
  const { settings } = useSettings();
  const rawId = useId().replace(/:/g, '');
  const filterId = `rinnegan-glow-${rawId}`;
  const gradId = `rinnegan-grad-${rawId}`;

  const shouldAnimate = !settings.reducedMotion && rotationSpeed > 0;
  const effectiveGlow = isAwakened ? Math.min(1.0, glowIntensity * 1.5) : glowIntensity;
  const glowBlur = effectiveGlow * 6;

  // 6 Concentric ripple ring radii
  const rippleRadii = [22, 34, 46, 58, 69, 79];

  return (
    <div
      style={{ width: size, height: size }}
      className={cn('relative inline-flex items-center justify-center select-none', className)}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className={cn(
          'w-full h-full overflow-visible',
          isAwakened && !settings.reducedMotion && 'animate-rinnegan-pulse'
        )}
        aria-label="Six Paths Rinnegan (Samsara Eye)"
      >
        <defs>
          <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9a81c4" />
            <stop offset="35%" stopColor="#755a9e" />
            <stop offset="65%" stopColor="#4f3775" />
            <stop offset="88%" stopColor="#2c1a47" />
            <stop offset="100%" stopColor="#150a24" />
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
        <circle cx="100" cy="100" r="94" fill="#0b0a12" stroke="#1d1928" strokeWidth="2" />

        {/* Iris Base */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill={`url(#${gradId})`}
          filter={`url(#${filterId})`}
        />

        {/* Concentric Ripple Rings Structure */}
        <g
          style={{
            transformOrigin: '100px 100px',
            animation: shouldAnimate ? `eye-spin ${rotationSpeed}s linear infinite` : 'none',
          }}
        >
          {rippleRadii.map((radius, idx) => (
            <g key={radius}>
              {/* Outer soft shadow of ripple */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#0f071c"
                strokeWidth="2.8"
              />
              {/* Subtle specular rim */}
              <circle
                cx="100"
                cy="100"
                r={radius - 0.7}
                fill="none"
                stroke="#b8a1de"
                strokeWidth="0.75"
                strokeOpacity={0.25 + (idx / rippleRadii.length) * 0.25}
              />
            </g>
          ))}

          {/* Center Black Pupil (Ring 0) */}
          <circle
            cx="100"
            cy="100"
            r={10 * pupilScale}
            fill="#08040d"
            stroke="#1b0f2e"
            strokeWidth="1.5"
          />

          {/* Core Specular Glint */}
          <circle cx="96" cy="95" r="2.5" fill="#ffffff" fillOpacity="0.35" />
        </g>

        {/* Outer Iris Edge */}
        <circle cx="100" cy="100" r="80" fill="none" stroke="#080310" strokeWidth="3.5" />
      </svg>
    </div>
  );
};
