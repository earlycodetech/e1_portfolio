import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import AllProjects from '@/components/AllProjects';
import { getServerSession } from 'next-auth';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata = {
    title: "My Projects - EarlyCode",
    description: "Here I Set up my Projects"
}

const page = async () => {
    const session =  await getServerSession(authOptions);
    if (session === null) {
        redirect('/signin')
    }
  return (
    <main className='py-10 bg-gray-50 px-3 lg:px-10'>
        <section >
            <div className="flex justify-between items-center border-b border-orange-600 pb-2">
                <h1 className='text-4xl font-semibold'>My Projects</h1>

                <Link href={'/new-project'} className='bg-orange-600 text-white py-1 px-5 rounded-lg'>
                    New Project
                </Link>
            </div>


           <AllProjects guest={false} />
        </section>
    </main>
  )
}

export default page
