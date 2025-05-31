import prisma from "@/lib/prisma";

export async function getAffiliateStats(userId: string) {
  const user = await prisma.user.findUnique({
    where: { userId },
    select: {
      referralCode: true,
    }
  });

  if (!user) return null;

  const code = user.referralCode;

  const [signups, purchases,  earnings] = await Promise.all([
    prisma.user.count({ where: { referredByCode: code } }),
    prisma.payment.count({ where: { referralCode: code,} }),
    prisma.payment.aggregate({ where: { referralCode: code }, _sum: { amountPaid: true } })
  ]);

  return {
    code,
    purchases,
    signups,
    earnings: earnings._sum.amountPaid ? (earnings._sum.amountPaid/100) * 0.4 : 0
  };
}
