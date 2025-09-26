// lib/print-url.ts

import { signResumeToken } from "./server/jwt";


export async function getSignedPrintUrl(resumeId: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL!; // e.g. https://eonresume.co.za or http://localhost:3000
  const token = await signResumeToken(resumeId);
  return `${base}/api/print?token=${encodeURIComponent(token)}`;
}
