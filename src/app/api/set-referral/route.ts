// app/api/set-referral/route.ts
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { refCode } = await req.json();
  const { userId } = await auth();
  const cookieStore = await cookies();

  console.log("refCode: ", userId)

  if (!userId || !refCode) {
    return new Response('Missing data', { status: 400 });
  }

  const client = await clerkClient()

  await client.users.updateUserMetadata(userId, {
    publicMetadata: { refCode: refCode },
  });

  console.log("updateMetada: ",)

    cookieStore.delete('refCode')

  return new Response('OK');
}
