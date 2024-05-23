import { EllipsisVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.tsx";
import PopoverEditDocument from "./PopoverEditDocument.tsx";
import PopoverDeleteDocument from "./popoverDeleteDocument.tsx";

export default function AllDocumentCard() {
  return (
    <div className="bg-background shadow-xl rounded-lg space-y-14 pt-2">
      <div className="flex justify-end">
        <Popover>
          <PopoverTrigger>
            <EllipsisVertical />
          </PopoverTrigger>
          <PopoverContent
            side="left"
            align="start"
            className="w-auto flex flex-col"
          >
            <PopoverEditDocument />
            <PopoverDeleteDocument />
          </PopoverContent>
        </Popover>
      </div>
      <div className="text-2xl font-bold text-center">ตัวอย่างเอกสาร</div>
      <div className="bg-[#E3E3E3] p-3 space-y-2 rounded-lg">
        <div className="text-2xl font-bold text-start">
          9090-3013
          <div className="font-medium text-sm overflow-hidden whitespace-nowrap text-ellipsis">
            โครงการของฉันหหหหหหacscascssssssssssssss
          </div>
        </div>
        <div className="inline-block bg-[#49E66B] rounded-lg text-white text-center py-1 px-5 text-sm font-semibold min-w-[70%]">
          ฉบับร่าง
        </div>
      </div>
    </div>
  );
}
