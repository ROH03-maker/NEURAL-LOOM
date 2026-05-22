import { AISystem, InnovationExperiment, FeaturedProject, TimelineMilestone } from "./types";

export const AI_SYSTEMS: AISystem[] = [
  {
    id: "sys_aegis",
    title: "AEGIS Core Ecosystem",
    category: "Autonomous Intelligence Agent",
    description: "An advanced adaptive cognitive assistant operating in real-time. Leverages multi-modal semantic synthesis to automate high-complexity creative processes.",
    status: "ONLINE",
    version: "v4.8.2-alpha",
    metricLabel: "Sync Efficiency",
    metricValue: "99.98%",
    glowColor: "cyan",
    details: [
      "Natural language intent parsing",
      "Dynamic context state tree synchronization",
      "Self-reflective telemetry error healing",
      "Multi-agent task orchestration"
    ]
  },
  {
    id: "sys_synaptic",
    title: "Synaptic Workflow Synthesizer",
    category: "Intelligent Design Layer",
    description: "Automated digital layout and visual composition generation. Weaves intelligent UI states directly to high-fidelity canvas contexts recursively.",
    status: "OPTIMIZING",
    version: "v2.0.4-beta",
    metricLabel: "Render Latency",
    metricValue: "1.2ms",
    glowColor: "blue",
    details: [
      "Proportional grid structure engine",
      "Procedural color contrast validation",
      "Dynamic reactive token compiling",
      "Viewport-optimized motion scaling"
    ]
  },
  {
    id: "sys_chronos",
    title: "Chronos Temporal Visualizer",
    category: "Cinematic Hologram UI",
    description: "Real-time timeline rendering of heavy technical metrics. Creates fluid high-contrast 3D timelines in browser contexts.",
    status: "ONLINE",
    version: "v3.1.0-stable",
    metricLabel: "Throughput State",
    metricValue: "4.8 GB/s",
    glowColor: "purple",
    details: [
      "State-based time scrub manipulation",
      "Frame-staggered custom animations",
      "Optimized SVG-d3 plotting",
      "GPU-accelerated vector rendering"
    ]
  },
  {
    id: "sys_vortex",
    title: "Vortex Interpenetrating Canvas",
    category: "Immersive Interactions",
    description: "Mouse-reactive particle flow systems mimicking quantum gravity. Binds multi-layered visual experiences to user scroll depth and direction.",
    status: "STANDBY",
    version: "v0.92-patch7",
    metricLabel: "Force Attract Rate",
    metricValue: "142 px/s",
    glowColor: "cyan",
    details: [
      "Mouse cursor vector tracking",
      "Friction and inertia drag simulations",
      "Multi-threaded particle recalculations",
      "Holographic grid distortions"
    ]
  },
  {
    id: "sys_quantum",
    title: "AURA Dashboard Stream",
    category: "Predictive Analytics Grid",
    description: "Comprehensive analytics rendering with real-time anomalies logging. Evaluates predictive trends and frames them in futuristic operating panels.",
    status: "INTEGRATING",
    version: "v1.2.9",
    metricLabel: "Prediction Confidence",
    metricValue: "98.45%",
    glowColor: "purple",
    details: [
      "Dynamic alert sound triggering",
      "Anomalous event telemetry highlighter",
      "Historical drift data charting",
      "Optimized Canvas visual logs"
    ]
  }
];

export const INNOVATION_EXPERIMENTS: InnovationExperiment[] = [
  {
    id: "exp_warp",
    name: "Quantum Flow Warp",
    tagline: "Stochastic Vector Particle Field",
    complexity: "99.12%",
    description: "An interactive, deep-space field simulation. Modify gravity warp coefficients to observe particle attraction and vector speed escalation.",
    type: "WARP"
  },
  {
    id: "exp_oscl",
    name: "Cerebral Resonance Wave",
    tagline: "Synchronized Tone Oscilloscope",
    complexity: "86.50%",
    description: "Tune mathematical sinusoids with live frequency sliders. Witness visual constructive interference patterns that represent soundwaves.",
    type: "OSCILLOSCOPE"
  },
  {
    id: "exp_synth",
    name: "Neural Loom Synthesizer",
    tagline: "Web Audio Tone Matrix",
    complexity: "92.80%",
    description: "Play custom retro-futuristic digital notes. A visual grid lets you trigger real-time synthesized soundwaves with absolute interactive feedback.",
    type: "SYNTH"
  }
];

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "proj_aegis",
    title: "AEGIS Intelligent Core UI",
    tagline: "Cinematic Operative Control Dashboard",
    description: "A fully developed UI suite representing a central intelligence hub. Offers multi-panel status monitors, vector connection graphs, and dynamic metric charting designed for elite system operators.",
    technologies: ["React", "Tailwind CSS", "Canvas API", "Web Audio Services"],
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    specs: [
      { label: "Target Host", value: "Cloud-Edge v9" },
      { label: "Rendering Layer", value: "OpenGL Canvas" },
      { label: "Telemetry", value: "Dynamic 120 FPS" }
    ]
  },
  {
    id: "proj_loom",
    title: "Neural-Loom Interactive Lab",
    tagline: "Creative Engineering Space",
    description: "Our core innovation playground combining high-speed browser-based canvas rendering, custom multi-phase sound waves, and interactive controls to showcase the convergence of art and intelligence.",
    technologies: ["React 19", "Vite JS", "Tailwind v4", "Web Audio Synth"],
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    specs: [
      { label: "Platform", value: "Vite + ESM" },
      { label: "Style framework", value: "Tailwind v4 Core" },
      { label: "Responsive", value: "Fluid Breakpoints" }
    ]
  },
  {
    id: "proj_vortex",
    title: "Vortex Gravitational Field",
    tagline: "Immersive Particle Space Simulation",
    description: "A highly complex, custom interactive canvas. Simulates cosmic spatial curvature with heavy vector rendering, allowing visitors to bend and warp standard web layout segments by dragging elements.",
    technologies: ["TypeScript", "Canvas Render", "Math Physics Engine"],
    imageUrl: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=800",
    specs: [
      { label: "Physics", value: "Multi-point Gravity" },
      { label: "Grid distortion", value: "Symmetric Trigonometric" },
      { label: "Density Code", value: "Lightweight ESM" }
    ]
  }
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    stage: "STAGE Alpha",
    period: "Q3 2024",
    title: "Quantum Foundation Launch",
    description: "Establishing the core Web Audio and dynamic Canvas graphics layers. Releasing foundational modules to elite labs for architectural evaluation.",
    status: "COMPLETED",
    indicators: ["Core Synthesizer stable", "Fluid particle warp engine", "Space Grotesk typography alignment"]
  },
  {
    stage: "STAGE Beta",
    period: "Q1 2025",
    title: "Multi-Agent Neural Overlays",
    description: "Connecting our intelligent design layers directly with real-time semantic analysis. Implementing visual telemetry streaming and adaptive color states.",
    status: "COMPLETED",
    indicators: ["Dynamic context parsing", "Web-audio synthesizer patches", "Glassmorphism token release"]
  },
  {
    stage: "STAGE Gamma",
    period: "Q2 2026",
    title: "Integrated AI System Launch",
    description: "Launching the full-stack immersive website and Neural-Loom client portfolio connector. Releasing sandbox lab experiences.",
    status: "ACTIVE",
    indicators: ["Cinematic interactive loader", "Live audio response triggers", "Responsive layout scaling"]
  },
  {
    stage: "STAGE Delta",
    period: "Q4 2026",
    title: "Holographic Spatial Web",
    description: "Expanding interactive browser engines to map immersive three-dimensional structures natively, introducing localized ambient audio synthesizers.",
    status: "PROJECTION",
    indicators: ["Spatial audio spatialization", "Procedural 3D scene generators", "Edge-optimized data charts"]
  }
];
