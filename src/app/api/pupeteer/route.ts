import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(
      "https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar",
    ),
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  const cookieStore = await cookies();
  const allCookieEntries = cookieStore.getAll();

  const clerkCookieEntries = allCookieEntries.filter(
    ({ name }) =>
      name.startsWith("__session") ||
      name.startsWith("__client_uat") ||
      name.startsWith("__clerk_db_jwt") ||
      name.startsWith("__client"),
  );

  for (const { name, value } of clerkCookieEntries) {
    await page.setCookie({
      name,
      value,
      domain:
        process.env.NODE_ENV === "production" ? "eonresume.co.za" : "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  let resumeId: string | undefined;
  try {
    const body = await req.json();
    resumeId = body.resumeId;
  } catch {}

  const origin = req.nextUrl.origin;
  const previewUrl = `${origin}/preview-for-download?resumeId=${resumeId}`;

  await page.goto(previewUrl, { waitUntil: "networkidle0" });

  // 🔐 Check if we landed on the sign-in page (Clerk)
  if (page.url().includes("/sign-in")) {
    console.warn("⚠️ Not authenticated — attempting login via Clerk UI.");

    console.log("putting in the email");
    await page.type("#identifier-field", process.env.CLERK_EMAIL!);
    console.log("Submitting email");
    await page.click("button.cl-formButtonPrimary");

    // await page.waitForTimeout(1500)

    console.log("Inserting password");
    await page.type('input[type="password"]', process.env.CLERK_PASSWORD!);
    console.log("Clicking the submit button");

    // const screenshotBuffer = await page.screenshot({ fullPage: true });

    // return new Response(screenshotBuffer, {
    //   status: 200,
    //   headers: {
    //     "Content-Type": "image/png",
    //     "Content-Disposition": 'inline; filename="debug-screenshot.png"',
    //   },
    // });

    // Wait until the button is present and visible
    await page.waitForSelector(
      'button[data-localization-key="formButtonPrimary"]',
      { visible: true },
    );

    // Scroll into view and click
    await page.evaluate(() => {
      const btn = document.querySelector(
        'button[data-localization-key="formButtonPrimary"]',
      );
      if (btn) {
        btn.scrollIntoView({ behavior: "auto", block: "center" });
      }
    });

    // Click the button using Puppeteer
    await page.screenshot({ path: "before-click.png" });
    await page.click('button[data-localization-key="formButtonPrimary"]');
    await page.screenshot({ path: "after-click.png" });

    await page.waitForNavigation({ waitUntil: "networkidle0" });

    // Retry navigating to the preview page
    await page.goto(previewUrl, { waitUntil: "networkidle0", timeout: 6000 });
  }

  await page.emulateMediaType("screen");

  const idList = ["resumePreviewContent"];
  await page.evaluate((ids) => {
    ids.forEach((id: string) => {
      const el = document.getElementById(id);
      if (el) el.style.padding = "0px";
    });
  }, idList);

  const pdfBuffer = await page.pdf({
    format: "a4",
    printBackground: true,
    margin: { top: "5mm", bottom: "5mm", left: "5mm", right: "5mm" },
  });

  await browser.close();

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=resume_${resumeId}.pdf`,
    },
  });
}
