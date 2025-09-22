// lib/print-token.ts
import { SignJWT, jwtVerify } from "jose";

const alg = "HS256";
const enc = new TextEncoder();
const key = enc.encode(process.env.PRINT_TOKEN_SECRET || "");

export async function signPrintToken(resumeId: string, ttlMinutes = 10) {
  if (!process.env.PRINT_TOKEN_SECRET) throw new Error("PRINT_TOKEN_SECRET not set");
  const exp = Math.floor(Date.now() / 1000) + ttlMinutes * 60;
  return await new SignJWT({ resumeId })
    .setProtectedHeader({ alg })
    .setExpirationTime(exp)
    .sign(key);
}

export async function verifyPrintToken(token: string) {
  if (!process.env.PRINT_TOKEN_SECRET) throw new Error("PRINT_TOKEN_SECRET not set");
  const { payload } = await jwtVerify(token, key, { algorithms: [alg] });
  if (!payload || typeof payload.resumeId !== "string") throw new Error("Invalid token");
  return payload as { resumeId: string; exp: number };
}
