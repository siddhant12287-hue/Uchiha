import React, { useId } from 'react';
import type { EyeProps } from '../../types';
import { useSettings } from '../../hooks/useSettings';
import { cn } from '../../utils/cn';

export const ItachiMangekyo: React.FC<EyeProps> = ({
  size = 200,
  pupilScale = 1.0,
  glowIntensity = 0.6,
  rotationSpeed = 8,
  isAwakened = false,
  className = '',
}) => {
  const { settings } = useSettings();
  const rawId = useId().replace(/:/g, '');
  const irisGradId = `itachi-iris-grad-${rawId}`;

  // pupilScale scales the pupil radius between 0.8x and 1.3x
  const clampedPupilScale = Math.max(0.8, Math.min(1.3, pupilScale ?? 1.0));
  const pupilRadius = 13 * clampedPupilScale;

  // rotationSpeed rotates the three blades and hub together as one group; isAwakened speeds it up
  const effectiveSpeed = isAwakened
    ? Math.min(rotationSpeed * 0.4, 2.5)
    : rotationSpeed;
  const shouldAnimate = !settings.reducedMotion && effectiveSpeed > 0;

  // Canonical scythe blade path at center (100, 100):
  // - Starts wide from the hub (radius 18 to 26)
  // - Outer edge: P0=(126, 100), P1=(137.5, 50), P2=(124, 20), P3=(100, 20)
  // - Tip at (100, 20) [exact radius 80]
  // - Inner edge (concave): Q0=(100, 20), Q1=(102, 47), Q2=(104, 68), Q3=(107.2, 75)
  // - Maximum width at ~40% of its length is exactly 26 units
  const bladePath = 'M 126,100 C 137.5,50 124,20 100,20 C 102,47 104,68 107.2,75 Z';

  // Three black curved scythe blades at exactly 120 degree spacing
  const bladeAngles = [0, 120, 240];

  return (
    <div
      style={{
        width: size,
        height: size,
        // glowIntensity controls only a soft outer drop-shadow
        filter:
          glowIntensity > 0
            ? `drop-shadow(0 0 ${glowIntensity * 18}px rgba(200, 0, 0, ${glowIntensity * 0.7}))`
            : 'none',
      }}
      className={cn('relative inline-flex items-center justify-center select-none', className)}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="w-full h-full overflow-visible"
        aria-label="Itachi Uchiha Mangekyo Sharingan"
      >
        <defs>
          {/* Red iris: radial gradient #c80000 near center, #a00000 at ~80%, #7a0000 at edge */}
          <radialGradient id={irisGradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c80000" />
            <stop offset="80%" stopColor="#a00000" />
            <stop offset="100%" stopColor="#7a0000" />
          </radialGradient>
        </defs>

        {/* Outer black ring: radius 100 down to 94 */}
        <circle cx="100" cy="100" r="100" fill="#000000" />

        {/* Red iris: radius 94 */}
        <circle cx="100" cy="100" r="94" fill={`url(#${irisGradId})`} />

        {/* Rotating group: three blades and hub together as one group */}
        <g
          style={{
            transformOrigin: '100px 100px',
            animation: shouldAnimate ? `eye-spin ${effectiveSpeed}s linear infinite` : 'none',
          }}
        >
          {/* Black hub ring: radius 18 to 26 (center r=22, strokeWidth=8) */}
          <circle
            cx="100"
            cy="100"
            r="22"
            fill="none"
            stroke="#000000"
            strokeWidth="8"
          />

          {/* Three black curved scythe blades at exactly 120-degree spacing */}
          {bladeAngles.map((angle) => (
            <path
              key={angle}
              d={bladePath}
              fill="#000000"
              transform={`rotate(${angle}, 100, 100)`}
            />
          ))}
        </g>

        {/* Thin red ring around pupil (radius 13 to 18) shows through between pupil and hub */}
        {/* Black pupil: radius 13 (scaled between 0.8x and 1.3x) */}
        <circle cx="100" cy="100" r={pupilRadius} fill="#000000" />
      </svg>
    </div>
  );
};
