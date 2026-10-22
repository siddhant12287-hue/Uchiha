import React from 'react';
import { Sharingan } from '../eyes/Sharingan';
import { MadaraEternalMangekyo } from '../eyes/MadaraEternalMangekyo';
import { Rinnegan } from '../eyes/Rinnegan';
import { RinneSharingan } from '../eyes/RinneSharingan';
import { audioEngine } from '../../utils/audioEngine';
import { cn } from '../../utils/cn';

export type MadaraOcularStage = 'sharingan' | 'ems' | 'rinnegan' | 'rinnesharingan';

interface StageMeta {
  id: MadaraOcularStage;
  name: string;
  kanji: string;
  epoch: string;
  summary: string;
}

const STAGES: StageMeta[] = [
  {
    id: 'sharingan',
    name: '3-Tomoe Sharingan',
    kanji: '三巴 写輪眼',
    epoch: 'Warring States Era',
    summary:
      'Awakened in his youth amidst the endless clan battles against the Senju. Granted unmatched movement precognition, instant ninjutsu copying, and mastery over colossal Fire Style attacks.',
  },
  {
    id: 'ems',
    name: 'Eternal Mangekyo (EMS)',
    kanji: '永遠の万華鏡写輪眼',
    epoch: 'Founding of Konoha',
    summary:
      'Forged by transplanting his brother Izuna\'s Mangekyo. Granted permanent optical immortality without deterioration and unlocked the colossal mountain-cleaving Perfect Susanoo.',
  },
  {
    id: 'rinnegan',
    name: 'Six Paths Rinnegan',
    kanji: '輪廻眼',
    epoch: 'Twilight of Life & Reanimation',
    summary:
      'Awakened near the end of his natural life by grafting Hashirama\'s living flesh into his chest, uniting Indra and Asura chakra to recreate Hagoromo\'s divine ocular power. Enabled Tengai Shinsei and Limbo clones.',
  },
  {
    id: 'rinnesharingan',
    name: 'Divine Rinne Sharingan',
    kanji: '輪廻写輪眼',
    epoch: 'Ten-Tails Jinchuriki',
    summary:
      'The primordial third eye opened on his forehead after absorbing the God Tree and approaching the stratosphere. Possessing 9 tomoe across 3 concentric rings, it enabled the planetary Infinite Tsukuyomi.',
  },
];

export interface MadaraDojutsuEvolutionProps {
  currentStage: MadaraOcularStage;
  onSelectStage: (stage: MadaraOcularStage) => void;
  className?: string;
}

export const MadaraDojutsuEvolution: React.FC<MadaraDojutsuEvolutionProps> = ({
  currentStage,
  onSelectStage,
  className = '',
}) => {
  const currentMeta = STAGES.find((s) => s.id === currentStage) || STAGES[1];

  const handleSelect = (stage: MadaraOcularStage) => {
    audioEngine.playActivation();
    onSelectStage(stage);
  };

  const renderEye = (stage: MadaraOcularStage, size: number) => {
    switch (stage) {
      case 'sharingan':
        return <Sharingan size={size} tomoeCount={3} rotationSpeed={12} />;
      case 'ems':
        return <MadaraEternalMangekyo size={size} rotationSpeed={8} isAwakened={true} />;
      case 'rinnegan':
        return <Rinnegan size={size} isAwakened={true} />;
      case 'rinnesharingan':
        return <RinneSharingan size={size} rotationSpeed={14} isAwakened={true} />;
    }
  };

  return (
    <div className={cn('flex flex-col items-center gap-6 w-full max-w-3xl', className)}>
      {/* Central Ocular Stage */}
      <div className="relative p-6 flex flex-col items-center">
        <div className="transition-transform duration-500 hover:scale-105">
          {renderEye(currentStage, 220)}
        </div>

        <div className="mt-4 flex flex-col items-center gap-1">
          <span className="text-xs font-mono tracking-widest text-blue-400 font-bold uppercase">
            {currentMeta.epoch}
          </span>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{currentMeta.name}</span>
            <span className="text-sm font-serif text-zinc-400">{currentMeta.kanji}</span>
          </h3>
          <p className="text-xs text-zinc-300 max-w-xl text-center leading-relaxed mt-1">
            {currentMeta.summary}
          </p>
        </div>
      </div>

      {/* Stage Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
        {STAGES.map((s) => {
          const isSelected = s.id === currentStage;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSelect(s.id)}
              className={cn(
                'p-3 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer text-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                isSelected
                  ? 'bg-blue-950/80 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                  : 'bg-[#0b0c16]/80 border-[#222438] hover:border-zinc-700 hover:bg-[#121424]'
              )}
            >
              <div className="w-12 h-12 flex items-center justify-center">
                {renderEye(s.id, 44)}
              </div>
              <span
                className={cn(
                  'text-xs font-bold tracking-wide',
                  isSelected ? 'text-blue-300' : 'text-zinc-400 group-hover:text-white'
                )}
              >
                {s.name.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
