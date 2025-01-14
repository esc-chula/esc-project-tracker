'use client';
import { useEffect, useState } from 'react';
import { LogIn } from 'lucide-react';
import { BsInfoCircleFill } from 'react-icons/bs';
import Link from 'next/link';
import hasUserProj from '@/src/service/user-proj/hasUserProj';
import joinProject from '@/src/service/user-proj/joinProject';
import type { Project } from '@/src/interface/project';
import { ProjectStatusToThai } from '@/src/constant/translate';
import { toast } from '../ui/use-toast';

export default function ProjectMenuItem({
  project,
  index,
  isAdmin,
  userId,
}: {
  project: Project;
  index: number;
  isAdmin: boolean;
  userId: string;
}) {
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const handleJoinProject = async () => {
    try {
      await joinProject(userId, project.id);
      setIsJoined(true);
      toast({
        title: 'เข้าร่วมสำเร็จ',
        description: `เข้าร่วม ${project.name} สำเร็จ`,
        isError: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'ไม่สำเร็จ',
          description: error.message,
          isError: true,
        });
      }
    }
  };

  const checkUserJoinProject = async (
    inputUserId: string,
    projectId: string,
  ) => {
    const result = await hasUserProj(inputUserId, projectId);
    setIsJoined(result);
  };
  useEffect(() => {
    checkUserJoinProject(userId, project.id);
  }, []);

  const buttonStyle = (joined: boolean) => {
    if (joined) {
      return 'text-accept bg-white';
    }
    return 'bg-red text-white hover:bg-white hover:text-red';
  };
  return (
    <tr className="border-b-2 border-gray-200">
      <td className="p-4 py-5 text-nowrap text-center w-[90px] overflow-hidden text-ellipsis whitespace-nowrap">
        {index}
      </td>
      <td className="p-4 py-5 text-nowrap text-center w-[130px] overflow-hidden text-ellipsis whitespace-nowrap">
        {project.projectCode}
      </td>
      <td className="p-4 py-5 text-nowrap max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
        {isAdmin ? (
          <Link href={`project/${project.id}`}>{project.name}</Link>
        ) : (
          <>{project.name}</>
        )}
      </td>
      <td className="p-4 py-5 text-nowrap text-center w-[180px]">
        {ProjectStatusToThai.get(project.status)}
      </td>
      <td
        className={`${isAdmin ? 'px-10' : 'px-2 '} py-5 text-center w-[20px] hover:cursor-pointer`}
      >
        <Link href={`${isAdmin ? '/admin/' : '/'}project/${project.id}/info`}>
          <BsInfoCircleFill size={15} className="text-red w-[15px] h-[16px]" />
        </Link>
      </td>

      {!isAdmin && (
        <td className="p-4 py-5 text-nowrap text-center w-[150px]">
          <button
            className={`rounded-lg px-2 py-1 ${buttonStyle(isJoined)} transition-all`}
            onClick={handleJoinProject}
            disabled={isJoined}
          >
            {!isJoined && <LogIn size={16} className="mr-2 inline" />}
            {isJoined ? 'เข้าร่วมแล้ว' : 'เข้าร่วม'}
          </button>
        </td>
      )}
    </tr>
  );
}
