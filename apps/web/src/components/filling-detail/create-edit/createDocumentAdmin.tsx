/* eslint-disable @typescript-eslint/no-unsafe-argument -- Necessary for compatibility with the existing codebase */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- Necessary for compatibility with the existing codebase */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Select } from '../../ui/select';
import ButtonPanel from './buttonPanel';
import FileInputPanel from './fileInputPanel';
import ActivityPanel from './activityPanel';
import { DocumentActivity } from '@/src/constant/enum';
import { toast } from '../../ui/use-toast';
import { DocumentType } from '@/src/interface/document';
import { createdDocumentAdminSchema } from '@/src/constant/schema';
import submitCreatedFormSchema from '@/src/lib/submitCreatedFormSchema';

export default function CreateDocumentAdmin({
  setShowCreateDocument,
  afterCreateDocument,
  filingId,
  projectId,
  userId,
}: {
  setShowCreateDocument: (showCreateDocument: boolean) => void;
  afterCreateDocument: (createdDocument: DocumentType) => void;
  filingId: string;
  projectId: string;
  userId: string;
}) {
  const form = useForm<z.infer<typeof createdDocumentAdminSchema>>({
    resolver: zodResolver(createdDocumentAdminSchema),
    defaultValues: {},
  });
  const fileRef = form.register('file');
  const activityWatch = form.watch('activity');

  async function onSubmit(values: z.infer<typeof createdDocumentAdminSchema>) {
    try {
      if (values.activity === DocumentActivity.REPLY)
        values.detail = 'ตอบกลับเอกสาร';
      const newDocument = await submitCreatedFormSchema(
        { ...values, detail: values.detail ?? 'ตอบกลับเอกสาร' },
        projectId,
        filingId,
        userId,
      );

      afterCreateDocument(newDocument);
      toast({
        title: 'สร้างเอกสารสำเร็จ',
        description: `สร้างเอกสารสำเร็จ`,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'สร้างเอกสารไม่สำเร็จ',
          description: error.message,
          isError: true,
        });
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-gray-100 rounded-lg font-sukhumvit w-full p-8 flex flex-col text-start"
        >
          <div className="flex flex-row space-x-5">
            <div className="flex flex-col space-y-8 flex-1">
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
            </div>
            <div className="w-full flex-1">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="h-full flex flex-col">
                    <FormLabel className="font-bold text-lg ">
                      อัปโหลดเอกสาร
                      {activityWatch === DocumentActivity.EDIT ? (
                        <span className="text-red">*</span>
                      ) : null}
                    </FormLabel>
                    <FileInputPanel fileRef={fileRef} fileList={field.value} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex w-full justify-between space-x-5">
            {activityWatch === DocumentActivity.EDIT ? (
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
            ) : null}
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
          <ButtonPanel
            isDisabled={form.formState.isSubmitting}
            setShowCreateDocument={setShowCreateDocument}
          />
        </form>
      </Form>
    </>
  );
}
