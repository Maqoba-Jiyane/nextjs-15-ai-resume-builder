// app/api/print-url/route.ts
import "server-only";
import { NextRequest } from "next/server";
import { signResumeToken } from "@/lib/server/jwt";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const resumeId = req.nextUrl.searchParams.get("resumeId");
  console.log(resumeId)
  if (!resumeId) return new Response("Missing resumeId", { status: 400 });

  // (Optional) authorize that the current user owns this resumeId

  const token = await signResumeToken(resumeId, "5m");
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? req.nextUrl.origin;
  const url = `${base}/api/pupeteer?token=${encodeURIComponent(token)}`;
  console.log(url)

  return Response.json({ url });
}
