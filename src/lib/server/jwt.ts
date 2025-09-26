// src/lib/server/jwt.ts
import "server-only";
import { SignJWT, jwtVerify } from "jose";

const ALG = "HS256";

function getSecretBytes(): Uint8Array {
  const s = process.env.PRINT_JWT_SECRET;
  if (!s) throw new Error("PRINT_JWT_SECRET is not set");
  // If your secret is base64 (your example looks base64), decode it; else treat as UTF-8.
  const looksBase64 = /^[A-Za-z0-9+/=]+$/.test(s) && s.length % 4 === 0;
  return looksBase64 ? Buffer.from(s, "base64") : new TextEncoder().encode(s);
}

const secret = getSecretBytes();

export async function signResumeToken(resumeId: string, expiresIn = "5m") {
  return await new SignJWT({ rid: resumeId })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .setIssuer("eonresume")
    .setAudience("print")
    .sign(secret);
}

export async function verifyResumeToken(token: string) {
  const { payload } = await jwtVerify(token, secret, {
    issuer: "eonresume",
    audience: "print",
  });
  if (typeof payload.rid !== "string") throw new Error("Invalid payload");
  return payload.rid;
}
