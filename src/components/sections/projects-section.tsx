"use client";

import { HandheldConsole } from "../handheld-console";
import { DoodleUnderline } from "../doodle-decorations";
import { SectionIdCard } from "../section-id-card";
import { Gamepad2 } from "lucide-react";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32 scroll-mt-[72px] relative">
      <SectionIdCard
        theme="projects"
        roleTitle="Cartridge Dealer"
        sectionName="Projects"
      />

      <div className="os-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 lg:mb-12 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)] flex items-center justify-center text-[var(--os-accent)]">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-mono text-[var(--os-accent)] mono-caption-fluid">
                03 // HANDHELD CONSOLE ARCHIVE
              </div>
              <h2 className="font-heading font-bold text-[var(--os-text)] section-heading-fluid">
                Featured Engineering Cartridges
              </h2>
              <DoodleUnderline className="w-48 h-2.5 text-[var(--os-secondary)] mt-1" />
            </div>
          </div>

          <div className="font-mono text-[var(--os-text-dim)] mono-caption-fluid">
            INSERT ANY ROM CARTRIDGE TO RUN REAL INTERACTIVE HARDWARE LOGS
          </div>
        </div>

        {/* Handheld Console Device */}
        <HandheldConsole />
      </div>
    </section>
  );
}
