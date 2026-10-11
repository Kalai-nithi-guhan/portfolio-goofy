import { Suspense } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { CaseFilesSection } from "@/components/sections/case-files-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { EducationSection } from "@/components/sections/education-section";
import { BugSquashSection } from "@/components/sections/bug-squash-section";
import { ContactSection } from "@/components/sections/contact-section";
import { CautionMarquee } from "@/components/caution-marquee";
import { KalaiOsShell } from "@/components/kalai-os-shell";
import { NowPlayingCard } from "@/components/now-playing-card";

function SectionFallback() {
  return (
    <div className="w-full py-12 flex items-center justify-center font-mono text-xs text-[var(--os-text-dim)]">
      <span className="w-2 h-2 rounded-full bg-[var(--os-accent)] animate-ping mr-2" />
      Loading KalaiOS module...
    </div>
  );
}

// Lazy-loaded island: Mini Terminal
const MiniTerminal = dynamic(
  () => import("@/components/mini-terminal").then((mod) => mod.MiniTerminal),
  {
    loading: () => <SectionFallback />,
  }
);

export default function Home() {
  return (
    <KalaiOsShell>
      {/* Hero Section */}
      <HeroSection />

      {/* Task 6: Data-driven Now Playing Card */}
      <div className="os-container -mt-6 sm:-mt-8 mb-10 relative z-20">
        <NowPlayingCard />
      </div>

      <CautionMarquee
        text={[
          "WORKS ON MY MACHINE",
          "CERTIFIED ORGANIC NEURAL BITS",
          "CAFFEINE CRITICAL",
          "TODO: SLEEP",
        ]}
        angle={-1}
      />

      {/* About Section */}
      <AboutSection />

      <CautionMarquee
        text={[
          "NO BUGS WERE HARMED",
          "O(1) OPTIMISM DETECTED",
          "COMPILING BRAIN CELLS",
        ]}
        angle={1.2}
      />

      {/* Skills Section with 3D Flip Cards & Art */}
      <Suspense fallback={<SectionFallback />}>
        <SkillsSection />
      </Suspense>

      <CautionMarquee
        text={[
          "INSERT ROM 01 TO PLAY",
          "HARDWARE LOCKOUT VALIDATED",
          "BUILD WITHOUT LIMITS",
        ]}
        angle={-1.5}
      />

      {/* Handheld Console Projects */}
      <Suspense fallback={<SectionFallback />}>
        <ProjectsSection />
      </Suspense>

      {/* Task 7: Case Files Detective Board */}
      <Suspense fallback={<SectionFallback />}>
        <CaseFilesSection />
      </Suspense>

      {/* Work Experience */}
      <Suspense fallback={<SectionFallback />}>
        <ExperienceSection />
      </Suspense>

      {/* Education Quest Chronicles */}
      <EducationSection />

      {/* Task 8: Mini Terminal Island (Lazy-loaded) */}
      <Suspense fallback={<SectionFallback />}>
        <MiniTerminal />
      </Suspense>

      {/* Easter Egg Mascot Section */}
      <Suspense fallback={<SectionFallback />}>
        <BugSquashSection />
      </Suspense>

      {/* Contact Section */}
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
    </KalaiOsShell>
  );
}
