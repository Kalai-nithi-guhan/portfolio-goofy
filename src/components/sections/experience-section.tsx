"use client";

import { useState } from "react";
import { RESUME_DATA } from "@/data/resume";
import { GitBranch, GitCommit as GitCommitIcon, Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { SectionIdCard } from "../section-id-card";

export function ExperienceSection() {
  const [selectedCommit, setSelectedCommit] = useState<string>("b0f81e2");
  const exp = RESUME_DATA.experience;

  return (
    <section id="experience" className="py-16 sm:py-20 scroll-mt-14 relative">
      <SectionIdCard
        theme="experience"
        roleTitle="Commit Historian"
        sectionName="Experience"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)] flex items-center justify-center text-[var(--os-accent)]">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono text-[var(--os-accent)] tracking-wider">
              04 // VERSION CONTROL HISTORY
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--os-text)]">
              Work Experience (Git Graph)
            </h2>
          </div>
        </div>

        {/* Company Header Box */}
        <div className="rounded-2xl border border-[var(--os-border-bright)] bg-[var(--os-surface)] p-6 mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[var(--os-border)]">
            <div>
              <div className="text-xs font-mono text-[var(--os-accent)] font-semibold mb-1">
                INTERNSHIP RECORD
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-[var(--os-text)]">
                {exp.role}
              </h3>
              <div className="text-base text-[var(--os-text-muted)] font-medium">
                {exp.company}
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5 text-xs font-mono text-[var(--os-text-dim)]">
              <span className="flex items-center gap-1.5 bg-[var(--os-bg)] px-2.5 py-1 rounded border border-[var(--os-border)] text-[var(--os-text-muted)]">
                <Calendar className="w-3.5 h-3.5 text-[var(--os-accent)]" />
                {exp.period}
              </span>
              <span className="flex items-center gap-1 text-[var(--os-text-dim)]">
                <MapPin className="w-3 h-3" />
                {exp.location}
              </span>
            </div>
          </div>

          <p className="text-sm text-[var(--os-text-muted)] leading-relaxed">
            {exp.summary}
          </p>
        </div>

        {/* Interactive Git Commit Graph */}
        <div className="rounded-2xl border border-[var(--os-border)] bg-[#0C0D1A] p-6 sm:p-8 font-mono">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--os-border)] text-xs text-[var(--os-text-dim)]">
            <div className="flex items-center gap-2 text-[var(--os-accent)] font-bold">
              <span>$ git log --graph --oneline --decorate</span>
            </div>
            <span className="hidden sm:inline">BRANCH: release/production</span>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-6">
            {/* Git Trunk Vertical Line */}
            <div className="absolute left-[11px] sm:left-[15px] top-2 bottom-3 w-[2px] bg-gradient-to-b from-[var(--os-accent)] via-[#38BDF8] to-[var(--os-secondary)]" />

            {exp.gitGraph.map((commit) => {
              const isSelected = selectedCommit === commit.hash;
              return (
                <div key={commit.hash} className="relative group">
                  {/* Commit Node Circle */}
                  <button
                    onClick={() => setSelectedCommit(commit.hash)}
                    className={`absolute -left-[23px] sm:-left-[27px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-[var(--os-accent)] bg-[var(--os-accent)] text-black scale-110 shadow-lg shadow-[var(--os-accent)]/30"
                        : "border-[var(--os-border-bright)] bg-[#0C0D1A] text-[var(--os-text-dim)] group-hover:border-[var(--os-accent)] group-hover:text-[var(--os-accent)]"
                    }`}
                    aria-label={`Inspect commit ${commit.hash}`}
                  >
                    <GitCommitIcon className="w-3 h-3" />
                  </button>

                  {/* Commit Card */}
                  <div
                    onClick={() => setSelectedCommit(commit.hash)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "border-[var(--os-accent)] bg-[var(--os-surface)] shadow-md"
                        : "border-[var(--os-border)] bg-[var(--os-surface)]/60 hover:border-[var(--os-border-bright)]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[var(--os-accent)] bg-[var(--os-accent)]/10 px-2 py-0.5 rounded border border-[var(--os-accent)]/30">
                          {commit.hash}
                        </span>
                        {commit.tag && (
                          <span className="text-[10px] text-[#38BDF8] bg-[#38BDF8]/10 px-1.5 py-0.5 rounded border border-[#38BDF8]/30">
                            {commit.tag}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[var(--os-text-dim)]">
                        {commit.date}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-[var(--os-text)] mb-2 font-mono">
                      {commit.message}
                    </h4>

                    <p className="text-xs text-[var(--os-text-muted)] font-sans leading-relaxed">
                      {commit.details}
                    </p>
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
