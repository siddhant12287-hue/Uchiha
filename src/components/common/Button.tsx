import React from 'react';
import { cn } from '../../utils/cn';
import { audioEngine } from '../../utils/audioEngine';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'crimson' | 'purple' | 'ghost' | 'outline' | 'chakra';
  size?: 'sm' | 'md' | 'lg';
  soundEffect?: 'activation' | 'shinra' | 'none';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  soundEffect = 'activation',
  icon,
  className,
  onClick,
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      if (soundEffect === 'activation') {
        audioEngine.playActivation();
      } else if (soundEffect === 'shinra') {
        audioEngine.playShinraTensei();
      }
    }
    if (onClick) {
      onClick(e);
    }
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 cursor-pointer select-none rounded border disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-2.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-red-600 hover:bg-red-500 text-white border-red-500/80 shadow-[0_0_15px_rgba(230,25,25,0.4)] hover:shadow-[0_0_25px_rgba(230,25,25,0.7)] active:scale-[0.98]',
    crimson:
      'bg-[#8a0a14] hover:bg-[#b00f1c] text-red-50 border-red-600/60 shadow-[0_0_12px_rgba(180,15,25,0.35)] hover:shadow-[0_0_20px_rgba(230,25,25,0.6)] active:scale-[0.98]',
    purple:
      'bg-purple-900/60 hover:bg-purple-800/80 text-purple-100 border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.35)] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] active:scale-[0.98]',
    chakra:
      'bg-gradient-to-r from-red-950 via-zinc-900 to-red-950 hover:from-red-900 hover:to-red-900 text-red-200 border-red-800/50 hover:border-red-500 shadow-sm active:scale-[0.98]',
    ghost:
      'bg-transparent hover:bg-white/5 text-zinc-300 hover:text-white border-transparent hover:border-zinc-700 active:scale-[0.98]',
    outline:
      'bg-black/40 hover:bg-zinc-900/80 text-zinc-200 border-zinc-700/80 hover:border-red-500/60 hover:text-red-200 active:scale-[0.98]',
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
