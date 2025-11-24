import prisma from "@/lib/prisma";

export async function getAffiliateStats(userId: string) {
  const user = await prisma.user.findUnique({
    where: { userId },
    select: {
      affiliate: true,
    },
  });

  if (!user) return null;

  const code = user.affiliate?.code;

  const stats = await prisma.affiliate.findUnique({
    where: { userId },
  });

  if(!stats) return;

  return {
    code,
    clicks: stats?.totalClicks,
    purchases: stats?.totalPurchases,
    signups: stats?.totalSignups,
    earnings: stats?.totalCommission,
  };
}
