import GoogleButton from '@/components/GoogleButton'
import React from 'react'

function SignIn() {
  return (
    <div className='min-h-dvh flex items-center justify-center'>
        <div className="w-96 shadow-lg p-3 text-center">
            <GoogleButton />
        </div>
    </div>
  )
}

export default SignIn