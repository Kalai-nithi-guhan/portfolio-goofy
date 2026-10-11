"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import {
  Terminal,
  FolderGit2,
  Cpu,
  User,
  Briefcase,
  Mail,
  Search,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import { retroSound } from "@/lib/sound";

interface NavbarProps {
  onOpenCommand: () => void;
  onDanceTrigger: () => void;
  isDancing?: boolean;
  onLogoDoubleClick?: () => void;
}

const NAV_LINKS = [
  { href: "#about", label: "About", icon: User },
  { href: "#skills", label: "Skills", icon: Cpu },
  { href: "#projects", label: "Projects", icon: FolderGit2 },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function OsNavbar({ onOpenCommand, onDanceTrigger, isDancing, onLogoDoubleClick }: NavbarProps) {
  const [time, setTime] = useState("");
  const [activeSection, setActiveSection] = useState("hero");
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    setAudioActive(retroSound.isEnabled());
  }, []);

  const handleToggleAudio = () => {
    const nextState = retroSound.toggle();
    setAudioActive(nextState);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenCommand();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenCommand]);

  // Active section observer
  useEffect(() => {
    const sectionIds = ["about", "skills", "projects", "experience", "education", "bug-squash", "contact"];
    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Desktop OS Bar */}
      <header className="sticky top-0 z-30 w-full border-b border-[var(--os-border)] bg-[var(--os-bg)]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          {/* Left: OS Branding */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onDoubleClick={onLogoDoubleClick}
              title="Double-click to flip screen!"
              className="flex items-center gap-2 group text-sm font-heading font-bold text-[var(--os-text)] hover:text-[var(--os-accent)] transition-colors select-none"
            >
              <div className="w-6 h-6 rounded-md bg-[var(--os-surface)] border border-[var(--os-border)] flex items-center justify-center text-[var(--os-accent)] group-hover:border-[var(--os-accent)] transition-colors">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span>
                Kalai<span className="text-[var(--os-accent)]">OS</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--os-border)]/60 text-[var(--os-text-dim)]">
                v2.5
              </span>
            </a>

            <div className="hidden lg:flex items-center text-xs font-mono text-[var(--os-text-dim)] border-l border-[var(--os-border)] pl-3 gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--os-accent)] animate-pulse" />
              <span>SYS_OK</span>
              <span>·</span>
              <span>Llama 3.1 & CV Live</span>
            </div>
          </div>

          {/* Center: Desktop Nav items */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs text-[var(--os-text-muted)]">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? "text-[var(--os-accent)] bg-[var(--os-surface)] border border-[var(--os-border-bright)]"
                      : "hover:text-[var(--os-text)] hover:bg-[var(--os-surface)]/60"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right: Cmd+K shortcut, Dance button, Theme toggle, System clock */}
          <div className="flex items-center gap-2">
            {/* Quick search button */}
            <button
              onClick={onOpenCommand}
              className="touch-target px-2.5 py-1 text-xs font-mono rounded-lg border border-[var(--os-border)] bg-[var(--os-surface)] text-[var(--os-text-muted)] hover:text-[var(--os-text)] hover:border-[var(--os-border-bright)] flex items-center gap-2 transition-colors"
              aria-label="Open command palette"
            >
              <Search className="w-3.5 h-3.5 text-[var(--os-accent)]" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-[var(--os-border)] rounded text-[var(--os-text-dim)]">
                ⌘K
              </kbd>
            </button>

            {/* Secret Easter Egg trigger */}
            <button
              onClick={onDanceTrigger}
              className={`touch-target p-2 rounded-lg border transition-colors ${
                isDancing
                  ? "border-[var(--os-accent)] bg-[var(--os-accent)]/20 text-[var(--os-accent)]"
                  : "border-[var(--os-border)] bg-[var(--os-surface)] text-[var(--os-text-muted)] hover:text-[var(--os-secondary)]"
              }`}
              title="Bugsy Dance protocol"
              aria-label="Bugsy Dance Protocol"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            {/* Sound Toggle Button (Optional WebAudio blips) */}
            <button
              onClick={handleToggleAudio}
              className={`touch-target p-2 rounded-lg border transition-colors ${
                audioActive
                  ? "border-[var(--os-accent)] bg-[var(--os-accent)]/20 text-[var(--os-accent)]"
                  : "border-[var(--os-border)] bg-[var(--os-surface)] text-[var(--os-text-muted)] hover:text-white"
              }`}
              title={audioActive ? "Mute retro 8-bit blips" : "Enable retro 8-bit blips"}
              aria-label={audioActive ? "Mute retro sound" : "Enable retro sound"}
            >
              {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Clock */}
            <div className="hidden sm:flex items-center font-mono text-xs px-2.5 py-1 rounded bg-[var(--os-surface)] border border-[var(--os-border)] text-[var(--os-text-muted)]">
              {time || "12:00"}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Dock / Tab-Nav (Thumb Reachable, 44px+ touch targets, Safe Area) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--os-bg)]/95 border-t border-[var(--os-border)] px-3 py-1 pb-[max(8px,env(safe-area-inset-bottom))]"
      >
        <div className="flex items-center justify-around">
          <a
            href="#"
            className={`touch-target flex-1 flex flex-col items-center justify-center text-[11px] font-mono gap-0.5 ${
              activeSection === "hero" ? "text-[var(--os-accent)]" : "text-[var(--os-text-muted)]"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>OS</span>
          </a>

          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                className={`touch-target flex-1 flex flex-col items-center justify-center text-[11px] font-mono gap-0.5 ${
                  isActive ? "text-[var(--os-accent)] font-semibold" : "text-[var(--os-text-muted)]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </a>
            );
          })}

          <button
            onClick={onOpenCommand}
            className="touch-target flex-1 flex flex-col items-center justify-center text-[11px] font-mono text-[var(--os-secondary)]"
            aria-label="Open command palette"
          >
            <Search className="w-4 h-4" />
            <span>Cmd</span>
          </button>
        </div>
      </nav>
    </>
  );
}
