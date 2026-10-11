"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { RESUME_DATA } from "@/data/resume";
import { BugsyMascot } from "../bugsy-mascot";
import {
  ArrowDownRight,
  Send,
  Code2,
  Sparkles,
  Terminal,
  FileDown,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "../icons";
import { IdBadge } from "../id-badge";
import { DodgingHireButton } from "../dodging-hire-button";
import { FortuneCookie } from "../fortune-cookie";
import { DoodleUnderline } from "../doodle-decorations";
import { useKonamiCode } from "@/hooks/use-konami";

export function HeroSection({
  isDancing: propIsDancing,
  onDanceTrigger: propOnDanceTrigger,
}: {
  isDancing?: boolean;
  onDanceTrigger?: () => void;
} = {}) {
  const { isSuccess: internalDancing, triggerDance } = useKonamiCode();
  const isDancing = propIsDancing ?? internalDancing;
  const onDanceTrigger = propOnDanceTrigger ?? triggerDance;
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % RESUME_DATA.rotatingRoles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const nameLetters = RESUME_DATA.name.split("");

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:py-0 lg:min-h-[calc(100dvh-3rem)] flex items-center overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[600px] h-[300px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #7CFF6B 0%, rgba(255, 92, 170, 0.2) 50%, transparent 70%)",
        }}
      />

      <div className="os-container relative z-10 w-full">
        {/* System Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--os-border)] bg-[var(--os-surface)] text-xs font-mono mb-4 lg:mb-5">
          <span className="w-2 h-2 rounded-full bg-[var(--os-accent)] animate-pulse" />
          <span className="text-[var(--os-text-dim)]">SYSTEM:</span>
          <span className="text-[var(--os-text)]">KalaiOS Kernel 2.5 Active</span>
          <span className="text-[var(--os-accent)] font-semibold hidden sm:inline">
            · Open to AI/ML Roles
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full py-2">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Name */}
            <h1 className="hero-name-fluid font-heading font-extrabold tracking-tight text-[var(--os-text)] leading-[1.05] mb-3 sm:mb-4">
              {nameLetters.map((letter, i) => (
                <m.span
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.02, ease: "easeOut" }}
                  className="inline-block hover:text-[var(--os-accent)] transition-colors cursor-default"
                >
                  {letter === " " ? "\u00A0" : letter}
                </m.span>
              ))}
            </h1>

            {/* Rotating Role */}
            <div className="flex items-center gap-2 text-lg sm:text-2xl lg:text-3xl font-mono text-[var(--os-text-muted)] mb-4">
              <span className="text-[var(--os-accent)] font-bold">&gt;</span>
              <span className="text-[var(--os-text-dim)]">role:</span>
              <span className="text-[var(--os-accent)] font-semibold border-b-2 border-[var(--os-accent)] pb-0.5">
                {RESUME_DATA.rotatingRoles[roleIndex]}
              </span>
              <span className="w-2 h-5 bg-[var(--os-accent)] inline-block animate-pulse ml-0.5" />
            </div>

            {/* Objective / Tagline */}
            <p className="text-sm sm:text-base lg:text-lg text-[var(--os-text-muted)] font-normal max-w-2xl mb-3 leading-relaxed">
              {RESUME_DATA.objective}
            </p>
            <DoodleUnderline className="w-40 h-2.5 text-[var(--os-accent)] -mt-2 mb-5" />

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-5">
              <a
                href="#projects"
                className="touch-target px-5 py-3 rounded-xl bg-[var(--os-accent)] text-[#0B0B12] font-semibold text-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--os-accent)]/20"
              >
                <span>Inspect Projects</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <DodgingHireButton />

              <a
                href={RESUME_DATA.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target px-4 py-3 rounded-xl border border-[var(--os-border)] bg-[var(--os-surface)]/60 text-[var(--os-text-muted)] text-xs font-mono hover:text-[var(--os-accent)] hover:border-[var(--os-accent)] transition-colors flex items-center justify-center gap-1.5"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>

              <a
                href="#bug-squash"
                className="touch-target px-4 py-3 rounded-xl border border-[var(--os-border)] bg-[var(--os-surface)]/60 text-[var(--os-text-muted)] text-xs font-mono hover:text-[var(--os-accent)] hover:border-[var(--os-accent)] transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span>Bug Squash</span>
              </a>
            </div>

            {/* Fortune Cookie Widget */}
            <div className="w-full max-w-lg mb-4">
              <FortuneCookie />
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-[var(--os-text-dim)] mr-1">CONNECT:</span>
              <a
                href={RESUME_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target p-2.5 rounded-lg border border-[var(--os-border)] bg-[var(--os-surface)] text-[var(--os-text-muted)] hover:text-white hover:border-[var(--os-accent)] transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={RESUME_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target p-2.5 rounded-lg border border-[var(--os-border)] bg-[var(--os-surface)] text-[var(--os-text-muted)] hover:text-[#38BDF8] hover:border-[#38BDF8] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={RESUME_DATA.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target p-2.5 rounded-lg border border-[var(--os-border)] bg-[var(--os-surface)] text-[var(--os-text-muted)] hover:text-[var(--os-secondary)] hover:border-[var(--os-secondary)] transition-colors"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={RESUME_DATA.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target p-2.5 rounded-lg border border-[var(--os-border)] bg-[var(--os-surface)] text-[var(--os-text-muted)] hover:text-[#FFA116] hover:border-[#FFA116] transition-colors"
                aria-label="LeetCode Profile"
              >
                <Code2 className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${RESUME_DATA.email}`}
                className="touch-target p-2.5 rounded-lg border border-[var(--os-border)] bg-[var(--os-surface)] text-[var(--os-text-muted)] hover:text-[var(--os-accent)] hover:border-[var(--os-accent)] transition-colors"
                aria-label="Email Kalai"
              >
                <Terminal className="w-4 h-4" />
              </a>
              {/* Text email button only on sm+ to avoid 320px overflow */}
              <a
                href={`mailto:${RESUME_DATA.email}`}
                className="hidden sm:touch-target sm:flex ml-1 px-3 py-2 min-h-[44px] rounded-lg border border-[var(--os-border)] bg-[var(--os-surface)] text-[var(--os-text-muted)] hover:text-white hover:border-[var(--os-accent)] transition-colors items-center gap-1.5 text-xs font-mono"
                aria-label="Send email"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Email me</span>
              </a>
            </div>
          </div>

          {/* Right Column: ID Badge on lanyard + Bugsy, vertically centered */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center mt-4 lg:mt-0 my-auto">
            <div>
              <IdBadge
                name={RESUME_DATA.name}
                title="AI/ML ENGINEER (LOADING...)"
                photoSrc={RESUME_DATA.profilePhoto}
                photoAlt={RESUME_DATA.name}
                employeeId="KNG-2027"
                size="md"
              />
            </div>

            {/* Bugsy Mascot Companion: standalone element below badge with margin-top 12px */}
            <div className="flex flex-col items-center mt-3">
              <BugsyMascot
                size={100}
                isDancing={isDancing}
                onDanceTrigger={onDanceTrigger}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
