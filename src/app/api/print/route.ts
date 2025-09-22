// app/api/print/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { signPrintToken } from "@/lib/print-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function absoluteUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type Body =
  | { resumeId: string; fileName?: string; media?: "screen" | "print" }
  | { url: string; fileName?: string; media?: "screen" | "print" }
  | { html: string; baseUrl?: string; fileName?: string; media?: "screen" | "print" };

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    // Fast path: DOM HTML passthrough still supported
    if ("html" in body) {
      const r = await fetch(`${process.env.PDF_SERVICE_URL}/pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-PDF-Key": process.env.PDF_KEY! },
        body: JSON.stringify(body),
      });
      if (!r.ok) return NextResponse.json({ error: await r.text() }, { status: 502 });
      return new NextResponse(r.body, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${body.fileName || "resume.pdf"}"`,
          "Cache-Control": "no-store",
        },
      });
    }

    // Signed URL path (recommended)
    if ("resumeId" in body) {
      const { userId } = await auth();
      if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

      // Ownership check
      const exists = await prisma.resume.findFirst({ where: { id: body.resumeId, userId } });
      if (!exists) return NextResponse.json({ error: "Resume not found" }, { status: 404 });

      const token = await signPrintToken(body.resumeId, 10); // 10 minutes
      const url = absoluteUrl(`/preview/print?token=${token}`);
      console.log(url)
      console.log(body.fileName)
      console.log(body.media)

      const r = await fetch(`${process.env.PDF_SERVICE_URL}/pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-PDF-Key": process.env.PDF_KEY! },
        body: JSON.stringify({
          url,
          fileName: body.fileName ?? `resume-${body.resumeId}.pdf`,
          media: body.media ?? "screen",
          waitForSelector: "#resume-root", // 👈 tell the PDF service to wait
        }),
      });

      if (!r.ok) return NextResponse.json({ error: await r.text() }, { status: 502 });

      return new NextResponse(r.body, {
        headers: {
          "Content-Type": r.headers.get("Content-Type") || "application/pdf",
          "Content-Disposition":
            r.headers.get("Content-Disposition") || `attachment; filename="resume-${body.resumeId}.pdf"`,
          "Cache-Control": "no-store",
        },
      });
    }

    // Fallback: raw URL passthrough (if you already host a public print page)
    const r = await fetch(`${process.env.PDF_SERVICE_URL}/pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-PDF-Key": process.env.PDF_KEY! },
      body: JSON.stringify(body),
    });
    if (!r.ok) return NextResponse.json({ error: await r.text() }, { status: 502 });

    return new NextResponse(r.body, {
      headers: {
        "Content-Type": r.headers.get("Content-Type") || "application/pdf",
        "Content-Disposition": r.headers.get("Content-Disposition") || 'attachment; filename="resume.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    if( e instanceof Error){
      return NextResponse.json({ error: e?.message ?? "Print failed" }, { status: 500 });
    }

    console.log(e)
  }
}
