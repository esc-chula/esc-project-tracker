'use client';
import { EllipsisVertical, Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import PopoverExitProject from './popoverExitProject';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AllProjectCard({
  projectId,
  projectCode,
  projectName,
  userId,
  leaveThisProjectFunc,
}: {
  projectId: string;
  projectCode: string;
  projectName: string;
  userId: string;
  leaveThisProjectFunc: (id: string) => void;
}) {
  const router = useRouter();

  return (
    <div
      className="bg-background border-black border-2 rounded-lg space-y-14 p-5 hover:cursor-pointer hover:shadow-2xl duration-300"
      onClick={() => {
        router.push(`/project/${projectId}`);
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
            className="w-auto flex flex-col shadow-[0_4px_4px_2px_rgba(0,0,0,0.25)]"
          >
            <Link href={`/project/${projectId}/info`} target="_blank">
              <div className="flex flex-row p-2 space-x-2 hover:cursor-pointer">
                <Info className="w-6 h-6" />
                <div className="">รายละเอียด</div>
              </div>
            </Link>
            <PopoverExitProject
              userId={userId}
              projectId={projectId}
              projectCode={projectCode}
              deletedParentFunc={() => {
                leaveThisProjectFunc(projectId);
              }}
            />
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
