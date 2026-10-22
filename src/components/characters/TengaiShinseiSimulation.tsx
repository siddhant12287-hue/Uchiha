import React, { useEffect, useState, useRef } from 'react';
import { Button } from '../common/Button';
import { audioEngine } from '../../utils/audioEngine';
import { useSettings } from '../../hooks/useSettings';
import { RotateCcw, X, Mountain } from 'lucide-react';

export interface TengaiShinseiSimulationProps {
  isActive: boolean;
  onClose: () => void;
}

const TengaiShinseiModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { settings } = useSettings();
  const [phaseTime, setPhaseTime] = useState<number>(0);
  const [shakeOffset, setShakeOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [replayCount, setReplayCount] = useState<number>(0);

  const impact1Ref = useRef<boolean>(false);
  const impact2Ref = useRef<boolean>(false);
  const startTimeRef = useRef<number>(0);

  const handleReplay = () => {
    startTimeRef.current = performance.now();
    impact1Ref.current = false;
    impact2Ref.current = false;
    setPhaseTime(0);
    setShakeOffset({ x: 0, y: 0 });
    setReplayCount((c) => c + 1);
  };

  useEffect(() => {
    startTimeRef.current = performance.now();
    impact1Ref.current = false;
    impact2Ref.current = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    let animId = 0;

    const loop = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000;
      setPhaseTime(elapsed);

      // Impact 1 at 3.8s
      if (elapsed >= 3.8 && !impact1Ref.current) {
        impact1Ref.current = true;
        audioEngine.playShinraTensei();
      }

      // Impact 2 at 7.0s
      if (elapsed >= 7.0 && !impact2Ref.current) {
        impact2Ref.current = true;
        audioEngine.playShinraTensei();
      }

      // Camera shake capped
      if (!settings.reducedMotion) {
        let shake = 0;
        if (elapsed >= 3.8 && elapsed < 4.6) {
          const decay = 1 - (elapsed - 3.8) / 0.8;
          shake = Math.sin((elapsed - 3.8) * 45) * 8 * Math.max(0, decay);
        } else if (elapsed >= 7.0 && elapsed < 8.0) {
          const decay = 1 - (elapsed - 7.0) / 1.0;
          shake = Math.sin((elapsed - 7.0) * 50) * 11 * Math.max(0, decay);
        }
        setShakeOffset({
          x: (Math.random() - 0.5) * shake,
          y: (Math.random() - 0.5) * shake,
        });
      } else {
        setShakeOffset({ x: 0, y: 0 });
      }

      if (elapsed < 10.0) {
        animId = requestAnimationFrame(loop);
      }
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animId);
    };
  }, [onClose, settings.reducedMotion, replayCount]);

  // Meteor 1 Progress (descends from y: -160 to y: 260 between t=1.2s and t=3.8s)
  const m1Progress = Math.max(0, Math.min(1, (phaseTime - 1.2) / 2.6));
  const m1Y = -160 + m1Progress * 420;
  const m1X = 280 - m1Progress * 140;

  // Meteor 2 Progress (descends from y: -260 to y: 160 between t=4.5s and t=7.0s)
  const m2Progress = Math.max(0, Math.min(1, (phaseTime - 4.5) / 2.5));
  const m2Y = -260 + m2Progress * 420;
  const m2X = 320 - m2Progress * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-[#04020a]/94 select-none backdrop-blur-md overflow-hidden transition-all duration-300"
      style={{
        transform: `translate(${shakeOffset.x}px, ${shakeOffset.y}px)`,
      }}
    >
      {/* Top Bar: Title & Controls */}
      <div className="w-full max-w-4xl flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-950/80 border border-orange-500/40 text-orange-400">
            <Mountain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest">
                Cataclysmic Kinematics
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-700/50">
                T: {phaseTime.toFixed(1)}s
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-white font-serif tracking-wide">
              TENGAI SHINSEI &bull; 天碍震星
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReplay}
            className="text-zinc-300 hover:text-white hover:bg-zinc-800/60 flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Replay</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onClose}
            className="bg-red-900/80 hover:bg-red-800 text-white border border-red-500/50 flex items-center gap-1.5"
          >
            <X className="w-4 h-4" />
            <span>Cancel (Esc)</span>
          </Button>
        </div>
      </div>

      {/* Main Procedural Meteor Visual Canvas in SVG */}
      <div className="relative w-full max-w-3xl flex-1 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 600 600"
          className="w-full h-full max-h-[520px] overflow-visible"
        >
          <defs>
            {/* Fiery Trail Gradient */}
            <linearGradient id="meteor-trail" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff4500" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ff8c00" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
            </linearGradient>

            {/* Meteorite Rocky Shader */}
            <radialGradient id="meteor-rock" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ffaa00" />
              <stop offset="30%" stopColor="#e63900" />
              <stop offset="70%" stopColor="#3d1200" />
              <stop offset="100%" stopColor="#140600" />
            </radialGradient>
          </defs>

          {/* Stratospheric Cloud Layers */}
          <path
            d="M 20,120 Q 150,80 300,110 Q 450,140 580,100 L 580,20 L 20,20 Z"
            fill="#131024"
            fillOpacity="0.7"
          />
          <path
            d="M 40,160 Q 200,130 360,170 Q 480,150 560,180 L 560,20 L 40,20 Z"
            fill="#1c1636"
            fillOpacity="0.5"
          />

          {/* Meteor 1 */}
          {phaseTime >= 1.2 && (
            <g transform={`translate(${m1X}, ${m1Y})`}>
              {/* Fiery Atmospheric Reentry Tail */}
              <polygon
                points="-35,-80 0,-240 35,-80"
                fill="url(#meteor-trail)"
              />
              {/* Irregular Rocky Asteroid Body */}
              <path
                d="M -70,-20 Q -80,40 -20,70 Q 40,80 75,30 Q 80,-40 20,-75 Q -40,-80 -70,-20 Z"
                fill="url(#meteor-rock)"
                stroke="#ff6600"
                strokeWidth="2.5"
                filter="drop-shadow(0 0 20px #ff3300)"
              />
            </g>
          )}

          {/* Meteor 2 (Drops from above Meteor 1) */}
          {phaseTime >= 4.5 && (
            <g transform={`translate(${m2X}, ${m2Y})`}>
              {/* Even larger fiery tail */}
              <polygon
                points="-55,-100 0,-300 55,-100"
                fill="url(#meteor-trail)"
              />
              {/* Massive Second Asteroid */}
              <path
                d="M -95,-30 Q -110,60 -30,95 Q 60,110 105,40 Q 110,-55 30,-100 Q -55,-105 -95,-30 Z"
                fill="url(#meteor-rock)"
                stroke="#ff9900"
                strokeWidth="3.5"
                filter="drop-shadow(0 0 35px #ff5500)"
              />
            </g>
          )}

          {/* Ground Shockwave Aura */}
          {(phaseTime >= 3.8 || phaseTime >= 7.0) && (
            <ellipse
              cx="300"
              cy="520"
              rx={phaseTime >= 7.0 ? 240 : 180}
              ry="30"
              fill="none"
              stroke="#ff3300"
              strokeWidth="3"
              strokeOpacity={phaseTime >= 7.0 ? 0.8 : 0.6}
              className="animate-ping"
            />
          )}
        </svg>
      </div>

      {/* Bottom Canon Quote */}
      <div className="w-full max-w-xl text-center z-20">
        <p className="text-xs font-serif italic text-blue-200/90 leading-relaxed">
          {phaseTime < 4.5
            ? '"A meteor drawn from the void of heaven..."'
            : '"Now then... what will you do about the second one, Onoki?"'}
        </p>
        <span className="text-[10px] font-mono text-zinc-400 mt-1 block">
          Madara Uchiha — Battle of the Fourth Division
        </span>
      </div>
    </div>
  );
};

export const TengaiShinseiSimulation: React.FC<TengaiShinseiSimulationProps> = ({
  isActive,
  onClose,
}) => {
  if (!isActive) return null;
  return <TengaiShinseiModal onClose={onClose} />;
};
