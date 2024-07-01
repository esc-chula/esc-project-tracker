"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Select } from "../../ui/select"
import ButtonPanel from "./buttonPanel"
import FileInputPanel from "./fileInputPanel"
import ActivityPanel from "./activityPanel"
import { Document } from "@/src/interface/document"
import createDocument from "@/src/service/createDocument"
import { DocumentActivity } from "@/src/constant/enum"

function checkFileType(file: File) {
  if (file === undefined) return false

  if (file?.name) {
    const fileType = file.name.split(".").pop()
    if (fileType === "docx" || fileType === "pdf" || fileType === "doc") return true
  }

  return false
}

export default function CreateDocumentClient({
  setShowCreateDocument,
  afterCreateDocument,
  filingId,
}: {
  setShowCreateDocument: (showCreateDocument: boolean) => void
  afterCreateDocument: (createdDocument: Document) => void
  filingId: string
}) {
  const createdFormSchema = z.object({
    // Server side ไม่รู้จัก FileList ***
    file: (typeof window === "undefined" ? z.any() : z.instanceof(FileList))
      .refine((file) => file?.length == 1, "กรุณาเลือกไฟล์")
      .refine((file) => checkFileType(file[0]), "กรุณาเลือกไฟล์ที่มีนามสกุล .docx, .pdf, .doc"),

    activity: z.string().optional(),
    detail: z.string().min(1, { message: "กรุณากรอกรายละเอียด" }),
    note: z.string().optional(),
  })

  const form = useForm<z.infer<typeof createdFormSchema>>({
    resolver: zodResolver(createdFormSchema),
    defaultValues: {
      activity: "",
      detail: "",
      note: "",
    },
  })

  const fileRef = form.register("file")

  async function onSubmit(values: z.infer<typeof createdFormSchema>) {
    console.log(values)
    // upload file
    // then createDocument
    const newDocument = await createDocument(
      values.detail,
      filingId,
      "https://www.google.com",
      "https://www.google.com",
      values.activity as DocumentActivity,
      values.note
    )
    afterCreateDocument(newDocument)
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-gray-100 rounded-lg font-sukhumvit w-full p-8 flex flex-col text-start">
          <div className="flex flex-row space-x-5 w-full">
            <div className="flex flex-col space-y-8">
              <FormField
                control={form.control}
                name="activity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      กิจกรรม<span className="text-red">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <ActivityPanel />
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="detail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg block">
                      {"รายละเอียดเอกสาร (ชื่อเรื่องที่ระบุในเอกสาร)"}
                      <span className="text-red">*</span>
                    </FormLabel>
                    <FormControl>
                      <input
                        placeholder="ใส่หัวข้อเอกสาร"
                        {...field}
                        className="border-2 rounded-lg p-1 px-4 w-[38vw] flex items-center"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="h-full flex flex-col">
                    <FormLabel className="font-bold text-lg ">
                      อัปโหลดเอกสาร<span className="text-red">*</span>
                    </FormLabel>
                    <FileInputPanel fileRef={fileRef} fileList={field.value} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-lg block">หมายเหตุ</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="หมายเหตุ"
                    {...field}
                    className="border-2 rounded-lg p-4 w-full h-[20vh] resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ButtonPanel setShowCreateDocument={setShowCreateDocument} />
        </form>
      </Form>
    </>
  )
}
