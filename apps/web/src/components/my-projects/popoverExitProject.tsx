import { LogOut } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { IoIosAlert } from "react-icons/io";

export default function PopoverExitProject() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row p-2 space-x-3 hover:cursor-pointer">
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
            <button className="bg-red text-white rounded-lg py-1 px-4 font-sukhumvit font-semibold">
              ยืนยัน
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}