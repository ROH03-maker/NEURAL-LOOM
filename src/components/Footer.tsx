import React, { useState, useEffect } from "react";
import { sound } from "./SoundEngine";
import { Radio, Heart, Cpu, ShieldAlert, Instagram, Linkedin, Github, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    sound.triggerInteractionClick();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToTop = () => {
    sound.triggerInteractionClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/5 py-16 relative overflow-hidden grid-lines">
      {/* Scroll to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          type="button"
          className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full bg-black/80 border border-neon-cyan/40 text-neon-cyan hover:text-black hover:bg-neon-cyan hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] flex items-center justify-center transition-all cursor-pointer duration-300 active:scale-95 animate-pulse"
          title="Back to Top"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* Soft Ambient shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neon-cyan/5 via-neon-purple/5 to-transparent pointer-events-none" />

      {/* Main stats meta row from Sleek Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 border-b border-white/5 pb-10">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Current Node</span>
          <span className="text-sm font-mono tracking-tighter text-white">SF_LAB_44_202</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Uptime Status</span>
          <span className="text-sm font-mono tracking-tighter text-white">1,442:08:12</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Coordinates</span>
          <span className="text-sm font-mono tracking-tighter text-neon-cyan">25.61° N, 88.12° E</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">System Load</span>
          <span className="text-sm font-mono tracking-tighter text-neon-purple">AEGIS CORE SECURE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Column A: Logo pulse with DESIGN BY ROHIT underneath */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_8px_#06b6d4]" />
            <span className="text-sm font-display font-black tracking-widest text-white uppercase">NEURAL-LOOM</span>
          </div>
          <div className="text-[10px] font-mono text-neon-cyan uppercase tracking-[0.25em] mb-3 font-semibold hover:text-white transition-colors">
            DESIGN BY <span className="text-white font-extrabold">ROHIT</span>
          </div>
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-relaxed">
            WEAVING CREATIVE EXPERIENCES NATIVELY INTO STEREOSCOPIC BROWSERS
          </p>
        </div>

        {/* Column B: Internal Anchor Quick Links (Humble literal navigation paths) */}
        <div className="flex flex-wrap justify-center gap-6 text-[10px] font-mono text-gray-400">
          <button 
            onClick={() => handleNavClick("about")} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            // VISION
          </button>
          <button 
            onClick={() => handleNavClick("showcase")} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            // COGNITIVE_SUITE
          </button>
          <button 
            onClick={() => handleNavClick("lab")} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            // INNOV_LAB
          </button>
          <button 
            onClick={() => handleNavClick("projects")} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            // ARTIFACTS
          </button>
          <button 
            onClick={() => handleNavClick("roadmap")} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            // ROADMAP
          </button>
          <button 
            onClick={() => handleNavClick("contact")} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            // DISPATCH
          </button>
        </div>

        {/* Column C: Social badges and copyright with REAL logo icons */}
        <div className="flex flex-col items-center md:items-end gap-3 text-[9px] font-mono text-gray-500">
          <div className="flex space-x-3 items-center">
            <a 
              href="https://www.instagram.com/rrrohittt_3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-tr hover:from-rose-600 hover:to-pink-500 hover:border-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.65)] transition-all cursor-pointer duration-300 active:scale-95"
              title="Instagram"
            >
              <Instagram size={15} />
            </a>
            <a 
              href="https://www.linkedin.com/in/rohit-sarkar-rs03" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-black hover:bg-neon-cyan hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(6,182,212,0.65)] transition-all cursor-pointer duration-300 active:scale-95"
              title="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a 
              href="https://github.com/Rohitsarkarcodes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-black hover:bg-white hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.55)] transition-all cursor-pointer duration-300 active:scale-95"
              title="GitHub"
            >
              <Github size={15} />
            </a>
            <a 
              href="https://x.com/rrrohittt_3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-amber-950 hover:bg-[#faf6e8] hover:border-amber-300/60 hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] transition-all cursor-pointer duration-300 active:scale-95"
              title="X"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
          <div className="text-right flex flex-col items-center md:items-end gap-1">
            <span className="uppercase block">© 2026 NEURAL-LOOM LABORATORY</span>
            <span className="text-gray-600 uppercase flex items-center gap-1 mt-0.5 justify-center md:justify-end">
              &copy; 2024 Neural-Loom Ecosystem
            </span>
            <button
              onClick={handleScrollToTop}
              className="mt-2 text-neon-cyan/70 hover:text-neon-cyan text-[9px] font-mono tracking-widest uppercase flex items-center gap-1.5 border border-neon-cyan/20 px-3 py-1.5 rounded-full bg-cyan-950/20 hover:bg-cyan-950/40 transition-all cursor-pointer"
            >
              <ArrowUp size={10} className="animate-pulse" /> BACK TO TOP
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
