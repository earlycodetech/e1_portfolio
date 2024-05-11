import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex items-center p-2">
       <Link href={"/"}>
            <Image
                src={"/logo.png"}
                alt='my logo'
                width={900}
                height={900}
                className='w-14'
            />
            <span>Earlycode</span>
       </Link>

    </nav>
  )
}

export default Navbar
