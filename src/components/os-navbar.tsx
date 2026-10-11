"use client";

import { useEffect, useState, useRef } from "react";
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
  MoreHorizontal,
  X,
  FolderSearch,
  GraduationCap,
  FileTerminal,
  FileDown,
} from "lucide-react";
import { InstagramIcon } from "./icons";
import { retroSound } from "@/lib/sound";

interface NavbarProps {
  onOpenCommand: () => void;
  onDanceTrigger: () => void;
  isDancing?: boolean;
  onLogoDoubleClick?: () => void;
}

const DESKTOP_NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#case-files", label: "Case Files" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

// Primary 5 items for mobile bottom nav
const MOBILE_PRIMARY = [
  { href: "#about", label: "About", icon: User, sectionId: "about" },
  { href: "#skills", label: "Skills", icon: Cpu, sectionId: "skills" },
  { href: "#projects", label: "Work", icon: FolderGit2, sectionId: "projects" },
  { href: "#contact", label: "Contact", icon: Mail, sectionId: "contact" },
];

// Secondary items shown in "More" bottom sheet
const MORE_ITEMS = [
  { href: "#case-files", label: "Case Files", icon: FolderSearch },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#education", label: "Education", icon: GraduationCap },
  { href: "#terminal", label: "Terminal", icon: FileTerminal },
];

export function OsNavbar({ onOpenCommand, onDanceTrigger, isDancing, onLogoDoubleClick }: NavbarProps) {
  const [time, setTime] = useState("");
  const [activeSection, setActiveSection] = useState("hero");
  const [audioActive, setAudioActive] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

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

  // Active section IntersectionObserver
  useEffect(() => {
    const sectionIds = [
      "hero",
      "about",
      "skills",
      "projects",
      "case-files",
      "experience",
      "education",
      "terminal",
      "bug-squash",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-15% 0px -65% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close more sheet on outside click
  useEffect(() => {
    if (!moreOpen) return;
    const handler = (e: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [moreOpen]);

  return (
    <>
      {/* Top Desktop OS Bar */}
      <header className="sticky top-0 z-30 w-full border-b border-[var(--os-border)] bg-[var(--os-bg)]/90 backdrop-blur-md">
        <div className="os-container h-12 flex items-center justify-between gap-2 min-w-0">
          {/* Left: OS Branding */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#"
              onDoubleClick={onLogoDoubleClick}
              title="Double-click to flip screen!"
              className="flex items-center gap-1.5 group text-sm font-heading font-bold text-[var(--os-text)] hover:text-[var(--os-accent)] transition-colors select-none min-h-[40px] px-1"
            >
              <div className="w-6 h-6 rounded-md bg-[var(--os-surface)] border border-[var(--os-border)] flex items-center justify-center text-[var(--os-accent)] group-hover:border-[var(--os-accent)] transition-colors shrink-0">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span className="shrink-0">
                Kalai<span className="text-[var(--os-accent)]">OS</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--os-border)]/60 text-[var(--os-text-dim)] shrink-0">
                v2.5
              </span>
            </a>

            <div className="hidden lg:flex items-center text-xs font-mono text-[var(--os-text-dim)] border-l border-[var(--os-border)] pl-3 gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--os-accent)] animate-pulse" />
              <span>SYS_OK</span>
              <span>·</span>
              <span>Llama 3.1 &amp; CV Live</span>
            </div>
          </div>

          {/* Center: Desktop Nav items (About, Skills, Projects, Case Files, Experience, Education, Contact) */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs text-[var(--os-text-muted)]">
            {DESKTOP_NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? "text-[var(--os-accent)] bg-[var(--os-surface)] border border-[var(--os-border-bright)] font-semibold"
                      : "hover:text-[var(--os-text)] hover:bg-[var(--os-surface)]/60"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right: Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick search button */}
            <button
              onClick={onOpenCommand}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--os-border)] bg-[var(--os-surface)] text-[var(--os-text-muted)] hover:text-[var(--os-text)] hover:border-[var(--os-border-bright)] transition-colors"
              aria-label="Open command palette (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-[var(--os-accent)]" />
            </button>

            {/* Secret Easter Egg trigger */}
            <button
              onClick={onDanceTrigger}
              className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
                isDancing
                  ? "border-[var(--os-accent)] bg-[var(--os-accent)]/20 text-[var(--os-accent)]"
                  : "border-[var(--os-border)] bg-[var(--os-surface)] text-[var(--os-text-muted)] hover:text-[var(--os-secondary)]"
              }`}
              title="Bugsy Dance protocol"
              aria-label="Bugsy Dance Protocol"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleAudio}
              className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
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

            {/* Resume button on desktop */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[40px] rounded-lg border border-[var(--os-border)] bg-[var(--os-surface)] text-[var(--os-text-muted)] hover:text-[var(--os-accent)] hover:border-[var(--os-accent)] font-mono text-xs transition-colors"
              aria-label="Download Resume PDF"
            >
              <FileDown className="w-3.5 h-3.5 text-[var(--os-accent)]" />
              <span>Resume</span>
            </a>

            {/* Clock */}
            <div className="hidden sm:flex items-center font-mono text-xs px-2.5 py-1 rounded bg-[var(--os-surface)] border border-[var(--os-border)] text-[var(--os-text-muted)]">
              {time || "12:00"}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav — exactly 5 items in grid-cols-5 */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--os-bg)]/95 border-t border-[var(--os-border)]"
        style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}
      >
        <div
          className="grid grid-cols-5"
          style={{ height: "56px" }}
        >
          {MOBILE_PRIMARY.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                className="min-w-0 flex flex-col items-center justify-center gap-0.5 transition-colors"
                style={{
                  color: isActive ? "var(--os-accent)" : "var(--os-text-muted)",
                  transform: isActive ? "translateY(-1px)" : "none",
                  minHeight: "44px",
                }}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span
                  style={{
                    fontSize: "11px",
                    lineHeight: 1,
                    fontFamily: "var(--font-jetbrains-mono, monospace)",
                    whiteSpace: "nowrap",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {link.label}
                </span>
              </a>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setMoreOpen(true)}
            className="min-w-0 flex flex-col items-center justify-center gap-0.5"
            aria-label="More navigation options"
            aria-expanded={moreOpen}
            style={{
              color: moreOpen ? "var(--os-secondary)" : "var(--os-text-muted)",
              minHeight: "44px",
            }}
          >
            <MoreHorizontal className="w-4 h-4 shrink-0" />
            <span
              style={{
                fontSize: "11px",
                lineHeight: 1,
                fontFamily: "var(--font-jetbrains-mono, monospace)",
                whiteSpace: "nowrap",
              }}
            >
              More
            </span>
          </button>
        </div>
      </nav>

      {/* More Bottom Sheet */}
      {moreOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex flex-col justify-end"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          role="dialog"
          aria-modal="true"
          aria-label="More navigation"
        >
          <div
            ref={sheetRef}
            className="rounded-t-2xl border-t border-[var(--os-border-bright)] bg-[var(--os-surface)] shadow-2xl"
            style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
          >
            {/* Sheet handle + header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[var(--os-border)]">
              <span className="text-xs font-mono font-bold text-[var(--os-text)]">More</span>
              <button
                onClick={() => setMoreOpen(false)}
                className="w-11 h-11 flex items-center justify-center rounded-lg text-[var(--os-text-muted)] hover:text-white hover:bg-[var(--os-surface-hover)] transition-colors"
                aria-label="Close more sheet"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Secondary nav links */}
            <div className="px-3 py-2 space-y-1">
              {MORE_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-mono text-[var(--os-text-muted)] hover:text-[var(--os-text)] hover:bg-[var(--os-surface-hover)] transition-colors"
                    style={{ minHeight: "44px" }}
                  >
                    <Icon className="w-4 h-4 text-[var(--os-accent)] shrink-0" />
                    {item.label}
                  </a>
                );
              })}

              {/* Command Palette */}
              <button
                onClick={() => { setMoreOpen(false); onOpenCommand(); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-mono text-[var(--os-text-muted)] hover:text-[var(--os-text)] hover:bg-[var(--os-surface-hover)] transition-colors"
                style={{ minHeight: "44px" }}
              >
                <Search className="w-4 h-4 text-[var(--os-accent)] shrink-0" />
                Command Palette
                <kbd className="ml-auto text-[10px] px-1.5 py-0.5 bg-[var(--os-border)] rounded text-[var(--os-text-dim)]">⌘K</kbd>
              </button>

              {/* Resume */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-mono text-[var(--os-text-muted)] hover:text-[var(--os-text)] hover:bg-[var(--os-surface-hover)] transition-colors"
                style={{ minHeight: "44px" }}
              >
                <FileDown className="w-4 h-4 text-[var(--os-accent)] shrink-0" />
                Resume (PDF)
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/kalainithiguhan/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-mono text-[var(--os-text-muted)] hover:text-[var(--os-text)] hover:bg-[var(--os-surface-hover)] transition-colors"
                style={{ minHeight: "44px" }}
              >
                <InstagramIcon className="w-4 h-4 text-[var(--os-secondary)]" />
                Instagram
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
