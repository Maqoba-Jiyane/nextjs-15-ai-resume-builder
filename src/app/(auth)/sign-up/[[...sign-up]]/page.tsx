// app/sign-up/page.tsx
'use client'

import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { SignUp, useUser } from '@clerk/nextjs'

export default function Page() {
  const { user, isSignedIn } = useUser()

  useEffect(() => {
    const refCode = Cookies.get('refCode')

    if (isSignedIn && user && refCode) {
      fetch('/api/set-referral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refCode,
          userId: user.id,
        }),
      })

      Cookies.remove('refCode') // optional: clean up
    }
  }, [isSignedIn, user])

  return (
    <main className="flex h-screen justify-center p-3">
      <SignUp />
    </main>
  )
}
