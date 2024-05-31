import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteProject from "./DeleteProject";

const ProjectCard = ({data, guest, reset}) => {
  const {fileUrl, fileName, status, title, deployDate, id} =  data
  return (
    <div className="relative flex flex-col gap-3 mb-10 hover:shadow pb-5 transition-shadow">
      <Image
        src={fileUrl}
        alt="Project"
        width={900}
        height={400}
        className="w-100 aspect-video object-cover"
        priority
      />

      <p className="mt-2 font-semibold text-2xl px-2"> {title} </p>
      <p className="mt-1 font-medium px-2"> {deployDate} </p>
      <p
        className={`absolute top-0 right-0 mt-2 mr-2 font-semibold ${status == 'live' ? 'bg-green-600' : "bg-blue-600"} text-white rounded-lg px-4 py-1`}
      >
        {status.toUpperCase()}
      </p>

      <div className="text-center mt-auto px-2">
        <Link href={`/${guest ? 'project' : 'view-project'}/${data.id}`} className="bg-orange-800 py-1 px-4 rounded-lg text-white hover:bg-orange-700">
            View Project
        </Link>
        {!guest && <DeleteProject id={id} file={fileName} reset={reset} />}
      </div>
    </div>
  );
};

export default ProjectCard;
