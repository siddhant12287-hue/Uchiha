import { useContext } from 'react';
import type { SettingsContextType } from '../types';
import { SettingsContext } from '../context/settingsInternal';

export const useSettings = (): SettingsContextType => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return ctx;
};
