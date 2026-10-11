"use client";

import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";

const MESSY_EMAIL = `FWD: FWD: RE: RE: RE: Budget approval Q3
From: manager@company.com
Hi team, circling back on the thread below — as per the conversation we had (see the email chain from last week), we need to finalize the budget. John had mentioned in a separate thread that the procurement team needs sign-off before EOD Friday but the CFO is OOO until Monday so maybe we should push? Also the vendor invoice from the meeting on Tuesday is still pending. Can someone please action this? I believe Sarah mentioned she'd handle it but I'm not 100% sure. Let me know ASAP. Thanks!`;

const BULLETS = [
  "Budget sign-off required before EOD Friday",
  "CFO is OOO until Monday — push deadline if needed",
  "Vendor invoice from Tuesday meeting still pending (action: Sarah?)",
];

export function EmailSummarizerDemo() {
  const [phase, setPhase] = useState<"email" | "thinking" | "summary">("email");
  const [dotCount, setDotCount] = useState(0);
  const [revealedBullets, setRevealedBullets] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("thinking"), 1800);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "thinking") return;
    const iv = setInterval(() => setDotCount((d) => (d + 1) % 4), 350);
    const t2 = setTimeout(() => {
      clearInterval(iv);
      setPhase("summary");
    }, 2000);
    return () => {
      clearInterval(iv);
      clearTimeout(t2);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "summary") return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setRevealedBullets(i);
      if (i >= BULLETS.length) clearInterval(iv);
    }, 400);
    return () => clearInterval(iv);
  }, [phase]);

  const handleRestart = () => {
    setPhase("email");
    setDotCount(0);
    setRevealedBullets(0);
  };

  return (
    <div className="rounded-xl border border-[var(--os-border)] bg-[#0A0B14] overflow-hidden font-mono text-xs">
      {/* Header */}
      <div className="px-3 py-2 bg-[#141524] border-b border-[var(--os-border)] flex items-center justify-between">
        <div className="flex items-center gap-2 text-[var(--os-accent)]">
          <span className="font-semibold text-[11px]">email-summarizer.py</span>
        </div>
        <button
          onClick={handleRestart}
          className="p-1 text-[var(--os-text-muted)] hover:text-white rounded"
          title="Restart"
          aria-label="Restart demo"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      <div className="p-4 space-y-3 min-h-[190px]">
        {/* Raw email block */}
        <div
          className="p-3 rounded-lg border border-[var(--os-border)] bg-[#070710] text-[var(--os-text-dim)] text-[10px] leading-relaxed overflow-hidden transition-all duration-700"
          style={{ maxHeight: phase === "email" ? "140px" : "48px", opacity: phase === "summary" ? 0.3 : 1 }}
        >
          {MESSY_EMAIL}
        </div>

        {/* Thinking */}
        {phase === "thinking" && (
          <div className="flex items-center gap-2 text-[var(--os-secondary)] text-[10px]">
            <span className="w-2 h-2 rounded-full bg-[var(--os-secondary)] animate-pulse" />
            <span>Summarizing{".".repeat(dotCount)}</span>
          </div>
        )}

        {/* Summary */}
        {phase === "summary" && (
          <div className="space-y-2">
            <div className="text-[10px] text-[var(--os-accent)] font-bold mb-1">✦ KEY TAKEAWAYS</div>
            {BULLETS.slice(0, revealedBullets).map((b, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-[10px] text-[var(--os-text-muted)] transition-opacity duration-300"
                style={{ opacity: 1 }}
              >
                <span className="text-[var(--os-accent)] shrink-0 mt-0.5">→</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-3 py-1.5 bg-[#07070F] border-t border-[var(--os-border)] flex items-center justify-between text-[10px] text-[var(--os-text-dim)]">
        <span>INPUT: {MESSY_EMAIL.length} chars</span>
        <span className="text-[var(--os-accent)]">
          {phase === "summary" ? "SUMMARIZED" : phase === "thinking" ? "PROCESSING..." : "READY"}
        </span>
      </div>
    </div>
  );
}
