import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProjectCard = ({data}) => {
  const {fileUrl, status, title, deployDate} =  data

  console.log(data);
  return (
    <div className="relative">
      <Image
        src={fileUrl}
        alt="Project"
        width={900}
        height={400}
        className="w-100 aspect-video object-cover"
      />

      <p className="mt-2 font-semibold text-2xl"> {title} </p>
      <p className="mt-1 font-medium"> {deployDate} </p>
      <p
        className={`absolute top-0 right-0 mt-2 mr-2 font-semibold ${status == 'live' ? 'bg-green-600' : "bg-blue-600"} text-white rounded-lg px-4 py-1`}
      >
        {status.toUpperCase()}
      </p>

      <div className="text-center my-3">
        <Link href={"/view-project/" + data.id} className="bg-orange-800 py-1 px-4 rounded-lg text-white hover:bg-orange-700">
            View Project
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
