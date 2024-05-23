"use client";
import { EllipsisVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import PopoverExitProject from "./popoverExitProject";
import { useRouter } from "next/navigation";

export default function AllProjectCard({
  projectId,
  projectCode,
  projectName,
}: {
  projectId: string;
  projectCode: string;
  projectName: string;
}) {
  const router = useRouter();
  return (
    <div
      className="bg-background border-black border-2 rounded-lg space-y-14 p-5 hover:cursor-pointer hover:shadow-2xl duration-300"
      onClick={() => {
        router.push(`/my-projects/${projectId}`);
      }}
    >
      <div
        className="flex justify-end"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Popover>
          <PopoverTrigger>
            <EllipsisVertical />
          </PopoverTrigger>
          <PopoverContent
            side="left"
            align="start"
            className="w-auto flex flex-col"
          >
            <PopoverExitProject />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <div className="text-4xl font-bold text-center">
          {projectCode}
          <div className="font-medium text-base overflow-hidden whitespace-nowrap text-ellipsis">
            {projectName}
          </div>
        </div>
      </div>
    </div>
  );
}
