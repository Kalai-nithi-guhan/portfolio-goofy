"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("kalaios_theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("kalaios_theme", nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`touch-target p-2 rounded-lg border border-[var(--os-border)] bg-[var(--os-surface)] text-[var(--os-text-muted)] hover:text-[var(--os-accent)] hover:border-[var(--os-border-bright)] transition-colors ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Toggle theme (current: ${theme})`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-[var(--os-accent)]" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--os-secondary)]" />
      )}
    </button>
  );
}
