import React from 'react'

const Footer = () => {
  return (
    <div className='py-14 text-center bg-orange-800 text-white'>
        <p className='text-2xl'>
            Get in Touch with me at: <br />
            
            <span className='text-5xl'>
                hireme@earlycode.com
            </span>

            <br /><br />

            &copy; {new Date().getFullYear( )}, All Rights Reserved
        </p>
    </div>
  )
}

export default Footer
