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
import FileDisplay from "./fileDisplay";

export default function DisplayWithNote() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Collapsible className="bg-gray-100 rounded-lg font-sukhumvit text-xl w-full">
      <div className="flex flex-row px-8">
        <NameDate
          title="นายสมชาย สายชลลลลลลลลลลลลล"
          date="ส่งเอกสารเมื่อ 41 มิ.ย 2567 14.30.00"
          activity="สร้าง/ แก้ไข"
        >
          <CircleUserRound size={30} />
        </NameDate>

        <div className="py-8 space-y-4 px-8 w-[35vw]">
          <div>
            <span className="font-bold">รายละเอียดเอกสาร: </span>
            <span>ขออนุมัติโครงการ</span>
          </div>
          <div>
            <div className="font-bold text-sm">ไฟล์แนบ</div>
            <div className="flex flex-row py-2 space-x-5">
              <FileDisplay
                fileName="เอกสารสุดยอดสายลับอิอิอิอิอิอิอิอิอิอิvbvbvbvbvbv"
                fileType="pdf"
                link=""
              />
              <FileDisplay
                fileName="เอกสารสุดยอดสายลับอิอิอิอิอิอิอิอิอิอิvbvbvbvbvbv"
                fileType="pdf"
                link=""
              />
            </div>
          </div>
        </div>
        <div className="py-8 flex flex-col justify-between w-[5vw] items-end ml-auto">
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
          <CollapsibleTrigger
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </CollapsibleTrigger>
        </div>
      </div>
      <Note note="cams;cm;as;cnas;nc;asknc;naskcnnckvbkdsbvkbdsvjkbdjkvjkdvbdbvkdfvbjdfvbkdfvbjdfvbjdf vdbfvbdfjvbkbdvjbdfjkvbjdfvjdbvkdvjxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz" />
    </Collapsible>
  );
}
