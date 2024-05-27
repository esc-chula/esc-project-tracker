import { EllipsisVertical, SquarePen } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function PopoverEditDocument() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row p-2 space-x-3 hover:cursor-pointer">
          <SquarePen />
          <div className="">แก้ไขชื่อเอกสาร</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>แก้ไขชื่อเอกสาร</DialogTitle>
        </DialogHeader>
        <div className="bg-white rounded-lg space-y-4">
          <input
            type="text"
            placeholder="ชื่อเอกสารเดิม"
            className="border-black border-2 w-full p-2 rounded-lg"
          ></input>
          <div className="text-end">
            <button className="bg-red text-white rounded-lg py-1 px-4 font-sukhumvit font-semibold">
              ยืนยัน
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
