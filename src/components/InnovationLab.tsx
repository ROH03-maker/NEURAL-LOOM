import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sound } from "./SoundEngine";
import { INNOVATION_EXPERIMENTS } from "../data";
import { InnovationExperiment } from "../types";
import { Beaker, BarChart2, Radio, Music, Zap, RefreshCw } from "lucide-react";

export const InnovationLab: React.FC = () => {
  const [activeExp, setActiveExp] = useState<InnovationExperiment>(INNOVATION_EXPERIMENTS[0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Interactive configurations for sandbox
  const [warpGravity, setWarpGravity] = useState<number>(1.2);
  const [sineFrequency, setSineFrequency] = useState<number>(3);
  const [sineAmplitude, setSineAmplitude] = useState<number>(40);

  // Keyboard notes helper for Synthesizer layout
  const synthKeys = [
    { note: "C4", name: "COGNITIVE_C", hz: 261.63, active: false },
    { note: "D4", name: "RESONATOR_D", hz: 293.66, active: false },
    { note: "E4", name: "VECTOR_E", hz: 329.63, active: false },
    { note: "G4", name: "QUANTUM_G", hz: 392.00, active: false },
    { note: "A4", name: "SYNAPSE_A", hz: 440.00, active: false },
    { note: "C5", name: "OVERLOAD_C", hz: 523.25, active: false },
  ];

  const handleSelectExp = (exp: InnovationExperiment) => {
    sound.triggerInteractionClick();
    setActiveExp(exp);
  };

  const handlePlayTone = (hz: number) => {
    sound.triggerInteractionClick();
    // Use dynamic tone if audio is unmuted
    if (!sound.getIsMuted()) {
      sound.triggerSuccessPulse();
    }
  };

  // Rendering Loops for Sandbox canvas based on state
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Set canvas dimensions
    canvas.width = 500;
    canvas.height = 260;

    // Particles for WARP
    const warpParticles: { x: number; y: number; speed: number; angle: number; rad: number }[] = [];
    for (let i = 0; i < 40; i++) {
      warpParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 0.5,
        angle: Math.random() * Math.PI * 2,
        rad: Math.random() * 2 + 0.5
      });
    }

    const renderLoop = () => {
      ctx.fillStyle = "rgba(10, 10, 20, 0.25)"; // slight clear trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      time += 0.03;

      if (activeExp.type === "WARP") {
        // Render Quantum Warp (rotating vector fields dragging particles)
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        ctx.strokeStyle = "rgba(0, 210, 255, 0.04)";
        ctx.lineWidth = 0.5;
        // Drawing vector rings
        for (let r = 20; r < 200; r += 35) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        warpParticles.forEach((p) => {
          // Circular rotation pulling mathematically towards core
          p.angle += (0.015 * warpGravity);
          const distFromCenter = 100 + Math.sin(time + p.speed) * 30;
          p.x = cx + Math.cos(p.angle) * distFromCenter;
          p.y = cy + Math.sin(p.angle) * distFromCenter;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.rad + (warpGravity * 0.4), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 242, 254, 0.7)`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#00f2fe";
          ctx.fill();
          ctx.shadowBlur = 0;
        });

      } else if (activeExp.type === "OSCILLOSCOPE") {
        // Render dual overlapping sine waves representing cerebral interference
        ctx.lineWidth = 1.5;

        // Wave A (Cyan)
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const y = (canvas.height / 2) + Math.sin((x * 0.02 * sineFrequency) + time) * sineAmplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(0, 210, 255, 0.75)";
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#00d2ff";
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Wave B (Purple - out of phase)
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const y = (canvas.height / 2) + Math.sin((x * 0.015 * sineFrequency) - time + 10) * (sineAmplitude * 0.7);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(157, 80, 187, 0.6)";
        ctx.shadowBlur = 5;
        ctx.shadowColor = "#9d50bb";
        ctx.stroke();
        ctx.shadowBlur = 0;

      } else if (activeExp.type === "SYNTH") {
        // Renders active pulsing radial rings mimicking vocal synthesizer triggers
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        ctx.strokeStyle = "rgba(157, 80, 187, 0.3)";
        ctx.lineWidth = 2;

        const pulseScale = (Math.sin(time * 5) + 1) / 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 30 + pulseScale * 50, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 210, 255, 0.8)";
        ctx.fill();

        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.font = "italic 9px monospace";
        ctx.fillText("AUDIO WAVE GRID TRIGGER: ON", cx - 74, cy + 82);
      }

      animId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeExp, warpGravity, sineFrequency, sineAmplitude]);

  return (
    <section id="lab" className="py-24 relative overflow-hidden bg-cyber-dark/40">
      {/* Absolute glow atmosphere background highlights */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Title Header */}
        <div className="mb-16 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-neon-cyan">INNOVATIVE SANDBOX PORT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white uppercase">
            Evolutionary Lab
          </h2>
          <p className="mt-4 text-sm text-gray-450 max-w-xl font-sans">
            Launch specialized browser-based client experiences to manipulate cryptographic mathematical algorithms in high-fidelity sandbox simulators.
          </p>
        </div>

        {/* Bento sandbox columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Selector sidebar panel (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {INNOVATION_EXPERIMENTS.map((exp) => {
              const isActive = activeExp.id === exp.id;
              return (
                <div
                  key={exp.id}
                  id={`lab-selector-${exp.id}`}
                  onClick={() => handleSelectExp(exp)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? "border-neon-purple bg-neon-purple/10 glow-border-purple" 
                      : "border-white/5 bg-cyber-dark/60 hover:bg-white/[0.03] hover:border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-mono tracking-widest text-neon-cyan uppercase">
                      READY // RUNNING
                    </span>
                    <span className="text-[10px] font-mono text-neon-purple font-semibold">{exp.complexity} COMP</span>
                  </div>

                  <h3 className="text-base font-display font-bold text-white uppercase tracking-widest">
                    {exp.name}
                  </h3>
                  <p className="text-[10px] font-mono text-gray-400 mt-1 uppercase">
                    {exp.tagline}
                  </p>

                  <p className="text-xs text-gray-450 mt-4 font-sans line-clamp-2">
                    {exp.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Holographic Simulator workspace output (8 cols) */}
          <div className="lg:col-span-8">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col justify-between h-full min-h-[380px]">
              
              {/* Header metadata layout */}
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
                <div className="flex items-center gap-2">
                  <Beaker size={14} className="text-neon-cyan animate-pulse" />
                  <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">
                    {activeExp.name} Sandbox Terminal
                  </span>
                </div>
                <div className="text-[9px] font-mono text-gray-500 uppercase">
                  SIM_ID: {activeExp.id.toUpperCase()}
                </div>
              </div>

              {/* Rendering Canvas Visual Body */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Visual canvas simulator */}
                <div className="md:col-span-7 bg-black/40 border border-white/5 rounded-xl overflow-hidden relative">
                  <canvas ref={canvasRef} className="block w-full h-auto" />
                  <div className="absolute bottom-2 left-2 text-[8px] font-mono text-gray-500 bg-space-black/80 px-2 py-0.5 rounded">
                    SYS_FEED_LIVE_SECURE
                  </div>
                </div>

                {/* Simulation dials modifier controls (Right nested) */}
                <div className="md:col-span-5 flex flex-col gap-4 font-mono text-xs text-gray-300">
                  <span className="text-[10px] text-gray-500 tracking-wider uppercase">// PARAMETER ADJUSTMENTS</span>
                  
                  {activeExp.type === "WARP" && (
                    <div className="flex flex-col gap-3">
                      <div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span>Gravity Core Warp</span>
                          <span className="text-neon-cyan">{warpGravity}x</span>
                        </div>
                        <input
                          type="range"
                          min="0.3"
                          max="2.5"
                          step="0.1"
                          value={warpGravity}
                          onChange={(e) => setWarpGravity(parseFloat(e.target.value))}
                          className="w-full h-1 bg-neutral-900 rounded appearance-none cursor-pointer accent-neon-cyan"
                        />
                      </div>
                      <p className="text-[9px] text-gray-500 uppercase leading-relaxed mt-2">
                        Bends spatial particle vector tracking paths mathematically in real-time.
                      </p>
                    </div>
                  )}

                  {activeExp.type === "OSCILLOSCOPE" && (
                    <div className="flex flex-col gap-3">
                      <div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span>Resonance Freq</span>
                          <span className="text-neon-cyan">{sineFrequency} Hz</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="8"
                          step="1"
                          value={sineFrequency}
                          onChange={(e) => setSineFrequency(parseInt(e.target.value))}
                          className="w-full h-1 bg-neutral-900 rounded appearance-none cursor-pointer accent-neon-cyan"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span>Amplitude</span>
                          <span className="text-neon-purple">{sineAmplitude} px</span>
                        </div>
                        <input
                          type="range"
                          min="15"
                          max="80"
                          value={sineAmplitude}
                          onChange={(e) => setSineAmplitude(parseInt(e.target.value))}
                          className="w-full h-1 bg-neutral-900 rounded appearance-none cursor-pointer accent-neon-purple"
                        />
                      </div>
                    </div>
                  )}

                  {activeExp.type === "SYNTH" && (
                    <div className="flex flex-col gap-2.5">
                      <span className="text-[9px] text-neon-purple uppercase font-bold tracking-widest">// COGNITIVE VOICE GRID</span>
                      
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        {synthKeys.map((k) => (
                          <button
                            key={k.note}
                            id={`synth-key-${k.note}`}
                            onClick={() => handlePlayTone(k.hz)}
                            className="bg-white/[0.02] hover:bg-neon-purple/20 pr-2 pl-3 py-2 border border-white/5 hover:border-neon-purple/50 rounded-lg text-[9px] font-mono text-left flex items-center justify-between group transition-all"
                          >
                            <span className="text-white group-hover:text-neon-cyan transition-colors">{k.note}</span>
                            <span className="text-gray-500 text-[8px] transform scale-90">{k.name.slice(0, 3)}</span>
                          </button>
                        ))}
                      </div>
                      <p className="text-[8px] text-gray-500 uppercase leading-relaxed mt-2 text-center">
                        UNMUTE AND TAP BUTTONS TO EMIT SYNTH TONES
                      </p>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
