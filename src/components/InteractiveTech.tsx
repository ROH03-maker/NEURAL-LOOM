import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sound } from "./SoundEngine";
import { Shield, Settings, Zap, Sliders, AlertTriangle, PlaySquare } from "lucide-react";
import { NeuralCanvas } from "./NeuralCanvas";

interface InteractiveTechProps {
  onSpeedChange?: (speed: number) => void;
  onThemeChange?: (theme: "blue" | "purple" | "both") => void;
}

export const InteractiveTech: React.FC<InteractiveTechProps> = ({
  onSpeedChange,
  onThemeChange,
}) => {
  const [shieldActive, setShieldActive] = useState(true);
  const [laserSpeed, setLaserSpeed] = useState(1);
  const [activeTheme, setActiveTheme] = useState<"blue" | "purple" | "both">("both");
  const [isOverloaded, setIsOverloaded] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [decibels, setDecibels] = useState<number[]>([12, 14, 25, 40, 15, 10, 8, 30, 24]);

  // Audio & Speed state synchronizer
  const handleScaleSpeed = (val: number) => {
    setLaserSpeed(val);
    if (onSpeedChange) onSpeedChange(val);
    sound.triggerHover();
  };

  const handleToggleTheme = (theme: "blue" | "purple" | "both") => {
    setActiveTheme(theme);
    if (onThemeChange) onThemeChange(theme);
    sound.triggerInteractionClick();
  };

  const handleToggleShield = () => {
    setShieldActive(!shieldActive);
    sound.triggerInteractionClick();
  };

  const handleOvercharge = () => {
    sound.triggerWarp();
    setIsOverloaded(!isOverloaded);
    if (!isOverloaded) {
      setLaserSpeed(3.5);
      if (onSpeedChange) onSpeedChange(3.5);
    } else {
      setLaserSpeed(1);
      if (onSpeedChange) onSpeedChange(1);
    }
  };

  // Keep decibel visualizer fluctuating smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setDecibels(prev => 
        prev.map(() => Math.floor(Math.random() * (isOverloaded ? 40 : 25)) + (isOverloaded ? 30 : 5))
      );
    }, 180);
    return () => clearInterval(interval);
  }, [isOverloaded]);

  return (
    <section id="tech" className="py-24 relative overflow-hidden bg-space-black grid-lines">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#050508]/10 to-space-black" />
      
      {/* Floating neon mesh overlay */}
      <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br transition-all duration-700 pointer-events-none ${
        isOverloaded 
          ? "from-red-950/20 via-transparent to-space-black" 
          : "from-neon-blue/5 via-transparent to-space-black"
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Title */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-purple animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-neon-purple">DYNAMIC OPERATING CONTROL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase">
            Interactive Technology
          </h2>
          <p className="mt-4 text-sm text-gray-400 max-w-xl mx-auto font-sans">
            Alter core neural velocities, command cryptographic protection layers, and modulate frequency grids dynamically.
          </p>
        </div>

        {/* Tactical Terminal Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Section 1: Dynamic Visual Stage (7 cols) */}
          <div className="lg:col-span-7 border border-white/5 bg-cyber-dark/80 rounded-2xl p-4 sm:p-6 overflow-hidden relative shadow-2xl flex flex-col justify-between">
            {/* Ambient Core Alarm indicators */}
            <AnimatePresence>
              {isOverloaded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-red-900/10 border border-red-500/20 rounded-2xl pointer-events-none flex flex-col items-center justify-center z-20"
                >
                  <AlertTriangle className="text-red-500 animate-bounce mb-2" size={32} />
                  <span className="font-orbitron text-xs text-red-400 font-bold tracking-widest">
                    SYSTEM OVERLOAD ACTIVE // REACTOR CRITICAL
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dashboard Telemetry header */}
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 border-b border-white/5 pb-3">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isOverloaded ? 'bg-red-500 animate-pulse' : 'bg-neon-cyan animate-pulse'}`} />
                <span>ACTIVE STOCHASTIC NETWORKS</span>
              </div>
              <span className="hidden sm:inline">NODES: {12 + Math.floor(laserSpeed * 4)} | FPS: {isOverloaded ? "138_WARN" : "120_OK"}</span>
            </div>

            {/* Real Neural Canvas Stage */}
            <div className="h-[250px] sm:h-[350px] my-4 rounded-xl border border-white/5 bg-space-black/50 overflow-hidden relative">
              <NeuralCanvas 
                glowMode={activeTheme} 
                speedMultiplier={laserSpeed} 
                activeCoreSignal={isOverloaded} 
              />
              <div className="absolute top-2 left-2 text-[9px] font-mono text-gray-500 px-2 py-0.5 bg-space-black/80 rounded">
                STAGE_CANVAS_01
              </div>
            </div>

            {/* Bottom active spec metrics list */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-4 text-[10px] font-mono text-gray-400">
              <div className="flex gap-4">
                <div>
                  <span className="text-gray-500">SPEED SLIDE:</span>
                  <span className="text-neon-cyan font-bold ml-1">{laserSpeed.toFixed(1)}x</span>
                </div>
                <div>
                  <span className="text-gray-500">GLOW CODE:</span>
                  <span className="text-neon-purple font-bold ml-1 uppercase">{activeTheme}</span>
                </div>
              </div>
              <div>
                <span className="text-gray-500">SHIELD STATE:</span>
                <span className={`font-bold ml-1 ${shieldActive ? 'text-green-400' : 'text-red-400'}`}>
                  {shieldActive ? "CONNECTED" : "INACTIVE"}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Operating Knobs & Sliders (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Widget A: Core Modulation dials */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sliders size={16} className="text-neon-cyan" />
                  <span className="text-xs font-mono tracking-widest text-white uppercase font-bold">Modulation Terminal</span>
                </div>

                {/* Subsystem Slider for frequency */}
                <div className="mb-6">
                  <div className="flex justify-between items-center text-[10px] font-mono mb-2">
                    <span className="text-gray-400 uppercase">Neural Speed Coefficient</span>
                    <span className="text-neon-cyan font-bold">{laserSpeed.toFixed(1)} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="4.0"
                    step="0.1"
                    value={laserSpeed}
                    onChange={(e) => handleScaleSpeed(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-gray-500 mt-1">
                    <span>LENTISSIMO_0.2</span>
                    <span>ALLEGRO_4.0</span>
                  </div>
                </div>

                {/* Theme Selector triggers */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono text-gray-450 block mb-2 uppercase tracking-wide">
                    Holographic Core Chromancy
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {["blue", "purple", "both"].map((th) => (
                      <button
                        key={th}
                        onClick={() => handleToggleTheme(th as any)}
                        className={`px-3 py-2 border rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer ${
                          activeTheme === th
                            ? "bg-neon-cyan/10 border-neon-cyan text-white shadow shadow-neon-cyan/25"
                            : "border-white/5 bg-white/[0.01] hover:bg-white/[0.05] hover:border-white/10 text-gray-400"
                        }`}
                      >
                        {th}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cryptographic Shield control */}
                <div className="mb-6">
                  <div className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                    <div className="flex items-center gap-2.5">
                      <Shield size={16} className={shieldActive ? "text-green-400" : "text-gray-500"} />
                      <div>
                        <span className="text-[10px] font-mono text-white block uppercase font-bold">
                          Cryptographic Firewall
                        </span>
                        <span className="text-[8px] font-mono text-gray-500 block uppercase">
                          Encrypted Node Syncing Layer
                        </span>
                      </div>
                    </div>
                    {/* Toggle Button */}
                    <button
                      onClick={handleToggleShield}
                      className={`w-10 h-5 rounded-full p-[2px] transition-colors duration-300 cursor-pointer ${
                        shieldActive ? "bg-green-500" : "bg-neutral-800"
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                        shieldActive ? "translate-x-5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Danger Action: Core Overload */}
              <div className="border-t border-white/5 pt-6">
                <button
                  onClick={handleOvercharge}
                  className={`w-full py-3.5 rounded-xl font-display font-black tracking-widest text-xs uppercase border transition-all duration-300 cursor-pointer ${
                    isOverloaded
                      ? "bg-red-500/10 border-red-500 text-red-400 hover:bg-red-500/20 shadow-lg shadow-red-500/20"
                      : "bg-gradient-to-r from-neon-purple to-pink-600 border-none text-white shadow-lg shadow-neon-purple/20 hover:opacity-90"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Zap size={14} className={isOverloaded ? "animate-ping" : ""} />
                    <span>{isOverloaded ? "REVERT REACTOR OVERLOAD" : "OVERCHARGE COGNITIVE CORE"}</span>
                  </div>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
