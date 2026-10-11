"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { RESUME_DATA } from "@/data/resume";
import { Terminal, FastForward } from "lucide-react";

export function BootIntro({ onComplete }: { onComplete?: () => void }) {
  const [show, setShow] = useState<boolean | null>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    // Check sessionStorage
    const hasBooted = sessionStorage.getItem("kalaios_boot_completed");
    if (hasBooted) {
      setShow(false);
      onComplete?.();
      return;
    }

    setShow(true);

    // Sequential line reveals total <= 2.2s
    const lines = RESUME_DATA.bootSequence;
    const timeouts: NodeJS.Timeout[] = [];

    lines.forEach((line, index) => {
      const t = setTimeout(() => {
        setCurrentLineIndex(index + 1);
      }, line.delay);
      timeouts.push(t);
    });

    // Auto complete at 2.4s
    const endTimeout = setTimeout(() => {
      handleFinish();
    }, 2400);
    timeouts.push(endTimeout);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleFinish = () => {
    sessionStorage.setItem("kalaios_boot_completed", "true");
    setShow(false);
    onComplete?.();
  };

  if (show === null || show === false) return null;

  return (
    <AnimatePresence>
      <m.div
        key="boot-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#07070D] text-[var(--os-text)] p-4 sm:p-8"
      >
        <div className="w-full max-w-2xl rounded-xl border border-[var(--os-border-bright)] bg-[#0C0D18] shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#151726] border-b border-[var(--os-border)]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5C5C]/80" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
              <span className="ml-2 text-xs text-[var(--os-text-muted)] font-mono flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[var(--os-accent)]" />
                kalaios-kernel-v2.5.sh
              </span>
            </div>
            <button
              onClick={handleFinish}
              className="touch-target px-2.5 py-1 text-xs text-[var(--os-accent)] hover:text-white bg-[var(--os-border)]/50 hover:bg-[var(--os-border)] rounded transition-colors flex items-center gap-1"
              aria-label="Skip boot sequence"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>SKIP [ESC]</span>
            </button>
          </div>

          {/* Terminal Content Stream */}
          <div className="p-5 min-h-[220px] max-h-[360px] overflow-y-auto space-y-2 select-none">
            {RESUME_DATA.bootSequence.slice(0, currentLineIndex).map((line, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 ${
                  line.text.includes("npm run")
                    ? "text-[var(--os-accent)] font-semibold"
                    : line.text.includes("suspicious")
                    ? "text-[#FFBD2E]"
                    : line.text.includes("DONE") || line.text.includes("READY") || line.text.includes("OK")
                    ? "text-[#7CFF6B]"
                    : "text-[var(--os-text-muted)]"
                }`}
              >
                <span className="text-[var(--os-text-dim)] select-none">$</span>
                <span>{line.text}</span>
              </div>
            ))}
            <div className="flex items-center gap-1 text-[var(--os-accent)] animate-pulse">
              <span>_</span>
            </div>
          </div>

          {/* Progress footer */}
          <div className="px-4 py-2 bg-[#090A12] border-t border-[var(--os-border)] flex items-center justify-between text-[11px] text-[var(--os-text-dim)]">
            <span>MEM: 512MB / 512MB OK</span>
            <span className="text-[var(--os-accent)]">BOOTING KALAI_OS...</span>
          </div>
        </div>
      </m.div>
    </AnimatePresence>
  );
}
