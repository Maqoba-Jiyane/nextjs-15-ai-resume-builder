"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const affiliateSchema = z.object({
  bank: z.string(),
  payshapId: z.string(),
  acceptedTerms: z.literal(true),
});

function generateAffiliateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "EON-";
  for (let i = 0; i < 6; i++)
    out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

/** Nodemailer transporter (Gmail example).
 * Make sure you have:
 *  - SMTP_USER
 *  - SMTP_PASS
 */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function affiliateWelcomeEmail({
  name,
  refLink,
}: {
  name: string;
  refLink: string;
}) {
  return {
    subject: "🎉 Welcome to the Eon Resume Affiliate Program!",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color:#f6f6f6;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;padding:24px;">
          <h1 style="margin-top:0;">🎉 Welcome to the Eon Resume Affiliate Program!</h1>

          <p>Hi <strong>${name}</strong>,</p>
          <p>Your affiliate account is now active. Start earning by sharing your unique link:</p>
          
          <p style="margin: 24px 0;">
            <a href="${refLink}"
              style="background:#ff5722;color:#fff;padding:12px 20px;text-decoration:none;border-radius:6px;display:inline-block;">
              ${refLink}
            </a>
          </p>

          <p>Track your clicks, signups, purchases and payouts inside your affiliate dashboard.</p>

          <!-- WhatsApp Group Section -->
          <div style="margin-top:32px;padding:18px;border-left:4px solid #25D366;background:#f0fff4;border-radius:6px;">
            <h3 style="margin:0 0 8px 0;font-size:16px;color:#128C7E;">💬 Join Our Affiliate WhatsApp Group</h3>
            <p style="margin:0 0 12px 0;color:#333;font-size:14px;line-height:1.5;">
              Connect with other affiliates, get updates, share tips, and boost your sales performance.
            </p>
            <a href="https://chat.whatsapp.com/CkdJ4wSKk5kDR9uz1gJzDf"
              style="background:#25D366;color:#fff;padding:10px 18px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">
              Join WhatsApp Group
            </a>
          </div>

          <p style="margin-top:32px;font-size:12px;color:#777;">
            If you did not sign up for the Eon Resume affiliate program, you can ignore this email.
          </p>
        </div>
      </div>
    `,
  };
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
    const cu = await currentUser();

    const email = cu?.primaryEmailAddress?.emailAddress ?? null;

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

  // 3. If affiliate exists, update instead (NO welcome email here)
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

  const affiliate = await prisma.affiliate.create({
    data: {
      userId: user.userId,
      code,
      bank: parsed.bank,
      payshapId: parsed.payshapId,
    },
  });

  // 5. Kick off welcome email for NEW affiliates only
  if (user.email) {
    try {
      const refLink = `${process.env.NEXT_PUBLIC_BASE_URL}/?refCode=${affiliate.code}`;
      const displayName =
        user.firstName || user.lastName
          ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
          : "there";

      const { subject, html } = affiliateWelcomeEmail({
        name: displayName,
        refLink,
      });

      await transporter.sendMail({
        from: `"Eon Resume" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject,
        html,
      });
    } catch (err) {
      console.error("Error sending affiliate welcome email:", err);
      // Don’t throw – signup must still succeed even if email fails
    }
  }

  return affiliate;
}
