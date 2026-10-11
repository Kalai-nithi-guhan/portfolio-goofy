"use client";

import { useEffect, useState, useMemo } from "react";
import { m, AnimatePresence } from "framer-motion";
import { RESUME_DATA } from "@/data/resume";
import {
  Search,
  FolderGit2,
  Cpu,
  User,
  Briefcase,
  GraduationCap,
  Gamepad2,
  Mail,
  ExternalLink,
  SunMoon,
  Sparkles,
  X,
} from "lucide-react";
import { retroSound } from "@/lib/sound";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Search;
  action: () => void;
  category: "Navigation" | "Socials & Links" | "System Commands";
}

export function CommandPalette({
  isOpen,
  onClose,
  onDanceTrigger,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDanceTrigger?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = useMemo(
    () => [
      {
        id: "nav-about",
        title: "About / README.md",
        subtitle: "Background, career objective & core interests",
        icon: User,
        category: "Navigation",
        action: () => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-skills",
        title: "Skills & Passive Buffs",
        subtitle: "RPG inventory: Java, Python, PyTorch, MediaPipe, Next.js",
        icon: Cpu,
        category: "Navigation",
        action: () => {
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-projects",
        title: "Projects / Cartridges",
        subtitle: "AI Agent, Document RAG, CV Exercise, Email Summarizer, and more",
        icon: FolderGit2,
        category: "Navigation",
        action: () => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-experience",
        title: "Experience / Git-Log",
        subtitle: "Boredom LLP Technology, Bangalore (May–Jun 2025)",
        icon: Briefcase,
        category: "Navigation",
        action: () => {
          document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-education",
        title: "Education & Quest Log",
        subtitle: "B.E. CSE (AI & ML), CGPA 8.63, NLP Mastery, PrepInsta",
        icon: GraduationCap,
        category: "Navigation",
        action: () => {
          document.getElementById("education")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-minigame",
        title: "Bug Squash Mini-Game",
        subtitle: `Squash bugs to match ${RESUME_DATA.stats.leetcodeSolved}+ LeetCode problems`,
        icon: Gamepad2,
        category: "Navigation",
        action: () => {
          document.getElementById("bug-squash")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-contact",
        title: "Contact Terminal",
        subtitle: "Compile & send direct message to Kalai",
        icon: Mail,
        category: "Navigation",
        action: () => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "link-github",
        title: "GitHub Profile",
        subtitle: "github.com/Kalai-nithi-guhan",
        icon: ExternalLink,
        category: "Socials & Links",
        action: () => {
          window.open(RESUME_DATA.socials.github, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
      {
        id: "link-linkedin",
        title: "LinkedIn Profile",
        subtitle: "linkedin.com/in/kalai-nithi-guhan-m",
        icon: ExternalLink,
        category: "Socials & Links",
        action: () => {
          window.open(RESUME_DATA.socials.linkedin, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
      {
        id: "link-instagram",
        title: "Instagram Profile",
        subtitle: "instagram.com/kalainithiguhan",
        icon: ExternalLink,
        category: "Socials & Links",
        action: () => {
          window.open(RESUME_DATA.socials.instagram, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
      {
        id: "link-resume",
        title: "Download Resume PDF",
        subtitle: "Open or download resume.pdf",
        icon: ExternalLink,
        category: "Socials & Links",
        action: () => {
          window.open(RESUME_DATA.resumePdf, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
      {
        id: "link-leetcode",
        title: `LeetCode ${RESUME_DATA.stats.leetcodeSolved}+ Record`,
        subtitle: "leetcode.com/u/kalainithiguhan/",
        icon: ExternalLink,
        category: "Socials & Links",
        action: () => {
          window.open(RESUME_DATA.socials.leetcode, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
      {
        id: "sys-dance",
        title: "Bugsy Mascot Dance Mode",
        subtitle: "Trigger secret celebration protocol & confetti",
        icon: Sparkles,
        category: "System Commands",
        action: () => {
          onDanceTrigger?.();
          onClose();
        },
      },
      {
        id: "sys-theme",
        title: "Toggle Light / Dark Mode",
        subtitle: "Switch between retro dark cyber & crisp clean daylight",
        icon: SunMoon,
        category: "System Commands",
        action: () => {
          const current = document.documentElement.getAttribute("data-theme") || "dark";
          const next = current === "dark" ? "light" : "dark";
          document.documentElement.setAttribute("data-theme", next);
          localStorage.setItem("kalaios_theme", next);
          onClose();
        },
      },
      {
        id: "sys-sound",
        title: "Toggle 8-bit WebAudio Sound Effects",
        subtitle: "Turn click blips, squash crunch, and fanfare ON/OFF",
        icon: Sparkles,
        category: "System Commands",
        action: () => {
          retroSound.toggle();
          onClose();
        },
      },
      {
        id: "sys-418",
        title: "Brew Coffee with Teapot (RFC 2324)",
        subtitle: "Jump to HTTP 418 I'm a Teapot Easter egg page",
        icon: ExternalLink,
        category: "System Commands",
        action: () => {
          window.location.href = "/418";
          onClose();
        },
      },
    ],
    [onClose, onDanceTrigger]
  );

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation inside palette
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? filteredCommands.length - 1 : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60"
          />

          {/* Dialog Container */}
          <m.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full max-w-xl rounded-xl border border-[var(--os-border-bright)] bg-[var(--os-surface)] shadow-2xl overflow-hidden z-10"
          >
            {/* Header / Search Input */}
            <div className="flex items-center px-4 py-3 border-b border-[var(--os-border)] gap-3 bg-[var(--os-surface)]">
              <Search className="w-5 h-5 text-[var(--os-accent)] shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or jump to section... (e.g. RAG, Skills)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-[var(--os-text)] placeholder-[var(--os-text-dim)] outline-none font-mono"
              />
              <button
                onClick={onClose}
                className="p-1 text-[var(--os-text-muted)] hover:text-white rounded"
                aria-label="Close command palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="p-6 text-center text-xs text-[var(--os-text-muted)] font-mono">
                  No commands matching &quot;{query}&quot;. Try typing &quot;Skills&quot; or &quot;Projects&quot;.
                </div>
              ) : (
                filteredCommands.map((cmd, index) => {
                  const Icon = cmd.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors min-h-[44px] ${
                        isSelected
                          ? "bg-[var(--os-surface-hover)] text-[var(--os-text)] border border-[var(--os-border-bright)]"
                          : "text-[var(--os-text-muted)] hover:bg-[var(--os-surface-hover)]"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-1.5 rounded-md ${
                            isSelected
                              ? "bg-[var(--os-accent)]/20 text-[var(--os-accent)]"
                              : "bg-[var(--os-border)] text-[var(--os-text-muted)]"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <p className="text-xs sm:text-sm font-medium text-[var(--os-text)]">
                            {cmd.title}
                          </p>
                          <p className="text-[11px] text-[var(--os-text-dim)] truncate font-mono">
                            {cmd.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[var(--os-border)]/50 text-[var(--os-text-dim)] shrink-0 ml-2">
                        {cmd.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-[var(--os-border)] bg-[var(--os-surface)]/80 flex items-center justify-between text-[11px] font-mono text-[var(--os-text-dim)]">
              <span>↑↓ Navigate · Enter Run · ESC Close</span>
              <span className="text-[var(--os-accent)]">KalaiOS v2.5</span>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
