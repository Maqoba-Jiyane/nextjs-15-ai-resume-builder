"use client";

import { useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrUpdateAffiliate } from "./actions";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const affiliateSchema = z.object({
  payshapId: z.string().optional(),
  bank: z.string().optional(),

  // boolean with a refinement (instead of literal true)
  acceptedTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms to continue",
  }),
});

type AffiliateFormValues = z.infer<typeof affiliateSchema>;

type AffiliateSignupFormProps = {
  existingAffiliate: {
    code: string;
    bank: string;
    payshapId: string;
  } | null;
};

export default function AffiliateSignupForm({
  existingAffiliate,
}: AffiliateSignupFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<AffiliateFormValues>({
    resolver: zodResolver(affiliateSchema),
    defaultValues: existingAffiliate
      ? {
          bank: existingAffiliate.bank,
          payshapId: existingAffiliate.payshapId,
          acceptedTerms: true,
        }
      : {
          payshapId: "",
          bank: "",
          acceptedTerms: false,
        },
  });

  const onSubmit = (values: AffiliateFormValues) => {
    const formData = new FormData();
    formData.append("bank", values.bank!);
    formData.append("payshapId", values.payshapId!); // safe because of refine

    formData.append("acceptedTerms", values.acceptedTerms ? "on" : "");

    startTransition(async () => {
      try {
        await createOrUpdateAffiliate(formData);

        toast({
          variant: "default",
          title: existingAffiliate
            ? "Affiliate profile updated"
            : "You’re now an affiliate 🎉",
          description: existingAffiliate
            ? "Your payout details have been updated."
            : "You can start sharing your affiliate link and earning commission.",
        });
      } catch (err) {
        console.error(err);
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description:
            err instanceof Error
              ? err.message
              : "Please try again in a moment.",
        });
      }
    });
  };

  return (
    <section className="mt-12">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800/80 bg-white/90 p-6 shadow-sm dark:bg-slate-950/90 dark:border-slate-800">
        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-slate-800/60 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              {existingAffiliate
                ? "Your affiliate profile"
                : "Join the Eon Resume affiliate program"}
            </h2>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Set up how you&apos;d like to get paid and where you&apos;ll
              promote Eon Resume.
            </p>
          </div>

          {existingAffiliate && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-[0.7rem] font-medium text-sky-300 ring-1 ring-sky-500/40 sm:mt-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Active affiliate · Code:
              <span className="font-semibold text-sky-200">
                {existingAffiliate.code}
              </span>
            </div>
          )}
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 grid gap-5 text-sm sm:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="bank"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Capitec"
                      className="bg-slate-900/5 text-slate-900 dark:bg-slate-900/70 dark:text-slate-100"
                    />
                  </FormControl>
                  <p className="text-[0.7rem] text-slate-500 dark:text-slate-500">
                    We&apos;ll use this when sending payout notifications.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payshapId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number linked to account</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="0732924460"
                      className="bg-slate-900/5 text-slate-900 dark:bg-slate-900/70 dark:text-slate-100"
                    />
                  </FormControl>
                  <p className="text-[0.7rem] text-slate-500 dark:text-slate-500">
                    We&apos;ll use this when sending payout.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acceptedTerms"
              render={({ field }) => (
                <FormItem className="sm:col-span-2 flex flex-row items-start gap-2 space-y-0 rounded-xl border border-slate-800/70 bg-slate-900/40 px-3 py-3 text-xs text-slate-300">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-500"
                    />
                  </FormControl>
                  <div>
                    <FormLabel className="text-xs font-medium text-slate-200">
                      I agree to the affiliate terms
                    </FormLabel>
                    <p className="mt-1 text-[0.7rem] text-slate-400">
                      You&apos;ll promote Eon Resume honestly, not spam people,
                      and only share your link where it&apos;s allowed. We
                      reserve the right to pause accounts abusing the program.
                    </p>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="sm:col-span-2 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.7rem] text-slate-500 dark:text-slate-500">
                You can update your payout details anytime before withdrawal.
              </p>
              <Button
                type="submit"
                disabled={isPending}
                className="mt-2 w-full max-w-xs bg-sky-500 text-xs font-semibold text-white shadow-[0_0_18px_rgba(56,189,248,0.5)] hover:bg-sky-600 sm:mt-0 sm:w-auto"
              >
                {isPending
                  ? existingAffiliate
                    ? "Saving changes..."
                    : "Creating affiliate profile..."
                  : existingAffiliate
                    ? "Save changes"
                    : "Join affiliate program"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
