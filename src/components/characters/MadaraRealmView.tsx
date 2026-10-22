import React, { useState, useCallback } from 'react';
import type { ViewType } from '../../types';
import { MADARA_DATA } from '../../data/madara';
import { MadaraChakraCanvas } from '../canvas/MadaraChakraCanvas';
import { TengaiShinseiSimulation } from './TengaiShinseiSimulation';
import { LimboShadows } from './LimboShadows';
import { MadaraDojutsuEvolution, type MadaraOcularStage } from './MadaraDojutsuEvolution';
import { RealmLayout } from './RealmLayout';
import { AbilityPanel } from './AbilityPanel';
import { Button } from '../common/Button';
import { useRealmShortcuts } from '../../hooks/useRealmShortcuts';
import { audioEngine } from '../../utils/audioEngine';
import { Mountain, Users, Shield, Eye, Flame } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MadaraRealmViewProps {
  onBack: () => void;
  onNavigate: (view: ViewType) => void;
}

export const MadaraRealmView: React.FC<MadaraRealmViewProps> = ({
  onBack,
  onNavigate: _onNavigate,
}) => {
  const [currentStage, setCurrentStage] = useState<MadaraOcularStage>('ems');
  const [isTengaiActive, setIsTengaiActive] = useState<boolean>(false);
  const [isLimboActive, setIsLimboActive] = useState<boolean>(false);
  const [isSusanooActive, setIsSusanooActive] = useState<boolean>(false);
  const [activeLoreTab, setActiveLoreTab] = useState<'abilities' | 'hashirama' | 'limbo' | 'evolution'>('abilities');

  // Tengai Shinsei Trigger
  const handleTriggerTengai = useCallback(() => {
    audioEngine.playShinraTensei();
    setIsTengaiActive(true);
  }, []);

  // Limbo Clones Toggle
  const handleToggleLimbo = useCallback(() => {
    audioEngine.playActivation();
    setIsLimboActive((prev) => !prev);
  }, []);

  // Susanoo Toggle
  const handleToggleSusanoo = useCallback(() => {
    audioEngine.playShinraTensei();
    setIsSusanooActive((prev) => !prev);
  }, []);

  // Keyboard Shortcuts
  useRealmShortcuts({
    onBack: isTengaiActive ? () => setIsTengaiActive(false) : onBack,
    onToggleAwaken: () => {
      // Cycles ocular evolution
      const stages: MadaraOcularStage[] = ['sharingan', 'ems', 'rinnegan', 'rinnesharingan'];
      const nextIdx = (stages.indexOf(currentStage) + 1) % stages.length;
      audioEngine.playActivation();
      setCurrentStage(stages[nextIdx]);
    },
    onToggleTsukuyomi: handleTriggerTengai, // [T] triggers Tengai Shinsei
    onToggleSusanoo: handleToggleSusanoo, // [S] triggers Susanoo
  });

  // Ability Sound Trigger Dispatcher
  const handleAbilitySound = (abilityId: string) => {
    if (abilityId === 'tengai_shinsei' || abilityId === 'perfect_susanoo') {
      audioEngine.playShinraTensei();
    } else if (abilityId === 'infinite_tsukuyomi_madara') {
      audioEngine.playTsukuyomi();
    } else {
      audioEngine.playActivation();
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full bg-[#080714] transition-colors duration-700">
      {/* Tengai Shinsei Dual Meteor Simulation Overlay */}
      <TengaiShinseiSimulation
        isActive={isTengaiActive}
        onClose={() => setIsTengaiActive(false)}
      />

      <RealmLayout
        characterName={MADARA_DATA.name}
        kanji={MADARA_DATA.kanji}
        epithet={MADARA_DATA.epithet}
        themeColor={MADARA_DATA.themeColor}
        onBack={onBack}
        backgroundCanvas={
          <>
            {/* Rising Blue Susanoo Chakra & Floating Rock Debris */}
            <MadaraChakraCanvas />
          </>
        }
        centralEyeStage={
          <div className="relative flex items-center justify-center p-4">
            {/* Limbo Inter-Dimensional Shadow Clones */}
            <LimboShadows active={isLimboActive} />

            {/* Dojutsu Evolution Stage */}
            <MadaraDojutsuEvolution
              currentStage={currentStage}
              onSelectStage={setCurrentStage}
            />
          </div>
        }
        actionBar={
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl bg-[#0c0d1c]/90 p-3 rounded-2xl border border-blue-900/50 backdrop-blur-md shadow-lg">
            {/* Tengai Shinsei Trigger */}
            <Button
              size="sm"
              variant="crimson"
              onClick={handleTriggerTengai}
              icon={<Mountain className="w-3.5 h-3.5" />}
            >
              Summon Tengai Shinsei [T]
            </Button>

            {/* Limbo Clones Toggle */}
            <Button
              size="sm"
              variant={isLimboActive ? 'purple' : 'outline'}
              onClick={handleToggleLimbo}
              icon={<Users className="w-3.5 h-3.5 text-blue-300" />}
            >
              {isLimboActive ? 'Limbo Shadows Active' : 'Manifest Limbo [L]'}
            </Button>

            {/* Susanoo Colossus Mode */}
            <Button
              size="sm"
              variant={isSusanooActive ? 'primary' : 'outline'}
              onClick={handleToggleSusanoo}
              icon={<Shield className="w-3.5 h-3.5 text-blue-300" />}
            >
              {isSusanooActive ? 'Perfect Susanoo Clad [S]' : 'Manifest Susanoo [S]'}
            </Button>
          </div>
        }
      >
        {/* Interaction Info Banner */}
        <div className="flex items-center justify-between p-3.5 px-5 rounded-xl bg-gradient-to-r from-blue-950/40 via-[#0e1026] to-blue-950/40 border border-blue-800/40 text-xs text-blue-200">
          <div className="flex items-center gap-2">
            <Mountain className="w-4 h-4 text-blue-400 animate-pulse" />
            <span>
              <strong>Heaven Concealed (Tengai Shinsei): </strong> Unleash stratospheric twin meteors with procedural impact dynamics and camera shockwaves.
            </span>
          </div>
          <span className="font-mono text-[11px] text-blue-400 hidden sm:inline">
            Active Stage: {currentStage.toUpperCase()}
          </span>
        </div>

        {/* Madara Lore & Abilities Navigation */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-blue-950/80 pb-3 overflow-x-auto">
            <button
              type="button"
              onClick={() => {
                audioEngine.playActivation();
                setActiveLoreTab('abilities');
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
                activeLoreTab === 'abilities'
                  ? 'bg-blue-950/90 text-blue-200 border border-blue-700/80 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              )}
            >
              <Shield className="w-4 h-4 text-blue-400" />
              <span>Abilities & Cataclysms ({MADARA_DATA.abilities.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                audioEngine.playActivation();
                setActiveLoreTab('hashirama');
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
                activeLoreTab === 'hashirama'
                  ? 'bg-blue-950/90 text-blue-200 border border-blue-700/80 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              )}
            >
              <Flame className="w-4 h-4 text-red-400" />
              <span>Hashirama Cells & Wood Style</span>
            </button>

            <button
              type="button"
              onClick={() => {
                audioEngine.playActivation();
                setActiveLoreTab('limbo');
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
                activeLoreTab === 'limbo'
                  ? 'bg-blue-950/90 text-blue-200 border border-blue-700/80 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              )}
            >
              <Users className="w-4 h-4 text-purple-400" />
              <span>Limbo Dimension Physics</span>
            </button>

            <button
              type="button"
              onClick={() => {
                audioEngine.playActivation();
                setActiveLoreTab('evolution');
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
                activeLoreTab === 'evolution'
                  ? 'bg-blue-950/90 text-blue-200 border border-blue-700/80 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              )}
            >
              <Eye className="w-4 h-4 text-blue-400" />
              <span>Four Ocular Epochs</span>
            </button>
          </div>

          {/* Tab 1: Abilities Grid */}
          {activeLoreTab === 'abilities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MADARA_DATA.abilities.map((ability) => (
                <AbilityPanel
                  key={ability.id}
                  ability={ability}
                  isActive={
                    (ability.id === 'tengai_shinsei' && isTengaiActive) ||
                    (ability.id === 'limbo_hengoku' && isLimboActive) ||
                    (ability.id === 'perfect_susanoo' && isSusanooActive)
                  }
                  onActivate={
                    ability.id === 'tengai_shinsei'
                      ? handleTriggerTengai
                      : ability.id === 'limbo_hengoku'
                      ? handleToggleLimbo
                      : ability.id === 'perfect_susanoo'
                      ? handleToggleSusanoo
                      : undefined
                  }
                  onSoundTrigger={handleAbilitySound}
                />
              ))}
            </div>
          )}

          {/* Tab 2: Hashirama Cells & Wood Style */}
          {activeLoreTab === 'hashirama' && (
            <div className="p-8 rounded-2xl bg-[#0b0c1c] border border-blue-900/40 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-blue-400 font-bold uppercase">
                  {MADARA_DATA.loreSections[0].badge}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {MADARA_DATA.loreSections[0].title}
                </h3>
                <p className="text-xs text-blue-300/80">
                  {MADARA_DATA.loreSections[0].subtitle}
                </p>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {MADARA_DATA.loreSections[0].content}
              </p>

              <div className="flex flex-col gap-2 pt-2 border-t border-blue-950">
                <span className="text-xs font-bold text-blue-300">Genetic Harmony:</span>
                <ul className="list-disc pl-5 text-xs text-zinc-400 flex flex-col gap-1.5">
                  {MADARA_DATA.loreSections[0].notableFacts.map((fact, idx) => (
                    <li key={idx}>{fact}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 3: Limbo Dimension Physics */}
          {activeLoreTab === 'limbo' && (
            <div className="p-8 rounded-2xl bg-[#0b0c1c] border border-purple-900/40 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-purple-400 font-bold uppercase">
                  {MADARA_DATA.loreSections[1].badge}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {MADARA_DATA.loreSections[1].title}
                </h3>
                <p className="text-xs text-purple-300/80">
                  {MADARA_DATA.loreSections[1].subtitle}
                </p>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {MADARA_DATA.loreSections[1].content}
              </p>

              <div className="flex flex-col gap-2 pt-2 border-t border-purple-950">
                <span className="text-xs font-bold text-purple-300">Inter-Dimensional Constraints:</span>
                <ul className="list-disc pl-5 text-xs text-zinc-400 flex flex-col gap-1.5">
                  {MADARA_DATA.loreSections[1].notableFacts.map((fact, idx) => (
                    <li key={idx}>{fact}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 4: Four Ocular Epochs */}
          {activeLoreTab === 'evolution' && (
            <div className="p-8 rounded-2xl bg-[#0b0c1c] border border-blue-900/40 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-blue-400 font-bold uppercase">
                  {MADARA_DATA.loreSections[2].badge}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {MADARA_DATA.loreSections[2].title}
                </h3>
                <p className="text-xs text-blue-300/80">
                  {MADARA_DATA.loreSections[2].subtitle}
                </p>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {MADARA_DATA.loreSections[2].content}
              </p>

              <div className="flex flex-col gap-2 pt-2 border-t border-blue-950">
                <span className="text-xs font-bold text-blue-300">Epochal Milestones:</span>
                <ul className="list-disc pl-5 text-xs text-zinc-400 flex flex-col gap-1.5">
                  {MADARA_DATA.loreSections[2].notableFacts.map((fact, idx) => (
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
