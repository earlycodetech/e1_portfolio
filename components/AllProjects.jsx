"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { RiRefreshLine } from "react-icons/ri";

const AllProjects = ({guest}) => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true); // Track if there are more projects to load
  const projectsPerPage = 3;

  const getAllProjects = async (reset = false) => {
    setLoading(true);
    const projectsCollection = collection(db, "projects");
    let projectsQuery;

    if (reset) {
      projectsQuery = query(
        projectsCollection,
        orderBy("createdAt", "desc"),
        limit(projectsPerPage)
      );
    } else if (lastVisible) {
      projectsQuery = query(
        projectsCollection,
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(projectsPerPage)
      );
    } else {
      projectsQuery = query(
        projectsCollection,
        orderBy("createdAt", "desc"),
        limit(projectsPerPage)
      );
    }

    const querySnapshot = await getDocs(projectsQuery);
    const newProjects = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt.toMillis()
    }));

    setProjects((prevProjects) => reset ? newProjects : [...prevProjects, ...newProjects]);
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setLoading(false);

    if (querySnapshot.docs.length < projectsPerPage) {
      setHasMore(false); // No more projects to load
    } else {
      setHasMore(true);
    }
  };


  const resetProjects = () => {
    getAllProjects(true);
  }

  useEffect(() => {
    getAllProjects(true);
  }, []);

  return (
    <section>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
        {projects.length === 0 && !loading && (
          <div className="col-span-3 text-center">No Projects Created Yet</div>
        )}
        {projects.map((project) => (
          <ProjectCard key={project.id} data={project} guest={guest} reset={!guest ? ()=> resetProjects() : null} />
        ))}
        {loading && (
          <div className="col-span-3 flex items-center justify-center h-56">
            <RiRefreshLine className="animate-spin text-5xl text-yellow-600" />
          </div>
        )}
      </div>
      <div className="flex justify-center py-5 pt-10 border-t mt-5">
        <button
          className="bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={() => getAllProjects()}
          disabled={loading || !hasMore}
        >
          {loading ? "Loading..." : hasMore ? "Load More" : "No More Projects"}
        </button>
      </div>
    </section>
  );
};

export default AllProjects;
