"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(onSuccess?: () => void) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [inputIndex, setInputIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const expectedKey = KONAMI_CODE[inputIndex].toLowerCase();

      if (key === expectedKey) {
        const nextIndex = inputIndex + 1;
        if (nextIndex === KONAMI_CODE.length) {
          setIsSuccess(true);
          setInputIndex(0);

          // Confetti explosion
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#7CFF6B", "#FF5CAA", "#38BDF8", "#FBBF24"],
            });
          } catch {
            // confetti fallback
          }

          onSuccess?.();

          // Reset success state after 6 seconds
          setTimeout(() => {
            setIsSuccess(false);
          }, 6000);
        } else {
          setInputIndex(nextIndex);
        }
      } else {
        // Reset if key doesn't match
        setInputIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputIndex, onSuccess]);

  return { isSuccess, triggerDance: () => {
    setIsSuccess(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#7CFF6B", "#FF5CAA", "#38BDF8"],
      });
    } catch {}
    onSuccess?.();
    setTimeout(() => setIsSuccess(false), 6000);
  }};
}
