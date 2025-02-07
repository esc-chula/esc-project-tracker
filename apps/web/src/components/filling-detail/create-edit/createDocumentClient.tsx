'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import type { DocumentType } from '@/src/interface/document';
import { DocumentActivity, FilingStatus } from '@/src/constant/enum';
import { createdFormSchema } from '@/src/constant/schema';
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

export default function CreateDocumentClient({
  setShowCreateDocument,
  afterCreateDocument,
  filingId,
  projectId,
  status,
  userId,
}: {
  setShowCreateDocument: (showCreateDocument: boolean) => void;
  afterCreateDocument: (createdDocument: DocumentType) => void;
  filingId: string;
  projectId: string;
  status: FilingStatus;
  userId: string;
}) {
  const form = useForm<z.infer<typeof createdFormSchema>>({
    resolver: zodResolver(createdFormSchema),
    defaultValues: {
      activity:
        status === FilingStatus.DRAFT
          ? DocumentActivity.CREATE
          : DocumentActivity.EDIT,
    },
  });

  const fileRef = form.register('file');

  async function onSubmit(values: z.infer<typeof createdFormSchema>) {
    try {
      const newDocument = await submitCreatedFormSchema(
        values,
        projectId,
        filingId,
        userId,
        status,
      );

      afterCreateDocument(newDocument);
      toast({
        title: 'สร้างเอกสารสำเร็จ',
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 bg-gray-100 rounded-lg font-sukhumvit w-full py-8 px-11 flex flex-col text-start"
      >
        <div className="flex flex-row space-x-11 w-full min-h-[216px]">
          <div className="w-full flex-1">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="h-full flex flex-col">
                  <FormLabel className="font-bold text-lg">
                    อัปโหลดเอกสาร<span className="text-red"> *</span>
                  </FormLabel>
                  <FileInputPanel fileRef={fileRef} fileList={field.value} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex-1">
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
        />
      </form>
    </Form>
  );
}
