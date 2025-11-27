// src/app/earn-with-us/AffiliateSignupSection.tsx
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Link from "next/link";
import AffiliateButton from "@/components/AffiliateButton";

export default async function AffiliateSignupSection() {
  const { userId } = await auth();

  if (!userId) {
    // Not signed in – you can also show a CTA to log in
    return (
      <div className="mt-8 rounded-2xl border border-slate-800/70 bg-slate-950/80 p-6 text-sm text-slate-200">
        <p className="font-medium text-slate-100">
          Sign in to join the affiliate program
        </p>
        <p className="mt-2 text-xs text-slate-400">
          You&apos;ll need an Eon Resume account to generate your affiliate
          link, track clicks, and see your earnings.
        </p>
        <Link
          href="/sign-in?redirect_url=/earn-with-us"
          className="mt-4 inline-flex rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_18px_rgba(56,189,248,0.6)] hover:bg-sky-600"
        >
          Sign in / Create account
        </Link>
      </div>
    );
  }

  // Ensure the internal User record exists (same idea as server action)
  const user = await prisma.user.findUnique({
    where: { userId },
    include: { affiliate: true },
  });

  // if (!user) {
  //   const cu = await currentUser();

  //   const email = cu?.primaryEmailAddress?.emailAddress;
  //   user = await prisma.user.create({
  //     data: {
  //       userId,
  //       email,
  //       firstName: cu?.firstName ?? undefined,
  //       lastName: cu?.lastName ?? undefined,
  //       image: cu?.imageUrl ?? undefined,
  //     },
  //     include: { affiliate: true },
  //   });
  // }

  const [affiliate] =await Promise.all([
    prisma.affiliate.findFirst({
      where: { userId },
      select: { code: true },
    }),
  ]);

  return (
    <div>
      <AffiliateButton
        isAffiliate={affiliate ? true : false}
        affiliate={user?.affiliate || null}
      />
    </div>
  );
}
