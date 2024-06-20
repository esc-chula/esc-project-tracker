"use client";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/src/components/ui/collapsible";
import {
  CircleUserRound,
  EllipsisVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FaFile } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import Note from "./note";
import NameDate from "./nameDate";

export default function DisplayWithNote() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Collapsible className="bg-gray-100 rounded-lg font-sukhumvit w-[70vw] text-xl">
      <div className="flex flex-row px-8 ">
        <NameDate
          title="นายสมชาย สายชลลลลลลลลลลลลล"
          date="ส่งเอกสารเมื่อ 41 มิ.ย 2567 14.30.00"
          activity="สร้าง/ แก้ไข"
        >
          <CircleUserRound size={30} />
        </NameDate>

        <div className="py-8 space-y-4 px-8">
          <div>
            <span className="font-bold">รายละเอียดเอกสาร: </span>
            <span>ขออนุมัติโครงการ</span>
          </div>
          <div>
            <div className="font-bold text-sm">ไฟล์แนบ</div>
            <div className="flex flex-row py-2 space-x-5">
              <div className="w-60 bg-white border-black p-2 rounded-lg border-2 flex flex-row space-x-2 items-center hover:scale-105 transition duration-300 hover:cursor-pointer">
                <FaFile size={20} style={{ color: "skyblue" }} />
                <div className="text-xs">
                  <div className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis w-48 ">
                    เอกสารสุดยอดสายลับอิอิอิอิอิอิอิอิอิอิvbvbvbvbvbv
                  </div>
                  <div className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis w-48">
                    .PDF
                  </div>
                </div>
              </div>
              <div className="w-60 bg-white border-black p-2 rounded-lg border-2 flex flex-row space-x-2 items-center hover:scale-105 transition duration-300 hover:cursor-pointer">
                <FaFile size={20} style={{ color: "orange" }} />
                <div className="text-xs">
                  <div className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis w-48">
                    เอกสารสุดยอดสายลับอิอิอิอิอิอิอิอิอิอิvbvbvbvbvbv
                  </div>
                  <div className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis w-48">
                    .PDF
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-8 flex flex-col justify-between ml-auto">
          <Popover>
            <PopoverTrigger>
              <EllipsisVertical />
            </PopoverTrigger>
            <PopoverContent
              side="left"
              align="start"
              className="w-auto flex flex-col"
            ></PopoverContent>
          </Popover>
          <CollapsibleTrigger onClick={() => {setExpanded(!expanded)}}>
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </CollapsibleTrigger>
        </div>
      </div>
      <Note note="cams;cm;as;cnas;nc;asknc;naskcnnckvbkdsbvkbdsvjkbdjkvjkdvbdbvkdfvbjdfvbkdfvbjdfvbjdf vdbfvbdfjvbkbdvjbdfjkvbjdfvjdbvkdvjxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz" />
    </Collapsible>
  );
}
