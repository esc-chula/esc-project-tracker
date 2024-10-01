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
import uploadFileToS3 from '@/src/service/aws/uploadFileToS3';
import createDocument from '@/src/service/document/createDocument';
import { toast } from '../../ui/use-toast';
import { DocumentType } from '@/src/interface/document';
import { zodDocumentAdminFile } from '@/src/constant/schema';

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
  const createdFormSchema = z.object({
    // Server side ไม่รู้จัก FileList ***
    file: zodDocumentAdminFile,
    activity: z.nativeEnum(DocumentActivity, { message: 'กรุณากรอกกิจกรรม' }),
    comment: z.string().optional(),
  });

  const form = useForm<z.infer<typeof createdFormSchema>>({
    resolver: zodResolver(createdFormSchema),
    defaultValues: {
      activity: DocumentActivity.REPLY,
    },
  });

  const fileRef = form.register('file');

  async function onSubmit(values: z.infer<typeof createdFormSchema>) {
    try {
      const pdfFile = values.file[0];
      const folderName = `${projectId}/${filingId}`;

      const pdfName = pdfFile
        ? await uploadFileToS3({ file: pdfFile, folderName })
        : '';

      if (pdfFile && pdfName === '') throw new Error('Upload file failed');

      const newDocument = await createDocument({
        document: {
          name: 'ตอบกลับเอกสาร',
          filingId,
          pdfName: pdfName,
          docName: '',
          activity: values.activity as DocumentActivity,
          userId,
          comment: values.comment,
        },
      });
      afterCreateDocument(newDocument);
      toast({
        title: 'สร้างเอกสารตอบกลับสำเร็จ',
        description: `สร้างเอกสารตอบกลับสำเร็จ`,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'สร้างเอกสารตอบกลับไม่สำเร็จ',
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={DocumentActivity.REPLY}
                      disabled
                    >
                      <ActivityPanel isAdmin />
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex-1">
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
            isDisabled={form.formState.isSubmitting}
            setShowCreateDocument={setShowCreateDocument}
          />
        </form>
      </Form>
    </>
  );
}
