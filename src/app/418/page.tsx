import Link from "next/link";
import { Coffee, RotateCcw } from "lucide-react";

export default function TeapotPage() {
  return (
    <div className="min-h-screen bg-[#0A0B14] text-[#F3F4F6] flex items-center justify-center p-4 font-mono select-none">
      <div className="w-full max-w-lg rounded-2xl border-2 border-[#FF5CAA] bg-[#121324] p-6 sm:p-8 shadow-2xl text-center space-y-6">
        {/* Whistling SVG Teapot */}
        <div className="w-24 h-24 mx-auto relative">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            {/* Steam bubbles */}
            <circle cx="48" cy="18" r="4" fill="#FF5CAA" className="animate-ping" opacity="0.6" />
            <circle cx="56" cy="12" r="3" fill="#7CFF6B" className="animate-ping" opacity="0.4" />
            {/* Teapot Body */}
            <path
              d="M30 45 C30 35, 70 35, 70 45 C80 50, 85 65, 75 80 C65 85, 35 85, 25 80 C15 65, 20 50, 30 45 Z"
              fill="#1F2038"
              stroke="#FF5CAA"
              strokeWidth="3"
            />
            {/* Handle */}
            <path d="M72 48 C85 52, 85 72, 70 76" stroke="#7CFF6B" strokeWidth="3.5" strokeLinecap="round" />
            {/* Spout */}
            <path d="M28 55 C15 50, 15 35, 20 30" stroke="#7CFF6B" strokeWidth="3.5" strokeLinecap="round" />
            {/* Lid knob */}
            <circle cx="50" cy="34" r="5" fill="#FFE600" />
          </svg>
        </div>

        <div>
          <div className="inline-block px-3 py-1 rounded-full bg-[#FF5CAA]/20 text-[#FF5CAA] border border-[#FF5CAA]/40 text-xs font-bold mb-2">
            RFC 2324 · HYPER TEXT COFFEE POT PROTOCOL
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[var(--os-text)]">
            HTTP 418: I&apos;m a Teapot
          </h1>
          <p className="text-xs sm:text-sm text-[var(--os-text-muted)] mt-2 leading-relaxed">
            The KalaiOS runtime refuses to brew coffee with a teapot. Any attempt to brew coffee with a teapot should result in this error code.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[#090A12] border border-[var(--os-border)] text-xs text-[var(--os-text-dim)]">
          &quot;Short and stout. Here is my handle, here is my spout.&quot;
        </div>

        <Link
          href="/"
          className="touch-target inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--os-accent)] text-black font-semibold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Return to KalaiOS Desktop</span>
        </Link>
      </div>
    </div>
  );
}
