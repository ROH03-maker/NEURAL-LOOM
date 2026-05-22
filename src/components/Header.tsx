import React, { useEffect, useState } from "react";
import { sound } from "./SoundEngine";
import { Volume2, VolumeX, Radio, Clock, ShieldAlert } from "lucide-react";

export const Header: React.FC = () => {
  const [muted, setMuted] = useState(sound.getIsMuted());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [systime, setSystime] = useState("07:19:36");

  useEffect(() => {
    // Scroll tracking
    const handleScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height <= 0) return;
      const progress = (window.scrollY / height) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    // Audio status watcher
    const interval = setInterval(() => {
      setMuted(sound.getIsMuted());
    }, 400);

    // Clock updates
    const clockInterval = setInterval(() => {
      const date = new Date();
      const hrs = String(date.getUTCHours()).padStart(2, "0");
      const mins = String(date.getUTCMinutes()).padStart(2, "0");
      const secs = String(date.getUTCSeconds()).padStart(2, "0");
      setSystime(`${hrs}:${mins}:${secs}`);
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
      clearInterval(clockInterval);
    };
  }, []);

  const handleToggleSound = () => {
    const isMutedNow = sound.toggleMute();
    setMuted(isMutedNow);
    sound.triggerInteractionClick();
  };

  const handleNavClick = (sectionId: string) => {
    sound.triggerInteractionClick();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-space-black/60 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      {/* Scroll indicator bar */}
      <div 
        className="h-[2px] bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple origin-left transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        
        {/* Brand visual emblem */}
        <div 
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 border border-neon-cyan/80 rotate-45 animate-pulse"></div>
            <div className="absolute inset-1 border border-neon-purple/80 -rotate-12"></div>
            <div className="absolute inset-[10px] bg-white rounded-full shadow-[0_0_10px_#fff]"></div>
          </div>
          <div>
            <span className="text-base font-display font-bold tracking-[0.25em] text-white uppercase group-hover:text-neon-cyan transition-colors">
              Neural-Loom
            </span>
            <div className="text-[7px] font-mono tracking-wider text-neon-purple/90 font-semibold uppercase">
              System Online: v4.2.0
            </div>
          </div>
        </div>

        {/* Center navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-gray-400">
          <button 
            onClick={() => handleNavClick("about")} 
            className="hover:text-white transition-colors py-1 cursor-pointer"
          >
            // VISION
          </button>
          <button 
            onClick={() => handleNavClick("showcase")} 
            className="hover:text-white transition-colors py-1 cursor-pointer"
          >
            // COGNITIVE_SUITE
          </button>
          <button 
            onClick={() => handleNavClick("lab")} 
            className="hover:text-white transition-colors py-1 cursor-pointer"
          >
            // INNOV_LAB
          </button>
          <button 
            onClick={() => handleNavClick("projects")} 
            className="hover:text-white transition-colors py-1 cursor-pointer"
          >
            // ARTIFACTS
          </button>
          <button 
            onClick={() => handleNavClick("roadmap")} 
            className="hover:text-white transition-colors py-1 cursor-pointer"
          >
            // ROADMAP
          </button>
          <button 
            onClick={() => handleNavClick("contact")} 
            className="hover:text-white transition-colors py-1 cursor-pointer"
          >
            // INTERCONNECT
          </button>
        </nav>

        {/* Dashboard metadata and mute button */}
        <div className="flex items-center gap-4 text-xs font-mono">
          
          {/* Dynamic clock panel */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-md text-gray-400 text-[10px]">
            <Clock size={11} className="text-neon-cyan animate-pulse" />
            <span>UTC: {systime}</span>
          </div>

          {/* Active core indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-md text-gray-400 text-[10px]">
            <Radio size={11} className="text-neon-purple animate-pulse" />
            <span>CORE: ACTIVE</span>
          </div>

          {/* Audio synthezier toggle */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={() => sound.triggerHover()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neon-blue/20 bg-neon-blue/5 hover:bg-neon-blue/15 hover:border-neon-cyan/40 text-neon-cyan transition-all uppercase text-[10px] cursor-pointer"
          >
            {muted ? (
              <>
                <VolumeX size={13} className="text-red-400" />
                <span className="hidden xs:inline">AUDIO ON</span>
              </>
            ) : (
              <>
                <Volume2 size={13} className="text-neon-cyan animate-bounce" />
                <span className="hidden xs:inline">AUDIO OFF</span>
                {/* Wavy active sound bars */}
                <div className="flex gap-[1px] items-end h-2.5 ml-1">
                  <div className="w-[1.5px] bg-neon-cyan h-2 animate-[pulse_0.8s_infinite]" />
                  <div className="w-[1.5px] bg-neon-cyan h-3 animate-[pulse_0.5s_infinite_0.2s]" />
                  <div className="w-[1.5px] bg-neon-cyan h-1 animate-[pulse_0.9s_infinite_0.4s]" />
                </div>
              </>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
