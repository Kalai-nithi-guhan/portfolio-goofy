import { RESUME_DATA } from "@/data/resume";
import { IdBadge } from "../id-badge";
import { DoodleUnderline } from "../doodle-decorations";
import { SectionIdCard } from "../section-id-card";
import {
  FileText,
  Compass,
  Terminal,
  Cpu,
  Eye,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export function AboutSection() {
  const interestIcons = [Cpu, Eye, MessageSquare];

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 scroll-mt-[72px] relative">
      <SectionIdCard
        theme="about"
        roleTitle="Chief Vibes Officer"
        sectionName="About"
      />

      <div className="os-container">
        {/* Section Header */}
        <div className="flex items-start gap-4 mb-8 lg:mb-12">
          <div className="shrink-0">
            <IdBadge
              name={RESUME_DATA.name}
              title="AI/ML ENGINEER (LOADING...)"
              photoSrc={RESUME_DATA.profilePhoto}
              photoAlt={RESUME_DATA.name}
              employeeId="KNG-2027"
              size="sm"
            />
          </div>
          <div className="pt-2 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="hidden sm:flex w-8 h-8 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)] items-center justify-center text-[var(--os-accent)] shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-[var(--os-accent)] mono-caption-fluid">
                  01 // SYSTEM OVERVIEW
                </div>
                <h2 className="font-heading font-bold text-[var(--os-text)] section-heading-fluid">
                  About the Developer
                </h2>
                <DoodleUnderline className="w-36 h-2.5 text-[var(--os-accent)] mt-1" />
              </div>
            </div>
          </div>
        </div>

        {/* macOS-like Window Card: README.md */}
        <div className="rounded-2xl border border-[var(--os-border-bright)] bg-[var(--os-surface)] shadow-2xl overflow-hidden">
          {/* macOS Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#151726] border-b border-[var(--os-border)] select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20" />
              <div className="ml-3 flex items-center gap-2 text-xs font-mono text-[var(--os-text-muted)]">
                <FileText className="w-3.5 h-3.5 text-[var(--os-accent)]" />
                <span>README.md</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--os-border)]/60 text-[var(--os-text-dim)]">
                  UTF-8
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono text-[var(--os-text-dim)]">
              <span>git:(main)</span>
              <span>·</span>
              <span className="text-[var(--os-accent)]">✓ clean</span>
            </div>
          </div>

          {/* Window Body */}
          <div className="p-6 sm:p-8 space-y-8 font-sans">
            {/* Mission / Objective Card */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--os-accent)] uppercase tracking-wider mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>$ cat /career/objective.txt</span>
              </div>
              <div className="p-5 rounded-xl bg-[var(--os-bg)]/80 border border-[var(--os-border)] relative">
                <div className="absolute top-3 right-3 text-xs font-mono text-[var(--os-text-dim)]">
                  ROLE_MATCH: AI/ML
                </div>
                <p className="text-sm sm:text-base text-[var(--os-text)] leading-relaxed font-normal">
                  &ldquo;{RESUME_DATA.objective}&rdquo;
                </p>
              </div>
            </div>

            {/* Core Interests as Sticker Chips */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--os-secondary)] uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Core Research &amp; Engineering Vectors</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {RESUME_DATA.interests.map((interest, idx) => {
                  const Icon = interestIcons[idx] || Cpu;
                  return (
                    <div
                      key={interest.title}
                      className="group relative p-4 rounded-xl border border-[var(--os-border)] bg-[var(--os-surface-hover)]/40 hover:border-[var(--os-accent)] hover:bg-[var(--os-surface-hover)] transition-all duration-200 transform hover:-translate-y-1 cursor-default"
                    >
                      {/* Sticker Badge top tag */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)] text-[var(--os-accent)] group-hover:scale-105 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--os-border)]/80 text-[var(--os-text-dim)] group-hover:text-[var(--os-accent)] transition-colors">
                          {interest.tag}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-[var(--os-text)] mb-1">
                        {interest.title}
                      </h3>
                      <p className="text-xs text-[var(--os-text-muted)] leading-relaxed">
                        {interest.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Terminal Quote / Micro Philosophy */}
            <div className="p-4 rounded-xl bg-[#090A13] border border-[var(--os-border)] flex items-start gap-3 text-xs font-mono text-[var(--os-text-muted)]">
              <Terminal className="w-4 h-4 text-[var(--os-accent)] shrink-0 mt-0.5" />
              <div>
                <span className="text-[var(--os-accent)]">kalai@ai-workstation:~$</span>{" "}
                <span>
                  &quot;Building AI systems isn&apos;t just about training loss curves; it&apos;s about bridging raw compute with delightful, practical interfaces.&quot;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
