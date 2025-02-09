import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const YocoSecret = process.env.YOCO_SECRET_KEY;
    if (!YocoSecret) {
      return NextResponse.json(
        { error: "Missing secret key" },
        { status: 500 },
      );
    }

    // Call Yoco from your server
    // const accessTokenResponse = await fetch(
    //   "http://localhost:3000/api/access-token",
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       JwtSecret: `${YocoSecret}`, // <-- Keep secret on server
    //     },
    //   },
    // );

    // const accesstoken = await accessTokenResponse.json();
    // console.log(accesstoken)

    // if (accessTokenResponse.ok) {
    //   const accesstoken = await accessTokenResponse.json();
    // Get body from client
    const { amount, currency, totalDiscount, contentRef } = await req.json();

      console.log(contentRef)
    const userPayload = { company: "Employment Echo" };
    const options = { expiresIn: 60 };
    const secretKey = process.env.YOCO_SECRET_KEY || "";
    const token = jwt.sign(userPayload, secretKey, options);
    // Call Yoco from your server
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
        successUrl: `http://localhost:3000/resumes?accesstoken=${token}`,
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
    // }
    // return NextResponse.json(
    //   { error: "Failed accessTokenResponse request" },
    //   { status: accessTokenResponse.status },
    // );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
