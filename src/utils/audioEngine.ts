// src/utils/audioEngine.ts
// Procedural Web Audio synthesizer for UCHIHA REALM. No audio files.
// Signal chain: voices -> master gain -> compressor (limiter) -> speakers.

type Disposable = AudioNode;

class DojutsuAudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private muted = false;
  private volume = 0.5; // user-facing 0..1
  private readonly MAX_MASTER = 0.6; // hard ceiling so nothing is ever too loud
  private noiseBuffer: AudioBuffer | null = null;
  private lastPlayed: Record<string, number> = {};
  private stopChibaku: (() => void) | null = null;
  private gestured = false;

  constructor() {
    if (typeof window === 'undefined') return;

    // Browsers block audio until a user gesture. Unlock on the first one.
    const unlock = () => {
      this.gestured = true;
      void this.init();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);

    // Stop wasting CPU while the tab is hidden.
    document.addEventListener('visibilitychange', () => {
      if (!this.ctx) return;
      if (document.hidden) void this.ctx.suspend();
      else if (this.gestured) void this.ctx.resume();
    });
  }

  /** Create or resume the AudioContext. Safe to call repeatedly; call it from a click handler. */
  public async init(): Promise<boolean> {
    this.gestured = true;
    try {
      let ctx = this.ctx;
      if (!ctx) {
        const Ctor =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) return false;
        ctx = new Ctor();

        const master = ctx.createGain();
        master.gain.value = this.muted ? 0 : this.volume * this.MAX_MASTER;

        const limiter = ctx.createDynamicsCompressor();
        limiter.threshold.value = -18;
        limiter.knee.value = 12;
        limiter.ratio.value = 6;
        limiter.attack.value = 0.003;
        limiter.release.value = 0.25;

        master.connect(limiter);
        limiter.connect(ctx.destination);

        this.ctx = ctx;
        this.master = master;
      }
      if (ctx.state === 'suspended') await ctx.resume();
      return ctx.state === 'running';
    } catch {
      return false; // the app must keep working without sound
    }
  }

  public setVolume(value: number): void {
    this.volume = Math.max(0, Math.min(1, value));
    this.applyMasterGain();
  }

  public setMuted(value: boolean): void {
    this.muted = value;
    this.applyMasterGain();
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getMuted(): boolean {
    return this.muted;
  }

  /** Stop everything and free the AudioContext. */
  public dispose(): void {
    this.stopChibakuTensei();
    if (this.ctx) void this.ctx.close();
    this.ctx = null;
    this.master = null;
    this.noiseBuffer = null;
  }

  // ---------------------------------------------------------------
  // Sound effects
  // ---------------------------------------------------------------

  /** Dojutsu activation: resonant chime, fast pitch bend, low-pass sweep. */
  public playActivation(): void {
    const r = this.ready('activation', 80);
    if (!r) return;
    const { ctx, out } = r;
    const t = ctx.currentTime;

    const o1 = ctx.createOscillator();
    o1.type = 'sine';
    o1.frequency.setValueAtTime(880, t);
    o1.frequency.exponentialRampToValueAtTime(1760, t + 0.3);

    const o2 = ctx.createOscillator();
    o2.type = 'triangle';
    o2.frequency.setValueAtTime(1320, t);
    o2.frequency.exponentialRampToValueAtTime(2640, t + 0.3);
    const o2Gain = ctx.createGain();
    o2Gain.gain.value = 0.35;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.Q.value = 3;
    lp.frequency.setValueAtTime(400, t);
    lp.frequency.exponentialRampToValueAtTime(6000, t + 0.4);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.22, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);

    o1.connect(lp);
    o2.connect(o2Gain);
    o2Gain.connect(lp);
    lp.connect(g);
    g.connect(out);

    o1.start(t);
    o2.start(t);
    o1.stop(t + 0.95);
    o2.stop(t + 0.95);
    this.releaseOnEnd(o1, [o1, o2, o2Gain, lp, g]);
  }

  /** Tsukuyomi / Kotoamatsukami: detuned drone, filtered sub, slow stereo warp. */
  public playTsukuyomi(): void {
    const r = this.ready('tsukuyomi', 300);
    if (!r) return;
    const { ctx, out } = r;
    const t = ctx.currentTime;
    const end = t + 2.8;

    const a = ctx.createOscillator();
    a.type = 'sawtooth';
    a.frequency.setValueAtTime(98, t);
    a.frequency.exponentialRampToValueAtTime(55, t + 2.5);

    const b = ctx.createOscillator();
    b.type = 'sawtooth';
    b.frequency.setValueAtTime(101.5, t); // slightly detuned for beating
    b.frequency.exponentialRampToValueAtTime(56.8, t + 2.5);

    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(49, t);
    sub.frequency.exponentialRampToValueAtTime(41, t + 2.5);
    const subGain = ctx.createGain();
    subGain.gain.value = 0.5;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.Q.value = 3;
    lp.frequency.setValueAtTime(250, t);
    lp.frequency.linearRampToValueAtTime(650, t + 1.0);
    lp.frequency.exponentialRampToValueAtTime(120, t + 2.5);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.18, t + 0.4);
    g.gain.exponentialRampToValueAtTime(0.0001, end);

    const pan = ctx.createStereoPanner();
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.7;
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = 0.6;
    lfo.connect(lfoDepth);
    lfoDepth.connect(pan.pan);

    a.connect(lp);
    b.connect(lp);
    sub.connect(subGain);
    subGain.connect(lp);
    lp.connect(g);
    g.connect(pan);
    pan.connect(out);

    [a, b, sub, lfo].forEach((o) => {
      o.start(t);
      o.stop(end + 0.05);
    });
    this.releaseOnEnd(a, [a, b, sub, subGain, lp, g, pan, lfo, lfoDepth]);
  }

  /** Amaterasu: noise burst, exponential decay, subtle crackle. */
  public playAmaterasu(): void {
    const r = this.ready('amaterasu', 60);
    if (!r) return;
    const { ctx, out } = r;
    const t = ctx.currentTime;
    const noise = this.getNoise(ctx);

    // Main burst
    const burst = ctx.createBufferSource();
    burst.buffer = noise;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 2;
    bp.frequency.setValueAtTime(1400, t);
    bp.frequency.exponentialRampToValueAtTime(300, t + 0.7);
    const bg = ctx.createGain();
    bg.gain.setValueAtTime(0.0001, t);
    bg.gain.linearRampToValueAtTime(0.35, t + 0.02);
    bg.gain.exponentialRampToValueAtTime(0.0001, t + 0.75);
    burst.connect(bp);
    bp.connect(bg);
    bg.connect(out);
    burst.start(t);
    burst.stop(t + 0.8);
    this.releaseOnEnd(burst, [burst, bp, bg]);

    // Crackle: one looped noise source gated by short random spikes
    const crackle = ctx.createBufferSource();
    crackle.buffer = noise;
    crackle.loop = true;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 2000;
    const cg = ctx.createGain();
    cg.gain.value = 0;
    for (let i = 0; i < 14; i++) {
      const s = t + 0.05 + i * 0.06 + Math.random() * 0.03;
      cg.gain.setValueAtTime(0, s);
      cg.gain.linearRampToValueAtTime(0.05 + Math.random() * 0.1, s + 0.002);
      cg.gain.linearRampToValueAtTime(0, s + 0.02);
    }
    crackle.connect(hp);
    hp.connect(cg);
    cg.connect(out);
    crackle.start(t);
    crackle.stop(t + 0.95);
    this.releaseOnEnd(crackle, [crackle, hp, cg]);
  }

  /** Shinra Tensei: concussive low-frequency impact with a mid thump for small speakers. */
  public playShinraTensei(): void {
    const r = this.ready('shinra', 150);
    if (!r) return;
    const { ctx, out } = r;
    const t = ctx.currentTime;

    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(150, t);
    sub.frequency.exponentialRampToValueAtTime(40, t + 0.45);
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.0001, t);
    subGain.gain.linearRampToValueAtTime(0.45, t + 0.008);
    subGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);

    const thump = ctx.createOscillator();
    thump.type = 'triangle';
    thump.frequency.setValueAtTime(90, t);
    thump.frequency.exponentialRampToValueAtTime(45, t + 0.3);
    const thumpGain = ctx.createGain();
    thumpGain.gain.setValueAtTime(0.0001, t);
    thumpGain.gain.linearRampToValueAtTime(0.25, t + 0.008);
    thumpGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);

    const click = ctx.createBufferSource();
    click.buffer = this.getNoise(ctx);
    const clickLp = ctx.createBiquadFilter();
    clickLp.type = 'lowpass';
    clickLp.frequency.value = 1200;
    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(0.2, t);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);

    sub.connect(subGain);
    subGain.connect(out);
    thump.connect(thumpGain);
    thumpGain.connect(out);
    click.connect(clickLp);
    clickLp.connect(clickGain);
    clickGain.connect(out);

    sub.start(t);
    thump.start(t);
    click.start(t);
    sub.stop(t + 1.15);
    thump.stop(t + 0.55);
    click.stop(t + 0.15);
    this.releaseOnEnd(sub, [sub, subGain, thump, thumpGain, click, clickLp, clickGain]);
  }

  /**
   * Chibaku Tensei: sustained gravitational rumble that intensifies over ~8 s.
   * Call stopChibakuTensei() to fade it out and free its nodes.
   */
  public startChibakuTensei(): void {
    if (this.stopChibaku) return;
    const r = this.ready('chibaku', 0);
    if (!r) return;
    const { ctx, out } = r;
    const t = ctx.currentTime;

    const carrier = ctx.createOscillator();
    carrier.type = 'triangle';
    carrier.frequency.setValueAtTime(38, t);
    carrier.frequency.linearRampToValueAtTime(70, t + 8);

    // Cyclic FM: modulator -> depth gain -> carrier frequency (depth in Hz)
    const mod = ctx.createOscillator();
    mod.type = 'sine';
    mod.frequency.setValueAtTime(2, t);
    mod.frequency.linearRampToValueAtTime(9, t + 8);
    const modDepth = ctx.createGain();
    modDepth.gain.setValueAtTime(4, t);
    modDepth.gain.linearRampToValueAtTime(14, t + 8);
    mod.connect(modDepth);
    modDepth.connect(carrier.frequency);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.Q.value = 1;
    lp.frequency.setValueAtTime(130, t);
    lp.frequency.linearRampToValueAtTime(420, t + 8);

    const rumble = ctx.createBufferSource();
    rumble.buffer = this.getNoise(ctx);
    rumble.loop = true;
    const rumbleLp = ctx.createBiquadFilter();
    rumbleLp.type = 'lowpass';
    rumbleLp.frequency.setValueAtTime(90, t);
    rumbleLp.frequency.linearRampToValueAtTime(260, t + 8);
    const rumbleGain = ctx.createGain();
    rumbleGain.gain.value = 0.5;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.3, t + 6);

    carrier.connect(lp);
    lp.connect(g);
    rumble.connect(rumbleLp);
    rumbleLp.connect(rumbleGain);
    rumbleGain.connect(g);
    g.connect(out);

    carrier.start(t);
    mod.start(t);
    rumble.start(t);

    const nodes: Disposable[] = [carrier, mod, modDepth, lp, rumble, rumbleLp, rumbleGain, g];
    this.stopChibaku = () => {
      const now = ctx.currentTime;
      g.gain.cancelScheduledValues(now);
      g.gain.setValueAtTime(Math.max(g.gain.value, 0.0001), now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      [carrier, mod, rumble].forEach((s) => s.stop(now + 0.55));
      carrier.onended = () => nodes.forEach((n) => this.safeDisconnect(n));
      this.stopChibaku = null;
    };
  }

  public stopChibakuTensei(): void {
    this.stopChibaku?.();
  }

  // ---------------------------------------------------------------
  // Internals
  // ---------------------------------------------------------------

  private applyMasterGain(): void {
    if (!this.ctx || !this.master) return;
    const target = this.muted ? 0 : this.volume * this.MAX_MASTER;
    this.master.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
  }

  /** Returns the context + output only if sound should play right now. */
  private ready(key: string, minGapMs: number): { ctx: AudioContext; out: GainNode } | null {
    if (this.muted) return null;
    const ctx = this.ctx;
    const out = this.master;
    if (!ctx || !out || ctx.state !== 'running') {
      if (this.gestured) void this.init(); // try to wake it for next time
      return null;
    }
    const now = performance.now();
    if (now - (this.lastPlayed[key] ?? 0) < minGapMs) return null; // anti-spam
    this.lastPlayed[key] = now;
    return { ctx, out };
  }

  /** One shared noise buffer instead of regenerating it on every call. */
  private getNoise(ctx: AudioContext): AudioBuffer {
    if (!this.noiseBuffer || this.noiseBuffer.sampleRate !== ctx.sampleRate) {
      const length = Math.floor(ctx.sampleRate * 1.0);
      const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
      this.noiseBuffer = buffer;
    }
    return this.noiseBuffer;
  }

  private releaseOnEnd(source: AudioScheduledSourceNode, nodes: Disposable[]): void {
    source.onended = () => nodes.forEach((n) => this.safeDisconnect(n));
  }

  private safeDisconnect(node: AudioNode): void {
    try {
      node.disconnect();
    } catch {
      /* already disconnected */
    }
  }
}

export const audioEngine = new DojutsuAudioEngine();
