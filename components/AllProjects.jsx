"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { RiRefreshLine } from "react-icons/ri";

const AllProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const getAllProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    let allProjects = [];
    querySnapshot.forEach((doc) => {
      allProjects.push(doc.data());
    });

    setProjects(allProjects);
    setLoading(false);
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <section>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
        {loading ? (
            <div className="col-span-3 flex items-center justify-center h-56">
                <RiRefreshLine className="animate-spin text-5xl text-yellow-600" />
            </div>
        ) : (
            projects.length < 1 ? "No Projects Created Yet" :
            projects.map((project) => <ProjectCard key={project.id} data={project} />)
        )
        }
      </div>
    </section>
  );
};

export default AllProjects;
