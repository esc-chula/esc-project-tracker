'use client';
import { IoReturnUpBack } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { zodDocumentAdminFile } from '@/src/constant/schema';
import { getFileType } from '@/src/lib/utils';
import uploadFileToS3 from '@/src/service/aws/uploadFileToS3';
import createDocument from '@/src/service/document/createDocument';
import type { FilingStatus } from '@/src/constant/enum';
import { DocumentActivity, DocumentStatus } from '@/src/constant/enum';
import findLatestReplyDocumentByFilingId from '@/src/service/document/findLatestReplyDocumentByFilingId';
import type { Document } from '@/src/interface/document';
import updateDocument from '@/src/service/document/updateDocument';
import { toast } from '../../ui/use-toast';
import ButtonPanel from '../../filling-detail/create-edit/buttonPanel';
import FileInputPanel from '../../filling-detail/create-edit/fileInputPanel';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import FilingReplyAfterSubmitEditing from './filing-reply-after-submit-editing';
import FilingReplyAfterSubmit from './filing-reply-after-submit';
import ReviewSubmitButton from './review-submit-button';
import { getUserId } from '@/src/service/auth';

export default function FilingReplyComment({
  isPending,
  filingStatus,
  filingId,
  projectId,
  newDocumentName,
  newDocumentDetail,
  documentCode,
  setShowComment,
  setFilingReviewed,
}: {
  isPending: boolean;
  filingStatus: FilingStatus;
  filingId: string;
  projectId: string;
  newDocumentName: string;
  newDocumentDetail: string;
  documentCode: string;
  setShowComment: (value: boolean) => void;
  setFilingReviewed: (value: string) => void;
}) {
  const [isPendingSubmitted, setIsPendingSubmitted] = useState<boolean>(false);
  const [isPendingReviewed, setIsPendingReviewed] = useState<boolean>(false);
  const [latestReplyDocumentId, setLatestReplyDocumentId] =
    useState<string>('');
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [document, setDocument] = useState<Document | null>(null);
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>(
    DocumentStatus.WAIT_FOR_SECRETARY,
  );
  const [isEditedDocument, setIsEditedDocument] = useState<boolean>(false);
  const [isEditingAfterSubmit, setIsEditingAfterSubmit] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // latest reply document
        const docs = await findLatestReplyDocumentByFilingId(filingId);
        if (docs) {
          setIsPendingSubmitted(true);
          setDocument(docs);
          setLatestReplyDocumentId(docs.id);
          setDocumentStatus(docs.status);

          if (docs.activity === DocumentActivity.EDIT) {
            setIsEditedDocument(true);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: `ดึงข้อมูลการตอบกลับของเอกสาร ${documentCode} ไม่สำเร็จ`,
            description: error.message,
            isError: true,
          });
        }
      } finally {
        setIsFetched(true);
      }
    };

    if (filingId) {
      fetchDocuments();
    }
  }, [filingId, isPending]);

  //FORM ========================================
  const createdFormSchema = z.object({
    file: zodDocumentAdminFile.optional(),
    comment: z.string().optional(),
  });

  const form = useForm<z.infer<typeof createdFormSchema>>({
    resolver: zodResolver(createdFormSchema),
  });

  const fileRef = form.register('file');

  useEffect(() => {
    if (isEditingAfterSubmit) {
      form.setValue('comment', document?.comment);
    }
  }, [isEditingAfterSubmit]);

  async function onSubmit(values: z.infer<typeof createdFormSchema>) {
    let fileName = '';
    try {
      const files: FileList = values.file;
      if (files[0]) {
        const swap = getFileType(files[0]) !== 'pdf';
        const pdfFile = files[swap ? 1 : 0];
        const docFile = files[swap ? 0 : 1];
        const folderName = `${projectId}/${filingId}`;

        const [pdfName, docName] = await Promise.all([
          uploadFileToS3({
            file: pdfFile,
            folderName,
          }),
          docFile &&
            uploadFileToS3({
              file: docFile,
              folderName,
            }),
        ]);
        if (!pdfName || (docFile && !docName))
          throw new Error('Upload file failed');
        fileName = pdfName;
      }

      if (isEditingAfterSubmit) {
        const updatedDocument = await updateDocument({
          docId: document?.id || '',
          obj: {
            comment: values.comment,

            // case ที่ไม่อัพไฟล์ใหม่
            pdfName: files[0] ? fileName : document?.pdfName,
          },
        });
        setDocument(updatedDocument);
      } else {
        const userId = await getUserId();
        const newDocument = await createDocument({
          document: {
            name: newDocumentName,
            filingId,
            pdfName: fileName,
            docName: '',
            activity: DocumentActivity.REPLY,
            status: DocumentStatus.DRAFT,
            userId,
            detail: newDocumentDetail,
            comment: values.comment,
          },
        });
        setLatestReplyDocumentId(newDocument.id);
        setDocument(newDocument);
      }
      setIsEditingAfterSubmit(false);
      setIsPendingSubmitted(true);

      toast({
        title: 'บันทึกการตอบกลับของเอกสารสำเร็จ',
        description: `บันทึกการตอบกลับของเอกสาร ${documentCode} สำเร็จ`,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'บันทึกการตอบกลับเอกสารไม่สำเร็จ',
          description: error.message,
          isError: true,
        });
      }
    }
  }

  useEffect(() => {
    if (isPendingReviewed) {
      setFilingReviewed(filingId);
    }
  }, [isPendingReviewed]);
  if (!isFetched) {
    return;
  }

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex justify-between w-full items-center">
        <div className="font-bold text-xl">
          <IoReturnUpBack className="h-8 w-8 mr-2 inline-block" />
          {isEditedDocument ? 'การแก้ไข' : 'ตอบกลับ'}
        </div>
        {isPending && !isPendingReviewed ? (
          <ReviewSubmitButton
            isSubmitted={isPendingSubmitted}
            latestReplyDocumentId={latestReplyDocumentId}
            setIsPendingReviewed={setIsPendingReviewed}
            setDocumentStatus={setDocumentStatus}
          />
        ) : null}
      </div>

      {(isPending && isPendingSubmitted) || !isPending ? (
        <>
          {isEditedDocument ? (
            <FilingReplyAfterSubmitEditing
              documentStatus={documentStatus}
              document={document}
              folderName={`${projectId}/${filingId}`}
            />
          ) : (
            <FilingReplyAfterSubmit
              documentCode={documentCode}
              documentStatus={documentStatus}
              folderName={`${projectId}/${filingId}`}
              document={document}
              isPendingReviewed={isPendingReviewed}
              setIsSubmitted={setIsPendingSubmitted}
              setIsEditingAfterSubmit={setIsEditingAfterSubmit}
            />
          )}
        </>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-lightgray rounded-xl font-sukhumvit w-full px-5 pt-5 pb-3 flex text-start flex-col space-y-3"
          >
            <div className="flex flex-row justify-between">
              <div className="w-[45%] justify-between space-x-5">
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-bold text-sm block">
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
              <div className="w-[45%]">
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem className="h-full flex flex-col">
                      <FormLabel className="font-bold text-sm ">
                        อัปโหลดเอกสาร
                      </FormLabel>
                      <FileInputPanel
                        fileRef={fileRef}
                        fileList={field.value}
                        fileName={document?.pdfName}
                        fileType="pdf"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <ButtonPanel
                isDisabled={form.formState.isSubmitting}
                setShowCreateDocument={setShowComment}
              />
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
