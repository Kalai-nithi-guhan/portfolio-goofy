"use client";

import { HandheldConsole } from "../handheld-console";
import { DoodleUnderline } from "../doodle-decorations";
import { SectionIdCard } from "../section-id-card";
import { Gamepad2 } from "lucide-react";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 sm:py-24 scroll-mt-14 relative">
      <SectionIdCard
        theme="projects"
        roleTitle="Cartridge Dealer"
        sectionName="Projects"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)] flex items-center justify-center text-[var(--os-accent)]">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono text-[var(--os-accent)] tracking-wider">
                03 // HANDHELD CONSOLE ARCHIVE
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--os-text)]">
                Featured Engineering Cartridges
              </h2>
              <DoodleUnderline className="w-48 h-2.5 text-[var(--os-secondary)] mt-1" />
            </div>
          </div>

          <div className="text-xs font-mono text-[var(--os-text-dim)]">
            INSERT ANY ROM CARTRIDGE TO RUN REAL INTERACTIVE HARDWARE LOGS
          </div>
        </div>

        {/* Handheld Console Device */}
        <HandheldConsole />
      </div>
    </section>
  );
}
