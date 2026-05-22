/**
 * Web Audio API based Sound Synthesizer for Neural-Loom.
 * Generates futuristic, high-fidelity soundscapes entirely in-browser.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private primaryGain: GainNode | null = null;
  private droneOscs: { osc: OscillatorNode; gain: GainNode }[] = [];
  private isMuted: boolean = true;

  constructor() {
    // Lazy-initialize context on first user action
  }

  private init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      this.primaryGain = this.ctx.createGain();
      // Keep it subtle
      this.primaryGain.gain.value = 0.12; 
      this.primaryGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.init();
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      this.startDrone();
    } else {
      this.stopDrone();
    }
    return this.isMuted;
  }

  getIsMuted(): boolean {
    return this.isMuted;
  }

  triggerInteractionClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || this.ctx.state === "suspended") return;

    const t = this.ctx.currentTime;
    
    // First high click component
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(1400, t);
    osc1.frequency.exponentialRampToValueAtTime(800, t + 0.08);

    gain1.gain.setValueAtTime(0.08, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc1.connect(gain1);
    gain1.connect(this.primaryGain!);
    osc1.start(t);
    osc1.stop(t + 0.08);
  }

  triggerHover() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || this.ctx.state === "suspended") return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(250, t);
    osc.frequency.exponentialRampToValueAtTime(350, t + 0.12);

    gain.gain.setValueAtTime(0.02, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.primaryGain!);
    osc.start(t);
    osc.stop(t + 0.12);
  }

  triggerSuccessPulse() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || this.ctx.state === "suspended") return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(523.25, t); // C5
    osc1.frequency.setValueAtTime(659.25, t + 0.08); // E5

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(783.99, t + 0.16); // G5

    gainNode.gain.setValueAtTime(0.05, t);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.primaryGain!);

    osc1.start(t);
    osc1.stop(t + 0.35);
    osc2.start(t + 0.16);
    osc2.stop(t + 0.35);
  }

  triggerWarp() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || this.ctx.state === "suspended") return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(60, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.82);

    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.85);

    osc.connect(gain);
    gain.connect(this.primaryGain!);

    osc.start(t);
    osc.stop(t + 0.85);
  }

  private startDrone() {
    if (this.isMuted || !this.ctx) return;
    this.stopDrone();

    const t = this.ctx.currentTime;

    // Create 2 drone oscillators for rich sound layering (low cinematic hum + high crystal synth)
    const pitches = [55, 110]; // Low frequency and subtle overtone
    
    pitches.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t);
      
      // Infinite drone gain
      const baseGain = idx === 0 ? 0.04 : 0.02;
      gain.gain.setValueAtTime(0.001, t);
      // Fade-in ambient hum
      gain.gain.exponentialRampToValueAtTime(baseGain, t + 1.5);

      osc.connect(gain);
      gain.connect(this.primaryGain!);
      osc.start(t);
      this.droneOscs.push({ osc, gain });
    });
  }

  private stopDrone() {
    if (this.droneOscs.length === 0) return;
    
    try {
      this.droneOscs.forEach(({ osc, gain }) => {
        osc.stop();
        osc.disconnect();
        gain.disconnect();
      });
    } catch (e) {
      // already stopped or clean
    }
    this.droneOscs = [];
  }
}

export const sound = new SoundEngine();
