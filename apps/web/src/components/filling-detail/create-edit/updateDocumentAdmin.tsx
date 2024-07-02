/* eslint-disable @typescript-eslint/no-unsafe-argument -- Necessary for compatibility with the existing codebase */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- Necessary for compatibility with the existing codebase */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Select,
} from "../../ui/select";
import ButtonPanel from "./buttonPanel";
import FileInputPanel from "./fileInputPanel";
import ActivityPanel from "./activityPanel";
import { checkFileType } from "@/src/lib/utils";
import { useMemo } from "react";

export default function UpdateDocumentAdmin() {
  const createdFormSchema = z.object({
    file: (typeof window === "undefined"
      ? z.any()
      : z.instanceof(FileList)
    ).refine(
      (file) => checkFileType(file[0]),
      "กรุณาเลือกไฟล์ที่มีนามสกุล .docx, .pdf, .doc"
    ),

    activity: z.string().optional(),
    detail: z.string().optional(),
    note: z.string().optional(),
    comment: z.string().optional(),
  });

  const form = useForm<z.infer<typeof createdFormSchema>>({
    resolver: zodResolver(createdFormSchema),
    defaultValues: {
      activity: "",
      detail: "",
      note: "",
      comment: "",
    },
  });

  const fileRef = form.register("file");

  function onSubmit(values: z.infer<typeof createdFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const isDisabled = useMemo(() => form.formState.isSubmitting, [form.formState.isSubmitting])

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-gray-100 rounded-lg font-sukhumvit w-full p-8 flex flex-col text-start"
        >
          <div className="flex flex-row space-x-5">
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
                        className="border-2 rounded-lg p-2 w-[30vw]"
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
                      อัปโหลดเอกสาร
                    </FormLabel>
                    <FileInputPanel fileRef={fileRef} fileList={field.value} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex w-full justify-between space-x-5">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold text-lg block">
                    หมายเหตุ
                  </FormLabel>
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
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-bold text-lg block">
                    ความคิดเห็น
                  </FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="เพิ่มความคิดเห็น"
                      {...field}
                      className="border-2 rounded-lg p-4 w-full h-[20vh] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ButtonPanel isDisabled={isDisabled}/>
        </form>
      </Form>
    </>
  );
}
