import { useEffect } from 'react';

export interface RealmShortcutHandlers {
  onBack?: () => void;
  onToggleAwaken?: () => void;
  onToggleTsukuyomi?: () => void;
  onToggleSusanoo?: () => void;
  onClearFlames?: () => void;
}

export function useRealmShortcuts({
  onBack,
  onToggleAwaken,
  onToggleTsukuyomi,
  onToggleSusanoo,
  onClearFlames,
}: RealmShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or slider
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === 'Escape') {
        if (onBack) {
          e.preventDefault();
          onBack();
        }
      } else if (e.code === 'KeyA') {
        if (onToggleAwaken) {
          e.preventDefault();
          onToggleAwaken();
        }
      } else if (e.code === 'KeyT') {
        if (onToggleTsukuyomi) {
          e.preventDefault();
          onToggleTsukuyomi();
        }
      } else if (e.code === 'KeyS') {
        if (onToggleSusanoo) {
          e.preventDefault();
          onToggleSusanoo();
        }
      } else if (e.code === 'KeyC') {
        if (onClearFlames) {
          e.preventDefault();
          onClearFlames();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack, onToggleAwaken, onToggleTsukuyomi, onToggleSusanoo, onClearFlames]);
}
