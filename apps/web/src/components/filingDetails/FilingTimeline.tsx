"use client"
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
import DisplayWithNote from "../filling-detail/display/displayWithNote"
import DisplayWithStatus from "../filling-detail/display/displayWithStatus"
import CreateDocument from "../filling-detail/create-edit/createDocument"

export default function FilingTimeline() {
  // TODO: Change the userId to the actual userId
  const { toast } = useToast()
  const [statuses, setStatuses] = useState<Filing[]>([])

  useEffect(() => {
    const fetchFiling = async () => {
      try {
        const data = await getFilingsByUserId("d1c0d106-1a4a-4729-9033-1b2b2d52e98a")
        setStatuses(data)
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
    <div className="justify-center flex flex-col items-center p-5 space-y-5">
      <DisplayWithNote />
      <DisplayWithStatus />
      <CreateDocument />
    </div>
  )
}
