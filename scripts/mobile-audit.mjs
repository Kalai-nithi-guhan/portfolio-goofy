/**
 * scripts/mobile-audit.mjs
 * Comprehensive UI audit for KalaiOS portfolio — mobile & desktop viewports.
 * Usage:  node scripts/mobile-audit.mjs [--url http://localhost:3000]
 */

import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const BASE_URL = (() => {
  const idx = process.argv.indexOf("--url");
  return idx !== -1 ? process.argv[idx + 1] : "http://localhost:3000";
})();

const QA_DIR = path.resolve(__dirname, "..", "qa");

const VIEWPORTS = [
  // Mobile / Tablet viewports
  { name: "320px", width: 320, height: 812, isMobile: true },
  { name: "360px", width: 360, height: 800, isMobile: true },
  { name: "390px", width: 390, height: 844, isMobile: true },
  { name: "412px", width: 412, height: 915, isMobile: true },
  { name: "768px", width: 768, height: 1024, isMobile: false },
  { name: "landscape-740x360", width: 740, height: 360, isMobile: true },
  { name: "360px-125pct", width: 360, height: 800, fontScalePct: 125, isMobile: true },

  // Desktop / Laptop viewports
  { name: "1024x768", width: 1024, height: 768, isDesktop: true },
  { name: "1280x720", width: 1280, height: 720, isDesktop: true },
  { name: "1366x768", width: 1366, height: 768, isDesktop: true, takesScreenshots: true },
  { name: "1440x900", width: 1440, height: 900, isDesktop: true },
  { name: "1920x1080", width: 1920, height: 1080, isDesktop: true, takesScreenshots: true },
];

const DESKTOP_SECTIONS_TO_SCREENSHOT = [
  "hero", "skills", "projects", "case-files", "contact",
];

const MOBILE_SECTIONS_TO_SCREENSHOT = [
  "hero", "about", "skills", "projects", "case-files",
  "experience", "bug-squash", "contact",
];

const MIN_TAP_PX = 44;
const HEADER_BTN_MIN = 40;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
async function ensureDir(dir) {
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ---------------------------------------------------------------------------
// Evaluation checks
// ---------------------------------------------------------------------------
const CHECK_SCROLL_WIDTH = `
  (() => {
    const issues = [];
    const sw = document.documentElement.scrollWidth;
    const vw = window.innerWidth;
    if (sw > vw + 2) {
      issues.push({ type: "h-overflow", message: "scrollWidth " + sw + " > innerWidth " + vw + " (diff " + (sw - vw) + "px)" });
    }
    return issues;
  })()
`;

const CHECK_ELEMENT_OVERFLOW = `
  (() => {
    const issues = [];
    const vw = window.innerWidth;

    function isInsideScrollContainer(node) {
      let curr = node.parentElement;
      while (curr && curr !== document.body && curr !== document.documentElement) {
        if (curr.hasAttribute("data-intentional-overflow")) return true;
        const s = window.getComputedStyle(curr);
        if (s.overflowX === "auto" || s.overflowX === "scroll") return true;
        curr = curr.parentElement;
      }
      return false;
    }

    const all = document.querySelectorAll("*");
    for (const el of all) {
      if (el.closest("[data-intentional-overflow]")) continue;
      if (el.closest(".animate-marquee") || el.closest(".caution-tape")) continue;
      if (isInsideScrollContainer(el)) continue;
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") continue;
      const rect = el.getBoundingClientRect();
      if (rect.right > vw + 4) {
        issues.push({
          type: "el-overflow",
          tag: el.tagName,
          cls: String(el.className).slice(0, 60),
          right: Math.round(rect.right),
          vw,
          text: String(el.textContent).slice(0, 40).trim()
        });
        if (issues.length >= 10) break;
      }
    }
    return issues;
  })()
`;

const CHECK_TEXT_CLIPPING = `
  (() => {
    const issues = [];
    const els = document.querySelectorAll("p,span,a,button,h1,h2,h3,h4,h5,h6,label");
    for (const el of els) {
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (el.closest(".animate-marquee") || el.closest("[data-intentional-overflow]")) continue;
      const ov = style.overflow;
      if ((ov === "hidden" || ov === "clip") && style.textOverflow !== "ellipsis" && el.scrollWidth > el.clientWidth + 4) {
        issues.push({
          type: "text-clip",
          tag: el.tagName,
          text: String(el.textContent).slice(0, 60).trim(),
          sw: el.scrollWidth,
          cw: el.clientWidth
        });
        if (issues.length >= 10) break;
      }
    }
    return issues;
  })()
`;

const CHECK_SIBLING_OVERLAP = `
  (() => {
    const issues = [];
    const containers = [
      ...document.querySelectorAll("nav[aria-label='Mobile Navigation'] > div"),
      ...document.querySelectorAll("header > div"),
    ];
    function overlaps(a, b) {
      return !(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top);
    }
    for (const c of containers) {
      const kids = Array.from(c.children);
      for (let i = 0; i < kids.length; i++) {
        for (let j = i + 1; j < kids.length; j++) {
          const ra = kids[i].getBoundingClientRect();
          const rb = kids[j].getBoundingClientRect();
          if (ra.width === 0 || rb.width === 0) continue;
          if (overlaps(ra, rb)) {
            issues.push({
              type: "sibling-overlap",
              a: String(kids[i].textContent).slice(0, 30).trim(),
              b: String(kids[j].textContent).slice(0, 30).trim(),
              container: String(c.className).slice(0, 60)
            });
          }
        }
      }
    }
    return issues;
  })()
`;

const CHECK_FIXED_OVERLAP = `
  (() => {
    const issues = [];
    const fixed = Array.from(document.querySelectorAll("*")).filter((el) => {
      const s = window.getComputedStyle(el);
      return s.position === "fixed" || s.position === "sticky";
    }).filter((el) =>
      el.tagName === "HEADER" ||
      el.tagName === "NAV" ||
      String(el.getAttribute("aria-label") || "").includes("KalaiBot") ||
      String(el.getAttribute("aria-label") || "").includes("Mobile Navigation")
    );
    function overlaps(a, b) {
      return !(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top);
    }
    for (let i = 0; i < fixed.length; i++) {
      for (let j = i + 1; j < fixed.length; j++) {
        const ra = fixed[i].getBoundingClientRect();
        const rb = fixed[j].getBoundingClientRect();
        if (ra.width === 0 || rb.width === 0) continue;
        if (overlaps(ra, rb)) {
          issues.push({
            type: "fixed-overlap",
            a: fixed[i].tagName + "/" + String(fixed[i].className).slice(0, 40),
            b: fixed[j].tagName + "/" + String(fixed[j].className).slice(0, 40)
          });
        }
      }
    }
    return issues;
  })()
`;

const CHECK_CONTENT_COLUMN_WIDTH = `
  (() => {
    const issues = [];
    const vw = window.innerWidth;
    if (vw >= 1366) {
      const containers = Array.from(document.querySelectorAll(".os-container")).filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 100;
      });
      for (const el of containers) {
        const rect = el.getBoundingClientRect();
        const widthPct = (rect.width / vw) * 100;
        if (widthPct < 70) {
          issues.push({
            type: "content-column-narrow",
            message: "Main content column width " + Math.round(rect.width) + "px is " + widthPct.toFixed(1) + "% of viewport (must be >= 70% at 1366+)",
            width: Math.round(rect.width),
            vw,
          });
          break;
        }
      }
    }
    return issues;
  })()
`;

const CHECK_HERO_NAME_FONT = `
  (() => {
    const issues = [];
    const vw = window.innerWidth;
    if (vw >= 1024) {
      const h1 = document.querySelector("h1");
      if (h1) {
        const fs = parseFloat(window.getComputedStyle(h1).fontSize);
        if (fs < 56) {
          issues.push({
            type: "hero-name-font-small",
            message: "Hero name font-size " + fs + "px is below required 56px minimum on desktop (" + vw + "px viewport)",
            fontSize: fs,
            vw,
          });
        }
      }
    }
    return issues;
  })()
`;

const CHECK_TAP_TARGETS = (isMobile, min, headerMin) => `
  (() => {
    const issues = [];
    const isMobile = ${isMobile};
    const MIN = ${min};
    const HEADER_MIN = ${headerMin};
    if (!isMobile) return issues; // Only enforce strict 44px tap targets on touch devices

    const els = document.querySelectorAll("button,a,[role='button']");
    for (const el of els) {
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      const inHeader = !!el.closest("header");
      const threshold = inHeader ? HEADER_MIN : MIN;
      if (rect.width < threshold - 2 || rect.height < threshold - 2) {
        issues.push({
          type: "tap-target",
          tag: el.tagName,
          text: (el.textContent || el.getAttribute("aria-label") || "").slice(0, 50).trim(),
          w: Math.round(rect.width),
          h: Math.round(rect.height),
          inHeader
        });
        if (issues.length >= 10) break;
      }
    }
    return issues;
  })()
`;

const CHECK_PAGE_TOP = `(() => ({ scrollY: window.scrollY, atTop: window.scrollY <= 5 }))()`;

// ---------------------------------------------------------------------------
// Main Runner
// ---------------------------------------------------------------------------
async function runAudit() {
  await ensureDir(QA_DIR);

  const browser = await chromium.launch({ headless: true });
  const results = {};
  let totalIssues = 0;

  for (const vp of VIEWPORTS) {
    console.log(`\n── ${vp.name} (${vp.width}x${vp.height}) ──`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    if (vp.fontScalePct) {
      await page.addInitScript((pct) => {
        document.addEventListener("DOMContentLoaded", () => {
          document.documentElement.style.fontSize = pct + "%";
        });
      }, vp.fontScalePct);
    }

    try {
      await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });
    } catch {
      console.log("  ⚠ timeout waiting for networkidle — continuing after 5s");
    }
    await sleep(2500);

    const vpResults = { viewport: vp.name, issues: [] };

    // a) Page starts at top
    const topResult = await page.evaluate(CHECK_PAGE_TOP);
    if (!topResult.atTop) {
      vpResults.issues.push({
        type: "page-not-at-top",
        scrollY: topResult.scrollY,
        message: "Page loaded at scrollY=" + topResult.scrollY + " (should be 0)",
      });
    }

    // Scroll page smoothly to trigger lazy-loaded sections
    await page.evaluate(async () => {
      const total = document.body.scrollHeight;
      for (let y = 0; y < total; y += window.innerHeight * 0.8) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });
    await sleep(600);

    // b) Horizontal scroll
    vpResults.issues.push(...await page.evaluate(CHECK_SCROLL_WIDTH));

    // c) Element overflow
    const elOverflow = await page.evaluate(CHECK_ELEMENT_OVERFLOW);
    vpResults.issues.push(...elOverflow.slice(0, 5));

    // d) Text clipping
    const textClip = await page.evaluate(CHECK_TEXT_CLIPPING);
    vpResults.issues.push(...textClip.slice(0, 5));

    // e) Sibling overlap
    const siblingOverlap = await page.evaluate(CHECK_SIBLING_OVERLAP);
    vpResults.issues.push(...siblingOverlap.slice(0, 5));

    // f) Fixed overlap
    const fixedOverlap = await page.evaluate(CHECK_FIXED_OVERLAP);
    vpResults.issues.push(...fixedOverlap.slice(0, 5));

    // g) Content column width (70%+ at 1366+)
    const contentWidthIssues = await page.evaluate(CHECK_CONTENT_COLUMN_WIDTH);
    vpResults.issues.push(...contentWidthIssues);

    // h) Hero name font size (56px+ on desktop)
    const heroFontIssues = await page.evaluate(CHECK_HERO_NAME_FONT);
    vpResults.issues.push(...heroFontIssues);

    // i) Tap targets on mobile
    const tapIssues = await page.evaluate(CHECK_TAP_TARGETS(!!vp.isMobile, MIN_TAP_PX, HEADER_BTN_MIN));
    vpResults.issues.push(...tapIssues.slice(0, 5));

    // Screenshots at 360px
    if (vp.width === 360 && !vp.fontScalePct) {
      await page.screenshot({ path: path.join(QA_DIR, "360px-full.png"), fullPage: true });

      for (const id of MOBILE_SECTIONS_TO_SCREENSHOT) {
        const el = page.locator("#" + id).first();
        if (await el.count() > 0) {
          try {
            await el.scrollIntoViewIfNeeded();
            await sleep(250);
            await page.screenshot({ path: path.join(QA_DIR, "360px-" + id + ".png") });
          } catch {}
        }
      }
    }

    // Screenshots for desktop (1366x768 and 1920x1080)
    if (vp.takesScreenshots) {
      await page.screenshot({ path: path.join(QA_DIR, `${vp.name}-full.png`), fullPage: true });

      for (const id of DESKTOP_SECTIONS_TO_SCREENSHOT) {
        const el = page.locator("#" + id).first();
        if (await el.count() > 0) {
          try {
            await el.scrollIntoViewIfNeeded();
            await sleep(250);
            await page.screenshot({ path: path.join(QA_DIR, `${vp.name}-${id}.png`) });
          } catch {}
        }
      }
    }

    results[vp.name] = vpResults;
    const n = vpResults.issues.length;
    totalIssues += n;

    if (n === 0) {
      console.log("  ✅ 0 issues");
    } else {
      console.log("  ⚠  " + n + " issue(s):");
      for (const iss of vpResults.issues) {
        console.log("    [" + iss.type + "] " + JSON.stringify(iss).slice(0, 160));
      }
    }

    await context.close();
  }

  // Audit Table
  console.log("\n════════════════════════════════════════════════════════════");
  console.log("  UI AUDIT RESULTS (Mobile & Desktop Viewports)");
  console.log("════════════════════════════════════════════════════════════");
  for (const [name, r] of Object.entries(results)) {
    const n = r.issues.length;
    const mark = n === 0 ? "✅" : "⚠ ";
    console.log(mark + " " + name.padEnd(24) + String(n).padStart(4) + " issue(s)");
  }
  console.log("────────────────────────────────────────────────────────────");
  console.log("   TOTAL".padEnd(27) + String(totalIssues).padStart(4) + " issue(s)");
  console.log("════════════════════════════════════════════════════════════");

  if (totalIssues === 0) {
    console.log("\n🎉  0 issues — audit PASSED!\n");
  } else {
    console.log("\n❌  " + totalIssues + " issue(s) found — fix and re-run.\n");
  }

  await writeFile(
    path.join(QA_DIR, "audit-report.json"),
    JSON.stringify(results, null, 2)
  );
  console.log("Report → qa/audit-report.json");
  console.log("Screenshots → qa/\n");

  await browser.close();
  process.exit(totalIssues > 0 ? 1 : 0);
}

runAudit().catch((err) => {
  console.error("Audit fatal error:", err);
  process.exit(1);
});
