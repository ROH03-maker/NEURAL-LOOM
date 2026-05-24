import React, { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glow: boolean;
}

interface Impulse {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: string;
}

interface NeuralCanvasProps {
  glowMode?: "blue" | "purple" | "both";
  speedMultiplier?: number;
  activeCoreSignal?: boolean;
}

export const NeuralCanvas: React.FC<NeuralCanvasProps> = ({
  glowMode = "both",
  speedMultiplier = 1,
  activeCoreSignal = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  // Core pulse state
  const corePulseRadiusRef = useRef<number>(0);
  const corePulseExpandingRef = useRef<boolean>(true);

  // Initialize nodes and signals
  const nodesRef = useRef<Node[]>([]);
  const impulsesRef = useRef<Impulse[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });

      // Spatially balance node counts relative to screen real estate
      const nodeCount = Math.floor((width * height) / 9500) + 18;
      const nodes: Node[] = [];

      for (let i = 0; i < nodeCount; i++) {
        const isPink = Math.random() > 0.5;
        // Cyan (#06b6d4) and Pink (#ec4899) pairing
        const color = isPink ? "rgba(236, 72, 153, " : "rgba(6, 182, 212, ";
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 2.5 + 1.2,
          color,
          glow: Math.random() > 0.82,
        });
      }
      nodesRef.current = nodes;
      impulsesRef.current = []; // reset active signals
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      // Clear with progressive alpha to form a buttery visual trail fade action
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      const nodes = nodesRef.current;

      // Draw subtle holographic grid line background
      ctx.strokeStyle = "rgba(6, 182, 212, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 0; x < dimensions.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, dimensions.height);
        ctx.stroke();
      }
      for (let y = 0; y < dimensions.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(dimensions.width, y);
        ctx.stroke();
      }

      // Draw the central intelligent Pulse Core Sphere
      const coreX = dimensions.width / 2;
      const coreY = dimensions.height / 2;

      // Pulse expansion calculations
      if (corePulseExpandingRef.current) {
        corePulseRadiusRef.current += 0.25 + (activeCoreSignal ? 0.6 : 0);
        if (corePulseRadiusRef.current > 65) {
          corePulseExpandingRef.current = false;
        }
      } else {
        corePulseRadiusRef.current -= 0.18;
        if (corePulseRadiusRef.current < 20) {
          corePulseExpandingRef.current = true;
        }
      }

      // Render glowing ripples (Aura)
      ctx.beginPath();
      ctx.arc(coreX, coreY, corePulseRadiusRef.current, 0, Math.PI * 2);
      ctx.strokeStyle = activeCoreSignal 
        ? "rgba(236, 72, 153, " + (1 - corePulseRadiusRef.current / 65) * 0.35 + ")" 
        : "rgba(6, 182, 212, " + (1 - corePulseRadiusRef.current / 65) * 0.25 + ")";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Render central glowing nucleus orb
      ctx.beginPath();
      ctx.arc(coreX, coreY, 11, 0, Math.PI * 2);
      ctx.fillStyle = activeCoreSignal ? "rgba(236, 72, 153, 0.6)" : "rgba(6, 182, 212, 0.5)";
      ctx.shadowBlur = 15;
      ctx.shadowColor = activeCoreSignal ? "#ec4899" : "#06b6d4";
      ctx.fill();
      ctx.shadowBlur = 0; // reset shadows

      // Update positions of the neural nodes
      nodes.forEach((node) => {
        node.x += node.vx * speedMultiplier;
        node.y += node.vy * speedMultiplier;

        // Wrap-around screen bounds
        if (node.x < 0) node.x = dimensions.width;
        if (node.x > dimensions.width) node.x = 0;
        if (node.y < 0) node.y = dimensions.height;
        if (node.y > dimensions.height) node.y = 0;

        // Interactive mouse repulsion/attraction force fields
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        if (mx !== null && my !== null) {
          const dx = node.x - mx;
          const dy = node.y - my;
          const dist = Math.hypot(dx, dy);
          if (dist < 160) {
            const force = (160 - dist) / 1600;
            node.x += dx * force * 1.6;
            node.y += dy * force * 1.6;
          }
        }

        // Draw node points
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color + (node.glow ? "0.95)" : "0.55)");
        
        if (node.glow) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = node.color.includes("236, 72") ? "#ec4899" : "#06b6d4";
        }
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      // Build connected path networks and update adjacency arrays
      const connections: { i: number; j: number; dist: number }[] = [];
      const adjacency: { [key: number]: number[] } = {};

      for (let i = 0; i < nodes.length; i++) {
        adjacency[i] = [];
      }

      const maxDistance = 125;
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dist = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y);

          if (dist < maxDistance) {
            connections.push({ i, j, dist });
            adjacency[i].push(j);
            adjacency[j].push(i);
          }
        }
      }

      // Draw aesthetic network line mesh
      connections.forEach(({ i, j, dist }) => {
        const nodeA = nodes[i];
        const nodeB = nodes[j];
        const alpha = (1 - dist / maxDistance) * 0.16;
        
        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);

        if (glowMode === "blue") {
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
        } else if (glowMode === "purple") {
          ctx.strokeStyle = `rgba(236, 72, 153, ${alpha})`;
        } else {
          const isABlue = nodeA.color.includes("6, 182");
          ctx.strokeStyle = isABlue 
            ? `rgba(6, 182, 212, ${alpha})` 
            : `rgba(236, 72, 153, ${alpha})`;
        }
        ctx.lineWidth = 0.4 + (1 - dist / maxDistance) * 0.5;
        ctx.stroke();
      });

      // Maintain flowing digital impulses
      const impulses = impulsesRef.current;
      const targetImpulsesCount = 16;

      if (impulses.length < targetImpulsesCount && connections.length > 0) {
        const conn = connections[Math.floor(Math.random() * connections.length)];
        const nodeA = nodes[conn.i];
        const isPink = nodeA.color.includes("236, 72");
        const impulseColor = isPink ? "#ec4899" : "#06b6d4";

        impulses.push({
          fromIndex: conn.i,
          toIndex: conn.j,
          progress: 0,
          speed: 0.007 + Math.random() * 0.016,
          color: impulseColor,
        });
      }

      // Progress and render each flowing neural impulse
      for (let k = impulses.length - 1; k >= 0; k--) {
        const impulse = impulses[k];
        impulse.progress += impulse.speed * speedMultiplier;

        const nodeA = nodes[impulse.fromIndex];
        const nodeB = nodes[impulse.toIndex];

        if (!nodeA || !nodeB) {
          impulses.splice(k, 1);
          continue;
        }

        // Interpolated coordinate on the line path segments
        const ix = nodeA.x + (nodeB.x - nodeA.x) * impulse.progress;
        const iy = nodeA.y + (nodeB.y - nodeA.y) * impulse.progress;

        // Glowing packet droplet
        ctx.beginPath();
        ctx.arc(ix, iy, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = impulse.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = impulse.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Subtle gradient tail tracing
        ctx.beginPath();
        const trailProgress = Math.max(0, impulse.progress - 0.15);
        const tx = nodeA.x + (nodeB.x - nodeA.x) * trailProgress;
        const ty = nodeA.y + (nodeB.y - nodeA.y) * trailProgress;
        ctx.moveTo(ix, iy);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = impulse.color;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Check if finished traveling along the path
        if (impulse.progress >= 1) {
          const adj = adjacency[impulse.toIndex];
          // 65% chance to cascade/propagate to an adjacent node recursively
          if (adj && adj.length > 0 && Math.random() < 0.65) {
            const filtered = adj.filter((n) => n !== impulse.fromIndex);
            const nextTarget = filtered.length > 0
              ? filtered[Math.floor(Math.random() * filtered.length)]
              : adj[Math.floor(Math.random() * adj.length)];

            impulse.fromIndex = impulse.toIndex;
            impulse.toIndex = nextTarget;
            impulse.progress = 0;
            impulse.speed = 0.007 + Math.random() * 0.016;
          } else {
            impulses.splice(k, 1);
          }
        }
      }

      // Draw cursor attraction links in proximity
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx !== null && my !== null) {
        nodes.forEach((node) => {
          const mDist = Math.hypot(node.x - mx, node.y - my);
          if (mDist < 120) {
            const alpha = (1 - mDist / 120) * 0.3;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, glowMode, speedMultiplier, activeCoreSignal]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: null, y: null };
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="block w-full h-full"
      />
    </div>
  );
};
