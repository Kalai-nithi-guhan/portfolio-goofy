"use client";

import { useEffect, useState, useRef } from "react";

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  char: string;
}

const TRAIL_CHARS = ["👾", "⚡", "🐛", "✦", "💻", "◈"];

export function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const idCounter = useRef(0);
  const isFinePointer = useRef(false);

  useEffect(() => {
    // Only on desktop with fine mouse pointer
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    isFinePointer.current = mq.matches;

    if (!mq.matches) return;

    let throttleTimer: NodeJS.Timeout | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = dx * dx + dy * dy;

      // Throttle spawn: at least 45px distance moved
      if (dist > 2000 && !throttleTimer) {
        lastPos.current = { x: e.clientX, y: e.clientY };
        const newPoint: TrailPoint = {
          id: idCounter.current++,
          x: e.clientX,
          y: e.clientY,
          char: TRAIL_CHARS[idCounter.current % TRAIL_CHARS.length],
        };

        setTrail((prev) => [...prev.slice(-6), newPoint]);

        throttleTimer = setTimeout(() => {
          throttleTimer = null;
        }, 80);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Clean up expired points
    const pruneInterval = setInterval(() => {
      setTrail((prev) => (prev.length > 0 ? prev.slice(1) : prev));
    }, 180);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(pruneInterval);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
      {trail.map((point) => (
        <span
          key={point.id}
          className="absolute text-sm select-none transition-all duration-300 ease-out opacity-60 scale-90"
          style={{
            left: point.x + 8,
            top: point.y + 8,
            transform: "translate(-50%, -50%)",
          }}
        >
          {point.char}
        </span>
      ))}
    </div>
  );
}
