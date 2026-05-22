import React, { useState } from "react";
import { motion } from "motion/react";
import { AI_SYSTEMS } from "../data";
import { AISystem } from "../types";
import { sound } from "./SoundEngine";
import { Cpu, RefreshCw, Layers, CheckCircle } from "lucide-react";

export const SystemsShowcase: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<AISystem>(AI_SYSTEMS[0]);

  const handleHoverStart = (id: string) => {
    setHoveredId(id);
    sound.triggerHover();
  };

  const handleSelectSystem = (sys: AISystem) => {
    sound.triggerInteractionClick();
    setSelectedSystem(sys);
  };

  return (
    <section id="showcase" className="py-24 relative overflow-hidden">
      {/* Background glow flares */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-neon-cyan">INTELLIGENT SUITE SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase">
            Cognitive Systems
          </h2>
          <p className="mt-4 text-sm text-gray-400 max-w-xl font-sans">
            Explore neural architectures configured for creative engineering, automated layout compiling, and real-time temporal telemetry tracking.
          </p>
        </div>

        {/* Master Showcase Layout: Two-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column A: Interactive List of Systems (left columns: 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {AI_SYSTEMS.map((sys) => {
              const isSelected = selectedSystem.id === sys.id;
              const isPurple = sys.glowColor === "purple";
              const isBlue = sys.glowColor === "blue";
              const borderStyle = isSelected
                ? isPurple 
                  ? "neon-text-purple border-neon-purple/80 bg-neon-purple/10" 
                  : isBlue
                    ? "border-neon-blue/80 bg-neon-blue/10"
                    : "border-neon-cyan/80 bg-neon-cyan/10"
                : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.05]";

              return (
                <motion.div
                  key={sys.id}
                  id={`system-list-${sys.id}`}
                  onMouseEnter={() => handleHoverStart(sys.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleSelectSystem(sys)}
                  whileHover={{ x: 6 }}
                  className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${borderStyle}`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      sys.status === "ONLINE" 
                        ? "bg-green-400 animate-pulse" 
                        : sys.status === "OPTIMIZING"
                          ? "bg-amber-400 animate-pulse"
                          : sys.status === "INTEGRATING"
                            ? "bg-neon-blue animate-pulse"
                            : "bg-gray-500"
                    }`} />
                    <div>
                      <h4 className="text-sm font-display font-bold text-white tracking-widest group-hover:text-neon-cyan transition-colors">
                        {sys.title}
                      </h4>
                      <p className="text-[10px] font-mono text-gray-400 uppercase mt-0.5 tracking-wider">
                        {sys.category}
                      </p>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-[10px] text-gray-500 uppercase block">{sys.metricLabel}</span>
                    <span className={`text-xs font-bold ${isPurple ? 'text-neon-purple' : 'text-neon-cyan'}`}>{sys.metricValue}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Column B: Selected Core Telemetry / Operations Panel (right columns: 7) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 relative h-full flex flex-col justify-between">
              
              {/* Corner tech indicators */}
              <div className="absolute top-4 right-4 text-[9px] font-mono text-gray-500 flex items-center gap-2">
                <Cpu size={10} className="animate-spin" />
                <span>CORE STATE: 120_FPS</span>
              </div>

              {/* Title & Stats block */}
              <div>
                <span className="text-[9px] font-mono text-neon-cyan bg-neon-cyan/10 px-2.5 py-1 rounded border border-neon-cyan/20 inline-block uppercase mb-4 tracking-widest">
                  {selectedSystem.version}
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-widest text-white uppercase">
                  {selectedSystem.title}
                </h3>
                <p className="text-[11px] font-mono text-neon-purple mt-1 uppercase tracking-widest">
                  {selectedSystem.category}
                </p>

                <p className="mt-6 text-sm text-gray-300 leading-relaxed font-sans max-w-xl">
                  {selectedSystem.description}
                </p>

                {/* Subsystem spec loops */}
                <div className="mt-8 border-t border-white/5 pt-6">
                  <span className="text-[10px] font-mono text-gray-400 block mb-3 tracking-widest">// COGNITIVE OVERLAYS</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {selectedSystem.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-mono text-gray-300">
                        <CheckCircle size={12} className="text-neon-cyan mt-0.5 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live interactive visualizers Inside the panel (Simulating dynamic streams) */}
              <div className="mt-8 border-t border-white/5 pt-6 flex flex-col sm:flex-row gap-6 items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-left font-mono">
                    <span className="text-[9px] text-gray-500 block">SYSTEM STATUS:</span>
                    <span className="text-xs text-white font-bold tracking-widest">{selectedSystem.status}</span>
                  </div>
                  <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />
                  <div className="text-left font-mono">
                    <span className="text-[9px] text-gray-500 block">TELEMETRY KPI:</span>
                    <span className="text-xs text-neon-cyan font-bold tracking-widest">{selectedSystem.metricValue}</span>
                  </div>
                </div>

                {/* Simulated Wave visualization using simple styled CSS bars */}
                <div className="flex gap-1 h-8 items-end p-1.5 bg-white/[0.02] border border-white/5 rounded-md w-full sm:w-auto justify-center">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
                    const delay = (i % 3) * 0.15;
                    return (
                      <motion.div
                        key={i}
                        animate={{ height: ["4px", "24px", "4px"] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8 + delay,
                          ease: "easeInOut",
                        }}
                        className={`w-[3px] rounded-full ${selectedSystem.glowColor === "purple" ? "bg-neon-purple" : "bg-neon-cyan"}`}
                      />
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
