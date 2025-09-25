// app/api/print/route.ts
import chromium from "@sparticuz/chromium";
import puppeteer, { Browser } from "puppeteer-core";

export const runtime = "nodejs";
export const maxDuration = 60;

let browserPromise: Promise<Browser> | null = null;

export async function getBrowser(): Promise<Browser> {
  if (!browserPromise) {
    const executablePath = await chromium.executablePath(); // <-- no remote URL
    browserPromise = puppeteer.launch({
      args: [
        ...chromium.args,
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
      executablePath,
      headless: chromium.headless,
    });
  }
  return browserPromise;
}
