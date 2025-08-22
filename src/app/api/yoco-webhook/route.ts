import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import crypto from "crypto";
// import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const headers = req.headers;
    const webhookTime = headers.get("webhook-timestamp");

    if (!webhookTime) {
      console.log("❌ Missing webhook timestamp");
      return new Response("Missing time", { status: 400 });
    }

    const webhookTimestamp = Number(webhookTime);
    const now = Math.floor(Date.now() / 1000);

    if (webhookTimestamp + 3 * 60 < now) {
      console.log("❌ Webhook request expired");
      return new Response("Request expired", { status: 400 });
    } else {
      console.log("✅ Webhook timestamp is valid");
    }

    const signatureHeader = headers.get("webhook-signature");
    console.log(signatureHeader)

    if (!signatureHeader) {
      return new Response("Signature required", { status: 400 });
    }

    // ✅ Read raw request body correctly
    const rawBody = await req.text();
    const webHookId = headers.get("webhook-id");

    // ✅ Construct signed content as per Yoco documentation
    const signedContent = `${webHookId}.${webhookTime}.${rawBody}`;

    // ✅ Get and decode webhook secret properly
    const secretBase64 = process.env.WEBHOOK_SECRET?.split("_")[1];

    if (!secretBase64) {
      console.log("❌ Missing WEBHOOK_SECRET in environment variables");
      return new Response("Missing Webhook Secret", { status: 500 });
    }

    const secretBytes = Buffer.from(secretBase64, "base64");

    // ✅ Generate the expected signature
    const expectedSignature = crypto
      .createHmac("sha256", secretBytes)
      .update(signedContent)
      .digest("base64");

    console.log("🔑 Expected Signature:", expectedSignature);

    // ✅ Extract multiple signatures and compare
    const signatureElements = signatureHeader.split(" ");
    let validSignature = false;

    for (const element of signatureElements) {
      const [version, receivedSignature] = element.split(",");

      if (version.trim() === "v1" && receivedSignature) {
        console.log("🔑 Checking Signature:", receivedSignature.trim());

        const expectedBuffer = Buffer.from(expectedSignature);
        const receivedBuffer = Buffer.from(receivedSignature);
        console.log(crypto.timingSafeEqual(expectedBuffer, receivedBuffer));
        if (crypto.timingSafeEqual(expectedBuffer, receivedBuffer)) {
          validSignature = true;
          break;
        }
      }
    }

    if (!validSignature) {
      console.log("❌ Invalid signature");
      return new Response("Invalid signature", { status: 400 });
    }

    console.log("✅ Signature Verified Successfully");

    // ✅ Parse JSON body after verification
    const body = JSON.parse(rawBody);
    // console.log("📩 Webhook Payload:", body);

    const checkoutId = body.payload?.metadata?.checkoutId;
    const type = body.type;

    if (!checkoutId) {
      console.log("❌ Missing checkoutId in payload");
      return new Response("Missing checkoutId", { status: 400 });
    }

    console.log("🔍 Looking for Resume with checkoutId:", checkoutId);

    const resume = await prisma.resume.findFirst({
      where: { checkoutId: checkoutId },
      select: { id: true, userId: true, user: true },
    });

    if (!resume || !resume.id) {
      console.log("❌ Resume ID not found");
      return new Response("Resume ID not found", { status: 404 });
    }

    console.log("✅ Resume Found:", resume.id);

    if (type === "payment.succeeded") {
      console.log("💰 Payment succeeded - Updating resume status");
      await prisma.resume.update({
        where: { id: resume.id },
        data: { paid: true },
      });

      // const paymentCreated = await prisma.payment.create({
      //   data: {resumeId: resume.id, userId: resume.userId, amountPaid: body.payload?.amount, checkoutId: body.payload?.metadata?.checkoutId, paidAt: new Date(), referralCode: resume.user.referredByCode }
      // })

      // if(!paymentCreated){
      //   console.log("Payment not created!");
      // }
      // revalidatePath(`/resumes`);
      console.log("✅ Resume marked as paid");
    }

    return new Response("Webhook triggered", { status: 200 });
  } catch (error) {
    console.error("🚨 Webhook Processing Error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
