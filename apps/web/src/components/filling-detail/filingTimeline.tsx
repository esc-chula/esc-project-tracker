"use client"
import getFilingsByUserId from "@/src/service/getFilingsByUserId"
import { FilingStatus } from "@/src/constant/enum"
import { Filing } from "@/src/interface/filing"
import { useToast } from "@/src/components/ui/use-toast"
import { useEffect, useState } from "react"
import DisplayWithNote from "./display/displayWithNote"
import DisplayWithStatus from "./display/displayWithStatus"
import { Clock } from "lucide-react"
import DisplayWithNoteAndStatus from "./display/displayWithNoteAndStatus"
import UpdateDocumentAdmin from "./create-edit/updateDocumentAdmin"
import CreateDocumentAdmin from "./create-edit/createDocumentAdmin"

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
    <div className="flex flex-col items-center gap-7">
      {/* 60+40+(32/2)-(3/2) = 114.5 */}
      <div className="h-[calc(100%-2px)] w-[3px] bg-black absolute left-[114.5px] -z-10 top-[2px] overflow-hidden" />
      <div className="flex w-full pl-10 items-center text-3xl font-semibold">
        <Clock className="w-8 h-8 bg-gray-100 p-1.5 rounded-full mr-5" />
        10 มิ.ย. 67
      </div>
      <DisplayWithNote />
      {/* <div className="flex w-full pl-10 items-center text-3xl font-semibold">
        <Clock className="w-8 h-8 bg-gray-100 p-1.5 rounded-full mr-5" />8 มิ.ย. 67
      </div> */}
      <DisplayWithStatus />
      <DisplayWithNoteAndStatus />
      <CreateDocumentAdmin />
      <UpdateDocumentAdmin />
    </div>
  )
}
