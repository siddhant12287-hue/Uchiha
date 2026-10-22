import React from 'react';
import { cn } from '../../utils/cn';

export interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  formatValue?: (val: number) => string;
  onChange: (val: number) => void;
  variant?: 'crimson' | 'purple';
  description?: string;
  className?: string;
  disabled?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 0.01,
  unit = '',
  formatValue,
  onChange,
  variant = 'crimson',
  description,
  className,
  disabled = false,
}) => {
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  const displayValue = formatValue ? formatValue(value) : `${Math.round(value * 100)}${unit}`;

  const trackGradient =
    variant === 'crimson'
      ? `linear-gradient(to right, #e61919 0%, #ff4d4d ${percentage}%, #271f2d ${percentage}%, #181520 100%)`
      : `linear-gradient(to right, #9333ea 0%, #c084fc ${percentage}%, #251f33 ${percentage}%, #161324 100%)`;

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      <div className="flex items-center justify-between text-xs tracking-wider">
        <label htmlFor={`slider-${label}`} className="font-semibold text-zinc-300">
          {label}
        </label>
        <span className="font-mono text-zinc-400 font-medium px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
          {displayValue}
        </span>
      </div>

      {description && <p className="text-[11px] text-zinc-500 leading-tight">{description}</p>}

      <div className="relative flex items-center h-6">
        <input
          id={`slider-${label}`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{ background: trackGradient }}
          className={cn(
            'w-full h-2 rounded-lg appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 disabled:opacity-40 disabled:cursor-not-allowed',
            variant === 'crimson' ? 'focus-visible:ring-red-500' : 'focus-visible:ring-purple-400',
            // Custom styling for webkit and moz slider thumb
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125',
            variant === 'crimson'
              ? '[&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:shadow-[0_0_8px_#ff2222]'
              : '[&::-webkit-slider-thumb]:bg-purple-400 [&::-webkit-slider-thumb]:shadow-[0_0_8px_#c084fc]',
            '[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full',
            variant === 'crimson'
              ? '[&::-moz-range-thumb]:bg-red-500 [&::-moz-range-thumb]:shadow-[0_0_8px_#ff2222]'
              : '[&::-moz-range-thumb]:bg-purple-400 [&::-moz-range-thumb]:shadow-[0_0_8px_#c084fc]'
          )}
        />
      </div>
    </div>
  );
};
