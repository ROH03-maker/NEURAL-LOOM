import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sound } from "./components/SoundEngine";
import { Loader } from "./components/Loader";
import { CustomCursor } from "./components/CustomCursor";
import { Header } from "./components/Header";
import { SystemsShowcase } from "./components/SystemsShowcase";
import { InteractiveTech } from "./components/InteractiveTech";
import { InnovationLab } from "./components/InnovationLab";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { VisionTimeline } from "./components/VisionTimeline";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { NeuralCanvas } from "./components/NeuralCanvas";

// Lucide icon assets for about cards
import { Cpu, Zap, Database, Sparkles, Code, AppWindow, Workflow } from "lucide-react";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [globalSpeed, setGlobalSpeed] = useState(1);
  const [globalTheme, setGlobalTheme] = useState<"blue" | "purple" | "both">("both");

  const handleNavClick = (sectionId: string) => {
    sound.triggerInteractionClick();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHoverInteractive = () => {
    sound.triggerHover();
  };

  return (
    <>
      {/* 1. Cinematic Loading Boot Screen */}
      <AnimatePresence mode="wait">
        {!loaded && (
          <Loader key="loader" onComplete={() => setLoaded(true)} />
        )}
      </AnimatePresence>

      {/* Main Container Wrapper - Visible once loaded */}
      {loaded && (
        <div className="relative min-h-screen bg-space-black font-sans leading-relaxed selection:bg-neon-cyan/30 selection:text-white">
          
          {/* Custom Trail Cursor */}
          <CustomCursor />

          {/* Interactive Header Navigation widgets bar */}
          <Header />

          {/* 1. Cinematic Hero Section */}
          <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden bg-space-black grid-lines">
            {/* Absolute ambient backgrounds */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-gradient-to-tr from-neon-blue/10 via-neon-cyan/5 to-neon-purple/15 rounded-full blur-[100px] pointer-events-none" />
            
            {/* Fullscreen background interactive neural web */}
            <div className="absolute inset-0 z-0">
              <NeuralCanvas glowMode={globalTheme} speedMultiplier={globalSpeed} />
            </div>

            {/* Content Foreground Layout */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center my-auto pt-16">
              
              {/* Launcher/Aesthetic prompt credit overlay */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-2 px-4 py-1.5 bg-white/[0.02] border border-neon-cyan/30 rounded-full text-neon-cyan text-[9px] font-mono mb-8 tracking-[0.25em] text-center uppercase shadow-[0_0_15px_rgba(6,182,212,0.1)]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_5px_#06b6d4]"></span>
                <span>Next-Gen Creative Technology</span>
              </motion.div>

              {/* Spectacular Cinematic Headings */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-[0.9] flex flex-col items-center select-none"
              >
                <span className="avengers-title text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl py-2 block">
                  Weaving Intelligence
                </span>
                <span className="text-white italic tracking-widest font-extrabold font-display skew-x-[-12deg] block mt-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
                  INTO REALITY
                </span>
              </motion.h1>

              {/* Subheading text summary */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-6 text-base sm:text-lg text-gray-400 max-w-xl mx-auto font-sans font-light italic leading-relaxed"
              >
                Crafting cinematic digital experiences through the lens of artificial cognition and advanced aesthetic engineering.
              </motion.p>

              {/* Action Buttons row (Magnetic CTAs representation) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="mt-10 flex flex-col sm:flex-row gap-5 items-center justify-center w-full"
              >
                {/* Primary: Establish integrity anchor */}
                <button
                  onClick={() => handleNavClick("about")}
                  onMouseEnter={handleHoverInteractive}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black font-display text-xs font-bold rounded-sm tracking-[0.2em] uppercase hover:scale-105 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                >
                  Enter Interface
                </button>

                {/* Secondary: Launch simulator engine */}
                <button
                  onClick={() => handleNavClick("lab")}
                  onMouseEnter={handleHoverInteractive}
                  className="w-full sm:w-auto px-8 py-4 bg-transparent text-white duration-300 border border-white/25 hover:border-white/60 hover:bg-white/[0.04] rounded-sm font-display text-xs font-bold tracking-[0.2em] uppercase hover:scale-105 transition-all cursor-pointer"
                >
                  LAUNCH SIMULATOR ENGINE
                </button>
              </motion.div>

              {/* Horizontal line telemetry separator */}
              <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.25 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="w-full border-b border-white/10 my-16 max-w-lg"
              />

              {/* Live server sockets footer list */}
              <div className="grid grid-cols-3 gap-6 font-mono text-[9px] text-gray-500 w-full max-w-md">
                <div className="flex flex-col text-center">
                  <span>PING LATENCY</span>
                  <span className="text-neon-cyan font-bold block mt-0.5" id="latency-stats">1.2 MS // SYNCED</span>
                </div>
                <div className="flex flex-col text-center border-x border-white/5">
                  <span>COGNITIVE CORE</span>
                  <span className="text-neon-purple font-bold block mt-0.5" id="core-nodes">AEGIS v4.8</span>
                </div>
                <div className="flex flex-col text-center">
                  <span>NETWORK INDEX</span>
                  <span className="text-white font-bold block mt-0.5" id="secure-net">LOOM_ACTIVE</span>
                </div>
              </div>

            </div>
          </section>

          {/* 2. About Neural-Loom Section (The Vision) */}
          <section id="about" className="py-24 relative overflow-hidden bg-cyber-dark/60">
            {/* Left and right ambient spotlights */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-neon-blue/5 rounded-full blur-[140px]" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-neon-purple/5 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
              
              {/* Section Header */}
              <div className="mb-16 text-center max-w-xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-widest text-neon-cyan">WHO WE ARE</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase">
                  OUR COGNITIVE PHILOSOPHY
                </h2>
                <p className="mt-4 text-sm text-gray-450 leading-relaxed font-sans">
                  Neural-Loom represents the convergence of advanced digital art, immersive interactions, and predictive token workflows.
                </p>
              </div>

              {/* Three Vision column grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Vision A */}
                <motion.div
                  onMouseEnter={handleHoverInteractive}
                  whileHover={{ y: -6 }}
                  className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-neon-blue/5 border border-neon-blue/20 flex items-center justify-center text-neon-blue mb-6">
                      <Cpu size={20} />
                    </div>
                    <h3 className="text-base font-display font-bold text-white uppercase tracking-widest">
                      Autonomous Intelligence
                    </h3>
                    <p className="text-[10px] font-mono text-neon-cyan mt-0.5 tracking-wider uppercase">
                      COGNITIVE_CORE_V4
                    </p>
                    <p className="mt-4 text-xs text-gray-400 font-sans leading-relaxed">
                      Employing programmatic intent crawlers and micro-agent frameworks to optimize creative execution boundaries. Weaving complex concepts seamlessly into production assets.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 text-[9px] font-mono text-gray-500 uppercase">
                    SYS_LOAD: 12.8% OVERALL
                  </div>
                </motion.div>

                {/* Vision B */}
                <motion.div
                  onMouseEnter={handleHoverInteractive}
                  whileHover={{ y: -6 }}
                  className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-neon-purple/5 border border-neon-purple/20 flex items-center justify-center text-neon-purple mb-6">
                      <Workflow size={20} />
                    </div>
                    <h3 className="text-base font-display font-bold text-white uppercase tracking-widest">
                      Intelligent UI Layers
                    </h3>
                    <p className="text-[10px] font-mono text-neon-purple mt-0.5 tracking-wider uppercase">
                      INTERACTION_CANVAS_TOKEN
                    </p>
                    <p className="mt-4 text-xs text-gray-400 font-sans leading-relaxed">
                      Custom fluid layout calculations centered entirely around user behaviors, visual contrast guidelines, and physics-driven scroll indicators. Beautiful responsive scaling on every pixel.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 text-[9px] font-mono text-gray-500 uppercase">
                    COMPILED: ESM_COMPLIANT
                  </div>
                </motion.div>

                {/* Vision C */}
                <motion.div
                  onMouseEnter={handleHoverInteractive}
                  whileHover={{ y: -6 }}
                  className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center text-green-400 mb-6">
                      <Code size={20} />
                    </div>
                    <h3 className="text-base font-display font-bold text-white uppercase tracking-widest">
                      Advanced Web Synthetics
                    </h3>
                    <p className="text-[10px] font-mono text-green-450 mt-0.5 tracking-wider uppercase">
                      CREATIVE_ENGINE_LOGIC
                    </p>
                    <p className="mt-4 text-xs text-gray-400 font-sans leading-relaxed">
                      High-fidelity client-only architectures compiled with absolute clean code, optimized web audio synthesizer grids, and vector tracking math maps that load instantly.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 text-[9px] font-mono text-gray-500 uppercase">
                    RENDER: LIGHTWEIGHT_HTML5
                  </div>
                </motion.div>

              </div>

            </div>
          </section>

          {/* 3. AI Systems Showcase Segment (Integrated component) */}
          <SystemsShowcase />

          {/* 4. Interactive Technology Section */}
          <InteractiveTech 
            onSpeedChange={(speed) => setGlobalSpeed(speed)} 
            onThemeChange={(theme) => setGlobalTheme(theme)} 
          />

          {/* 5. Innovation Lab Section */}
          <InnovationLab />

          {/* 6. Featured Artifacts (Connect to personal portfolio projects) */}
          <FeaturedProjects />

          {/* 7. Vision Timeline Roadmap */}
          <VisionTimeline />

          {/* 8. Contact & Collaboration Form Section */}
          <ContactSection />

          {/* 9. Glowing Footer */}
          <Footer />

        </div>
      )}
    </>
  );
}
