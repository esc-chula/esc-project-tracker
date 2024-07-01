"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import NameDate from "./nameDate"
import Image from "next/image"
import StatusButton from "./statusButton"
import { DocumentActivity, FilingStatus } from "@/src/constant/enum"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible"
import { useState } from "react"
import FileDisplay from "./fileDisplay"
import { Document } from "@/src/interface/document"

export default function DisplayWithNoteAndStatus({
  setShowCreateDocument,
  document,
}: {
  setShowCreateDocument: (showCreateDocument: boolean) => void
  document: Document
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="w-full relative">
      {document.activity === DocumentActivity.REPLY && (
        <Image
          src="/icons/warning.svg"
          width={70}
          height={70}
          alt="warning-icon"
          className="transform -translate-x-8 -translate-y-6 absolute"
        />
      )}
      <Collapsible className="bg-gray-100 rounded-lg font-sukhumvit text-xl w-full">
        <div className="flex flex-row px-8">
          <NameDate
            title="Secretary ESC"
            date={"ส่งเอกสารเมื่อ " + new Date(document.createdAt).toLocaleString("th-TH")}
            activity={document.activity}>
            <Image src="/icons/esc-red.svg" width={30} height={30} alt="esc-icon" />
          </NameDate>
          <div className="px-8 py-4 font-bold space-y-4 w-[35vw] grow">
            <div className="font-bold text-sm">ความคิดเห็น</div>
            <textarea
              className="bg-white rounded-lg min-h-[15vh] p-5 font-normal text-gray-600 break-words resize-none w-full text-sm"
              defaultValue={document.detail}></textarea>
          </div>
          <div className="py-8 flex flex-col justify-between w-auto items-end space-y-5">
            <StatusButton
              status={FilingStatus.RETURNED}
              isSubmitAfterReturn={false}
              setShowCreateDocument={setShowCreateDocument}
            />
            <CollapsibleTrigger
              onClick={() => {
                setExpanded(!expanded)
              }}>
              {expanded ? <ChevronUp /> : <ChevronDown />}
            </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent>
          <div className="border-t-2 px-8 py-4 font-bold text-sm flex flex-col space-y-4 ">
            <div>
              <span className="font-bold">รายละเอียดเอกสาร: </span>
              <span className="font-normal">{document.name}</span>
            </div>
            <div className="flex flex-row">
              <div className="space-y-2">
                <div>หมายเหตุ</div>
                <textarea
                  className="w-[40vw] bg-white rounded-lg p-5 font-normal break-words resize-none text-sm text-gray-600 font-sukhumvit h-[20vh]"
                  defaultValue={document.detail}
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
    </div>
  )
}
