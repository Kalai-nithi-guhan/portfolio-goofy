"use client";

import Image from "next/image";
import { useState } from "react";

export type AvatarTheme =
  | "about"
  | "skills"
  | "projects"
  | "casefiles"
  | "experience"
  | "education"
  | "terminal"
  | "contact";

interface KalaiAvatarProps {
  theme: AvatarTheme;
  alt?: string;
  size?: number;
  className?: string;
}

const THEME_ALTS: Record<AvatarTheme, string> = {
  about: "Cartoon avatar of Kalai Nithi Guhan M in casual hoodie waving",
  skills: "Cartoon avatar of Kalai Nithi Guhan M as RPG adventurer with toolbox",
  projects: "Cartoon avatar of Kalai Nithi Guhan M as retro cartridge dealer",
  casefiles: "Cartoon avatar of Kalai Nithi Guhan M dressed as a detective",
  experience: "Cartoon avatar of Kalai Nithi Guhan M as git-commit historian with scroll",
  education: "Cartoon avatar of Kalai Nithi Guhan M as quest scholar with graduation cap",
  terminal: "Cartoon avatar of Kalai Nithi Guhan M as hacker with glowing laptop",
  contact: "Cartoon avatar of Kalai Nithi Guhan M as chief compile officer holding envelope",
};

/**
 * Matching vector cartoon avatar:
 * - Brown skin tone (#BD7A4E)
 * - Voluminous short dark wavy hair with a side sweep
 * - Black rectangular glasses
 * - Light moustache and stubble
 * - White collared shirt base with themed accessories
 */
function InlineSvgAvatar({ theme, size }: { theme: AvatarTheme; size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="rounded-full overflow-hidden bg-[#121324] select-none"
      aria-hidden="true"
    >
      {/* Background ring */}
      <circle cx="50" cy="50" r="48" fill="#141829" stroke="#7CFF6B" strokeWidth="2" opacity="0.6" />

      {/* Shoulders / Outer Outfit */}
      {theme === "about" && (
        <path d="M20 96 C20 72 35 66 50 66 C65 66 80 72 80 96 Z" fill="#3D5A45" />
      )}
      {theme === "skills" && (
        <path d="M20 96 C20 72 35 66 50 66 C65 66 80 72 80 96 Z" fill="#6B4226" />
      )}
      {theme === "projects" && (
        <path d="M20 96 C20 72 35 66 50 66 C65 66 80 72 80 96 Z" fill="#1E2038" />
      )}
      {theme === "casefiles" && (
        <path d="M20 96 C20 72 35 66 50 66 C65 66 80 72 80 96 Z" fill="#8C6D46" />
      )}
      {theme === "experience" && (
        <path d="M20 96 C20 72 35 66 50 66 C65 66 80 72 80 96 Z" fill="#1E3A34" />
      )}
      {theme === "education" && (
        <path d="M20 96 C20 72 35 66 50 66 C65 66 80 72 80 96 Z" fill="#18182E" />
      )}
      {theme === "terminal" && (
        <path d="M20 96 C20 72 35 66 50 66 C65 66 80 72 80 96 Z" fill="#141824" />
      )}
      {theme === "contact" && (
        <path d="M20 96 C20 72 35 66 50 66 C65 66 80 72 80 96 Z" fill="#1E1E2E" />
      )}

      {/* Crisp White Collared Shirt */}
      <path d="M38 68 L50 78 L62 68 L66 74 L50 84 L34 74 Z" fill="#F8FAFC" />
      <path d="M42 68 L50 77 L48 70 Z" fill="#CBD5E1" />
      <path d="M58 68 L50 77 L52 70 Z" fill="#CBD5E1" />

      {/* Neck */}
      <rect x="44" y="55" width="12" height="15" rx="3" fill="#BD7A4E" />
      <path d="M44 55 C48 59 52 59 56 55 L56 62 L44 62 Z" fill="#A86337" opacity="0.6" />

      {/* Face Base */}
      <ellipse cx="50" cy="44" rx="19" ry="21" fill="#BD7A4E" />
      {/* Ears */}
      <circle cx="31" cy="45" r="4.5" fill="#A86337" />
      <circle cx="69" cy="45" r="4.5" fill="#A86337" />

      {/* Voluminous Short Dark Wavy Hair with Side Sweep to Right */}
      {/* Back volume */}
      <path
        d="M29 42 C26 28 32 18 42 14 C50 10 60 11 67 15 C74 19 75 29 72 42 C68 32 63 24 54 22 C44 20 36 28 29 42 Z"
        fill="#0E0D14"
      />
      {/* Voluminous Waves Top Swept Right */}
      <circle cx="38" cy="18" r="8" fill="#14131C" />
      <circle cx="48" cy="15" r="9" fill="#1C1B26" />
      <circle cx="58" cy="16" r="8.5" fill="#14131C" />
      <circle cx="65" cy="22" r="7.5" fill="#1C1B26" />
      {/* Wave curl sweeps */}
      <path d="M34 26 C42 16 54 16 64 21" stroke="#252433" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M42 22 C48 18 56 18 63 22" stroke="#2E2D3E" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Eyebrows */}
      <path d="M38 36 C42 34 46 35 48 37" stroke="#121118" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M62 36 C58 34 54 35 52 37" stroke="#121118" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Eyes & Catchlights */}
      <circle cx="42" cy="42" r="2.2" fill="#121118" />
      <circle cx="42.7" cy="41.3" r="0.8" fill="#FFFFFF" />
      <circle cx="58" cy="42" r="2.2" fill="#121118" />
      <circle cx="58.7" cy="41.3" r="0.8" fill="#FFFFFF" />

      {/* Black Rectangular Glasses */}
      <rect x="35" y="37" width="13" height="9.5" rx="2" fill="none" stroke="#12131C" strokeWidth="2" />
      <rect x="52" y="37" width="13" height="9.5" rx="2" fill="none" stroke="#12131C" strokeWidth="2" />
      <line x1="48" y1="41" x2="52" y2="41" stroke="#12131C" strokeWidth="2" />
      {/* Temples */}
      <line x1="35" y1="40" x2="31" y2="39" stroke="#12131C" strokeWidth="1.5" />
      <line x1="65" y1="40" x2="69" y2="39" stroke="#12131C" strokeWidth="1.5" />
      {/* Subtle reflection */}
      <path d="M36 38 L40 38 L37 45 L36 45 Z" fill="#7CFF6B" opacity="0.3" />
      <path d="M53 38 L57 38 L54 45 L53 45 Z" fill="#7CFF6B" opacity="0.3" />

      {/* Nose */}
      <path d="M50 42 L49 51 Q50 53 52 51" stroke="#A86337" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Light Moustache */}
      <path d="M45 54 Q50 52 55 54 Q50 56 45 54 Z" fill="#221B17" />

      {/* Stubble dots */}
      <circle cx="46" cy="60" r="0.6" fill="#52321E" opacity="0.6" />
      <circle cx="50" cy="61" r="0.6" fill="#52321E" opacity="0.6" />
      <circle cx="54" cy="60" r="0.6" fill="#52321E" opacity="0.6" />

      {/* Smile Mouth */}
      <path d="M46 56 Q50 60 54 56" stroke="#14131A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M47 56 Q50 59 53 56 Z" fill="#FFFFFF" />

      {/* Themed Props / Accessories */}
      {theme === "about" && (
        /* Waving hand */
        <g transform="translate(74, 52) scale(0.35) rotate(-10)">
          <circle cx="20" cy="20" r="14" fill="#BD7A4E" />
          <path d="M8 12 L8 -4 M16 10 L18 -8 M24 10 L27 -7 M31 12 L34 -2" stroke="#BD7A4E" strokeWidth="7" strokeLinecap="round" />
        </g>
      )}

      {theme === "skills" && (
        /* Mini toolbox */
        <g transform="translate(62, 68) scale(0.28)">
          <rect x="0" y="8" width="45" height="28" rx="4" fill="#A83232" stroke="#161722" strokeWidth="3" />
          <rect x="14" y="0" width="16" height="8" rx="2" fill="none" stroke="#D1D5DB" strokeWidth="3" />
        </g>
      )}

      {theme === "projects" && (
        /* Retro ROM Cartridge */
        <g transform="translate(65, 66) scale(0.28) rotate(-10)">
          <rect x="0" y="0" width="30" height="38" rx="4" fill="#475569" stroke="#0F172A" strokeWidth="3" />
          <rect x="5" y="6" width="20" height="20" rx="2" fill="#7CFF6B" />
        </g>
      )}

      {theme === "casefiles" && (
        /* Magnifier */
        <g transform="translate(63, 62) scale(0.3) rotate(20)">
          <circle cx="16" cy="16" r="14" fill="#7CFF6B" fillOpacity="0.25" stroke="#E2B348" strokeWidth="4" />
          <path d="M26 26 L38 38" stroke="#5C4528" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}

      {theme === "experience" && (
        /* Parchment scroll */
        <g transform="translate(62, 68) scale(0.28)">
          <rect x="0" y="0" width="45" height="26" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
          <circle cx="12" cy="13" r="3" fill="#10B981" />
          <line x1="15" y1="13" x2="25" y2="13" stroke="#10B981" strokeWidth="2" />
          <circle cx="28" cy="13" r="3" fill="#EC4899" />
        </g>
      )}

      {theme === "education" && (
        /* Graduation Cap */
        <g transform="translate(30, 2) scale(0.38)">
          <polygon points="50,15 90,30 50,45 10,30" fill="#111222" stroke="#25283D" strokeWidth="3" />
          <circle cx="50" cy="30" r="3" fill="#E2B348" />
          <path d="M50 30 Q70 38 78 55" stroke="#E2B348" strokeWidth="2.5" fill="none" />
        </g>
      )}

      {theme === "terminal" && (
        /* Mini glowing laptop */
        <g transform="translate(60, 68) scale(0.28)">
          <polygon points="5,0 45,0 42,24 8,24" fill="#0B0B12" stroke="#7CFF6B" strokeWidth="2" />
          <polygon points="0,24 50,24 54,32 -4,32" fill="#1E293B" />
        </g>
      )}

      {theme === "contact" && (
        /* Sealed envelope */
        <g transform="translate(64, 68) scale(0.28)">
          <rect x="0" y="0" width="40" height="28" rx="3" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2.5" />
          <path d="M0 0 L20 16 L40 0" stroke="#CBD5E1" strokeWidth="2" fill="none" />
          <circle cx="20" cy="15" r="4" fill="#7CFF6B" />
        </g>
      )}
    </svg>
  );
}

export function KalaiAvatar({ theme, alt, size = 64, className = "" }: KalaiAvatarProps) {
  const [hasError, setHasError] = useState(false);
  const altText = alt || THEME_ALTS[theme];
  const src = `/avatars/${theme}.webp`;

  if (hasError) {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
        <InlineSvgAvatar theme={theme} size={size} />
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={altText}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
}
export { InlineSvgAvatar };
