"use client";

import { RESUME_DATA } from "@/data/resume";
import { Terminal, Code2, Heart, FileDown, Rocket } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./icons";

export function OsFooter() {
  const handleScrollTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-[var(--os-border)] bg-[var(--os-bg)]/80 py-8 mb-16 md:mb-0">
      <div className="os-container flex flex-col lg:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--os-text-dim)]">
        {/* Left: OS Info */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-center lg:text-left">
          <Terminal className="w-4 h-4 text-[var(--os-accent)] shrink-0" />
          <span>KalaiOS 2.5.0-release</span>
          <span>·</span>
          <span>All rights reserved &copy; 2025</span>
        </div>

        {/* Center: Made with React, caffeine and mild panic */}
        <div className="flex flex-col items-center text-center gap-1">
          <div className="flex items-center gap-1.5 text-[var(--os-text-muted)] justify-center">
            <span>Engineered by</span>
            <span className="text-[var(--os-text)] font-semibold">{RESUME_DATA.name}</span>
            <Heart className="w-3.5 h-3.5 text-[var(--os-secondary)] fill-current" />
          </div>
          <div className="text-[11px] text-[var(--os-text-dim)]">
            Made with React, caffeine and mild panic
          </div>
        </div>

        {/* Right: Quick Links, Resume & Back-to-Top Rocket Button */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-1.5 sm:gap-2">
          <a
            href={RESUME_DATA.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target hover:text-[var(--os-accent)] transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={RESUME_DATA.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target hover:text-[#38BDF8] transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={RESUME_DATA.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target hover:text-[var(--os-secondary)] transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href={RESUME_DATA.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target hover:text-[#FFA116] transition-colors"
            aria-label="LeetCode"
          >
            <Code2 className="w-4 h-4" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target hover:text-[var(--os-accent)] transition-colors p-1 flex items-center gap-1 text-[11px]"
            aria-label="Download Resume PDF"
            title="Resume PDF"
          >
            <FileDown className="w-4 h-4 text-[var(--os-accent)]" />
            <span className="hidden xs:inline">Resume</span>
          </a>

          {/* Back-to-Top Rocket Button (44px min tap target) */}
          <button
            onClick={handleScrollTop}
            className="touch-target ml-2 px-3 py-1.5 rounded-xl border border-[var(--os-border-bright)] bg-[var(--os-surface)] text-[var(--os-accent)] hover:border-[var(--os-accent)] hover:bg-[var(--os-accent)]/10 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            aria-label="Back to top"
            title="Launch to top"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
