import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    
    try {
        const body = await req.json();
        console.log(body)

        const checkoutId = body.payload.metadata.checkoutId;
        const type = body.type;

        const resumeId = await prisma.resume.findFirst({
            where: {checkoutId: checkoutId},
            select: {id: true}
        })

        if(!resumeId){
            throw new Error('ResumeId not found')
        }

        if(type === 'payment.succeeded'){
            await prisma.resume.update({
                where: {id: resumeId.id,checkoutId: checkoutId},
                data: {paid: true}
            })
        }

    } catch (error) {
        console.log(error)
        throw new Response('Internal server error', {status: 500})
    }

    return new Response('Webhook triggered', {status: 200})
}