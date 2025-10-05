// lib/billing.ts
import prisma from "./prisma";

export type Plan = "FREE" | "PREMIUM";

export const LIMITS = {
  FREE: { resumes: 1 },
  PREMIUM: { resumes: 999 }, // or whatever
};

export async function getUserPlan(userId: string): Promise<Plan> {
  
    const plan = await prisma.user.findUnique({where: {userId}, select: {plan: true}})
  return (plan?.plan as Plan) || "free";
}

export function canCreateResume(currentCount: number, plan: Plan) {
  return currentCount < LIMITS[plan].resumes;
}
