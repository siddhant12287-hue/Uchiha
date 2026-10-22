import React from 'react';
import { useSettings } from '../../hooks/useSettings';
import { cn } from '../../utils/cn';

export interface LimboShadowsProps {
  active: boolean;
  className?: string;
}

export const LimboShadows: React.FC<LimboShadowsProps> = ({
  active,
  className = '',
}) => {
  const { settings } = useSettings();

  if (!active) return null;

  const offsets = [
    { x: -160, y: -40, opacity: 0.45, delay: '0s' },
    { x: 160, y: -40, opacity: 0.45, delay: '0.4s' },
    { x: -100, y: 120, opacity: 0.35, delay: '0.8s' },
    { x: 100, y: 120, opacity: 0.35, delay: '1.2s' },
  ];

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 flex items-center justify-center select-none',
        className
      )}
    >
      {offsets.map((off, idx) => (
        <div
          key={idx}
          style={{
            transform: `translate(${off.x}px, ${off.y}px)`,
            opacity: off.opacity,
          }}
          className={cn(
            'absolute transition-transform duration-700 flex flex-col items-center justify-center',
            !settings.reducedMotion && 'animate-pulse'
          )}
        >
          {/* Translucent Silhouette Ghost of Limbo Shadow */}
          <svg
            viewBox="0 0 120 120"
            width={120}
            height={120}
            className="overflow-visible"
          >
            <defs>
              <radialGradient id={`limbo-ghost-${idx}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#050510" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Glowing Ethereal Disc */}
            <circle cx="60" cy="60" r="45" fill={`url(#limbo-ghost-${idx})`} />

            {/* Concentric Rinnegan Ripple Lines in Limbo Dimension */}
            {[18, 30, 42].map((r) => (
              <circle
                key={r}
                cx="60"
                cy="60"
                r={r}
                fill="none"
                stroke="#60a5fa"
                strokeWidth="1.2"
                strokeOpacity="0.6"
              />
            ))}
            <circle cx="60" cy="60" r="8" fill="#1d4ed8" />
          </svg>

          <span className="text-[9px] font-mono tracking-widest text-blue-300 font-bold uppercase mt-1 px-1.5 py-0.5 rounded bg-blue-950/80 border border-blue-800/60">
            Limbo Shadow {idx + 1}
          </span>
        </div>
      ))}
    </div>
  );
};
