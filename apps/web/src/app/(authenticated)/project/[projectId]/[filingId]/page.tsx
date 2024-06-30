"use client"

import Header from "@/src/components/header/header"
import DocumentStatusStepper from "@/src/components/status/StatusStepper"
import { FilingStatus, ProjectStatus, ProjectType } from "@/src/constant/enum"
import { Filing } from "@/src/interface/filing"
import FilingTimeline from "@/src/components/filling-detail/filingTimeline"
import Subtitle from "@/src/components/header/subtitle"
import getFilingByFilingId from "@/src/service/getFilingByFilingId"
import { useEffect, useState } from "react"
import { useToast } from "@/src/components/ui/use-toast"
import FilingTimelineHeader from "@/src/components/filling-detail/filingTimelineHeader"
import getDocumentsByFilingId from "@/src/service/getDocumentsByFilingId"
import { Document } from "@/src/interface/document"
import { DocumentActivity } from "../../../../../../../api/src/constant/enum"

const mockFiling: Omit<Filing, "status"> & {
  status: FilingStatus | "DOCUMENT_CREATED"
} = {
  id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a",
  status: FilingStatus.RETURNED,
  name: "Filing 1 eridsjbpsf'jmvs;bfkdjpoijvnkdlfmxfspoeofjpas;wegmvjgodiff;j",
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
}

export const mockDocument = {
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

export default function Page({ params }: { params: { projectId: string; filingId: string } }) {
  const [filing, setFiling] = useState<
    (Omit<Filing, "status"> & { status: FilingStatus | "DOCUMENT_CREATED" }) | null
  >(mockFiling)
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const { toast } = useToast()
  useEffect(() => {
    // TODO: split to 2 async functions
    const fetchData = async () => {
      try {
        const [filingData, documentsData] = await Promise.all([
          getFilingByFilingId(params.filingId),
          getDocumentsByFilingId(params.filingId),
        ])
        if (filingData) setFiling(filingData)
        if (documentsData) setDocuments(documentsData)
      } catch (err) {
        if (err instanceof Error) {
          toast({
            title: "ไม่สำเร็จ",
            description: err.message,
            isError: true,
          })
        }
      }
    }
    fetchData()
  }, [])
  return (
    <main className="w-full pt-[68px]">
      <div className="pl-15 pr-5">
        <Header>
          <Subtitle
            project={filing ? filing.projectCode : "..."}
            filing={
              filing ? filing.projectCode + "-" + filing.FilingCode + " " + filing.name : "..."
            }
            projectId={params.projectId}
          />
        </Header>
      </div>
      <section className="flex flex-col mb-7 items-center mt-10 w-full">
        <h3 className="mb-8 text-2xl font-bold">สถานะเอกสารปัจจุบัน</h3>
        <DocumentStatusStepper status={filing?.status ?? "DEFAULT"} />
      </section>
      <section className="px-15 mb-7">
        <FilingTimelineHeader
          name={filing ? filing.projectCode + "-" + filing.FilingCode + " " + filing.name : "..."}
          status={filing?.status ?? FilingStatus.DRAFT}
          latestPDFUrl={documents[0]?.pdfLink ?? "#"}
          setStatus={(status) => {
            setFiling((prev) => (prev ? { ...prev, status } : null))
          }}
          setDocuments={setDocuments}
          filingId={params.filingId}
        />
      </section>

      <section className="px-15 relative">
        <FilingTimeline documents={documents} status={filing?.status ?? FilingStatus.DRAFT} />
      </section>
    </main>
  )
}
