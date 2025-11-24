"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

const affiliateSchema = z.object({
  bank: z.string(),
  payshapId: z.string(),
  acceptedTerms: z.literal(true)
});

function generateAffiliateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "EON-";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export async function createOrUpdateAffiliate(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  // 1. Validate form data
  const parsed = affiliateSchema.parse({
    bank: formData.get("bank"),
    payshapId: formData.get("payshapId"),
    acceptedTerms: formData.get("acceptedTerms") === "on",
  });

  // 2. Ensure User row exists
  let user = await prisma.user.findUnique({
    where: { userId },
  });

  if (!user) {
    const cu = await currentUser()

    const email = cu?.primaryEmailAddress?.emailAddress;
    // const fullName = cu.firstName && cu.lastName
    //   ? `${cu.firstName} ${cu.lastName}`
    //   : cu.fullName ?? undefined;

    user = await prisma.user.create({
      data: {
        userId,
        email,
        firstName: cu?.firstName ?? undefined,
        lastName: cu?.lastName ?? undefined,
        image: cu?.imageUrl ?? undefined,
      },
    });
  }

  // 3. If affiliate exists, update instead
  const existing = await prisma.affiliate.findUnique({
    where: { userId: user.userId },
  });

  if (existing) {
    return await prisma.affiliate.update({
      where: { userId: user.userId },
      data: {
        bank: parsed.bank,
        payshapId: parsed.payshapId,
      },
    });
  }

  // 4. Otherwise, create a new affiliate entry
  let code = generateAffiliateCode();
  while (await prisma.affiliate.findUnique({ where: { code } })) {
    code = generateAffiliateCode(); // collision safety
  }

  return await prisma.affiliate.create({
    data: {
      userId: user.userId,
      code,
      bank: parsed.bank,
      payshapId: parsed.payshapId,
    },
  });
}
