'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import React, { useEffect } from 'react';
import { DocumentActivity, DocumentStatus, FilingStatus } from '@repo/shared';
import type { Document } from '@/src/interface/document';
import { createdDocumentAdminSchema } from '@/src/constant/schema';
import submitCreatedFormSchema from '@/src/lib/submitCreatedFormSchema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { toast } from '../../ui/use-toast';
import ButtonPanel from './buttonPanel';
import FileInputPanel from './fileInputPanel';

export default function CreateDocumentAdmin({
  setShowCreateDocument,
  afterCreateDocument,
  filingId,
  projectId,
  userId,
  updateMode = false,
}: {
  setShowCreateDocument?: (showCreateDocument: boolean) => void;
  afterCreateDocument: (createdDocument: Document) => void;
  filingId: string;
  projectId: string;
  userId: string;
  updateMode?: boolean;
}) {
  const form = useForm<z.infer<typeof createdDocumentAdminSchema>>({
    resolver: zodResolver(createdDocumentAdminSchema),
    defaultValues: {
      activity: DocumentActivity.REPLY,
    },
  });
  const fileRef = form.register('file');

  async function onSubmit(
    values: z.infer<typeof createdDocumentAdminSchema>,
    updatedStatus: DocumentStatus,
  ) {
    try {
      const newDocument = await submitCreatedFormSchema(
        values,
        projectId,
        filingId,
        userId,
        updatedStatus === DocumentStatus.APPROVED
          ? FilingStatus.APPROVED
          : FilingStatus.RETURNED,
        updatedStatus,
      );

      afterCreateDocument(newDocument);
      toast({
        title: 'ตอบกลับเอกสารสำเร็จ',
        description: `${updatedStatus === DocumentStatus.APPROVED ? 'อนุมัติ' : 'ตีกลับ'}เอกสารสำเร็จ`,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'ตอบกลับเอกสารไม่สำเร็จ',
          description: error.message,
          isError: true,
        });
      }
    }
  }

  useEffect(() => {
    form.reset();
  }, [filingId]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(values, DocumentStatus.APPROVED),
        )}
        className="space-y-5 bg-gray-100 rounded-lg font-sukhumvit w-full py-8 px-11 flex flex-col text-start"
      >
        <div className="flex flex-row space-x-11 w-full min-h-[216px]">
          {/* <div className="flex flex-col space-y-8 flex-1">
              <FormField
                control={form.control}
                name="activity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      กิจกรรม<span className="text-red">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <ActivityPanel isAdmin />
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {activityWatch === DocumentActivity.EDIT ? (
                <FormField
                  control={form.control}
                  name="detail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg block">
                        {'รายละเอียดเอกสาร (ชื่อเรื่องที่ระบุในเอกสาร)'}
                        <span className="text-red">*</span>
                      </FormLabel>
                      <FormControl>
                        <input
                          placeholder="ใส่หัวข้อเอกสาร"
                          {...field}
                          className="border-2 rounded-lg p-1 px-4 w-full flex items-center"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}
            </div> */}
          <div className="w-full flex-1">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="h-full flex flex-col">
                  <FormLabel className="font-bold text-lg">
                    อัปโหลดเอกสาร
                  </FormLabel>
                  <FileInputPanel fileRef={fileRef} fileList={field.value} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex-1">
            {/* {activityWatch === DocumentActivity.EDIT ? (
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
            ) : null} */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="h-full flex flex-col">
                  <FormLabel className="font-bold text-lg">
                    ความคิดเห็น
                  </FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="เพิ่มความคิดเห็น"
                      {...field}
                      className="border-1 border-black rounded-lg p-4 w-full resize-none basis-[152px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <ButtonPanel
          isDisabled={form.formState.isSubmitting}
          setShowCreateDocument={setShowCreateDocument}
          handleAlternateSubmit={
            updateMode
              ? undefined
              : form.handleSubmit((values) =>
                  onSubmit(values, DocumentStatus.RETURNED),
                )
          }
        />
      </form>
    </Form>
  );
}
