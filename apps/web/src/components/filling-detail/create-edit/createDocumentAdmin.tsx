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
import { zodDocumentFiles } from '@/src/lib/utils';
import { useMemo } from 'react';
import { DocumentActivity } from '@/src/constant/enum';
import uploadFileToS3 from '@/src/service/aws/uploadFileToS3';
import createDocument from '@/src/service/document/createDocument';
import { toast } from '../../ui/use-toast';
import { DocumentType } from '@/src/interface/document';

export default function CreateDocumentAdmin({
  setShowCreateDocument,
  afterCreateDocument,
  filingId,
  projectId,
}: {
  setShowCreateDocument: (showCreateDocument: boolean) => void;
  afterCreateDocument: (createdDocument: DocumentType) => void;
  filingId: string;
  projectId: string;
}) {
  const createdFormSchema = z.object({
    // Server side ไม่รู้จัก FileList ***
    // TODO: set file to optional
    file: zodDocumentFiles,
    activity: z.nativeEnum(DocumentActivity, { message: 'กรุณากรอกกิจกรรม' }),
    comment: z.string().optional(),
  });

  const form = useForm<z.infer<typeof createdFormSchema>>({
    resolver: zodResolver(createdFormSchema),
    defaultValues: {
      comment: '',
    },
  });

  const isDisabled = useMemo(
    () => form.formState.isSubmitting,
    [form.formState.isSubmitting],
  );

  const fileRef = form.register('file');

  async function onSubmit(values: z.infer<typeof createdFormSchema>) {
    // TODO: change to actual userId
    try {
      const pdfFile = values.file[0];
      const folderName = `${projectId}/${filingId}`;

      const pdfName = await uploadFileToS3({ file: pdfFile, folderName });

      if (!pdfName) throw new Error('Upload file failed');

      const newDocument = await createDocument({
        document: {
          name: 'ตอบกลับเอกสาร',
          filingId,
          pdfName: pdfName,
          docName: '',
          activity: values.activity as DocumentActivity,
          userId: 'd1c0d106-1a4a-4729-9033-1b2b2d52e98a',
          comment: values.comment,
        },
      });
      afterCreateDocument(newDocument);
      toast({
        title: 'สร้างเอกสารสำเร็จ',
        description: `สร้างเอกสาร ${newDocument.name} สำเร็จ`,
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
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
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
          <ButtonPanel
            isDisabled={isDisabled}
            setShowCreateDocument={setShowCreateDocument}
          />
        </form>
      </Form>
    </>
  );
}
