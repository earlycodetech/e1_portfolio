"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const menuList = [
    {
      id: 1,
      title: "Home",
      url: "/",
    },
    {
      id: 2,
      title: "About",
      url: "/about",
    },
    {
      id: 3,
      title: "Services",
      url: "/services",
    },
    {
      id: 4,
      title: "Portfolio",
      url: "/portfolio",
    },
    {
      id: 5,
      title: "Contact",
      url: "/contact",
    },
  ];

  const [navOpen, setNavOpen] = useState(false)
  return (
    <nav className="flex items-center p-2">
      <Link href={"/"} className="flex items-center gap-1">
        <Image
          src={"/logo.png"}
          alt="my logo"
          width={900}
          height={900}
          className="w-12"
        />
        <span className="font-bold text-2xl italic">Earlycode</span>
      </Link>

      <ul
        className={`flex items-center gap-5 ml-auto max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:h-dvh max-lg:w-full max-lg:bg-slate-400/80 max-lg:flex-col max-lg:justify-center transition-all ${!navOpen ? 'max-lg:-translate-x-full' : ''}`}
      >
        {menuList.map((link) => (
          <li key={link.id}>
            <Link
              href={link.url}
              className="font-semibold hover:text-orange-400"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href={"#"}
        className="bg-orange-600 text-white py-1 px-5 hidden lg:inline-block lg:ml-5"
      >
        Get a Quote
      </Link>

      <button onClick={()=> setNavOpen(!navOpen)} className="bg-orange-600 text-white py-1 px-5 ml-auto lg:hidden z-50">
        {navOpen ? 'Close Nav' : "Open Nav"}
      </button>
    </nav>
  );
};

export default Navbar;
