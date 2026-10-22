import React, { useState, useMemo } from 'react';
import {
  DOJUTSU_ENTRIES,
  type DojutsuEntry,
  type DojutsuCategory,
} from '../../data/dojutsu';
import type { EyeProps } from '../../types';
import { Sharingan } from '../eyes/Sharingan';
import { ItachiMangekyo } from '../eyes/ItachiMangekyo';
import { MadaraEternalMangekyo } from '../eyes/MadaraEternalMangekyo';
import { Rinnegan } from '../eyes/Rinnegan';
import { RinneSharingan } from '../eyes/RinneSharingan';
import { Byakugan } from '../eyes/Byakugan';
import { Tenseigan } from '../eyes/Tenseigan';
import { Jogan } from '../eyes/Jogan';
import { Button } from '../common/Button';
import { Slider } from '../common/Slider';
import { Toggle } from '../common/Toggle';
import { Modal } from '../common/Modal';
import { audioEngine } from '../../utils/audioEngine';
import { cn } from '../../utils/cn';
import {
  Search,
  Filter,
  X,
  Sparkles,
  AlertCircle,
  Eye,
  Users,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

const renderLiveEye = (eyeId: string, props: EyeProps) => {
  switch (eyeId) {
    case 'sharingan':
      return <Sharingan tomoeCount={3} {...props} />;
    case 'mangekyo':
      return <ItachiMangekyo {...props} />;
    case 'ems':
      return <MadaraEternalMangekyo {...props} />;
    case 'rinnegan':
      return <Rinnegan {...props} />;
    case 'rinnesharingan':
      return <RinneSharingan {...props} />;
    case 'byakugan':
      return <Byakugan {...props} />;
    case 'tenseigan':
      return <Tenseigan {...props} />;
    case 'jogan':
      return <Jogan {...props} />;
    default:
      return <Sharingan tomoeCount={3} {...props} />;
  }
};

export const DojutsuCompendium: React.FC = () => {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DojutsuCategory | 'all'>('all');
  const [selectedCharacter, setSelectedCharacter] = useState<string>('all');

  // Interactive Inspector Modal State
  const [inspectingEntry, setInspectingEntry] = useState<DojutsuEntry | null>(null);
  const [modalPupilScale, setModalPupilScale] = useState<number>(1.0);
  const [modalGlow, setModalGlow] = useState<number>(0.8);
  const [modalRotationSpeed, setModalRotationSpeed] = useState<number>(0);
  const [modalAwakened, setModalAwakened] = useState<boolean>(true);

  // Extract all unique associated characters for filter
  const allCharacters = useMemo(() => {
    const set = new Set<string>();
    DOJUTSU_ENTRIES.forEach((e) => {
      e.associatedCharacters.forEach((c) => set.add(c));
    });
    return Array.from(set).sort();
  }, []);

  // Filtered Entries
  const filteredEntries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return DOJUTSU_ENTRIES.filter((entry) => {
      // Category filter
      if (selectedCategory !== 'all' && entry.category !== selectedCategory) {
        return false;
      }

      // Character filter
      if (
        selectedCharacter !== 'all' &&
        !entry.associatedCharacters.includes(selectedCharacter)
      ) {
        return false;
      }

      // Text query match (name, kanji, romaji, capabilities, lore, limitations)
      if (q) {
        const matchesName =
          entry.name.toLowerCase().includes(q) ||
          entry.romaji.toLowerCase().includes(q) ||
          entry.kanji.includes(q);
        const matchesChar = entry.associatedCharacters.some((c) =>
          c.toLowerCase().includes(q)
        );
        const matchesLore = entry.shortLore.toLowerCase().includes(q);
        const matchesCaps = entry.canonicalCapabilities.some((c) =>
          c.toLowerCase().includes(q)
        );

        if (!matchesName && !matchesChar && !matchesLore && !matchesCaps) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedCharacter]);

  const handleOpenInspector = (entry: DojutsuEntry) => {
    audioEngine.playActivation();
    setInspectingEntry(entry);
    setModalPupilScale(1.0);
    setModalGlow(0.8);
    setModalRotationSpeed(entry.category === 'uchiha-lineage' ? 4 : 0);
    setModalAwakened(true);
  };

  const handleResetFilters = () => {
    audioEngine.playActivation();
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCharacter('all');
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Search & Filter Controls Header */}
      <div className="p-6 rounded-2xl bg-[#0d0b17] border border-[#252035] flex flex-col gap-4 shadow-lg">
        {/* Search Input Bar */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by dōjutsu name, kanji, character (e.g. Itachi, Madara, Boruto), or capability..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/50 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/80 transition-all"
            aria-label="Search Dōjutsu compendium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white"
              aria-label="Clear search text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-zinc-900">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-xs font-mono text-zinc-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </span>

            {[
              { id: 'all', label: 'All Dōjutsu (8)' },
              { id: 'three-great', label: 'Three Great (三大瞳術)' },
              { id: 'uchiha-lineage', label: 'Uchiha Lineage' },
              { id: 'transcendent', label: 'Transcendent' },
              { id: 'otsutsuki', label: 'Otsutsuki' },
              { id: 'boruto-era', label: 'Boruto-Era' },
            ].map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    audioEngine.playActivation();
                    setSelectedCategory(cat.id as DojutsuCategory | 'all');
                  }}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap',
                    isSelected
                      ? 'bg-red-950/80 text-red-200 border border-red-500/70 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                      : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Character Selector Dropdown */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <label htmlFor="char-filter" className="text-xs font-mono text-zinc-400 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>Wielder:</span>
            </label>
            <select
              id="char-filter"
              value={selectedCharacter}
              onChange={(e) => {
                audioEngine.playActivation();
                setSelectedCharacter(e.target.value);
              }}
              className="px-2.5 py-1 rounded-lg bg-black/60 border border-zinc-800 text-xs text-zinc-300 focus:outline-none focus:border-red-500 transition-all cursor-pointer"
            >
              <option value="all">All Wielders</option>
              {allCharacters.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Compendium Grid */}
      {filteredEntries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#0b0916] border border-[#231e33] hover:border-red-500/60 transition-all duration-300 shadow-md hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]"
            >
              {/* Top Accent Stripe */}
              <div
                className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: entry.themeColor }}
              />

              {/* Card Header & Badges */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                        {entry.romaji}
                      </span>
                      {entry.isBorutoEra && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/60 shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                          BORUTO-ERA
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-wide mt-0.5">
                      {entry.name}{' '}
                      <span className="text-base font-serif font-normal text-zinc-500">
                        ({entry.kanji})
                      </span>
                    </h3>
                  </div>

                  {/* Badge */}
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-1 rounded-md border shrink-0 text-right"
                    style={{
                      color: entry.themeColor,
                      borderColor: `${entry.themeColor}50`,
                      backgroundColor: `${entry.themeColor}12`,
                    }}
                  >
                    {entry.category.toUpperCase()}
                  </span>
                </div>

                {/* Central Visual Live SVG & Lore Summary */}
                <div className="flex flex-col sm:flex-row items-center gap-5 my-4 p-4 rounded-xl bg-black/40 border border-zinc-900/80">
                  <div
                    onClick={() => handleOpenInspector(entry)}
                    className="relative w-28 h-28 shrink-0 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
                    title={`Click to inspect ${entry.name} in interactive viewer`}
                  >
                    {renderLiveEye(entry.eyeComponentId, {
                      size: 110,
                      glowIntensity: 0.8,
                      rotationSpeed: entry.category === 'uchiha-lineage' ? 4 : 0,
                      isAwakened: true,
                    })}
                    <div className="absolute inset-0 rounded-full border border-white/5 group-hover:border-white/20 transition-colors pointer-events-none" />
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {entry.shortLore}
                    </p>

                    {/* Associated Characters Chips */}
                    <div className="flex flex-wrap items-center gap-1 mt-1">
                      <span className="text-[10px] font-mono text-zinc-500">Wielders:</span>
                      {entry.associatedCharacters.slice(0, 4).map((char) => (
                        <span
                          key={char}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-300"
                        >
                          {char}
                        </span>
                      ))}
                      {entry.associatedCharacters.length > 4 && (
                        <span className="text-[10px] text-zinc-500 font-mono">
                          +{entry.associatedCharacters.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Canonical Capabilities List */}
                <div className="flex flex-col gap-1.5 my-3">
                  <span className="text-xs font-bold text-zinc-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-red-400" />
                    <span>Canonical Capabilities:</span>
                  </span>
                  <ul className="text-xs text-zinc-400 flex flex-col gap-1 pl-1">
                    {entry.canonicalCapabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Known Limitations / Distinctions */}
                <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/30 flex items-start gap-2.5 mt-2">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-zinc-400 leading-relaxed">
                    <strong className="text-red-300 font-semibold block mb-0.5">
                      Limitations &amp; Distinctions:
                    </strong>
                    {entry.limitations.join(' ')}
                  </div>
                </div>
              </div>

              {/* Inspect Button Footer */}
              <div className="mt-5 pt-3 border-t border-zinc-900/90 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500">
                  Interactive Dōjutsu Model
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenInspector(entry)}
                  className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Live SVG</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 rounded-2xl bg-[#0b0916] border border-[#231e33] flex flex-col items-center text-center gap-4 my-6">
          <div className="p-4 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-500">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">
              No Dōjutsu Found Matching Your Criteria
            </h4>
            <p className="text-xs text-zinc-400 max-w-md mt-1">
              No entries match query &ldquo;{searchQuery}&rdquo; within category &ldquo;
              {selectedCategory}&rdquo; and character &ldquo;{selectedCharacter}&rdquo;.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetFilters}
            className="mt-2 text-xs"
          >
            Clear Search &amp; Filter Criteria
          </Button>
        </div>
      )}

      {/* Interactive Eye Inspector Modal */}
      {inspectingEntry && (
        <Modal
          isOpen={true}
          onClose={() => setInspectingEntry(null)}
          title={`DŌJUTSU INSPECTOR: ${inspectingEntry.name.toUpperCase()}`}
          maxWidth="2xl"
        >
          <div className="flex flex-col items-center gap-6 p-2">
            {/* Live Interactive Eye Render */}
            <div className="relative w-64 h-64 flex items-center justify-center p-4 rounded-2xl bg-black/60 border border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
              {renderLiveEye(inspectingEntry.eyeComponentId, {
                size: 210,
                pupilScale: modalPupilScale,
                glowIntensity: modalGlow,
                rotationSpeed: modalRotationSpeed,
                isAwakened: modalAwakened,
              })}
            </div>

            {/* Live Inspection Controls */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
              <Slider
                label="Pupil Dilation Scale"
                min={0.8}
                max={1.3}
                step={0.05}
                value={modalPupilScale}
                onChange={setModalPupilScale}
                formatValue={(v) => `${v.toFixed(2)}x`}
              />

              <Slider
                label="Resonance Glow Intensity"
                min={0.2}
                max={1.0}
                step={0.05}
                value={modalGlow}
                onChange={setModalGlow}
                formatValue={(v) => `${Math.round(v * 100)}%`}
              />

              <Slider
                label="Orbital Rotation Speed"
                min={0}
                max={12}
                step={1}
                value={modalRotationSpeed}
                onChange={setModalRotationSpeed}
                formatValue={(v) => `${v} rad/s`}
              />

              <div className="flex items-center justify-between p-2">
                <Toggle
                  label="Awakened State"
                  checked={modalAwakened}
                  onChange={setModalAwakened}
                />
              </div>
            </div>

            {/* Quick Lore & Actions */}
            <div className="w-full flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>{inspectingEntry.categoryBadge.replace(/&bull;/g, '•')}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setInspectingEntry(null)}
              >
                Close Inspector (Esc)
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
