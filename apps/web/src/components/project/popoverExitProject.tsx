'use client';
import { LogOut } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { IoIosAlert } from 'react-icons/io';
import leaveProject from '@/src/service/user-proj/leaveProject';
import { toast } from '../ui/use-toast';

export default function PopoverExitProject({
  projectId,
  userId,
  projectCode,
  deletedParentFunc,
}: {
  projectId: string;
  userId: string;
  projectCode: string;
  deletedParentFunc: (deleted: boolean) => void;
}) {
  const handleLeaveProject = async () => {
    try {
      if (userId && projectId) {
        await leaveProject(userId, projectId);
        toast({
          title: 'สำเร็จ',
          description: `ออกจากโปรเจค ${projectCode} เรียบร้อย`,
          isError: false,
        });
        deletedParentFunc(true);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: 'ไม่สำเร็จ',
          description: err.message,
          isError: true,
        });
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row p-2 space-x-2 hover:cursor-pointer">
          <LogOut />
          <div className="">ออกจากโครงการ</div>
        </div>
      </DialogTrigger>

      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="bg-white rounded-lg space-y-4">
          <div className="flex justify-center">
            <IoIosAlert size={100} className=" text-red" />
          </div>
          <div className="text-center font-sukhumvit font-bold text-xl">
            ยืนยันการออกจากโครงการ
          </div>
          <div className="text-center ">
            <button
              className="bg-red text-white rounded-lg py-1 px-4 font-sukhumvit font-semibold"
              onClick={handleLeaveProject}
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
