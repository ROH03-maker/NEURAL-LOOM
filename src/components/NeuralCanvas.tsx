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

  // Initialize nodes
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });

      // Re-initialize particles to span the new dimensions nicely
      const nodeCount = Math.floor((width * height) / 12000) + 15;
      const nodes: Node[] = [];

      for (let i = 0; i < nodeCount; i++) {
        const isPurple = Math.random() > 0.5;
        const color = isPurple ? "rgba(157, 80, 187, " : "rgba(0, 210, 255, ";
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2.5 + 1,
          color,
          glow: Math.random() > 0.85,
        });
      }
      nodesRef.current = nodes;
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
      // Clear with slight alpha to create a cinematic trail
      ctx.fillStyle = "rgba(5, 5, 8, 0.2)";
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      const nodes = nodesRef.current;

      // Draw elegant holographic grid
      ctx.strokeStyle = "rgba(0, 210, 255, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 40;
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

      // Draw the central AI Pulse Core
      const coreX = dimensions.width / 2;
      const coreY = dimensions.height / 2;

      // Pulse calculations
      if (corePulseExpandingRef.current) {
        corePulseRadiusRef.current += 0.35 + (activeCoreSignal ? 0.7 : 0);
        if (corePulseRadiusRef.current > 70) {
          corePulseExpandingRef.current = false;
        }
      } else {
        corePulseRadiusRef.current -= 0.25;
        if (corePulseRadiusRef.current < 25) {
          corePulseExpandingRef.current = true;
        }
      }

      // Render glowing pulse core
      ctx.beginPath();
      ctx.arc(coreX, coreY, corePulseRadiusRef.current, 0, Math.PI * 2);
      ctx.strokeStyle = activeCoreSignal 
        ? "rgba(157, 80, 187, " + (1 - corePulseRadiusRef.current / 70) * 0.4 + ")" 
        : "rgba(0, 210, 255, " + (1 - corePulseRadiusRef.current / 70) * 0.3 + ")";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner glowing nucleus
      ctx.beginPath();
      ctx.arc(coreX, coreY, 12, 0, Math.PI * 2);
      ctx.fillStyle = activeCoreSignal ? "rgba(157, 80, 187, 0.7)" : "rgba(0, 210, 255, 0.6)";
      ctx.shadowBlur = 15;
      ctx.shadowColor = activeCoreSignal ? "#9d50bb" : "#00d2ff";
      ctx.fill();
      ctx.shadowBlur = 0; // reset shadow for rest

      // Move nodes & paint them
      nodes.forEach((node) => {
        // Apply velocity with custom speed scale
        node.x += node.vx * speedMultiplier;
        node.y += node.vy * speedMultiplier;

        // Boundary checks with wrap-around
        if (node.x < 0) node.x = dimensions.width;
        if (node.x > dimensions.width) node.x = 0;
        if (node.y < 0) node.y = dimensions.height;
        if (node.y > dimensions.height) node.y = 0;

        // Mouse interaction (Repulsion / Attraction Force)
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        if (mx !== null && my !== null) {
          const dx = node.x - mx;
          const dy = node.y - my;
          const dist = Math.hypot(dx, dy);
          if (dist < 150) {
            const force = (150 - dist) / 1500;
            node.x += dx * force * 1.5;
            node.y += dy * force * 1.5;
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color + (node.glow ? "0.9)" : "0.55)");
        
        if (node.glow) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = node.color.includes("157, 80") ? "#9d50bb" : "#00d2ff";
        }
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      // Connect nodes with elegant webs
      const maxDistance = 120;
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dist = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.28;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);

            // Connect lines gradient or color based on node type
            if (glowMode === "blue") {
              ctx.strokeStyle = `rgba(0, 210, 255, ${alpha})`;
            } else if (glowMode === "purple") {
              ctx.strokeStyle = `rgba(157, 80, 187, ${alpha})`;
            } else {
              // Blend
              const isABlue = nodeA.color.includes("0, 210");
              ctx.strokeStyle = isABlue 
                ? `rgba(0, 210, 255, ${alpha})` 
                : `rgba(157, 80, 187, ${alpha})`;
            }
            ctx.lineWidth = 0.5 + (1 - dist / maxDistance) * 0.8;
            ctx.stroke();
          }
        }

        // Connect nodes to mouse if close
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        if (mx !== null && my !== null) {
          const mouseDist = Math.hypot(nodeA.x - mx, nodeA.y - my);
          if (mouseDist < 120) {
            const alpha = (1 - mouseDist / 120) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
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
