import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import "../../../../styles/ckeditor.css";

const page = async ({ params }) => {
  const { id } = params;

  const docRef = doc(db, "projects", id);
  const docSnap = await getDoc(docRef);

  const { fileUrl, status, title, deployDate, description, link } =
    docSnap.data();
  if (!docSnap.exists()) {
    redirect("/my-projects");
  }

  return (
    <section>
      <div className="p-2 md:p-10">
        <h1 className="text-3xl text-center my-10">{title}</h1>

        <div className="relative">
          <Image
            src={fileUrl}
            alt={title}
            width={1900}
            height={900}
            className="w-full aspect-video h-96 object-cover object-center bg-gray-600"
          />
          <div
            className={`absolute top-0 mr-3 right-0 mt-3 ${
              status == "live" ? "bg-green-600" : "bg-blue-600"
            } rounded px-3 py-1 shadow-md text-white text-3xl font-bold`}
          >
            {status.toUpperCase()}
          </div>
        </div>

        <h4 className="font-semibold text-lg text-center my-3">
          {" "}
          {deployDate}{" "}
        </h4>
        <div className="flex justify-end my-3">
          <a
            href={link}
            target="_blank"
            className="bg-orange-800 py-1 px-4 rounded-lg text-white hover:bg-orange-700"
          >
            View Project
          </a>
        </div>

        <div className="ck-content">
          <article dangerouslySetInnerHTML={{ __html: description }}></article>
        </div>
      </div>
    </section>
  );
};

export default page;
