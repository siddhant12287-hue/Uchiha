import React, { useState, useCallback, useEffect } from 'react';
import type { ViewType } from '../../types';
import { ITACHI_DATA } from '../../data/itachi';
import { Sharingan } from '../eyes/Sharingan';
import { ItachiMangekyo } from '../eyes/ItachiMangekyo';
import { RavenSwarm } from '../canvas/RavenSwarm';
import { EmberField } from '../canvas/EmberField';
import { FlameBurst, type IgnitionPoint } from '../canvas/FlameBurst';
import { SusanooRibcage } from './SusanooRibcage';
import { RealmLayout } from './RealmLayout';
import { AbilityPanel } from './AbilityPanel';
import { Button } from '../common/Button';
import { useRealmShortcuts } from '../../hooks/useRealmShortcuts';
import { audioEngine } from '../../utils/audioEngine';
import {
  Sparkles,
  Flame,
  Moon,
  Shield,
  Trash2,
  Clock,
  LogOut,
  Scroll,
  Info,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface ItachiRealmViewProps {
  onBack: () => void;
  onNavigate: (view: ViewType) => void;
}

export const ItachiRealmView: React.FC<ItachiRealmViewProps> = ({
  onBack,
  onNavigate: _onNavigate,
}) => {
  // Interaction States
  const [isAwakened, setIsAwakened] = useState<boolean>(true);
  const [isTransitioningEye, setIsTransitioningEye] = useState<boolean>(false);
  const [isTsukuyomiActive, setIsTsukuyomiActive] = useState<boolean>(false);
  const [isSusanooActive, setIsSusanooActive] = useState<boolean>(false);
  const [ignitionPoints, setIgnitionPoints] = useState<IgnitionPoint[]>([]);
  const [activeLoreTab, setActiveLoreTab] = useState<'abilities' | 'izanami' | 'artifacts' | 'massacre'>('abilities');

  // Tsukuyomi 72:00:00 Time Distortion Ticker
  const [tickerTime, setTickerTime] = useState<{ hours: number; mins: number; secs: number; ms: number }>({
    hours: 71,
    mins: 59,
    secs: 59,
    ms: 999,
  });

  useEffect(() => {
    if (!isTsukuyomiActive) return;

    const interval = setInterval(() => {
      setTickerTime((prev) => {
        let ms = prev.ms - Math.floor(10 + Math.random() * 35);
        let secs = prev.secs;
        let mins = prev.mins;
        let hours = prev.hours;

        if (ms < 0) {
          ms = 999;
          secs -= 1;
          if (secs < 0) {
            secs = 59;
            mins -= 1;
            if (mins < 0) {
              mins = 59;
              hours -= 1;
              if (hours < 0) {
                hours = 71;
              }
            }
          }
        }
        return { hours, mins, secs, ms };
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isTsukuyomiActive]);

  // Awaken Eye Toggle with 1.5s transition
  const handleToggleAwaken = useCallback(() => {
    audioEngine.playActivation();
    setIsTransitioningEye(true);
    setTimeout(() => {
      setIsAwakened((prev) => !prev);
      setIsTransitioningEye(false);
    }, 400);
  }, []);

  // Tsukuyomi Toggle
  const handleToggleTsukuyomi = useCallback(() => {
    if (isTsukuyomiActive) {
      audioEngine.playActivation();
      setIsTsukuyomiActive(false);
    } else {
      audioEngine.playTsukuyomi();
      setIsTsukuyomiActive(true);
    }
  }, [isTsukuyomiActive]);

  // Susanoo Toggle
  const handleToggleSusanoo = useCallback(() => {
    audioEngine.playActivation();
    setIsSusanooActive((prev) => !prev);
  }, []);

  // Clear Amaterasu Flames
  const handleClearFlames = useCallback(() => {
    audioEngine.playActivation();
    setIgnitionPoints([]);
  }, []);

  // Register Global Keyboard Shortcuts
  useRealmShortcuts({
    onBack: isTsukuyomiActive ? () => setIsTsukuyomiActive(false) : onBack,
    onToggleAwaken: handleToggleAwaken,
    onToggleTsukuyomi: handleToggleTsukuyomi,
    onToggleSusanoo: handleToggleSusanoo,
    onClearFlames: handleClearFlames,
  });

  // Canvas Click: Amaterasu Ignition
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If clicking on a button or interactive child, ignore
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('a')) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    audioEngine.playAmaterasu();
    setIgnitionPoints((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        x,
        y,
        createdAt: performance.now(),
      },
    ]);
  };

  // Sound trigger dispatcher for abilities
  const handleAbilitySound = (abilityId: string) => {
    if (abilityId === 'tsukuyomi') {
      audioEngine.playTsukuyomi();
    } else if (abilityId === 'amaterasu') {
      audioEngine.playAmaterasu();
    } else if (abilityId === 'susanoo' || abilityId === 'katon_goukakyuu') {
      audioEngine.playShinraTensei();
    } else {
      audioEngine.playActivation();
    }
  };

  return (
    <div
      className={cn(
        'relative min-h-[calc(100vh-4rem)] w-full transition-all duration-1000',
        isTsukuyomiActive
          ? 'bg-[#150003] contrast-125'
          : 'bg-[#060609]'
      )}
    >
      {/* Tsukuyomi Red Moon & Eerie Illusion Backdrop */}
      {isTsukuyomiActive && (
        <div className="fixed inset-0 pointer-events-none z-10 flex flex-col items-center justify-start overflow-hidden">
          {/* Blood-Red Moon */}
          <div className="relative mt-8 w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-b from-[#ff2424] via-[#cc0000] to-[#550000] shadow-[0_0_120px_rgba(255,0,0,0.85)] animate-pulse flex items-center justify-center border-4 border-red-500/40">
            {/* Moon craters and dark mariae */}
            <div className="absolute top-12 left-16 w-20 h-20 rounded-full bg-black/25 blur-xs" />
            <div className="absolute bottom-16 right-20 w-28 h-28 rounded-full bg-black/30 blur-xs" />
            <div className="absolute top-28 right-12 w-14 h-14 rounded-full bg-black/20 blur-xs" />
          </div>

          {/* Time Distortion HUD Ticker */}
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/90 border border-red-600/80 shadow-[0_0_25px_rgba(255,0,0,0.6)] backdrop-blur-md">
            <Clock className="w-5 h-5 text-red-500 animate-spin" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono tracking-widest text-red-400 font-bold uppercase">
                TSUKUYOMI TEMPORAL SOVEREIGNTY
              </span>
              <span className="font-mono text-xl md:text-2xl font-black text-red-100 tracking-wider">
                {String(tickerTime.hours).padStart(2, '0')}:
                {String(tickerTime.mins).padStart(2, '0')}:
                {String(tickerTime.secs).padStart(2, '0')}.
                <span className="text-red-400 text-sm">{String(tickerTime.ms).padStart(3, '0')}</span>
              </span>
            </div>
          </div>

          {/* Persistent Exit Tsukuyomi Button */}
          <div className="fixed bottom-8 z-40">
            <Button
              variant="crimson"
              size="lg"
              onClick={() => {
                audioEngine.playActivation();
                setIsTsukuyomiActive(false);
              }}
              icon={<LogOut className="w-5 h-5" />}
              className="shadow-[0_0_35px_rgba(255,0,0,0.8)]"
            >
              Dispelling Genjutsu: Exit Tsukuyomi [Esc]
            </Button>
          </div>
        </div>
      )}

      {/* Main Realm Layout Structure */}
      <RealmLayout
        characterName={ITACHI_DATA.name}
        kanji={ITACHI_DATA.kanji}
        epithet={ITACHI_DATA.epithet}
        themeColor={ITACHI_DATA.themeColor}
        onBack={onBack}
        onCanvasClick={handleCanvasClick}
        backgroundCanvas={
          <>
            {/* Crow Swarm that scatters from cursor */}
            <RavenSwarm scatterRadius={150} />
            {/* Black and crimson embers */}
            <EmberField intensity={0.9} />
            {/* Interactive Amaterasu Flame Burst System */}
            <FlameBurst ignitionPoints={ignitionPoints} />
          </>
        }
        centralEyeStage={
          <div className="relative flex items-center justify-center p-6">
            {/* Susanoo Skeletal Ribcage Aura */}
            {isSusanooActive && <SusanooRibcage size={380} />}

            {/* Eye Transition Stage */}
            <div
              className={cn(
                'relative z-20 cursor-pointer transition-all duration-500',
                isTransitioningEye && 'scale-90 opacity-60 blur-xs'
              )}
              onClick={handleToggleAwaken}
              title="Click or press [A] to toggle Sharingan / Mangekyo Awakening"
            >
              {isAwakened ? (
                <ItachiMangekyo
                  size={200}
                  rotationSpeed={isTsukuyomiActive ? 3.5 : 7}
                  glowIntensity={isSusanooActive ? 1.0 : 0.8}
                  isAwakened={isAwakened}
                />
              ) : (
                <Sharingan
                  size={200}
                  tomoeCount={3}
                  rotationSpeed={12}
                  glowIntensity={0.5}
                />
              )}
            </div>
          </div>
        }
        actionBar={
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl bg-[#0e0c18]/90 p-3 rounded-2xl border border-[#252035] backdrop-blur-md shadow-lg">
            {/* Awaken Toggle */}
            <Button
              size="sm"
              variant={isAwakened ? 'crimson' : 'outline'}
              onClick={handleToggleAwaken}
              icon={<Sparkles className="w-3.5 h-3.5" />}
            >
              {isAwakened ? 'Awakened: Mangekyo [A]' : 'Awaken Mangekyo [A]'}
            </Button>

            {/* Tsukuyomi Dimension */}
            <Button
              size="sm"
              variant={isTsukuyomiActive ? 'crimson' : 'outline'}
              onClick={handleToggleTsukuyomi}
              icon={<Moon className="w-3.5 h-3.5" />}
            >
              {isTsukuyomiActive ? 'Exit Tsukuyomi [T]' : 'Enter Tsukuyomi [T]'}
            </Button>

            {/* Susanoo Ribcage */}
            <Button
              size="sm"
              variant={isSusanooActive ? 'primary' : 'outline'}
              onClick={handleToggleSusanoo}
              icon={<Shield className="w-3.5 h-3.5" />}
            >
              {isSusanooActive ? 'Susanoo Deployed [S]' : 'Manifest Susanoo [S]'}
            </Button>

            {/* Clear Flames */}
            {ignitionPoints.length > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleClearFlames}
                icon={<Trash2 className="w-3.5 h-3.5 text-zinc-400" />}
              >
                Extinguish Amaterasu ({ignitionPoints.length}) [C]
              </Button>
            )}
          </div>
        }
      >
        {/* Interaction Hint Banner */}
        <div className="flex items-center justify-between p-3.5 px-5 rounded-xl bg-gradient-to-r from-red-950/30 via-[#140e1f] to-red-950/30 border border-red-900/30 text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-red-500 animate-pulse" />
            <span>
              <strong>Amaterasu Ignition: </strong> Click anywhere on the background stage to cast inextinguishable black flames at that coordinate.
            </span>
          </div>
          <span className="font-mono text-[11px] text-zinc-400 hidden sm:inline">
            Active Ignitions: {ignitionPoints.length}
          </span>
        </div>

        {/* Sacred Artifacts Section (Totsuka Blade & Yata Mirror) */}
        {isSusanooActive && ITACHI_DATA.artifacts && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#170e17] via-[#1a0f1c] to-[#170e17] border border-amber-600/40 flex flex-col gap-5 shadow-[0_0_30px_rgba(255,100,0,0.15)] animate-fade-in">
            <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white tracking-wide">
                  Susanoo Sacred Regalia: Totsuka Blade & Yata Mirror
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                MYTHICAL TREASURES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ITACHI_DATA.artifacts.map((artifact) => (
                <div
                  key={artifact.id}
                  className="p-4 rounded-xl bg-black/50 border border-amber-900/30 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-amber-300">{artifact.name}</h4>
                    <span className="text-xs font-serif text-zinc-400">{artifact.kanji}</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">{artifact.description}</p>
                  <div className="text-[11px] text-amber-400/80 font-mono mt-1">
                    Origin: {artifact.mythologicalOrigin}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clan Lore & Ability Navigation Tabs */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-[#231d33] pb-3 overflow-x-auto">
            <button
              type="button"
              onClick={() => {
                audioEngine.playActivation();
                setActiveLoreTab('abilities');
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
                activeLoreTab === 'abilities'
                  ? 'bg-red-950/80 text-red-200 border border-red-700/80 shadow-[0_0_12px_rgba(230,25,25,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              )}
            >
              <Flame className="w-4 h-4 text-red-400" />
              <span>Ocular Abilities ({ITACHI_DATA.abilities.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                audioEngine.playActivation();
                setActiveLoreTab('izanami');
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
                activeLoreTab === 'izanami'
                  ? 'bg-red-950/80 text-red-200 border border-red-700/80 shadow-[0_0_12px_rgba(230,25,25,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              )}
            >
              <Scroll className="w-4 h-4 text-purple-400" />
              <span>Izanami vs. Izanagi (Kinjutsu)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                audioEngine.playActivation();
                setActiveLoreTab('artifacts');
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
                activeLoreTab === 'artifacts'
                  ? 'bg-red-950/80 text-red-200 border border-red-700/80 shadow-[0_0_12px_rgba(230,25,25,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              )}
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Trinity of Heavenly Eyes</span>
            </button>

            <button
              type="button"
              onClick={() => {
                audioEngine.playActivation();
                setActiveLoreTab('massacre');
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
                activeLoreTab === 'massacre'
                  ? 'bg-red-950/80 text-red-200 border border-red-700/80 shadow-[0_0_12px_rgba(230,25,25,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              )}
            >
              <Info className="w-4 h-4 text-blue-400" />
              <span>The Truth of Midnight</span>
            </button>
          </div>

          {/* Tab 1: All Typed Abilities Grid */}
          {activeLoreTab === 'abilities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ITACHI_DATA.abilities.map((ability) => (
                <AbilityPanel
                  key={ability.id}
                  ability={ability}
                  isActive={
                    (ability.id === 'tsukuyomi' && isTsukuyomiActive) ||
                    (ability.id === 'susanoo' && isSusanooActive) ||
                    (ability.id === 'amaterasu' && ignitionPoints.length > 0)
                  }
                  onActivate={
                    ability.id === 'tsukuyomi'
                      ? handleToggleTsukuyomi
                      : ability.id === 'susanoo'
                      ? handleToggleSusanoo
                      : ability.id === 'amaterasu'
                      ? () => {
                          audioEngine.playAmaterasu();
                          setIgnitionPoints((prev) => [
                            ...prev,
                            { id: Date.now(), x: window.innerWidth * 0.5, y: 350, createdAt: performance.now() },
                          ]);
                        }
                      : undefined
                  }
                  onSoundTrigger={handleAbilitySound}
                />
              ))}
            </div>
          )}

          {/* Tab 2: Izanami vs. Izanagi Detailed Breakdown */}
          {activeLoreTab === 'izanami' && (
            <div className="p-8 rounded-2xl bg-[#0f0c19] border border-purple-900/40 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-purple-400 font-bold uppercase">
                  FORBIDDEN OCULAR DUALITY
                </span>
                <h3 className="text-xl font-bold text-white">
                  Izanami: The Eternal Loop of Self-Acceptance vs. Izanagi: The Reality-Warp
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Izanami Card */}
                <div className="p-5 rounded-xl bg-purple-950/20 border border-purple-800/50 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-purple-200">Izanami (イザナミ)</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/80 text-purple-300 font-bold">
                      Itachi Canon User
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Designed as a corrective measure to cure Uchiha members consumed by the hubris of Izanagi. It binds physical tactile sensations into an infinite loop within the target's psyche.
                  </p>
                  <div className="text-[11px] text-purple-300 font-medium bg-purple-950/40 p-2.5 rounded border border-purple-900/50">
                    <strong>Escape Condition: </strong> The target cannot escape through force or counter-genjutsu; they can only awaken by acknowledging their genuine nature and accepting their fate without deceit.
                  </div>
                </div>

                {/* Izanagi Card */}
                <div className="p-5 rounded-xl bg-zinc-950/70 border border-zinc-700/60 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-zinc-200">Izanagi (イザナギ)</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 font-bold border border-amber-800">
                      Not Exclusive to Itachi
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Derived from the Sage of Six Paths' "Creation of All Things" technique. Transforms fatal strikes, injury, or death into mere illusions while keeping beneficial outcomes real.
                  </p>
                  <div className="text-[11px] text-zinc-300 font-medium bg-zinc-900/60 p-2.5 rounded border border-zinc-800">
                    <strong>Canon Clarification: </strong> Itachi never used Izanagi in combat. It was historically abused by greedy clan members and notably wielded by Danzo Shimura and Obito Uchiha.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Trinity of Heavenly Eyes */}
          {activeLoreTab === 'artifacts' && (
            <div className="p-8 rounded-2xl bg-[#0f0c19] border border-amber-900/40 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                  SHINTO MYTHOLOGICAL FOUNDATION
                </span>
                <h3 className="text-xl font-bold text-white">
                  {ITACHI_DATA.loreSections[0].title}
                </h3>
                <p className="text-xs text-zinc-400">{ITACHI_DATA.loreSections[0].subtitle}</p>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {ITACHI_DATA.loreSections[0].content}
              </p>

              <div className="flex flex-col gap-2 pt-2 border-t border-zinc-800">
                <span className="text-xs font-bold text-amber-300">Canon Characteristics:</span>
                <ul className="list-disc pl-5 text-xs text-zinc-400 flex flex-col gap-1.5">
                  {ITACHI_DATA.loreSections[0].notableFacts.map((fact, idx) => (
                    <li key={idx}>{fact}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 4: Truth of the Massacre */}
          {activeLoreTab === 'massacre' && (
            <div className="p-8 rounded-2xl bg-[#0f0c19] border border-blue-900/40 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-blue-400 font-bold uppercase">
                  LEAF VILLAGE SECRET HISTORY
                </span>
                <h3 className="text-xl font-bold text-white">
                  {ITACHI_DATA.loreSections[2].title}
                </h3>
                <p className="text-xs text-zinc-400">{ITACHI_DATA.loreSections[2].subtitle}</p>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {ITACHI_DATA.loreSections[2].content}
              </p>

              <div className="flex flex-col gap-2 pt-2 border-t border-zinc-800">
                <span className="text-xs font-bold text-blue-300">Unbroken Vow:</span>
                <ul className="list-disc pl-5 text-xs text-zinc-400 flex flex-col gap-1.5">
                  {ITACHI_DATA.loreSections[2].notableFacts.map((fact, idx) => (
                    <li key={idx}>{fact}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </RealmLayout>
    </div>
  );
};
