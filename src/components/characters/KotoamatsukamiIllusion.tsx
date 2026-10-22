import React, { useEffect, useState } from 'react';
import { ShisuiMangekyo } from '../eyes/ShisuiMangekyo';
import { Button } from '../common/Button';
import { LogOut, EyeOff } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';
import { cn } from '../../utils/cn';

export interface KotoamatsukamiIllusionProps {
  isOpen: boolean;
  onExit: () => void;
}

const KotoamatsukamiModal: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { settings } = useSettings();
  const [distortionScale, setDistortionScale] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(3);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Eased animation of displacement scale up to 20
    const start = performance.now();
    let animId = 0;

    const animate = (time: number) => {
      const elapsed = (time - start) / 1000;
      if (settings.reducedMotion) {
        setDistortionScale(0);
      } else {
        // Eased wave scaling up to 20
        const scaleVal = Math.sin(Math.min(elapsed, 1.5) * (Math.PI / 1.5)) * 20;
        setDistortionScale(Math.max(0, scaleVal));
      }

      setSecondsRemaining(Math.max(0, Math.ceil(3 - elapsed)));

      if (elapsed < 3.2) {
        animId = requestAnimationFrame(animate);
      } else {
        // Safe auto-exit after 3s
        onExit();
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animId);
    };
  }, [onExit, settings.reducedMotion]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center p-6 select-none transition-all duration-700',
        settings.reducedMotion ? 'bg-black/90' : 'bg-[#030a08]/92 backdrop-blur-md'
      )}
      style={
        settings.reducedMotion
          ? undefined
          : {
              filter: `url(#koto-displacement) drop-shadow(0 0 40px rgba(16,185,129,0.35))`,
            }
      }
    >
      {/* SVG Filter Definition for Lens Distortion & Chromatic Aberration */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="koto-displacement" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={distortionScale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* Chromatic Aberration: R/B offset max 3px */}
            <feOffset in="displaced" dx="2.5" dy="0" result="offsetRed" />
            <feOffset in="displaced" dx="-2.5" dy="0" result="offsetBlue" />
            <feBlend in="offsetRed" in2="displaced" mode="screen" result="blend1" />
            <feBlend in="blend1" in2="offsetBlue" mode="screen" />
          </filter>
        </defs>
      </svg>

      {/* Floating Perception Alteration Aura */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18)_0%,rgba(185,28,28,0.12)_50%,transparent_75%)] animate-pulse" />

      {/* Header Info */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-3">
          <EyeOff className="w-3.5 h-3.5" />
          <span>Fictional Perception Override &bull; 别天神</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wider mb-2 font-serif">
          KOTOAMATSUKAMI
        </h2>
        <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed font-sans">
          The ultimate ocular genjutsu. Rewrites the victim&apos;s perception and intent
          without their conscious awareness. They believe their actions are entirely of their own free will.
        </p>
      </div>

      {/* Centerpiece Shisui Eye radiating ocular frequency */}
      <div className="relative z-10 flex flex-col items-center gap-4 my-2">
        <div className="relative w-48 h-48 sm:w-56 sm:h-56">
          <ShisuiMangekyo
            size={224}
            glowIntensity={0.9}
            rotationSpeed={4}
            isAwakened={true}
          />
          <div className="absolute inset-0 rounded-full border border-emerald-400/30 animate-ping pointer-events-none" />
        </div>
        <span className="text-xs font-mono text-emerald-400/70 tracking-widest">
          AUTO-DISSIPATING IN {secondsRemaining}s &bull; PRESS ESCAPE TO CANCEL
        </span>
      </div>

      {/* Manual Exit / Reversion Button */}
      <div className="relative z-10 mt-6">
        <Button
          variant="outline"
          size="md"
          onClick={onExit}
          className="border-emerald-500/60 text-emerald-300 hover:bg-emerald-950/60 shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Break Subtle Genjutsu (Esc)</span>
        </Button>
      </div>
    </div>
  );
};

export const KotoamatsukamiIllusion: React.FC<KotoamatsukamiIllusionProps> = ({
  isOpen,
  onExit,
}) => {
  if (!isOpen) return null;
  return <KotoamatsukamiModal onExit={onExit} />;
};
