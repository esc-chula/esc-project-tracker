"use client";

import { Trash2, SquarePen } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { IoIosAlert } from "react-icons/io";
import deleteFiling from "@/src/service/deleteFiling";

export default function PopoverDeleteDocument({
  filingId,
  setDeletedParentFunc,
}: {
  filingId: string;
  setDeletedParentFunc: (deleted: boolean) => void;
}) {
  const submitDelte = async () => {
    const data = await deleteFiling(filingId);
    if (data) {
      alert("ลบเอกสารสำเร็จ");
      setDeletedParentFunc(true);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row p-2 space-x-3 hover:cursor-pointer">
          <Trash2 />
          <div className="">ลบเอกสาร</div>
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
              onClick={submitDelte}
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
