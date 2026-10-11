"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { RESUME_DATA } from "@/data/resume";
import {
  Mail,
  Send,
  Phone,
  Copy,
  Check,
  Rocket,
  AlertCircle,
  Code2,
  Terminal,
  FileDown,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "../icons";
import { SectionIdCard } from "../section-id-card";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setToastMessage(`Copied ${label} to clipboard!`);
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          honeypot: formData.honeypot,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
      } else {
        setStatus("error");
        setErrorMessage(
          data?.error || "Submission encountered an error. Please email directly."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Please check connection or email directly.");
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 scroll-mt-14 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-[var(--os-accent)] text-[#0B0B12] font-mono text-xs font-bold shadow-2xl flex items-center gap-2 border border-black/20"
          >
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </m.div>
        )}
      </AnimatePresence>

      {/* Compact Section ID Card Strip */}
      <SectionIdCard
        theme="contact"
        roleTitle="Chief Compile Officer"
        sectionName="Contact"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)] flex items-center justify-center text-[var(--os-accent)]">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono text-[var(--os-accent)] tracking-wider">
              07 // COMPILE &amp; SEND
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--os-text)]">
              Initiate Transmission
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Copy-on-Click Quick Chips */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl border border-[var(--os-border-bright)] bg-[var(--os-surface)] shadow-xl">
              <h3 className="text-lg font-heading font-bold text-[var(--os-text)] mb-2">
                Direct Comms
              </h3>
              <p className="text-xs text-[var(--os-text-muted)] mb-5">
                Click any chip below to immediately copy details to your clipboard.
              </p>

              <div className="space-y-3 font-mono text-xs">
                {/* Email Chip */}
                <button
                  type="button"
                  onClick={() => copyToClipboard(RESUME_DATA.email, "Email")}
                  className="touch-target w-full p-3 rounded-xl border border-[var(--os-border)] bg-[var(--os-bg)] hover:border-[var(--os-accent)] hover:bg-[var(--os-surface-hover)] transition-all flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Mail className="w-4 h-4 text-[var(--os-accent)] shrink-0" />
                    <span className="text-[var(--os-text)] truncate">{RESUME_DATA.email}</span>
                  </div>
                  <Copy className="w-3.5 h-3.5 text-[var(--os-text-dim)] group-hover:text-[var(--os-accent)] shrink-0 ml-2" />
                </button>

                {/* Phone Chip */}
                <button
                  type="button"
                  onClick={() => copyToClipboard(RESUME_DATA.phone, "Phone number")}
                  className="touch-target w-full p-3 rounded-xl border border-[var(--os-border)] bg-[var(--os-bg)] hover:border-[var(--os-accent)] hover:bg-[var(--os-surface-hover)] transition-all flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span className="text-[var(--os-text)]">{RESUME_DATA.phone}</span>
                  </div>
                  <Copy className="w-3.5 h-3.5 text-[var(--os-text-dim)] group-hover:text-[var(--os-accent)] shrink-0 ml-2" />
                </button>

                {/* LinkedIn Chip */}
                <button
                  type="button"
                  onClick={() => copyToClipboard(RESUME_DATA.socials.linkedin, "LinkedIn URL")}
                  className="touch-target w-full p-3 rounded-xl border border-[var(--os-border)] bg-[var(--os-bg)] hover:border-[var(--os-accent)] hover:bg-[var(--os-surface-hover)] transition-all flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <LinkedinIcon className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span className="text-[var(--os-text)] truncate">kalai-nithi-guhan-m</span>
                  </div>
                  <Copy className="w-3.5 h-3.5 text-[var(--os-text-dim)] group-hover:text-[var(--os-accent)] shrink-0 ml-2" />
                </button>

                {/* GitHub Chip */}
                <button
                  type="button"
                  onClick={() => copyToClipboard(RESUME_DATA.socials.github, "GitHub URL")}
                  className="touch-target w-full p-3 rounded-xl border border-[var(--os-border)] bg-[var(--os-bg)] hover:border-[var(--os-accent)] hover:bg-[var(--os-surface-hover)] transition-all flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <GithubIcon className="w-4 h-4 text-[var(--os-text-muted)] shrink-0" />
                    <span className="text-[var(--os-text)] truncate">Kalai-nithi-guhan</span>
                  </div>
                  <Copy className="w-3.5 h-3.5 text-[var(--os-text-dim)] group-hover:text-[var(--os-accent)] shrink-0 ml-2" />
                </button>

                {/* LeetCode Chip */}
                <button
                  type="button"
                  onClick={() => copyToClipboard(RESUME_DATA.socials.leetcode, "LeetCode URL")}
                  className="touch-target w-full p-3 rounded-xl border border-[var(--os-border)] bg-[var(--os-bg)] hover:border-[var(--os-accent)] hover:bg-[var(--os-surface-hover)] transition-all flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Code2 className="w-4 h-4 text-[#FFA116] shrink-0" />
                    <span className="text-[var(--os-text)] truncate">
                      kalainithiguhan ({RESUME_DATA.stats.leetcodeSolved}+)
                    </span>
                  </div>
                  <Copy className="w-3.5 h-3.5 text-[var(--os-text-dim)] group-hover:text-[var(--os-accent)] shrink-0 ml-2" />
                </button>

                {/* Instagram Chip */}
                <button
                  type="button"
                  onClick={() => copyToClipboard(RESUME_DATA.socials.instagram, "Instagram URL")}
                  className="touch-target w-full p-3 rounded-xl border border-[var(--os-border)] bg-[var(--os-bg)] hover:border-[var(--os-accent)] hover:bg-[var(--os-surface-hover)] transition-all flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <InstagramIcon className="w-4 h-4 text-[var(--os-secondary)] shrink-0" />
                    <span className="text-[var(--os-text)] truncate">@kalainithiguhan</span>
                  </div>
                  <Copy className="w-3.5 h-3.5 text-[var(--os-text-dim)] group-hover:text-[var(--os-accent)] shrink-0 ml-2" />
                </button>

                {/* Resume Download */}
                <a
                  href={RESUME_DATA.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target w-full p-3 rounded-xl border border-[var(--os-border)] bg-[var(--os-bg)] hover:border-[var(--os-accent)] hover:bg-[var(--os-surface-hover)] transition-all flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-2.5">
                    <FileDown className="w-4 h-4 text-[var(--os-accent)] shrink-0" />
                    <span className="text-[var(--os-text)] font-mono text-xs">resume.pdf</span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--os-text-dim)] group-hover:text-[var(--os-accent)]">OPEN ↗</span>
                </a>
              </div>

              {/* Status terminal banner */}
              <div className="mt-5 p-3 rounded-xl bg-[#080912] border border-[var(--os-border)] text-[11px] font-mono text-[var(--os-text-dim)]">
                <div className="text-[var(--os-accent)] mb-0.5">● DISPATCH GUARANTEE</div>
                <div>Average reply turnaround within 24 hours.</div>
              </div>
            </div>
          </div>

          {/* Right Column: "Compile & Send" Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-[var(--os-border-bright)] bg-[var(--os-surface)] shadow-2xl relative">
              {/* Form header without unwanted text */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--os-border)]">
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--os-text-muted)]">
                  <Terminal className="w-4 h-4 text-[var(--os-accent)]" />
                  <span>TRANSMISSION_GATEWAY // API_POST</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--os-border)] text-[var(--os-text-dim)]">
                  POST / JSON
                </span>
              </div>

              {status === "success" ? (
                /* Rocket Fly Success Animation State */
                <m.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center space-y-4"
                >
                  <m.div
                    animate={{
                      y: [-10, -50, -120],
                      opacity: [1, 1, 0],
                      scale: [1, 1.2, 0.8],
                    }}
                    transition={{ duration: 1.6, ease: "easeIn" }}
                    className="p-4 rounded-full bg-[var(--os-accent)]/20 text-[var(--os-accent)] border border-[var(--os-accent)]"
                  >
                    <Rocket className="w-8 h-8" />
                  </m.div>

                  <h3 className="text-xl font-heading font-bold text-[var(--os-text)]">
                    Compiled and sent!
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--os-text-muted)] max-w-sm">
                    Thank you! Your payload has been compiled and safely routed to Kalai.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => setStatus("idle")}
                      className="touch-target px-4 py-2 rounded-xl border border-[var(--os-border)] text-xs font-mono text-[var(--os-text-muted)] hover:text-white"
                    >
                      Send another message
                    </button>
                    <a
                      href="mailto:kalaiguhan98@gmail.com"
                      className="touch-target px-4 py-2 rounded-xl bg-[var(--os-surface)] border border-[var(--os-border-bright)] text-xs font-mono text-[var(--os-accent)] hover:border-[var(--os-accent)]"
                    >
                      Email me directly
                    </a>
                  </div>
                </m.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field (hidden from view) */}
                  <input
                    type="text"
                    name="company_website"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                    className="opacity-0 absolute -z-10 w-0 h-0 pointer-events-none"
                    aria-hidden="true"
                  />

                  {status === "error" && (
                    <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 flex flex-col gap-2 text-xs text-red-300">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                        <span>{errorMessage}</span>
                      </div>
                      <div className="pt-1">
                        <a
                          href="mailto:kalaiguhan98@gmail.com"
                          className="inline-flex items-center gap-1.5 text-[var(--os-accent)] hover:underline font-mono"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          Email me directly: kalaiguhan98@gmail.com
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[var(--os-text-dim)] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ada Lovelace"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--os-border)] bg-[var(--os-bg)] text-xs sm:text-sm text-[var(--os-text)] placeholder-[var(--os-text-dim)] outline-none focus:border-[var(--os-accent)] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[var(--os-text-dim)] mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ada@domain.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--os-border)] bg-[var(--os-bg)] text-xs sm:text-sm text-[var(--os-text)] placeholder-[var(--os-text-dim)] outline-none focus:border-[var(--os-accent)] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--os-text-dim)] mb-1.5">
                      Subject / Project Scope
                    </label>
                    <input
                      type="text"
                      placeholder="AI Engineering Opportunity / Collaboration"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--os-border)] bg-[var(--os-bg)] text-xs sm:text-sm text-[var(--os-text)] placeholder-[var(--os-text-dim)] outline-none focus:border-[var(--os-accent)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--os-text-dim)] mb-1.5">
                      Message Content *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Hi Kalai, I'd like to discuss an opportunity or project..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--os-border)] bg-[var(--os-bg)] text-xs sm:text-sm text-[var(--os-text)] placeholder-[var(--os-text-dim)] outline-none focus:border-[var(--os-accent)] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button & Double-submit protection */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="touch-target w-full py-3 rounded-xl bg-[var(--os-accent)] text-[#0B0B12] font-semibold text-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--os-accent)]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <span className="font-mono text-xs animate-pulse">
                        COMPILING &amp; ROUTING PACKETS...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Compile &amp; Send Transmission</span>
                      </>
                    )}
                  </button>

                  {/* Direct Mailto Fallback Button */}
                  <div className="pt-2 text-center">
                    <a
                      href="mailto:kalaiguhan98@gmail.com"
                      className="touch-target inline-flex items-center justify-center gap-2 text-xs font-mono text-[var(--os-text-muted)] hover:text-[var(--os-accent)] transition-colors py-2"
                    >
                      <Mail className="w-3.5 h-3.5 text-[var(--os-accent)]" />
                      <span>Prefer client email? Email me directly: kalaiguhan98@gmail.com</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
