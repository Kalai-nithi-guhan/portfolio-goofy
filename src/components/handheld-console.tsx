"use client";

import { useState, useMemo } from "react";
import { RESUME_DATA, Project } from "@/data/resume";
import { AgentDemo } from "./project-demos/agent-demo";
import { RagDemo } from "./project-demos/rag-demo";
import { ExerciseDemo } from "./project-demos/exercise-demo";
import { EmailSummarizerDemo } from "./project-demos/email-summarizer-demo";
import { CropDiseaseDemo } from "./project-demos/crop-disease-demo";
import { TrafficViolationDemo } from "./project-demos/traffic-violation-demo";
import { CrimeHeatmapDemo } from "./project-demos/crime-heatmap-demo";
import { FertilizerRecommenderDemo } from "./project-demos/fertilizer-recommender-demo";
import { GithubIcon } from "./icons";
import { retroSound } from "@/lib/sound";
import { ExternalLink, Gamepad2, ChevronRight, ChevronLeft } from "lucide-react";

type FilterTag = "All" | "AI Agents" | "Computer Vision" | "NLP/RAG" | "ML";
const FILTERS: FilterTag[] = ["All", "AI Agents", "Computer Vision", "NLP/RAG", "ML"];

export function HandheldConsole() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("All");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const allProjects = RESUME_DATA.projects;

  const projects = useMemo(() => {
    if (activeFilter === "All") return allProjects;
    return allProjects.filter((p) => p.filterTags.includes(activeFilter as Project["filterTags"][number]));
  }, [activeFilter, allProjects]);

  const current = projects[Math.min(selectedIdx, projects.length - 1)];

  const handleFilter = (f: FilterTag) => {
    retroSound.playBlip(600, 0.06);
    setActiveFilter(f);
    setSelectedIdx(0);
  };

  const handleSelect = (idx: number) => {
    retroSound.playBlip(680, 0.08);
    setSelectedIdx(idx);
  };

  const handleNext = () => {
    retroSound.playBlip(720, 0.06);
    setSelectedIdx((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    retroSound.playBlip(640, 0.06);
    setSelectedIdx((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const renderDemo = (type: Project["demoType"]) => {
    switch (type) {
      case "agent-terminal": return <AgentDemo />;
      case "rag-qa": return <RagDemo />;
      case "pose-counter": return <ExerciseDemo />;
      case "email-summarizer": return <EmailSummarizerDemo />;
      case "crop-disease": return <CropDiseaseDemo />;
      case "traffic-violation": return <TrafficViolationDemo />;
      case "crime-heatmap": return <CrimeHeatmapDemo />;
      case "fertilizer-recommender": return <FertilizerRecommenderDemo />;
      default: return null;
    }
  };

  if (!current) return null;

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => handleFilter(f)}
            className={`touch-target px-3 py-1.5 rounded-xl text-[11px] font-mono whitespace-nowrap border transition-all shrink-0 ${
              activeFilter === f
                ? "bg-[var(--os-accent)] text-[#0B0B12] font-bold border-[var(--os-accent)]"
                : "bg-[var(--os-surface)] text-[var(--os-text-muted)] border-[var(--os-border)] hover:border-[var(--os-border-bright)]"
            }`}
          >
            {f}
            {f !== "All" && (
              <span className="ml-1 opacity-60">
                ({allProjects.filter((p) => p.filterTags.includes(f as Project["filterTags"][number])).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Handheld Console Outer Chassis */}
      <div className="max-w-4xl mx-auto rounded-3xl border-4 border-[#23253B] bg-[#141525] p-5 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Top Cartridge Slot */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-56 sm:w-80 h-3 bg-[#090A12] rounded-t-lg border-x-2 border-t-2 border-[#23253B]" />
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar max-w-full">
            {projects.map((p, idx) => {
              const isInserted = Math.min(selectedIdx, projects.length - 1) === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelect(idx)}
                  className={`touch-target transition-all duration-300 font-mono text-[11px] px-3.5 py-2 rounded-t-xl border-x-2 border-t-2 shrink-0 ${
                    isInserted
                      ? "bg-[var(--os-accent)] text-[#0B0B12] font-bold border-[var(--os-accent)] -translate-y-2 shadow-lg"
                      : "bg-[#0A0B14] text-[var(--os-text-muted)] border-[var(--os-border)] hover:border-[var(--os-accent)] hover:text-white"
                  }`}
                  aria-label={`Insert cartridge: ${p.title}`}
                >
                  <span className="mr-1.5 opacity-70">ROM {String(idx + 1).padStart(2, "0")}:</span>
                  <span className="hidden sm:inline">{p.title}</span>
                  <span className="sm:hidden">{p.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LCD Screen */}
        <div className="rounded-2xl border-4 border-[#080810] bg-[#07080F] p-4 sm:p-6 shadow-inner">
          {/* Screen Top Status */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--os-border)] font-mono text-xs text-[var(--os-text-dim)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--os-accent)] animate-pulse" />
              <span className="text-[var(--os-text)] font-bold">{current.title}</span>
            </div>
            <span
              className="text-[10px] font-bold uppercase px-2 py-0.5 rounded"
              style={{
                backgroundColor: `${current.color}20`,
                color: current.color,
              }}
            >
              {current.badge}
            </span>
          </div>

          {/* Demo */}
          <div className="mb-6">{renderDemo(current.demoType)}</div>

          {/* Project Details */}
          <div className="p-4 rounded-xl bg-[var(--os-surface)] border border-[var(--os-border)] space-y-4">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[var(--os-text)] mb-1">{current.tagline}</h4>
              <p className="text-xs text-[var(--os-text-muted)] leading-relaxed">{current.description}</p>
            </div>

            <div className="space-y-1">
              {current.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[var(--os-text-muted)]">
                  <span className="text-[var(--os-accent)]">✦</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Tech tags — plain, small */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {current.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--os-bg)] border border-[var(--os-border)] text-[var(--os-text-dim)]"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={current.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target px-4 py-2 rounded-xl bg-[var(--os-bg)] border border-[var(--os-border-bright)] hover:border-[var(--os-accent)] text-xs font-mono text-[var(--os-text)] hover:text-[var(--os-accent)] transition-colors flex items-center gap-2"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Source</span>
              </a>
              {current.liveUrl && (
                <a
                  href={current.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target px-4 py-2 rounded-xl bg-[var(--os-accent)] text-black font-semibold text-xs font-mono hover:brightness-110 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch / Repo</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Console Physical Controls */}
        <div className="mt-6 flex items-center justify-between px-2 sm:px-6 select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="touch-target p-3 rounded-xl bg-[#23253B] text-[var(--os-text-muted)] hover:text-white hover:bg-[#323652] active:scale-95 transition-all shadow-md"
              aria-label="Previous Cartridge"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="font-mono text-[10px] text-[var(--os-text-dim)] hidden sm:inline">
              {Math.min(selectedIdx, projects.length - 1) + 1}/{projects.length}
            </div>
            <button
              onClick={handleNext}
              className="touch-target p-3 rounded-xl bg-[#23253B] text-[var(--os-text-muted)] hover:text-white hover:bg-[#323652] active:scale-95 transition-all shadow-md"
              aria-label="Next Cartridge"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-1 font-heading font-extrabold text-xs text-[var(--os-text-dim)] tracking-widest">
            <Gamepad2 className="w-4 h-4 text-[var(--os-accent)]" />
            <span>KALAI-BOY COLOR</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleNext}
              className="touch-target w-10 h-10 rounded-full bg-[#FF5CAA] text-black font-bold text-xs flex items-center justify-center shadow-md active:scale-90 transition-transform"
              aria-label="Console Button B"
            >B</button>
            <button
              onClick={() => handleSelect((Math.min(selectedIdx, projects.length - 1) + 1) % projects.length)}
              className="touch-target w-10 h-10 rounded-full bg-[var(--os-accent)] text-black font-bold text-xs flex items-center justify-center shadow-md active:scale-90 transition-transform"
              aria-label="Console Button A"
            >A</button>
          </div>
        </div>
      </div>
    </div>
  );
}
