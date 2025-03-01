

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"; // Ensure you have a prismaClient.ts file

export async function GET() {
    try {
        const coupons = await prisma.coupon.findMany();
        return NextResponse.json({ success: true, coupons });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        
        const { code, discount, usageLimit, expiresAt } = await req.json();

        // Check if coupon already exists
        const existingCoupon = await prisma.coupon.findUnique({ where: { code } });
        if (existingCoupon) {
            return NextResponse.json({ success: false, message: "Coupon already exists." }, { status: 400 });
        }

        const isValidDate = (dateString: string) => !isNaN(Date.parse(dateString));

        const newCoupon = await prisma.coupon.create({
            data: {
                code,
                discount: Number(discount),
                usageLimit: usageLimit ? parseInt(usageLimit, 10) : null,
                expiresAt: expiresAt && isValidDate(expiresAt) ? new Date(expiresAt) : null
            }
        });

        return NextResponse.json({ success: true, coupon: newCoupon }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
}


export async function PATCH(req: Request) {
    try {
        const { code, discount, usageLimit, expiresAt } = await req.json();

        const updatedCoupon = await prisma.coupon.update({
            where: { code },
            data: {
                discount,
                usageLimit: usageLimit ? parseInt(usageLimit, 10) : null,
                expiresAt: expiresAt ? new Date(expiresAt) : null
            }
        });

        return NextResponse.json({ success: true, coupon: updatedCoupon });
    } catch (error) {
        if(error instanceof Error)
        return NextResponse.json({ success: false, message: "Coupon not found." }, { status: 404 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { code } = await req.json();

        await prisma.coupon.delete({ where: { code } });

        return NextResponse.json({ success: true, message: "Coupon deleted successfully." });
    } catch (error) {
        if(error instanceof Error)
        return NextResponse.json({ success: false, message: "Coupon not found." }, { status: 404 });
    }
}
