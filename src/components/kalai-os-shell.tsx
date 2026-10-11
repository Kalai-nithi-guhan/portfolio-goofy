"use client";

import { useState, useCallback, useEffect, ReactNode } from "react";
import { BootIntro } from "./boot-intro";
import { RetroBackground } from "./retro-background";
import { ScrollProgress } from "./scroll-progress";
import { CursorTrail } from "./cursor-trail";
import { CommandPalette } from "./command-palette";
import { OsNavbar } from "./os-navbar";
import { OsFooter } from "./os-footer";
import { CoffeeMeter } from "./coffee-meter";
import { KalaiBot } from "./kalai-bot";
import { useKonamiCode } from "@/hooks/use-konami";
import { retroSound } from "@/lib/sound";
import { ShieldAlert, X } from "lucide-react";

export function KalaiOsShell({
  children,
}: {
  children: ReactNode;
}) {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isUpsideDown, setIsUpsideDown] = useState(false);
  const [showSudoPrompt, setShowSudoPrompt] = useState(false);
  const { isSuccess: isDancing, triggerDance } = useKonamiCode();

  const handleOpenCommand = useCallback(() => {
    setIsCommandOpen(true);
  }, []);

  const handleCloseCommand = useCallback(() => {
    setIsCommandOpen(false);
  }, []);

  // Double-click logo flip handler
  const handleFlipScreen = useCallback(() => {
    retroSound.playBlip(320, 0.2);
    setIsUpsideDown(true);
    setTimeout(() => {
      setIsUpsideDown(false);
    }, 2200);
  }, []);

  // "sudo" keyboard listener
  useEffect(() => {
    let buffer = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      buffer = (buffer + e.key.toLowerCase()).slice(-4);
      if (buffer === "sudo") {
        retroSound.playSquash();
        setShowSudoPrompt(true);
        buffer = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={`relative min-h-screen bg-[var(--os-bg)] text-[var(--os-text)] overflow-x-clip transition-transform duration-700 ease-in-out ${
        isUpsideDown ? "rotate-180" : ""
      }`}
    >
      {/* 1. Boot Intro (Once per session, skippable) */}
      <BootIntro />

      {/* 2. Top Scroll Progress Line */}
      <ScrollProgress />

      {/* 3. Lightweight Canvas2D & Grid Background */}
      <RetroBackground />

      {/* 4. Desktop-only Cursor Trail */}
      <CursorTrail />

      {/* 5. Fixed Coffee Meter Gauge */}
      <CoffeeMeter />

      {/* 6. OS Header Status Bar & Mobile Bottom Dock */}
      <OsNavbar
        onOpenCommand={handleOpenCommand}
        onDanceTrigger={triggerDance}
        isDancing={isDancing}
        onLogoDoubleClick={handleFlipScreen}
      />

      {/* 7. Command Palette (Ctrl/Cmd+K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={handleCloseCommand}
        onDanceTrigger={triggerDance}
      />

      {/* Sudo Permission Joke Modal */}
      {showSudoPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
          <div className="w-full max-w-md rounded-2xl border-2 border-red-500 bg-[#141525] p-6 shadow-2xl space-y-4 font-mono">
            <div className="flex items-center justify-between text-red-400">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                <span className="font-bold text-sm">SECURITY ALERT // SUDO_FAIL</span>
              </div>
              <button
                onClick={() => setShowSudoPrompt(false)}
                className="p-1 rounded text-[var(--os-text-dim)] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#080912] border border-red-500/30 text-xs text-red-300 space-y-2 leading-relaxed">
              <p className="font-bold text-[var(--os-text)]">
                [kalai@kalaios]: sudo command intercepted
              </p>
              <p>
                &ldquo;User &apos;guest&apos; is not in the sudoers file. This incident will be reported to Bugsy the Mascot.&rdquo;
              </p>
              <p className="text-[10px] text-[var(--os-text-dim)]">
                Error Code: 418_TEA_POT_OVERFLOW · Coffee permissions only.
              </p>
            </div>

            <button
              onClick={() => setShowSudoPrompt(false)}
              className="touch-target w-full py-2.5 rounded-xl bg-red-500 text-black font-bold text-xs hover:bg-red-400 transition-colors"
            >
              Acknowledge &amp; Surrender Root Access
            </button>
          </div>
        </div>
      )}

      {/* 8. Main Hero & Sections */}
      <main className="relative z-10">{children}</main>

      {/* KalaiBot Virtual Assistant */}
      <KalaiBot />

      {/* 9. Footer with goofy lines */}
      <OsFooter />
    </div>
  );
}
