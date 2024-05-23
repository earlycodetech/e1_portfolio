import GoogleButton from '@/components/GoogleButton'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

const session =  await getServerSession(authOptions);
function SignIn() {
  // If the user session exist don't show signin
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className='min-h-dvh flex items-center justify-center'>
        <div className="w-96 shadow-lg p-3 text-center">
            <GoogleButton />
        </div>
    </div>
  )
}

export default SignIn