// app/api/puppeteer/route.ts
import type { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyResumeToken } from "@/lib/server/jwt";
import { getBrowser } from "@/lib/launcher";
import type { Page } from "puppeteer-core";

export const runtime = "nodejs";
export const maxDuration = 60;

async function enforceZeroBodyMargins(page: Page): Promise<void> {
  // 1) Make sure we’re using PRINT CSS rules (pdf() is print by default; don’t force screen)
  await page.emulateMediaType("print");

  // 2) Inline !important on html/body (beats any stylesheet)
  await page.evaluate(() => {
    const set = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.setProperty("margin", "0", "important");
      // el.style.setProperty("padding", "0", "important");
      // el.style.setProperty("background", "#fff", "important");
    };
    set(document.documentElement);
    set(document.body);
  });

  // 3) Last-in-cascade style tag (also hits common wrappers)
  await page.addStyleTag({
    content: `
      @page { size: 210mm 297mm; margin: 0; }

    `,
  });

  // 4) If your app renders inside an iframe, apply the same rules to all frames
  for (const frame of page.frames()) {
    try {
      await frame.evaluate(() => {
        const set = (el: HTMLElement | null) => {
          if (!el) return;
          el.style.setProperty("margin", "0", "important");
          // el.style.setProperty("padding", "0", "important");
          // el.style.setProperty("background", "#fff", "important");
        };
        set(document.documentElement);
        set(document.body);

        // Add a style tag inside the frame, last-in-cascade
        const style = document.createElement("style");
        style.textContent = `
          @page { margin: 0; }

        `;
        document.head.appendChild(style);
      });
    } catch {
      // ignore cross-origin frames
    }
  }
}


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
      const fonts = (
        document as unknown as { fonts?: { ready?: Promise<void> } }
      ).fonts;
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

    if (type === "media") return req.abort();
    if (
      /\b(googletagmanager|google-analytics|gtag|segment|mixpanel|clarity)\b/i.test(
        url,
      )
    ) {
      return req.abort();
    }
    return req.continue();
  });
}

/** Injects print CSS & disables dark mode early. */ async function injectPrintStyles(
  page: Page,
  templateId: string,
): Promise<void> {
  await page.evaluateOnNewDocument((tpl: string) => {
    document.documentElement.classList.remove("dark");
    document.documentElement.setAttribute("data-theme", "light");

    const tightSelectors = [
      "#resumePreviewContent",
      "#resumePreviewContent > header",
      "#resumePreviewContent > main",
      "#resumePreviewContent > aside",
      // common wrappers used in templates:
      "#resumePreviewContent .px-10",
      "#resumePreviewContent .pt-10",
      "#resumePreviewContent .p-10",
      "#resumePreviewContent .p-8",
    ];

    // Per-template extra selectors (add as needed)
    const perTemplate: Record<string, string[]> = {
      "classic-resume-rich": ["#aside", "#main"],
      "blue-creative": ["#resumePreviewContent .grid"], // your grid with px-10/pt-10
      "black-modern-professional": [],
    };

    const extra = perTemplate[tpl] ?? [];

    const css = `
      @page { size: 210mm 297mm; margin: 0; } /* A4 exact */
html, body { margin:0 !important; padding:0 !important; background:#fff !important; }
*,*::before,*::after { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

      /* remove outer paddings for the PDF surface */
      ${[...tightSelectors, ...extra]
        .map((sel) => `${sel}{ padding:0 !important; }`)
        .join("\n")}
      /* make SVG bands tight (no anti-alias gaps) */
      #resumePreviewContent svg { display:block; }
    `;

    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }, templateId);

  await page.emulateMediaType("print");
  await page.emulateMediaFeatures([
    { name: "prefers-color-scheme", value: "light" },
  ]);
}

/** Basic, consistent 4xx/5xx responses */
function httpError(message: string, status: number): Response {
  return new Response(message, {
    status,
    headers: { "Content-Type": "text/plain" },
  });
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

    const spacing = await page.evaluate(() => {
      const el = document.querySelector('#resumePreviewContent') as HTMLElement | null;
      const cs = el ? getComputedStyle(el) : null;
      const body = getComputedStyle(document.body);
      return {
        bodyMargin: body.margin,
        bodyPadding: body.padding,
        elMargin: cs?.margin,
        elPadding: cs?.padding,
        w: el?.offsetWidth,
        h: el?.offsetHeight,
      };
    });
    console.log(spacing);
    

    // Allow styles & fonts, block only heavy/analytics
    await page.setRequestInterception(true);
    attachRequestInterception(page);

    await page.setViewport(A4_VIEWPORT);
    await injectPrintStyles(page, resumeMeta.template);

    const previewUrl = buildPreviewUrl(req.nextUrl.origin, token);
    await gotoStable(page, previewUrl);

    // If your preview enforces auth by redirecting, fail fast.
    if (page.url().includes("/sign-in")) return httpError("Unauthorized", 401);

    // Quick guard: avoid blank PDFs
    const shouldRender = await page.evaluate(() => {
      const hasData = !!document
        .querySelector(".data-container")
        ?.textContent?.trim();
      const isEmpty = !!document.querySelector(".empty-state");
      return hasData || !isEmpty;
    });
    if (!shouldRender) return new Response(null, { status: 204 });

    if(["classic-resume-rich", "blue-creative-resume"].includes(resumeMeta.template)){    
      await enforceZeroBodyMargins(page);
    }

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }, // new
      displayHeaderFooter: false, // explicit
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
