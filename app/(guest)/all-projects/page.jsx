import AllProjects from '@/components/AllProjects';
import React from 'react'

export const metadata = {
    title: "My Projects - EarlyCode",
    description: "Here I Set up my Projects"
}

const page = () => {
  
  return (
    <main className='py-10 bg-gray-50 px-3 lg:px-10'>
        <section >
            <div className="flex justify-between items-center border-b border-orange-600 pb-2">
                <h1 className='text-4xl font-semibold'>My Projects</h1>
            </div>
           <AllProjects guest={true} />
        </section>
    </main>
  )
}

export default page
