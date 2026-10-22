import React, { useState } from 'react';
import type { ViewType } from '../../types';
import { Button } from '../common/Button';
import { ParticleField } from '../canvas/ParticleField';
import { DojutsuCompendium } from './DojutsuCompendium';
import { BookOpen, Scroll, Shield, Eye, Flame, ArrowLeft } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';
import { cn } from '../../utils/cn';

interface LibraryViewProps {
  onNavigate: (view: ViewType) => void;
}

type TabType = 'compendium' | 'stone-tablet' | 'lineage';

export const LibraryView: React.FC<LibraryViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>('compendium');
  const [decryptionTier, setDecryptionTier] = useState<1 | 2 | 3>(1);

  const handleTabChange = (tab: TabType) => {
    audioEngine.playActivation();
    setActiveTab(tab);
  };

  const handleDecryptionChange = (tier: 1 | 2 | 3) => {
    if (tier === 3) {
      audioEngine.playShinraTensei();
    } else {
      audioEngine.playActivation();
    }
    setDecryptionTier(tier);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col p-6 md:p-10 select-none">
      <ParticleField
        palette={['#e61919', '#9333ea', '#3b82f6', '#1e1b2e', '#09090f']}
        count={160}
        speedMultiplier={0.7}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#231e33] pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800/60 text-red-400 shadow-[0_0_15px_rgba(230,25,25,0.3)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-wider">
                UCHIHA CLAN CODEX // 秘伝書
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">
                Searchable compendium of legendary dōjutsu, stone tablet records, and ancestral chronicles.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              audioEngine.playActivation();
              onNavigate('landing');
            }}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Gateways
          </Button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-[#1d1929] pb-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => handleTabChange('compendium')}
            className={cn(
              'px-4 py-2 rounded-lg text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
              activeTab === 'compendium'
                ? 'bg-red-950/70 text-red-300 border border-red-800/70 shadow-[0_0_12px_rgba(230,25,25,0.4)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
            )}
          >
            <Eye className="w-4 h-4" />
            <span>Dōjutsu Compendium (8 Eyes)</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('stone-tablet')}
            className={cn(
              'px-4 py-2 rounded-lg text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
              activeTab === 'stone-tablet'
                ? 'bg-red-950/70 text-red-300 border border-red-800/70 shadow-[0_0_12px_rgba(230,25,25,0.4)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
            )}
          >
            <Scroll className="w-4 h-4" />
            <span>Naka Shrine Stone Tablet</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('lineage')}
            className={cn(
              'px-4 py-2 rounded-lg text-xs font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
              activeTab === 'lineage'
                ? 'bg-red-950/70 text-red-300 border border-red-800/70 shadow-[0_0_12px_rgba(230,25,25,0.4)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
            )}
          >
            <Shield className="w-4 h-4" />
            <span>Curse of Hatred &amp; Lineage</span>
          </button>
        </div>

        {/* Tab 1: Dōjutsu Compendium */}
        {activeTab === 'compendium' && <DojutsuCompendium />}

        {/* Tab 2: Naka Shrine Stone Tablet */}
        {activeTab === 'stone-tablet' && (
          <div className="flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-[#0d0c17] border border-[#252035] flex flex-col gap-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Scroll className="w-5 h-5 text-red-400" />
                <span>The Stone Tablet of Naka Shrine (南賀神社の石碑)</span>
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Inscribed by Hagoromo Otsutsuki (The Sage of the Six Paths) to warn Indra&apos;s descendants.
                The text is cryptographically shielded and requires escalating tiers of dōjutsu to decipher.
                Unbeknownst to the Uchiha clan, Black Zetsu secretly altered its contents to manipulate Madara into casting the Infinite Tsukuyomi.
              </p>

              {/* Decryption Tier Selector */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-mono text-zinc-400 mr-2">Decryption Level:</span>
                <button
                  type="button"
                  onClick={() => handleDecryptionChange(1)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer',
                    decryptionTier === 1
                      ? 'bg-red-900/80 text-white border border-red-500'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  )}
                >
                  [Tier 1: 3-Tomoe Sharingan]
                </button>
                <button
                  type="button"
                  onClick={() => handleDecryptionChange(2)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer',
                    decryptionTier === 2
                      ? 'bg-red-700/80 text-white border border-red-400'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  )}
                >
                  [Tier 2: Mangekyō]
                </button>
                <button
                  type="button"
                  onClick={() => handleDecryptionChange(3)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer',
                    decryptionTier === 3
                      ? 'bg-purple-900/80 text-white border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  )}
                >
                  [Tier 3: Rinnegan]
                </button>
              </div>
            </div>

            {/* Decrypted Translation Container */}
            <div className="p-8 rounded-2xl bg-[#0a0814] border border-[#231b36] flex flex-col gap-4 font-serif">
              {decryptionTier === 1 && (
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-mono text-red-400 font-bold">
                    [UNLOCKED VIA 3-TOMOE SHARINGAN]
                  </span>
                  <p className="italic text-zinc-200">
                    &ldquo;In the beginning, the God Tree bore fruit, and from it sprang the sovereign chakra that bound all flesh... When the heavens weep, seek the stone beneath the shrine to uncover the cycle of Indra and Ashura.&rdquo;
                  </p>
                  <p className="text-xs text-zinc-400 font-sans">
                    Provides foundational history regarding the Sage of the Six Paths, the Ten-Tails, and the divergence of the Senju and Uchiha clans.
                  </p>
                </div>
              )}

              {decryptionTier === 2 && (
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-mono text-red-400 font-bold">
                    [UNLOCKED VIA MANGEKYŌ SHARINGAN]
                  </span>
                  <p className="italic text-zinc-200">
                    &ldquo;One who possesses the Kaleidoscope shall find that when two powers of opposing polarity cooperate, true happiness is attained. Yet the gaze dims unless sealed by fraternal light...&rdquo;
                  </p>
                  <p className="text-xs text-zinc-400 font-sans">
                    Reveals the tragic secret of blindness, the necessity of the Eternal Mangekyō, and the existence of the colossal Demonic Statue of the Outer Path (Gedō Mazō).
                  </p>
                </div>
              )}

              {decryptionTier === 3 && (
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-mono text-purple-400 font-bold">
                    [UNLOCKED VIA SIX PATHS RINNEGAN]
                  </span>
                  <p className="italic text-purple-200 font-medium">
                    &ldquo;When the bearer of the Rinnegan approaches the moon, the divine infinite dream blooms upon the heavens, granting salvation to all living flesh...&rdquo;
                  </p>
                  <p className="text-xs text-purple-300/80 font-sans">
                    (Tampered by Black Zetsu to trick Madara into activating the Infinite Tsukuyomi and reviving Kaguya Otsutsuki).
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Lineage & Philosophy */}
        {activeTab === 'lineage' && (
          <div className="p-8 rounded-2xl bg-[#0f0d1a] border border-[#251f38] flex flex-col gap-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-red-500" />
              <span>The Curse of Hatred vs. The Will of Fire</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              Second Hokage Tobirama Senju noted that the Uchiha are not driven by hostility, but by the deepest capacity for love among all shinobi. When an Uchiha loses the object of their love, their grief transforms into an overwhelming darkness: the &ldquo;Curse of Hatred&rdquo;, focusing intense ocular chakra that awakens their visual prowess.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40">
                <h4 className="text-xs font-bold text-red-300 uppercase">Indra Otsutsuki&apos;s Path</h4>
                <p className="text-xs text-zinc-400 mt-1 font-sans">
                  Believed power alone was the key to peace. Reincarnated through Madara Uchiha and Sasuke Uchiha.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
                <h4 className="text-xs font-bold text-emerald-300 uppercase">The Shadow Guardians</h4>
                <p className="text-xs text-zinc-400 mt-1 font-sans">
                  Kagami, Shisui, and Itachi transcended the clan&apos;s narrow boundaries to preserve the peace of the entire village from within the shadows.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
