"use client";

import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";

const STEPS = [
  { label: "N (Nitrogen)", value: 72, color: "#7CFF6B" },
  { label: "P (Phosphorus)", value: 48, color: "#38BDF8" },
  { label: "K (Potassium)", value: 85, color: "#FBBF24" },
];

const RESULT = {
  crop: "Rice (Oryza sativa)",
  moisture: "65%",
  recommendation: "NPK 20-10-30 blend @ 120 kg/ha",
  note: "Apply in split doses: 50% pre-sowing, 50% 30 days after transplanting.",
};

export function FertilizerRecommenderDemo() {
  const [barProgress, setBarProgress] = useState([0, 0, 0]);
  const [showResult, setShowResult] = useState(false);
  const [analyzeAnim, setAnalyzeAnim] = useState(false);

  useEffect(() => {
    // Animate bars
    const intervals = STEPS.map((_, i) =>
      setInterval(() => {
        setBarProgress((prev) => {
          const next = [...prev];
          if (next[i] < STEPS[i].value) next[i] = Math.min(next[i] + 3, STEPS[i].value);
          return next;
        });
      }, 30 + i * 10)
    );

    const t1 = setTimeout(() => {
      intervals.forEach(clearInterval);
      setAnalyzeAnim(true);
    }, 1800);

    const t2 = setTimeout(() => {
      setAnalyzeAnim(false);
      setShowResult(true);
    }, 3000);

    return () => {
      intervals.forEach(clearInterval);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleRestart = () => {
    setBarProgress([0, 0, 0]);
    setShowResult(false);
    setAnalyzeAnim(false);

    const intervals = STEPS.map((_, i) =>
      setInterval(() => {
        setBarProgress((prev) => {
          const next = [...prev];
          if (next[i] < STEPS[i].value) next[i] = Math.min(next[i] + 3, STEPS[i].value);
          return next;
        });
      }, 30 + i * 10)
    );

    const t1 = setTimeout(() => {
      intervals.forEach(clearInterval);
      setAnalyzeAnim(true);
    }, 1800);
    setTimeout(() => {
      setAnalyzeAnim(false);
      setShowResult(true);
    }, 3000);
  };

  return (
    <div className="rounded-xl border border-[var(--os-border)] bg-[#0A0B14] overflow-hidden font-mono text-xs">
      <div className="px-3 py-2 bg-[#141524] border-b border-[var(--os-border)] flex items-center justify-between">
        <span className="text-[var(--os-accent)] font-semibold text-[11px]">fertilizer-recommender · Firebase</span>
        <button onClick={handleRestart} className="p-1 text-[var(--os-text-muted)] hover:text-white rounded" aria-label="Restart">
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      <div className="p-4 space-y-3 min-h-[190px]">
        {/* Soil NPK bars */}
        <div className="space-y-2">
          <div className="text-[10px] text-[var(--os-text-dim)] mb-1">SOIL TELEMETRY (NPK)</div>
          {STEPS.map((step, i) => (
            <div key={step.label} className="space-y-0.5">
              <div className="flex justify-between text-[10px]">
                <span className="text-[var(--os-text-muted)]">{step.label}</span>
                <span style={{ color: step.color }}>{barProgress[i]} mg/kg</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--os-border)] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${barProgress[i]}%`, backgroundColor: step.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Analyzing */}
        {analyzeAnim && (
          <div className="flex items-center gap-2 text-[var(--os-secondary)] text-[10px] animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--os-secondary)]" />
            <span>Running ensemble model inference...</span>
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className="p-3 rounded-lg border border-[var(--os-accent)]/40 bg-[var(--os-surface)] space-y-1 text-[10px]">
            <div className="text-[var(--os-accent)] font-bold mb-1">✦ RECOMMENDATION</div>
            <div className="text-[var(--os-text-muted)]">Crop: <span className="text-[var(--os-text)]">{RESULT.crop}</span></div>
            <div className="text-[var(--os-text-muted)]">Moisture: <span className="text-[var(--os-text)]">{RESULT.moisture}</span></div>
            <div className="text-[var(--os-accent)] font-semibold mt-1">{RESULT.recommendation}</div>
            <div className="text-[var(--os-text-dim)] text-[9px] mt-0.5">{RESULT.note}</div>
          </div>
        )}
      </div>

      <div className="px-3 py-1.5 bg-[#07070F] border-t border-[var(--os-border)] flex justify-between text-[10px] text-[var(--os-text-dim)]">
        <span>INTERNSHIP · BOREDOM LLP</span>
        <span className={showResult ? "text-[var(--os-accent)]" : "text-[var(--os-text-dim)]"}>
          {showResult ? "RECOMMENDATION_READY" : "ANALYZING_SOIL"}
        </span>
      </div>
    </div>
  );
}
