"use client"

import { useState } from "react"
import { Collapsible, CollapsibleTrigger } from "@/src/components/ui/collapsible"
import { CircleUserRound, EllipsisVertical, ChevronDown, ChevronUp } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import Note from "./note"
import NameDate from "./nameDate"
import FileDisplay from "./fileDisplay"
import { Document } from "@/src/interface/document"
import { TextDocumentActivity } from "@/src/styles/enumMap"

export default function DisplayWithNote({ document }: { document: Document }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Collapsible className="bg-gray-100 rounded-lg font-sukhumvit text-xl w-full">
      <div className="flex flex-row px-8">
        <NameDate
          title="นายสมชาย สายชลลลลลลลลลลลลล"
          date={"ส่งเอกสารเมื่อ " + new Date(document.createdAt).toLocaleString("th-TH")}
          activity={TextDocumentActivity[document.activity]}>
          <CircleUserRound size={30} className="shrink-0" />
        </NameDate>

        <div className="py-8 space-y-4 px-8 w-[35vw] grow">
          <div>
            <span className="font-bold">รายละเอียดเอกสาร: </span>
            <span>{document.name}</span>
          </div>
          <div>
            <div className="font-bold text-sm">ไฟล์แนบ</div>
            <div className="flex flex-row py-2 gap-5 flex-wrap">
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
        <div className="py-8 flex flex-col justify-between w-auto items-end">
          <Popover>
            <PopoverTrigger>
              <EllipsisVertical />
            </PopoverTrigger>
            <PopoverContent
              side="left"
              align="start"
              className="w-auto flex flex-col"></PopoverContent>
          </Popover>
          <CollapsibleTrigger
            onClick={() => {
              setExpanded(!expanded)
            }}>
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </CollapsibleTrigger>
        </div>
      </div>
      <Note note={document.detail ?? '-'} />
    </Collapsible>
  )
}
