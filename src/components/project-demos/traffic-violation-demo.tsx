"use client";

import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";

type ViolationType = "wrong-lane" | "phone" | null;

export function TrafficViolationDemo() {
  const [carX, setCarX] = useState(20);
  const [direction, setDirection] = useState<"right" | "wrong">("right");
  const [violation, setViolation] = useState<ViolationType>(null);
  const [ticket, setTicket] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setFrame((f) => f + 1);
    }, 60);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    // Phase: 0-30 correct lane, 31-60 switch to wrong, 61-80 violation flashes, 81+ ticket
    const progress = frame % 100;
    if (progress < 30) {
      setCarX(20 + progress * 1.5);
      setDirection("right");
      setViolation(null);
      setTicket(false);
    } else if (progress < 50) {
      setCarX(20 + 30 * 1.5 + (progress - 30) * 1.5);
      setDirection("wrong");
      setViolation("wrong-lane");
    } else if (progress < 80) {
      setCarX(Math.min(130, 20 + 30 * 1.5 + 20 * 1.5 + (progress - 50)));
      setDirection("wrong");
      setViolation("wrong-lane");
    } else {
      setTicket(true);
    }
  }, [frame]);

  const handleRestart = () => {
    setFrame(0);
    setCarX(20);
    setDirection("right");
    setViolation(null);
    setTicket(false);
  };

  const isViolating = violation !== null;

  return (
    <div className="rounded-xl border border-[var(--os-border)] bg-[#0A0B14] overflow-hidden font-mono text-xs">
      <div className="px-3 py-2 bg-[#141524] border-b border-[var(--os-border)] flex items-center justify-between">
        <span className="text-[var(--os-accent)] font-semibold text-[11px]">traffic-detect.py</span>
        <button onClick={handleRestart} className="p-1 text-[var(--os-text-muted)] hover:text-white rounded" aria-label="Restart">
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      <div className="p-4 min-h-[190px] flex flex-col gap-3">
        {/* Top-down road SVG */}
        <svg viewBox="0 0 180 90" className="w-full rounded-lg border border-[var(--os-border)]">
          {/* Road */}
          <rect x="0" y="0" width="180" height="90" fill="#1a1a2e" />
          {/* Lane markers */}
          <line x1="0" y1="45" x2="180" y2="45" stroke="#4a4a6a" strokeWidth="1.5" strokeDasharray="8 6" />
          {/* Correct-lane arrow */}
          <text x="10" y="30" fill="#7CFF6B" fontSize="9" fontFamily="monospace" opacity="0.7">→</text>
          <text x="10" y="72" fill="#ef4444" fontSize="9" fontFamily="monospace" opacity="0.6">←</text>
          <text x="30" y="30" fill="#4a4a6a" fontSize="7" fontFamily="monospace">CORRECT</text>
          <text x="30" y="72" fill="#4a4a6a" fontSize="7" fontFamily="monospace">WRONG WAY</text>

          {/* Moving car */}
          <g transform={`translate(${carX}, ${direction === "wrong" ? 55 : 20})`}>
            {/* Car body */}
            <rect x="0" y="0" width="22" height="12" rx="3"
              fill={isViolating ? "#ef4444" : "#3b82f6"} />
            {/* Windshield */}
            <rect x="4" y="1.5" width="14" height="5" rx="1" fill="#bfdbfe" opacity="0.7" />
            {/* Wheels */}
            <circle cx="4" cy="12" r="2.5" fill="#1e293b" />
            <circle cx="18" cy="12" r="2.5" fill="#1e293b" />
          </g>

          {/* Violation bounding box */}
          {isViolating && (
            <rect
              x={carX - 2}
              y={direction === "wrong" ? 53 : 18}
              width="26"
              height="16"
              rx="2"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeDasharray="3 2"
              style={{ animation: "none" }}
              opacity={frame % 6 < 3 ? 1 : 0.3}
            />
          )}

          {/* Ticket overlay */}
          {ticket && (
            <g>
              <rect x="55" y="20" width="70" height="50" rx="4" fill="#1e1b4b" stroke="#f97316" strokeWidth="1.5" />
              <text x="90" y="36" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="monospace" fontWeight="bold">⚠ TICKET</text>
              <text x="90" y="48" textAnchor="middle" fill="#e2e8f0" fontSize="7" fontFamily="monospace">WRONG LANE</text>
              <text x="90" y="58" textAnchor="middle" fill="#94a3b8" fontSize="6" fontFamily="monospace">Fine: ₹500 😅</text>
            </g>
          )}
        </svg>

        {/* Status */}
        <div className="text-center text-[10px]">
          {ticket ? (
            <p className="text-[#f97316] font-bold">🎟 Violation logged · Wrong-lane driving detected</p>
          ) : isViolating ? (
            <p className="text-red-400 animate-pulse">⚠ VIOLATION: Wrong-lane driving</p>
          ) : (
            <p className="text-[var(--os-accent)]">✓ Normal traffic flow detected</p>
          )}
        </div>
      </div>

      <div className="px-3 py-1.5 bg-[#07070F] border-t border-[var(--os-border)] flex justify-between text-[10px] text-[var(--os-text-dim)]">
        <span>MODE: CCTV ANALYSIS</span>
        <span className={isViolating ? "text-red-400" : "text-[var(--os-accent)]"}>
          {isViolating ? "VIOLATION_DETECTED" : "MONITORING"}
        </span>
      </div>
    </div>
  );
}
