"use client";

interface CautionMarqueeProps {
  text?: string[];
  direction?: "left" | "right";
  className?: string;
  angle?: number;
}

const DEFAULT_MESSAGES = [
  "WORKS ON MY MACHINE",
  "NO BUGS WERE HARMED",
  "TODO: SLEEP",
  "CERTIFIED 100% ORGANIC BITS",
  "COMPILING BRAIN CELLS",
  "CAFFEINE OVERFLOW DETECTED",
  "GIT COMMIT -M 'PLEASE WORK'",
];

export function CautionMarquee({
  text = DEFAULT_MESSAGES,
  className = "",
  angle = -1.2,
}: CautionMarqueeProps) {
  const content = text.join("  ///  ");

  return (
    <div
      className={`relative w-full overflow-hidden py-3 select-none pointer-events-none my-6 ${className}`}
      style={{ transform: `rotate(${angle}deg)` }}
      aria-hidden="true"
    >
      <div className="relative bg-[#FFE600] text-[#0A0A10] font-mono font-extrabold text-xs uppercase tracking-wider py-1.5 shadow-md border-y-2 border-black flex overflow-hidden">
        {/* Animated Marquee Strip */}
        <div className="flex shrink-0 animate-marquee whitespace-nowrap">
          <span className="mx-4">{content}</span>
          <span className="mx-4">///</span>
          <span className="mx-4">{content}</span>
          <span className="mx-4">///</span>
        </div>
        <div className="flex shrink-0 animate-marquee whitespace-nowrap" aria-hidden="true">
          <span className="mx-4">{content}</span>
          <span className="mx-4">///</span>
          <span className="mx-4">{content}</span>
          <span className="mx-4">///</span>
        </div>
      </div>
    </div>
  );
}
