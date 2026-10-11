"use client";

import { useState } from "react";
import { RESUME_DATA, SkillTier } from "@/data/resume";
import {
  Shield,
  Zap,
  Brain,
  ShieldAlert,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";

import { HoloSkillCard } from "../holo-skill-card";
import { DoodleUnderline, DoodleStar } from "../doodle-decorations";
import { SectionIdCard } from "../section-id-card";

const SKILL_JOKES: Record<string, string> = {
  Python: "90% of imports happen at 2 AM. Indentation keeps us civilized.",
  Java: `${RESUME_DATA.stats.leetcodeSolved}+ LeetCode trials solved. Garbage collector cleans up sleep debt.`,
  C: "Direct pointer arithmetic. If it segfaults, it builds character.",
  TensorFlow: "Trained on GPU, deployed with batch norm and optimism.",
  PyTorch: "Autograd never judged anyone. Loss functions converge in style.",
  MediaPipe: "Tracks 33 kinematics landmarks. Judges your desk posture.",
  "HF Transformers": "Attention is all you need... plus 16GB of VRAM.",
  "Next.js": "Server Components by default, instant hydration on demand.",
  "Node.js": "The event loop never sleeps, and neither do we during deployments.",
  "Tailwind CSS": "Zero CSS files were harmed in making this utility layout.",
  Firebase: "Realtime websockets delivering instantaneous telemetry sync.",
  MySQL: "A query walks into a bar... joins 2 tables without foreign key deadlocks.",
  Vercel: "Git push to main, sip coffee, production is live worldwide.",
  Render: "Deploying Python microservices without EC2 instance management headaches.",
  Ollama: "Local Llama 3.1 8B running cold on localhost with $0 API bill.",
  Git: "git commit -m 'Fixed typo that caused existential crisis'.",
  GitHub: "Green contribution squares are the ultimate developer dopamine.",
  "VS Code": "100+ extensions installed, uses 4GB RAM to edit a text file.",
};

// Short labels used for the tab buttons
const TIER_SHORT_LABELS: Record<string, string> = {
  "Main Equipment": "Main",
  "Comfortable Loadout": "Comfortable",
  "Skill Tree / Exploring": "Learning",
};

export function SkillsSection() {
  const [activeTierIndex, setActiveTierIndex] = useState(0);

  const getBuffIcon = (name: string) => {
    switch (name) {
      case "Algorithmic Intuition":
        return Brain;
      case "Rapid Model Synthesis":
        return Zap;
      case "Debug Tenacity":
        return ShieldAlert;
      case "Full-Stack Synergy":
        return Cpu;
      default:
        return Sparkles;
    }
  };

  const tierLabel = (idx: number) =>
    idx === 0 ? "Main" : idx === 1 ? "Comfortable" : "Learning";

  return (
    <section id="skills" className="py-16 md:py-24 lg:py-32 scroll-mt-[72px] relative">
      <SectionIdCard
        theme="skills"
        roleTitle="Loadout Master"
        sectionName="Skills"
      />

      <div className="os-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 lg:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="hidden sm:flex w-8 h-8 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)] items-center justify-center text-[var(--os-accent)] shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-[var(--os-accent)] mono-caption-fluid">
                  02 // CHARACTER ARSENAL
                </div>
                <h2 className="font-heading font-bold text-[var(--os-text)] section-heading-fluid">
                  Skills &amp; Inventory Loadout
                </h2>
                <DoodleUnderline className="w-40 h-2.5 text-[var(--os-accent)] mt-1" />
              </div>
            </div>
          </div>

          <div className="font-mono text-[var(--os-text-dim)] mono-caption-fluid">
            NO FAKE PERCENTAGES · REAL COMBAT PROFICIENCY
          </div>
        </div>

        {/* Tier Switcher Tabs — single horizontal-scroll row, no scrollbar track */}
        <div
          className="flex flex-row gap-2 mb-8"
          style={{
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
            paddingBottom: "2px",
          }}
        >
          {RESUME_DATA.skillTiers.map((tierData: SkillTier, idx: number) => {
            const isSelected = activeTierIndex === idx;
            const shortLabel = TIER_SHORT_LABELS[tierData.tier] || tierData.tier;
            return (
              <button
                key={tierData.tier}
                onClick={() => setActiveTierIndex(idx)}
                style={{
                  flex: "none",
                  whiteSpace: "nowrap",
                  scrollSnapAlign: "start",
                  minHeight: "44px",
                  paddingLeft: "1.25rem",
                  paddingRight: "1.25rem",
                }}
                className={`rounded-xl text-sm font-mono border transition-all ${
                  isSelected
                    ? "bg-[var(--os-accent)] text-[#0B0B12] font-bold border-[var(--os-accent)] shadow-md shadow-[var(--os-accent)]/20"
                    : "bg-[var(--os-surface)] text-[var(--os-text-muted)] border-[var(--os-border)] hover:border-[var(--os-border-bright)] hover:text-white"
                }`}
              >
                {shortLabel}
              </button>
            );
          })}
        </div>

        {/* Active Tier RPG Inventory Card */}
        {(() => {
          const currentTier = RESUME_DATA.skillTiers[activeTierIndex];
          return (
            <div className="rounded-2xl border border-[var(--os-border-bright)] bg-[var(--os-surface)] p-6 sm:p-8 lg:p-10 mb-12 shadow-xl">
              {/* Header info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[var(--os-border)] gap-2">
                <div>
                  <div className="text-xs font-mono text-[var(--os-accent)] mb-1">
                    {currentTier.tag}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[var(--os-text)]">
                    {currentTier.tier}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--os-text-muted)] max-w-md font-sans">
                  {currentTier.description}
                </p>
              </div>

              {/* Holographic Trading Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {currentTier.skills.map((skill) => (
                  <HoloSkillCard
                    key={skill.name}
                    skill={skill}
                    flavorJoke={SKILL_JOKES[skill.name] || "Engineered with precision and tested against edge cases."}
                    experienceTier={tierLabel(activeTierIndex) as "Main" | "Comfortable" | "Learning"}
                  />
                ))}
              </div>
            </div>
          );
        })()}

        {/* Passive Buffs Section */}
        <div>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Layers className="w-4 h-4 text-[var(--os-secondary)] shrink-0" />
            <h3 className="text-lg font-heading font-bold text-[var(--os-text)]">
              Soft Skills &amp; Passive Buffs
            </h3>
            <span className="text-xs font-mono text-[var(--os-text-dim)]">
              (Always Triggered in Production)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RESUME_DATA.passiveBuffs.map((buff) => {
              const Icon = getBuffIcon(buff.name);
              return (
                <div
                  key={buff.name}
                  className="p-5 rounded-xl border border-[var(--os-border)] bg-[var(--os-surface)] hover:border-[var(--os-secondary)] transition-colors relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-[var(--os-bg)] border border-[var(--os-border)] text-[var(--os-secondary)] group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[var(--os-secondary)]/15 text-[var(--os-secondary)] border border-[var(--os-secondary)]/30">
                      {buff.stat}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[var(--os-text)] mb-1">
                    {buff.name}
                  </h4>
                  <p className="text-xs text-[var(--os-text-muted)] leading-relaxed">
                    {buff.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
