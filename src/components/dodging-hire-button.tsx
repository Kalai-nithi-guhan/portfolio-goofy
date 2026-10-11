"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { retroSound } from "@/lib/sound";
import { Sparkles, Send } from "lucide-react";

export function DodgingHireButton() {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isSurrendered, setIsSurrendered] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);

  const handleHover = () => {
    if (isSurrendered) return;

    if (dodgeCount < 3) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 65 + Math.random() * 25;
      const newX = Math.cos(angle) * distance;
      const newY = Math.sin(angle) * (distance * 0.6);

      setOffset({ x: newX, y: newY });
      setDodgeCount((prev) => prev + 1);
      retroSound.playDodge();
    } else {
      // Surrendered!
      setIsSurrendered(true);
      setOffset({ x: 0, y: 0 });
      retroSound.playVictory();
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#7CFF6B", "#FF5CAA", "#FFE600"],
        });
      } catch {}
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // On mobile or surrendered, trigger haptic bounce and navigate
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([25, 20, 25]);
    }
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);

    if (isSurrendered || dodgeCount === 0) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      handleHover();
    }
  };

  const getLabel = () => {
    if (isSurrendered) return "🏳️ OK YOU WIN! Let's talk!";
    if (dodgeCount === 1) return "Too slow! 🏃‍♂️";
    if (dodgeCount === 2) return "Almost caught me! 💨";
    if (dodgeCount === 3) return "Catch me if you can! ⚡";
    return "⚡ Fast-Track Hire";
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleHover}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      className={`touch-target relative px-4 py-3 rounded-xl font-mono text-xs font-bold border transition-all ${
        isSurrendered
          ? "bg-[#FFE600] text-black border-[#FFE600] shadow-lg animate-pulse"
          : isWiggling
          ? "animate-bounce bg-[var(--os-secondary)] text-white border-[var(--os-secondary)]"
          : "bg-[var(--os-surface)] text-[var(--os-accent)] border-[var(--os-accent)] hover:bg-[var(--os-accent)] hover:text-black shadow-md shadow-[var(--os-accent)]/15"
      }`}
      aria-label="Interactive Hire Me action button"
    >
      <span className="flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>{getLabel()}</span>
      </span>
    </button>
  );
}
