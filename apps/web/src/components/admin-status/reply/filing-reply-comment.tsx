'use client';
import { IoReturnUpBack } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { FilingStatus, DocumentStatus } from '@repo/shared';
import findLatestReplyDocumentByFilingId from '@/src/service/document/findLatestReplyDocumentByFilingId';
import type { Document } from '@/src/interface/document';
import { getUserId } from '@/src/service/auth';
import { toast } from '../../ui/use-toast';
import CreateDocumentAdmin from '../../filling-detail/create-edit/createDocumentAdmin';
import FilingReplyAfterSubmit from './filing-reply-after-submit';

export default function FilingReplyComment({
  isPending,
  filingStatus,
  filingId,
  projectId,
  documentCode,
  setFilingReviewed,
}: {
  isPending: boolean;
  filingStatus: FilingStatus;
  filingId: string;
  projectId: string;
  documentCode: string;
  setFilingReviewed: (value: string) => void;
}) {
  const [isPendingSubmitted, setIsPendingSubmitted] = useState<boolean>(false);
  const [isPendingReviewed, setIsPendingReviewed] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [document, setDocument] = useState<Document | null>(null);
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>(
    DocumentStatus.WAIT_FOR_SECRETARY,
  );
  const [isEditingAfterSubmit, setIsEditingAfterSubmit] =
    useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    setIsFetched(false);
    const fetchDocuments = async () => {
      try {
        // latest reply document
        const docs = await findLatestReplyDocumentByFilingId(filingId);
        if (docs) {
          setIsPendingSubmitted(true);
          setDocument(docs);
          setDocumentStatus(docs.status);
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

    if (filingStatus !== FilingStatus.WAIT_FOR_SECRETARY && filingId !== '') {
      void fetchDocuments();
    } else {
      void getUserId().then((id) => {
        setUserId(id);
      });
      setIsPendingSubmitted(false);
      setDocument(null);
      setIsFetched(true);
    }
  }, [filingId, isPending]);

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
          ตอบกลับ
        </div>
      </div>

      {(isPending && isPendingSubmitted) || !isPending ? (
        <FilingReplyAfterSubmit
          documentCode={documentCode}
          documentStatus={documentStatus}
          folderName={`${projectId}/${filingId}`}
          document={document}
          isPendingReviewed={isPendingReviewed}
          setIsSubmitted={setIsPendingSubmitted}
          setIsEditingAfterSubmit={setIsEditingAfterSubmit}
        />
      ) : (
        <CreateDocumentAdmin
          afterCreateDocument={(createdDocument) => {
            setDocument(createdDocument);
            setIsEditingAfterSubmit(false);
            setIsPendingSubmitted(true);
            setIsPendingReviewed(true);
            setDocumentStatus(createdDocument.status);
          }}
          filingId={filingId}
          projectId={projectId}
          userId={userId}
        />
      )}
    </div>
  );
}
