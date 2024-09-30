'use client';
import { IoReturnUpBack } from 'react-icons/io5';
import { useEffect, useMemo, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import FileInputPanel from '../../filling-detail/create-edit/fileInputPanel';
import ButtonPanel from '../../filling-detail/create-edit/buttonPanel';
import { z } from 'zod';
import { zodDocumentAdminFile } from '@/src/constant/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { getFileType } from '@/src/lib/utils';
import uploadFileToS3 from '@/src/service/aws/uploadFileToS3';
import createDocument from '@/src/service/document/createDocument';
import { toast } from '../../ui/use-toast';
import {
  DocumentActivity,
  DocumentStatus,
  FilingStatus,
} from '@/src/constant/enum';
import ReviewSubmitButton from './review-submit-button';
import FilingReplyAfterSubmit from './filing-reply-after-submit';
import findLatestReplyDocumentByFilingId from '@/src/service/document/findLatestReplyDocumentByFilingId';
import findLatestDocumentByFilingId from '@/src/service/document/findLatestDocumentByFilingId';
import { DocumentType } from '@/src/interface/document';

export default function FilingReplyComment({
  isPending,
  filingStatus,
  filingId,
  projectId,
  newDocumentName,
  newDocumentDetail,
  setShowComment,
}: {
  isPending: boolean;
  filingStatus: FilingStatus;
  filingId: string;
  projectId: string;
  newDocumentName: string;
  newDocumentDetail: string;
  setShowComment: (value: boolean) => void;
}) {
  const [isPendingSubmitted, setIsPendingSubmitted] = useState<boolean>(false);
  const [isPendingReviewed, setIsPendingReviewed] = useState<boolean>(false);
  const [latestReplyDocumentId, setLatestReplyDocumentId] =
    useState<string>('');
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [document, setDocument] = useState<DocumentType | null>(null);
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>(
    DocumentStatus.WAIT_FOR_SECRETARY,
  );

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
        }
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: `ดึงเอกสาร ID ${filingId} ไม่สำเร็จ`,
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

  async function onSubmit(values: z.infer<typeof createdFormSchema>) {
    // TODO: change to actual userId
    var fileName = '';
    try {
      if (values.file[0]) {
        const swap = getFileType(values.file[0]) !== 'pdf';
        const pdfFile = values.file[swap ? 1 : 0];
        const docFile = values.file[swap ? 0 : 1];
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

      const newDocument = await createDocument({
        document: {
          name: newDocumentName,
          filingId,
          pdfName: fileName,
          docName: '',
          activity: DocumentActivity.REPLY,
          status: DocumentStatus.DRAFT,
          // TODO change to actual userId
          userId: 'd1c0d106-1a4a-4729-9033-1b2b2d52e98a',
          detail: newDocumentDetail,
          comment: values.comment,
        },
      });
      setLatestReplyDocumentId(newDocument.id);
      setIsPendingSubmitted(true);
      setDocument(newDocument);

      toast({
        title: 'แก้ไขเอกสารสำเร็จ',
        description: `แก้ไขเอกสาร ${newDocument.name} สำเร็จ`,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'แก้ไขเอกสารไม่สำเร็จ',
          description: error.message,
          isError: true,
        });
      }
    }
  }

  useEffect(() => {
    console.log('documentStatus from comment:', documentStatus);
  }, [documentStatus]);

  if (!isFetched) {
    return;
  }

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex justify-between w-full items-center">
        <div className="font-bold text-xl">
          <IoReturnUpBack className="h-8 w-8 mr-2 inline-block" />
          ตอบกลับ
        </div>
        {isPending && !isPendingReviewed && (
          <ReviewSubmitButton
            isSubmitted={isPendingSubmitted}
            latestReplyDocumentId={latestReplyDocumentId}
            setIsPendingReviewed={setIsPendingReviewed}
            setDocumentStatus={setDocumentStatus}
          />
        )}
      </div>

      {(isPending && isPendingSubmitted) || !isPending ? (
        <FilingReplyAfterSubmit
          filingId={filingId}
          documentStatus={documentStatus}
          document={document}
          folderName={`${projectId}/${filingId}`}
        />
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
