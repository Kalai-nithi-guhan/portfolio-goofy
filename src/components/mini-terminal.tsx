"use client";

import { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { RESUME_DATA } from "@/data/resume";
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles } from "lucide-react";
import { SectionIdCard } from "./section-id-card";
import { DoodleUnderline } from "./doodle-decorations";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

export function MiniTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "welcome",
      output: (
        <div className="text-[var(--os-text-muted)] space-y-1">
          <p className="text-[var(--os-accent)] font-bold">
            KalaiOS v2.5 Interactive Terminal Shell
          </p>
          <p>Type <span className="text-white font-bold">&apos;help&apos;</span> to view available system routines or try <span className="text-[var(--os-secondary)] font-bold">&apos;sudo hire kalai&apos;</span>.</p>
        </div>
      ),
    },
  ]);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Only auto-scroll after user-triggered commands, never on mount
  const userCommandRef = useRef(false);

  useEffect(() => {
    if (!userCommandRef.current) return;
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleRunCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    userCommandRef.current = true;

    const lower = trimmed.toLowerCase();
    let result: React.ReactNode = null;

    if (lower === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    if (lower === "whoami") {
      result = (
        <div className="space-y-1 text-slate-200">
          <p className="font-bold text-[var(--os-accent)]">
            Identity: {RESUME_DATA.name} (Kalai)
          </p>
          <p className="text-xs text-[var(--os-text-muted)]">{RESUME_DATA.tagline}</p>
          <p className="text-[11px] text-[var(--os-text-dim)]">Location: {RESUME_DATA.location}</p>
          <p className="text-[11px] text-[var(--os-text-dim)]">
            LeetCode: {RESUME_DATA.stats.leetcodeSolved}+ algorithmic trials solved
          </p>
        </div>
      );
    } else if (lower === "skills") {
      result = (
        <div className="space-y-1.5 text-slate-200">
          <p className="font-bold text-[var(--os-accent)]">[INVENTORY WEAPONS]</p>
          {RESUME_DATA.skillTiers.map((tier) => (
            <div key={tier.tier} className="text-xs">
              <span className="text-[var(--os-secondary)] font-semibold">{tier.tier}:</span>{" "}
              <span>{tier.skills.map((s) => s.name).join(", ")}</span>
            </div>
          ))}
        </div>
      );
    } else if (lower === "projects") {
      result = (
        <div className="space-y-1 text-slate-200">
          <p className="font-bold text-[var(--os-accent)]">[FEATURED CARTRIDGES]</p>
          {RESUME_DATA.projects.map((p, i) => (
            <div key={p.id} className="text-xs">
              <span className="text-[#38BDF8]">0{i + 1}. {p.title}</span> —{" "}
              <span className="text-[var(--os-text-dim)]">{p.category}</span>
            </div>
          ))}
        </div>
      );
    } else if (lower === "contact") {
      result = (
        <div className="space-y-1 text-slate-200">
          <p className="font-bold text-[var(--os-accent)]">[COMMUNICATION PORTS]</p>
          <p className="text-xs">Email: <a href={`mailto:${RESUME_DATA.email}`} className="text-[var(--os-accent)] hover:underline">{RESUME_DATA.email}</a></p>
          <p className="text-xs">GitHub: <a href={RESUME_DATA.socials.github} target="_blank" rel="noreferrer" className="text-[#38BDF8] hover:underline">{RESUME_DATA.socials.github}</a></p>
          <p className="text-xs">LinkedIn: <a href={RESUME_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="text-[#38BDF8] hover:underline">{RESUME_DATA.socials.linkedin}</a></p>
          <p className="text-xs">Phone: {RESUME_DATA.phone}</p>
        </div>
      );
    } else if (lower === "help") {
      result = (
        <div className="space-y-1 text-slate-300">
          <p className="font-bold text-[var(--os-accent)]">Available commands:</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono">
            <div><span className="text-[var(--os-accent)] font-semibold">whoami</span> — Identity dossier</div>
            <div><span className="text-[var(--os-accent)] font-semibold">skills</span> — Weapons loadout</div>
            <div><span className="text-[var(--os-accent)] font-semibold">projects</span> — Engineering cartridges</div>
            <div><span className="text-[var(--os-accent)] font-semibold">contact</span> — Comms dispatch</div>
            <div><span className="text-[var(--os-secondary)] font-semibold">sudo hire kalai</span> — Root access offer!</div>
            <div><span className="text-slate-400 font-semibold">clear</span> — Wipe screen buffer</div>
          </div>
        </div>
      );
    } else if (lower === "sudo hire kalai" || lower === "sudo hire") {
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#7CFF6B", "#FF5CAA", "#38BDF8", "#FFE600"],
        });
      } catch {
        // Safe fallback
      }

      result = (
        <div className="p-3 rounded-xl bg-[var(--os-accent)]/15 border border-[var(--os-accent)] text-xs text-[var(--os-text)] space-y-1">
          <p className="font-bold text-[var(--os-accent)] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            [ROOT_ACCESS_GRANTED] Offer accepted!
          </p>
          <p>
            &ldquo;Contract compiled with 0 errors. Filter coffee pipeline pre-warmed. Excited to engineer intelligent solutions together!&rdquo;
          </p>
          <p className="text-[10px] text-[var(--os-text-dim)]">
            Dispatch payload to: <a href={`mailto:${RESUME_DATA.email}`} className="underline text-[var(--os-accent)]">{RESUME_DATA.email}</a>
          </p>
        </div>
      );
    } else {
      result = (
        <p className="text-red-400 text-xs">
          bash: {trimmed}: command not found. Type <span className="underline font-bold text-white cursor-pointer" onClick={() => handleRunCommand("help")}>&apos;help&apos;</span> for available commands.
        </p>
      );
    }

    setHistory((prev) => [...prev, { command: trimmed, output: result }]);
    setInputVal("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRunCommand(inputVal);
  };

  return (
    <section id="terminal" className="py-16 md:py-24 lg:py-32 scroll-mt-[72px] relative">
      {/* Section ID Card Strip */}
      <SectionIdCard
        theme="terminal"
        roleTitle="Sudo Wizard"
        sectionName="Terminal"
      />

      <div className="os-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 lg:mb-12 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)] flex items-center justify-center text-[var(--os-accent)]">
              <TerminalIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="font-mono text-[var(--os-accent)] mono-caption-fluid">
                06 // INTERACTIVE CONSOLE
              </div>
              <h2 className="font-heading font-bold text-[var(--os-text)] section-heading-fluid">
                Mini Terminal Shell
              </h2>
              <DoodleUnderline className="w-36 h-2.5 text-[var(--os-accent)] mt-1" />
            </div>
          </div>

          {/* Quick command buttons */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs sm:text-sm">
            <span className="text-[10px] sm:text-xs text-[var(--os-text-dim)] mr-1">TRY:</span>
            {["whoami", "skills", "projects", "contact", "sudo hire kalai"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleRunCommand(cmd)}
                className="touch-target px-3 py-2 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)] hover:border-[var(--os-accent)] text-[var(--os-text-muted)] hover:text-white transition-colors min-h-[44px]"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Window: 100% width up to 900px, font 14-15px */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="w-full max-w-[900px] mx-auto rounded-2xl border border-[var(--os-border-bright)] bg-[#0C0D17] shadow-2xl overflow-hidden font-mono cursor-text"
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#131422] border-b border-[var(--os-border)] select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="ml-2 text-xs sm:text-sm text-[var(--os-text-muted)]">
                kalai@kalaios: ~ (zsh)
              </span>
            </div>
            <div className="text-[10px] sm:text-xs text-[var(--os-text-dim)]">UTF-8 · Interactive</div>
          </div>

          {/* Console output body: font 14-15px on md+ */}
          <div className="p-4 sm:p-6 space-y-3 min-h-[260px] md:min-h-[300px] max-h-[420px] overflow-y-auto text-xs sm:text-sm md:text-[15px]">
            {history.map((entry, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-[var(--os-accent)]">
                  <span className="text-[var(--os-text-dim)]">kalai@kalaios:~$</span>
                  <span className="font-bold text-white">{entry.command}</span>
                </div>
                <div className="pl-4 border-l border-[var(--os-border)]">
                  {entry.output}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Prompt input row */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3 bg-[#0A0B14] border-t border-[var(--os-border)] text-xs sm:text-sm md:text-[15px]"
          >
            <span className="text-[var(--os-accent)] shrink-0">
              kalai@kalaios:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type a command (e.g. whoami, sudo hire kalai)..."
              className="w-full bg-transparent text-white placeholder-[var(--os-text-dim)] outline-none"
              autoCapitalize="none"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="submit"
              className="touch-target px-2.5 py-1 rounded bg-[var(--os-surface)] border border-[var(--os-border)] text-[var(--os-text-dim)] hover:text-white hover:border-[var(--os-accent)] transition-colors shrink-0"
              aria-label="Send terminal command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
