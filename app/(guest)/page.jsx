import React from "react";
import "../../styles/index.css";
import Image from "next/image";
const HomePage = () => {
  return (
    <main>
      <div className="bg-black h-[32rem] flex items-center gap-5 justify-center hero">
        <div className="w-full pl-10 leading-8">
          <p className="font-semibold">Get The Best Web Solutions</p>

          <p className="text-5xl font-bold">Hi, I'm Earlycode</p>

          <p className="font-semibold">
            I am a full stack web developer, delivering web solutions using
            HTML, CSS, JS, React and Next.Js
          </p>
        </div>

        <div className="h-full w-full">
          <Image
            src={"/user.png"}
            alt="User"
            width={1800}
            height={900}
            className="w-full h-full object-contain"
          />
        </div>
      </div>


      <div className="mt-10">
        <h3 className="text-center font-bold text-2xl"> My Recent Projects </h3>


        <div className="grid lg:grid-cols-3 md:grid-cols-2">
          
        </div>
      </div>
    </main>
  );
};

export default HomePage;
