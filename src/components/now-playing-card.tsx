"use client";

import { RESUME_DATA } from "@/data/resume";
import { Disc3, Coffee, Sparkles, Brain, Radio } from "lucide-react";

export function NowPlayingCard({ className = "" }: { className?: string }) {
  const { nowPlaying } = RESUME_DATA;

  return (
    <div
      className={`relative rounded-2xl border border-[var(--os-border-bright)] bg-[var(--os-surface)]/90 p-4 sm:p-5 shadow-xl select-none backdrop-blur-none sm:backdrop-blur-sm ${className}`}
    >
      {/* Top cassette tape / streaming header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--os-border)]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--os-accent)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--os-accent)]" />
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[var(--os-accent)]">
            LIVE BROADCAST // NOW PLAYING
          </span>
        </div>

        {/* Equalizer animation */}
        <div className="flex items-end gap-0.5 h-3.5" aria-hidden="true">
          <span className="w-1 bg-[var(--os-accent)] rounded-full animate-[pulse_1s_infinite_ease-in-out] h-2" />
          <span className="w-1 bg-[var(--os-secondary)] rounded-full animate-[pulse_1.4s_infinite_ease-in-out] h-3.5" />
          <span className="w-1 bg-[#38BDF8] rounded-full animate-[pulse_0.8s_infinite_ease-in-out] h-2.5" />
          <span className="w-1 bg-[#F59E0B] rounded-full animate-[pulse_1.2s_infinite_ease-in-out] h-3" />
        </div>
      </div>

      {/* 3 Telemetry Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        {/* 1. Building */}
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[var(--os-bg)] border border-[var(--os-border)]">
          <div className="p-1.5 rounded-lg bg-[var(--os-accent)]/15 text-[var(--os-accent)] shrink-0">
            <Disc3 className="w-4 h-4 animate-spin motion-reduce:animate-none" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-[var(--os-text-dim)] uppercase">Building</div>
            <div className="font-bold text-[var(--os-text)] truncate">{nowPlaying.building}</div>
          </div>
        </div>

        {/* 2. Learning */}
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[var(--os-bg)] border border-[var(--os-border)]">
          <div className="p-1.5 rounded-lg bg-[var(--os-secondary)]/15 text-[var(--os-secondary)] shrink-0">
            <Brain className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-[var(--os-text-dim)] uppercase">Learning</div>
            <div className="font-bold text-[var(--os-text)] truncate">{nowPlaying.learning}</div>
          </div>
        </div>

        {/* 3. Fuel */}
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[var(--os-bg)] border border-[var(--os-border)]">
          <div className="p-1.5 rounded-lg bg-[#F59E0B]/15 text-[#F59E0B] shrink-0">
            <Coffee className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-[var(--os-text-dim)] uppercase">Fuel</div>
            <div className="font-bold text-[var(--os-text)] truncate">{nowPlaying.fuel}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
