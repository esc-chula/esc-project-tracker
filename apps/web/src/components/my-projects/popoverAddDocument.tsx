import { Trash2, SquarePen } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { IoIosAlert } from "react-icons/io";
import { HiDocumentAdd } from "react-icons/hi";

export default function PopoverAddDocument() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center text-red hover:cursor-pointer">
          <HiDocumentAdd size={30} />
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>เอกสารใหม่</DialogTitle>
        </DialogHeader>
        <div className="bg-white rounded-lg space-y-7">
          <input
            type="text"
            placeholder="ชื่อเอกสาร"
            className="border-black border-2 w-full p-2 rounded-lg"
          ></input>

          <div className="font-sukhumvit font-semibold">
            ประเภทเอกสาร *
            <select
              id="documentType"
              className="border-black border-2 w-full p-2 rounded-lg"
            >
              <option value="1">0 เอกสารเปิดโครง</option>
              <option value="2">1 เอกสารเปิดโครง</option>
              <option value="3">2 เอกสารเปิดโครง</option>
            </select>
          </div>
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
