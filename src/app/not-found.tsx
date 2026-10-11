import Link from "next/link";
import { Terminal, RotateCcw, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070810] text-[#F3F4F6] flex items-center justify-center p-4 font-mono select-none">
      <div className="w-full max-w-xl rounded-2xl border border-red-500/40 bg-[#0E101C] p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--os-border)] text-xs text-red-400">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="font-bold">KERNEL_PANIC: ERROR 404</span>
          </div>
          <span className="text-[10px] bg-red-950/60 px-2 py-0.5 rounded border border-red-500/30">
            PAGE_FAULT_IN_NONPAGED_AREA
          </span>
        </div>

        {/* Diagnostic Dump */}
        <div className="space-y-3 text-xs sm:text-sm text-[var(--os-text-muted)] leading-relaxed bg-[#070810] p-4 rounded-xl border border-[var(--os-border)]">
          <p className="text-red-300 font-bold">
            *** STOP: 0x00000404 (0xFFFFF800, 0x00000000, 0xDEADBEEF)
          </p>
          <p>
            A fatal exception occurred because the requested URL route does not exist in the KalaiOS filesystem index.
          </p>
          <p className="text-[11px] text-[var(--os-text-dim)]">
            Bugsy diagnostic summary: Memory dump scanned. 0 valid components found at this memory address.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="touch-target w-full sm:w-auto px-5 py-3 rounded-xl bg-[var(--os-accent)] text-[#0B0B12] font-semibold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reboot to KalaiOS Home</span>
          </Link>

          <span className="text-[11px] text-[var(--os-text-dim)]">
            or press Alt+F4 to return to reality.
          </span>
        </div>
      </div>
    </div>
  );
}
