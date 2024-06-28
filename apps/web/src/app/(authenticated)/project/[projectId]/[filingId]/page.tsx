"use client"

import Header from "@/src/components/header/header"
import DocumentStatusStepper from "@/src/components/status/StatusStepper"
import { FilingStatus } from "@/src/constant/enum"
import { Filing } from "@/src/interface/filing"
import FilingTimeline from "@/src/components/filling-detail/filingTimeline"
import Subtitle from "@/src/components/header/subtitle"
import getFilingByFilingId from "@/src/service/getFilingByFilingId"
import { useEffect, useState } from "react"
import { useToast } from "@/src/components/ui/use-toast"
import FilingTimelineHeader from "@/src/components/filling-detail/filingTimelineHeader"
import getDocumentsByFilingId from "@/src/service/getDocumentsByFilingId"
import { Document } from "@/src/interface/document"

export default function Page({ params }: { params: { projectId: string; filingId: string } }) {
  const [filing, setFiling] = useState<
    (Omit<Filing, "status"> & { status: FilingStatus | "DOCUMENT_CREATED" }) | null
  >(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const { toast } = useToast()
  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: Change the userId to the actual userId
        const [filingData, documentsData] = await Promise.all([
          getFilingByFilingId("d1c0d106-1a4a-4729-9033-1b2b2d52e98a"),
          getDocumentsByFilingId("d1c0d106-1a4a-4729-9033-1b2b2d52e98a"),
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
          <Subtitle project="9011" filing={"9011-1234"} projectId={params.projectId} />
        </Header>
      </div>

      <section className="flex flex-col mb-7 items-center mt-10 w-full">
        <h3 className="mb-8 text-2xl font-bold">สถานะเอกสารปัจจุบัน</h3>
        <DocumentStatusStepper status={"DOCUMENT_CREATED"} />
      </section>
      <section className="px-15 mb-7">
        <FilingTimelineHeader
          name="9035-0001 เปิดโครงการ"
          status={"DOCUMENT_CREATED"}
          setStatus={(status) => {
            setFiling((prev) => (prev ? { ...prev, status } : null))
          }}
        />
      </section>
      <section className="px-15 relative">
        <FilingTimeline documents={documents} status={"DOCUMENT_CREATED"} />
      </section>
    </main>
  )
}
