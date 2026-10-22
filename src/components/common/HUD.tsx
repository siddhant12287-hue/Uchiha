import React from 'react';
import type { ViewType } from '../../types';
import { useSettings } from '../../hooks/useSettings';
import {
  Volume2,
  VolumeX,
  Eye,
  BookOpen,
  Settings as SettingsIcon,
  Home,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { audioEngine } from '../../utils/audioEngine';

export interface HUDProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onOpenSettingsModal: () => void;
  isHudVisible?: boolean;
  onToggleImmersive?: () => void;
  onExitImmersive?: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  currentView,
  onNavigate,
  onOpenSettingsModal,
  isHudVisible = true,
  onToggleImmersive,
  onExitImmersive,
}) => {
  const { settings, toggleMute, setVolume } = useSettings();

  const handleNav = (view: ViewType) => {
    audioEngine.playActivation();
    onNavigate(view);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 h-16 transition-all duration-500 select-none border-b',
          settings.immersive
            ? 'bg-black/50 border-transparent backdrop-blur-sm'
            : 'bg-[#08070d]/92 border-[#201c2d] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)]',
          settings.immersive && !isHudVisible
            ? '-translate-y-full opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100 pointer-events-auto'
        )}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Left: Brand Identity */}
          <button
            type="button"
            onClick={() => handleNav('landing')}
            className="flex items-center gap-3 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded p-1 cursor-pointer"
            aria-label="Return to Uchiha Realm Gateways"
          >
            {/* Uchiha clan crest mini fan icon */}
            <div className="w-8 h-8 rounded-full bg-[#161220] border border-red-700/60 flex items-center justify-center shadow-[0_0_10px_rgba(230,25,25,0.4)] group-hover:shadow-[0_0_18px_rgba(230,25,25,0.8)] transition-all">
              <svg viewBox="0 0 40 40" className="w-5 h-5" aria-hidden="true">
                <path d="M 20 4 A 16 16 0 0 1 36 20 L 4 20 A 16 16 0 0 1 20 4 Z" fill="#e61919" />
                <path d="M 4 20 L 36 20 A 16 16 0 0 1 20 36 L 20 20 Z" fill="#ffffff" />
                <path d="M 20 20 L 4 20 A 16 16 0 0 0 20 36 L 20 20 Z" fill="#ffffff" />
                <rect x="18.5" y="26" width="3" height="12" fill="#ffffff" rx="1" />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-widest text-sm text-zinc-100 group-hover:text-red-400 transition-colors">
                  UCHIHA REALM
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-950/80 text-red-300 border border-red-800/60 font-mono font-semibold">
                  CANON
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-zinc-400 group-hover:text-zinc-300 font-sans">
                宇智波一族 · SACRED OCULAR COMPENDIUM
              </span>
            </div>
          </button>

          {/* Center: Navigation Links */}
          <nav className="flex items-center gap-1 md:gap-2">
            <button
              type="button"
              onClick={() => handleNav('landing')}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer',
                currentView === 'landing'
                  ? 'bg-red-950/70 text-red-300 border border-red-800/60 shadow-[0_0_10px_rgba(230,25,25,0.3)]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              )}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Gateways</span>
            </button>

            <button
              type="button"
              onClick={() => handleNav('eye-gallery')}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer',
                currentView === 'eye-gallery'
                  ? 'bg-red-950/70 text-red-300 border border-red-800/60 shadow-[0_0_10px_rgba(230,25,25,0.3)]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Eye Gallery</span>
            </button>

            <button
              type="button"
              onClick={() => handleNav('library')}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer',
                currentView === 'library'
                  ? 'bg-red-950/70 text-red-300 border border-red-800/60 shadow-[0_0_10px_rgba(230,25,25,0.3)]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              )}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Codex</span>
            </button>
          </nav>

          {/* Right: Audio Quick Controls, Cinematic Toggle, & Settings */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Quick Mute & Mini Volume */}
            <div className="flex items-center gap-2 bg-[#12101c] px-2.5 py-1 rounded-lg border border-[#231d32]">
              <button
                type="button"
                onClick={toggleMute}
                className="p-1 rounded text-zinc-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer"
                aria-label={settings.muted ? 'Unmute procedural audio' : 'Mute procedural audio'}
              >
                {settings.muted ? (
                  <VolumeX className="w-4 h-4 text-zinc-500" />
                ) : (
                  <Volume2 className="w-4 h-4 text-red-400 animate-pulse" />
                )}
              </button>

              <div className="w-16 hidden sm:flex items-center">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={settings.volume}
                  disabled={settings.muted}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  aria-label="Master audio synthesizer volume"
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500 disabled:opacity-30"
                />
              </div>
              <span className="text-[10px] font-mono text-zinc-400 w-7 text-right">
                {settings.muted ? '0%' : `${Math.round(settings.volume * 100)}%`}
              </span>
            </div>

            {/* Cinematic / Immersive Mode Button */}
            {onToggleImmersive && (
              <button
                type="button"
                onClick={onToggleImmersive}
                className={cn(
                  'p-2 rounded-lg text-zinc-300 hover:text-white bg-[#12101c] hover:bg-[#1a1729] border border-[#231d32] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer',
                  settings.immersive && 'border-purple-500 text-purple-300 bg-purple-950/40 shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                )}
                aria-label={settings.immersive ? 'Exit Cinematic Mode (Esc)' : 'Enter Cinematic Mode'}
                title={settings.immersive ? 'Exit Cinematic Mode (Esc)' : 'Enter Fullscreen Cinematic Mode'}
              >
                {settings.immersive ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            )}

            {/* Settings Modal Trigger */}
            <button
              type="button"
              onClick={() => {
                audioEngine.playActivation();
                onOpenSettingsModal();
              }}
              className={cn(
                'p-2 rounded-lg text-zinc-300 hover:text-white bg-[#12101c] hover:bg-[#1a1729] border border-[#231d32] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer',
                currentView === 'settings' && 'border-red-600 text-red-400'
              )}
              aria-label="Open system settings panel"
              title="Preferences & Audio Synthesis"
            >
              <SettingsIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Exit Pill when HUD is auto-hidden in Cinematic Mode */}
      {settings.immersive && !isHudVisible && onExitImmersive && (
        <button
          type="button"
          onClick={onExitImmersive}
          className="fixed top-4 right-5 z-50 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/95 border border-purple-500/60 text-purple-200 hover:text-white text-xs font-mono flex items-center gap-1.5 shadow-[0_0_20px_rgba(168,85,247,0.3)] backdrop-blur-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          aria-label="Exit Cinematic Mode (Escape)"
        >
          <Minimize2 className="w-3.5 h-3.5 text-purple-400" />
          <span>Exit Cinematic (Esc)</span>
        </button>
      )}
    </>
  );
};
