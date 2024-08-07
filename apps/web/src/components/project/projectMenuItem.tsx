'use client';
import { useEffect, useState } from 'react';
import { LogIn } from 'lucide-react';
import { BsInfoCircleFill } from 'react-icons/bs';
import hasUserProj from '@/src/service/hasUserProj';
import joinProject from '@/src/service/joinProject';
import type { Project } from '@/src/interface/project';
import { useToast } from '../ui/use-toast';
import Link from 'next/link';

export default function ProjectMenuItem({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { toast } = useToast();

  // To do : check if user joined project by init another function to check
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const handleJoinProject = async () => {
    try {
      await joinProject(
        'd1c0d106-1a4a-4729-9033-1b2b2d52e98a', // mock userid
        project.id,
      );
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

  const checkUserJoinProject = async (userId: string, projectId: string) => {
    const result = await hasUserProj(userId, projectId);
    setIsJoined(result);
  };
  useEffect(() => {
    checkUserJoinProject('d1c0d106-1a4a-4729-9033-1b2b2d52e98a', project.id);
  }, []);

  const buttonStyle = (joined: boolean) => {
    if (joined) {
      return 'text-[#49E66B] bg-white';
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
        {project.name}
      </td>
      <td className="p-4 py-5 text-nowrap text-center w-[180px]">
        {project.status}
      </td>
      <td className="px-2 py-5 text-center w-[20px] hover:cursor-pointer">
      <Link href={`/project/${project.id}/info`}>
        <BsInfoCircleFill
          size={15}
          className="text-red w-[15px] h-[16px]"
        />
      </Link>
      </td>
      <td className="p-4 py-5 text-nowrap text-center w-[150px]">
        <button
          className={`rounded-lg px-2 py-1 ${buttonStyle(isJoined)} transition-all`}
          onClick={handleJoinProject}
          disabled={isJoined}
        >
          {isJoined ? null : <LogIn size={16} className="mr-2 inline" />}
          {isJoined ? 'เข้าร่วมแล้ว' : 'เข้าร่วม'}
        </button>
      </td>
    </tr>
  );
}
