"use client";

import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";

export function CropDiseaseDemo() {
  const [scanY, setScanY] = useState(0);
  const [detected, setDetected] = useState(false);
  const [phase, setPhase] = useState<"scanning" | "done">("scanning");

  useEffect(() => {
    let frame = 0;
    const total = 80;
    const iv = setInterval(() => {
      frame++;
      setScanY(Math.min(100, (frame / total) * 100));
      if (frame >= total) {
        clearInterval(iv);
        setDetected(true);
        setPhase("done");
      }
    }, 25);
    return () => clearInterval(iv);
  }, []);

  const handleRestart = () => {
    setScanY(0);
    setDetected(false);
    setPhase("scanning");
    let frame = 0;
    const total = 80;
    const iv = setInterval(() => {
      frame++;
      setScanY(Math.min(100, (frame / total) * 100));
      if (frame >= total) {
        clearInterval(iv);
        setDetected(true);
        setPhase("done");
      }
    }, 25);
  };

  return (
    <div className="rounded-xl border border-[var(--os-border)] bg-[#0A0B14] overflow-hidden font-mono text-xs">
      <div className="px-3 py-2 bg-[#141524] border-b border-[var(--os-border)] flex items-center justify-between">
        <span className="text-[var(--os-accent)] font-semibold text-[11px]">crop-vision.py</span>
        <button onClick={handleRestart} className="p-1 text-[var(--os-text-muted)] hover:text-white rounded" aria-label="Restart">
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      <div className="p-4 flex flex-col items-center gap-3 min-h-[190px]">
        {/* Leaf SVG with scan + detection */}
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 160 160" className="w-full h-full">
            {/* Leaf shape */}
            <ellipse cx="80" cy="90" rx="55" ry="70" fill="#15352a" stroke="#22c55e" strokeWidth="1.5" />
            <path d="M80 20 Q100 60 80 160 Q60 60 80 20Z" fill="#166534" opacity="0.5" />
            {/* Disease spots */}
            {detected && (
              <>
                <circle cx="65" cy="85" r="7" fill="#854d0e" opacity="0.85" />
                <circle cx="90" cy="110" r="5" fill="#92400e" opacity="0.75" />
                <circle cx="72" cy="115" r="4" fill="#713f12" opacity="0.8" />
              </>
            )}
          </svg>

          {/* Scanning line */}
          {phase === "scanning" && (
            <div
              className="absolute left-0 right-0 h-0.5 pointer-events-none"
              style={{
                top: `${scanY}%`,
                background: "linear-gradient(90deg, transparent, #7CFF6B, transparent)",
                boxShadow: "0 0 6px #7CFF6B",
              }}
            />
          )}

          {/* Detection bounding box */}
          {detected && (
            <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Bug-shaped detection box around disease spots */}
              <rect x="50" y="72" width="55" height="55" rx="4"
                fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="4 2" opacity="0.9" />
              {/* Bug antennae */}
              <line x1="62" y1="72" x2="55" y2="60" stroke="#f97316" strokeWidth="1.5" />
              <line x1="83" y1="72" x2="90" y2="60" stroke="#f97316" strokeWidth="1.5" />
              <circle cx="55" cy="59" r="2" fill="#f97316" />
              <circle cx="90" cy="59" r="2" fill="#f97316" />
              {/* Label */}
              <text x="52" y="68" fill="#f97316" fontSize="7" fontFamily="monospace">BLIGHT</text>
            </svg>
          )}
        </div>

        {/* Status */}
        <div className="text-center space-y-1">
          {phase === "scanning" ? (
            <p className="text-[var(--os-accent)] text-[10px] animate-pulse">Scanning leaf surface...</p>
          ) : (
            <>
              <p className="text-[#f97316] font-bold text-[10px]">⚠ Disease Detected: Early Blight</p>
              <p className="text-[var(--os-text-dim)] text-[10px]">3 lesion regions identified · Class: Alternaria solani</p>
            </>
          )}
        </div>
      </div>

      <div className="px-3 py-1.5 bg-[#07070F] border-t border-[var(--os-border)] flex justify-between text-[10px] text-[var(--os-text-dim)]">
        <span>SCAN: {Math.round(scanY)}%</span>
        <span className={detected ? "text-[#f97316]" : "text-[var(--os-accent)]"}>
          {detected ? "DISEASE FOUND" : "SCANNING..."}
        </span>
      </div>
    </div>
  );
}
