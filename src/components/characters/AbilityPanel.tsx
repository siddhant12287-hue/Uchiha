import React from 'react';
import type { Ability } from '../../types/character';
import { Button } from '../common/Button';
import { Moon, Flame, Shield, Repeat, Eye, Wind, Sparkles, Volume2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AbilityPanelProps {
  ability: Ability;
  isActive?: boolean;
  onActivate?: (abilityId: string) => void;
  onSoundTrigger?: (abilityId: string) => void;
  className?: string;
}

export const AbilityPanel: React.FC<AbilityPanelProps> = ({
  ability,
  isActive = false,
  onActivate,
  onSoundTrigger,
  className = '',
}) => {
  const renderIcon = () => {
    switch (ability.iconName) {
      case 'moon':
        return <Moon className="w-5 h-5 text-red-400" />;
      case 'flame':
        return <Flame className="w-5 h-5 text-red-400" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-amber-400" />;
      case 'repeat':
        return <Repeat className="w-5 h-5 text-purple-400" />;
      case 'eye':
        return <Eye className="w-5 h-5 text-zinc-300" />;
      case 'wind':
        return <Wind className="w-5 h-5 text-emerald-400" />;
      case 'sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-red-400" />;
    }
  };

  const getBadgeStyle = () => {
    switch (ability.exclusivity) {
      case 'exclusive':
        return 'bg-red-950/80 border-red-700/70 text-red-300';
      case 'forbidden_kinjutsu':
        return 'bg-purple-950/80 border-purple-700/70 text-purple-300';
      case 'clan_shared':
        return 'bg-amber-950/80 border-amber-700/70 text-amber-300';
      case 'non_exclusive':
      default:
        return 'bg-zinc-800/80 border-zinc-700/70 text-zinc-400';
    }
  };

  return (
    <div
      className={cn(
        'p-6 rounded-2xl border transition-all duration-300 flex flex-col gap-4 relative overflow-hidden backdrop-blur-sm',
        isActive
          ? 'bg-[#150f1d] border-red-500/80 shadow-[0_0_30px_rgba(200,0,0,0.35)]'
          : 'bg-[#0e0c17]/90 border-[#252033] hover:border-red-900/60 hover:bg-[#120f1e]',
        className
      )}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-black/50 border border-zinc-800 shadow-inner">
            {renderIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-wide">
                {ability.name}
              </h3>
              <span className="text-xs font-serif text-zinc-400">{ability.kanji}</span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">{ability.classification}</p>
          </div>
        </div>

        {/* Exclusivity Badge */}
        {ability.exclusivityBadge && (
          <span
            className={cn(
              'text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border shadow-xs shrink-0',
              getBadgeStyle()
            )}
          >
            {ability.exclusivityBadge}
          </span>
        )}
      </div>

      {/* Short Summary */}
      <p className="text-xs text-zinc-200 leading-relaxed font-medium">
        {ability.shortSummary}
      </p>

      {/* Detailed Lore */}
      <p className="text-xs text-zinc-400 leading-relaxed">
        {ability.detailedLore}
      </p>

      {/* Tactical & Canon Meta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-3 border-t border-[#1d1829]">
        <div className="text-zinc-400">
          <strong className="text-zinc-300">Tactical Usage: </strong>
          {ability.tacticalUsage}
        </div>
        {ability.canonAppearance && (
          <div className="text-zinc-400 font-mono text-[10px]">
            <strong className="text-zinc-300">Canon Debut: </strong>
            {ability.canonAppearance}
          </div>
        )}
      </div>

      {/* Action Triggers */}
      {(onActivate || onSoundTrigger) && (
        <div className="flex items-center justify-end gap-2 pt-2">
          {onSoundTrigger && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSoundTrigger(ability.id)}
              icon={<Volume2 className="w-3.5 h-3.5" />}
            >
              Sound Synthesis
            </Button>
          )}
          {onActivate && (
            <Button
              size="sm"
              variant={isActive ? 'crimson' : 'primary'}
              onClick={() => onActivate(ability.id)}
            >
              {isActive ? 'Active Mode' : 'Manifest Jutsu'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
