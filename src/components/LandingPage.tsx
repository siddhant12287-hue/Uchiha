import React from 'react';
import type { ViewType, CharacterId } from '../types';
import { CHARACTER_GATEWAYS } from '../data/characters';
import { MasterMandala } from './eyes/MasterMandala';
import { ShisuiMangekyo } from './eyes/ShisuiMangekyo';
import { ItachiMangekyo } from './eyes/ItachiMangekyo';
import { MadaraEternalMangekyo } from './eyes/MadaraEternalMangekyo';
import { Rinnegan } from './eyes/Rinnegan';
import { ParticleField } from './canvas/ParticleField';
import { Button } from './common/Button';
import { audioEngine } from '../utils/audioEngine';
import { Eye, BookOpen, Sliders, Sparkles, ArrowRight } from 'lucide-react';

export interface LandingPageProps {
  onNavigate: (view: ViewType) => void;
  onOpenSettingsModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenSettingsModal,
}) => {
  const handleSelectGateway = (id: CharacterId) => {
    audioEngine.playActivation();
    onNavigate(id as ViewType);
  };

  const renderMiniEye = (id: CharacterId) => {
    switch (id) {
      case 'shisui':
        return <ShisuiMangekyo size={84} rotationSpeed={6} glowIntensity={0.8} />;
      case 'itachi':
        return <ItachiMangekyo size={84} rotationSpeed={7} glowIntensity={0.8} />;
      case 'madara':
        return <MadaraEternalMangekyo size={84} rotationSpeed={8} glowIntensity={0.85} />;
      case 'nagato':
        return <Rinnegan size={84} glowIntensity={0.8} />;
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-start overflow-hidden px-6 py-12 select-none">
      {/* Ambient Crimson Chakra Particle Field */}
      <ParticleField
        palette={['#e61919', '#b31217', '#ff3333', '#800000', '#1c152b']}
        count={280}
        drift="up"
        speedMultiplier={0.85}
      />

      {/* Main Hero Section */}
      <section className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center gap-6 mt-4 mb-10">
        {/* Japanese Clan Seal Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/60 text-red-300 text-xs font-mono font-semibold tracking-widest shadow-[0_0_15px_rgba(230,25,25,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-red-400" />
          <span>宇智波一族 · SACRED OCULAR REALM</span>
        </div>

        {/* Animated Main Title */}
        <div className="flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-[0_0_35px_rgba(230,25,25,0.45)]">
            UCHIHA REALM
          </h1>
          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-zinc-400 mt-2">
            The Chronicle of Heavenly Dojutsu & Awakening
          </p>
        </div>

        {/* Master Dojutsu Spinning Mandala */}
        <div
          onClick={() => audioEngine.playActivation()}
          className="my-3 cursor-pointer group relative p-4 transition-transform duration-500 hover:scale-105"
          title="Click to resonate chakra"
        >
          <div className="absolute inset-0 rounded-full bg-red-600/10 filter blur-2xl group-hover:bg-red-600/20 transition-all" />
          <MasterMandala size={280} isAwakened={true} />
        </div>

        <p className="text-xs md:text-sm text-zinc-400 max-w-xl leading-relaxed">
          Traverse the dimensional boundaries of the four fateful wielders who bent destiny through the power of ocular awakening. Select a gateway below to step into their sacred domain.
        </p>

        {/* Secondary Navigation Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              audioEngine.playActivation();
              onNavigate('eye-gallery');
            }}
            icon={<Eye className="w-4 h-4 text-red-400" />}
          >
            Dojutsu Inspector Gallery
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              audioEngine.playActivation();
              onNavigate('library');
            }}
            icon={<BookOpen className="w-4 h-4 text-purple-400" />}
          >
            Clan Archives (Codex)
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              audioEngine.playActivation();
              onOpenSettingsModal();
            }}
            icon={<Sliders className="w-4 h-4" />}
          >
            Preferences
          </Button>
        </div>
      </section>

      {/* Character Gateway Cards (4 Cards Grid) */}
      <section className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {CHARACTER_GATEWAYS.map((gateway) => (
          <div
            key={gateway.id}
            tabIndex={0}
            role="button"
            aria-label={`Enter ${gateway.name}'s realm`}
            onClick={() => handleSelectGateway(gateway.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSelectGateway(gateway.id);
              }
            }}
            className="group relative flex flex-col items-center p-6 rounded-2xl bg-[#0e0d17]/85 border border-[#252035] hover:border-red-500/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(230,25,25,0.3)] hover:-translate-y-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 text-center"
          >
            {/* Subtle Top Accent Glow */}
            <div
              className="absolute top-0 left-1/4 right-1/4 h-[2px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: gateway.accentColor }}
            />

            {/* Kanji Top Header */}
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 group-hover:text-zinc-300 font-semibold mb-2">
              {gateway.kanji}
            </span>

            {/* Mini Eye Preview */}
            <div className="w-24 h-24 my-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              {renderMiniEye(gateway.id)}
            </div>

            {/* Character Name & Epithet */}
            <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-red-400 transition-colors">
              {gateway.name}
            </h3>
            <span className="text-xs font-medium text-zinc-400 mt-0.5">
              {gateway.epithet}
            </span>

            {/* Dojutsu Name Badge */}
            <span
              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full mt-2 border"
              style={{
                color: gateway.accentColor,
                borderColor: `${gateway.accentColor}50`,
                backgroundColor: `${gateway.accentColor}15`,
              }}
            >
              {gateway.dojutsuName}
            </span>

            {/* Short Tagline */}
            <p className="text-xs text-zinc-400 leading-relaxed mt-3 line-clamp-3">
              {gateway.tagline}
            </p>

            {/* Gateway Enter Prompt */}
            <div className="mt-4 pt-3 border-t border-[#1e192c] w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors">
              <span>Enter Gateway</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
