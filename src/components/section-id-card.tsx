"use client";

import { KalaiAvatar, AvatarTheme } from "./kalai-avatar";

interface SectionIdCardProps {
  theme: AvatarTheme;
  roleTitle: string;
  sectionName: string;
  badgeId?: string;
  className?: string;
}

export function SectionIdCard({
  theme,
  roleTitle,
  sectionName,
  badgeId = "KNG-2027",
  className = "",
}: SectionIdCardProps) {
  return (
    <div className={`os-container mb-6 select-none ${className}`}>
      {/* Outer lanyard container */}
      <div className="flex items-center justify-center sm:justify-start">
        <div
          className="group relative flex items-center gap-3 lg:gap-4 px-3 py-2.5 lg:px-5 lg:py-3.5 rounded-2xl border border-[var(--os-border-bright)] bg-[var(--os-surface)]/90 shadow-md transition-transform duration-300 hover:rotate-1 motion-reduce:hover:rotate-0 max-w-full min-w-0"
          style={{ willChange: "transform" }}
        >
          {/* Lanyard Top Mini Tab / Clip */}
          <div className="absolute -top-3 left-6 sm:left-8 flex flex-col items-center pointer-events-none">
            <span className="w-5 h-2 rounded-t-sm bg-[#3A3C52] border border-black/40" />
            <span className="w-2.5 h-1.5 bg-[#5D607E] rounded-sm" />
          </div>

          {/* Avatar with themed costume (44px mobile, 72px on lg) */}
          <div className="relative shrink-0 ring-2 ring-[var(--os-accent)]/50 rounded-full p-0.5 bg-[#0B0B14]">
            <div className="block lg:hidden">
              <KalaiAvatar theme={theme} size={44} />
            </div>
            <div className="hidden lg:block">
              <KalaiAvatar theme={theme} size={72} />
            </div>
          </div>

          {/* Identity Information */}
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5 lg:gap-2 flex-wrap">
              <span
                className="font-mono font-black text-[var(--os-text)] text-xs sm:text-sm lg:text-[17px] break-words"
                style={{
                  letterSpacing: "0.04em",
                  lineHeight: 1.3,
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                }}
              >
                KALAI NITHI GUHAN M
              </span>
              <span className="text-[9px] lg:text-[11px] font-mono px-1.5 py-0.5 rounded bg-[var(--os-accent)]/15 text-[var(--os-accent)] border border-[var(--os-accent)]/30 shrink-0 whitespace-nowrap">
                {badgeId}
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap mt-0.5" style={{ fontSize: "clamp(9px, 2.5vw, 11px)" }}>
              <span className="font-mono text-[var(--os-secondary)] font-semibold" style={{ lineHeight: 1.4 }}>
                {roleTitle}
              </span>
              <span className="text-[var(--os-text-dim)]">·</span>
              <span className="font-mono text-[var(--os-text-muted)]">
                [{sectionName.toUpperCase()}]
              </span>
            </div>
          </div>

          {/* Barcode / OS Chip accent on right */}
          <div
            className="hidden sm:flex flex-col gap-0.5 pl-3 border-l border-[var(--os-border)] opacity-60 shrink-0"
            aria-hidden="true"
          >
            <div className="flex gap-0.5 h-4 items-end">
              <span className="w-0.5 h-3 bg-[var(--os-text-dim)]" />
              <span className="w-1 h-4 bg-[var(--os-text)]" />
              <span className="w-0.5 h-2 bg-[var(--os-text-dim)]" />
              <span className="w-1.5 h-4 bg-[var(--os-text)]" />
              <span className="w-0.5 h-3 bg-[var(--os-text-dim)]" />
            </div>
            <span className="text-[8px] font-mono text-[var(--os-text-dim)]">SEC//PASS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
