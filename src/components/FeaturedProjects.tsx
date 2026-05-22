import React from "react";
import { motion } from "motion/react";
import { FEATURED_PROJECTS } from "../data";
import { sound } from "./SoundEngine";
import { ExternalLink, Layers, Terminal } from "lucide-react";

export const FeaturedProjects: React.FC = () => {

  const handleHoverCard = () => {
    sound.triggerHover();
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-space-black">
      {/* Background radial flares */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-neon-cyan">INTELLIGENT PORTFOLIO MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase">
            Featured Artifacts
          </h2>
          <p className="mt-4 text-sm text-gray-400 max-w-xl font-sans">
            A high-end synthesis of architectural visualizers, systems management control boards, and live telemetry platforms.
          </p>
        </div>

        {/* Projects list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PROJECTS.map((proj, idx) => {
            return (
              <motion.div
                key={proj.id}
                id={`project-card-${proj.id}`}
                onMouseEnter={handleHoverCard}
                whileHover={{ y: -8 }}
                className="group border border-white/5 bg-cyber-dark rounded-2xl overflow-hidden shadow-2xl relative flex flex-col justify-between"
              >
                {/* Decorative glow overlay block inside card */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Card visual frame */}
                <div>
                  <div className="h-48 overflow-hidden relative border-b border-white/5 bg-neutral-900">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-85 transition-all duration-700"
                    />
                    
                    {/* Corner badge category */}
                    <div className="absolute top-3 right-3 text-[8px] font-mono tracking-widest bg-space-black/90 text-neon-cyan px-2.5 py-1 rounded border border-neon-cyan/20 uppercase">
                      ARTIFACT_{String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Card textual block */}
                  <div className="p-6">
                    <h3 className="text-lg font-display font-bold text-white tracking-widest group-hover:text-neon-cyan transition-colors uppercase">
                      {proj.title}
                    </h3>
                    <p className="text-[10px] font-mono text-neon-purple mt-0.5 tracking-wider uppercase">
                      {proj.tagline}
                    </p>

                    <p className="text-xs text-gray-400 mt-4 leading-relaxed font-sans font-light">
                      {proj.description}
                    </p>

                    {/* Meta specifications lists */}
                    <div className="mt-6 pt-4 border-t border-white/5 flex flex-col gap-2 font-mono text-[9px]">
                      {proj.specs.map((s, sIdx) => (
                        <div key={sIdx} className="flex justify-between">
                          <span className="text-gray-500 uppercase">{s.label}:</span>
                          <span className="text-gray-300 font-bold uppercase">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer section inside the cards */}
                <div className="p-6 pt-0 border-t border-white/0">
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {proj.technologies.map((t, tIdx) => (
                      <span key={tIdx} className="text-[8px] font-mono bg-white/[0.03] text-gray-400 px-2 py-0.5 rounded border border-white/5 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Connect buttons */}
                  <div className="flex items-center justify-between font-mono text-xs text-neon-cyan pt-2 border-t border-white/5">
                    <span className="text-[9px] text-gray-500 uppercase flex items-center gap-1">
                      <Terminal size={10} /> SYS_OK
                    </span>
                    <a
                      href={proj.id === "proj_aegis" ? "https://aegis-2-0-seven.vercel.app/" : "#contact"}
                      target={proj.id === "proj_aegis" ? "_blank" : undefined}
                      rel={proj.id === "proj_aegis" ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-1 hover:text-white transition-colors py-1 cursor-pointer"
                    >
                      <span>SECURE SYNC</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
