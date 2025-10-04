/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/puppeteer/route.ts
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyResumeToken } from "@/lib/server/jwt";
import { getBrowser } from "@/lib/launcher";
import type { Page } from "puppeteer-core";

import fs from "fs";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const maxDuration = 60;

/* ---------- Constants ---------- */

// A4 @ ~96dpi (794x1123) with deviceScaleFactor to improve glyph rasterization
const A4_VIEWPORT = { width: 794, height: 1123, deviceScaleFactor: 2 } as const;
const NAV_TIMEOUT_MS = 30_000;
const PDF_TIMEOUT_MS = 30_000;

/** Build @font-face CSS for the alias family names you use in JSX (no weights). */
// Build one CSS string you can inject pre- and post-navigation
async function buildAliasFontCSS(): Promise<string> {
  const aliases: { family: string; file: string }[] = [
    // Glacial
    { family: "GlacialIndifference-Regular", file: "GlacialIndifference-Regular.otf" },
    { family: "GlacialIndifference-Bold",    file: "GlacialIndifference-Bold.otf" },

    { family: "Roboto-Bold",    file: "Roboto-Bold.ttf" },
    { family: "Roboto-Regular",    file: "Roboto-Regular.ttf" },

    { family: "Arimo-Bold",    file: "Arimo-Bold.ttf" },

    { family: "NeueMachina-Bold",    file: "NeueMachina-Bold.ttf" },
    { family: "NeueMachina-Regular",    file: "NeueMachina-Regular.ttf" },

    { family: "DMSans-Bold",    file: "DMSans-Bold.ttf" },
    { family: "DMSans-Regular",    file: "DMSans-Regular.ttf" },

    // Aileron
    { family: "Aileron-Regular", file: "Aileron-Regular.otf" },
    { family: "Aileron-Bold",    file: "Aileron-Bold.otf" },
    // SemiBold: use real file if present; else reuse Bold
    { family: "Aileron-SemiBold",
      file: fs.existsSync(path.resolve(process.cwd(), "public/fonts/Aileron-SemiBold.otf"))
        ? "Aileron-SemiBold.otf" : "Aileron-Bold.otf" },

    // Lato
    { family: "Lato-Regular", file: "Lato-Regular.ttf" },
    { family: "Lato-Bold",    file: "Lato-Bold.ttf" },
    
    { family: "Poppins-Regular", file: "Poppins-Regular.ttf" },
    { family: "Poppins-Bold",    file: "Poppins-Bold.ttf" },
    
    { family: "Lora-Regular", file: "Lora-Regular.ttf" },
    { family: "Lora-Bold",    file: "Lora-Bold.ttf" },

    // NOW* — if you don't have these, map them to something you do ship
    // If you DO have the actual Now fonts, just point to those files instead.
    { family: "Now-Regular",
      file: fs.existsSync(path.resolve(process.cwd(), "public/fonts/Now-Regular.otf"))
        ? "Now-Regular.otf" : "GlacialIndifference-Regular.otf" },
    { family: "Now-Bold",
      file: fs.existsSync(path.resolve(process.cwd(), "public/fonts/Now-Bold.otf"))
        ? "Now-Bold.otf" : "GlacialIndifference-Bold.otf" },
    { family: "Now-Black",
      file: fs.existsSync(path.resolve(process.cwd(), "public/fonts/Now-Black.otf"))
        ? "Now-Black.otf" : "GlacialIndifference-Bold.otf" },
  ];

  const parts: string[] = [];
  for (const { family, file } of aliases) {
    const p = path.resolve(process.cwd(), "public", "fonts", file);
    const buf = await readFile(p); // throws if truly missing -> fix filenames
    const b64 = buf.toString("base64");
    const isOTF = /\.otf$/i.test(file);
    const isTTF = /\.ttf$/i.test(file);
    const format = isOTF ? "opentype" : isTTF ? "truetype" : "opentype";
    const mime   = isOTF ? "font/otf"   : isTTF ? "font/ttf"   : "font/otf";

    // You don’t set weights in JSX, so expose everything at weight:400
    parts.push(`
      @font-face{
        font-family:'${family}';
        src:url(data:${mime};base64,${b64}) format('${format}');
        font-weight:400;
        font-style:normal;
        font-display:block;
        font-synthesis-weight:none;
        font-synthesis-style:none;
      }
    `);
  }
  return parts.join("\n");
}


/** Inject print CSS early: zero margins, keep backgrounds, remove outer paddings. */
async function injectPrintStyles(page: Page, templateId: string): Promise<void> {
  await page.evaluateOnNewDocument((tpl: string) => {
    document.documentElement.classList.remove("dark");
    document.documentElement.setAttribute("data-theme", "light");

    const tightSelectors = [
      "#resumePreviewContent",
      "#resumePreviewContent > header",
      "#resumePreviewContent > main",
      "#resumePreviewContent > aside",
      "#resumePreviewContent .px-10",
      "#resumePreviewContent .pt-10",
      "#resumePreviewContent .p-10",
      "#resumePreviewContent .p-8",
    ];

    const perTemplate: Record<string, string[]> = {
      "classic-resume-rich": ["#aside", "#main"],
      "blue-creative-resume": ["#resumePreviewContent .grid"],
      "black-modern-professional": [],
      "mordern-sidebar-resume": ["#resumePreviewContent"],
    };

    const extra = perTemplate[tpl] ?? [];

    const css = `
      @page { size: 210mm 297mm; margin: 0; } /* exact A4 */
      html, body { margin:0 !important; padding:0 !important; background:#fff !important; }
      *,*::before,*::after { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

      ${[...tightSelectors, ...extra].map((sel) => `${sel}{ padding:0 !important; }`).join("\n")}
      #resumePreviewContent svg { display:block; } /* avoid anti-alias gaps on bands */
    `;

    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }, templateId);

  await page.emulateMediaType("print");
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);
}

/** Remove same-origin @font-face rules that point to /fonts URLs (they often 404 in PDF env). */
async function stripUrlFontFaces(page: Page) {
  await page.evaluate(() => {
    const familyRe = /^(GlacialIndifference|Aileron|Lato)(-|$)/;
    const isFontUrl = (src: string) => /url\(\s*["']?\/fonts\//i.test(src);

    for (const sheet of Array.from(document.styleSheets)) {
      let rules: CSSRuleList | undefined;
      try { rules = (sheet as CSSStyleSheet).cssRules; } catch { continue; } // cross-origin -> ignore
      if (!rules) continue;

      for (let i = rules.length - 1; i >= 0; i--) {
        const r = rules[i] as CSSRule;
        if (r.type !== CSSRule.FONT_FACE_RULE) continue;
        const st = (r as CSSFontFaceRule).style;
        const fam = st.getPropertyValue("font-family").replace(/['"]/g, "").trim();
        const src = st.getPropertyValue("src");
        if (familyRe.test(fam) && isFontUrl(src)) {
          (sheet as CSSStyleSheet).deleteRule(i);
        }
      }
    }
  });
}

/* ---------- Helpers: Navigation & PDF ---------- */

async function gotoStable(page: Page, url: string): Promise<void> {
  await page.goto(url, { waitUntil: "networkidle0", timeout: NAV_TIMEOUT_MS });
  // wait for webfonts ready if available
  await page.evaluate(async () => {
    const fonts = (document as any).fonts;
    if (fonts?.ready) await fonts.ready;
  });
}

function buildPreviewUrl(origin: string, token: string): string {
  return `${origin}/preview-for-download?token=${encodeURIComponent(token)}`;
}

/** Minimal 3p/asset filtering: keep styles & fonts, block heavy analytics/media. */
function attachRequestInterception(page: Page): void {
  page.on("request", (req) => {
    const type = req.resourceType();
    const url = req.url();
    if (type === "media") return req.abort();
    if (/\b(googletagmanager|google-analytics|gtag|segment|mixpanel|clarity)\b/i.test(url)) {
      return req.abort();
    }
    return req.continue();
  });
}

/** Enforce zero page margins at the print engine level too. */
async function enforceZeroBodyMargins(page: Page): Promise<void> {
  await page.emulateMediaType("print");
  await page.evaluate(() => {
    const set = (el: HTMLElement | null) => el?.style.setProperty("margin", "0", "important");
    set(document.documentElement);
    set(document.body);
  });
  await page.addStyleTag({ content: `@page { size: 210mm 297mm; margin: 0; }` });
}

/** Consistent 4xx/5xx responses. */
function httpError(message: string, status: number): Response {
  return new Response(message, { status, headers: { "Content-Type": "text/plain" } });
}

/* ---------- Route ---------- */

export async function POST(req: NextRequest): Promise<Response> {
  let page: Page | null = null;

  try {
    const token = req.nextUrl.searchParams.get("token");
    if (!token) return httpError("Missing token", 400);

    const resumeId = await verifyResumeToken(token);
    if (!resumeId) return httpError("Invalid token", 401);

    const resumeMeta = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { template: true },
    });
    if (!resumeMeta) return httpError("Resume template not found", 404);

    const browser = await getBrowser();
    page = await browser.newPage();

    // Interception: block analytics/media only (fonts allowed)
    await page.setRequestInterception(true);
    attachRequestInterception(page);

    // Viewport + print CSS early
    await page.setViewport(A4_VIEWPORT);
    await injectPrintStyles(page, resumeMeta.template);

    // 1) Build alias faces once
    const aliasCss = await buildAliasFontCSS();

    // 2) Inject faces early (available from first paint)
    await page.evaluateOnNewDocument((cssText) => {
      const style = document.createElement("style");
      style.textContent = cssText;
      document.head.appendChild(style);
    }, aliasCss);

    const previewUrl = buildPreviewUrl(req.nextUrl.origin, token);
    await gotoStable(page, previewUrl);

    // Guard: auth redirect?
    if (page.url().includes("/sign-in")) return httpError("Unauthorized", 401);

    // 3) Remove clashing URL-based faces (often 404) then re-inject aliases LAST to win cascade
    await stripUrlFontFaces(page);
    await page.addStyleTag({ content: aliasCss });

    // 4) Wait for fonts once more (post-injection)
    await page.evaluate(async () => {
      const fonts = (document as any).fonts;
      if (fonts?.ready) await fonts.ready;
    });

    // Quick guard: avoid blank PDFs
    const shouldRender = await page.evaluate(() => {
      const hasData = !!document.querySelector(".data-container")?.textContent?.trim();
      const isEmpty = !!document.querySelector(".empty-state");
      return hasData || !isEmpty;
    });
    if (!shouldRender) return new Response(null, { status: 204 });

    // Zero margins for graphics-heavy templates
    if (["classic-resume-rich", "blue-creative-resume", "mordern-sidebar-resume"].includes(resumeMeta.template)) {
      await enforceZeroBodyMargins(page);
    }

    // FINAL: generate PDF
    const pdf = await page.pdf({
      // rely on @page size; A4 exact, backgrounds on, margins zero
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      displayHeaderFooter: false,
      timeout: PDF_TIMEOUT_MS,
      // format: "A4", // optional when @page specifies size
    });

    return new Response(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=resume_${resumeId}.pdf`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("❌ Error generating resume PDF:", err);
    return httpError("Failed to generate PDF", 500);
  } finally {
    try { if (page) await page.close(); } catch { /* ignore */ }
  }
}
