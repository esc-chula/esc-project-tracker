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

export default function PopoverAddDocument({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <div className="flex items-center text-red hover:cursor-pointer">
            <HiDocumentAdd size={30} />
          </div>
        )}
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
              <option value="10">10 โครงการฝ่ายกิจการภายใน</option>
              <option value="11">11 โครงการฝ่ายศิลปะและวัฒนธรรม</option>
              <option value="12">12 โครงการฝ่ายกีฬา</option>
              <option value="20">20 โครงการฝ่ายกิจการภายนอก</option>
              <option value="30">30 โครงการฝ่ายนิสิตสัมพันธ์</option>
              <option value="40">
                40 โครงการฝ่ายพัฒนาสังคมและบำเพ็ญประโยชน์
              </option>
              <option value="50">50 โครงการฝ่ายพัฒนาองค์กร</option>
              <option value="60">60 โครงการฝ่ายสนับสนุน</option>
              <option value="70">70 โครงการฝ่ายสื่อสารองค์กร</option>
              <option value="80">80 โครงการอื่นๆของกวศ</option>
              <option value="90">90 โครงการฝ่ายวิชาการ</option>
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
