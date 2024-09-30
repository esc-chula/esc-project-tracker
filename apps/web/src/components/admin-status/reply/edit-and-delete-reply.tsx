'use client';

// TODO ทำ toast โดยบอกรหัสของเอกสาร

import { EllipsisVertical } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../../ui/dialog';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { IoIosAlert } from 'react-icons/io';
import { toast } from '../../ui/use-toast';
import deleteDocument from '@/src/service/document/deleteDocument';

export default function EditAndDeleteReply({
  documentId,
  sentIsSubmitted,
}: {
  documentId: string;
  sentIsSubmitted: (val: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDeleteButton = async () => {
    try {
      await deleteDocument(documentId);
      toast({
        title: 'ลบการตอบกลับของเอกสารสำเร็จ',
        description: 'การตอบกลับของเอกสารถูกลบแล้ว',
        isError: false,
      });
      sentIsSubmitted(false);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'ลบการตอบกลับของเอกสารไม่สำเร็จ',
          description: error.message,
          isError: true,
        });
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <EllipsisVertical />
      </PopoverTrigger>
      <PopoverContent
        side="left"
        align="start"
        className="w-auto flex flex-col"
      >
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="flex gap-2">ลบ</DialogTrigger>
          <DialogContent className="max-w-sm">
            <div className="bg-white rounded-lg space-y-4">
              <div className="flex justify-center">
                <IoIosAlert size={100} className=" text-red" />
              </div>
              <div className="text-center font-sukhumvit font-bold text-xl">
                ยืนยันการลบการตอบกลับ
              </div>
              <div className="text-center">
                <DialogClose
                  className="disabled:bg-disabled bg-red text-white rounded-lg py-1 px-4 font-sukhumvit font-semibold"
                  onClick={handleDeleteButton}
                >
                  ยืนยัน
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </PopoverContent>
    </Popover>
  );
}
