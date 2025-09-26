// launcher.ts (import this from your route)
import chromium from "@sparticuz/chromium";
import puppeteer, { Browser } from "puppeteer-core";
import fs from "node:fs";

let browserPromise: Promise<Browser> | null = null;

function exists(p: string) {
  try { fs.accessSync(p); return true; } catch { return false; }
}

function guessWindowsChrome(): string | undefined {
  const candidates = [
    // Google Chrome
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    // Microsoft Edge (Chromium, also works with Puppeteer)
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ];
  for (const p of candidates) if (exists(p)) return p;
  return process.env.CHROMIUM_PATH; // allow explicit override
}

async function resolveExecutablePath() {
  if (process.platform === "win32") {
    const p = guessWindowsChrome();
    if (!p) {
      throw new Error(
        "Chromium/Chrome not found on Windows. Install Chrome/Edge or set CHROMIUM_PATH to the browser executable."
      );
    }
    return p;
  }

  // Non-Windows (e.g., Vercel/Linux): use Sparticuz
  const p = await chromium.executablePath();
  if (!p) throw new Error("chromium.executablePath() returned empty path");
  return p;
}

export async function getBrowser(): Promise<Browser> {
  if (!browserPromise) {
    const executablePath = await resolveExecutablePath();
    browserPromise = puppeteer.launch({
      executablePath,
      headless: chromium.headless,
      args: [
        ...chromium.args,
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });
  }
  return browserPromise;
}
