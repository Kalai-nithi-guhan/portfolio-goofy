import { RESUME_DATA, QuestItem } from "@/data/resume";
import { DoodleUnderline } from "../doodle-decorations";
import { SectionIdCard } from "../section-id-card";
import { GraduationCap, Award, CheckCircle2, Clock, Sparkles } from "lucide-react";

export function EducationSection() {
  return (
    <section id="education" className="py-16 sm:py-20 scroll-mt-14 relative">
      <SectionIdCard
        theme="education"
        roleTitle="Quest Scholar"
        sectionName="Education"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)] flex items-center justify-center text-[var(--os-accent)]">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono text-[var(--os-accent)] tracking-wider">
              05 // QUEST LOG CHRONICLES
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--os-text)]">
              Education &amp; Certifications
            </h2>
            <DoodleUnderline className="w-44 h-2.5 text-[#38BDF8] mt-1" />
          </div>
        </div>

        {/* Quest Log Timeline Cards */}
        <div className="space-y-4">
          {RESUME_DATA.education.map((quest: QuestItem) => {
            const isMainQuest = quest.questType === "Main Quest";
            const isCert = quest.questType === "Certification";

            return (
              <div
                key={quest.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isMainQuest
                    ? "border-[var(--os-accent)]/80 bg-[var(--os-surface)] shadow-lg"
                    : "border-[var(--os-border)] bg-[var(--os-surface)]/70 hover:border-[var(--os-border-bright)]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                        isMainQuest
                          ? "bg-[var(--os-accent)]/15 text-[var(--os-accent)] border-[var(--os-accent)]/40"
                          : isCert
                          ? "bg-[var(--os-secondary)]/15 text-[var(--os-secondary)] border-[var(--os-secondary)]/40"
                          : "bg-[var(--os-border)] text-[var(--os-text-muted)] border-[var(--os-border)]"
                      }`}
                    >
                      {quest.questType}
                    </span>

                    <span className="flex items-center gap-1 text-[11px] font-mono text-[var(--os-text-dim)]">
                      {quest.status === "In Progress" ? (
                        <span className="flex items-center gap-1 text-[#FBBF24]">
                          <Clock className="w-3 h-3" />
                          <span>In Progress</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[var(--os-accent)]">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Completed</span>
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--os-text-dim)]">
                    <span className="text-[var(--os-text)] font-bold bg-[var(--os-bg)] px-2 py-0.5 rounded border border-[var(--os-border)]">
                      {quest.scoreOrGpa}
                    </span>
                    <span>·</span>
                    <span>{quest.period}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-heading font-bold text-[var(--os-text)] mb-1">
                  {quest.title}
                </h3>

                <div className="text-xs sm:text-sm text-[var(--os-text-muted)] mb-3">
                  {quest.institution}
                </div>

                {quest.notes && (
                  <p className="text-xs text-[var(--os-text-dim)] italic mb-3">
                    &ldquo;{quest.notes}&rdquo;
                  </p>
                )}

                {/* Skills/Buffs Awarded Pill Row */}
                <div className="pt-2 border-t border-[var(--os-border)]/60 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono text-[var(--os-text-dim)] mr-1 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-[var(--os-accent)]" />
                    BUFFS AWARDED:
                  </span>
                  {quest.skillsAwarded.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--os-bg)] border border-[var(--os-border)] text-[var(--os-text-muted)]"
                    >
                      +{s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
