import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type MailOptions = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const cookieStore = cookies();
  const refCookie = (await cookieStore).get("refCode"); // 👈 matches what you set on the frontend

  // If no referral cookie, nothing to do
  if (!refCookie?.value) {
    return NextResponse.json({ ok: true, message: "No referral cookie" });
  }

  const code = decodeURIComponent(refCookie.value);

  try {
    // we’ll capture the user email inside the transaction,
    // then use it after to send the email
    let userEmail: string | null = null;

    await prisma.$transaction(async (tx) => {
      // 1) Increment affiliate totalSignups
      await tx.affiliate.update({
        where: { code },
        data: {
          totalSignups: { increment: 1 },
        },
      });

      // 2) Store attribution on the user & select email
      const user = await tx.user.update({
        where: { userId },
        data: {
          referredByCode: code,
        },
        select: { email: true },
      });

      userEmail = user.email; // string | null
    });

    // 3) Send email ONLY if userEmail is non-null
    if (userEmail) {
      const { subject, html } = affiliateSignupTrackedEmail();

      const mailOptions: MailOptions = {
        from: `"Eon Resume" <${process.env.SMTP_USER}>`,
        to: userEmail, // ✅ now definitely a string
        subject,
        html,
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.warn(
        "Affiliate signup tracked: user has no email, skipping notification"
      );
    }

    // 4) Delete the cookie so it’s not reused
    const res = NextResponse.json({ ok: true });
    res.cookies.set("refCode", "", {
      maxAge: 0,
      path: "/",
    });
    return res;
  } catch (err) {
    console.error("Affiliate consume-ref error:", err);

    // Even if affiliate not found, clear cookie to avoid loops
    const res = NextResponse.json({ ok: false });
    res.cookies.set("refCode", "", {
      maxAge: 0,
      path: "/",
    });
    return res;
  }
}

function affiliateSignupTrackedEmail() {
  return {
    subject: "👤 New Signup From Your Eon Resume Affiliate Link!",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color:#f6f6f6;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;padding:24px;">
          <h2 style="margin-top:0;">👤 New Signup From Your Link!</h2>
          <p>A new user has signed up using your affiliate link.</p>
          <p>Once they complete a purchase, you'll automatically earn your commission.</p>
        </div>
      </div>
    `,
  };
}
