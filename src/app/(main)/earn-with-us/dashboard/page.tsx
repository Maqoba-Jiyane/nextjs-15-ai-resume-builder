import { getAffiliateStats } from "@/lib/analytics";
import { auth } from "@clerk/nextjs/server";
import { AffiliateStats } from "@/components/ui/AffiliateStats";

export default async function AffiliateDashboard() {
  const { userId } = await auth();
  if (!userId) return null;

  const stats = await getAffiliateStats(userId);

  if (!stats) {
    return (
      <div className="px-4 py-8 text-center sm:px-6 md:px-8">
        <h2 className="text-xl font-semibold mb-2 sm:text-2xl">Welcome!</h2>
        <p className="text-gray-700 text-sm sm:text-base">
          You&apos;re not part of the affiliate program yet — but it&apos;s never too late to start!
        </p>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          Share your passion, help others discover us, and earn while doing it. 🚀
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 sm:px-6 md:px-8 max-w-4xl mx-auto max-w-screen w-full">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-primary">
        Welcome back, Partner 🌟
      </h1>
      <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
        Here&apos;s how your impact is growing — keep up the amazing work!
      </p>
      <AffiliateStats {...stats} />
    </div>
  );
}
