"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { retroSound } from "@/lib/sound";

interface BugsyProps {
  className?: string;
  size?: number;
  showSpeech?: boolean;
  isDancing?: boolean;
  onDanceTrigger?: () => void;
  mood?: "normal" | "confused" | "flexing" | "sleeping";
}

const DEV_JOKES = [
  "Why do Java devs wear glasses? Because they don't C#!",
  "A SQL query walks into a bar, walks to 2 tables: 'Can I join you?'",
  "There are 10 types of people: those who get binary, and those who don't.",
  "!false — It's funny because it's true.",
  "Why did the AI cross the road? To optimize loss on the other side!",
  "How many devs to change a bulb? None, that's a hardware issue.",
  "Git status: 0 errors, 100% vibe.",
];

export function BugsyMascot({
  className = "",
  size = 130,
  showSpeech = true,
  isDancing = false,
  onDanceTrigger,
  mood: propMood,
}: BugsyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [jokeIndex, setJokeIndex] = useState(0);
  const [speechText, setSpeechText] = useState(DEV_JOKES[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [idleTime, setIdleTime] = useState(0);

  // Determine effective mood
  const currentMood = isDancing
    ? "normal"
    : propMood || (idleTime >= 10 ? "sleeping" : "normal");

  // Track idle time for sleeping state
  useEffect(() => {
    const timer = setInterval(() => {
      setIdleTime((prev) => prev + 1);
    }, 1000);

    const resetIdle = () => setIdleTime(0);
    window.addEventListener("mousemove", resetIdle, { passive: true });
    window.addEventListener("touchstart", resetIdle, { passive: true });
    window.addEventListener("scroll", resetIdle, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("touchstart", resetIdle);
      window.removeEventListener("scroll", resetIdle);
    };
  }, []);

  // Eye tracking handler (Hydration-safe, only in useEffect)
  useEffect(() => {
    if (currentMood === "sleeping") return;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let clientX = 0;
      let clientY = 0;

      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.hypot(dx, dy) / 40, 3.8);

      setEyeOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, [currentMood]);

  // Periodic blinking
  useEffect(() => {
    if (currentMood === "sleeping") return;
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 140);
    }, 3800);

    return () => clearInterval(blinkInterval);
  }, [currentMood]);

  const handleClick = useCallback(() => {
    setIdleTime(0);
    retroSound.playBlip(520, 0.08);
    const nextIdx = (jokeIndex + 1) % DEV_JOKES.length;
    setJokeIndex(nextIdx);
    setSpeechText(DEV_JOKES[nextIdx]);

    if (onDanceTrigger) {
      onDanceTrigger();
    }
  }, [jokeIndex, onDanceTrigger]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setIdleTime(0);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Bugsy OS Mascot, click for dev jokes"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Comic speech bubble with jokes or Zzz */}
      {showSpeech && (
        <AnimatePresence mode="wait">
          <m.div
            key={currentMood === "sleeping" ? "sleep-bubble" : speechText}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`absolute -top-14 z-20 px-3 py-1.5 text-xs font-mono rounded-xl border shadow-xl whitespace-nowrap pointer-events-none max-w-[240px] text-center ${
              currentMood === "sleeping"
                ? "bg-[#1E1B4B] text-[#A5B4FC] border-[#6366F1]/50 animate-pulse"
                : "bg-[var(--os-surface)] text-[var(--os-accent)] border-[var(--os-border-bright)]"
            }`}
          >
            {currentMood === "sleeping" ? (
              <span className="font-bold">💤 Zzz... dreaming of clean PRs...</span>
            ) : currentMood === "flexing" ? (
              <span>💪 0 errors, 100% test coverage!</span>
            ) : currentMood === "confused" ? (
              <span>❓ Wait... where did my pointers go?</span>
            ) : (
              <span className="truncate">{speechText}</span>
            )}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[var(--os-surface)] border-r border-b border-[var(--os-border)]" />
          </m.div>
        </AnimatePresence>
      )}

      {/* Mascot Graphic with Motion Animation */}
      <m.div
        animate={
          isDancing
            ? {
                rotate: [-12, 12, -12],
                y: [0, -12, 0],
                transition: { repeat: Infinity, duration: 0.35 },
              }
            : currentMood === "sleeping"
            ? {
                y: [0, 2, 0],
                rotate: [0, 2, 0],
                transition: { repeat: Infinity, duration: 2.8, ease: "easeInOut" },
              }
            : currentMood === "flexing"
            ? {
                scale: [1, 1.08, 1],
                y: [0, -6, 0],
                transition: { repeat: Infinity, duration: 1.2 },
              }
            : isHovered
            ? {
                y: -5,
                scale: 1.05,
                transition: { duration: 0.2 },
              }
            : {
                y: [0, -4, 0],
                transition: { repeat: Infinity, duration: 3.2, ease: "easeInOut" },
              }
        }
        style={{ width: size, height: size }}
        className="cursor-pointer"
      >
        <svg
          viewBox="0 0 120 120"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="chassisGrad2" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1B1C2E" />
              <stop offset="0.6" stopColor="#131422" />
              <stop offset="1" stopColor="#0B0B14" />
            </linearGradient>
            <linearGradient id="visorGrad2" x1="30" y1="40" x2="90" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#08080E" />
              <stop offset="1" stopColor="#12131D" />
            </linearGradient>
          </defs>

          {/* Left Antenna */}
          <path
            d="M44 32 C36 18 26 20 22 24"
            stroke="#7CFF6B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="21" cy="24" r="4.5" fill="#7CFF6B" />

          {/* Right Antenna with pink tip */}
          <path
            d="M76 32 C84 18 94 20 98 24"
            stroke="#7CFF6B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="99" cy="24" r="4.5" fill="#FF5CAA" />

          {/* Flexing or Normal Legs/Arms */}
          {currentMood === "flexing" ? (
            <>
              {/* Flexing Biceps */}
              <path d="M26 50 C12 40 10 32 16 28" stroke="#7CFF6B" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M94 50 C108 40 110 32 104 28" stroke="#7CFF6B" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M26 80 C14 84 12 92 8 96" stroke="#7CFF6B" strokeWidth="3" strokeLinecap="round" />
              <path d="M94 80 C106 84 108 92 112 96" stroke="#7CFF6B" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M26 62 C14 62 12 70 8 74" stroke="#7CFF6B" strokeWidth="3" strokeLinecap="round" />
              <path d="M26 80 C14 84 12 92 8 96" stroke="#7CFF6B" strokeWidth="3" strokeLinecap="round" />
              <path d="M94 62 C106 62 108 70 112 74" stroke="#7CFF6B" strokeWidth="3" strokeLinecap="round" />
              <path d="M94 80 C106 84 108 92 112 96" stroke="#7CFF6B" strokeWidth="3" strokeLinecap="round" />
            </>
          )}

          {/* Body Chassis */}
          <rect
            x="24"
            y="28"
            width="72"
            height="72"
            rx="30"
            fill="url(#chassisGrad2)"
            stroke={currentMood === "sleeping" ? "#6366F1" : "#7CFF6B"}
            strokeWidth="3"
          />

          {/* Glass Visor */}
          <rect
            x="34"
            y="42"
            width="52"
            height="32"
            rx="12"
            fill="url(#visorGrad2)"
            stroke="#2A2C46"
            strokeWidth="2"
          />

          {/* Eyes depending on mood */}
          {currentMood === "sleeping" ? (
            /* Sleeping Z eyes */
            <>
              <path d="M43 57 Q48 61 53 57" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M67 57 Q72 61 77 57" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : currentMood === "confused" ? (
            /* Confused mismatched eyes */
            <>
              <circle cx="48" cy="57" r="7" fill="#7CFF6B" />
              <text x="68" y="63" fill="#FF5CAA" fontSize="16" fontWeight="bold">?</text>
            </>
          ) : (
            /* Normal tracking eyes */
            <>
              <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
                {isBlinking ? (
                  <line x1="43" y1="57" x2="53" y2="57" stroke="#7CFF6B" strokeWidth="3" strokeLinecap="round" />
                ) : (
                  <>
                    <circle cx="48" cy="57" r="7" fill="#7CFF6B" />
                    <circle cx="50" cy="55" r="2.5" fill="#FFFFFF" />
                  </>
                )}
              </g>

              <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
                {isBlinking ? (
                  <line x1="67" y1="57" x2="77" y2="57" stroke="#7CFF6B" strokeWidth="3" strokeLinecap="round" />
                ) : (
                  <>
                    <circle cx="72" cy="57" r="7" fill="#7CFF6B" />
                    <circle cx="74" cy="55" r="2.5" fill="#FFFFFF" />
                  </>
                )}
              </g>
            </>
          )}

          {/* Mouth */}
          <path
            d="M50 82 Q60 88 70 82"
            stroke="#FF5CAA"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </m.div>

      {/* Retro name tag */}
      <div className="mt-1 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--os-border)]/60 text-[10px] font-mono tracking-wider text-[var(--os-text-muted)] border border-[var(--os-border)]">
        <span className={`w-1.5 h-1.5 rounded-full ${currentMood === "sleeping" ? "bg-[#6366F1]" : "bg-[var(--os-accent)]"} animate-pulse`} />
        <span>BUGSY.SYS · {currentMood.toUpperCase()}</span>
      </div>
    </div>
  );
}
