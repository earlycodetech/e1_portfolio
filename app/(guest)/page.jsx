import React from "react";
import "../../styles/index.css"
import Image from "next/image";
const HomePage = () => {
  return (
    <main>
      <div className="bg-black h-[32rem] flex items-center gap-5 justify-center hero">
          <div className="w-full">

          </div>

          <div className="h-full w-full"> 
            <Image 
              src={'/user.png'}
              alt="User"
              width={1800}
              height={900}
              className="w-full h-full object-contain"
            />
          </div>
      </div>
    </main>
  );
};

export default HomePage;
