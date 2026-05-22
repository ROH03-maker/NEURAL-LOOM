import React, { useEffect, useState, useRef } from "react";

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // Keep coords in ref for lag-free direct animations
  const coords = useRef({ x: 0, y: 0 });
  const trailCoords = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      coords.current = { x: e.clientX, y: e.clientY };
      setHidden(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("interactive-hover");
      
      setIsHovered(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    // Apply active cursor container class
    document.documentElement.classList.add("custom-cursor-active");

    // Butter-smooth hardware accelerated update loop
    const updateCursor = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${coords.current.x}px, ${coords.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Linear interpolation trail follower
      const dx = coords.current.x - trailCoords.current.x;
      const dy = coords.current.y - trailCoords.current.y;
      
      trailCoords.current.x += dx * 0.16;
      trailCoords.current.y += dy * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trailCoords.current.x}px, ${trailCoords.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(updateCursor);
    };
    
    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.classList.remove("custom-cursor-active");
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {/* Precision Core Dot (Standard size) (Desktop Only for touch ergonomics) */}
      <div
        ref={dotRef}
        id="cursor-dot"
        className="hidden lg:block fixed pointer-events-none z-50 w-2.5 h-2.5 bg-neon-cyan rounded-full top-0 left-0"
        style={{
          boxShadow: "0 0 10px #06b6d4, 0 0 20px rgba(6, 182, 212, 0.4)",
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.15s ease",
          willChange: "transform",
        }}
      />

      {/* Lagging Ring Tracker */}
      <div
        ref={ringRef}
        id="cursor-ring"
        className="hidden lg:block fixed pointer-events-none z-50 rounded-full border top-0 left-0"
        style={{
          width: isHovered ? "54px" : "32px",
          height: isHovered ? "54px" : "32px",
          backgroundColor: isHovered ? "rgba(157, 80, 187, 0.08)" : "transparent",
          borderColor: isHovered ? "#9d50bb" : "rgba(6, 182, 212, 0.4)",
          boxShadow: isHovered ? "0 0 18px rgba(157, 80, 187, 0.35)" : "none",
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.15s ease, width 0.18s cubic-bezier(0.25, 1, 0.5, 1), height 0.18s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease",
          willChange: "transform",
        }}
      >
        {/* Holographic scanner target lines inside the ring */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-neon-purple rounded-full animate-ping" />
          </div>
        )}
      </div>
    </>
  );
};
