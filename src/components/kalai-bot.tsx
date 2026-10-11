"use client";

import { useState, useRef, useEffect } from "react";
import { RESUME_DATA } from "@/data/resume";
import {
  Bot,
  X,
  Send,
  ChevronDown,
} from "lucide-react";
import confetti from "canvas-confetti";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  chips?: string[];
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "init-1",
    sender: "bot",
    text: "Beep boop! 🤖 I'm KalaiBot, the autonomous debug assistant for Kalai Nithi Guhan M. What would you like to know about Kalai?",
    chips: ["Skills?", "Projects?", "Hire?", "Contact?"],
  },
];

export function KalaiBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Auto-collapse when any contact form input is focused
  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        isOpen &&
        (target.closest("#contact") || target.getAttribute("data-kalaibot-ignore"))
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("focusin", handleFocus);
    return () => document.removeEventListener("focusin", handleFocus);
  }, [isOpen]);

  const handleChipClick = (chip: string) => {
    handleUserQuery(chip);
  };

  const handleUserQuery = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    setTimeout(() => {
      const lower = trimmed.toLowerCase();
      let reply = "";
      let offerConfetti = false;

      if (lower.includes("skill")) {
        const top = RESUME_DATA.skillTiers[0].skills.map((s) => s.name).join(", ");
        reply = `Kalai's main loadout includes ${top}, plus deep learning foundations in PyTorch, TensorFlow, and modern Next.js. ${RESUME_DATA.stats.leetcodeSolved}+ LeetCode trials solved and zero memory leaks tolerated!`;
      } else if (lower.includes("project")) {
        reply = `Kalai has engineered 8 interactive cartridges, including an Autonomous AI Agent (local Ollama web scraper), Contextual Document QA RAG (Pinecone vector search), and an Edge Exercise Rep Counter (OpenCV + MediaPipe).`;
      } else if (lower.includes("hire") || lower.includes("job") || lower.includes("opportunity")) {
        offerConfetti = true;
        reply = `Kalai Nithi Guhan M is open for AI/ML engineering roles! He bridges mathematical deep learning with responsive production interfaces. Ready to interview and build immediately!`;
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("phone")) {
        reply = `You can reach Kalai directly at ${RESUME_DATA.email} or call ${RESUME_DATA.phone}. He typically replies within 24 hours!`;
      } else if (lower.includes("who") || lower.includes("about") || lower.includes("hi") || lower.includes("hello")) {
        reply = `Kalai Nithi Guhan M is a CS & AI/ML student at MCET Pollachi (CGPA: 8.63). He loves turning complex models into delightful web experiences fueled by filter coffee.`;
      } else {
        reply = `Kernel log: "${trimmed}". Kalai is specialized in RAG, Computer Vision, and full-stack engineering. Try selecting a chip below!`;
      }

      if (offerConfetti) {
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.7 },
          });
        } catch {
          // Ignore
        }
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: reply,
        chips: ["Skills?", "Projects?", "Hire?", "Contact?"],
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 280);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserQuery(inputValue);
  };

  // The chat panel — used in both desktop floating and mobile sheet
  const ChatPanel = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#17182E] border-b border-[var(--os-border)]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[var(--os-accent)]/20 text-[var(--os-accent)] border border-[var(--os-accent)]/40 flex items-center justify-center">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-[var(--os-text)]">
              KalaiBot <span className="text-[var(--os-accent)]">v1.0</span>
            </div>
            <div className="text-[9px] font-mono text-[var(--os-text-dim)] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--os-accent)] animate-pulse" />
              <span>Rule-Engine Online</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="w-11 h-11 flex items-center justify-center rounded-lg text-[var(--os-text-muted)] hover:text-white hover:bg-[var(--os-surface)] transition-colors"
          aria-label="Close KalaiBot"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Message History */}
      <div className="flex-1 p-3.5 space-y-3 overflow-y-auto text-xs font-sans min-h-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                msg.sender === "user"
                  ? "bg-[var(--os-accent)] text-[#0B0B12] font-medium rounded-br-none"
                  : "bg-[var(--os-surface)] text-[var(--os-text)] border border-[var(--os-border)] rounded-bl-none shadow-sm"
              }`}
            >
              {msg.text}
            </div>

            {msg.chips && msg.sender === "bot" && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {msg.chips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleChipClick(chip)}
                    className="px-2.5 py-1 rounded-full bg-[var(--os-bg)] border border-[var(--os-border-bright)] hover:border-[var(--os-accent)] hover:text-[var(--os-accent)] text-[10.5px] font-mono text-[var(--os-text-muted)] transition-colors"
                    style={{ minHeight: "32px" }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input Field */}
      <form
        onSubmit={handleSubmit}
        className="p-2.5 bg-[#0C0D17] border-t border-[var(--os-border)] flex items-center gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask KalaiBot a question..."
          data-kalaibot-ignore="true"
          className="flex-1 px-3 py-2 rounded-xl bg-[var(--os-bg)] border border-[var(--os-border)] text-xs text-[var(--os-text)] placeholder-[var(--os-text-dim)] outline-none focus:border-[var(--os-accent)]"
          style={{ minHeight: "44px" }}
        />
        <button
          type="submit"
          className="w-11 h-11 flex items-center justify-center rounded-xl bg-[var(--os-accent)] text-[#0B0B12] hover:brightness-110 transition-transform active:scale-95 shrink-0"
          aria-label="Send message"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );

  return (
    <>
      {/* Desktop floating widget (md+) */}
      <div
        className="hidden md:block fixed z-40 right-6 bottom-6 select-none"
        style={{ zIndex: 40 }}
      >
        {isOpen ? (
          <div
            className="w-[360px] flex flex-col rounded-2xl border-2 border-[var(--os-border-bright)] bg-[#111222] shadow-2xl overflow-hidden"
            style={{ height: "420px", maxHeight: "75dvh" }}
          >
            {ChatPanel}
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-full bg-[#15162B] border-2 border-[var(--os-accent)] text-[var(--os-text)] shadow-2xl hover:scale-105 active:scale-95 transition-all"
            aria-label="Open KalaiBot assistant chat"
            style={{ minHeight: "44px" }}
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[var(--os-accent)]/20 text-[var(--os-accent)] border border-[var(--os-accent)]/50">
              <Bot className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[var(--os-accent)] border-2 border-[#15162B]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-heading font-bold text-white group-hover:text-[var(--os-accent)] transition-colors">
                KalaiBot
              </span>
              <span className="text-[9px] font-mono text-[var(--os-text-dim)]">
                Ask anything
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Mobile: icon-only button positioned above bottom nav */}
      <div
        className="md:hidden fixed z-40 select-none"
        style={{
          right: "12px",
          bottom: "calc(56px + max(8px, env(safe-area-inset-bottom)) + 12px)",
        }}
      >
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center justify-center rounded-full bg-[#15162B] border-2 border-[var(--os-accent)] shadow-2xl active:scale-95 transition-all"
            aria-label="Open KalaiBot assistant chat"
            style={{ width: "48px", height: "48px" }}
          >
            <Bot className="w-5 h-5 text-[var(--os-accent)]" />
            <span
              className="absolute top-0.5 right-0.5 rounded-full bg-[var(--os-accent)] border-2 border-[#15162B]"
              style={{ width: "10px", height: "10px" }}
            />
          </button>
        )}
      </div>

      {/* Mobile bottom sheet */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex flex-col justify-end"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          role="dialog"
          aria-modal="true"
          aria-label="KalaiBot chat"
        >
          <div
            className="rounded-t-2xl border-t border-[var(--os-border-bright)] bg-[#111222] shadow-2xl flex flex-col overflow-hidden"
            style={{
              maxHeight: "70dvh",
              paddingBottom: "max(8px, env(safe-area-inset-bottom))",
            }}
          >
            {ChatPanel}
          </div>
        </div>
      )}
    </>
  );
}
