'use client';
import { EllipsisVertical, Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import PopoverExitProject from './popoverExitProject';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { projectTypeCodeMap } from '@/src/constant/map';

export default function AllProjectCard({
  projectId,
  projectCode,
  projectName,
  userId,
  leaveThisProjectFunc,
  projectType,
  isJoined,
}: {
  projectId: string;
  projectCode: string;
  projectName: string;
  userId: string;
  leaveThisProjectFunc: (id: string) => void;
  projectType: number;
  isJoined: boolean;
}) {
  const router = useRouter();

  return (
    <div
      className={cn(
        'bg-gray-100',
        'rounded-lg p-5 flex flex-col gap-6',
        'hover:cursor-pointer hover:shadow-2xl duration-300 transition-all',
      )}
      onClick={() => {
        router.push(`/project/${projectId}`);
      }}
    >
      <div
        className="flex justify-between items-start"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex flex-col">
          <div className="text-xl font-semibold text-left">
            {projectCode}
            <div className="text-sm font-normal overflow-hidden whitespace-break-spaces text-ellipsis">
              {projectName}
            </div>
          </div>
        </div>

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

      <div className="flex flex-row justify-between items-center">
        <div className="text-neutral-500 font-normal text-sm">
          โครงการฝ่าย{projectTypeCodeMap[projectType]}
        </div>
        <div className="font-normal text-sm">
          {isJoined ? (
            <span className="text-green-500">เข้าร่วมแล้ว</span>
          ) : (
            <span className="text-rose-500">ยังไม่เข้าร่วม</span>
          )}
        </div>
      </div>
    </div>
  );
}
