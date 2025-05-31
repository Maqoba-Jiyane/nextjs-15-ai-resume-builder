// app/actions/affiliate.ts
'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';

export async function joinAffiliateProgram() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized: No user ID found');
  }

  // Check if the user is already an affiliate
  const alreadyAffiliate = await prisma.user.findUnique({
    where: { userId },
    select: { affiliate: true, referralCode: true },
  });

  if (!alreadyAffiliate) {
    throw new Error('User not found');
  }

  let referralCode = alreadyAffiliate.referralCode;

  if (!referralCode) {
    referralCode = uuidv4(); // or your custom logic for referral code
  }

  if (alreadyAffiliate.affiliate) {
    return { success: true, message: 'Already an affiliate' };
  }

  // Update user to become an affiliate
  await prisma.user.update({
    where: { userId },
    data: { affiliate: true, referralCode },
  });

  return { success: true, message: 'Joined affiliate program' };
}
