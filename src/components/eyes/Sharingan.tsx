import React, { useId } from 'react';
import type { SharinganProps } from '../../types';
import { useSettings } from '../../hooks/useSettings';
import { cn } from '../../utils/cn';

export const Sharingan: React.FC<SharinganProps> = ({
  size = 200,
  pupilScale = 1.0,
  glowIntensity = 0.6,
  rotationSpeed = 12,
  isAwakened = false,
  tomoeCount = 3,
  className = '',
}) => {
  const { settings } = useSettings();
  const rawId = useId().replace(/:/g, '');
  const filterId = `sharingan-glow-${rawId}`;
  const gradId = `sharingan-grad-${rawId}`;
  const ringGradId = `sharingan-ring-${rawId}`;

  const shouldAnimate = !settings.reducedMotion && rotationSpeed > 0;
  const effectiveGlow = isAwakened ? Math.min(1.0, glowIntensity * 1.5) : glowIntensity;
  const glowBlur = effectiveGlow * 5;

  // Iris center (100, 100), radius = 80
  const irisRadius = 80;
  const tomoeRingRadius = irisRadius * 0.62; // 49.6

  // Tomoe angles in degrees
  const getTomoeAngles = (): number[] => {
    if (tomoeCount === 1) return [270];
    if (tomoeCount === 2) return [270, 90];
    return [270, 30, 150]; // 120-degree exact spacing
  };

  const tomoeAngles = getTomoeAngles();

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
        aria-label={`Uchiha Sharingan ${tomoeCount}-Tomoe`}
      >
        <defs>
          {/* Iris Radial Gradient */}
          <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff3838" />
            <stop offset="45%" stopColor="#d60915" />
            <stop offset="85%" stopColor="#87050d" />
            <stop offset="100%" stopColor="#300104" />
          </radialGradient>

          {/* Outer Ring Gradient */}
          <radialGradient id={ringGradId} cx="50%" cy="50%" r="50%">
            <stop offset="90%" stopColor="#120204" stopOpacity="0" />
            <stop offset="96%" stopColor="#08080c" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#050508" stopOpacity="1" />
          </radialGradient>

          {/* SVG Glow Filter */}
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

          {/* Single Tomoe Symbol Definition */}
          <g id={`tomoe-${rawId}`}>
            {/* Tomoe Head */}
            <circle cx="0" cy="0" r="6.2" fill="#08080d" />
            {/* Curved Tomoe Tail */}
            <path
              d="M 0,-6.2 C 5.5,-5.8 11.5,-2 14.5,5.5 C 10.5,3.2 6.8,1.2 1.5,0.2 C -1.5,-0.3 -2,-4.5 0,-6.2 Z"
              fill="#08080d"
            />
          </g>
        </defs>

        {/* Outer Sclera Frame */}
        <circle cx="100" cy="100" r="94" fill="#0c0b12" stroke="#1f1b2b" strokeWidth="2" />

        {/* Iris Base */}
        <circle
          cx="100"
          cy="100"
          r={irisRadius}
          fill={`url(#${gradId})`}
          filter={`url(#${filterId})`}
        />

        {/* Outer Iris Edge Shadow */}
        <circle cx="100" cy="100" r={irisRadius} fill={`url(#${ringGradId})`} />

        {/* Rotating Dojutsu Mechanism */}
        <g
          style={{
            transformOrigin: '100px 100px',
            animation: shouldAnimate ? `eye-spin ${rotationSpeed}s linear infinite` : 'none',
          }}
        >
          {/* Tomoe Orbit Guide Ring */}
          <circle
            cx="100"
            cy="100"
            r={tomoeRingRadius}
            fill="none"
            stroke="#120103"
            strokeWidth="1.8"
            strokeOpacity="0.85"
          />

          {/* Tomoe Placements */}
          {tomoeAngles.map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const tx = 100 + Math.cos(rad) * tomoeRingRadius;
            const ty = 100 + Math.sin(rad) * tomoeRingRadius;
            // Tail points along orbit
            const rotationOffset = angle + 90;

            return (
              <use
                key={angle}
                href={`#tomoe-${rawId}`}
                x={tx}
                y={ty}
                transform={`rotate(${rotationOffset}, ${tx}, ${ty})`}
              />
            );
          })}

          {/* Central Black Pupil */}
          <circle
            cx="100"
            cy="100"
            r={13 * pupilScale}
            fill="#060608"
            stroke="#1a0204"
            strokeWidth="1.5"
          />

          {/* Center Light Specular Glint */}
          <circle cx="94" cy="94" r="3.2" fill="#ffffff" fillOpacity="0.25" />
        </g>

        {/* Outer Eye Iris Border */}
        <circle
          cx="100"
          cy="100"
          r={irisRadius}
          fill="none"
          stroke="#07070b"
          strokeWidth="3.5"
        />
      </svg>
    </div>
  );
};
