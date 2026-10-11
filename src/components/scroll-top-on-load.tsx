"use client";

import { useEffect } from "react";

export function ScrollTopOnLoad() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable browser automatic scroll restoration so fresh loads start at top
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const hash = window.location.hash;
    const targetElement = hash && hash.length > 1 ? document.getElementById(hash.slice(1)) : null;

    if (hash && !targetElement) {
      // Clear bogus or invalid hashes
      window.history.replaceState(null, "", window.location.pathname);
    }

    if (!targetElement) {
      // Fresh load with no specific valid anchor: scroll strictly to top
      window.scrollTo(0, 0);
    }

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return null;
}
