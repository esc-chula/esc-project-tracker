'use client';
import { CirclePlus, FileText } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { DocumentStatus, FilingStatus } from '@/src/constant/enum';
import updateFilingName from '@/src/service/filing/updateFiling';
import type { DocumentType } from '@/src/interface/document';
import updateDocument from '@/src/service/document/updateDocument';
import reviewSubmission from '@/src/service/document/reviewSubmission';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import CreateDocumentClient from './create-edit/createDocumentClient';
import FilingTimelineHeaderApproved from './filingTimelineHeaderApproved';
import CreateDocumentAdmin from './create-edit/createDocumentAdmin';
import UpdateDocumentAdmin from './create-edit/updateDocumentAdmin';
import ReviewButton from './header/reviewButton';
import SubmissionButton from './header/submissionButton';
import CancelSubmissionButton from './header/cancelSubmissionButton';
import AddDocumentButton from './header/addDocumentButton';

export default function FilingTimelineHeader({
  name,
  status,
  documents,
  latestDocument,
  setStatus,
  setDocuments,
  filingId,
  projectId,
  showCreateDocument,
  setShowCreateDocument,
  userId,
  isAdmin = false,
}: {
  name: string;
  status: FilingStatus;
  documents: DocumentType[];
  latestDocument: DocumentType | null;
  setStatus: (_: FilingStatus) => void;
  setDocuments: Dispatch<SetStateAction<DocumentType[]>>;
  filingId: string;
  projectId: string;
  showCreateDocument: boolean;
  setShowCreateDocument: (showCreateDocument: boolean) => void;
  userId: string;
  isAdmin?: boolean;
}) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [reviewButton, setReviewButton] = useState<string>('อนุมัติ');

  const updateDocumentStatuses = async (
    prevDocuments: DocumentType[],
    fromStatus: DocumentStatus,
    toStatus: DocumentStatus,
  ) => {
    // update doc statuses
    let isEndFlag = false;
    const documentsPromises = prevDocuments
      .filter((doc) => {
        if (doc.status !== fromStatus) isEndFlag = true;
        return !isEndFlag;
      })
      .map((doc) =>
        updateDocument({
          docId: doc.id,
          obj: { status: toStatus },
        }),
      );
    const resolvedDocuments = await Promise.all(documentsPromises);

    // A set with all user ids in updatedDocuments
    const uniqueUpdatedDocumentIds = new Set(
      resolvedDocuments.map((doc) => doc.id),
    );
    const updatedDocuments = prevDocuments.map((doc) =>
      uniqueUpdatedDocumentIds.has(doc.id) ? { ...doc, status: toStatus } : doc,
    );
    return updatedDocuments;
  };

  const cancelDocumentSubmission = async () => {
    setIsSubmitting(true);

    const updatedStatus = documents.some(
      (doc) => doc.status === DocumentStatus.RETURNED,
    )
      ? FilingStatus.RETURNED
      : FilingStatus.DOCUMENT_CREATED;

    try {
      const [updatedFiling, updatedDocuments] = await Promise.all([
        updateFilingName({
          filingId,
          filingStatus: updatedStatus,
        }),
        updateDocumentStatuses(
          documents,
          DocumentStatus.WAIT_FOR_SECRETARY,
          DocumentStatus.DRAFT,
        ),
      ]);
      console.log(updatedFiling);

      if (updatedFiling) {
        setStatus(updatedStatus);
        setDocuments(updatedDocuments);
        toast({
          title: 'ยกเลิกสำเร็จ',
          description: `ยกเลิกการส่งเอกสาร ${name} แล้ว`,
          isError: false,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'ยกเลิกไม่สำเร็จ',
          description: error.message,
          isError: true,
        });
      }
    }
    setIsSubmitting(false);
  };
  const submitDocument = async () => {
    setIsSubmitting(true);
    try {
      const [updatedFiling, updatedDocuments] = await Promise.all([
        status !== FilingStatus.APPROVED &&
          updateFilingName({
            filingId,
            filingStatus: FilingStatus.WAIT_FOR_SECRETARY,
          }),
        updateDocumentStatuses(
          documents,
          DocumentStatus.DRAFT,
          status === FilingStatus.APPROVED
            ? DocumentStatus.APPROVED
            : DocumentStatus.WAIT_FOR_SECRETARY,
        ),
      ]);
      console.log(updatedFiling);

      if (status === FilingStatus.APPROVED) {
        setDocuments(updatedDocuments);
        toast({
          title: 'ส่งเอกสารฉบับแก้ไขสำเร็จ',
          description: `ส่งเอกสารฉบับแก้ไข ${name} สำเร็จ`,
        });
      } else if (updatedFiling) {
        setStatus(FilingStatus.WAIT_FOR_SECRETARY);
        setDocuments(updatedDocuments);
        toast({
          title: 'ส่งเอกสารสำเร็จ',
          description: `ส่งเอกสาร ${name} สำเร็จ`,
          isError: false,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'ส่งเอกสารไม่สำเร็จ',
          description: error.message,
          isError: true,
        });
      }
    }
    setIsSubmitting(false);
  };

  const reviewDocument = async () => {
    setIsSubmitting(true);
    try {
      const updatedStatus = reviewButton === 'อนุมัติ';

      const [reviewedDocument, updatedDocuments] = await Promise.all([
        reviewSubmission({
          id: documents[0].id,
          updatedStatus,
        }),
        documents.length > 1
          ? updateDocumentStatuses(
              documents.slice(1),
              DocumentStatus.DRAFT,
              updatedStatus ? DocumentStatus.APPROVED : DocumentStatus.RETURNED,
            )
          : [],
      ]);
      console.log(reviewedDocument);

      setStatus(updatedStatus ? FilingStatus.APPROVED : FilingStatus.RETURNED);
      setDocuments([reviewedDocument, ...updatedDocuments]);
      toast({
        title: 'ตอบกลับเอกสารสำเร็จ',
        description: `${reviewButton}เอกสารสำเร็จ`,
        isError: false,
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
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 w-0 grow">
          <FileText className="w-5 h-5 shrink-0" />
          <div className="font-semibold text-2xl line-clamp-1">{name}</div>
        </span>
        <span className="flex gap-5">
          {status === FilingStatus.APPROVED ? (
            isAdmin ? (
              <>
                <AddDocumentButton
                  isAdmin={isAdmin}
                  status={status}
                  setShowCreateDocument={setShowCreateDocument}
                />
                <FilingTimelineHeaderApproved
                  fileName={latestDocument?.pdfName ?? ''}
                  folderName={`${projectId}/${filingId}`}
                  noBadge
                />
                <SubmissionButton
                  isSubmitting={isSubmitting}
                  status={status}
                  documents={documents}
                  submitDocument={submitDocument}
                  isAdmin={isAdmin}
                />
              </>
            ) : (
              <FilingTimelineHeaderApproved
                fileName={latestDocument?.pdfName ?? ''}
                folderName={`${projectId}/${filingId}`}
              />
            )
          ) : (
            <>
              <AddDocumentButton
                isAdmin={isAdmin}
                status={status}
                setShowCreateDocument={setShowCreateDocument}
              />
              {isAdmin ? (
                <ReviewButton
                  isSubmitting={isSubmitting}
                  documents={documents}
                  status={status}
                  reviewButton={reviewButton}
                  setReviewButton={setReviewButton}
                  reviewDocument={reviewDocument}
                />
              ) : status === FilingStatus.WAIT_FOR_SECRETARY ? (
                <CancelSubmissionButton
                  isSubmitting={isSubmitting}
                  cancelDocumentSubmission={cancelDocumentSubmission}
                />
              ) : (
                <SubmissionButton
                  isSubmitting={isSubmitting}
                  status={status}
                  documents={documents}
                  submitDocument={submitDocument}
                  isAdmin={isAdmin}
                />
              )}
            </>
          )}
        </span>
      </div>
      {showCreateDocument ? (
        <div className="my-10 w-full">
          {isAdmin && status === FilingStatus.APPROVED ? (
            <UpdateDocumentAdmin
              setShowCreateDocument={setShowCreateDocument}
              afterCreateDocument={(createdDocument) => {
                setDocuments((prev) => [createdDocument, ...prev]);
                setShowCreateDocument(false);
              }}
              filingId={filingId}
              projectId={projectId}
              userId={userId}
            />
          ) : isAdmin ? (
            <CreateDocumentAdmin
              setShowCreateDocument={setShowCreateDocument}
              afterCreateDocument={(createdDocument) => {
                setDocuments((prev) => [createdDocument, ...prev]);
                setShowCreateDocument(false);
              }}
              filingId={filingId}
              projectId={projectId}
              userId={userId}
            />
          ) : (
            <CreateDocumentClient
              setShowCreateDocument={setShowCreateDocument}
              afterCreateDocument={(createdDocument) => {
                setDocuments((prev) => [createdDocument, ...prev]);
                if (status === FilingStatus.DRAFT)
                  setStatus(FilingStatus.DOCUMENT_CREATED);
                setShowCreateDocument(false);
              }}
              status={status}
              filingId={filingId}
              projectId={projectId}
              userId={userId}
            />
          )}
        </div>
      ) : null}
      {!showCreateDocument && status === FilingStatus.DRAFT && (
        <Button
          variant="secondary"
          onClick={() => {
            setShowCreateDocument(true);
          }}
          className="bg-gray-100 text-gray-700 font-semibold text-2xl w-full py-32 mt-6"
        >
          <CirclePlus className="h-11 w-11 mr-6" />
          อัปโหลดเอกสาร
        </Button>
      )}
    </>
  );
}
