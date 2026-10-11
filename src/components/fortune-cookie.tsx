"use client";

import { useState } from "react";
import { retroSound } from "@/lib/sound";
import { Sparkles, Cookie, RotateCcw } from "lucide-react";

const FORTUNES = [
  "Your next deploy will pass on the first try with 0 warnings.",
  "A bug in production will mysteriously resolve itself before standup.",
  "You will find the missing semicolon on line 42 in under 5 seconds.",
  "Llama 3.1 whispered: Your loss function is converging beautifully.",
  "The answer you seek has already been answered on StackOverflow in 2011.",
  "Refactoring today prevents a 3:00 AM panic ticket tomorrow.",
  "There is no cloud, only someone else's highly-optimized server.",
  "A 200 OK and an entry-level offer letter are in your immediate future.",
];

export function FortuneCookie() {
  const [isCracked, setIsCracked] = useState(false);
  const [fortuneIndex, setFortuneIndex] = useState(0);

  const handleCrack = () => {
    if (!isCracked) {
      retroSound.playCrack();
      setFortuneIndex(Math.floor(Math.random() * FORTUNES.length));
      setIsCracked(true);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCracked(false);
  };

  return (
    <div
      onClick={handleCrack}
      className="p-4 rounded-xl border border-[var(--os-border)] bg-[var(--os-surface)]/70 hover:border-[#FFE600] transition-all cursor-pointer group select-none relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#FFE600] font-bold">
          <Cookie className={`w-4 h-4 transition-transform ${isCracked ? "rotate-45 scale-110" : "group-hover:rotate-12"}`} />
          <span>DEV_FORTUNE_COOKIE.EXE</span>
        </div>
        {isCracked && (
          <button
            onClick={handleReset}
            className="p-1 rounded text-[var(--os-text-dim)] hover:text-white"
            title="Crack another fortune"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {!isCracked ? (
        <p className="text-xs text-[var(--os-text-muted)] font-mono group-hover:text-[var(--os-text)] transition-colors">
          &gt; Click to crack open today&apos;s developer prophecy 🥠
        </p>
      ) : (
        <div className="p-3 rounded-lg bg-[#FFE600]/10 border border-[#FFE600]/40 text-xs font-mono text-[#FFE600] animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-[#FFE600] mt-0.5" />
            <span className="leading-relaxed font-semibold">
              &ldquo;{FORTUNES[fortuneIndex]}&rdquo;
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
