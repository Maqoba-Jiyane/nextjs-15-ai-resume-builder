import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  let browser = null;

  try {
    const { resumeId } = await req.json();

    if (!resumeId) {
      return new Response("Missing resumeId", { status: 400 });
    }

    const template = await prisma.resume.findUnique({
      where: {id: resumeId},
      select: {template: true}
    })

    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar"
      ),
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Add Clerk cookies for session
    const cookieStore = await cookies();
    const clerkCookies = cookieStore
      .getAll()
      .filter(({ name }) =>
        ["__session", "__client_uat", "__clerk_db_jwt", "__client"].some((prefix) =>
          name.startsWith(prefix)
        )
      );

    for (const { name, value } of clerkCookies) {
      await page.setCookie({
        name,
        value,
        domain: process.env.NODE_ENV === "production" ? "eonresume.co.za" : "localhost",
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
      });
    }

    const origin = req.nextUrl.origin;
    const previewUrl = `${origin}/preview-for-download?resumeId=${resumeId}`;

    await page.goto(previewUrl, { waitUntil: "networkidle0" });

    // 🔐 If redirected to Clerk sign-in page, simulate login
    if (page.url().includes("/sign-in")) {
      console.warn("⚠️ Not authenticated — attempting login via Clerk UI");

      await page.waitForSelector("#identifier-field", { visible: true });
      await page.type("#identifier-field", process.env.CLERK_EMAIL!, { delay: 50 });

      await page.click('button.cl-formButtonPrimary');

      await page.waitForSelector('input[type="password"]', { visible: true });
      await page.type('input[type="password"]', process.env.CLERK_PASSWORD!, { delay: 50 });

      await page.waitForSelector('button[data-localization-key="formButtonPrimary"]', {
        visible: true,
      });

      // Scroll and click the "Continue" button
      await page.evaluate(() => {
        const btn = document.querySelector('button[data-localization-key="formButtonPrimary"]');
        if (btn) btn.scrollIntoView({ behavior: "auto", block: "center" });
      });

      await page.click('button[data-localization-key="formButtonPrimary"]');

      // Wait for navigation to complete after login
      await page.waitForNavigation({ waitUntil: "networkidle0", timeout: 10000 });

      // Navigate again to resume preview
      await page.goto(previewUrl, { waitUntil: "networkidle0", timeout: 10000 });
    }

    await page.emulateMediaType("screen");

    if (!template) {
      return new Response("Resume template not found", { status: 404 });
    }

    // Remove padding on the PDF container
    if (template.template !== 'classic-resume-rich') {
      await page.evaluate(() => {
        const el = document.getElementById("resumePreviewContent");
        if (el) el.style.padding = "0px";
      });
    }else{
      const styleUpdates = {
          "aside": { paddingBottom: "0px" },
          "main": { padding: "0px" }
      };
  
      await page.evaluate((updates) => {
          for (const [id, styles] of Object.entries(updates)) {
              const el = document.getElementById(id);
              if (el) Object.assign(el.style, styles);
          }
      }, styleUpdates);
  }

    const margin = template.template !== 'classic-resume-rich' ? { top: "5mm", bottom: "5mm", left: "5mm", right: "5mm" } : {}

    const pdfBuffer = await page.pdf({
      format: "a4",
      printBackground: true,
      margin,
    });

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=resume_${resumeId}.pdf`,
      },
    });
  } catch (error) {
    console.error("❌ Error generating resume PDF:", error);
    return new Response("Failed to generate PDF", { status: 500 });
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (err) {
        console.warn("⚠️ Failed to close browser:", err);
      }
    }
  }
}
