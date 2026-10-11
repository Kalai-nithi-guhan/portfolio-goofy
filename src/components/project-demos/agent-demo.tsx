"use client";

import { useState, useEffect } from "react";
import { Terminal, Play, RotateCcw } from "lucide-react";

const DEMO_LOGS = [
  { step: "[THOUGHT]", text: "User prompt: 'Research regional soil moisture anomalies and extract irrigation guidelines.'", delay: 300 },
  { step: "[PLAN]", text: "1. Query local Ollama Llama 3.1 8B for keyword extraction. 2. Fetch DOM with BeautifulSoup. 3. Format structured JSON.", delay: 800 },
  { step: "[OLLAMA_CALL]", text: "Running llama3.1:8b-instruct (4-bit, 8192 context). Latency: 120ms. Extracted 4 crawl vectors.", delay: 1400 },
  { step: "[SCRAPER]", text: "BeautifulSoup dispatched to target URL. Parsed 24 tables, sanitized CSS, extracted 18 data points.", delay: 2000 },
  { step: "[SYNTHESIS]", text: "Generating final recommendation matrix: 'Irrigation cycle recommendation: 45mm/week with loam mix.'", delay: 2600 },
  { step: "[COMPLETE]", text: "Task finished in 2.84s with 0 errors. Local inference cost: $0.00.", delay: 3200 },
];

export function AgentDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    if (activeStep < DEMO_LOGS.length) {
      const timer = setTimeout(() => {
        setActiveStep((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [activeStep, isRunning]);

  const handleRestart = () => {
    setActiveStep(0);
    setIsRunning(true);
  };

  return (
    <div className="rounded-xl border border-[var(--os-border)] bg-[#0A0B14] overflow-hidden font-mono text-xs">
      {/* Terminal Titlebar */}
      <div className="px-3 py-2 bg-[#141524] border-b border-[var(--os-border)] flex items-center justify-between">
        <div className="flex items-center gap-2 text-[var(--os-accent)]">
          <Terminal className="w-3.5 h-3.5" />
          <span className="font-semibold text-[11px]">llama3.1-8b-agent-worker</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] text-[var(--os-text-dim)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--os-accent)] animate-pulse" />
            OLLAMA_LOCAL
          </span>
          <button
            onClick={handleRestart}
            className="p-1 text-[var(--os-text-muted)] hover:text-white rounded"
            title="Restart simulation"
            aria-label="Restart agent simulation"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="p-4 space-y-2 min-h-[190px] max-h-[240px] overflow-y-auto">
        {DEMO_LOGS.slice(0, activeStep).map((log, index) => (
          <div key={index} className="flex items-start gap-2 leading-relaxed">
            <span
              className={`shrink-0 text-[10px] font-bold ${
                log.step === "[COMPLETE]"
                  ? "text-[var(--os-accent)]"
                  : log.step === "[OLLAMA_CALL]"
                  ? "text-[var(--os-secondary)]"
                  : log.step === "[SCRAPER]"
                  ? "text-[#38BDF8]"
                  : "text-[var(--os-text-dim)]"
              }`}
            >
              {log.step}
            </span>
            <span className="text-[var(--os-text-muted)]">{log.text}</span>
          </div>
        ))}

        {activeStep < DEMO_LOGS.length && (
          <div className="flex items-center gap-1 text-[var(--os-accent)] animate-pulse">
            <span>&gt; Thinking</span>
            <span>...</span>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="px-3 py-1.5 bg-[#07070F] border-t border-[var(--os-border)] flex items-center justify-between text-[10px] text-[var(--os-text-dim)]">
        <span>VRAM: 5.6GB / 8GB</span>
        <span className="text-[var(--os-accent)]">AGENT_STATUS: ACTIVE</span>
      </div>
    </div>
  );
}
