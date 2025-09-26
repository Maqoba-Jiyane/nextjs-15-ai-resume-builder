// app/api/puppeteer/route.ts
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyResumeToken } from "@/lib/server/jwt";
import { getBrowser } from "@/lib/launcher";
import type { Page } from "puppeteer-core";

export const runtime = "nodejs";
export const maxDuration = 60;

// A4 @ ~96dpi
const A4_VIEWPORT = { width: 794, height: 1123, deviceScaleFactor: 2 } as const;
const NAV_TIMEOUT_MS = 30_000;
const PDF_TIMEOUT_MS = 30_000;

/** Navigate & wait for CSS + webfonts to be ready (stable snapshot). */
async function gotoStable(page: Page, url: string): Promise<void> {
  await page.goto(url, { waitUntil: "networkidle0", timeout: NAV_TIMEOUT_MS });

  // Wait for webfonts if present
  try {
    await page.evaluate(async () => {
      const fonts = (document as unknown as { fonts?: { ready?: Promise<void> } }).fonts;
      if (fonts?.ready) await fonts.ready;
    });
  } catch {
    /* non-fatal */
  }
}

/** Build the preview URL once (keeps encoding consistent). */
function buildPreviewUrl(origin: string, token: string): string {
  return `${origin}/preview-for-download?token=${encodeURIComponent(token)}`;
}

/** Minimal 3p/asset filtering: keep fonts & styles, block heavy/analytics. */
function attachRequestInterception(page: Page): void {
  page.on("request", (req) => {
    const type = req.resourceType();
    const url = req.url();

    if (type === "image" || type === "media") return req.abort();
    if (/\b(googletagmanager|google-analytics|gtag|segment|mixpanel|clarity)\b/i.test(url)) {
      return req.abort();
    }
    return req.continue();
  });
}

/** Injects print CSS & disables dark mode early. */
async function injectPrintStyles(page: Page, isClassicRich: boolean): Promise<void> {
  await page.evaluateOnNewDocument((classic: boolean) => {
    // Force light theme
    document.documentElement.classList.remove("dark");
    document.documentElement.setAttribute("data-theme", "light");

    const css = `
      @page { size: A4; margin: 0; }
      :root { color-scheme: light; }
      html, body { margin: 0; padding: 0; background: #fff !important; }
      ${!classic ? "#resumePreviewContent{padding:0!important;}" : ""}
      ${classic ? "#aside{padding-bottom:0!important;} #main{padding-bottom:0!important;}" : ""}
    `;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }, isClassicRich);

  // Prefer screen CSS rules; keep print backgrounds
  await page.emulateMediaType("screen");
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);
}

/** Basic, consistent 4xx/5xx responses */
function httpError(message: string, status: number): Response {
  return new Response(message, { status, headers: { "Content-Type": "text/plain" } });
}

export async function POST(req: NextRequest): Promise<Response> {
  let page: Page | null = null;

  try {
    const token = req.nextUrl.searchParams.get("token");
    if (!token) return httpError("Missing token", 400);

    const resumeId = await verifyResumeToken(token); // throws if invalid/expired
    if (!resumeId) return httpError("Invalid token", 401);

    const resumeMeta = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { template: true },
    });
    if (!resumeMeta) return httpError("Resume template not found", 404);

    const browser = await getBrowser();
    page = await browser.newPage();

    // Allow styles & fonts, block only heavy/analytics
    await page.setRequestInterception(true);
    attachRequestInterception(page);

    await page.setViewport(A4_VIEWPORT);
    await injectPrintStyles(page, resumeMeta.template === "classic-resume-rich");

    const previewUrl = buildPreviewUrl(req.nextUrl.origin, token);
    await gotoStable(page, previewUrl);

    // If your preview enforces auth by redirecting, fail fast.
    if (page.url().includes("/sign-in")) return httpError("Unauthorized", 401);

    // Quick guard: avoid blank PDFs
    const shouldRender = await page.evaluate(() => {
      const hasData = !!document.querySelector(".data-container")?.textContent?.trim();
      const isEmpty = !!document.querySelector(".empty-state");
      return hasData || !isEmpty;
    });
    if (!shouldRender) return new Response(null, { status: 204 });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      timeout: PDF_TIMEOUT_MS,
    });

    return new Response(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=resume_${resumeId}.pdf`,
        // Set caching to taste; "no-store" is safe, hash-by-content is better
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    // If your launcher keeps a singleton and Chrome crashes,
    // consider resetting it there so the next request relaunches cleanly.
    console.error("❌ Error generating resume PDF:", err);
    return httpError("Failed to generate PDF", 500);
  } finally {
    try {
      if (page) await page.close();
    } catch {
      /* ignore */
    }
  }
}
