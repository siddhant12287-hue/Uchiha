import React, { useId } from 'react';
import type { EyeProps } from '../../types';
import { useSettings } from '../../hooks/useSettings';
import { cn } from '../../utils/cn';

export const Byakugan: React.FC<EyeProps> = ({
  size = 200,
  pupilScale = 1.0,
  glowIntensity = 0.6,
  rotationSpeed = 0,
  isAwakened = false,
  className = '',
}) => {
  const { settings } = useSettings();
  const rawId = useId().replace(/:/g, '');
  const filterId = `byakugan-glow-${rawId}`;
  const gradId = `byakugan-grad-${rawId}`;
  const veinFilterId = `byakugan-vein-${rawId}`;

  const shouldAnimate = !settings.reducedMotion && rotationSpeed > 0;
  const effectiveGlow = isAwakened ? Math.min(1.0, glowIntensity * 1.5) : glowIntensity;
  const glowBlur = effectiveGlow * 5.5;

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
        aria-label="Byakugan (All-Seeing White Eye)"
      >
        <defs>
          <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#f3f5fd" />
            <stop offset="70%" stopColor="#dbe1f5" />
            <stop offset="88%" stopColor="#bcc7eb" />
            <stop offset="100%" stopColor="#98a8de" />
          </radialGradient>

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

          <filter id={veinFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" />
          </filter>
        </defs>

        {/* Outer Eye Socket / Sclera Base */}
        <circle cx="100" cy="100" r="94" fill="#0c0b14" stroke="#252136" strokeWidth="2" />

        {/* Subtle Chakra Veins radiating outwards from temple into eye socket */}
        <g
          filter={`url(#${veinFilterId})`}
          className={cn(
            'transition-opacity duration-300',
            isAwakened ? 'opacity-100' : 'opacity-40'
          )}
        >
          {/* Top-Right Vein Cluster */}
          <path
            d="M 160,50 Q 140,65 125,75 M 140,65 Q 155,75 165,80 M 130,55 Q 140,65 145,55"
            fill="none"
            stroke="#a5b4fc"
            strokeWidth={isAwakened ? '2.4' : '1.4'}
            strokeLinecap="round"
          />
          {/* Top-Left Vein Cluster */}
          <path
            d="M 40,50 Q 60,65 75,75 M 60,65 Q 45,75 35,80 M 70,55 Q 60,65 55,55"
            fill="none"
            stroke="#a5b4fc"
            strokeWidth={isAwakened ? '2.4' : '1.4'}
            strokeLinecap="round"
          />
          {/* Bottom-Right Vein Cluster */}
          <path
            d="M 165,130 Q 145,135 125,125 M 145,135 Q 155,148 160,155"
            fill="none"
            stroke="#a5b4fc"
            strokeWidth={isAwakened ? '2.4' : '1.4'}
            strokeLinecap="round"
          />
          {/* Bottom-Left Vein Cluster */}
          <path
            d="M 35,130 Q 55,135 75,125 M 55,135 Q 45,148 40,155"
            fill="none"
            stroke="#a5b4fc"
            strokeWidth={isAwakened ? '2.4' : '1.4'}
            strokeLinecap="round"
          />
        </g>

        {/* Iris Base */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill={`url(#${gradId})`}
          filter={`url(#${filterId})`}
        />

        {/* Optional Rotation group for inspector consistency */}
        <g
          style={{
            transformOrigin: '100px 100px',
            animation: shouldAnimate ? `eye-spin ${rotationSpeed}s linear infinite` : 'none',
          }}
        >
          {/* Faint Pupil Ring (canon Byakugan characteristic) */}
          <circle
            cx="100"
            cy="100"
            r={18 * pupilScale}
            fill="none"
            stroke="#9faedb"
            strokeWidth="1.6"
            strokeDasharray="4 2"
            strokeOpacity="0.75"
          />

          {/* Faint inner center indicator */}
          <circle
            cx="100"
            cy="100"
            r={6 * pupilScale}
            fill="#8b9bc7"
            fillOpacity="0.4"
          />

          {/* Iris radial subtle rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + Math.cos(rad) * 24;
            const y1 = 100 + Math.sin(rad) * 24;
            const x2 = 100 + Math.cos(rad) * 72;
            const y2 = 100 + Math.sin(rad) * 72;
            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#8b9bc7"
                strokeWidth="0.8"
                strokeOpacity="0.3"
              />
            );
          })}

          {/* Natural Specular Highlight */}
          <circle cx="88" cy="86" r="4.5" fill="#ffffff" fillOpacity="0.8" />
          <circle cx="112" cy="114" r="2.5" fill="#ffffff" fillOpacity="0.5" />
        </g>

        {/* Outer Iris Edge */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#7f90c4"
          strokeWidth="2.5"
          strokeOpacity="0.85"
        />
      </svg>
    </div>
  );
};
