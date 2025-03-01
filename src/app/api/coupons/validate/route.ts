import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try { 
        
        const { searchParams } = new URL(req.url);
        const code = searchParams.get("coupon") || '';

        // Check if coupon already exists
        const existingCoupon = await prisma.coupon.findFirst({ 
            where: { 
              code, 
              isActive: true
            } 
          });
          
        if(existingCoupon?.usageCount === existingCoupon?.usageLimit){
            return NextResponse.json({ success: false, message: "Coupon limit reached." }, { status: 400 });
        }
        
        if (!existingCoupon) {
            return NextResponse.json({ success: false, message: "Coupon does not exist." }, { status: 400 });
        }

        await prisma.coupon.update({
            where: {
                id: existingCoupon.id
            },
            data: {
                usageCount: {increment: 1}
            }
        })
        return NextResponse.json({ success: true, coupon: existingCoupon }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
}