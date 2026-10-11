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
    <div className={`w-full max-w-5xl mx-auto px-4 sm:px-6 mb-6 select-none ${className}`}>
      {/* Outer lanyard container */}
      <div className="flex items-center justify-center sm:justify-start">
        <div
          className="group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl border border-[var(--os-border-bright)] bg-[var(--os-surface)]/90 shadow-md backdrop-blur-none sm:backdrop-blur-sm transition-transform duration-300 hover:rotate-1 motion-reduce:hover:rotate-0"
          style={{ willChange: "transform" }}
        >
          {/* Lanyard Top Mini Tab / Clip */}
          <div className="absolute -top-3 left-6 sm:left-8 flex flex-col items-center pointer-events-none">
            <span className="w-5 h-2 rounded-t-sm bg-[#3A3C52] border border-black/40" />
            <span className="w-2.5 h-1.5 bg-[#5D607E] rounded-sm" />
          </div>

          {/* Avatar with themed costume */}
          <div className="relative shrink-0 ring-2 ring-[var(--os-accent)]/50 rounded-full p-0.5 bg-[#0B0B14]">
            <KalaiAvatar theme={theme} size={42} />
          </div>

          {/* Identity Information (Rendered in real code) */}
          <div className="flex flex-col min-w-0 pr-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-mono font-black text-[var(--os-text)] tracking-wider truncate">
                KALAI NITHI GUHAN M
              </span>
              <span className="hidden xs:inline-block text-[9px] font-mono px-1.5 py-0.2 rounded bg-[var(--os-accent)]/15 text-[var(--os-accent)] border border-[var(--os-accent)]/30 shrink-0">
                {badgeId}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-[var(--os-text-dim)]">
              <span className="text-[var(--os-secondary)] font-semibold truncate">
                {roleTitle}
              </span>
              <span>·</span>
              <span className="text-[var(--os-text-muted)] truncate">
                [{sectionName.toUpperCase()}]
              </span>
            </div>
          </div>

          {/* Barcode / OS Chip accent on right */}
          <div
            className="hidden sm:flex flex-col gap-0.5 pl-3 border-l border-[var(--os-border)] opacity-60"
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
