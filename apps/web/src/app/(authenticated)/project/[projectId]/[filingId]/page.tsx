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

export default function Page({ params }: { params: { projectId: string; filingId: string } }) {
  const [filing, setFiling] = useState<
    (Omit<Filing, "status"> & { status: FilingStatus | "DOCUMENT_CREATED" }) | null
  >(null)
  const { toast } = useToast()
  useEffect(() => {
    const fetchFiling = async () => {
      try {
        const data = await getFilingByFilingId("d1c0d106-1a4a-4729-9033-1b2b2d52e98a")
        // getAllDocumentsByFilingId("d1c0d106-1a4a-4729-9033-1b2b2d52e98a")
        setFiling(data)
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
    fetchFiling()
  }, [])
  return (
    <main className="w-full pt-[68px]">
      <div className="pl-15 pr-5">
        <Header>
          <Subtitle project="9011" filing={"9011-1234"} projectId={params.projectId} />
        </Header>
      </div>

      <section className="flex flex-col pt-5 pb-7 items-center mt-5 w-full">
        <h3 className="mb-8 text-2xl font-bold">สถานะเอกสารปัจจุบัน</h3>
        <DocumentStatusStepper status={"DOCUMENT_CREATED"} />
      </section>
      <section className="mb-12 px-15">
        <FilingTimelineHeader
          name="9035-0001 เปิดโครงการ"
          status={"DOCUMENT_CREATED"}
          setStatus={(status) => {
            setFiling((prev) => (prev ? { ...prev, status } : null))
          }}
        />
      </section>
      <section className="px-15 mt-12 relative">
        <FilingTimeline />
      </section>
    </main>
  )
}
