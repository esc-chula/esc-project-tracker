"use client";
import { Project } from "@/src/interface/project";
import { ProjectService } from "@/src/service/ProjectService";
import joinProject from "@/src/service/joinProject";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import checkByUserIDAndProjectID from "@/src/service/checkUserProject";

export default function ProjectMenuItem({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { toast } = useToast();
  const userId = "c8b285e0-9653-40d5-9865-def3b4792c99";
  const projectId = "ca09400e-bb9f-48f6-ae9c-a967e8eb2ab8";
  // To do : check if user joined project by init another function to check
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const handleJoinProject = async () => {
    try {
      await joinProject(
        "c8b285e0-9653-40d5-9865-def3b4792c99", // mock userid
        "ca09400e-bb9f-48f6-ae9c-a967e8eb2ab8" // mock projid
      );
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

  const checkUserJoinProject = async (userId: string, projectId: string) => {
    const result = await checkByUserIDAndProjectID(userId, projectId);
    setIsJoined(result);
  };
  useEffect(() => {
    checkUserJoinProject(userId, projectId);
  }, []);

  const buttonStyle = (isJoined: Boolean) => {
    if (isJoined) {
      return "text-[#49E66B] bg-white";
    } else {
      return "bg-red text-white hover:bg-white hover:text-red";
    }
  };
  return (
    <tr className="border-b-2 border-gray-200">
      <td className="p-4 py-5 text-nowrap text-center w-[80px] overflow-hidden text-ellipsis whitespace-nowrap">
        {index}
      </td>
      <td className="p-4 py-5 text-nowrap text-center w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
        {project.projectCode}
      </td>
      <td className="p-4 py-5 text-nowrap max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
        {project.name}
      </td>
      <td className="p-4 py-5 text-nowrap text-center">{project.status}</td>
      <td className="p-4 py-5 text-nowrap text-center">
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
