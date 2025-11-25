// app/api/affiliate/click/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

/**
 * Nodemailer transporter using Gmail.
 * Make sure you have:
 * - SMTP_USER (your Gmail address)
 * - SMTP_PASSWORD (App Password, not your normal login)
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

type MailOptions = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid code" },
        { status: 400 },
      );
    }

    // Increment totalClicks for the affiliate with this code
    await prisma.affiliate.update({
      where: { code },
      data: {
        totalClicks: { increment: 1 },
      },
    });

    const user = await prisma.user.findUnique({
      where: {referralCode: code}
    })

    console.log("user.email: ", user?.email)

    // Fire-and-forget: send click email if we have an email address
    if (user?.email) {
      try {
        const { subject, html } = affiliateClickEmail();

        const mailOptions: MailOptions = {
          from: `"Eon Resume" <${process.env.SMTP_USER}>`,
          to: user.email,
          subject,
          html,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailErr) {
        // Don't break the endpoint if email fails
        console.error("Error sending affiliate click email:", emailErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // If the code doesn't match any affiliate, we can just no-op
    // so that bad / old links don't break the page.
    console.error("Affiliate click tracking error:", err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

/* -------------------------------------------------------------------------- */
/*                             EMAIL TEMPLATE                                  */
/* -------------------------------------------------------------------------- */

function affiliateClickEmail() {
  return {
    subject: "🔥 New Click on Your Eon Resume Affiliate Link!",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color:#f6f6f6;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;padding:24px;">
          <h2 style="margin-top:0;">🔥 New Click on Your Affiliate Link!</h2>
          <p>Someone just clicked your Eon Resume affiliate link.</p>
          <p>Keep sharing — every click increases your chances of earning commission.</p>
        </div>
      </div>
    `,
  };
}
