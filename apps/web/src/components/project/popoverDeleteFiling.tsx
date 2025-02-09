'use client';

import { Trash2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { IoIosAlert } from 'react-icons/io';
import deleteFiling from '@/src/service/filing/deleteFiling';
import { toast } from '../ui/use-toast';

export default function PopoverDeleteFiling({
  filingId,
  setDeletedParentFunc,
  iconOnly = false,
}: {
  filingId: string;
  setDeletedParentFunc: (deleted: boolean) => void;
  iconOnly?: boolean;
}) {
  const submitDelete = async () => {
    try {
      const data = await deleteFiling(filingId);
      if (data) {
        toast({
          title: 'ลบสำเร็จ',
          description: `เอกสารหมายเลข ${data.projectCode} - ${data.filingCode} ถูกลบเรียบร้อยแล้ว`,
        });
        setDeletedParentFunc(true);
      }
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row p-2 space-x-3 hover:cursor-pointer">
          <Trash2 />
          {iconOnly ? null : <div className="">ลบเอกสาร</div>}
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
            ยืนยันการลบเอกสาร
          </div>
          <div className="text-center ">
            <button
              className="bg-red text-white rounded-lg py-1 px-4 font-sukhumvit font-semibold"
              onClick={submitDelete}
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
