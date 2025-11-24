
import AffiliateSignupSection from "./AffiliateSignupSection";

export default async function AffiliateProgram() {
  return (
    <div className="w-full border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12 space-y-16">
        {/* Page header */}
        <section className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Affiliate program
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Earn with Eon Resume
              </h1>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Share Eon Resume with your audience and earn commissions on every
                paid download that comes through your link.
              </p>
            </div>
            <div className="mt-2 sm:mt-0">
            <AffiliateSignupSection />
            </div>
          </div>
        </section>

        {/* Key benefits */}
        <section className="space-y-6">
          <h2 className="text-base font-semibold text-foreground">
            Why join the program?
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "High commissions",
                body: "Earn up to 40% per purchase. Great for creators, coaches, and job-help pages.",
              },
              {
                title: "Quick setup",
                body: "Sign in, get your link, and share it on WhatsApp, TikTok, Facebook, or your website.",
              },
              {
                title: "Clear reporting",
                body: "Track clicks, conversions, and payouts from a simple dashboard.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Social proof */}
        <section className="space-y-6">
          <h2 className="text-base font-semibold text-foreground">
            What affiliates are saying
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs italic text-muted-foreground mb-3">
                “I recommend Eon Resume in my CV tips videos. It&apos;s become
                a consistent side income without extra work.”
              </p>
              <p className="text-xs font-medium text-foreground">
                — Sarah, Content Creator
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs italic text-muted-foreground mb-3">
                “I share my link in WhatsApp groups. When people download their
                CVs, I get paid. Simple and transparent.”
              </p>
              <p className="text-xs font-medium text-foreground">
                — Michael, Job-Help Admin
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-[0.7rem] text-emerald-300">
              <span className="font-semibold">R250,000+</span>
              <span className="text-muted-foreground">
                paid out to affiliates last year
              </span>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="space-y-6">
          <h2 className="text-base font-semibold text-foreground">
            How it works
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Sign up",
                text: "Accept the affiliate terms from your Eon Resume account.",
              },
              {
                step: "2",
                title: "Share your link",
                text: "Post your link wherever your audience is most active.",
              },
              {
                step: "3",
                title: "Get paid",
                text: "Earn commission whenever someone makes a qualifying purchase.",
              },
            ].map((s) => (
              <div key={s.step} className="space-y-3 text-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/10 text-xs font-semibold text-sky-400">
                  {s.step}
                </div>
                <h3 className="font-medium text-foreground">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        

        {/* Bottom CTA strip */}
        <section className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6 sm:p-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Ready to start earning with Eon Resume?
            </h2>
            <p className="mt-1 text-xs text-muted-foreground max-w-md">
              Joining is free, and you can turn your existing audience into an
              extra monthly income stream in just a few minutes.
            </p>
          </div>
          <div className="mt-3 sm:mt-0">
          <AffiliateSignupSection />
          </div>
        </section>
      </div>
    </div>
  );
}