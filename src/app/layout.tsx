import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import Navbar from "./Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s - EonResume`,
    absolute: "EonResume",
  },
  description: "Create professional resumes effortlessly with AI-powered templates and expert guidance.",
  keywords: "Resume Builder, Job Seeker Tools, ATS-Compatible Resume, Resume Templates, Resume Customization, Job Application, CV Creation, Resume Editing, Job Search Tools, Resume Formatting, Resume Optimization, Resume Generator, Digital Resume, Job Market Ready, EonResume, Eon Resume",
  openGraph: {
    title: "EonResume | AI Resume Builder",
    description: "Build professional resumes in minutes using AI-driven resume templates.",
    url: "https://eonresume.co.za",
    siteName: "EonResume",
    images: [
      {
        url: "https://eonresume.co.za/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "EonResume Homepage",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-9FFS7J8YWB"
          ></Script>
          <Script id="google-analytics"  strategy="afterInteractive">
            {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-9FFS7J8YWB');`}
          </Script>
        </head>
        <body className={inter.className}>
        <Navbar />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
