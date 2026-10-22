import React, { useId } from 'react';
import type { EyeProps } from '../../types';
import { useSettings } from '../../hooks/useSettings';
import { cn } from '../../utils/cn';

export const ShisuiMangekyo: React.FC<EyeProps> = ({
  size = 200,
  pupilScale = 1.0,
  glowIntensity = 0.7,
  rotationSpeed = 8,
  isAwakened = false,
  className = '',
}) => {
  const { settings } = useSettings();
  const rawId = useId().replace(/:/g, '');
  const filterId = `shisui-glow-${rawId}`;
  const gradId = `shisui-grad-${rawId}`;

  const currentSpeed = isAwakened ? Math.min(rotationSpeed, 2.5) : rotationSpeed;
  const shouldAnimate = !settings.reducedMotion && currentSpeed > 0;
  const effectiveGlow = isAwakened ? Math.min(1.0, glowIntensity * 1.6) : glowIntensity;
  const glowBlur = effectiveGlow * 6;

  // 4 blades at 90-degree spacing
  const bladeAngles = [0, 90, 180, 270];

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
        aria-label="Shisui Uchiha Mangekyo Sharingan (Kotoamatsukami)"
      >
        <defs>
          <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff2828" />
            <stop offset="50%" stopColor="#c80812" />
            <stop offset="85%" stopColor="#7a040b" />
            <stop offset="100%" stopColor="#240003" />
          </radialGradient>

          <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={glowBlur} result="blur" />
            <feComponentTransfer in="blur" result="glow">
              <feFuncA type="linear" slope={effectiveGlow * 1.7} />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Shisui's Single Flared Pinwheel Blade */}
          <path
            id={`shisui-blade-${rawId}`}
            d="M 100,100 C 104,80 114,58 135,36 C 122,50 118,72 116,92 C 112,98 106,100 100,100 Z"
            fill="#060608"
          />
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

        {/* Rotating Pinwheel Blades */}
        <g
          style={{
            transformOrigin: '100px 100px',
            animation: shouldAnimate ? `eye-spin ${currentSpeed}s linear infinite` : 'none',
          }}
        >
          {/* Subtle Outer Iris Shadow Line */}
          <circle cx="100" cy="100" r="77" fill="none" stroke="#250205" strokeWidth="2" />

          {/* 4 Pinwheel Blades */}
          {bladeAngles.map((angle) => (
            <use
              key={angle}
              href={`#shisui-blade-${rawId}`}
              transform={`rotate(${angle}, 100, 100)`}
            />
          ))}

          {/* Pinwheel Center Ring */}
          <circle
            cx="100"
            cy="100"
            r={18 * pupilScale}
            fill="#060608"
            stroke="#1d0205"
            strokeWidth="1.5"
          />

          {/* Inner Core */}
          <circle cx="100" cy="100" r={8 * pupilScale} fill="#120103" />

          {/* Specular Highlight */}
          <circle cx="95" cy="94" r="3" fill="#ffffff" fillOpacity="0.25" />
        </g>

        {/* Outer Border */}
        <circle cx="100" cy="100" r="80" fill="none" stroke="#07060a" strokeWidth="3.5" />
      </svg>
    </div>
  );
};
