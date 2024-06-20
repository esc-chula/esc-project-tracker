"use client"
import { CircleCheck, FileText, Info, Plus, Send, X } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { FilingStatus } from "@/src/constant/enum"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useState } from "react"
import { useToast } from "../ui/use-toast"
import { Filing } from "@/src/interface/filing"
import CreateDocument from "./create-edit/createDocument"
import updateFilingName from "@/src/service/updateFiling"

export default function FilingTimelineHeader({
  name,
  status,
  latestPDFUrl = "#",
  documentFixed = false,
  setStatus,
}: {
  name: string
  status: FilingStatus | "DOCUMENT_CREATED"
  latestPDFUrl?: string
  documentFixed?: boolean
  setStatus: (status: FilingStatus | "DOCUMENT_CREATED") => void
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [showCreateDocument, setShowCreateDocument] = useState<boolean>(false)
  const { toast } = useToast()
  const cancelDocumentSubmission = async () => {
    try {
      // TODO: cancel document submission
      const data = await updateFilingName({
        filingId: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a",
        filingName: name,
      })
      if (data) {
        setStatus(FilingStatus.DRAFT)
        setIsOpen(false)
        toast({
          title: "ยกเลิกสำเร็จ",
          description: "ยกเลิกการส่งเอกสารสำเร็จ",
          isError: false,
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "ไม่สำเร็จ",
          description: error.message,
          isError: true,
        })
      }
    }
  }
  const submitDocument = async () => {
    try {
      // TODO: call api to submit document
      const data = await updateFilingName({
        filingId: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a",
        filingName: name,
      })
      if (data) {
        setStatus(FilingStatus.WAIT_FOR_SECRETARY)
        toast({
          title: "สำเร็จ",
          description: "ส่งเอกสารสำเร็จ",
          isError: false,
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "ไม่สำเร็จ",
          description: error.message,
          isError: true,
        })
      }
    }
  }
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          <h4 className="font-semibold text-2xl">{name}</h4>
        </span>
        <span className="flex gap-5">
          {status === FilingStatus.APPROVED ? (
            <>
              <Link href={latestPDFUrl}>
                <Button className="mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold bg-red text-white">
                  <Info className="h-8 w-8 mr-2" />
                  อ่าน
                </Button>
              </Link>
              <Button className="pointer-events-none mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold bg-accepted text-white">
                <CircleCheck className="h-8 w-8 mr-2" />
                สำเร็จ
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              disabled={
                status === FilingStatus.WAIT_FOR_SECRETARY ||
                status === FilingStatus.WAIT_FOR_STUDENT_AFFAIR
              }
              onClick={() => {
                setShowCreateDocument(true)
              }}
              className="mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] text-red font-semibold border-red disabled:bg-lightgray disabled:text-white disabled:border-none">
              <Plus className="h-8 w-8 mr-2" />
              เพิ่ม
            </Button>
          )}
          {status === FilingStatus.WAIT_FOR_SECRETARY ? (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold border-black">
                  <X className="h-8 w-8 mr-2" />
                  ยกเลิก
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-semibold text-2xl">ยกเลิกการส่งเอกสาร</DialogTitle>
                </DialogHeader>
                <div className="bg-white rounded-lg space-y-4">
                  ยกเลิกการส่งเอกสารเพื่อเปลี่ยนแปลงข้อมูล โปรดอย่าลืมส่งอีกครั้งเมื่อดำเนินการเสร็จ
                  <div className="text-end">
                    <button
                      className="bg-red text-white rounded-lg py-1 px-4 font-semibold"
                      onClick={cancelDocumentSubmission}>
                      ยืนยัน
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Button
              disabled={
                status === FilingStatus.DRAFT ||
                (status === FilingStatus.RETURNED && !documentFixed) ||
                status === FilingStatus.WAIT_FOR_STUDENT_AFFAIR
              }
              onClick={submitDocument}
              className="disabled:bg-lightgray mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold bg-red text-white">
              <Send className="h-8 w-8 mr-2" />
              ส่ง
            </Button>
          )}
        </span>
      </div>
      {showCreateDocument && (
        <div className="px-15 w-full">
          <CreateDocument />
        </div>
      )}
    </>
  )
}
