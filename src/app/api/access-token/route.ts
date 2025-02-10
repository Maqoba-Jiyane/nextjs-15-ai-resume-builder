import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {

  if (req.headers.get("JwtSecret") != process.env.YOCO_SECRET_KEY) {
    return new NextResponse(JSON.stringify({ message: "Sceret error" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userPayload = { company: "Employment Echo" };
  const options = { expiresIn: 60 };
  const secretKey = process.env.YOCO_SECRET_KEY || "";
  const token = jwt.sign(userPayload, secretKey, options) //jwt.sign(userPayload, secretKey, options);

  return new NextResponse(JSON.stringify({ Token: token }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
