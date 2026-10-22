import { useState, useEffect, useRef, useCallback } from 'react';
import { useSettings } from './useSettings';

export interface UseImmersiveModeResult {
  isImmersive: boolean;
  isHudVisible: boolean;
  toastMessage: string | null;
  enterImmersive: () => Promise<void>;
  exitImmersive: () => Promise<void>;
  toggleImmersive: () => Promise<void>;
}

export function useImmersiveMode(): UseImmersiveModeResult {
  const { settings, setImmersive } = useSettings();
  const [isHudVisible, setIsHudVisible] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  const enterImmersive = useCallback(async () => {
    setImmersive(true);
    setIsHudVisible(true);

    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        showToast('Cinematic Mode active • Move mouse to reveal HUD • Esc to exit');
      } else {
        showToast('Cinematic HUD Mode enabled (Fullscreen unsupported)');
      }
    } catch {
      showToast('Cinematic HUD Mode enabled (Fullscreen restricted by browser)');
    }
  }, [setImmersive, showToast]);

  const exitImmersive = useCallback(async () => {
    setImmersive(false);
    setIsHudVisible(true);

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      // Ignored
    }
    showToast('Restored standard navigation');
  }, [setImmersive, showToast]);

  const toggleImmersive = useCallback(async () => {
    if (settings.immersive) {
      await exitImmersive();
    } else {
      await enterImmersive();
    }
  }, [settings.immersive, enterImmersive, exitImmersive]);

  // Sync state if user exits fullscreen via the browser's own Escape
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && settings.immersive) {
        setImmersive(false);
        setIsHudVisible(true);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [settings.immersive, setImmersive]);

  // Auto-hide HUD after 3s of no mouse movement (reappears on movement)
  useEffect(() => {
    if (!settings.immersive) return;

    const resetTimer = () => {
      setIsHudVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsHudVisible(false);
      }, 3000);
    };

    const timer = setTimeout(() => {
      setIsHudVisible(false);
    }, 3000);

    window.addEventListener('pointermove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    return () => {
      clearTimeout(timer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener('pointermove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [settings.immersive]);

  // Escape key shortcut to exit immersive mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && settings.immersive) {
        void exitImmersive();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [settings.immersive, exitImmersive]);

  // Cleanup toasts on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    isImmersive: settings.immersive,
    isHudVisible: !settings.immersive || isHudVisible,
    toastMessage,
    enterImmersive,
    exitImmersive,
    toggleImmersive,
  };
}
