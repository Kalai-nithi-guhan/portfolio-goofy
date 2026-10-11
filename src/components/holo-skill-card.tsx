"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Sparkles, Shield, Zap, Layers, Cpu, Cloud, Terminal } from "lucide-react";
import { SkillItem } from "@/data/resume";
import { retroSound } from "@/lib/sound";

export type ExperienceTierLabel = "Main" | "Comfortable" | "Learning";

interface HoloSkillCardProps {
  skill: SkillItem;
  flavorJoke: string;
  experienceTier?: ExperienceTierLabel;
  rarity?: "Legendary" | "Mythic" | "Rare" | "Battle-Tested";
}

const CATEGORY_ART_MAP: Record<string, string> = {
  Language: "/skill-art/languages.webp",
  "ML & AI": "/skill-art/ai-ml.webp",
  "Web & Cloud": "/skill-art/cloud-db.webp",
  "Dev Tools": "/skill-art/tools.webp",
};

function FallbackCategoryArt({ category }: { category: string }) {
  const isML = category === "ML & AI";
  const isWeb = category === "Web & Cloud";
  const isTools = category === "Dev Tools";

  return (
    <div className="w-full h-28 rounded-xl bg-[#0F1122] border border-[var(--os-border)] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--os-accent)]/10 via-transparent to-[var(--os-secondary)]/10" />
      {isML ? (
        <Cpu className="w-10 h-10 text-[var(--os-secondary)]" />
      ) : isWeb ? (
        <Cloud className="w-10 h-10 text-[#38BDF8]" />
      ) : isTools ? (
        <Terminal className="w-10 h-10 text-[#F59E0B]" />
      ) : (
        <Zap className="w-10 h-10 text-[var(--os-accent)]" />
      )}
    </div>
  );
}

export function HoloSkillCard({
  skill,
  flavorJoke,
  experienceTier = "Main",
  rarity = "Battle-Tested",
}: HoloSkillCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const isTouchRef = useRef(false);

  const artSrc = CATEGORY_ART_MAP[skill.category] || "/skill-art/languages.webp";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const toggleFlip = () => {
    retroSound.playBlip(700, 0.05);
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip();
    }
  };

  // Touch vs Desktop hover
  const handleTouchStart = () => {
    isTouchRef.current = true;
  };

  const handleMouseEnter = () => {
    if (!isTouchRef.current) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchRef.current) {
      setIsFlipped(false);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${skill.name} skill trading card. Press Enter or Space to inspect reverse.`}
      onClick={toggleFlip}
      onTouchStart={handleTouchStart}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      className="relative h-80 w-full rounded-2xl cursor-pointer select-none group outline-none focus-visible:ring-2 focus-visible:ring-[var(--os-accent)]"
      style={{ perspective: "1000px" }}
    >
      {/* Inner card with 3D transform */}
      <div
        className="relative w-full h-full rounded-2xl border-2 border-[var(--os-border-bright)] hover:border-[var(--os-accent)] shadow-xl"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          willChange: "transform",
        }}
      >
        {/* FRONT OF THE CARD */}
        <div
          className="absolute inset-0 p-4.5 flex flex-col justify-between bg-[#111222] rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Holographic dynamic gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(124, 255, 107, 0.35) 0%, rgba(255, 92, 170, 0.25) 40%, transparent 70%)`,
            }}
          />

          {/* Card Top: Level + Category */}
          <div className="flex items-center justify-between pb-2 border-b border-[var(--os-border)] relative z-20">
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="text-[#FFE600] font-bold">LV 99</span>
              <span className="text-[var(--os-text-dim)]">·</span>
              <span className="text-[var(--os-accent)] font-semibold">{rarity}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[var(--os-surface)] border border-[var(--os-border)] text-[var(--os-text-dim)]">
              {skill.category}
            </span>
          </div>

          {/* Center: Skill Icon & Name */}
          <div className="my-auto text-center py-2 relative z-20">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[var(--os-bg)] border border-[var(--os-border)] flex items-center justify-center text-[var(--os-accent)] group-hover:scale-105 transition-transform shadow-inner">
              <Zap className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-heading font-extrabold text-[var(--os-text)] group-hover:text-[var(--os-accent)] transition-colors">
              {skill.name}
            </h4>
            <div className="text-[10px] font-mono text-[var(--os-text-dim)] mt-1">
              [SYSTEM COMPATIBLE]
            </div>
          </div>

          {/* Bottom: Flavor Lore */}
          <div className="p-2.5 rounded-xl bg-[var(--os-bg)]/90 border border-[var(--os-border)] text-left relative z-20">
            <div className="text-[9px] font-mono text-[#FFE600] uppercase font-bold flex items-center gap-1 mb-0.5">
              <Sparkles className="w-3 h-3" />
              <span>FLAVOR LORE:</span>
            </div>
            <p className="text-[11px] text-[var(--os-text-muted)] font-mono leading-tight line-clamp-2">
              &ldquo;{flavorJoke}&rdquo;
            </p>
          </div>

          {/* Flip Hint */}
          <div className="text-[9px] font-mono text-[var(--os-text-dim)] text-center mt-1 relative z-20">
            Tap / hover to flip card ↺
          </div>
        </div>

        {/* BACK OF THE CARD */}
        <div
          className="absolute inset-0 p-4 flex flex-col justify-between bg-[#15162B] border-2 border-[var(--os-accent)] rounded-2xl overflow-hidden shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Back Header: Skill Title & Real Text Info */}
          <div className="flex items-center justify-between pb-2 border-b border-[var(--os-border)]">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono text-[var(--os-text-dim)] uppercase">
                {skill.category}
              </span>
              <h4 className="text-base font-heading font-extrabold text-[var(--os-text)] truncate max-w-[190px]">
                {skill.name}
              </h4>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-[var(--os-accent)]" />
            </div>
          </div>

          {/* Category Themed Art (Lazy Loaded with Next/Image or Fallback) */}
          <div className="relative w-full h-28 my-1 rounded-xl overflow-hidden bg-[#0A0B14] border border-[var(--os-border)] shrink-0">
            {!imgError ? (
              <Image
                src={artSrc}
                alt={`${skill.category} themed card illustration`}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 320px"
                onError={() => setImgError(true)}
                className="object-cover"
              />
            ) : (
              <FallbackCategoryArt category={skill.category} />
            )}
          </div>

          {/* Flavor Text & Experience Tier Label (No percentages!) */}
          <div className="space-y-2 text-left">
            <div className="p-2 rounded-lg bg-[var(--os-bg)] border border-[var(--os-border)]">
              <p className="text-[10.5px] font-mono text-[var(--os-text-muted)] leading-tight italic">
                &ldquo;{flavorJoke}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)] font-mono text-xs">
              <span className="text-[var(--os-text-dim)] text-[10px]">Experience Tier:</span>
              <span
                className={`text-[10.5px] font-bold px-2 py-0.5 rounded border ${
                  experienceTier === "Main"
                    ? "bg-[var(--os-accent)]/20 text-[var(--os-accent)] border-[var(--os-accent)]/40"
                    : experienceTier === "Comfortable"
                    ? "bg-[#38BDF8]/20 text-[#38BDF8] border-[#38BDF8]/40"
                    : "bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40"
                }`}
              >
                {experienceTier}
              </span>
            </div>
          </div>

          {/* Flip Return Hint */}
          <div className="text-[9px] font-mono text-[var(--os-text-dim)] text-center pt-1 border-t border-[var(--os-border)]">
            Tap / click to return
          </div>
        </div>
      </div>
    </div>
  );
}
