
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Define a transporter using your email service provider (SMTP setup)
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com", // For Gmail
  port:465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Your email (stored in .env file for security)
    pass: process.env.EMAIL_PASSWORD, // Your email password (use environment variable for security)
  },
});

type MailOptions = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { name, email, issueType, message } = await req.json();
    
    try {
      // Send email using Nodemailer
      const mailOptions: MailOptions = {
        from: process.env.EMAIL_USER as string, // The user's email (from the form)
        to: process.env.EMAIL_USER as string, // Your email (where the form will be sent)
        subject: `${issueType} EONRESUME Contact Form`,
        text: `
          You have received a new message from ${name} (${email}):

          Message:
          ${message}
        `,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      // Send a success response
      return new NextResponse(JSON.stringify({ message: "Message sent successfully!" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      // Handle error if email sending fails
      console.error("Error sending email:", error);
      return new NextResponse(JSON.stringify({ error: "An error occurred while sending your message." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else {
    // Handle any other HTTP method (e.g., GET, PUT)
    return new NextResponse(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }
};
