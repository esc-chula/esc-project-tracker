"use client";
import { ProjectType } from "@/src/interface/project";
import { ProjectService } from "@/src/service/ProjectService";
import joinProject from "@/src/service/joinProject";
import { useState } from "react";

export default function ProjectMenuItem({
  project,
  index,
}: {
  project: ProjectType;
  index: number;
}) {
  // To do : check if user joined project by init another function to check
  // onClick function for join
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const handleJoinProject = async () => {
    try {
      await joinProject("@userId", "@projectId");
      setIsJoined(true);
    } catch (e) {
      console.log(e);
      throw new Error("cannot join project");
    }
  };

  //function for check if user already joined project
  const checkUserJoinProject = async () => {};

  const buttonStyle = (isJoined: Boolean) => {
    if (isJoined) {
      return "text-[#49E66B] bg-white";
    } else {
      return "bg-red text-white hover:bg-white hover:text-red";
    }
  };
  return (
    <div className="w-full grid grid-cols-7 border-b-2 border-gray-300">
      <div className="flex items-center text-center justify-center p-5 px-8">
        {index}
      </div>
      <div className="flex items-center text-center justify-center p-5 px-8">
        {project.projectCode}
      </div>
      <div className="col-span-3 flex items-center text-center justify-start p-5 pl-12 px-8">
        {project.name}
      </div>
      <div className="flex items-center text-center justify-center p-5 px-8">
        {project.status}
      </div>
      <div className="flex items-center text-center justify-center p-5 px-8">
        <button
          className={`rounded-lg px-2 py-1 ${buttonStyle(isJoined)} transition-all`}
          onClick={handleJoinProject}
          disabled={isJoined}
        >
          {isJoined ? "เข้าร่วมแล้ว" : "เข้าร่วม"}
        </button>
      </div>
    </div>
  );
}
