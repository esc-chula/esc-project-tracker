"use client";
import { EllipsisVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.tsx";
import PopoverEditDocument from "./popoverEditDocument.tsx";
import PopoverDeleteDocument from "./popoverDeleteDocument.tsx";
import { useRouter } from "next/navigation";
import { FillingStatus } from "@/src/constant/enum.ts";
import { buttonColors, TextMyProject } from "@/src/constant/enumMap.ts";

export default function AllDocumentCard({
  fillingId,
  fillingCode,
  fillingName,
  fillingStatus,
}: {
  fillingId: string;
  fillingCode: string;
  fillingName: string;
  fillingStatus: FillingStatus;
}) {
  const router = useRouter();

  return (
    <div className="bg-background shadow-xl rounded-lg space-y-14 pt-2 hover:cursor-pointer hover:shadow-2xl duration-300">
      <div
        className="flex justify-end p-2 py-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
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
          {fillingCode}
          <div className="font-medium text-sm overflow-hidden whitespace-nowrap text-ellipsis">
            {fillingName}
          </div>
        </div>
        <div
          className={`inline-block rounded-lg text-center py-1 px-3 text-sm font-bold font-sukhumvit min-w-[60%] ${buttonColors[fillingStatus]}`}
        >
          {TextMyProject[fillingStatus]}
        </div>
      </div>
    </div>
  );
}
