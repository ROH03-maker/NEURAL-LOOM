import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sound } from "./SoundEngine";
import { Cpu, Terminal, Shield, Sparkles, Volume2, VolumeX, Activity } from "lucide-react";

interface LoaderProps {
  onComplete: () => void;
}

const MEMORY_SECTORS = [
  "0x7FBC01_CORE", "0x5ADC88_KERNEL", "0x39CCF2_GRID", "0x00FAB1_SYNTH", 
  "0x88EE11_SHIELD", "0x91CCB4_INTEGRITY", "0x44DFB9_TELEMETRY"
];

const BOOT_LOG_TEMPLATES = [
  "INITIALIZING PROGRAMMATIC INTENT CRAWLER...",
  "PROBING NEURAL GRADIENTS IN THE COGNITIVE REGION...",
  "SETTING UP LOW-FREQUENCY DRONE OSCILLATORS...",
  "ESTABLISHING GLASSMORPHIC COMPONENT SHADERS...",
  "DECRYPTING CRYPTO BUFFER KEYS [AES-256-GCM]...",
  "INTEGRATING DYNAMIC CHRONOS COORDINATES...",
  "BOOTSTRAPPING SLEEK INTERACTIVE GRAPHICS LAYERS...",
  "SYNCRONIZING HARDWARE AUDIO OSCILLATOR CHANNELS...",
  "PERFORMING FINAL SECURITY SHAKEHAND..."
];

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [activeLog, setActiveLog] = useState(BOOT_LOG_TEMPLATES[0]);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const [hexFlicker, setHexFlicker] = useState("0x000000_INIT");
  
  const audioInitializedRef = useRef(false);

  // Handle periodic update loops
  useEffect(() => {
    let currentProgress = 0;
    
    // Add logs periodically
    const logInterval = setInterval(() => {
      const idx = Math.floor(Math.random() * BOOT_LOG_TEMPLATES.length);
      const sector = MEMORY_SECTORS[Math.floor(Math.random() * MEMORY_SECTORS.length)];
      const randHex = Math.random().toString(16).substring(2, 8).toUpperCase();
      
      const newLog = `[${sector}::0x${randHex}] - ${BOOT_LOG_TEMPLATES[idx]}`;
      setTerminalLogs(prev => [...prev.slice(-4), newLog]);
      setActiveLog(BOOT_LOG_TEMPLATES[idx]);
      setHexFlicker(`0x${randHex}_${sector.split("_")[1]}`);
      
      // Play a subtle interaction click as a system beep milestone
      if (!soundMuted && audioInitializedRef.current) {
        sound.triggerHover();
      }
    }, 450);

    const progressInterval = setInterval(() => {
      // Dynamic non-linear progression matching high-tech load fluctuations
      setProgress(prev => {
        let increment = 1;
        if (prev < 40) {
          increment = Math.floor(Math.random() * 8) + 4; // fast start
        } else if (prev < 75) {
          increment = Math.floor(Math.random() * 4) + 2; // steady
        } else if (prev < 89) {
          increment = Math.floor(Math.random() * 2) + 1; // heavy computation bottleneck
        } else if (prev < 99) {
          increment = Math.floor(Math.random() * 2); // slow handshake
        } else {
          increment = 1;
        }

        const next = Math.min(prev + increment, 100);
        
        if (next === 100) {
          clearInterval(progressInterval);
          clearInterval(logInterval);
          setIsDone(true);
          
          // Play energetic success chime
          if (!soundMuted && audioInitializedRef.current) {
            sound.triggerSuccessPulse();
          }
        }
        return next;
      });
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [soundMuted]);

  const handleStart = () => {
    if (!soundMuted) {
      sound.triggerWarp();
    }
    onComplete();
  };

  const toggleSound = () => {
    // Unmute or mute the core audio
    const isNowMuted = sound.toggleMute();
    setSoundMuted(isNowMuted);
    audioInitializedRef.current = !isNowMuted;
    
    // Play sound test
    if (!isNowMuted) {
      sound.triggerSuccessPulse();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#040404] flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
    >
      {/* Cinematic grid overlay and neon backdrop */}
      <div className="absolute inset-0 opacity-[0.14] pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 100% 100%, #06b6d4 1px, transparent 0), radial-gradient(circle at 0% 0%, #9d50bb 1px, transparent 0)", 
        backgroundSize: "32px 32px"
      }} />
      <div className="absolute top-[-25%] left-[-25%] w-[80%] h-[80%] bg-[#022c3c]/30 blur-[180px] rounded-full" />
      <div className="absolute bottom-[-25%] right-[-25%] w-[80%] h-[80%] bg-[#2d004d]/20 blur-[180px] rounded-full" />

      {/* Main futuristic frame */}
      <div className="w-full max-w-xl border border-white/5 bg-[#09090b]/90 backdrop-blur-2xl p-6 sm:p-8 rounded-sm relative shadow-2xl overflow-hidden shadow-black/80">
        
        {/* Holographic targeting scan corners */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-neon-cyan" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-neon-cyan" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-neon-cyan" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-neon-cyan" />

        {/* Top Header Row with status */}
        <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mb-6 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
            </span>
            <span className="tracking-widest uppercase">AEGIS CORE BOOT SEQUENCE</span>
          </div>
          
          {/* Audio sound button controller */}
          <button 
            type="button"
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-2 py-1 bg-white/[0.03] border border-white/10 rounded hover:bg-white/[0.08] active:scale-95 transition-all text-gray-300"
            title="Toggle Synthesizer Feedback"
          >
            {soundMuted ? <VolumeX size={10} className="text-red-400" /> : <Volume2 size={10} className="text-neon-cyan" />}
            <span className="text-[8px] uppercase tracking-wider">AUDIO {soundMuted ? "MUTED" : "SYNTH"}</span>
          </button>
        </div>

        {/* Dynamic scanning matrix block */}
        <div className="flex flex-col items-center py-6 relative">
          
          {/* Animated Holographic Core Ring (Sera Design Layout) */}
          <div className="relative w-28 h-28 flex items-center justify-center mb-6">
            <div className="absolute inset-0 border-[0.5px] border-white/10 rounded-full animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-2 border-2 border-dashed border-neon-cyan/25 rounded-full animate-[spin_16s_linear_infinite_reverse]" />
            <div className="absolute inset-4 border border-neon-purple/30 rounded-full animate-[pulse_2s_infinite]" />
            
            {/* Pulsing Core Sphere */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#021822] to-[#120324] border border-white/10 flex flex-col items-center justify-center relative shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <div className="text-[14px] font-bold font-orbitron text-white leading-none tracking-widest">N</div>
              <div className="text-[6px] font-mono text-neon-cyan mt-1 select-all">{hexFlicker}</div>
              {/* Laser sweep scanner overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/15 to-transparent h-1/2 w-full top-0 animate-[bounce_3s_infinite] pointer-events-none" />
            </div>

            {/* Orbiting Satellite Dots */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-[3px] pointer-events-none"
            >
              <div className="w-2 h-2 rounded-full bg-neon-cyan absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_8px_#06b6d4]" />
            </motion.div>
          </div>

          {/* Avengers styled Loading Core */}
          <div className="text-center">
            <h2 className="text-3xl font-display font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 uppercase avengers-text-simple">
              NEURAL-LOOM
            </h2>
            <div className="flex items-center gap-1.5 justify-center mt-1.5">
              <Activity size={10} className="text-neon-purple animate-pulse" />
              <p className="text-[9px] font-mono tracking-[0.3em] text-neon-cyan uppercase">CREATIVE SYSTEMS LAB // ACTIVE</p>
            </div>
          </div>
        </div>

        {/* Loading Progress Bar with dynamic percentage */}
        <div className="my-6">
          <div className="flex justify-between items-center mb-2 text-[10px] font-mono">
            <span className="text-gray-400 truncate max-w-[280px] uppercase font-bold">
              {activeLog}
            </span>
            <span className="text-neon-cyan font-bold tracking-widest" id="progress-text">
              {progress}%
            </span>
          </div>
          
          {/* Progress bar boundary */}
          <div className="w-full bg-white/[0.02] h-2.5 rounded-none overflow-hidden p-[1.5px] border border-white/10 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple shadow-[0_0_8px_rgba(6,182,212,0.5)]"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>
        </div>

        {/* Digital Telemetry logs terminal box (The "Sera" experience) */}
        <div className="bg-[#030303]/90 border border-white/5 p-4 rounded-none h-28 overflow-hidden font-mono text-[9px] tracking-wide text-gray-400 flex flex-col justify-end gap-1 relative shadow-inner">
          <div className="absolute top-1 right-2 text-[7px] text-gray-600 uppercase flex items-center gap-1">
            <Terminal size={8} /> LIVE_TELEMETRY
          </div>
          
          <AnimatePresence>
            {terminalLogs.length === 0 ? (
              <span className="text-gray-600">STABILIZING CRYPTON LINK MODULE...</span>
            ) : (
              terminalLogs.map((log, index) => (
                <motion.div
                  key={log + index}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 0.9, x: 0 }}
                  className={`${index === terminalLogs.length - 1 ? "text-neon-cyan font-semibold" : "text-gray-500"}`}
                >
                  &gt; {log}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Interactive Reveal CTA (Dynamic Avengers styled entry) */}
        <div className="mt-8 flex justify-center">
          {!isDone ? (
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 py-2">
              <Cpu size={11} className="animate-spin" />
              <span className="tracking-widest uppercase animate-pulse">PROBING ENVIROMENTAL PATTERNS...</span>
            </div>
          ) : (
            <motion.button
              id="initialize-button"
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="avengers-text-simple px-8 py-4 bg-white text-black font-bold tracking-[0.25em] text-xs skew-x-[-12deg] rounded-none hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_25px_#06b6d4] transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              INITIALIZE INTERFACE
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
