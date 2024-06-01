import React from "react";
import "../../styles/index.css";
import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

export const revalidate = 0 // revalidate at 10 seconds

const HomePage = async () => {
  const projectRef = collection(db, "projects");
  const projectsQuery = query(
    projectRef,
    orderBy("createdAt", "desc"),
    limit(6)
  );
  const querySnapshot = await getDocs(projectsQuery);
  const projects = [];

  querySnapshot.forEach((doc) => {
    projects.push({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt.toMillis()
    });
  });

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
            priority
          />
        </div>
      </div>

      <div className="my-10">
        <h3 className="text-center font-bold text-2xl"> My Recent Projects </h3>

        <div className="flex justify-end px-5 my-5">
          <Link href={"/all-projects"}>View All</Link>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mx-2 md:mx-8">
          {projects.length < 1 ? (
            <h1> Coming Soon... </h1>
          ) : (
            projects.map((project) => (
              <ProjectCard key={project.id} data={project} guest={true} />
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
