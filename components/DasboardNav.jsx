"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardNav = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between p-2">
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

      <div className="ml-auto"></div>

      {status == "loading" ? (
        "..."
      ) : status == "unauthenticated" ? (
        <Link
          href={"/signin"}
          className="bg-orange-600 text-white py-1 px-5 hidden lg:inline-block lg:ml-5"
        >
          Sign In
        </Link>
      ) : (
        <DropdownMenu className="ml-auto">
          <DropdownMenuTrigger className="outline-none">
            <Avatar className="mx-5">
              <AvatarImage src={session.user.image} />
              <AvatarFallback>
                {session.user.name.slice(0, 2).toUpperCase()}{" "}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href={"/my-projects"}>Projects</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>Profile</DropdownMenuItem>

            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

    
    </nav>
  );
};

export default DashboardNav;
