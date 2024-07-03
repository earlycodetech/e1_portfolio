'use client'
import { Merriweather } from 'next/font/google'
import Link from 'next/link';
import React from 'react'
import { FaFacebook, FaInstagram, FaMapPin, FaPhoneAlt } from 'react-icons/fa';
import { IoMdMailOpen } from 'react-icons/io';
import { RiTwitterXFill } from 'react-icons/ri';

const MerriReg400 = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
});

const Contact = () => {
  return (
    <>
      <div>
        <title>Contact Us | Calyb</title>
      </div>
      <main className=" flex flex-col gap-6 px-4 md:px-16 lg:px-32 py-8 md:py-16">
        <h1 className={`${MerriReg400.className} text-5xl text-center`}>Contact Us</h1>

        {/* this is a top session */}
        <div className="flex flex-col gap-4">
          <blockquote className="min-h-32 bg-[#F8F4EC] flex flex-row gap-4 justify-center items-center
             border border-gray-300 rounded-md shadow-md">
            {/* <FaMapPin className={`text-[${themeColors.strongPink}]text-5xl`} /> */}
            <p className="text-2xl">PW 21 Road, Kubwa, Abuja, Nigeria.</p>
          </blockquote>
          <div className="grid md:grid-cols-2 gap-4">

            <blockquote className="min-h-32 flex flex-row gap-4 justify-center items-center
             border border-gray-300 rounded-md shadow-md">
              <IoMdMailOpen className={` text-red-700 text-5xl`} />
              <Link href="mailto:calebrandy@gmail.com" className="text-2xl">calebrandy@gmail.com</Link>
            </blockquote>

            <blockquote className="min-h-32 flex flex-row gap-4 justify-center items-center
             border border-gray-300 rounded-md shadow-md">
              <FaPhoneAlt className="text-5xl" />
              <Link href="tel:08142409034" className="text-2xl">08142409034</Link>
            </blockquote>

          </div>

        </div>

        <div>
          <h2 className={`${MerriReg400.className} text-3xl text-center`}>Engage With Us Across Our Platforms</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <blockquote className="min-h-32 flex flex-row gap-4 justify-center items-center
                             border border-gray-300 rounded-md shadow-md">
              <FaInstagram className={`text-[#D63484] text-5xl`} />
              <Link href="https://instagram.com/caleb_efosa" className="text-2xl">@caleb_efosa</Link>
            </blockquote>

            <blockquote className="min-h-32 flex flex-row gap-4 justify-center items-center
                             border border-gray-300 rounded-md shadow-md">
              <FaFacebook className={`text-blue-600 text-5xl`} />
              <Link href="https://facebook.com/caleb.efosa" className="text-2xl">@caleb.efosa</Link>
            </blockquote>

            <blockquote className="min-h-32 flex flex-row gap-4 justify-center items-center
                             border border-gray-300 rounded-md shadow-md">
              <RiTwitterXFill className={`text-slate-950 text-5xl`}/>
              <Link href="https://x.com/@CalebCalyb" className="text-2xl">@CalebCalyb</Link>
            </blockquote>

          </div>
        </div>



      </main>
    </>
  )
}

export default Contact
