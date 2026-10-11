"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export function RetroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    const isMobile = window.innerWidth < 768;
    const maxParticles = isMobile ? 22 : 50;
    const particles: Particle[] = [];

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Initialize particles (inside useEffect to guarantee hydration safety)
    const colors = ["#7CFF6B", "#FF5CAA", "#38BDF8"];
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.6 + 0.8,
        alpha: Math.random() * 0.35 + 0.15,
        color: colors[i % colors.length],
      });
    }

    // Visibility observer to pause when hidden
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (isVisible) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Draw particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx * dt * 60;
          p.y += p.vy * dt * 60;

          if (p.x < 0) p.x = window.innerWidth;
          else if (p.x > window.innerWidth) p.x = 0;
          if (p.y < 0) p.y = window.innerHeight;
          else if (p.y > window.innerHeight) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();

          // Connect very close neighbors
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = dx * dx + dy * dy;
            if (dist < 6400) {
              // dist < 80px
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = 0.08 * (1 - Math.sqrt(dist) / 80);
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Subtle CRT background grid */}
      <div className="absolute inset-0 scanline-grid opacity-35" />
      {/* Top subtle radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124, 255, 107, 0.15) 0%, transparent 70%)",
        }}
      />
      {/* Lightweight canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
}
