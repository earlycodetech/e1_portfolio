"use client";
import React, { useState } from "react";
import { FaGithub  } from "react-icons/fa";
import { signIn, signOut } from "next-auth/react";
import { RiRefreshLine } from "react-icons/ri";

const GithubButton = () => {
    const [processing, setProccessing] = useState(false)
    const handleSignIn = ()=> {
        signIn("github", { callbackUrl: "/my-projects" });
        setProccessing(true);
    }
  return (
    <div>
      <button
        disabled={processing}
        onClick={handleSignIn}
        className="bg-slate-950 w-full mt-5 flex items-center gap-4 justify-center text-white py-3 px-7 rounded-lg"
      >
        <FaGithub /> Sign In with GitHub {processing && <RiRefreshLine className="animate-spin" />}
      </button>
    </div>
  );
};

export default GithubButton;
