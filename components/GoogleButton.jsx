"use client";
import React, { useState } from "react";
import { FaGoogle  } from "react-icons/fa";
import { signIn, signOut } from "next-auth/react";
import { RiRefreshLine } from "react-icons/ri";

const GoogleButton = () => {
    const [processing, setProccessing] = useState(false)
    const handleSignIn = ()=> {
        signIn("google", { callbackUrl: "/" });
        setProccessing(true);
    }
  return (
    <div>
      <button
        disabled={processing}
        onClick={handleSignIn}
        className="bg-emerald-700 w-full flex items-center gap-4 justify-center text-white py-3 px-7 rounded-lg"
      >
        <FaGoogle /> Sign In with Google {processing && <RiRefreshLine className="animate-spin" />}
      </button>
    </div>
  );
};

export default GoogleButton;
