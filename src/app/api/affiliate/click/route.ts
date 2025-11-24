// app/api/affiliate/click/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid code" },
        { status: 400 },
      );
    }

    // Increment totalClicks for the affiliate with this code
    await prisma.affiliate.update({
      where: { code },
      data: {
        totalClicks: { increment: 1 },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    // If the code doesn't match any affiliate, we can just no-op
    // so that bad / old links don't break the page.
    console.error("Affiliate click tracking error:", err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
