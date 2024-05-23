import NewProjectForm from '@/components/NewProjectForm'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'
import React from 'react'

export const metadata = {
    title: "Create New Project - EarlyCode",
    description: "Here I Set up my Projects"
}
const page = () => {
  return (
    <main className='py-10 bg-gray-50 px-3 lg:px-10'>
        <section >
            <div className="flex justify-between items-center border-b border-orange-600 pb-2">
                <h1 className='text-4xl font-semibold'> New Project </h1>

                <Link href={'/my-projects'} className='bg-orange-600 text-white py-1 px-5 rounded-lg'>
                    All Projects
                </Link>
            </div>


            {/* 
                id, title, link, description, image, status [live, dev], deployDate
            */}
            
            <NewProjectForm />

        </section>
    </main>
  )
}

export default page
