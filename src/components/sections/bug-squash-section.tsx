"use client";

import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { RESUME_DATA } from "@/data/resume";
import { retroSound } from "@/lib/sound";
import { Trophy, Bug, RotateCcw, ExternalLink, Sparkles } from "lucide-react";

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

export function BugSquashSection() {
  const targetMilestone = RESUME_DATA.stats.leetcodeSolved;
  const [score, setScore] = useState(0);
  const [celebratedMilestones, setCelebratedMilestones] = useState<number[]>([]);
  const [latestMilestone, setLatestMilestone] = useState<number | null>(null);
  const [bugs, setBugs] = useState<FloatingBug[]>([]);
  const playAreaRef = useRef<HTMLDivElement>(null);

  // Initialize floating bugs inside useEffect (Hydration-safe)
  useEffect(() => {
    const initialBugs: FloatingBug[] = [];
    for (let i = 0; i < 7; i++) {
      initialBugs.push({
        id: i,
        x: 15 + (i * 12) % 70,
        y: 20 + (i * 14) % 60,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: BUG_COLORS[i % BUG_COLORS.length],
        points: i === 0 ? 50 : 25,
        isSquashed: false,
      });
    }
    setBugs(initialBugs);
  }, []);

  // Float animation tick
  useEffect(() => {
    const interval = setInterval(() => {
      setBugs((prev) =>
        prev.map((b) => {
          if (b.isSquashed) return b;
          let nx = b.x + b.vx;
          let ny = b.y + b.vy;
          let nvx = b.vx;
          let nvy = b.vy;

          if (nx < 8 || nx > 88) nvx = -nvx;
          if (ny < 12 || ny > 82) nvy = -nvy;

          return { ...b, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );
    }, 60);

    return () => clearInterval(interval);
  }, []);

  const handleSquash = (bugId: number, points: number) => {
    retroSound.playSquash();
    setBugs((prev) =>
      prev.map((b) => (b.id === bugId ? { ...b, isSquashed: true } : b))
    );

    const nextScore = score + points;
    setScore(nextScore);

    // Check milestones (100, 250, 500, 800)
    for (const m of MILESTONES) {
      if (nextScore >= m && !celebratedMilestones.includes(m)) {
        setCelebratedMilestones((prev) => [...prev, m]);
        setLatestMilestone(m);
        try {
          confetti({
            particleCount: m >= targetMilestone ? 140 : 80,
            spread: 80,
            origin: { y: 0.7 },
            colors: ["#7CFF6B", "#FF5CAA", "#FFA116", "#38BDF8"],
          });
        } catch {
          // Confetti fallback
        }
        break;
      }
    }

    // Respawn bug after 1.5s
    setTimeout(() => {
      setBugs((prev) =>
        prev.map((b) =>
          b.id === bugId
            ? {
                ...b,
                x: Math.random() * 70 + 10,
                y: Math.random() * 60 + 15,
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
    setLatestMilestone(null);
  };

  return (
    <section id="bug-squash" className="py-16 sm:py-20 scroll-mt-14 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)] flex items-center justify-center text-[#FFA116]">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono text-[#FFA116] tracking-wider">
                06 // LEETCODE ARENA
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--os-text)]">
                Bug Squash Mini-Game
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={RESUME_DATA.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target px-3 py-1.5 rounded-xl border border-[var(--os-border-bright)] bg-[var(--os-surface)] hover:border-[#FFA116] text-xs font-mono text-[var(--os-text)] hover:text-[#FFA116] transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Verify {targetMilestone}+ on LeetCode</span>
            </a>
          </div>
        </div>

        {/* Game Arena Card */}
        <div className="rounded-2xl border border-[var(--os-border-bright)] bg-[var(--os-surface)] overflow-hidden shadow-2xl">
          {/* Top scoreboard */}
          <div className="px-5 py-3.5 bg-[#141525] border-b border-[var(--os-border)] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-[var(--os-text-dim)]">DSA SCORE:</span>
              <span className="text-lg font-bold text-[var(--os-accent)]">{score}</span>
              <span className="text-[var(--os-text-dim)]">/ {targetMilestone}+ SOLVED</span>
            </div>

            <div className="flex items-center gap-2">
              {score >= targetMilestone && (
                <span className="px-2 py-0.5 rounded bg-[var(--os-accent)]/20 text-[var(--os-accent)] font-bold text-[10px] animate-pulse border border-[var(--os-accent)]/40">
                  🏆 {targetMilestone}+ MILESTONE ACHIEVED!
                </span>
              )}
              <button
                onClick={handleResetGame}
                className="touch-target p-1.5 rounded bg-[var(--os-bg)] text-[var(--os-text-dim)] hover:text-white"
                title="Reset game"
                aria-label="Reset mini-game"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Play Arena */}
          <div
            ref={playAreaRef}
            className="relative h-64 sm:h-80 bg-[#080912] overflow-hidden select-none cursor-swatter scanline-grid"
          >
            {/* Arena instruction banner */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--os-surface)]/80 border border-[var(--os-border)] text-[11px] font-mono text-[var(--os-text-muted)] pointer-events-none">
              Squash bugs to climb toward {targetMilestone}+ DSA solved! (Milestones: 100, 250, 500, {targetMilestone})
            </div>

            {/* Floating bugs */}
            {bugs.map((b) => (
              <button
                key={b.id}
                onClick={() => !b.isSquashed && handleSquash(b.id, b.points)}
                style={{
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className={`absolute touch-target p-2 rounded-full transition-transform duration-200 active:scale-75 ${
                  b.isSquashed ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
                }`}
                aria-label="Squash bug"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center border shadow-md animate-bounce"
                  style={{
                    backgroundColor: `${b.color}22`,
                    borderColor: b.color,
                    color: b.color,
                  }}
                >
                  <Bug className="w-4 h-4" />
                </div>
              </button>
            ))}

            {/* Milestone celebration toast overlay */}
            {latestMilestone && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-[var(--os-surface)]/95 border border-[var(--os-accent)] text-center shadow-lg pointer-events-none animate-in fade-in zoom-in-95">
                <div className="text-xs font-bold font-mono text-[var(--os-accent)] flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {latestMilestone >= targetMilestone
                      ? `LeetCode ${targetMilestone}+ Benchmark Reached!`
                      : `Milestone ${latestMilestone}+ Achieved! Keep squashing!`}
                  </span>
                </div>
                <div className="text-[10px] text-[var(--os-text-muted)] mt-0.5">
                  Check out Kalai&apos;s real submissions on LeetCode
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
