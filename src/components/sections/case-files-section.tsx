"use client";

import { RESUME_DATA } from "@/data/resume";
import { SectionIdCard } from "../section-id-card";
import { DoodleUnderline } from "../doodle-decorations";
import { FolderSearch, FileCode2, ExternalLink, ShieldCheck, Tag } from "lucide-react";

export function CaseFilesSection() {
  // 3 pinned cases
  const caseProjects = RESUME_DATA.projects.slice(0, 3);

  return (
    <section id="case-files" className="py-16 sm:py-24 scroll-mt-14 relative overflow-hidden">
      {/* Section ID Card Strip */}
      <SectionIdCard
        theme="casefiles"
        roleTitle="Detective K."
        sectionName="Case Files"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)] flex items-center justify-center text-[#F59E0B]">
              <FolderSearch className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono text-[#F59E0B] tracking-wider">
                DOSSIER ARCHIVE // EVIDENCE BOARD
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--os-text)]">
                Classified Case Files
              </h2>
              <DoodleUnderline className="w-40 h-2.5 text-[#F59E0B] mt-1" />
            </div>
          </div>

          <div className="text-xs font-mono text-[var(--os-text-dim)]">
            CONFIDENTIAL NEURAL INVESTIGATIONS · EVIDENCE LINKED
          </div>
        </div>

        {/* Corkboard / Detective Board Container */}
        <div className="relative p-6 sm:p-10 rounded-3xl border-2 border-[#2B231B] bg-[#10111A] shadow-2xl overflow-hidden">
          {/* Cork texture & grid subtle overlay */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#F59E0B 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Yellow Caution Evidence Tape */}
          <div className="absolute -top-3 -right-10 bg-[#EAB308] text-black font-mono font-black text-[10px] px-14 py-1 rotate-12 uppercase tracking-widest shadow-md border-y border-black/40 select-none pointer-events-none z-20">
            CONFIDENTIAL // DO NOT LEAK
          </div>

          {/* Static Red SVG String Connections (Connecting Pinned Evidence) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Filter for shadow */}
            <defs>
              <filter id="string-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.8" />
              </filter>
            </defs>
            {/* String 1 to 2 */}
            <path
              d="M 180 60 Q 340 110 500 60"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              filter="url(#string-shadow)"
            />
            {/* String 2 to 3 */}
            <path
              d="M 500 60 Q 660 120 820 60"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              filter="url(#string-shadow)"
            />
            {/* Diagonal cross connection from 1 to 3 */}
            <path
              d="M 180 60 Q 500 150 820 60"
              fill="none"
              stroke="#DC2626"
              strokeWidth="1.8"
              opacity="0.8"
              filter="url(#string-shadow)"
            />
          </svg>

          {/* 3 Pinned Evidence Dossiers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-20">
            {caseProjects.map((project, idx) => {
              const caseNum = `00${idx + 1}`;
              const badgeColors = ["#7CFF6B", "#FF5CAA", "#60A5FA"];
              const accentColor = badgeColors[idx % badgeColors.length];

              return (
                <div
                  key={project.id}
                  className="group relative rounded-2xl bg-[#151728] border border-[var(--os-border-bright)] p-6 shadow-xl transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* Pushpin at top center */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 select-none">
                    <div className="w-5 h-5 rounded-full bg-red-600 border-2 border-red-300 shadow-lg flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                    </div>
                    <div className="w-1 h-2 bg-zinc-400" />
                  </div>

                  {/* Evidence Tag Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--os-border)] pt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-950/60 text-red-400 border border-red-800/40">
                        CASE #{caseNum}
                      </span>
                    </div>
                    <span
                      className="text-[9px] font-mono px-2 py-0.5 rounded uppercase font-semibold"
                      style={{
                        backgroundColor: `${accentColor}15`,
                        color: accentColor,
                        borderColor: `${accentColor}30`,
                        borderWidth: "1px",
                      }}
                    >
                      {project.badge}
                    </span>
                  </div>

                  {/* Project Case Title */}
                  <h3 className="text-lg font-heading font-bold text-[var(--os-text)] group-hover:text-[var(--os-accent)] transition-colors mb-2">
                    {project.title}
                  </h3>

                  {/* Case Tagline / Memo */}
                  <p className="text-xs text-[var(--os-text-muted)] mb-4 leading-relaxed font-sans">
                    {project.tagline}
                  </p>

                  {/* Key Evidence Highlights */}
                  <div className="space-y-1.5 mb-5 p-3 rounded-xl bg-[#0C0D17] border border-[var(--os-border)] font-mono text-[11px] text-[var(--os-text-dim)]">
                    <div className="text-[10px] uppercase text-[var(--os-accent)] font-bold mb-1 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>EVIDENCE LOGS</span>
                    </div>
                    {project.highlights.slice(0, 2).map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-1.5">
                        <span className="text-[var(--os-accent)]">›</span>
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--os-surface)] text-[var(--os-text-dim)] border border-[var(--os-border)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer link to GitHub */}
                  <div className="pt-3 border-t border-[var(--os-border)] flex items-center justify-between text-xs font-mono">
                    <span className="text-[10px] text-[var(--os-text-dim)]">
                      STATUS: VERIFIED
                    </span>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--os-accent)] hover:underline"
                    >
                      <span>Inspect Code</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
