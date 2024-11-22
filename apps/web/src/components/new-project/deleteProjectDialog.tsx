'use client';
import { IoIosAlert } from 'react-icons/io';
import { RiDeleteBinFill } from 'react-icons/ri';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import deleteProject from '@/src/service/project/deleteProject';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from '../ui/use-toast';

export default function DeleteProjectDialog({
  projectId,
}: {
  projectId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const onClickDeleteProject = async () => {
    await deleteProject(projectId)
      .then((project) => {
        toast({
          title: 'ลบโครงการสำเร็จ',
          description: `ลบโครงการ ${project?.projectCode} ${project?.name} เรียบร้อยแล้ว`,
          isError: false,
        });
        //TODO: back to admin projects path
        const redirectPath = pathname.includes('admin')
          ? '/admin/projects'
          : '/projects';
        router.push(redirectPath);
      })
      .catch((err) => {
        if (err instanceof Error) {
          toast({
            title: 'ลบโครงการไม่สำเร็จ',
            description: err.message,
            isError: true,
          });
        }
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-2 rounded-full bg-white flex items-center justify-center hover:cursor-pointer hover:scale-105 duration-75">
          <RiDeleteBinFill size={20} className="text-red" />
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
            ยืนยันการลบโครงการ
          </div>
          <div className="text-center ">
            <button
              className="bg-red text-white rounded-lg py-1 px-4 font-sukhumvit font-semibold"
              onClick={() => {
                onClickDeleteProject();
              }}
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
