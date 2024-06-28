import DisplayWithNote from "./display/displayWithNote"
import DisplayWithStatus from "./display/displayWithStatus"
import { Clock } from "lucide-react"
import DisplayWithNoteAndStatus from "./display/displayWithNoteAndStatus"
import UpdateDocumentAdmin from "./create-edit/updateDocumentAdmin"
import CreateDocumentAdmin from "./create-edit/createDocumentAdmin"
import { Document } from "@/src/interface/document"

export default function FilingTimeline({ documents }: { documents: Document[] }) {
  return (
    <div className="flex flex-col items-center gap-7">
      {/* 60+40+(32/2)-(3/2) = 114.5 */}
      <div className="h-[calc(100%-2px)] w-[3px] bg-black absolute left-[114.5px] -z-10 top-[2px] overflow-hidden" />
      <div className="flex w-full pl-10 items-center text-3xl font-semibold">
        <Clock className="w-8 h-8 bg-gray-100 p-1.5 rounded-full mr-5" />
        10 มิ.ย. 67
      </div>
      <DisplayWithNote />
      <DisplayWithStatus />
      <DisplayWithNoteAndStatus />
      <CreateDocumentAdmin />
      <UpdateDocumentAdmin />
    </div>
  )
}
