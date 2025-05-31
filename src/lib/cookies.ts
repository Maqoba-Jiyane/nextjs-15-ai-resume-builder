// Server-side utility (only runs on server components or route handlers)
import { cookies } from 'next/headers';

export async function setServerCookie(name: string, value: string, options?: { maxAge?: number }) {
  (await cookies()).set(name, value, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    ...options,
  });
}

export async function getServerCookie(name: string): Promise<string | undefined> {
  return (await cookies()).get(name)?.value;
}
