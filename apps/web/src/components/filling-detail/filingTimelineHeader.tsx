'use client';
import { CirclePlus, FileText, Plus, Send, X } from 'lucide-react';
import { Button } from '../ui/button';
import { DocumentStatus, FilingStatus } from '@/src/constant/enum';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { toast } from '../ui/use-toast';
import updateFilingName from '@/src/service/filing/updateFiling';
import CreateDocumentClient from './create-edit/createDocumentClient';
import { DocumentType } from '@/src/interface/document';
import updateDocument from '@/src/service/document/updateDocument';
import FilingTimelineHeaderApproved from './filingTimelineHeaderApproved';
import CreateDocumentAdmin from './create-edit/createDocumentAdmin';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { IoIosAlert } from 'react-icons/io';
import reviewSubmission from '@/src/service/document/reviewSubmission';
import UpdateDocumentAdmin from './create-edit/updateDocumentAdmin';

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
  setStatus: (status: FilingStatus) => void;
  setDocuments: Dispatch<SetStateAction<DocumentType[]>>;
  filingId: string;
  projectId: string;
  showCreateDocument: boolean;
  setShowCreateDocument: (showCreateDocument: boolean) => void;
  userId: string;
  isAdmin?: boolean;
}) {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState<boolean>(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [reviewButton, setReviewButton] = useState<string>('อนุมัติ');

  const updateDocumentStatuses = async (
    documents: DocumentType[],
    fromStatus: DocumentStatus,
    toStatus: DocumentStatus,
  ) => {
    // update doc statuses
    let isEndFlag = false;
    const documentsPromises = documents
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
    const updatedDocuments = documents.map((doc) =>
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
  const AddDocumentButton = () => (
    <Button
      variant="outline"
      disabled={
        (!isAdmin &&
          (status === FilingStatus.WAIT_FOR_SECRETARY ||
            status === FilingStatus.WAIT_FOR_STUDENT_AFFAIR)) ||
        (isAdmin &&
          (status === FilingStatus.DRAFT ||
            status === FilingStatus.DOCUMENT_CREATED))
      }
      onClick={() => {
        setShowCreateDocument(true);
      }}
      className="mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] text-red font-semibold border-red disabled:bg-lightgray disabled:text-white disabled:border-none"
    >
      <Plus className="h-8 w-8 mr-2" />
      เพิ่ม
    </Button>
  );
  const CancelSubmissionButton = () => (
    <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
      <DialogTrigger>
        <Button
          disabled={isSubmitting}
          variant="outline"
          className="mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold border-black disabled:bg-disabled"
        >
          <X className="h-8 w-8 mr-2" />
          ยกเลิก
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-semibold text-2xl">
            ยกเลิกการส่งเอกสาร
          </DialogTitle>
        </DialogHeader>
        <div className="bg-white rounded-lg space-y-4">
          ยกเลิกการส่งเอกสารเพื่อเปลี่ยนแปลงข้อมูล
          โปรดอย่าลืมส่งอีกครั้งเมื่อดำเนินการเสร็จ
          <div className="text-end">
            <DialogClose
              className=" disabled:bg-disabled bg-red text-white rounded-lg py-1 px-4 font-semibold"
              onClick={cancelDocumentSubmission}
              disabled={isSubmitting}
            >
              ยืนยัน
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
  const SubmissionButton = () => (
    <Button
      disabled={
        isSubmitting ||
        !(
          (status === FilingStatus.DOCUMENT_CREATED ||
            status === FilingStatus.RETURNED ||
            (status === FilingStatus.APPROVED && isAdmin)) &&
          documents.length &&
          documents[0].status === DocumentStatus.DRAFT
        )
      }
      onClick={submitDocument}
      className="disabled:bg-lightgray mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold bg-red text-white"
    >
      <Send className="h-8 w-8 mr-2" />
      ส่ง
    </Button>
  );
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

      if (reviewedDocument) {
        setStatus(
          updatedStatus ? FilingStatus.APPROVED : FilingStatus.RETURNED,
        );
        setDocuments([reviewedDocument, ...updatedDocuments]);
        toast({
          title: 'ตอบกลับเอกสารสำเร็จ',
          description: `${reviewButton}เอกสารสำเร็จ`,
          isError: false,
        });
      }
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
  const ReviewSubmissionButton = () => {
    const isDisabled = useMemo(
      () =>
        isSubmitting ||
        !(
          (status === FilingStatus.WAIT_FOR_SECRETARY ||
            status === FilingStatus.WAIT_FOR_STUDENT_AFFAIR ||
            status === FilingStatus.RETURNED) &&
          documents.length &&
          documents[0].status === DocumentStatus.DRAFT
        ),
      [isSubmitting, status, documents],
    );
    return (
      <div className="flex">
        <Select
          disabled={isDisabled}
          value={reviewButton}
          onValueChange={setReviewButton}
        >
          <Dialog
            open={isReviewDialogOpen}
            onOpenChange={setIsReviewDialogOpen}
          >
            <DialogTrigger disabled={isDisabled}>
              <Button
                disabled={isDisabled}
                className={`${reviewButton === 'อนุมัติ' ? 'bg-accepted' : 'bg-red'} disabled:bg-lightgray border-r-white border-r-2 mx-auto rounded-none rounded-l-2xl text-2xl p-4 h-[52px] font-semibold text-white`}
              >
                {reviewButton}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <div className="flex flex-col items-center">
                  <IoIosAlert size={150} className="text-center text-red" />
                  <DialogTitle className="font-bold text-2xl">
                    ยืนยันการตอบกลับเอกสาร
                  </DialogTitle>
                </div>
              </DialogHeader>
              <div className="bg-white rounded-lg space-y-4 flex flex-col items-center text-center ">
                การอนุมัติหรือตีกลับเอกสารจะไม่สามารถยกเลิกหรือแก้ไขได้
                หากต้องการแก้ไขเอกสารโปรดตอบกลับใหม่อีกครั้ง
                <DialogClose
                  className=" disabled:bg-disabled bg-red text-white rounded-lg p-2 px-4 font-bold text-2xl mt-4"
                  onClick={() => {
                    reviewDocument();
                  }}
                  disabled={isSubmitting}
                >
                  ยืนยัน
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
          <SelectTrigger
            className={`${reviewButton === 'อนุมัติ' ? 'bg-accepted' : 'bg-red'} disabled:bg-lightgray mx-auto rounded-none border-none rounded-r-2xl text-2xl px-2 py-4 h-[52px] font-semibold  text-white`}
          />
          <SelectContent className="min-w-0">
            <SelectItem
              value="อนุมัติ"
              className=" font-semibold text-accepted focus:text-accepted"
            >
              อนุมัติ
            </SelectItem>
            <SelectItem
              value="ตีกลับ"
              className="font-semibold text-rejected focus:text-rejected"
            >
              ตีกลับ
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
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
                <AddDocumentButton />
                <FilingTimelineHeaderApproved
                  fileName={latestDocument?.pdfName ?? ''}
                  folderName={`${projectId}/${filingId}`}
                  noBadge
                />
                <SubmissionButton />
              </>
            ) : (
              <FilingTimelineHeaderApproved
                fileName={latestDocument?.pdfName ?? ''}
                folderName={`${projectId}/${filingId}`}
              />
            )
          ) : (
            <>
              <AddDocumentButton />
              {isAdmin ? (
                <ReviewSubmissionButton />
              ) : status === FilingStatus.WAIT_FOR_SECRETARY ? (
                <CancelSubmissionButton />
              ) : (
                <SubmissionButton />
              )}
            </>
          )}
        </span>
      </div>
      {showCreateDocument && (
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
      )}
      {!showCreateDocument && status === FilingStatus.DRAFT && (
        <Button
          variant="secondary"
          onClick={() => {
            setShowCreateDocument(true);
          }}
          className="bg-gray-100 text-gray-700 font-semibold text-2xl w-full py-16 mt-6"
        >
          <CirclePlus className="h-11 w-11 mr-6" />
          อัปโหลดเอกสาร
        </Button>
      )}
    </>
  );
}
