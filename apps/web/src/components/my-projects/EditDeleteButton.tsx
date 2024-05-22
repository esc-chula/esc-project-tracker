import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { EllipsisVertical } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { SquarePen, Trash2 } from "lucide-react";

export default function EditDeleteButton() {
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
        <Dialog>
          <DialogTrigger>
            <div className="flex flex-row p-2 space-x-3">
              <SquarePen />
              <div>แก้ไขชื่อเอกสาร</div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>แก้ไขชื่อเอกสาร</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
          <DialogTrigger>
            <div className="flex flex-row p-2 space-x-3">
              <Trash2 />
              <div>ลบเอกสาร</div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>แก้ไขชื่อเอกสาร</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <div className="w-5"></div>
      </PopoverContent>
    </Popover>
  );
}
