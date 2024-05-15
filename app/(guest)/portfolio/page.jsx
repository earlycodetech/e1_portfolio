import ProjectCard from "@/components/ProjectCard";
import React from "react";

const PortfolioPage = () => {
  return (
    <main>
      <div className="my-10">
        <h3 className="text-center font-bold text-2xl"> My Recent Projects </h3>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mx-2 md:mx-8">
          <ProjectCard />
        </div>
      </div>
    </main>
  );
};

export default PortfolioPage;
