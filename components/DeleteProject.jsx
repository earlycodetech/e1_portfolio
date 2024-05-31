"use client";
import React, { useState } from "react";
import { RiRefreshLine } from "react-icons/ri";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { useToast } from "./ui/use-toast";

const DeleteProject = ({ id, file, reset }) => {
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    setDeleting(true);
    if (!confirm("Are you sure you want to delete this project?")) {
      setDeleting(false);
      return;
    }
    try {
      // Create a reference to the file to delete
      const fileRef = ref(storage, "uploads/" + file);

      // Delete the document from Firestore
      await deleteDoc(doc(db, "projects", id));

      // Delete the file from Firebase Storage
      await deleteObject(fileRef);

      toast({
        title: "Project Deleted",
        description: "This project has been deleted successfully.",
      });

      reset();
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: `Failed to delete project: ${error.message}`,
      });
      console.error("Error deleting project:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 py-1 px-3 text-white rounded-lg ml-3"
      disabled={deleting}
    >
      Delete{" "}
      {deleting && <RiRefreshLine className="animate-spin inline-block ml-2" />}
    </button>
  );
};

export default DeleteProject;
