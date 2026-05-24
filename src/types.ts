/**
 * Type declarations and structures for the Neural-Loom application.
 */

export interface AISystem {
  id: string;
  title: string;
  category: string;
  description: string;
  status: "ONLINE" | "STANDBY" | "INTEGRATING" | "OPTIMIZING";
  version: string;
  metricLabel: string;
  metricValue: string;
  glowColor: "blue" | "purple" | "cyan";
  details: string[];
}

export interface InnovationExperiment {
  id: string;
  name: string;
  tagline: string;
  complexity: string; // e.g. "98.4%", "87.1%"
  description: string;
  type: "WARP" | "OSCILLOSCOPE" | "SYNTH";
}

export interface FeaturedProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveLink?: string;
  githubLink?: string;
  specs: { label: string; value: string }[];
}

export interface TimelineMilestone {
  stage: string;
  period: string;
  title: string;
  description: string;
  status: "COMPLETED" | "ACTIVE" | "PROJECTION";
  indicators: string[];
}

