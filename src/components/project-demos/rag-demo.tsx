"use client";

import { useState } from "react";
import { MessageSquare, FileText, CheckCircle2, Search, ArrowRight } from "lucide-react";

const SCENARIOS = [
  {
    question: "What is the optimal N-P-K blend for acidic loam soil?",
    sourceChunk: "Section 4.1 (Agronomy Handbook, pg 28): 'In acidic loam soils (pH 5.2–5.8), recommend high-phosphorus ratio 10-26-26 with calcium carbonate buffers to inhibit aluminum toxicity.'",
    similarity: "0.942",
    pineconeLatency: "48ms",
    answer: "Based on Section 4.1 of the handbook, use a 10-26-26 blend supplemented with calcium carbonate buffers to neutralize acidity and avoid aluminum toxicity.",
  },
  {
    question: "How does contextual chunk overlap mitigate retrieval drop?",
    sourceChunk: "Architecture Doc (Chunking v2, pg 5): 'Employing 512-token chunks with 64-token sliding overlap preserves core semantic relations across paragraph boundaries.'",
    similarity: "0.968",
    pineconeLatency: "36ms",
    answer: "A 512-token chunk with 64-token sliding overlap retains context across paragraph boundaries, preventing boundary truncation in vector lookups.",
  },
];

export function RagDemo() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const current = SCENARIOS[selectedIdx];

  const handleSwitch = (idx: number) => {
    setIsSearching(true);
    setTimeout(() => {
      setSelectedIdx(idx);
      setIsSearching(false);
    }, 350);
  };

  return (
    <div className="rounded-xl border border-[var(--os-border)] bg-[#0B0C16] overflow-hidden font-sans text-xs">
      {/* Titlebar */}
      <div className="px-3 py-2 bg-[#141526] border-b border-[var(--os-border)] flex items-center justify-between font-mono">
        <div className="flex items-center gap-2 text-[var(--os-secondary)]">
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="font-semibold text-[11px]">fastapi-rag-retriever</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-[var(--os-text-dim)]">
          <span className="text-[var(--os-accent)]">Pinecone v3</span>
          <span>·</span>
          <span>SentenceTransformers</span>
        </div>
      </div>

      <div className="p-3.5 space-y-3">
        {/* Scenario Switcher Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {SCENARIOS.map((sc, i) => (
            <button
              key={i}
              onClick={() => handleSwitch(i)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors shrink-0 ${
                selectedIdx === i
                  ? "bg-[var(--os-secondary)]/20 text-[var(--os-secondary)] border border-[var(--os-secondary)]/40 font-semibold"
                  : "bg-[var(--os-surface)] text-[var(--os-text-dim)] border border-[var(--os-border)] hover:text-white"
              }`}
            >
              Query {i + 1}
            </button>
          ))}
        </div>

        {/* User Query */}
        <div className="p-2.5 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)]">
          <div className="text-[10px] font-mono text-[var(--os-text-dim)] mb-1 flex items-center gap-1">
            <Search className="w-3 h-3 text-[var(--os-secondary)]" />
            <span>USER QUERY:</span>
          </div>
          <p className="text-xs font-medium text-[var(--os-text)]">{current.question}</p>
        </div>

        {/* Retrieved Highlighted PDF Chunk */}
        <div className="p-2.5 rounded-lg bg-[#141829] border border-[var(--os-secondary)]/30 relative">
          <div className="flex items-center justify-between text-[10px] font-mono text-[var(--os-secondary)] mb-1">
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              <span>RETRIEVED VECTOR CHUNK</span>
            </span>
            <span className="bg-[var(--os-secondary)]/15 px-1.5 py-0.2 rounded font-bold">
              Cosine Sim: {current.similarity}
            </span>
          </div>
          <p className="text-[11px] text-[var(--os-text-muted)] font-mono leading-relaxed bg-[#0F1222] p-2 rounded border border-[var(--os-border)]">
            {current.sourceChunk}
          </p>
        </div>

        {/* Generated Answer */}
        <div className="p-2.5 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)]">
          <div className="text-[10px] font-mono text-[var(--os-accent)] mb-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>SYNTHESIZED GROUNDED ANSWER:</span>
          </div>
          <p className="text-xs text-[var(--os-text)] leading-relaxed">
            {current.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
