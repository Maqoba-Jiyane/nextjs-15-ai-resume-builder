// src/app/api/clerk-webhooks/route.ts

import { Webhook } from "svix";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Clerk webhook secret (from env)
const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET || "";

if (!webhookSecret) {
  throw new Error(
    "Missing CLERK_WEBHOOK_SIGNING_SECRET in environment variables",
  );
}

// Clerk event type (you can extend this with more specific types as needed)
interface ClerkUserEvent {
  type: "user.created" | "user.updated" | "user.deleted";
  data: {
    id: string;
    email_addresses?: Array<{ email_address: string }>;
    first_name?: string;
    last_name?: string;
    image_url?: string;
    public_metadata?: { refCode: "" };
  };
}

// POST handler
export async function POST(req: NextRequest): Promise<NextResponse> {
  let payload: string;
  try {
    payload = await req.text();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const svixHeaders = {
    "svix-id": req.headers.get("svix-id") ?? "",
    "svix-timestamp": req.headers.get("svix-timestamp") ?? "",
    "svix-signature": req.headers.get("svix-signature") ?? "",
  };

  const webhook = new Webhook(webhookSecret);

  let event: ClerkUserEvent;

  try {
    event = webhook.verify(payload, svixHeaders) as ClerkUserEvent;
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const { type, data } = event;

  console.log("referredByCode: ", data.public_metadata);

  try {
    if (type === "user.created" || type === "user.updated") {
      const {
        id: clerkUserId,
        email_addresses = [],
        first_name = "",
        last_name = "",
      } = data;

      const email = email_addresses[0]?.email_address || "";

      await prisma.user.upsert({
        where: { userId: clerkUserId },
        update: {
          email,
          firstName: first_name,
          lastName: last_name,
        },
        create: {
          userId: clerkUserId,
          email,
          firstName: first_name,
          lastName: last_name,
        },
      });

      console.info(`✅ User ${type} event processed for ${email}`);
    }

    if (type === "user.deleted") {
      const { id: clerkUserId } = data;

      const userToDelete = await prisma.user.findUnique({
        where: { userId: clerkUserId },
      });

      if (userToDelete) {
        await prisma.user.delete({
          where: { userId: clerkUserId },
        });
        console.info(`🗑️ User deleted: ${clerkUserId}`);
      } else {
        console.info(`ℹ️ User not found: ${clerkUserId}`);
      }
    }

    return NextResponse.json({ message: "Webhook processed" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      console.log("❗ Prisma operation failed:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
