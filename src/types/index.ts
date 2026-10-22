export type ViewType =
  | 'landing'
  | 'shisui'
  | 'itachi'
  | 'madara'
  | 'nagato'
  | 'library'
  | 'settings'
  | 'eye-gallery';

export interface EyeProps {
  size?: number;
  pupilScale?: number;
  glowIntensity?: number;
  rotationSpeed?: number;
  isAwakened?: boolean;
  className?: string;
}

export interface SharinganProps extends EyeProps {
  tomoeCount?: 1 | 2 | 3;
}

export interface Settings {
  muted: boolean;
  volume: number; // 0.0 to 1.0, default 0.5
  visualIntensity: number; // 0.25 to 1.0, default 0.75
  reducedMotion: boolean;
  immersive: boolean;
}

export interface SettingsContextType {
  settings: Settings;
  updateSettings: (partial: Partial<Settings>) => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  setVisualIntensity: (intensity: number) => void;
  setReducedMotion: (reduced: boolean) => void;
  setImmersive: (immersive: boolean) => void;
  resetSettings: () => void;
}

export type CharacterId = 'shisui' | 'itachi' | 'madara' | 'nagato';

export interface CharacterGateway {
  id: CharacterId;
  name: string;
  kanji: string;
  clan: string;
  epithet: string;
  dojutsuName: string;
  dojutsuType: 'sharingan' | 'mangekyo' | 'eternal_mangekyo' | 'rinnegan';
  tagline: string;
  chakraColor: string;
  accentColor: string;
}

