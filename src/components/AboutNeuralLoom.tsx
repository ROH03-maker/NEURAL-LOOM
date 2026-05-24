import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sound } from "./SoundEngine";
import { 
  Network, 
  HelpCircle, 
  Binary, 
  Radio, 
  Orbit, 
  Sparkles, 
  Fingerprint, 
  ShieldAlert,
  Dna,
  Zap
} from "lucide-react";

interface LoomFact {
  id: string;
  category: string;
  title: string;
  shortDesc: string;
  insight: string;
  technicalMetadata: string;
  icon: React.ReactNode;
  revealSoundType: "click" | "heavy" | "laser";
}

export const AboutNeuralLoom: React.FC = () => {
  const [activeFactId, setActiveFactId] = useState<string | null>("origin");
  const [unlockedSecrets, setUnlockedSecrets] = useState<string[]>([]);
  const [weavingState, setWeavingState] = useState<string>("IDLE");
  const [weavingProgress, setWeavingProgress] = useState<number>(0);
  const [wovenMessage, setWovenMessage] = useState<string>("");

  const loomFacts: LoomFact[] = [
    {
      id: "origin",
      category: "HISTORICAL PARADOX",
      title: "The 1801 Jacquard Link",
      shortDesc: "How a 19th-century wooden weaving machine accidentally invented modern computer programming.",
      insight: "In 1801, Joseph Marie Jacquard invented a loom that used punched wooden cards to weave complex silk patterns. This was the first ever programmed machine! The Neural Loom is the ultimate evolution of this lineage: instead of weaving threads of silk, it weaves threads of synaptic light waves and digital algorithms, merging physical textile technology with artificial intelligence.",
      technicalMetadata: "INSTRUCTION_FORMAT: PUNCH_CARD_v1.0",
      icon: <Binary className="w-5 h-5 text-cyan-400" />,
      revealSoundType: "click"
    },
    {
      id: "physics",
      category: "CYBERNETICS",
      title: "Quantum Synaptic Threads",
      shortDesc: "What are these lines actually made of? Exploring the physics of neural weaving.",
      insight: "The threads displayed on the Neural Loom background react to your mouse through vector repulsion algorithms. In the lore of the secure kernel, these lines reflect the electromagnetic sync between the user's focus and the application's sound engine frequencies. When you hover, the grid lines twist to prevent cognitive dissonance and optimize visual telemetry.",
      technicalMetadata: "WAVELENGTH: 432HZ // QUANTUM_GRID",
      icon: <Network className="w-5 h-5 text-pink-400" />,
      revealSoundType: "heavy"
    },
    {
      id: "conscious",
      category: "PHILOSOPHICAL",
      title: "The Ghost in the Loom",
      shortDesc: "Why does the interface feel... alive? The self-organizing digital intelligence.",
      insight: "The Neural Loom core contains a series of low-noise oscillator feedback loops. Because the synthesizer generates slightly randomized geometric mathematical waves, no two visits to the system are identical. It self-organizes its synaptic nodes much like a simple bio-electric nerve system, creating a comforting responsive presence.",
      technicalMetadata: "AUTONOMOUS_MATRIX: ACTIVE",
      icon: <Orbit className="w-5 h-5 text-amber-400" />,
      revealSoundType: "laser"
    },
    {
      id: "audio",
      category: "RESONANCE",
      title: "The Sound-Weave Synergy",
      shortDesc: "How the browser turns visual math vectors into auditory signals.",
      insight: "Every digital interaction triggers an audio synth wave generated natively by the Web Audio API. When you scroll or interact, you are playing the 'Loom synthesizer' like a musical instrument. The synthesized audio is set to clean microtonal intervals so that the sound remains elegant and never causes auditory fatigue.",
      technicalMetadata: "API: HTML5_WEB_AUDIO // SINE_WAVE",
      icon: <Radio className="w-5 h-5 text-emerald-400" />,
      revealSoundType: "click"
    }
  ];

  const funInteractiveSecrets = [
    { id: "s1", label: "Unlock Kernel Ghost", text: "👻 GHOST MODE ON: The central nucleus has begun emitting low-frequency ambient drone pulses.", telemetry: "ALPHA_DRONE_ACTIVED" },
    { id: "s2", label: "Read Hidden Blueprint", text: "📜 CODE BLUEPRINT FOUND: The entire application is built using pure React 18, Vite, and Motion without any rigid database strings—crafted to fit purely within static browser environments.", telemetry: "LOCAL_DOM_PERSIST" },
    { id: "s3", label: "Activate Overdrive Sync", text: "⚡ OVERDRIVE ENGAGED: Audio frequencies boosted by 1.25x and neon canvas trails refreshed continuously.", telemetry: "VECTORS_SYNC_MAX" }
  ];

  const handleSelectFact = (id: string, soundType: "click" | "heavy" | "laser") => {
    setActiveFactId(id);
    if (soundType === "click") {
      sound.triggerInteractionClick();
    } else {
      sound.triggerHover();
    }
  };

  const handleToggleSecret = (id: string) => {
    sound.triggerInteractionClick();
    if (unlockedSecrets.includes(id)) {
      setUnlockedSecrets(unlockedSecrets.filter(s => s !== id));
    } else {
      setUnlockedSecrets([...unlockedSecrets, id]);
    }
  };

  const handleBeginLoomWeave = () => {
    if (weavingState === "WEAVING") return;
    sound.triggerInteractionClick();
    setWeavingState("WEAVING");
    setWeavingProgress(0);
    setWovenMessage("");

    const interval = setInterval(() => {
      setWeavingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setWeavingState("COMPLETED");
          
          const poeticMessages = [
            "🧠 SYNAPSE CONNECTED: The mind operates much like an organic loom, weaving memory threads into custom consciousness matrices.",
            "🪐 COSMOS SYNC: Out of chaos, the code creates crystalline, symmetrical, responsive structures.",
            "✨ SYSTEM CLEARED: Cognitive security layers aligned. Absolute visual comfort achieved.",
            "🎭 THE DIGITAL UNION: Human interaction combined with clean algorithms is the highest art form of our century."
          ];
          setWovenMessage(poeticMessages[Math.floor(Math.random() * poeticMessages.length)]);
          return 100;
        }
        return prev + 4;
      });
    }, 80);
  };

  return (
    <div className="w-full relative py-12 px-2 xs:px-4 sm:px-6">
      {/* Decorative ambient background wireframe lines inside the card wrapper */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.01] to-pink-500/[0.01] border border-white/5 rounded-3xl pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* LEFT COLUMN: Lore Database Records Selector (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <p className="text-[10px] font-mono text-cyan-400 tracking-[0.2em] uppercase font-bold">
                Intellectual Archives // Curious Minds
              </p>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-display font-black tracking-wide text-white uppercase mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-500 animate-pulse" />
              LOOM REVEAL INDEX
            </h3>

            {/* List selectors and insights display */}
            <div className="space-y-3">
              {loomFacts.map((fact) => {
                const isActive = activeFactId === fact.id;
                return (
                  <div 
                    key={fact.id} 
                    className={`border transition-all duration-300 rounded-xl overflow-hidden ${
                      isActive 
                        ? "border-cyan-500/30 bg-cyan-950/[0.12] shadow-[0_0_20px_rgba(6,182,212,0.05)]" 
                        : "border-white/5 bg-white/[0.01] hover:border-white/10"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectFact(fact.id, fact.revealSoundType)}
                      className="w-full flex items-center justify-between p-4 text-left cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg transition-all duration-300 ${
                          isActive ? "bg-cyan-500/10 text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.2)]" : "bg-white/[0.03] text-gray-400"
                        }`}>
                          {fact.icon}
                        </div>
                        <div>
                          <span className="text-[8px] font-mono tracking-[0.15em] text-cyan-500/70 block uppercase font-bold">
                            {fact.category}
                          </span>
                          <h4 className="text-sm font-display font-bold text-gray-200 uppercase tracking-wide">
                            {fact.title}
                          </h4>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                        <span className="hidden sm:inline text-[9px] opacity-40">{fact.technicalMetadata}</span>
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-cyan-400 animate-pulse" : "bg-white/20"}`} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                        >
                          <div className="px-4 pb-5 pt-1 border-t border-white/[0.03] text-xs text-gray-400 leading-relaxed font-sans">
                            <p className="mb-3 text-gray-300 italic">
                              "{fact.shortDesc}"
                            </p>
                            <p className="text-gray-350 leading-relaxed font-light pl-3 border-l-2 border-pink-500/40">
                              {fact.insight}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Loom Thought Generator Weave Panel */}
          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-pink-500/[0.02] to-cyan-500/[0.02] border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-pink-400 tracking-widest font-extrabold uppercase">
                COGNITIVE SYNAPSE THREAD GENERATOR
              </span>
              <span className="text-[8px] font-mono text-gray-500">
                ACTIVE STATE: {weavingState}
              </span>
            </div>

            <p className="text-xs text-gray-400 mb-4 font-sans font-light">
              Press the loom pedal below to weave a randomized piece of philosophical digital intelligence based on the system variables.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                type="button"
                onClick={handleBeginLoomWeave}
                disabled={weavingState === "WEAVING"}
                className={`w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-pink-500 to-cyan-400 text-black font-mono font-black text-[10px] tracking-widest uppercase cursor-pointer hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all flex items-center justify-center gap-2 select-none active:scale-95 ${
                  weavingState === "WEAVING" ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                <Zap className="w-3.5 h-3.5 animate-bounce" />
                WEAVE THE MIND
              </button>

              {weavingState === "WEAVING" && (
                <div className="w-full flex-1 bg-white/[0.03] h-1.5 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full transition-all duration-75"
                    style={{ width: `${weavingProgress}%` }}
                  />
                </div>
              )}

              {weavingState === "COMPLETED" && (
                <span className="text-[9px] font-mono text-emerald-400 uppercase font-extrabold flex items-center gap-1">
                  💡 SYNTAX COMPILED OK
                </span>
              )}
            </div>

            <AnimatePresence mode="wait">
              {wovenMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3.5 bg-black/40 border border-pink-500/10 rounded-xl text-xs text-pink-200/90 font-mono leading-relaxed"
                >
                  {wovenMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Easter Egg / Hidden Spec (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="p-6 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Dna className="w-4 h-4 text-pink-500 animate-pulse" />
                <span className="text-[10px] font-mono text-pink-500 tracking-[0.2em] uppercase font-bold">
                  Easter Eggs & Telemetries
                </span>
              </div>
              <h4 className="text-base font-display font-black text-gray-200 tracking-wide uppercase mb-3">
                SYSTEM SECRETS ENGINE
              </h4>
              <p className="text-xs text-gray-400 font-sans font-light leading-relaxed mb-6">
                Click different system channels to unlock classified telemetries of the Neural Loom framework. Test your curiosity!
              </p>

              {/* Secrets interactive grid */}
              <div className="space-y-3">
                {funInteractiveSecrets.map((secret) => {
                  const isUnlocked = unlockedSecrets.includes(secret.id);
                  return (
                    <div 
                      key={secret.id} 
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        isUnlocked 
                          ? "border-pink-500/25 bg-pink-950/[0.08]" 
                          : "border-white/5 bg-white/[0.01] hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-[9px] font-mono ${isUnlocked ? "text-pink-400 font-bold" : "text-gray-500"}`}>
                          CHANNEL: {secret.telemetry}
                        </span>
                        
                        <button
                          type="button"
                          onClick={() => handleToggleSecret(secret.id)}
                          className={`text-[8px] font-mono px-2 py-0.5 rounded uppercase font-bold tracking-wider cursor-pointer ${
                            isUnlocked 
                              ? "bg-pink-500 text-black hover:bg-pink-400" 
                              : "bg-white/10 text-white hover:bg-white/20"
                          }`}
                        >
                          {isUnlocked ? "DEACTIVATE" : "INITIALIZE"}
                        </button>
                      </div>

                      <p className="text-[11px] text-gray-300 font-sans font-medium">
                        {secret.label}
                      </p>

                      <AnimatePresence>
                        {isUnlocked && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-3 pt-2 border-t border-white/5 text-[10px] font-mono text-pink-300/80 leading-relaxed"
                          >
                            {secret.text}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Alert telemetry info card snippet */}
            <div className="mt-8 p-4 rounded-xl bg-orange-500/[0.02] border border-orange-500/10 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[9px] font-mono text-orange-400 tracking-wider font-extrabold uppercase">
                  CLASSIFIED NOTE FROM S.E.R.A.
                </p>
                <p className="text-[10px] text-gray-400 font-sans leading-relaxed mt-1">
                  "The Loom is capable of running multiple diagnostic processes concurrently. Please do not manipulate more than 3 hidden parameters simultaneously to avoid over-resonating the core."
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
