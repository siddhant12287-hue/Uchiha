import React, { useState } from 'react';
import { Sharingan } from './Sharingan';
import { ShisuiMangekyo } from './ShisuiMangekyo';
import { ItachiMangekyo } from './ItachiMangekyo';
import { MadaraEternalMangekyo } from './MadaraEternalMangekyo';
import { Rinnegan } from './Rinnegan';
import { RinneSharingan } from './RinneSharingan';
import { Byakugan } from './Byakugan';
import { MasterMandala } from './MasterMandala';
import { Slider } from '../common/Slider';
import { Toggle } from '../common/Toggle';
import { Button } from '../common/Button';
import { audioEngine } from '../../utils/audioEngine';
import { Sparkles, Play, Eye, RotateCw } from 'lucide-react';

interface EyeDef {
  id: string;
  name: string;
  japanese: string;
  wielder: string;
  type: string;
  description: string;
  techniques: string[];
  defaultSpeed: number;
}

const EYE_DEFINITIONS: EyeDef[] = [
  {
    id: 'sharingan',
    name: 'Sharingan (写輪眼)',
    japanese: 'Copy Wheel Eye',
    wielder: 'Uchiha Clan',
    type: 'Base Dojutsu',
    description:
      'The initial dojutsu awakened through intense emotional trauma or resolution. Grants chakra perception, movement precognition, and hypnotic genjutsu casting.',
    techniques: ['Chakra Color Perception', 'Taijutsu Copying', 'Hypnotic Genjutsu'],
    defaultSpeed: 14,
  },
  {
    id: 'shisui',
    name: 'Shisui Mangekyo (シスイ)',
    japanese: 'Four-Point Pinwheel',
    wielder: 'Shisui Uchiha',
    type: 'Mangekyo Sharingan',
    description:
      'Flared four-pointed pinwheel design. Awakened through deep personal devotion and tragedy, housing the legendary undetectable mind control technique.',
    techniques: ['Kotoamatsukami (Supreme Genjutsu)', 'Body Flicker Clone Feints'],
    defaultSpeed: 8,
  },
  {
    id: 'itachi',
    name: 'Itachi Mangekyo (イタチ)',
    japanese: 'Three Curved Scythes',
    wielder: 'Itachi Uchiha',
    type: 'Mangekyo Sharingan',
    description:
      'Three graceful curved scythes sweeping outward from the central pupil. Awakened by witnessing the demise of Shisui Uchiha.',
    techniques: ['Tsukuyomi (Lunar Illusion)', 'Amaterasu (Black Flames)', 'Totsuka Susanoo'],
    defaultSpeed: 10,
  },
  {
    id: 'madara',
    name: 'Madara Eternal Mangekyo (マダラ)',
    japanese: 'Interlocking Eternal Seal',
    wielder: 'Madara Uchiha',
    type: 'Eternal Mangekyo',
    description:
      'Double-layered interlocking geometric scythe and circle pattern forged by transplanting his brother Izuna\'s Mangekyo, overcoming all ocular deterioration.',
    techniques: ['Perfect Susanoo', 'Nine-Tails Subjugation', 'Tengai Shinsei Link'],
    defaultSpeed: 12,
  },
  {
    id: 'rinnegan',
    name: 'Six Paths Rinnegan (輪廻眼)',
    japanese: 'Samsara Eye',
    wielder: 'Nagato / Madara / Hagoromo',
    type: 'Divine Dojutsu',
    description:
      'Characterized by six concentric ripple rings across a deep purple iris. The exalted visual prowess said to create or destroy all creation.',
    techniques: ['Shinra Tensei (Almighty Push)', 'Bansho Ten\'in', 'Chibaku Tensei', 'Outer Path'],
    defaultSpeed: 0,
  },
  {
    id: 'rinnesharingan',
    name: 'Rinne Sharingan (輪廻写輪眼)',
    japanese: 'Origin Flower of the Moon',
    wielder: 'Kaguya Otsutsuki / Madara',
    type: 'Primordial Eye',
    description:
      'A blood-red manifestation featuring 6 concentric rings and 9 distinct tomoe in three concentric trios. Manifests the Infinite Tsukuyomi and Amenominaka dimensions.',
    techniques: ['Infinite Tsukuyomi', 'Amenominaka (Dimension Shift)', 'God: Nativity of a World of Trees'],
    defaultSpeed: 16,
  },
  {
    id: 'byakugan',
    name: 'Byakugan (白眼)',
    japanese: 'All-Seeing White Eye',
    wielder: 'Hyuga Clan / Otsutsuki Clan',
    type: 'Three Great Dojutsu',
    description:
      'Pale lavender-white iris with faint pupil ring and distinctive bulging chakra veins upon awakening. Grants near 360-degree vision and penetration of the tenketsu system.',
    techniques: ['Gentle Fist (Juken)', 'Tenketsu Perception', '360° Near-Omniscient Sight'],
    defaultSpeed: 0,
  },
];

export const EyeGallery: React.FC = () => {
  const [selectedEyeId, setSelectedEyeId] = useState<string>('sharingan');
  const [size, setSize] = useState<number>(200);
  const [pupilScale, setPupilScale] = useState<number>(1.0);
  const [glowIntensity, setGlowIntensity] = useState<number>(0.75);
  const [rotationSpeed, setRotationSpeed] = useState<number>(10);
  const [isAwakened, setIsAwakened] = useState<boolean>(false);
  const [tomoeCount, setTomoeCount] = useState<1 | 2 | 3>(3);

  const selectedDef = EYE_DEFINITIONS.find((e) => e.id === selectedEyeId) || EYE_DEFINITIONS[0];

  const handleSelectEye = (id: string) => {
    audioEngine.playActivation();
    setSelectedEyeId(id);
    const def = EYE_DEFINITIONS.find((e) => e.id === id);
    if (def) {
      setRotationSpeed(def.defaultSpeed);
    }
    if (id === 'itachi') {
      setSize(400);
    }
  };

  const handleAwakenToggle = () => {
    audioEngine.playActivation();
    setIsAwakened((prev) => !prev);
  };

  const renderEyeComponent = (id: string, customSize?: number) => {
    const s = customSize || size;
    switch (id) {
      case 'sharingan':
        return (
          <Sharingan
            size={s}
            pupilScale={pupilScale}
            glowIntensity={glowIntensity}
            rotationSpeed={rotationSpeed}
            isAwakened={isAwakened}
            tomoeCount={tomoeCount}
          />
        );
      case 'shisui':
        return (
          <ShisuiMangekyo
            size={s}
            pupilScale={pupilScale}
            glowIntensity={glowIntensity}
            rotationSpeed={rotationSpeed}
            isAwakened={isAwakened}
          />
        );
      case 'itachi':
        return (
          <ItachiMangekyo
            size={s}
            pupilScale={pupilScale}
            glowIntensity={glowIntensity}
            rotationSpeed={rotationSpeed}
            isAwakened={isAwakened}
          />
        );
      case 'madara':
        return (
          <MadaraEternalMangekyo
            size={s}
            pupilScale={pupilScale}
            glowIntensity={glowIntensity}
            rotationSpeed={rotationSpeed}
            isAwakened={isAwakened}
          />
        );
      case 'rinnegan':
        return (
          <Rinnegan
            size={s}
            pupilScale={pupilScale}
            glowIntensity={glowIntensity}
            rotationSpeed={rotationSpeed}
            isAwakened={isAwakened}
          />
        );
      case 'rinnesharingan':
        return (
          <RinneSharingan
            size={s}
            pupilScale={pupilScale}
            glowIntensity={glowIntensity}
            rotationSpeed={rotationSpeed}
            isAwakened={isAwakened}
          />
        );
      case 'byakugan':
        return (
          <Byakugan
            size={s}
            pupilScale={pupilScale}
            glowIntensity={glowIntensity}
            rotationSpeed={rotationSpeed}
            isAwakened={isAwakened}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-[#231e33] pb-4">
        <div className="flex items-center gap-2">
          <Eye className="w-6 h-6 text-red-500" />
          <h1 className="text-2xl font-black tracking-wider text-white">DOJUTSU OCULAR GALLERY</h1>
          <span className="text-xs px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/60 font-mono font-semibold">
            INSPECTOR MODE
          </span>
        </div>
        <p className="text-sm text-zinc-400">
          Real-time SVG Dojutsu laboratory. Test SVG vector geometry, gradient stops, feGaussianBlur glow filters, and rotation math.
        </p>
      </div>

      {/* Main Showcase & Live Controls Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center Viewport (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 rounded-2xl bg-[#0c0b14]/90 border border-[#231e33] shadow-[0_0_40px_rgba(0,0,0,0.8)] relative min-h-[440px]">
          {/* Ambient background grid lines */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none rounded-2xl"
            style={{
              backgroundImage:
                'radial-gradient(#ff3333 1px, transparent 1px), radial-gradient(#8b5cf6 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px',
            }}
          />

          {/* Awakened Status Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isAwakened
                  ? 'bg-red-500 shadow-[0_0_10px_#ff2222] animate-ping'
                  : 'bg-zinc-600'
              }`}
            />
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              {isAwakened ? 'Awakened State' : 'Dormant State'}
            </span>
          </div>

          {/* Quick Sound Buttons on Stage */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5">
            <Button
              size="sm"
              variant="outline"
              onClick={() => audioEngine.playActivation()}
              icon={<Play className="w-3 h-3 text-red-400" />}
            >
              Chime
            </Button>
            <Button
              size="sm"
              variant="crimson"
              onClick={() => audioEngine.playTsukuyomi()}
              icon={<Play className="w-3 h-3 text-white" />}
            >
              Genjutsu
            </Button>
          </div>

          {/* Render Active Eye */}
          <div className="my-auto transition-transform duration-300">
            {renderEyeComponent(selectedEyeId)}
          </div>

          {/* Eye Title & Specs below stage */}
          <div className="w-full mt-6 pt-4 border-t border-[#1b1728] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-base font-bold text-white tracking-wide">
                {selectedDef.name}
              </span>
              <span className="text-xs text-zinc-400">{selectedDef.wielder}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={isAwakened ? 'crimson' : 'outline'}
                onClick={handleAwakenToggle}
                icon={<Sparkles className="w-3.5 h-3.5" />}
              >
                {isAwakened ? 'Revert Awakening' : 'Trigger Awaken'}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Controls Panel (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5 p-6 rounded-2xl bg-[#110f1c] border border-[#231e33] shadow-lg">
          <h2 className="text-sm font-bold tracking-wider text-red-400 uppercase flex items-center gap-2">
            <RotateCw className="w-4 h-4" />
            <span>Interactive Eye Parameters</span>
          </h2>

          {/* Live Sliders */}
          <Slider
            label="Eye Scale (Size)"
            value={size}
            min={100}
            max={480}
            step={10}
            unit="px"
            formatValue={(v) => `${v}px`}
            onChange={setSize}
            description="Scales the SVG bounding box and internal viewBox ratios (400px verification standard)."
          />

          <Slider
            label="Pupil Scale"
            value={pupilScale}
            min={0.5}
            max={1.8}
            step={0.05}
            formatValue={(v) => `${v.toFixed(2)}x`}
            onChange={setPupilScale}
            description="Adjusts pupil diameter and focal convergence."
          />

          <Slider
            label="Glow Intensity"
            value={glowIntensity}
            min={0}
            max={1.0}
            step={0.05}
            formatValue={(v) => `${Math.round(v * 100)}%`}
            onChange={setGlowIntensity}
            description="Modulates SVG feGaussianBlur and feFuncA slope."
          />

          <Slider
            label="Rotation Speed (Period)"
            value={rotationSpeed}
            min={0}
            max={25}
            step={1}
            formatValue={(v) => (v === 0 ? 'Stationary (0s)' : `${v}s / rev`)}
            onChange={setRotationSpeed}
            description="Seconds per revolution (0 stops rotation entirely)."
          />

          {/* Sharingan Specific Tomoe Count Switcher */}
          {selectedEyeId === 'sharingan' && (
            <div className="flex flex-col gap-2 pt-2 border-t border-[#1e192a]">
              <span className="text-xs font-semibold text-zinc-300">Sharingan Tomoe Stage:</span>
              <div className="grid grid-cols-3 gap-2">
                {([1, 2, 3] as const).map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => {
                      audioEngine.playActivation();
                      setTomoeCount(count);
                    }}
                    className={`py-1.5 px-3 rounded text-xs font-bold transition-all ${
                      tomoeCount === count
                        ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(230,25,25,0.6)]'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    {count} Tomoe
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-[#1e192a]">
            <Toggle
              label="Awakened State"
              checked={isAwakened}
              onChange={setIsAwakened}
              description="Empowers glow filter amplitude and rotation rate."
            />
          </div>
        </div>
      </div>

      {/* Eye Selector Strip */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
          Select Eye to Inspect:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {EYE_DEFINITIONS.map((def) => {
            const isSelected = def.id === selectedEyeId;
            return (
              <button
                key={def.id}
                type="button"
                onClick={() => handleSelectEye(def.id)}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2.5 transition-all text-center group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                  isSelected
                    ? 'bg-[#1e1428] border-red-500 shadow-[0_0_20px_rgba(230,25,25,0.4)]'
                    : 'bg-[#100e19] border-[#221c2e] hover:border-zinc-700 hover:bg-[#151221]'
                }`}
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  {renderEyeComponent(def.id, 64)}
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-xs font-bold tracking-wide ${
                      isSelected ? 'text-red-400' : 'text-zinc-300 group-hover:text-white'
                    }`}
                  >
                    {def.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-zinc-500">{def.type}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 400px Verification Showcase against Anime Reference */}
      {selectedEyeId === 'itachi' && (
        <div className="p-8 rounded-2xl bg-[#0e0c18] border border-red-900/50 flex flex-col gap-6 shadow-[0_0_50px_rgba(200,0,0,0.2)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#231a2c] pb-4">
            <div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 font-bold uppercase">
                400px Pixel-Accurate Verification
              </span>
              <h3 className="text-lg font-bold text-white tracking-wide mt-1">
                Itachi Mangekyo Side-by-Side Reference Calibration
              </h3>
            </div>
            <div className="text-xs text-zinc-400 font-mono">
              ViewBox: 200×200 | Render: 400×400px
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center">
            {/* 400px Rebuilt SVG Eye */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs font-bold tracking-wider text-red-400 uppercase">
                Rendered SVG (400px Canvas)
              </span>
              <div className="p-4 rounded-2xl bg-[#060609] border border-zinc-800 flex items-center justify-center">
                <ItachiMangekyo
                  size={400}
                  pupilScale={pupilScale}
                  glowIntensity={glowIntensity}
                  rotationSpeed={rotationSpeed}
                  isAwakened={isAwakened}
                />
              </div>
            </div>

            {/* Anime Screenshot Reference */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                Anime Screenshot Reference
              </span>
              <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-md max-w-[400px]">
                <img
                  src="/reference/itachi-ref.png"
                  alt="Itachi Mangekyo Anime Reference"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Geometric Spec Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-4 border-t border-[#231a2c]">
            <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
              <span className="font-bold text-red-400 block mb-1">Outer Black Ring</span>
              <span className="text-zinc-400">Radius 100 down to 94 (thickness 6 units).</span>
            </div>
            <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
              <span className="font-bold text-red-400 block mb-1">Iris Gradient</span>
              <span className="text-zinc-400">#c80000 (center) → #a00000 (80%) → #7a0000 (edge).</span>
            </div>
            <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
              <span className="font-bold text-red-400 block mb-1">Pupil & Hub Ring</span>
              <span className="text-zinc-400">Pupil r=13 (0.8x-1.3x), red ring r=13-18, hub r=18-26.</span>
            </div>
            <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
              <span className="font-bold text-red-400 block mb-1">Curved Scythe Blades</span>
              <span className="text-zinc-400">120° spacing, max width 26 at 40%, sharp tip at r=80.</span>
            </div>
          </div>
        </div>
      )}

      {/* Lore & Canonical Techniques Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-[#0f0e1a] border border-[#231e33]">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">
            Canonical Lore: {selectedDef.name}
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed">{selectedDef.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider">
            Awakened Techniques
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedDef.techniques.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-md bg-purple-950/40 border border-purple-800/50 text-purple-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bonus: Master Mandala Preview Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl bg-gradient-to-r from-[#110d1c] via-[#140e1f] to-[#120a16] border border-[#2b223c]">
        <div className="shrink-0">
          <MasterMandala size={160} isAwakened={isAwakened} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 font-bold">
              PORTAL MANDALA
            </span>
            <h3 className="text-base font-bold text-white tracking-wide">
              Master Dojutsu Sacred Geometry
            </h3>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Multi-tiered counter-rotating chakra mandala synthesized from all six ocular lineages.
            Anchors the landing page portal with clockwise outer ripples and counter-clockwise inner tomoe rings.
          </p>
        </div>
      </div>
    </div>
  );
};
