"use client";
import { Project } from "@/src/interface/project";
import { ProjectService } from "@/src/service/ProjectService";
import joinProject from "@/src/service/joinProject";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

export default function ProjectMenuItem({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { toast } = useToast();
  // To do : check if user joined project by init another function to check
  // onClick function for join
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const handleJoinProject = async () => {
    try {
      await joinProject("@userId", "@projectId");
      setIsJoined(true);
      toast({
        title: "เข้าร่วมสำเร็จ",
        description: `เข้าร่วม ${project.name} สำเร็จ`,
        isError: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "ไม่สำเร็จ",
          description: error.message,
          isError: true,
        });
      }
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
    // <div className="w-full grid grid-cols-7 border-b-2 border-gray-300">
    //   <div className="flex items-center text-center justify-center p-5 px-8">
    //     {index}
    //   </div>
    //   <div className="flex items-center text-center justify-center p-5 px-8">
    //     {project.projectCode}
    //   </div>
    //   <div className="col-span-3 flex items-center text-center justify-start p-5 pl-12 px-8">
    //     {project.name}
    //   </div>
    //   <div className="flex items-center text-center justify-center p-5 px-8">
    //     {project.status}
    //   </div>
    //   <div className="flex items-center text-center justify-center p-5 px-8">
    //     <button
    //       className={`rounded-lg px-2 py-1 ${buttonStyle(isJoined)} transition-all`}
    //       onClick={handleJoinProject}
    //       disabled={isJoined}
    //     >
    //       {isJoined ? "เข้าร่วมแล้ว" : "เข้าร่วม"}
    //     </button>
    //   </div>
    // </div>

    <tr className="border-b-2 border-gray-200">
      <td className="px-8 py-5 text-nowrap">{index}</td>
      <td className="p-4 py-5 text-nowrap">{project.projectCode}</td>
      <td className="p-4 py-5 text-nowrap">{project.name}</td>
      <td className="p-4 py-5 text-nowrap">{project.status}</td>
      <td className="p-4 py-5 text-nowrap">
        <button
          className={`rounded-lg px-2 py-1 ${buttonStyle(isJoined)} transition-all`}
          onClick={handleJoinProject}
          disabled={isJoined}
        >
          {isJoined ? "เข้าร่วมแล้ว" : "เข้าร่วม"}
        </button>
      </td>
    </tr>
  );
}
