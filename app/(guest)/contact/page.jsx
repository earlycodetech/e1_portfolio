import Contact from '@/components/Contact'
import React from 'react'


const page = () => {
  return (
    <main>
       <div className="my-10">
        <h3 className="text-center font-bold text-2xl"> My Recent Projects </h3>

        <div className="">
          <Contact />
        </div>
      </div>
    </main>
  )
}

export default page
