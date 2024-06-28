import DisplayWithNote from "./display/displayWithNote"
import DisplayWithStatus from "./display/displayWithStatus"
import { Clock } from "lucide-react"
import DisplayWithNoteAndStatus from "./display/displayWithNoteAndStatus"
import UpdateDocumentAdmin from "./create-edit/updateDocumentAdmin"
import CreateDocumentAdmin from "./create-edit/createDocumentAdmin"
import { Document } from "@/src/interface/document"
import { FilingStatus, ProjectStatus, ProjectType } from "@/src/constant/enum"
import { DocumentActivity } from "../../../../api/src/constant/enum"

export default function FilingTimeline({
  documents,
  status,
}: {
  documents: Document[]
  status: FilingStatus | "DOCUMENT_CREATED"
}) {
  const mockDocument = {
    id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a",
    filing: {
      id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a",
      status: FilingStatus.DRAFT,
      name: "Filing 1 weosiyfgowausyh ngcfowauy afgseahgesrytedgsetyh",
      projectCode: "1001",
      FilingCode: "9001",
      type: 9,
      user: {},
      project: {
        id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a",
        status: ProjectStatus.CONTINUE,
        name: "Project 1 weosiyfgowausyh ngcfowauy afgseahgesrytedgsetyh",
        projectCode: "1001",
        type: ProjectType.ACADEMICS_AFFAIR,
        detail: "Project 1 details weosiyfgowausyh ngcfowauy afgseahgesrytedgsetyh",
        reserveDate: new Date("2021-08-01T19:11:00").toString(),
        createdAt: new Date("2021-08-01T19:11:00").toString(),
        updatedAt: new Date("2021-08-01T19:11:00").toString(),
      },
      createdAt: new Date("2021-08-01T19:11:00").toString(),
      updatedAt: new Date("2021-08-01T19:11:00").toString(),
    },
    name: "เอกสาร 1",
    activity: DocumentActivity.CREATE,
    detail: "เอกสารนี้เป็นเอกสารที่สร้างใหม่",
    pdfLink: "https://www.google.com",
    docLink: "https://www.google.com",
    createdAt: new Date("2021-08-01T19:11:00").toString(),
    updatedAt: new Date("2021-08-01T19:11:00").toString(),
  }
  const mockDocuments: Document[] = [
    {
      ...mockDocument,
      createdAt: new Date("2024-06-28T19:11:00").toString(),
      activity: DocumentActivity.EDIT,
    },
    {
      ...mockDocument,
      createdAt: new Date("2024-06-11T19:11:00").toString(),
      activity: DocumentActivity.REPLY,
    },
    { ...mockDocument, createdAt: new Date("2024-06-11T19:11:00").toString() },
    { ...mockDocument, createdAt: new Date("2024-06-11T19:11:00").toString() },
    { ...mockDocument, createdAt: new Date("2024-06-10T19:11:00").toString() },
  ]
  let previousDate = ""
  return (
    <div className="flex flex-col items-center gap-7">
      {/* 60+40+(32/2)-(3/2) = 114.5 */}
      {mockDocuments && (
        <div className="h-[calc(100%-2px)] w-[3px] bg-black absolute left-[114.5px] -z-10 top-[2px] overflow-hidden" />
      )}
      {mockDocuments.map((document, index) => {
        const currentDate = new Date(document.createdAt).toLocaleDateString("th-TH", {
          year: "2-digit",
          month: "short",
          day: "numeric",
        })
        const display =
          document.activity === DocumentActivity.REPLY ? (
            <DisplayWithStatus />
          ) : index === 0 && status === "DOCUMENT_CREATED" ? (
            <DisplayWithNote />
          ) : (
            <DisplayWithNoteAndStatus />
          )
        if (currentDate !== previousDate) {
          previousDate = currentDate
          return (
            <>
              <div className="flex w-full pl-10 items-center text-3xl font-semibold">
                <Clock className="w-8 h-8 bg-gray-100 p-1.5 rounded-full mr-5" />
                {currentDate}
              </div>
              {display}
            </>
          )
        }
        return display
      })}
      <div className="flex w-full pl-10 items-center text-3xl font-semibold">
        <Clock className="w-8 h-8 bg-gray-100 p-1.5 rounded-full mr-5" />
        10 มิ.ย. 67
      </div>
      <CreateDocumentAdmin />
      <UpdateDocumentAdmin />
    </div>
  )
}
