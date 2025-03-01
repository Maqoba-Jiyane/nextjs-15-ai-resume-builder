import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const couponCode = url.searchParams.get("code");
    try {
        if(!couponCode){
            return NextResponse.json({ success: false, message: 'Missing coupon code.' }, { status: 400 });
        }
        const coupons = await prisma.coupon.findUnique({
            where: {
                code: couponCode
            }
        });

        if(coupons?.discount){
            return NextResponse.json({ success: true, discount: coupons.discount }, {status: 200});
        }

        return NextResponse.json({ success: false, message: 'Coupon not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
}