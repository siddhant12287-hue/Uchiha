import { useEffect, useRef } from 'react';
import { useSettings } from './useSettings';

interface AnimationLoopOptions {
  isPaused?: boolean;
}

let activeAnimationLoops = 0;

/** Returns the current number of active requestAnimationFrame canvas loops */
export function getActiveAnimationLoopCount(): number {
  return activeAnimationLoops;
}

export function useAnimationLoop(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  render: (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    deltaTime: number,
    timestamp: number
  ) => void,
  options: AnimationLoopOptions = {}
) {
  const { settings } = useSettings();
  const renderRef = useRef(render);
  const isPausedRef = useRef(options.isPaused ?? false);
  const reducedMotionRef = useRef(settings.reducedMotion);

  useEffect(() => {
    renderRef.current = render;
    isPausedRef.current = options.isPaused ?? false;
    reducedMotionRef.current = settings.reducedMotion;
  }, [render, options.isPaused, settings.reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number = 0;
    let lastTime: number = performance.now();
    let isTabVisible = document.visibilityState === 'visible';

    activeAnimationLoops++;
    if (import.meta.env.DEV) {
      console.log(`[AnimationLoop] Loop started. Active loops: ${activeAnimationLoops}`);
    }

    // Handle high DPI display (capped at 2 for performance budget)
    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const displayWidth = Math.floor(rect.width);
      const displayHeight = Math.floor(rect.height);

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(canvas);

    const onVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
      if (isTabVisible) {
        lastTime = performance.now();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const loop = (timestamp: number) => {
      animId = requestAnimationFrame(loop);

      if (!isTabVisible || isPausedRef.current) {
        lastTime = timestamp;
        return;
      }

      // Delta time in seconds, clamped to 0.1 to avoid quantum jumps on lag/tab focus
      const dt = Math.min((timestamp - lastTime) / 1000, 0.1);
      lastTime = timestamp;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      if (width <= 0 || height <= 0) return;

      ctx.save();
      ctx.scale(dpr, dpr);

      // Render the current frame
      renderRef.current(ctx, width, height, dt, timestamp);

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      activeAnimationLoops = Math.max(0, activeAnimationLoops - 1);
      if (import.meta.env.DEV) {
        console.log(`[AnimationLoop] Loop cleaned up. Active loops: ${activeAnimationLoops}`);
      }
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [canvasRef]);
}
