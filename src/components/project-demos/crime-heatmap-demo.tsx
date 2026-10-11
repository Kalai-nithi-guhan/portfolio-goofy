"use client";

import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";

const COLS = 8;
const ROWS = 6;
const TOTAL = COLS * ROWS;

// Pre-defined heat pattern (0-1 values)
const HEAT_PATTERN: number[] = [
  0.1, 0.15, 0.3, 0.6, 0.8, 0.55, 0.2, 0.1,
  0.1, 0.2, 0.5, 0.85, 0.95, 0.75, 0.35, 0.15,
  0.05, 0.25, 0.4, 0.7, 0.9, 0.65, 0.3, 0.1,
  0.1, 0.15, 0.3, 0.55, 0.7, 0.5, 0.2, 0.1,
  0.05, 0.1, 0.2, 0.35, 0.45, 0.3, 0.15, 0.05,
  0.05, 0.05, 0.1, 0.2, 0.25, 0.15, 0.1, 0.05,
];

function heatColor(v: number): string {
  // cool blue → yellow → hot red
  if (v < 0.5) {
    const t = v * 2;
    const r = Math.round(t * 251);
    const g = Math.round(t * 191);
    const b = Math.round(255 - t * 100);
    return `rgb(${r},${g},${b})`;
  }
  const t = (v - 0.5) * 2;
  const r = Math.round(251 - t * 10);
  const g = Math.round(191 * (1 - t));
  const b = Math.round(155 * (1 - t));
  return `rgb(${r},${g},${b})`;
}

export function CrimeHeatmapDemo() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= TOTAL) {
          clearInterval(iv);
          setDone(true);
          return TOTAL;
        }
        return p + 1;
      });
    }, 40);
    return () => clearInterval(iv);
  }, []);

  const handleRestart = () => {
    setProgress(0);
    setDone(false);
    let p = 0;
    const iv = setInterval(() => {
      p++;
      setProgress(p);
      if (p >= TOTAL) {
        clearInterval(iv);
        setDone(true);
      }
    }, 40);
  };

  return (
    <div className="rounded-xl border border-[var(--os-border)] bg-[#0A0B14] overflow-hidden font-mono text-xs">
      <div className="px-3 py-2 bg-[#141524] border-b border-[var(--os-border)] flex items-center justify-between">
        <span className="text-[var(--os-accent)] font-semibold text-[11px]">crime-predict.py · XGB+LGB+CAT</span>
        <button onClick={handleRestart} className="p-1 text-[var(--os-text-muted)] hover:text-white rounded" aria-label="Restart">
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      <div className="p-4 flex flex-col items-center gap-3 min-h-[190px]">
        {/* Grid heatmap */}
        <div
          className="grid gap-0.5 w-full max-w-[240px]"
          style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
          aria-label="Crime heatmap grid"
        >
          {HEAT_PATTERN.map((heat, i) => {
            const revealed = i < progress;
            return (
              <div
                key={i}
                className="aspect-square rounded-sm transition-all duration-300"
                style={{
                  backgroundColor: revealed ? heatColor(heat) : "#1a1a2e",
                  opacity: revealed ? 1 : 0.2,
                }}
                title={revealed ? `Zone ${i + 1}: ${Math.round(heat * 100)}%` : ""}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1 text-[9px] text-[var(--os-text-dim)]">
          <span>LOW</span>
          <div className="flex">
            {[0, 0.2, 0.4, 0.6, 0.8, 1].map((v) => (
              <div key={v} className="w-4 h-2" style={{ backgroundColor: heatColor(v) }} />
            ))}
          </div>
          <span>HIGH</span>
        </div>

        {done && (
          <p className="text-[10px] text-red-400 font-bold text-center">
            🔴 Hotspot: Zone 5 · Alert dispatched to authorities
          </p>
        )}
      </div>

      <div className="px-3 py-1.5 bg-[#07070F] border-t border-[var(--os-border)] flex justify-between text-[10px] text-[var(--os-text-dim)]">
        <span>ENSEMBLE: XGB + LGB + CAT</span>
        <span className={done ? "text-red-400" : "text-[var(--os-accent)]"}>
          {done ? "HOTSPOT IDENTIFIED" : `COMPUTING... ${Math.round((progress / TOTAL) * 100)}%`}
        </span>
      </div>
    </div>
  );
}
