import React, { useState } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { Slider } from './Slider';
import { Toggle } from './Toggle';
import { Button } from './Button';
import { audioEngine } from '../../utils/audioEngine';
import { Volume2, VolumeX, Sparkles, Play, Square, RotateCcw } from 'lucide-react';

export const SettingsPanel: React.FC = () => {
  const {
    settings,
    toggleMute,
    setVolume,
    setVisualIntensity,
    setReducedMotion,
    setImmersive,
    resetSettings,
  } = useSettings();

  const [isChibakuPlaying, setIsChibakuPlaying] = useState(false);

  const handleChibakuToggle = () => {
    if (isChibakuPlaying) {
      audioEngine.stopChibakuTensei();
      setIsChibakuPlaying(false);
    } else {
      audioEngine.startChibakuTensei();
      setIsChibakuPlaying(true);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-zinc-200">
      {/* Audio Engine Section */}
      <section className="flex flex-col gap-4 p-4 rounded-lg bg-[#14121f] border border-[#262035]">
        <div className="flex items-center gap-2 border-b border-[#231d30] pb-2 text-sm font-semibold tracking-wider text-red-400">
          {settings.muted ? (
            <VolumeX className="w-4 h-4 text-zinc-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-red-500" />
          )}
          <span>AUDIO ENGINE (SYNTHESIZER)</span>
        </div>

        <Toggle
          label="Mute All Audio"
          checked={settings.muted}
          onChange={toggleMute}
          description="Silences Web Audio API procedural synthesis."
        />

        <Slider
          label="Master Volume"
          value={settings.volume}
          min={0}
          max={1}
          step={0.05}
          unit="%"
          onChange={setVolume}
          disabled={settings.muted}
          description="Feeds into dynamics compressor (max master gain 0.6)."
        />

        {/* Synthesizer Preview Triggers */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[#1e192a]">
          <span className="text-xs font-semibold text-zinc-400">Jutsu Sound Synthesizer Test:</span>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => audioEngine.playActivation()}
              disabled={settings.muted}
              icon={<Play className="w-3 h-3" />}
            >
              Activation Chime
            </Button>
            <Button
              size="sm"
              variant="crimson"
              onClick={() => audioEngine.playTsukuyomi()}
              disabled={settings.muted}
              icon={<Play className="w-3 h-3" />}
            >
              Tsukuyomi Drone
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => audioEngine.playAmaterasu()}
              disabled={settings.muted}
              icon={<Play className="w-3 h-3" />}
            >
              Amaterasu Crackle
            </Button>
            <Button
              size="sm"
              variant="purple"
              onClick={() => audioEngine.playShinraTensei()}
              disabled={settings.muted}
              icon={<Play className="w-3 h-3" />}
            >
              Shinra Tensei
            </Button>
          </div>

          <div className="pt-1">
            <Button
              size="sm"
              variant={isChibakuPlaying ? 'crimson' : 'outline'}
              className="w-full"
              onClick={handleChibakuToggle}
              disabled={settings.muted}
              icon={
                isChibakuPlaying ? (
                  <Square className="w-3 h-3 text-red-300" />
                ) : (
                  <Play className="w-3 h-3" />
                )
              }
            >
              {isChibakuPlaying
                ? 'Stop Chibaku Tensei Rumble'
                : 'Start Chibaku Tensei Rumble (6s LFO Ramp)'}
            </Button>
          </div>
        </div>
      </section>

      {/* Visual & Rendering Section */}
      <section className="flex flex-col gap-4 p-4 rounded-lg bg-[#14121f] border border-[#262035]">
        <div className="flex items-center gap-2 border-b border-[#231d30] pb-2 text-sm font-semibold tracking-wider text-purple-400">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>VISUAL RENDERING & CHAKRA FX</span>
        </div>

        <Slider
          label="Visual Intensity"
          value={settings.visualIntensity}
          min={0.25}
          max={1.0}
          step={0.05}
          unit="%"
          variant="purple"
          onChange={setVisualIntensity}
          description="Controls particle count, ambient sparks, and glow emission."
        />

        <Toggle
          label="Reduced Motion"
          checked={settings.reducedMotion}
          onChange={setReducedMotion}
          variant="purple"
          description="Stops high-speed eye rotations, particle drift storms, and camera shakes."
        />

        <Toggle
          label="Immersive Mode"
          checked={settings.immersive}
          onChange={setImmersive}
          variant="purple"
          description="Full-screen cinematic canvas with auto-hiding HUD after 3 seconds of inactivity."
        />
      </section>

      {/* Reset */}
      <div className="flex justify-between items-center pt-2">
        <span className="text-xs text-zinc-500">Persisted locally in browser storage</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            if (isChibakuPlaying) {
              audioEngine.stopChibakuTensei();
              setIsChibakuPlaying(false);
            }
            resetSettings();
          }}
          icon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};
