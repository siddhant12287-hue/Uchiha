import React, { useState } from 'react';
import {
  Orbit,
  Cpu,
  Brain,
  Cat,
  Shield,
  HeartPulse,
  Sparkles,
  Info,
  ChevronRight,
  Flame,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { audioEngine } from '../../utils/audioEngine';
import { SIX_PATHS_DATA } from '../../data/sixPaths';

const PATH_ICONS: Record<string, React.ReactNode> = {
  deva: <Orbit className="w-5 h-5 text-purple-400" />,
  asura: <Cpu className="w-5 h-5 text-red-400" />,
  human: <Brain className="w-5 h-5 text-sky-400" />,
  animal: <Cat className="w-5 h-5 text-amber-400" />,
  preta: <Shield className="w-5 h-5 text-emerald-400" />,
  naraka: <HeartPulse className="w-5 h-5 text-indigo-400" />,
};

export const SixPathsMatrix: React.FC = () => {
  const [selectedPathId, setSelectedPathId] = useState<string>('deva');

  const selectedPath =
    SIX_PATHS_DATA.find((p) => p.id === selectedPathId) ?? SIX_PATHS_DATA[0];

  return (
    <div className="w-full flex flex-col gap-8">
      {/* 1. Six Corpse Avatar Grid */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
              Distributed Telepresence Network
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 border border-purple-700/40">
              6 Corpse Conduits
            </span>
          </div>
          <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
            Omnidirectional 360&deg; Shared Sight
          </span>
        </div>

        {/* 6 Path Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SIX_PATHS_DATA.map((path) => {
            const isSelected = selectedPathId === path.id;
            return (
              <button
                key={path.id}
                type="button"
                onClick={() => {
                  audioEngine.playActivation();
                  setSelectedPathId(path.id);
                }}
                className={cn(
                  'group relative flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all duration-300 text-center cursor-pointer',
                  isSelected
                    ? 'bg-[#151228] border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.35)] -translate-y-1'
                    : 'bg-[#0a0815]/90 border-zinc-800/80 hover:border-zinc-700 hover:bg-[#100d20]'
                )}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-2 transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `${path.accentColor}20`,
                    border: `1px solid ${path.accentColor}60`,
                  }}
                >
                  {PATH_ICONS[path.id]}
                </div>
                <span className="text-xs font-bold text-white tracking-wide">
                  {path.name}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 mt-0.5">
                  {path.kanji}
                </span>

                {isSelected && (
                  <div
                    className="absolute -bottom-1 w-6 h-1 rounded-full"
                    style={{ backgroundColor: path.accentColor }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Path Detailed Inspector Panel */}
        <div className="p-6 rounded-2xl bg-[#0c0919] border border-purple-900/40 flex flex-col gap-5 mt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-950 pb-4">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-xl"
                style={{
                  backgroundColor: `${selectedPath.accentColor}20`,
                  border: `1px solid ${selectedPath.accentColor}60`,
                }}
              >
                {PATH_ICONS[selectedPath.id]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xl font-bold text-white">
                    {selectedPath.name}
                  </h4>
                  <span className="text-xs font-mono text-purple-300">
                    ({selectedPath.kanji} &bull; {selectedPath.romaji})
                  </span>
                </div>
                <span className="text-xs text-zinc-400">
                  {selectedPath.classification}
                </span>
              </div>
            </div>

            <div className="text-xs font-mono text-zinc-400 px-3 py-1 rounded-lg bg-black/40 border border-zinc-800 self-start sm:self-auto">
              Vessel: <span className="text-zinc-200">{selectedPath.vessel}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {selectedPath.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/30 flex flex-col gap-2">
              <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Primary Jutsu &amp; Mechanics</span>
              </span>
              <ul className="text-xs text-zinc-400 flex flex-col gap-2">
                {selectedPath.coreAbilities.map((ab, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <span>{ab}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/30 flex flex-col gap-3">
              <div>
                <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5 mb-1">
                  <Info className="w-3.5 h-3.5 text-purple-400" />
                  <span>Strategic Tactical Role</span>
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {selectedPath.strategicRole}
                </p>
              </div>

              <div className="border-t border-purple-950/60 pt-2">
                <span className="text-xs font-bold text-zinc-300 mb-1 block">
                  Canon Chronicle
                </span>
                <p className="text-xs text-zinc-400 italic leading-relaxed">
                  &ldquo;{selectedPath.canonLore}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Distinct, Visually Separated Outer Path (Gedō) Panel */}
      <div className="relative p-7 rounded-2xl bg-gradient-to-br from-[#120b22] via-[#0e071c] to-[#070310] border-2 border-purple-500/70 shadow-[0_0_40px_rgba(168,85,247,0.25)] flex flex-col gap-6 overflow-hidden">
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-violet-300 to-purple-600" />

        {/* Header with Critical Canon Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-purple-800/40 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-900/40 border border-purple-400/60 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <Flame className="w-6 h-6 text-violet-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-violet-300 uppercase tracking-widest">
                  The Seventh Sovereign Domain
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-950 border border-violet-500/70 text-violet-200 font-bold">
                  Sovereign to Nagato
                </span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-wide font-serif">
                THE OUTER PATH &bull; 外道 (GEDŌ)
              </h3>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-950/50 border border-amber-500/60 text-amber-300 text-xs font-semibold self-start md:self-auto">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Independent of the 6 Pain Avatars</span>
          </div>
        </div>

        {/* Essential Canon Note Highlight Box */}
        <div className="p-4 rounded-xl bg-purple-950/40 border-l-4 border-l-purple-400 border border-purple-800/50 flex items-start gap-3">
          <Info className="w-5 h-5 text-purple-300 shrink-0 mt-0.5" />
          <div className="text-xs text-purple-100 leading-relaxed font-sans">
            <strong className="text-white font-bold block mb-1">
              CANONICAL RULE &amp; SEPARATION OF POWERS:
            </strong>
            The Outer Path is <strong>not</strong> one of the six corpse puppets. It is the
            true master domain wielded solely and directly by Nagato Uzumaki himself from his concealed
            mechanical walker (Gedō seat). While the six proxy bodies are mere conduits for mechanical,
            sensory, and gravitational aspects, the Outer Path alone commands dominion over the Demonic
            Statue of the Outer Path (Gedō Mazō), black chakra receiver transmission, and absolute life
            and death through Rinne Rebirth.
          </div>
        </div>

        {/* Gedō Dual Pillars: Demonic Statue & Rinne Rebirth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Pillar 1: Gedō Mazō */}
          <div className="p-5 rounded-xl bg-black/40 border border-purple-900/50 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h5 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>Gedō Mazō &bull; 外道魔像</span>
              </h5>
              <span className="text-[10px] font-mono text-zinc-400 uppercase">
                Demonic Statue Husk
              </span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              The petrified, lifeless husk of the Ten-Tails (Jūbi). When summoned by Nagato
              during Yahiko&apos;s death, it pierced his spine with black rods and released
              ethereal chakra dragons that instantly tore the souls from Hanzō&apos;s forces.
              Serves as the vessel to contain the nine sealed Tailed Beasts.
            </p>
            <div className="text-[11px] font-mono text-purple-300/80 pt-2 border-t border-purple-950">
              Mechanic: Emaciates user&apos;s physical body in exchange for devastating soul-extraction reach.
            </div>
          </div>

          {/* Pillar 2: Gedō: Rinne Tensei no Jutsu */}
          <div className="p-5 rounded-xl bg-black/40 border border-purple-900/50 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h5 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                <span>Rinne Rebirth &bull; 輪廻天生之術</span>
              </h5>
              <span className="text-[10px] font-mono text-zinc-400 uppercase">
                Samsara of Heavenly Life
              </span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              The supreme resurrection kinjutsu. Nagato summons the King of Hell, releasing
              its gates to exhale the souls of all who perished in the assault on Konoha,
              reuniting their spirits with their physical bodies at the irrevocable cost of
              his own remaining life force.
            </p>
            <div className="text-[11px] font-mono text-purple-300/80 pt-2 border-t border-purple-950">
              Mechanic: Complete physiological rebirth bypassing Edo Tensei; causes the caster&apos;s hair to whiten and demise.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
