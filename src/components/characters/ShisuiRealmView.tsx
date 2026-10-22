import React, { useState, useCallback } from 'react';
import type { ViewType } from '../../types';
import { SHISUI_DATA } from '../../data/shisui';
import { Sharingan } from '../eyes/Sharingan';
import { ShisuiMangekyo } from '../eyes/ShisuiMangekyo';
import { BodyFlickerCanvas, type FlickerTarget } from '../canvas/BodyFlickerCanvas';
import { ParticleField } from '../canvas/ParticleField';
import { KotoamatsukamiIllusion } from './KotoamatsukamiIllusion';
import { RealmLayout } from './RealmLayout';
import { AbilityPanel } from './AbilityPanel';
import { Button } from '../common/Button';
import { useRealmShortcuts } from '../../hooks/useRealmShortcuts';
import { audioEngine } from '../../utils/audioEngine';
import { Sparkles, Wind, Shield, Eye, Flame } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ShisuiRealmViewProps {
  onBack: () => void;
  onNavigate: (view: ViewType) => void;
}

export const ShisuiRealmView: React.FC<ShisuiRealmViewProps> = ({
  onBack,
  onNavigate: _onNavigate,
}) => {
  const [isAwakened, setIsAwakened] = useState<boolean>(true);
  const [isTransitioningEye, setIsTransitioningEye] = useState<boolean>(false);
  const [isKotoActive, setIsKotoActive] = useState<boolean>(false);
  const [destination, setDestination] = useState<FlickerTarget | null>(null);
  const [flickerCount, setFlickerCount] = useState<number>(0);
  const [activeLoreTab, setActiveLoreTab] = useState<'abilities' | 'cooldown' | 'zanzou' | 'sacrifice'>('abilities');

  // Awaken Toggle
  const handleToggleAwaken = useCallback(() => {
    audioEngine.playActivation();
    setIsTransitioningEye(true);
    setTimeout(() => {
      setIsAwakened((prev) => !prev);
      setIsTransitioningEye(false);
    }, 400);
  }, []);

  // Kotoamatsukami Simulation Trigger
  const handleTriggerKoto = useCallback(() => {
    audioEngine.playTsukuyomi();
    setIsKotoActive(true);
  }, []);

  // Keyboard Shortcuts
  useRealmShortcuts({
    onBack: isKotoActive ? () => setIsKotoActive(false) : onBack,
    onToggleAwaken: handleToggleAwaken,
    onToggleTsukuyomi: handleTriggerKoto, // [T] triggers Koto illusion
  });

  // Canvas Click: Body Flicker Displacement
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('a')) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    audioEngine.playActivation();
    setDestination({
      id: Date.now() + Math.random(),
      x,
      y,
    });
    setFlickerCount((prev) => prev + 1);
  };

  // Sound Dispatcher
  const handleAbilitySound = (abilityId: string) => {
    if (abilityId === 'kotoamatsukami') {
      audioEngine.playTsukuyomi();
    } else if (abilityId === 'shunshin') {
      audioEngine.playActivation();
    } else if (abilityId === 'green_susanoo') {
      audioEngine.playShinraTensei();
    } else {
      audioEngine.playActivation();
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full bg-[#050907] transition-colors duration-700">
      {/* Kotoamatsukami Lens Distortion Simulation Overlay */}
      <KotoamatsukamiIllusion
        isOpen={isKotoActive}
        onExit={() => setIsKotoActive(false)}
      />

      <RealmLayout
        characterName={SHISUI_DATA.name}
        kanji={SHISUI_DATA.kanji}
        epithet={SHISUI_DATA.epithet}
        themeColor={SHISUI_DATA.themeColor}
        onBack={onBack}
        onCanvasClick={handleCanvasClick}
        backgroundCanvas={
          <>
            {/* Body Flicker Afterimage Canvas */}
            <BodyFlickerCanvas destination={destination} />
            {/* Ambient Jade and Crimson Chakra Particles */}
            <ParticleField
              palette={['#00e5a3', '#10b981', '#059669', '#e61919', '#042f2e']}
              count={220}
              drift="drift"
              speedMultiplier={0.9}
            />
          </>
        }
        centralEyeStage={
          <div className="relative flex items-center justify-center p-6">
            {/* Eye Transition Container */}
            <div
              className={cn(
                'relative z-20 cursor-pointer transition-all duration-500',
                isTransitioningEye && 'scale-90 opacity-60 blur-xs'
              )}
              onClick={handleToggleAwaken}
              title="Click or press [A] to toggle Sharingan / Mangekyo Awakening"
            >
              {isAwakened ? (
                <ShisuiMangekyo
                  size={200}
                  rotationSpeed={isKotoActive ? 2.5 : 6}
                  glowIntensity={0.85}
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
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl bg-[#0b1411]/90 p-3 rounded-2xl border border-emerald-900/50 backdrop-blur-md shadow-lg">
            {/* Awaken Toggle */}
            <Button
              size="sm"
              variant={isAwakened ? 'crimson' : 'outline'}
              onClick={handleToggleAwaken}
              icon={<Sparkles className="w-3.5 h-3.5" />}
            >
              {isAwakened ? 'Awakened: Mangekyo [A]' : 'Awaken Mangekyo [A]'}
            </Button>

            {/* Kotoamatsukami Simulation Button */}
            <Button
              size="sm"
              variant="purple"
              onClick={handleTriggerKoto}
              icon={<Eye className="w-3.5 h-3.5 text-emerald-300" />}
            >
              Simulate Kotoamatsukami [T]
            </Button>
          </div>
        }
      >
        {/* Interaction Guidance Banner */}
        <div className="flex items-center justify-between p-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-[#0a1613] to-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-200">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>
              <strong>Shunshin Displacement: </strong> Click anywhere on the realm stage to trigger a high-speed Body Flicker streak and leave ghost afterimages.
            </span>
          </div>
          <span className="font-mono text-[11px] text-emerald-400 hidden sm:inline">
            Flickers Executed: {flickerCount}
          </span>
        </div>

        {/* Shisui Lore & Abilities Navigation */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-emerald-950/80 pb-3 overflow-x-auto">
            <button
              type="button"
              onClick={() => {
                audioEngine.playActivation();
                setActiveLoreTab('abilities');
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
                activeLoreTab === 'abilities'
                  ? 'bg-emerald-950/90 text-emerald-200 border border-emerald-700/80 shadow-[0_0_12px_rgba(0,229,163,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              )}
            >
              <Wind className="w-4 h-4 text-emerald-400" />
              <span>Abilities & Techniques ({SHISUI_DATA.abilities.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                audioEngine.playActivation();
                setActiveLoreTab('cooldown');
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
                activeLoreTab === 'cooldown'
                  ? 'bg-emerald-950/90 text-emerald-200 border border-emerald-700/80 shadow-[0_0_12px_rgba(0,229,163,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              )}
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Kotoamatsukami Canon Rules</span>
            </button>

            <button
              type="button"
              onClick={() => {
                audioEngine.playActivation();
                setActiveLoreTab('zanzou');
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
                activeLoreTab === 'zanzou'
                  ? 'bg-emerald-950/90 text-emerald-200 border border-emerald-700/80 shadow-[0_0_12px_rgba(0,229,163,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              )}
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Phantom Afterimage Mastery</span>
            </button>

            <button
              type="button"
              onClick={() => {
                audioEngine.playActivation();
                setActiveLoreTab('sacrifice');
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
                activeLoreTab === 'sacrifice'
                  ? 'bg-emerald-950/90 text-emerald-200 border border-emerald-700/80 shadow-[0_0_12px_rgba(0,229,163,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              )}
            >
              <Flame className="w-4 h-4 text-red-400" />
              <span>Naka River Entrustment</span>
            </button>
          </div>

          {/* Tab 1: Abilities Grid */}
          {activeLoreTab === 'abilities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SHISUI_DATA.abilities.map((ability) => (
                <AbilityPanel
                  key={ability.id}
                  ability={ability}
                  isActive={ability.id === 'kotoamatsukami' && isKotoActive}
                  onActivate={
                    ability.id === 'kotoamatsukami'
                      ? handleTriggerKoto
                      : undefined
                  }
                  onSoundTrigger={handleAbilitySound}
                />
              ))}
            </div>
          )}

          {/* Tab 2: Kotoamatsukami Canon Rules */}
          {activeLoreTab === 'cooldown' && (
            <div className="p-8 rounded-2xl bg-[#091410] border border-emerald-900/40 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                  {SHISUI_DATA.loreSections[0].badge}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {SHISUI_DATA.loreSections[0].title}
                </h3>
                <p className="text-xs text-emerald-300/80">
                  {SHISUI_DATA.loreSections[0].subtitle}
                </p>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {SHISUI_DATA.loreSections[0].content}
              </p>

              <div className="flex flex-col gap-2 pt-2 border-t border-emerald-950">
                <span className="text-xs font-bold text-emerald-300">Canon Facts & Destinies:</span>
                <ul className="list-disc pl-5 text-xs text-zinc-400 flex flex-col gap-1.5">
                  {SHISUI_DATA.loreSections[0].notableFacts.map((fact, idx) => (
                    <li key={idx}>{fact}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 3: Phantom Afterimage Clones */}
          {activeLoreTab === 'zanzou' && (
            <div className="p-8 rounded-2xl bg-[#091410] border border-emerald-900/40 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                  {SHISUI_DATA.loreSections[1].badge}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {SHISUI_DATA.loreSections[1].title}
                </h3>
                <p className="text-xs text-emerald-300/80">
                  {SHISUI_DATA.loreSections[1].subtitle}
                </p>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {SHISUI_DATA.loreSections[1].content}
              </p>

              <div className="flex flex-col gap-2 pt-2 border-t border-emerald-950">
                <span className="text-xs font-bold text-emerald-300">Tactical Dominance:</span>
                <ul className="list-disc pl-5 text-xs text-zinc-400 flex flex-col gap-1.5">
                  {SHISUI_DATA.loreSections[1].notableFacts.map((fact, idx) => (
                    <li key={idx}>{fact}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 4: Naka River Sacrifice */}
          {activeLoreTab === 'sacrifice' && (
            <div className="p-8 rounded-2xl bg-[#091410] border border-red-950/80 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-red-400 font-bold uppercase">
                  {SHISUI_DATA.loreSections[2].badge}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {SHISUI_DATA.loreSections[2].title}
                </h3>
                <p className="text-xs text-red-300/80">
                  {SHISUI_DATA.loreSections[2].subtitle}
                </p>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {SHISUI_DATA.loreSections[2].content}
              </p>

              <div className="flex flex-col gap-2 pt-2 border-t border-zinc-800">
                <span className="text-xs font-bold text-red-300">The Martyr's Legacy:</span>
                <ul className="list-disc pl-5 text-xs text-zinc-400 flex flex-col gap-1.5">
                  {SHISUI_DATA.loreSections[2].notableFacts.map((fact, idx) => (
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
