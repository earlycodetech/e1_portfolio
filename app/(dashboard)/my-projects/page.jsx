import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import ProjectCard from '@/components/ProjectCard'
import { getServerSession } from 'next-auth';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata = {
    title: "My Projects - EarlyCode",
    description: "Here I Set up my Projects"
}

const session =  await getServerSession(authOptions);
const page = () => {
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


            <div className="grid md:grid-cols-2 lg:grid-cols-3 py-5">
                <ProjectCard />
            </div>
        </section>
    </main>
  )
}

export default page
