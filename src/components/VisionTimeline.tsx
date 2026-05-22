import React from "react";
import { motion } from "motion/react";
import { TIMELINE_MILESTONES } from "../data";
import { sound } from "./SoundEngine";
import { Calendar, Compass, Grid } from "lucide-react";

export const VisionTimeline: React.FC = () => {
  return (
    <section id="roadmap" className="py-24 relative overflow-hidden bg-[#07070f]">
      {/* Background neon grid lines overlay */}
      <div className="absolute inset-0 bg-space-black bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      {/* Glow flares */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-neon-cyan">TEMPORAL SYSTEM EXPANSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase">
            Vision Timeline
          </h2>
          <p className="mt-4 text-sm text-gray-400 max-w-xl mx-auto font-sans">
            Chronological log tracking our core AI advancements, integrated laboratory modules, and upcoming spatial technologies.
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative mt-20 max-w-4xl mx-auto">
          
          {/* Central Vertical connecting Line (Desktop Only) */}
          <div className="absolute left-[16px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-neon-blue via-neon-purple to-zinc-900 -translate-x-1/2 hidden md:block" />

          {/* Staggered milestones cards list */}
          <div className="flex flex-col gap-16 md:gap-24">
            {TIMELINE_MILESTONES.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = milestone.status === "ACTIVE";
              const isComp = milestone.status === "COMPLETED";

              return (
                <div 
                  key={idx}
                  className={`flex flex-col md:flex-row items-start relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* Phase circle pointer marker */}
                  <div className="absolute left-0 md:left-1/2 top-1.5 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.25 }}
                      onMouseEnter={() => sound.triggerHover()}
                      className={`w-9 h-9 rounded-full border bg-cyber-dark flex items-center justify-center shadow-lg cursor-pointer ${
                        isActive
                          ? "border-neon-cyan shadow-neon-cyan/35"
                          : isComp
                            ? "border-neon-purple/70"
                            : "border-white/5"
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full ${
                        isActive
                          ? "bg-neon-cyan animate-ping"
                          : isComp
                            ? "bg-neon-purple"
                            : "bg-zinc-800"
                      }`} />
                    </motion.div>
                  </div>

                  {/* Spacer offset for desktop columns (50% wide) */}
                  <div className="w-full md:w-1/2 hidden md:block" />

                  {/* Content Panel (50% wide on desktop, shifted left/right) */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="w-full md:w-[45%] pl-10 md:pl-0"
                  >
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 shadow-2xl relative">
                      
                      {/* Telemetry calendar indicator */}
                      <div className="flex justify-between items-center mb-4 text-[10px] font-mono">
                        <span className="text-neon-cyan tracking-widest uppercase flex items-center gap-1.5">
                          <Compass size={11} className={isActive ? "animate-spin" : ""} />
                          {milestone.stage}
                        </span>
                        <span className={`px-2 py-0.5 rounded border uppercase text-[9px] ${
                          isActive
                            ? "bg-neon-cyan/15 border-neon-cyan text-white animate-pulse"
                            : isComp
                              ? "bg-white/5 border-white/10 text-gray-400"
                              : "bg-black/50 border-white/5 text-gray-500"
                        }`}>
                          {milestone.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-display font-bold text-white tracking-widest uppercase">
                        {milestone.title}
                      </h3>
                      <p className="text-[10px] font-mono text-neon-purple font-medium uppercase mt-0.5 tracking-wider">
                        Target: {milestone.period}
                      </p>

                      <p className="text-xs text-gray-400 mt-4 leading-relaxed font-sans">
                        {milestone.description}
                      </p>

                      {/* Technical checklist targets */}
                      <div className="mt-5 pt-4 border-t border-white/5">
                        <span className="text-[9px] font-mono text-gray-500 uppercase block mb-2 tracking-widest">
                          // DEVELOPMENT MATRIX INDICATE
                        </span>
                        <div className="flex flex-col gap-1.5">
                          {milestone.indicators.map((ind, iIdx) => (
                            <div key={iIdx} className="flex items-center gap-2 text-[10px] font-mono text-gray-350">
                              <span className="w-1 h-1 rounded-full bg-neon-cyan shrink-0" />
                              <span className="truncate">{ind}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
