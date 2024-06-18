import { FileText, Info, Plus } from "lucide-react"
import Header from "@/src/components/header/header"
import Title from "@/src/components/header/title"
import DocumentStatusStepper from "@/src/components/status/StatusStepper"
import { StatusTable } from "@/src/components/status/StatusTable"
import { FilingStatus } from "@/src/constant/enum"
import { Filing } from "@/src/interface/filing"
import FilingTimeline from "@/src/components/filling-detail/filingTimeline"
import Subtitle from "@/src/components/header/subtitle"
import { Button } from "@/src/components/ui/button"

export default async function Page({
  params,
}: {
  params: { projectId: string; filingId: string }
}) {
  // TODO: Change the userId to the actual userId

  return (
    <>
      <main className="w-full pt-[68px]">
        <div className="pl-15 pr-5">
          <Header>
            <Subtitle project="9011" filing="9011-1234" projectId={params.projectId} />
          </Header>
        </div>

        <div className="flex flex-col pt-5 pb-5 items-center mt-5 w-full">
          <h3 className="mb-8 text-2xl font-bold">สถานะเอกสารปัจจุบัน</h3>
          <DocumentStatusStepper status={FilingStatus.APPROVED} />
        </div>
        <div className="px-15 flex items-center justify-between gap-3">
          <span className="flex">
            <FileText className="w-6 h-6 mr-2" />
            <h4 className="font-semibold text-2xl">9035-0001 เปิดโครงการ</h4>
          </span>
          <span className="flex">
            <Button
              variant="outline"
              className="mx-auto rounded-2xlg text-2xl pl-3 pr-4 py-4 h-[52px] text-red font-semibold border-red disabled:bg-lightgray disabled:text-white disabled:border-none">
              <Plus className="h-8 w-8 mr-1" />
              เพิ่ม
            </Button>
            <Button className="mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold bg-red text-white">
              <Info className="h-8 w-8 mr-1" />
              อ่าน
            </Button>
          </span>
        </div>
        <FilingTimeline />
      </main>
    </>
  )
}
