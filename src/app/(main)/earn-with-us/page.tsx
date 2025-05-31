// app/earn-with-us/page.tsx
import { JoinAffiliateButton } from '@/components/ui/JoinAffiliateButton';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export default async function AffiliateProgram() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Earn Money by Sharing What You Love
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Join our affiliate program and earn competitive commissions for every customer you refer.
        </p>
        <div className="mt-10">
          <JoinProgramButton />
        </div>
      </section>

      {/* Value Proposition */}
      <section className="mb-20">
        <div className="grid md:grid-cols-3 gap-8 text-black">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">High Commissions</h3>
            <p className="text-gray-500">
              Earn up to 40% on every sale you generate. The more you refer, the more you earn.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
            <p className="text-gray-500">
              Get your unique link in seconds and start sharing immediately.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">Real-Time Tracking</h3>
            <p className="text-gray-500">
              Our dashboard shows your sign-ups, purchases, and earnings in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Affiliates Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-600 italic mb-4">
              &quot;I&apos;ve been with the program for 6 months and it&apos;s become a significant part of my income. The dashboard makes tracking everything so simple!&quot;
            </p>
            <p className="font-medium">- Sarah K., Top Affiliate</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-600 italic mb-4">
              &quot;The commission rates are the best I&apos;ve found, and the support team is always helpful when I have questions about optimizing my referrals.&quot;
            </p>
            <p className="font-medium">- Michael T., Content Creator</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-6 py-3 rounded-full">
            <span className="text-blue-600 font-medium">R250,000+</span>
            <span className="text-gray-600">earned by affiliates last year</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
            <p className="text-gray-600">
              Join the program in just a few clicks - no complicated forms.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Your Link</h3>
            <p className="text-gray-600">
              Copy your unique affiliate link from your dashboard.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Start Earning</h3>
            <p className="text-gray-600">
              Share your link and earn commissions on every sale.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 rounded-2xl p-12 text-center text-black">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Earning?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Join thousands of affiliates who are already earning with us. It&apos;s free to join and takes less than 2 minutes.
        </p>
        <JoinProgramButton />
      </section>
    </div>
  );
}

async function JoinProgramButton() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { userId },
    select: { affiliate: true },
  });

  return (
    
    <JoinAffiliateButton isAffiliate={!!user?.affiliate} />
  );
}