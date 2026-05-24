import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sound } from "./SoundEngine";
import { Cpu, Terminal, Shield, Sparkles, Volume2, VolumeX, Activity } from "lucide-react";

interface LoaderProps {
  onComplete: () => void;
}

const MEMORY_SECTORS = [
  "0xDF01_NEURAL", "0xLOOM_OS", "0xKRONO_GRID", "0xSOVEREIGN", 
  "0xMYSTIC_CORE", "0xHAZARD_LVL_9", "0xREIGN_ALPHA", "0xINTEGRITY_SHIELD"
];

const BOOT_LOG_TEMPLATES = [
  "INITIALIZING NEURAL COMMAND SEQUENCE...",
  "PROBING TIMESTREAM FOR QUANTUM ANOMALIES...",
  "SYNCHRONIZING REINFORCED SYSTEM POWER GRIDS...",
  "STABILIZING EMERALD MYSTICAL FORCES...",
  "CALIBRATING INTEGRATED CHRONOS WARP ARCHITECTURE...",
  "SHIELDING ENCRYPTED DATA TRANSMISSIONS...",
  "ENGAGING CHROME-STEEL MATRIX SYNERGETIC FEEDBACK...",
  "INJECTING MULTIVERSE SHARD DATA CHANNELS...",
  "UNLEASHING ABSOLUTE EMERALD MATRIX OVERDRIVE..."
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
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#000000] flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
    >
      {/* Decorative Gradient Defs for SVG threads */}
      <svg className="absolute w-0 h-0" fill="none">
        <defs>
          <linearGradient id="blue-pink-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
          <linearGradient id="pink-blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>

      {/* Side Neural Loom thread effects - Left */}
      <div className="absolute left-0 top-0 bottom-0 w-[15%] pointer-events-none opacity-40 hidden md:block select-none">
        <svg className="w-full h-full" viewBox="0 0 120 800" fill="none" preserveAspectRatio="none">
          <motion.path 
            d="M -10 100 C 60 200 -20 400 80 550 T 10 750" 
            stroke="url(#blue-pink-gradient)" 
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
            animate={{ d: [
              "M -10 100 C 60 200 -20 400 80 550 T 10 750",
              "M -10 120 C 80 230 -40 380 90 530 T 10 770",
              "M -10 100 C 60 200 -20 400 80 550 T 10 750"
            ]}}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d="M 5 150 C 30 250 5 450 60 600 T -5 700" 
            stroke="url(#pink-blue-gradient)" 
            strokeWidth="0.8"
            strokeDasharray="4 4"
            opacity="0.5"
            animate={{ d: [
              "M 5 150 C 30 250 5 450 60 600 T -5 700",
              "M 5 130 C 45 270 -5 420 70 580 T -5 720",
              "M 5 150 C 30 250 5 450 60 600 T -5 700"
            ]}}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Side Neural Loom thread effects - Right */}
      <div className="absolute right-0 top-0 bottom-0 w-[15%] pointer-events-none opacity-40 hidden md:block select-none">
        <svg className="w-full h-full" viewBox="0 0 120 800" fill="none" preserveAspectRatio="none">
          <motion.path 
            d="M 130 100 C 60 200 140 400 40 550 T 110 750" 
            stroke="url(#pink-blue-gradient)" 
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
            animate={{ d: [
              "M 130 100 C 60 200 140 400 40 550 T 110 750",
              "M 130 120 C 40 230 160 380 30 530 T 110 770",
              "M 130 100 C 60 200 140 400 40 550 T 110 750"
            ]}}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path 
            d="M 115 150 C 90 250 115 450 60 600 T 125 700" 
            stroke="url(#blue-pink-gradient)" 
            strokeWidth="0.8"
            strokeDasharray="4 4"
            opacity="0.5"
            animate={{ d: [
              "M 115 150 C 90 250 115 450 60 600 T 125 700",
              "M 115 130 C 75 270 125 420 50 580 T 125 720",
              "M 115 150 C 90 250 115 450 60 600 T 125 700"
            ]}}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Quiet background layout element */}
      <div className="absolute top-[-25%] left-[-10%] w-[60%] h-[60%] bg-[#06b6d4]/5 blur-[220px] rounded-full" />
      <div className="absolute bottom-[-25%] right-[-10%] w-[60%] h-[60%] bg-[#ec4899]/5 blur-[220px] rounded-full" />
 
      {/* Unique moving gold/pink scanner timeline line */}
      <motion.div
        animate={{ y: ["-10vh", "110vh"] }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 z-10 pointer-events-none"
        style={{ boxShadow: "0 0 15px rgba(6,182,212,0.4)" }}
      />

      {/* Main futuristic frame */}
      <div className="w-full max-w-xl bg-transparent p-6 sm:p-8 relative transition-all duration-300">
        
        {/* Top Header Row with status */}
        <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mb-6 pb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
            </span>
            <span className="tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 font-bold">KRONOS SYNAPSE // OPTICAL-01</span>
          </div>
          
          {/* Audio sound button controller */}
          <button 
            type="button"
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-full hover:bg-white/[0.08] active:scale-95 transition-all text-gray-400 hover:text-white"
            title="Toggle Synthesizer Feedback"
          >
            {soundMuted ? <VolumeX size={10} className="text-rose-500" /> : <Volume2 size={10} className="text-cyan-400" />}
            <span className="text-[8px] uppercase tracking-wider">CORE_AUDIO {soundMuted ? "MUTED" : "SYNTH"}</span>
          </button>
        </div>

        {/* Dynamic scanning matrix block */}
        <div className="flex flex-col items-center py-4 relative">
          
          {/* Animated Holographic Core Ring (Sera Design Layout) */}
          <div className="relative w-32 h-32 flex items-center justify-center mb-6">
            <div className="absolute inset-0 border-[0.5px] border-cyan-500/10 rounded-full animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-2 border border-dashed border-pink-500/10 rounded-full animate-[spin_16s_linear_infinite_reverse]" />
            <div className="absolute inset-4 border border-cyan-300/5 rounded-full animate-[pulse_2s_infinite]" />
            
            {/* Pulsing Core Sphere */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#021822] via-[#020d1e] to-[#12031a] flex flex-col items-center justify-center relative shadow-[0_0_30px_rgba(6,182,212,0.15)] overflow-hidden">
              {/* Neural Loom Custom Vector Logo */}
              <svg viewBox="0 0 100 100" className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]" fill="none" stroke="currentColor" strokeWidth="2">
                {/* Advanced Technical Alignment Rings */}
                <circle cx="50" cy="50" r="44" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="1 5" className="opacity-30" />
                <circle cx="50" cy="50" r="40" stroke="url(#blue-pink-gradient)" strokeWidth="0.8" className="opacity-20 animate-[spin_20s_linear_infinite]" />
                <circle cx="50" cy="50" r="36" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="6 12" className="opacity-45 animate-[spin_10s_linear_infinite_reverse]" />
                
                {/* The Loom shuttle vertical and horizontal guidance crosshairs */}
                <line x1="50" y1="6" x2="50" y2="16" stroke="#f472b6" strokeWidth="1" className="opacity-50" />
                <line x1="50" y1="84" x2="50" y2="94" stroke="#f472b6" strokeWidth="1" className="opacity-50" />
                <line x1="6" y1="50" x2="16" y2="50" stroke="#06b6d4" strokeWidth="1" className="opacity-50" />
                <line x1="84" y1="50" x2="94" y2="50" stroke="#06b6d4" strokeWidth="1" className="opacity-50" />

                {/* Weaving Neural Threads (Intricate double infinity loop representing Loom & Synapse) */}
                {/* Thread Alpha (Cyan) */}
                <motion.path 
                  d="M 28 50 C 28 35, 42 32, 50 50 C 58 68, 72 65, 72 50 C 72 35, 58 32, 50 50 C 42 68, 28 65, 28 50 Z" 
                  stroke="#06b6d4" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="opacity-95"
                  animate={{ strokeDashoffset: [0, -100] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{ strokeDasharray: "20 5 10 5" }}
                />
                
                {/* Thread Beta (Pink) */}
                <motion.path 
                  d="M 50 50 C 42 32, 28 35, 28 50 C 28 65, 42 68, 50 50 C 58 32, 72 35, 72 50 C 72 65, 58 68, 50 50 Z" 
                  stroke="#ec4899" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="opacity-90"
                  animate={{ strokeDashoffset: [0, 100] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{ strokeDasharray: "15 5 15 5" }}
                />

                {/* Vertical loom warp lines behind the nodes to add that "Weaving" context */}
                <line x1="42" y1="28" x2="42" y2="72" stroke="url(#blue-pink-gradient)" strokeWidth="0.6" strokeDasharray="2 3" className="opacity-25" />
                <line x1="58" y1="28" x2="58" y2="72" stroke="url(#pink-blue-gradient)" strokeWidth="0.6" strokeDasharray="2 3" className="opacity-25" />

                {/* Central Brain Synaptic Junction Core */}
                <g className="animate-pulse">
                  <circle cx="50" cy="50" r="5" fill="#ffffff" />
                  <circle cx="50" cy="50" r="9" stroke="#ffffff" strokeWidth="1" className="opacity-50 animate-ping" />
                </g>

                {/* Interwoven Glowing Synaptic Nodes located on the intersection points */}
                <circle cx="28" cy="50" r="3" fill="#06b6d4" className="drop-shadow-[0_0_6px_#06b6d4]" />
                <circle cx="72" cy="50" r="3" fill="#ec4899" className="drop-shadow-[0_0_6px_#ec4899]" />
                
                {/* Top and Bottom control nodes */}
                <circle cx="50" cy="35" r="2" fill="#22d3ee" />
                <circle cx="50" cy="65" r="2" fill="#f472b6" />
                
                {/* Golden/White active impulse running around */}
                <circle cx="34" cy="40" r="1.5" fill="#ffffff" className="animate-ping" style={{ animationDuration: "1.5s" }} />
                <circle cx="66" cy="60" r="1.5" fill="#ffffff" className="animate-ping" style={{ animationDuration: "2s" }} />
              </svg>
              <div className="text-[7px] font-mono text-cyan-400 tracking-wider font-extrabold mt-1 uppercase">{hexFlicker}</div>
              {/* Laser sweep scanner overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent h-1/2 w-full top-0 animate-[bounce_3s_infinite] pointer-events-none" />
            </div>

            {/* Orbiting Satellite Dot */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-[3px] pointer-events-none"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-pink-500 absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_12px_#ec4899]" />
            </motion.div>
          </div>

          {/* Neural Loom Custom Glowing Capsule Box with blue & pink design tags */}
          <div className="text-center px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500/[0.03] to-pink-500/[0.03] border border-cyan-500/10 shadow-[0_0_40px_rgba(6,182,212,0.06)] min-w-[280px]">
            <h2 className="text-4xl font-display font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-500 uppercase italic skew-x-[-12deg] drop-shadow-[0_0_20px_rgba(236,72,153,0.5)] select-none">
              NEURAL-LOOM
            </h2>
            <div className="flex items-center gap-1.5 justify-center mt-3">
              <Activity size={10} className="text-pink-400 animate-pulse" />
              <p className="text-[8px] font-mono tracking-[0.3em] text-cyan-400 uppercase font-bold">INTELLIGENT KERNEL // COGNITIVE SHIELD</p>
            </div>
          </div>
        </div>

        {/* Loading Progress Bar with dynamic percentage */}
        <div className="my-6">
          <div className="flex justify-between items-center mb-2.5 text-[10px] font-mono">
            <span className="text-gray-400 truncate max-w-[280px] uppercase font-bold">
              {activeLog}
            </span>
            <span className="text-cyan-400 font-bold tracking-widest" id="progress-text">
              {progress}%
            </span>
          </div>
          
          {/* Minimal rounded progress container without border line structure */}
          <div className="w-full bg-white/[0.03] h-1.5 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 shadow-[0_0_12px_rgba(6,182,212,0.6)] rounded-full"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>
        </div>

        {/* Digital Telemetry logs terminal box (Floating without outer frame lines) */}
        <div className="bg-transparent p-4 rounded-none h-28 overflow-hidden font-mono text-[9px] tracking-wide text-cyan-300 flex flex-col justify-end gap-1 relative">
          <div className="absolute top-1 right-2 text-[7px] text-cyan-500/50 uppercase flex items-center gap-1">
            <Terminal size={8} /> SECURE_SYSTEMS_TELEMETRY
          </div>
          
          <AnimatePresence>
            {terminalLogs.length === 0 ? (
              <span className="text-pink-500/80 font-semibold uppercase">ALIGNING SECURE SYNAPSE CODES...</span>
            ) : (
              terminalLogs.map((log, index) => (
                <motion.div
                  key={log + index}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 0.9, x: 0 }}
                  className={`${index === terminalLogs.length - 1 ? "text-pink-400 font-bold drop-shadow-[0_0_3px_rgba(236,72,153,0.3)]" : "text-cyan-600/60"}`}
                >
                  &gt; {log}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Interactive Reveal CTA (Dynamic styled entry) */}
        <div className="mt-8 flex justify-center">
          {!isDone ? (
            <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-600 font-bold py-2">
              <Cpu size={11} className="animate-spin text-pink-400" />
              <span className="tracking-widest uppercase animate-pulse">OVERLAYING SYSTEM SECURITY PROTOCOLS...</span>
            </div>
          ) : (
            <motion.button
              id="initialize-button"
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-black tracking-[0.25em] text-xs skew-x-[-12deg] rounded-none hover:from-pink-500 hover:to-cyan-400 hover:text-black hover:shadow-[0_0_30px_#ec4899] transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.4)] family-display italic"
            >
              COMMENCE SECURE ENTRY
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

