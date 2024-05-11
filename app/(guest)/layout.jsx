import Navbar from '@/components/Navbar'
import React from 'react'

const layout = ({children}) => {
  return (
    <main>
      <Navbar />
      {children}
      Footer
    </main>
  )
}

export default layout