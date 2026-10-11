"use client";

import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { RESUME_DATA } from "@/data/resume";
import { retroSound } from "@/lib/sound";
import { Trophy, Bug, RotateCcw, ExternalLink } from "lucide-react";

interface FloatingBug {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  points: number;
  isSquashed: boolean;
}

const BUG_COLORS = ["#7CFF6B", "#FF5CAA", "#38BDF8", "#FBBF24"];
const MILESTONES = [100, 250, 500, RESUME_DATA.stats.leetcodeSolved];
// Score cap: game counter never exceeds this
const SCORE_CAP = RESUME_DATA.stats.leetcodeSolved;

interface MilestoneToast {
  id: number;
  value: number;
}

export function BugSquashSection() {
  const targetMilestone = RESUME_DATA.stats.leetcodeSolved;
  const [score, setScore] = useState(0);
  const [celebratedMilestones, setCelebratedMilestones] = useState<number[]>([]);
  const [toasts, setToasts] = useState<MilestoneToast[]>([]);
  const [bugs, setBugs] = useState<FloatingBug[]>([]);
  const playAreaRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef(0);

  // Keep scoreRef in sync for handleSquash closure
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Initialize floating bugs (Hydration-safe)
  useEffect(() => {
    const initialBugs: FloatingBug[] = [];
    for (let i = 0; i < 7; i++) {
      initialBugs.push({
        id: i,
        // Bugs spawn only below the instruction header row (~15% from top), 8px from edges
        x: 10 + (i * 12) % 72,
        y: 20 + (i * 11) % 60,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: BUG_COLORS[i % BUG_COLORS.length],
        points: i === 0 ? 50 : 25,
        isSquashed: false,
      });
    }
    setBugs(initialBugs);
  }, []);

  // Float animation tick — bounce between 8% and 90% horizontally, 18% and 90% vertically
  // (top 17% reserved for instruction row)
  useEffect(() => {
    const interval = setInterval(() => {
      setBugs((prev) =>
        prev.map((b) => {
          if (b.isSquashed) return b;
          let nx = b.x + b.vx;
          let ny = b.y + b.vy;
          let nvx = b.vx;
          let nvy = b.vy;

          if (nx < 8 || nx > 90) nvx = -nvx;
          // Keep bugs below the instruction header area
          if (ny < 18 || ny > 90) nvy = -nvy;

          return { ...b, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );
    }, 60);

    return () => clearInterval(interval);
  }, []);

  const dismissToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSquash = (bugId: number, points: number) => {
    // Cap: don't add points if already at SCORE_CAP
    if (scoreRef.current >= SCORE_CAP) return;

    retroSound.playSquash();
    setBugs((prev) =>
      prev.map((b) => (b.id === bugId ? { ...b, isSquashed: true } : b))
    );

    const nextScore = Math.min(scoreRef.current + points, SCORE_CAP);
    setScore(nextScore);

    // Check milestones
    for (const m of MILESTONES) {
      if (nextScore >= m && !celebratedMilestones.includes(m)) {
        setCelebratedMilestones((prev) => [...prev, m]);

        // Non-blocking toast at top of arena
        const toastId = Date.now();
        setToasts((prev) => [...prev, { id: toastId, value: m }]);
        setTimeout(() => dismissToast(toastId), 2500);

        // Confetti — capped at 40 particles on mobile
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.6 },
            colors: ["#7CFF6B", "#FF5CAA", "#FFA116", "#38BDF8"],
            disableForReducedMotion: true,
          });
          // Remove confetti canvas after 2s
          setTimeout(() => {
            document.querySelectorAll("canvas[data-confetti]").forEach((c) => c.remove());
          }, 2000);
        } catch {
          // Confetti fallback
        }
        break;
      }
    }

    // Respawn bug after 1.5s (only if still playing)
    setTimeout(() => {
      setBugs((prev) =>
        prev.map((b) =>
          b.id === bugId
            ? {
                ...b,
                x: 10 + Math.random() * 72,
                y: 20 + Math.random() * 60,
                isSquashed: false,
              }
            : b
        )
      );
    }, 1500);
  };

  const handleResetGame = () => {
    setScore(0);
    setCelebratedMilestones([]);
    setToasts([]);
  };

  const progressPct = Math.min((score / SCORE_CAP) * 100, 100);

  return (
    <section id="bug-squash" className="py-16 md:py-24 lg:py-32 scroll-mt-[72px] relative">
      <div className="os-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 lg:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="hidden sm:flex w-8 h-8 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)] items-center justify-center text-[#FFA116] shrink-0">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-[#FFA116] mono-caption-fluid">
                  06 // LEETCODE ARENA
                </div>
                <h2 className="font-heading font-bold text-[var(--os-text)] section-heading-fluid">
                  Bug Squash Mini-Game
                </h2>
              </div>
            </div>
          </div>

          <a
            href={RESUME_DATA.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--os-border-bright)] bg-[var(--os-surface)] hover:border-[#FFA116] text-xs font-mono text-[var(--os-text)] hover:text-[#FFA116] transition-colors self-start sm:self-auto"
            style={{ minHeight: "44px" }}
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            <span>Verify {targetMilestone}+ on LeetCode</span>
          </a>
        </div>

        {/* Game Arena Card */}
        <div className="rounded-2xl border border-[var(--os-border-bright)] bg-[var(--os-surface)] overflow-hidden shadow-2xl">
          {/* Scoreboard header — separates game score from LeetCode fact */}
          <div className="px-5 py-3.5 bg-[#141525] border-b border-[var(--os-border)] flex flex-wrap items-center justify-between gap-3 font-mono text-xs sm:text-sm">
            <div className="flex flex-col gap-0.5">
              {/* Game score — capped at SCORE_CAP */}
              <div className="flex items-center gap-2">
                <span className="text-[var(--os-text-dim)]">Bugs squashed:</span>
                <span className="text-lg font-bold text-[var(--os-accent)]">{score}</span>
              </div>
              {/* Static LeetCode fact */}
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[var(--os-text-dim)]">
                <span>LeetCode DSA:</span>
                <span className="text-[#FFA116] font-bold">{targetMilestone}+ solved</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex-1 min-w-[80px] max-w-[160px]">
              <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1">
                <span className="text-[var(--os-text-dim)]">Progress</span>
                <span className="text-[var(--os-accent)]">{Math.round(progressPct)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--os-bg)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--os-accent)] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {score >= SCORE_CAP && (
                <span className="px-2 py-0.5 rounded bg-[var(--os-accent)]/20 text-[var(--os-accent)] font-bold text-[10px] sm:text-xs animate-pulse border border-[var(--os-accent)]/40">
                  🏆 {SCORE_CAP}+ REACHED!
                </span>
              )}
              <button
                onClick={handleResetGame}
                className="flex items-center justify-center rounded-lg border border-[var(--os-border-bright)] bg-[var(--os-bg)] text-[var(--os-accent)] hover:border-[var(--os-accent)] hover:bg-[var(--os-accent)]/10 transition-colors"
                style={{ width: "44px", height: "44px" }}
                title="Reset game"
                aria-label="Reset mini-game"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Play Arena: min-height 420px on desktop */}
          <div
            ref={playAreaRef}
            className="relative bg-[#080912] overflow-hidden select-none cursor-swatter scanline-grid h-[260px] sm:h-[320px] md:min-h-[420px]"
          >
            {/* Instruction row — always visible at top, bugs spawn below it */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-center px-3 py-2 bg-[#080912]/90 border-b border-[var(--os-border)] z-10 pointer-events-none">
              <span className="text-[11px] sm:text-xs font-mono text-[var(--os-text-muted)] text-center">
                Tap bugs to squash · Milestone targets: 100, 250, 500, {targetMilestone}
              </span>
            </div>

            {/* Milestone toasts — top of arena, non-blocking */}
            <div className="absolute top-10 left-0 right-0 flex flex-col items-center gap-2 z-20 pointer-events-none">
              {toasts.map((toast) => (
                <div
                  key={toast.id}
                  className="px-3 py-1.5 rounded-xl bg-[var(--os-surface)]/95 border border-[var(--os-accent)] text-xs font-mono font-bold text-[var(--os-accent)] shadow-lg"
                  style={{ animation: "fadeInOut 2.5s ease forwards" }}
                >
                  {toast.value >= targetMilestone
                    ? `🏆 ${targetMilestone}+ Benchmark!`
                    : `✨ Milestone ${toast.value}!`}
                </div>
              ))}
            </div>

            {/* Floating bugs — bigger bugs 48px on md+ */}
            {bugs.map((b) => (
              <button
                key={b.id}
                onClick={() => !b.isSquashed && score < SCORE_CAP && handleSquash(b.id, b.points)}
                style={{
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className={`absolute p-2 rounded-full transition-transform duration-200 active:scale-75 ${
                  b.isSquashed ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
                }`}
                aria-label="Squash bug"
              >
                <div
                  className="w-8 h-8 md:w-12 md:h-12 rounded-xl flex items-center justify-center border shadow-md animate-bounce"
                  style={{
                    backgroundColor: `${b.color}22`,
                    borderColor: b.color,
                    color: b.color,
                  }}
                >
                  <Bug className="w-4 h-4 md:w-6 md:h-6" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
