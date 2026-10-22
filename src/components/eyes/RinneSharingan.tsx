import React, { useId } from 'react';
import type { EyeProps } from '../../types';
import { useSettings } from '../../hooks/useSettings';
import { cn } from '../../utils/cn';

export const RinneSharingan: React.FC<EyeProps> = ({
  size = 200,
  pupilScale = 1.0,
  glowIntensity = 0.85,
  rotationSpeed = 16,
  isAwakened = false,
  className = '',
}) => {
  const { settings } = useSettings();
  const rawId = useId().replace(/:/g, '');
  const filterId = `rinnesharingan-glow-${rawId}`;
  const gradId = `rinnesharingan-grad-${rawId}`;

  const currentSpeed = isAwakened ? Math.min(rotationSpeed, 4) : rotationSpeed;
  const shouldAnimate = !settings.reducedMotion && currentSpeed > 0;
  const effectiveGlow = isAwakened ? Math.min(1.0, glowIntensity * 1.5) : glowIntensity;
  const glowBlur = effectiveGlow * 6.5;

  // 3 Tomoe Rings with 3 Tomoe each (total 9 tomoe)
  const tomoeRings = [
    { radius: 32, offset: 0 },
    { radius: 51, offset: 40 },
    { radius: 70, offset: 80 },
  ];

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
        aria-label="Rinne Sharingan (Eye of the Moon)"
      >
        <defs>
          <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff2828" />
            <stop offset="40%" stopColor="#cc0914" />
            <stop offset="75%" stopColor="#7a0309" />
            <stop offset="100%" stopColor="#250003" />
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

          {/* Scaled Tomoe Symbol */}
          <g id={`rs-tomoe-${rawId}`}>
            <circle cx="0" cy="0" r="4.6" fill="#08080d" />
            <path
              d="M 0,-4.6 C 4,-4.2 8.5,-1.2 11,4.2 C 8,2.4 5,0.8 1,0.1 C -1,-0.2 -1.6,-3.2 0,-4.6 Z"
              fill="#08080d"
            />
          </g>
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

        {/* Rotating Concentric Rings & 9 Tomoe */}
        <g
          style={{
            transformOrigin: '100px 100px',
            animation: shouldAnimate ? `eye-spin ${currentSpeed}s linear infinite` : 'none',
          }}
        >
          {/* Concentric Rinnegan-like rings in crimson */}
          {[20, 32, 42, 51, 61, 70, 78].map((r) => (
            <circle
              key={r}
              cx="100"
              cy="100"
              r={r}
              fill="none"
              stroke="#130103"
              strokeWidth="1.8"
            />
          ))}

          {/* 3 Rings x 3 Tomoe = 9 Tomoe */}
          {tomoeRings.map((ring, ringIdx) => {
            const baseAngles = [270, 30, 150];
            return baseAngles.map((baseAngle) => {
              const angle = (baseAngle + ring.offset) % 360;
              const rad = (angle * Math.PI) / 180;
              const tx = 100 + Math.cos(rad) * ring.radius;
              const ty = 100 + Math.sin(rad) * ring.radius;
              const rotationOffset = angle + 90;

              return (
                <use
                  key={`rs-tomoe-${ringIdx}-${angle}`}
                  href={`#rs-tomoe-${rawId}`}
                  x={tx}
                  y={ty}
                  transform={`rotate(${rotationOffset}, ${tx}, ${ty})`}
                />
              );
            });
          })}

          {/* Center Black Pupil */}
          <circle
            cx="100"
            cy="100"
            r={10 * pupilScale}
            fill="#060608"
            stroke="#1d0205"
            strokeWidth="1.5"
          />

          {/* Specular Highlight */}
          <circle cx="95" cy="94" r="2.8" fill="#ffffff" fillOpacity="0.3" />
        </g>

        {/* Outer Iris Edge */}
        <circle cx="100" cy="100" r="80" fill="none" stroke="#07060a" strokeWidth="3.5" />
      </svg>
    </div>
  );
};
