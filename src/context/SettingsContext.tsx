import React, { useEffect, useState, useCallback } from 'react';
import type { Settings } from '../types';
import { audioEngine } from '../utils/audioEngine';
import { SettingsContext } from './settingsInternal';

const STORAGE_KEY = 'uchiha_realm_settings_v1';

const getInitialReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const DEFAULT_SETTINGS: Settings = {
  muted: false,
  volume: 0.5,
  visualIntensity: 0.75,
  reducedMotion: false,
  immersive: false,
};

const loadSavedSettings = (): Settings => {
  const initialMotion = getInitialReducedMotion();
  const fallback: Settings = {
    ...DEFAULT_SETTINGS,
    reducedMotion: initialMotion,
  };

  if (typeof window === 'undefined') return fallback;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      muted: typeof parsed.muted === 'boolean' ? parsed.muted : fallback.muted,
      volume: typeof parsed.volume === 'number' ? Math.max(0, Math.min(1, parsed.volume)) : fallback.volume,
      visualIntensity:
        typeof parsed.visualIntensity === 'number'
          ? Math.max(0.25, Math.min(1, parsed.visualIntensity))
          : fallback.visualIntensity,
      reducedMotion:
        typeof parsed.reducedMotion === 'boolean' ? parsed.reducedMotion : fallback.reducedMotion,
      immersive: typeof parsed.immersive === 'boolean' ? parsed.immersive : fallback.immersive,
    };
  } catch {
    return fallback;
  }
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(loadSavedSettings);

  // Sync with audio engine on changes
  useEffect(() => {
    audioEngine.setMuted(settings.muted);
    audioEngine.setVolume(settings.volume);
  }, [settings.muted, settings.volume]);

  // Persist to localStorage with try/catch
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Storage full or unavailable
    }
  }, [settings]);

  // System prefers-reduced-motion listener
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handler = (e: MediaQueryListEvent) => {
      setSettings((prev) => ({ ...prev, reducedMotion: e.matches }));
    };

    if (media.addEventListener) {
      media.addEventListener('change', handler);
      return () => media.removeEventListener('change', handler);
    }
  }, []);

  const updateSettings = useCallback((partial: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const toggleMute = useCallback(() => {
    setSettings((prev) => {
      const nextMuted = !prev.muted;
      audioEngine.setMuted(nextMuted);
      return { ...prev, muted: nextMuted };
    });
  }, []);

  const setVolume = useCallback((volume: number) => {
    const clamped = Math.max(0, Math.min(1, volume));
    audioEngine.setVolume(clamped);
    setSettings((prev) => ({ ...prev, volume: clamped }));
  }, []);

  const setVisualIntensity = useCallback((intensity: number) => {
    const clamped = Math.max(0.25, Math.min(1, intensity));
    setSettings((prev) => ({ ...prev, visualIntensity: clamped }));
  }, []);

  const setReducedMotion = useCallback((reduced: boolean) => {
    setSettings((prev) => ({ ...prev, reducedMotion: reduced }));
  }, []);

  const setImmersive = useCallback((immersive: boolean) => {
    setSettings((prev) => ({ ...prev, immersive }));
  }, []);

  const resetSettings = useCallback(() => {
    const initialMotion = getInitialReducedMotion();
    const defaults: Settings = {
      ...DEFAULT_SETTINGS,
      reducedMotion: initialMotion,
    };
    audioEngine.setMuted(defaults.muted);
    audioEngine.setVolume(defaults.volume);
    setSettings(defaults);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        toggleMute,
        setVolume,
        setVisualIntensity,
        setReducedMotion,
        setImmersive,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
