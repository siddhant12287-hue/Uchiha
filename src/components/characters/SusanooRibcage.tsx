import React, { useId } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { cn } from '../../utils/cn';

export interface SusanooRibcageProps {
  size?: number;
  className?: string;
}

export const SusanooRibcage: React.FC<SusanooRibcageProps> = ({
  size = 360,
  className = '',
}) => {
  const { settings } = useSettings();
  const rawId = useId().replace(/:/g, '');
  const filterId = `susanoo-glow-${rawId}`;
  const gradId = `susanoo-aura-${rawId}`;

  const shouldAnimate = !settings.reducedMotion;

  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        'pointer-events-none absolute inset-0 m-auto flex items-center justify-center select-none transition-all duration-700',
        className
      )}
    >
      <svg
        viewBox="0 0 400 400"
        width={size}
        height={size}
        className={cn(
          'w-full h-full overflow-visible',
          shouldAnimate && 'animate-eye-pulse'
        )}
      >
        <defs>
          {/* Blazing Red / Amber Chakra Gradient */}
          <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff7700" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#e61919" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#990000" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#4a0000" stopOpacity="0.7" />
          </linearGradient>

          {/* Ethereal Chakra Flame Glow */}
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feComponentTransfer in="blur" result="glow">
              <feFuncA type="linear" slope="1.8" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Outer Chakra Flame Halo */}
        <circle
          cx="200"
          cy="200"
          r="170"
          fill="none"
          stroke="#e61919"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          strokeOpacity="0.35"
        />

        {/* Skeletal Spine & Vertebrae */}
        <g filter={`url(#${filterId})`}>
          {/* Central Dorsal Spine Column */}
          <path
            d="M 194,50 Q 200,45 206,50 L 208,350 Q 200,355 192,350 Z"
            fill={`url(#${gradId})`}
          />
          {/* Vertebral Nodes */}
          {[90, 140, 190, 240, 290].map((y) => (
            <ellipse
              key={y}
              cx="200"
              cy={y}
              rx="14"
              ry="8"
              fill="#ff4d00"
              stroke="#ffcc00"
              strokeWidth="1.5"
            />
          ))}

          {/* Left Rib 1 (Top) */}
          <path
            d="M 192,90 C 140,80 90,110 70,150 C 65,160 80,165 88,155 C 105,125 150,105 192,100 Z"
            fill={`url(#${gradId})`}
            stroke="#ffcc00"
            strokeWidth="1.2"
          />
          {/* Right Rib 1 (Top) */}
          <path
            d="M 208,90 C 260,80 310,110 330,150 C 335,160 320,165 312,155 C 295,125 250,105 208,100 Z"
            fill={`url(#${gradId})`}
            stroke="#ffcc00"
            strokeWidth="1.2"
          />

          {/* Left Rib 2 (Upper Middle) */}
          <path
            d="M 192,140 C 120,135 65,170 50,215 C 45,225 60,230 70,220 C 85,185 135,155 192,150 Z"
            fill={`url(#${gradId})`}
            stroke="#ffcc00"
            strokeWidth="1.2"
          />
          {/* Right Rib 2 (Upper Middle) */}
          <path
            d="M 208,140 C 280,135 335,170 350,215 C 355,225 340,230 330,220 C 315,185 265,155 208,150 Z"
            fill={`url(#${gradId})`}
            stroke="#ffcc00"
            strokeWidth="1.2"
          />

          {/* Left Rib 3 (Lower Middle) */}
          <path
            d="M 192,190 C 125,190 75,225 60,270 C 55,280 70,285 80,275 C 95,240 140,210 192,200 Z"
            fill={`url(#${gradId})`}
            stroke="#ffcc00"
            strokeWidth="1.2"
          />
          {/* Right Rib 3 (Lower Middle) */}
          <path
            d="M 208,190 C 275,190 325,225 340,270 C 345,280 330,285 320,275 C 305,240 260,210 208,200 Z"
            fill={`url(#${gradId})`}
            stroke="#ffcc00"
            strokeWidth="1.2"
          />

          {/* Left Rib 4 (Bottom Base) */}
          <path
            d="M 192,240 C 140,245 95,280 85,320 C 80,330 95,335 102,325 C 115,295 155,265 192,250 Z"
            fill={`url(#${gradId})`}
            stroke="#ffcc00"
            strokeWidth="1.2"
          />
          {/* Right Rib 4 (Bottom Base) */}
          <path
            d="M 208,240 C 260,245 305,280 315,320 C 320,330 305,335 298,325 C 285,295 245,265 208,250 Z"
            fill={`url(#${gradId})`}
            stroke="#ffcc00"
            strokeWidth="1.2"
          />
        </g>
      </svg>
    </div>
  );
};
