"use client";

import { ChevronDown, ChevronUp, CircleUserRound } from "lucide-react";
import NameDate from "./nameDate";
import Image from "next/image";
import StatusButton from "./statusButton";
import { FilingStatus } from "@/src/constant/enum";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";
import { FaFile } from "react-icons/fa6";
import { useState } from "react";
import Note from "./note";
import FileDisplay from "./fileDisplay";

export default function DisplayWithNoteAndStatus() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Collapsible className="bg-gray-100 rounded-lg font-sukhumvit text-xl w-full">
      <div className="flex flex-row px-8">
        <NameDate
          title="Secretary ESC"
          date="ส่งเอกสารเมื่อ 41 มิ.ย 2567 14.30.00"
          activity="สร้าง/ แก้ไข"
        >
          <Image
            src="/icons/esc-red.svg"
            width={30}
            height={30}
            alt="esc-icon"
          />
        </NameDate>
        <div className="px-8 py-4 font-bold space-y-4 w-[35vw] grow">
          <div className="font-bold text-sm">ความคิดเห็น</div>
          <textarea
            className="bg-white rounded-lg min-h-[15vh] p-5 font-normal text-gray-600 break-words resize-none w-full text-sm"
            defaultValue="smclmsdcvms;dvsdmvdsnvnfvjndsknvkdnvkdnvksdnvksdnvksdnvk
"
          ></textarea>
        </div>
        <div className="py-8 flex flex-col justify-between w-auto items-end space-y-5">
          <StatusButton
            status={FilingStatus.RETURNED}
            isSubmitAfterReturn={false}
          />
          <CollapsibleTrigger
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent>
        <div className="border-t-2 px-8 py-4 font-bold text-sm flex flex-col space-y-4 ">
          <div>
            <span className="font-bold">รายละเอียดเอกสาร: </span>
            <span className="font-normal">ขออนุมัติโครงการ</span>
          </div>
          <div className="flex flex-row">
            <div className="space-y-2">
              <div>หมายเหตุ</div>
              <textarea
                className="w-[40vw] bg-white rounded-lg p-5 font-normal break-words resize-none text-sm text-gray-600 font-sukhumvit h-[20vh]"
                defaultValue="cascascasc"
              />
            </div>
            <div className="pl-5 flex flex-col justify-around">
              <div>ไฟล์แนบ</div>
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
      </CollapsibleContent>
    </Collapsible>
  );
}
