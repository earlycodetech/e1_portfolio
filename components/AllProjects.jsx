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

  // The last visible state holds the last object retrieved from firestore
  const [lastVisible, setLastVisible] = useState(null);

  // The hasMore state tracks if there are more projects to load
  const [hasMore, setHasMore] = useState(true); 

  // Limit per load
  const projectsPerPage = 3;

  const getAllProjects = async (reset = false) => {
    setLoading(true);
    const projectsCollection = collection(db, "projects");
    let projectsQuery;

    if (reset) {
      // This runs if we reset the values
      projectsQuery = query(
        projectsCollection,
        orderBy("createdAt", "desc"),
        limit(projectsPerPage)
      );
    } else if (lastVisible) {
      // This runs when we load more values
      projectsQuery = query(
        projectsCollection,
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(projectsPerPage)
      );
    } else {
      // This is the first query to run when you visit the page
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

    /* `setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);` is setting the last visible
    document retrieved from Firestore in the state variable `lastVisible`. This is used to keep
    track of the last document that was fetched, so that when loading more projects, the query can
    start after this last visible document to fetch the next set of projects. */
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
