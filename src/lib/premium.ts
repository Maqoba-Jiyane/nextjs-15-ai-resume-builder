// lib/premium.ts
import prisma from "@/lib/prisma";

export async function getEntitlements(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, premiumUntil: true },
  });
  if (!user) return { plan: "FREE" as const, premium: false, premiumUntil: null };

  const now = new Date();
  const premium = !!user.premiumUntil && user.premiumUntil > now;

  // Lazy downgrade if expired
  if (!premium && user.plan === "PREMIUM") {
    await prisma.user.update({
      where: { id: userId },
      data: { plan: "FREE", premiumUntil: null },
    });
    return { plan: "FREE" as const, premium: false, premiumUntil: null };
  }

  return {
    plan: premium ? ("PREMIUM" as const) : ("FREE" as const),
    premium,
    premiumUntil: user.premiumUntil,
  };
}
