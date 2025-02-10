import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const YocoSecret = process.env.YOCO_SECRET_KEY;
    if (!YocoSecret) {
      return NextResponse.json(
        { error: "Missing secret key" },
        { status: 401 },
      );
    }

    const { amount, currency, totalDiscount } = await req.json();

    const response = await fetch("https://payments.yoco.com/api/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${YocoSecret}`, // <-- Keep secret on server
      },
      body: JSON.stringify({
        amount,
        currency,
        totalDiscount,
        successUrl: `https://t43fx9gz-3000.inc1.devtunnels.ms/resumes`,
      }),
    });

    if (!response.ok) {
      // console.log(response.status);
      return NextResponse.json(
        { error: "Failed Yoco request" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
