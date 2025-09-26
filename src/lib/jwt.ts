// lib/jwt.ts
import { SignJWT, jwtVerify } from "jose";

function getSecretBytes(): Uint8Array {
  const s = process.env.PRINT_JWT_SECRET;
  if (!s) throw new Error("PRINT_JWT_SECRET is not set");
  // If you stored base64, decode it; otherwise use raw text.
  const isBase64 = /^[A-Za-z0-9+/=]+$/.test(s) && s.length % 4 === 0;
  return isBase64 ? Buffer.from(s, "base64") : new TextEncoder().encode(s);
}
const secret = getSecretBytes();

export async function signResumeToken(resumeId: string, expiresIn = "5m") {
  return await new SignJWT({ rid: resumeId })
    .setProtectedHeader({ alg: "HS256" })
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
