import React, { useEffect, useState } from 'react';
import type { ViewType } from '../../types';
import { NAGATO_DATA } from '../../data/nagato';
import { RealmLayout } from './RealmLayout';
import { AbilityPanel } from './AbilityPanel';
import { SixPathsMatrix } from './SixPathsMatrix';
import { PainCanvas } from '../canvas/PainCanvas';
import { Rinnegan } from '../eyes/Rinnegan';
import { Button } from '../common/Button';
import { audioEngine } from '../../utils/audioEngine';
import { useRealmShortcuts } from '../../hooks/useRealmShortcuts';
import { cn } from '../../utils/cn';
import {
  Orbit,
  Wind,
  Moon,
  Sparkles,
  Shield,
  Layers,
  BookOpen,
  Eye,
  AlertCircle,
} from 'lucide-react';

export interface NagatoRealmViewProps {
  onBack: () => void;
  onNavigate: (view: ViewType) => void;
}

type ActiveLoreTab = 'abilities' | 'six_paths' | 'amegakure' | 'stolen_eyes';

export const NagatoRealmView: React.FC<NagatoRealmViewProps> = ({
  onBack,
  onNavigate,
}) => {
  // Gravitational interaction state
  const [isChibakuActive, setIsChibakuActive] = useState<boolean>(false);
  const [shinraSignal, setShinraSignal] = useState<number>(0);
  const [banshoTarget, setBanshoTarget] = useState<{ x: number; y: number } | null>(null);
  const [shinraCooldown, setShinraCooldown] = useState<number>(0);
  const [activeLoreTab, setActiveLoreTab] = useState<ActiveLoreTab>('abilities');
  const [isEyeAwakened, setIsEyeAwakened] = useState<boolean>(true);

  // Stop Chibaku sound on component unmount
  useEffect(() => {
    return () => {
      audioEngine.stopChibakuTensei();
    };
  }, []);

  // Shinra Tensei 5-second canon cooldown countdown
  useEffect(() => {
    if (shinraCooldown <= 0) return;
    const timer = setInterval(() => {
      setShinraCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [shinraCooldown]);

  // Trigger Shinra Tensei
  const handleTriggerShinra = () => {
    if (shinraCooldown > 0) return;
    audioEngine.playShinraTensei();
    setShinraSignal((s) => s + 1);
    setShinraCooldown(5); // Canon 5s cooldown
  };

  // Toggle Chibaku Tensei
  const handleToggleChibaku = () => {
    if (isChibakuActive) {
      audioEngine.stopChibakuTensei();
      setIsChibakuActive(false);
    } else {
      audioEngine.startChibakuTensei();
      setIsChibakuActive(true);
    }
  };

  // Trigger Bansho Tenin manually at center
  const handleTriggerBansho = () => {
    audioEngine.playActivation();
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    setBanshoTarget({ x: cx, y: cy });
    setTimeout(() => setBanshoTarget(null), 1600);
  };

  // Safe navigation back
  const handleSafeBack = () => {
    if (isChibakuActive) {
      audioEngine.stopChibakuTensei();
      setIsChibakuActive(false);
    }
    audioEngine.playActivation();
    onBack();
  };

  // Realm Keyboard Shortcuts
  useRealmShortcuts({
    onBack: handleSafeBack,
    onToggleAwaken: () => {
      audioEngine.playActivation();
      setIsEyeAwakened((prev) => !prev);
    },
    onToggleTsukuyomi: handleTriggerShinra, // [T] triggers Shinra Tensei
    onToggleSusanoo: handleToggleChibaku, // [S] toggles Chibaku Tensei
  });

  // Sound dispatcher for ability cards
  const handleAbilitySound = (abilityId: string) => {
    if (abilityId === 'shinra_tensei') {
      handleTriggerShinra();
    } else if (abilityId === 'chibaku_tensei') {
      handleToggleChibaku();
    } else if (abilityId === 'bansho_tenin') {
      handleTriggerBansho();
    } else {
      audioEngine.playActivation();
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full bg-[#08070e] transition-colors duration-700">
      <RealmLayout
        characterName={NAGATO_DATA.name}
        kanji={NAGATO_DATA.kanji}
        epithet={NAGATO_DATA.epithet}
        themeColor={NAGATO_DATA.themeColor}
        onBack={handleSafeBack}
        backgroundCanvas={
          <PainCanvas
            isChibakuActive={isChibakuActive}
            triggerShinraSignal={shinraSignal}
            banshoTargetPoint={banshoTarget}
            onCanvasClick={() => {
              // Canvas click automatically triggers Bansho Ten'in attraction vortex
            }}
          />
        }
        centralEyeStage={
          <div className="relative flex flex-col items-center justify-center p-4">
            {/* Concentric gravitational ripple aura around Rinnegan */}
            <div className="relative flex items-center justify-center">
              <div
                className={cn(
                  'absolute -inset-6 rounded-full border border-purple-500/20 transition-all duration-1000',
                  isChibakuActive ? 'animate-spin scale-125 border-purple-400/50' : 'animate-pulse'
                )}
              />
              <div
                className={cn(
                  'absolute -inset-14 rounded-full border border-violet-400/15 pointer-events-none transition-all duration-1000',
                  isChibakuActive && 'scale-110 border-violet-300/30'
                )}
              />

              <div
                onClick={() => {
                  audioEngine.playActivation();
                  setIsEyeAwakened((prev) => !prev);
                }}
                className="cursor-pointer transition-transform duration-500 hover:scale-105"
                title="Click to resonate Rinnegan ocular frequency"
              >
                <Rinnegan
                  size={220}
                  isAwakened={isEyeAwakened}
                  glowIntensity={isChibakuActive ? 1.0 : 0.85}
                />
              </div>
            </div>

            {/* Hint subtitle */}
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
              <span>
                {isChibakuActive
                  ? 'CHIBAKU TENSEI SINGULARITY ACTIVE — ABSORBING DEBRIS'
                  : 'CLICK ANYWHERE ON CANVAS FOR BANSHO TEN\'IN'}
              </span>
            </div>
          </div>
        }
        actionBar={
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Shinra Tensei Button with Canon 5s cooldown */}
            <Button
              variant="purple"
              size="sm"
              disabled={shinraCooldown > 0}
              onClick={handleTriggerShinra}
              className={cn(
                'flex items-center gap-2 border-purple-500/50',
                shinraCooldown > 0
                  ? 'opacity-60 cursor-not-allowed'
                  : 'shadow-[0_0_20px_rgba(168,85,247,0.35)]'
              )}
            >
              <Wind className="w-4 h-4 text-purple-300" />
              <span>
                {shinraCooldown > 0
                  ? `Shinra Recharge (${shinraCooldown}s)`
                  : 'Shinra Tensei (T)'}
              </span>
            </Button>

            {/* Chibaku Tensei Toggle Button */}
            <Button
              variant={isChibakuActive ? 'crimson' : 'outline'}
              size="sm"
              onClick={handleToggleChibaku}
              className={cn(
                'flex items-center gap-2',
                isChibakuActive
                  ? 'border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.4)]'
                  : 'border-purple-600/60 text-purple-200 hover:bg-purple-950/40'
              )}
            >
              <Moon className="w-4 h-4 text-purple-300" />
              <span>
                {isChibakuActive ? 'Halt Chibaku Singularity' : 'Chibaku Tensei (S)'}
              </span>
            </Button>

            {/* Bansho Tenin Quick Pull */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleTriggerBansho}
              className="border-purple-600/40 text-zinc-300 hover:text-white hover:bg-purple-950/30 flex items-center gap-2"
            >
              <Orbit className="w-4 h-4 text-purple-400" />
              <span>Bansho Ten&apos;in Pull</span>
            </Button>

            {/* Eye Gallery Link */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (isChibakuActive) {
                  audioEngine.stopChibakuTensei();
                }
                audioEngine.playActivation();
                onNavigate('eye-gallery');
              }}
              className="text-zinc-400 hover:text-white flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Eye Gallery</span>
            </Button>
          </div>
        }
      >
        {/* Quote Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/50 via-[#100a20]/70 to-purple-950/40 border border-purple-800/40 flex flex-col gap-2">
          <p className="text-sm md:text-base font-serif italic text-purple-200/95 leading-relaxed">
            &ldquo;{NAGATO_DATA.backgroundQuote}&rdquo;
          </p>
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mt-1">
            <span>— {NAGATO_DATA.quoteAuthor}</span>
            <span className="text-[11px] text-purple-400/80">
              {NAGATO_DATA.quoteContext}
            </span>
          </div>
        </div>

        {/* Nagato Navigation Tabs */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-purple-950/80 pb-3 overflow-x-auto">
            <button
              type="button"
              onClick={() => {
                audioEngine.playActivation();
                setActiveLoreTab('abilities');
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
                activeLoreTab === 'abilities'
                  ? 'bg-purple-950/90 text-purple-200 border border-purple-700/80 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              )}
            >
              <Shield className="w-4 h-4 text-purple-400" />
              <span>Divine Abilities ({NAGATO_DATA.abilities.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                audioEngine.playActivation();
                setActiveLoreTab('six_paths');
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
                activeLoreTab === 'six_paths'
                  ? 'bg-purple-950/90 text-purple-200 border border-purple-700/80 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              )}
            >
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Six Paths Matrix &amp; Outer Path</span>
            </button>

            <button
              type="button"
              onClick={() => {
                audioEngine.playActivation();
                setActiveLoreTab('amegakure');
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
                activeLoreTab === 'amegakure'
                  ? 'bg-purple-950/90 text-purple-200 border border-purple-700/80 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              )}
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Tears of Amegakure</span>
            </button>

            <button
              type="button"
              onClick={() => {
                audioEngine.playActivation();
                setActiveLoreTab('stolen_eyes');
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
                activeLoreTab === 'stolen_eyes'
                  ? 'bg-purple-950/90 text-purple-200 border border-purple-700/80 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              )}
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Madara&apos;s Stolen Eyes</span>
            </button>
          </div>

          {/* Tab 1: Abilities Grid */}
          {activeLoreTab === 'abilities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {NAGATO_DATA.abilities.map((ability) => (
                <AbilityPanel
                  key={ability.id}
                  ability={ability}
                  isActive={
                    (ability.id === 'shinra_tensei' && shinraCooldown > 0) ||
                    (ability.id === 'chibaku_tensei' && isChibakuActive)
                  }
                  onActivate={
                    ability.id === 'shinra_tensei'
                      ? handleTriggerShinra
                      : ability.id === 'chibaku_tensei'
                      ? handleToggleChibaku
                      : ability.id === 'bansho_tenin'
                      ? handleTriggerBansho
                      : undefined
                  }
                  onSoundTrigger={handleAbilitySound}
                />
              ))}
            </div>
          )}

          {/* Tab 2: Six Paths Matrix & Outer Path */}
          {activeLoreTab === 'six_paths' && <SixPathsMatrix />}

          {/* Tab 3: Tears of Amegakure */}
          {activeLoreTab === 'amegakure' && (
            <div className="p-8 rounded-2xl bg-[#0b0918] border border-purple-900/40 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-purple-400 font-bold uppercase">
                  {NAGATO_DATA.loreSections[0].badge}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {NAGATO_DATA.loreSections[0].title}
                </h3>
                <p className="text-xs text-purple-300/80">
                  {NAGATO_DATA.loreSections[0].subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {NAGATO_DATA.loreSections[0].content}
              </p>

              <div className="flex flex-col gap-2 pt-2 border-t border-purple-950">
                <span className="text-xs font-bold text-purple-300">
                  Crucial Canon Revelations:
                </span>
                <ul className="list-disc pl-5 text-xs text-zinc-400 flex flex-col gap-1.5">
                  {NAGATO_DATA.loreSections[0].notableFacts.map((fact, idx) => (
                    <li key={idx}>{fact}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 4: Stolen Eyes & Madara's Blueprint */}
          {activeLoreTab === 'stolen_eyes' && (
            <div className="p-8 rounded-2xl bg-[#0b0918] border border-purple-900/40 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-purple-400 font-bold uppercase">
                  {NAGATO_DATA.loreSections[2].badge}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {NAGATO_DATA.loreSections[2].title}
                </h3>
                <p className="text-xs text-purple-300/80">
                  {NAGATO_DATA.loreSections[2].subtitle}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/40 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div className="text-xs text-purple-200 leading-relaxed">
                  <strong>Madara&apos;s Blueprint:</strong> Nagato did not naturally awaken
                  the Rinnegan. As an Uzumaki, he was chosen by Madara to house the legendary
                  eyes because only Uzumaki life force could bear the crushing chakra cost
                  until Madara was ready to be resurrected via Rinne Rebirth.
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {NAGATO_DATA.loreSections[2].content}
              </p>

              <div className="flex flex-col gap-2 pt-2 border-t border-purple-950">
                <span className="text-xs font-bold text-purple-300">
                  Historical Consequences:
                </span>
                <ul className="list-disc pl-5 text-xs text-zinc-400 flex flex-col gap-1.5">
                  {NAGATO_DATA.loreSections[2].notableFacts.map((fact, idx) => (
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
