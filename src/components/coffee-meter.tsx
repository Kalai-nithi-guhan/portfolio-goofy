"use client";

import { useEffect, useState } from "react";
import { Coffee, Flame } from "lucide-react";

export function CoffeeMeter() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100)));
      setPercent(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getJoke = (p: number) => {
    if (p < 20) return "Cold start... needs Java ☕";
    if (p < 45) return "First sip... parsing AST 🧠";
    if (p < 70) return "Half cup... 0 bugs seen ⚙️";
    if (p < 90) return "Overclocked... 120 WPM 🚀";
    return "CAFFEINE CRITICAL! (Overdrive) 💥";
  };

  return (
    <div
      className="hidden sm:flex fixed bottom-5 left-5 z-30 items-center gap-2.5 px-3 py-1.5 rounded-full border border-[var(--os-border)] bg-[var(--os-surface)]/90 backdrop-blur-sm shadow-xl font-mono text-[11px] text-[var(--os-text)] select-none pointer-events-auto transition-transform hover:scale-105"
      title="Coffee Meter: Tied to your scroll progress"
    >
      {/* Mug graphic with liquid fill */}
      <div className="relative w-5 h-5 rounded-sm border border-[var(--os-accent)] bg-[#101018] overflow-hidden flex items-end">
        <div
          className="w-full bg-gradient-to-t from-[#B45309] to-[#F59E0B] transition-all duration-150"
          style={{ height: `${percent}%` }}
        />
        {percent >= 90 && (
          <Flame className="absolute inset-0 m-auto w-3 h-3 text-[#FF5CAA] animate-bounce" />
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-[var(--os-accent)] font-bold">{percent}%</span>
        <span className="text-[var(--os-text-dim)]">·</span>
        <span className="text-[var(--os-text-muted)] truncate max-w-[170px] text-[10px]">
          {getJoke(percent)}
        </span>
      </div>
    </div>
  );
}
