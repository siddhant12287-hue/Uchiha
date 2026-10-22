import React from 'react';
import { cn } from '../../utils/cn';
import { audioEngine } from '../../utils/audioEngine';

export interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  variant?: 'crimson' | 'purple';
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  checked,
  onChange,
  description,
  variant = 'crimson',
  disabled = false,
  className,
}) => {
  const handleToggle = () => {
    if (disabled) return;
    audioEngine.playActivation();
    onChange(!checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className={cn('flex items-center justify-between gap-4 py-1.5', className)}>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-zinc-200 select-none">{label}</span>
        {description && (
          <span className="text-xs text-zinc-400 select-none leading-relaxed">
            {description}
          </span>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-40 disabled:cursor-not-allowed',
          checked
            ? variant === 'crimson'
              ? 'bg-red-600 shadow-[0_0_12px_rgba(230,25,25,0.6)] focus-visible:ring-red-500'
              : 'bg-purple-600 shadow-[0_0_12px_rgba(168,85,247,0.6)] focus-visible:ring-purple-500'
            : 'bg-zinc-800'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  );
};
