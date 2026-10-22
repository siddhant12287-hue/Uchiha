import React, { useId } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { cn } from '../../utils/cn';

export interface MasterMandalaProps {
  size?: number;
  className?: string;
  isAwakened?: boolean;
}

export const MasterMandala: React.FC<MasterMandalaProps> = ({
  size = 360,
  className = '',
  isAwakened = false,
}) => {
  const { settings } = useSettings();
  const rawId = useId().replace(/:/g, '');
  const filterId = `mandala-glow-${rawId}`;
  const gradId = `mandala-grad-${rawId}`;

  const shouldAnimate = !settings.reducedMotion;
  const glowBlur = (isAwakened ? 8 : 5) * settings.visualIntensity;

  return (
    <div
      style={{ width: size, height: size }}
      className={cn('relative inline-flex items-center justify-center select-none', className)}
    >
      <svg
        viewBox="0 0 400 400"
        width={size}
        height={size}
        className="w-full h-full overflow-visible"
        aria-label="Master Dojutsu Chakra Mandala"
      >
        <defs>
          <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff2828" />
            <stop offset="35%" stopColor="#c70815" />
            <stop offset="70%" stopColor="#6e020b" />
            <stop offset="92%" stopColor="#25051e" />
            <stop offset="100%" stopColor="#0b0814" />
          </radialGradient>

          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={glowBlur} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Master Tomoe */}
          <g id={`mandala-tomoe-${rawId}`}>
            <circle cx="0" cy="0" r="8" fill="#08070d" />
            <path
              d="M 0,-8 C 7,-7.5 15,-2.5 19,7 C 14,4 9,1.5 2,0.3 C -2,-0.4 -2.5,-5.5 0,-8 Z"
              fill="#08070d"
            />
          </g>
        </defs>

        {/* Ambient Dark Aura Halo */}
        <circle cx="200" cy="200" r="190" fill="#06050b" stroke="#1f182c" strokeWidth="2" />

        {/* Background Radial Gradient Disc */}
        <circle
          cx="200"
          cy="200"
          r="170"
          fill={`url(#${gradId})`}
          filter={`url(#${filterId})`}
        />

        {/* Layer 1: Outer Rinnegan Ripple Rings & Cosmic Rays */}
        <g
          style={{
            transformOrigin: '200px 200px',
            animation: shouldAnimate ? 'eye-spin 36s linear infinite' : 'none',
          }}
        >
          {[168, 150, 132, 114, 96, 78, 60].map((r, idx) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              fill="none"
              stroke="#0f0714"
              strokeWidth={idx % 2 === 0 ? '2.5' : '1.5'}
              strokeOpacity="0.8"
            />
          ))}

          {/* Outer Sunburst Ray Accents */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((ang) => {
            const rad = (ang * Math.PI) / 180;
            const x1 = 200 + Math.cos(rad) * 148;
            const y1 = 200 + Math.sin(rad) * 148;
            const x2 = 200 + Math.cos(rad) * 170;
            const y2 = 200 + Math.sin(rad) * 170;
            return (
              <line
                key={ang}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#ff4d4d"
                strokeWidth="1.8"
                strokeOpacity="0.75"
              />
            );
          })}
        </g>

        {/* Layer 2: Counter-Rotating Sharingan Tomoe Ring (r = 132) */}
        <g
          style={{
            transformOrigin: '200px 200px',
            animation: shouldAnimate ? 'eye-spin 20s linear infinite reverse' : 'none',
          }}
        >
          {/* Tomoe Placements */}
          {[0, 60, 120, 180, 240, 300].map((ang) => {
            const rad = (ang * Math.PI) / 180;
            const tx = 200 + Math.cos(rad) * 132;
            const ty = 200 + Math.sin(rad) * 132;
            return (
              <use
                key={ang}
                href={`#mandala-tomoe-${rawId}`}
                x={tx}
                y={ty}
                transform={`rotate(${ang + 90}, ${tx}, ${ty}) scale(1.1)`}
              />
            );
          })}
        </g>

        {/* Layer 3: Inner Interlocking Mangekyo Blades (Forward Spin 14s) */}
        <g
          style={{
            transformOrigin: '200px 200px',
            animation: shouldAnimate ? 'eye-spin 14s linear infinite' : 'none',
          }}
        >
          {/* Shisui 4-Blade flared motif */}
          {[0, 90, 180, 270].map((ang) => (
            <path
              key={`shisui-${ang}`}
              d="M 200,200 C 206,170 220,135 255,105 C 235,125 228,160 224,190 Z"
              fill="#060608"
              transform={`rotate(${ang}, 200, 200)`}
            />
          ))}

          {/* Madara EMS Intersecting 3-blades */}
          {[45, 165, 285].map((ang) => (
            <g key={`ems-${ang}`} transform={`rotate(${ang}, 200, 200)`}>
              <path
                d="M 200,200 C 215,165 245,135 285,110 C 265,150 230,185 200,200 Z"
                fill="#07060a"
              />
              <circle cx="200" cy="120" r="12" fill="#060608" />
            </g>
          ))}

          {/* Central Ring */}
          <circle
            cx="200"
            cy="200"
            r="44"
            fill="none"
            stroke="#060608"
            strokeWidth="9"
          />

          {/* Center Master Core */}
          <circle cx="200" cy="200" r="22" fill="#08070d" stroke="#250207" strokeWidth="2" />
          <circle cx="200" cy="200" r="10" fill="#140103" />
          <circle cx="193" cy="192" r="4" fill="#ffffff" fillOpacity="0.4" />
        </g>

        {/* Outer Perimeter Frame */}
        <circle cx="200" cy="200" r="170" fill="none" stroke="#08070d" strokeWidth="4.5" />
      </svg>
    </div>
  );
};
