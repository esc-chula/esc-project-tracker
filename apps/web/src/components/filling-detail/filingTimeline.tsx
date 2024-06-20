"use client"
import getFilingsByUserId from "@/src/service/getFilingsByUserId"
import { FilingStatus } from "@/src/constant/enum"
import { Filing } from "@/src/interface/filing"
import { useToast } from "@/src/components/ui/use-toast"
import { useEffect, useState } from "react"
import DisplayWithNote from "./display/displayWithNote"
import DisplayWithStatus from "./display/displayWithStatus"

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
    <div className="flex flex-col items-center px-15 space-y-7 mt-12">
      <DisplayWithNote />
      <DisplayWithStatus />
    </div>
  )
}
