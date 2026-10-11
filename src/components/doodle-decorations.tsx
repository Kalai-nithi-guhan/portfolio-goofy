import React from "react";

export function DoodleUnderline({ className = "w-36 h-3 text-[var(--os-accent)]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-hidden="true"
    >
      <path
        d="M3 10 C 25 15, 45 4, 75 10 C 105 15, 135 6, 157 9"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="doodle-draw"
      />
    </svg>
  );
}

export function DoodleArrow({ className = "w-8 h-8 text-[var(--os-secondary)]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-hidden="true"
    >
      <path
        d="M6 30 C 12 18, 22 10, 32 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="doodle-draw"
      />
      <path
        d="M24 6 L 33 8 L 30 17"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="doodle-draw"
      />
    </svg>
  );
}

export function DoodleStar({ className = "w-5 h-5 text-[#FFE600]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-hidden="true"
    >
      <path
        d="M12 2 L 14 9 L 21 11 L 15 15 L 16 22 L 12 18 L 8 22 L 9 15 L 3 11 L 10 9 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
        className="doodle-draw"
      />
    </svg>
  );
}
