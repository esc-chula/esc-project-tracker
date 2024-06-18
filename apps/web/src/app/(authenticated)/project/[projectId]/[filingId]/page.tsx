import { Radio } from "lucide-react"
import Header from "@/src/components/header/header"
import Title from "@/src/components/header/title"
import DocumentStatusStepper from "@/src/components/status/StatusStepper"
import { StatusTable } from "@/src/components/status/StatusTable"
import getFilingsByUserId from "@/src/service/getFilingsByUserId"
import { FilingStatus } from "@/src/constant/enum"
import { Filing } from "@/src/interface/filing"
import { useToast } from "@/src/components/ui/use-toast"
import { useEffect, useState } from "react"
import FilingTimeline from "@/src/components/filling-detail/filingTimeline"
import Subtitle from "@/src/components/header/subtitle"

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

        <div className="bg-lightpink flex flex-col pt-12 pb-5 items-center mt-5 w-full">
          <h3 className="mb-8 text-2xl text-intania font-bold">ขั้นตอนการส่งเอกสาร</h3>
          <DocumentStatusStepper status="DEFAULT" />
        </div>
        <FilingTimeline />
      </main>
    </>
  )
}
