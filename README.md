# UCHIHA REALM // 宇智波一族

> **Interactive Anime Dōjutsu & Procedural Audio Experience**  
> *Unofficial, non-commercial fan project. Original artwork, procedural shaders, and Web Audio synthesizer inspired by the anime.*

---

## ⛩️ Project Overview

**UCHIHA REALM** is a high-performance interactive web application built without external image or audio files. All visuals are mathematically rendered via pure SVG geometry, hardware-accelerated Canvas 2D contexts, and Tailwind CSS v4 styling. All sound effects are synthesized in real-time using the browser's Web Audio API.

### Current Dev Server
- **Local URL**: [http://localhost:5173/](http://localhost:5173/)
- **Network**: Bound to local interface (Vite 7)

---

## 📦 Stack Specifications

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Node.js** | `>= 20.19.0` or `>= 22.12.0` (Verified on `v26.12.1`) | Execution runtime |
| **Vite** | `^7.3.7` | Bundler & lightning HMR dev server |
| **React** | `^19.3.1` | Core UI framework |
| **TypeScript** | `~6.0.3` (Strict Mode) | Type-safe development |
| **Tailwind CSS** | `^4.3.3` (`@tailwindcss/vite`) | Next-gen zero-config CSS framework with `@theme` |
| **Framer Motion** | `^14.6.0` | Accessible spring modals and overlays |
| **Lucide React** | `^1.61.0` | Minimalist iconography |
| **Web Audio API** | Native Browser API | Zero-file procedural sound synthesis |

---

## 🛠️ Windows Installation & Usage

Run PowerShell or Windows Terminal in the project root (`d:\Uchiha-realm`):

### 1. Install Dependencies
```powershell
npm install
```

### 2. Launch Local Development Server
```powershell
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 3. Type Checking
```powershell
npx tsc --noEmit
```

### 4. Code Quality & Linting
```powershell
npm run lint
```

### 5. Production Build
```powershell
npm run build
```
Generates optimized static artifacts in the `dist/` directory.

---

## 🌌 The Four Character Realms

### 1. Itachi Uchiha (`/itachi`)
- **Theme**: Charcoal, crimson, jet-black flames, blood-red moon lighting (`#080407` base).
- **Canvas Effects**:
  - `RavenSwarm`: Procedural crow boids flapping via sine wave with cursor repulsion and regrouping.
  - `EmberField`: Rising black and crimson embers.
  - `FlameBurst`: Bounded 500-particle pooling system for Amaterasu black flames with crimson coronas.
- **Interactions**:
  - **Awaken Eye**: Sharingan to Itachi Mangekyō transition with `playActivation()`.
  - **Tsukuyomi Dimension**: 3-second eased transition to blood-moon illusion, color inversion filter, 72:00:00 time-distortion ticker, and `playTsukuyomi()`.
  - **Amaterasu Ignition**: Click anywhere on the realm to ignite black flames with `playAmaterasu()`.
  - **Susanoo Manifestation**: Stylized skeletal ribcage SVG energy aura, Totsuka Blade, and Yata Mirror lore.
  - **Clan Lore**: Izanami loop mechanics vs. Izanagi fate rewriting clarification.

### 2. Shisui Uchiha (`/shisui`)
- **Theme**: Obsidian black, blood crimson, jade-green mirage trails (`#030a08` base).
- **Canvas Effects**:
  - `BodyFlickerCanvas`: Green and crimson speed streaks, floating chakra particles, and fading phantom afterimages generated dynamically on canvas click.
- **Interactions**:
  - **Awaken Eye**: 3-Tomoe Sharingan to Shisui Mangekyō with `playActivation()`.
  - **Body Flicker Teleport**: Click any point to propel an afterimage dash sequence directly to that coordinate.
  - **Kotoamatsukami Simulation**: ~3-second perception-distortion sequence using SVG `<feTurbulence>` and `<feDisplacementMap>` (animated scale up to 20) with chromatic aberration ($R/B$ channel offsets $\le 2.5\text{px}$) and `playTsukuyomi()` audio. Fully reversible via Escape and exit button; simple fade under `reducedMotion`.
  - **Abilities & Lore**: Shunshin no Shisui, Kotoamatsukami (10-year cooldown & subtle suggestion mechanics), and green Susanoo design.

### 3. Madara Uchiha (`/madara`)
- **Theme**: Deep violet, scarlet, obsidian, celestial electric blue (`#080714` base).
- **Canvas Effects**:
  - `MadaraChakraCanvas`: Rising blue Susanoo chakra flames, floating polygonal rock fragments, and atmospheric dust.
- **Interactions**:
  - **Tengai Shinsei**: Dual procedural meteors descending through atmospheric cloud layers with fiery trails, capped camera shake (disabled under `reducedMotion`), dual impact rumbles via `playShinraTensei()`, live $T$ ticker, cancel button, and instant replay.
  - **Limbo Hengoku**: Translucent parallel-dimension shadow clones floating with layered opacity and blur.
  - **Interactive Ocular Timeline**: Clickable 4-stage progression:
    $$\text{Sharingan} \longrightarrow \text{Eternal Mangekyō} \longrightarrow \text{Rinnegan} \longrightarrow \text{Rinne Sharingan}$$
  - **Clan & Legacy Lore**: Hashirama rivalry, Black Zetsu's tablet manipulation, Eye of the Moon plan, and Indra/Ashura chakra blending.

### 4. Nagato / Pain (`/nagato`)
- **Theme**: Metallic silver, storm grey, deep Rinnegan purple, electric violet (`#08070e` base).
- **Canvas Effects**:
  - `PainCanvas`: Continuous Amegakure storm rain streaks, floating fractured mineral debris with drag and angular rotation.
- **Interactions**:
  - **Shinra Tensei**: Concentric shockwave rings expanding outward at $1200\text{px/s}$, concussive screen flash, outward $1/r$ debris push, 5-second canon cooldown ticker, and `playShinraTensei()`.
  - **Chibaku Tensei**: Central gravity singularity core that attracts debris, grows ($24\text{px} \to 64\text{px}$) as fragments are absorbed, and recycles particles to boundary edges for constant memory footprint. Features `startChibakuTensei()` audio and an instant Stop button (`stopChibakuTensei()`).
  - **Bansho Ten'in**: Clicking anywhere on the canvas manifests an inward-collapsing purple gravitational vortex that accelerates nearby debris toward the target point.
  - **Six Paths Matrix**: Dedicated panels for Deva, Asura, Human, Animal, Preta, and Naraka Paths.
  - **The Outer Path (Gedō)**: Visually distinct sovereign panel detailing the Demonic Statue (Gedō Mazō) and Rinne Rebirth (Gedō: Rinne Tensei no Jutsu), emphasizing that the Outer Path is wielded directly by Nagato himself separate from the six proxy corpse bodies.

---

## 👁️ Dōjutsu Library & Compendium (`src/components/library/`)

A searchable, filterable compendium with 8 complete dōjutsu entries:
1. **Sharingan** (3-Tomoe Insight & Hypnotism)
2. **Mangekyō Sharingan** (Bespoke Ocular Kinjutsu & Susanoo)
3. **Eternal Mangekyō Sharingan** (Perpetual Light & Perfect Susanoo)
4. **Rinnegan** (Six Paths Technique & Sovereign Gravitation)
5. **Rinne Sharingan** (Primordial Progenitor Eye & Infinite Tsukuyomi)
6. **Byakugan** (360° Vision & Tenketsu Penetration)
7. **Tenseigan** (Lunar Genesis Solar Flower Eye & Gudōdama Mantle)
8. **Jōgan** (Pure Eye & Inter-Dimensional Rift Sight — *badged Boruto-era*)

### Compendium Features:
- **Search Query**: Real-time filtering by name, kanji, romaji, character wielder, or capability keywords.
- **Category Filter Chips**: All (8), Three Great Dōjutsu (三大瞳術), Uchiha Lineage, Transcendent, Otsutsuki, and Boruto-Era.
- **Character Wielder Selector**: Filter by specific wielders (Itachi, Madara, Sasuke, Nagato, Kakashi, Hinata, Neji, Toneri, Boruto, etc.).
- **Live Interactive SVG Inspector**: Inspect any eye in a live modal with real-time sliders for pupil scale ($0.8\times - 1.3\times$), resonance glow ($20\% - 100\%$), orbital rotation speed ($0 - 12\text{ rad/s}$), and awakened state toggle.
- **Empty State**: Friendly fallback state with a one-click button to reset all search and filter criteria.

---

## 🎬 Immersive / Cinematic Mode

- **Toggle Button**: Located in the top HUD, Settings modal, and toggled via keyboard shortcut.
- **Auto-Hiding Navigation**: After 3 seconds of cursor inactivity, the HUD smoothly translates offscreen (`-translate-y-full opacity-0`) and the canvas area expands to the full viewport (`pt-0`). Moving the mouse or pressing any key immediately restores the HUD.
- **Floating Exit Pill**: A persistent subtle exit button appears in the top-right corner whenever the HUD is hidden.
- **Browser Fullscreen Sync**: Calls `document.documentElement.requestFullscreen()` wrapped in `try/catch`. If fullscreen is denied or unsupported, cinematic hide-HUD mode still activates gracefully. Listens to `fullscreenchange` so exiting via the browser's own Escape key synchronizes UI state.
- **Accessible Toasts**: Notifies user of mode state changes via a floating banner with `role="status"` and `aria-live="polite"`.

---

## 🔊 Procedural Audio Engine (`src/utils/audioEngine.ts`)

Singleton synthesizer using Web Audio API nodes with dynamics compression (threshold `-18 dB`, ratio `6`, knee `12`) and master gain capped at `0.6` to guarantee zero clipping:

- `playActivation()`: Sine chime sweeping 880Hz to 1760Hz through low-pass sweep 400Hz to 6000Hz (0.8s decay).
- `playTsukuyomi()`: Dual detuned oscillators (7 cents apart) through low-pass filter with a 55Hz (A1) sub drone (2.5s fade).
- `playAmaterasu()`: 0.4s filtered noise burst with exponential decay plus random high-frequency crackle clicks.
- `playShinraTensei()`: 60Hz to 40Hz sub-bass impact (5ms attack, 0.9s release) with high-pass shockwave punch transient.
- `startChibakuTensei()` / `stopChibakuTensei()`: Continuous low rumble noise through 120Hz low-pass filter modulated by a 0.6Hz LFO ramping over 6s.

---

## ♿ Accessibility & Hardening Pass

- **Keyboard Operation**: Tab navigation across every button, card, slider, toggle, and dialog.
- **Focus Indicators**: Visible, high-contrast focus rings (`focus-visible:ring-2 focus-visible:ring-red-500` / `ring-purple-400`).
- **Screen Reader Support**: Semantic HTML, ARIA labels on all icon-only buttons (`aria-label="..."`), and `aria-live="polite"` on toast alerts.
- **Focus Trap in Modals**: Settings and Dōjutsu Inspector modals trap keyboard Tab focus within dialog boundaries and close safely on `Escape`.
- **Reduced Motion (`reducedMotion`)**: Initialized from OS preferences (`prefers-reduced-motion: reduce`). Disables all camera shakes, screen flashes, speed streaks, and rapid eye rotations across all four realms.
- **Visual Intensity (`visualIntensity`)**: Scaler slider ($0.25 - 1.0$) dynamically modulates particle pool counts across all canvases.
- **Error Boundary**: `<ErrorBoundary>` component wraps the entire application with a graceful fallback screen ("Chakra Disruption") and self-recovery buttons.
- **Zero Loop / Audio Leaks**: All canvas components utilize `useAnimationLoop` with automatic `cancelAnimationFrame`, `ResizeObserver`, and `visibilitychange` teardown. In development mode, active animation loop counts are logged to verify zero accumulation on view switching.

---

## 🔧 Troubleshooting

### 1. No Sound Playing
- **Cause**: Browsers block `AudioContext` from emitting sound until an initial user gesture (click, tap, keypress).
- **Fix**: Click anywhere on the page, toggle the volume slider in the HUD, or test any sound in the Preferences modal.

### 2. Port `5173` Already in Use
- **Cause**: Another Vite or dev process is already occupying port 5173.
- **Fix**: Vite will automatically select the next available port (e.g. `http://localhost:5174/`). You can also specify a custom port:
  ```powershell
  npx vite --port 3000
  ```

### 3. Node Version Too Old
- **Requirement**: Node `20.19+` or `22.12+`.
- **Check**: Run `node -v`. If below the requirement, download the latest LTS release from [nodejs.org](https://nodejs.org/).

### 4. Fullscreen Restricted
- **Cause**: Some browsers or embedded iframe contexts restrict programmatic fullscreen.
- **Fix**: The application catches this automatically, displays an accessible toast, and activates borderless hide-HUD cinematic mode without failing.

---

## 📜 Legal & Disclaimer

*UCHIHA REALM is an unofficial, non-commercial fan project created for artistic, educational, and creative technology demonstration purposes. All character names, clan references, and concepts are the intellectual property of Masashi Kishimoto, Shueisha, and Studio Pierrot. All code, SVG vector mathematics, procedural Canvas shaders, and Web Audio synthesizers in this repository are original implementations.*
