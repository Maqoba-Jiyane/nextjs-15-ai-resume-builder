import {  NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const cookieStore = cookies();
  const refCookie = (await cookieStore).get("refCode");
  console.log("refCookiessss: ", userId)

  // If no referral cookie, nothing to do
  if (!refCookie?.value) {
    return NextResponse.json({ ok: true, message: "No referral cookie" });
  }

  const code = decodeURIComponent(refCookie.value);

  try {
    await prisma.$transaction(async (tx) => {
      // 1) Increment affiliate totalSignups
      await tx.affiliate.update({
        where: { code },
        data: {
          totalSignups: { increment: 1 },
        },
      });

      // 2) Optionally store attribution on the user
      // e.g. user.referredByCode = affiliate.code or just store code in some field
      await tx.user.update({
        where: { userId },
        data: {
          referredByCode: code, // adjust if you use a different field
        },
      });
    });

    // 3) Delete the cookie
    const res = NextResponse.json({ ok: true });
    res.cookies.set("affiliate_ref", "", {
      maxAge: 0,
      path: "/",
    });
    return res;
  } catch (err) {
    console.error("Affiliate consume-ref error:", err);
    // Even if affiliate not found, we just clear cookie to avoid loops
    const res = NextResponse.json({ ok: false });
    res.cookies.set("affiliate_ref", "", {
      maxAge: 0,
      path: "/",
    });
    return res;
  }
}
