import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../../ui/dialog';
import { EllipsisVertical, Trash2 } from 'lucide-react';
import { IoIosAlert } from 'react-icons/io';
import { MouseEvent } from 'react';

export default function DraftDocumentPopover({
  isOpen,
  setIsOpen,
  handleDeleteButton,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleDeleteButton: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
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
          <DialogTrigger className="flex gap-2">
            <Trash2 />
            ลบ
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <div className="bg-white rounded-lg space-y-4">
              <div className="flex justify-center">
                <IoIosAlert size={100} className=" text-red" />
              </div>
              <div className="text-center font-sukhumvit font-bold text-xl">
                ยืนยันการลบเอกสารฉบับร่าง
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
