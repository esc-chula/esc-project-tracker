'use client';
import {
  CircleCheck,
  CirclePlus,
  FileText,
  Info,
  Plus,
  Send,
  X,
} from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { DocumentStatus, FilingStatus } from '@/src/constant/enum';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Dispatch, SetStateAction, useState } from 'react';
import { useToast } from '../ui/use-toast';
import updateFilingName from '@/src/service/updateFiling';
import CreateDocumentClient from './create-edit/createDocumentClient';
import { Document } from '@/src/interface/document';
import updateDocument from '@/src/service/updateDocument';

export default function FilingTimelineHeader({
  name,
  status,
  documents,
  latestPDFUrl = '#',
  setStatus,
  setDocuments,
  filingId,
  showCreateDocument,
  setShowCreateDocument,
}: {
  name: string;
  status: FilingStatus;
  documents: Document[];
  latestPDFUrl?: string;
  setStatus: (status: FilingStatus) => void;
  setDocuments: Dispatch<SetStateAction<Document[]>>;
  filingId: string;
  showCreateDocument: boolean;
  setShowCreateDocument: (showCreateDocument: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [documentFixed, setDocumentFixed] = useState<boolean>(false);
  const { toast } = useToast();

  const updateDocumentStatuses = async (
    documents: Document[],
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
    try {
      const [updatedFiling, updatedDocuments] = await Promise.all([
        updateFilingName({
          filingId,
          filingStatus: FilingStatus.DOCUMENT_CREATED,
        }),
        updateDocumentStatuses(
          documents,
          DocumentStatus.WAIT_FOR_SECRETARY,
          DocumentStatus.DRAFT,
        ),
      ]);
      console.log(updatedFiling);

      if (updatedFiling) {
        setStatus(FilingStatus.DOCUMENT_CREATED);
        setDocuments(updatedDocuments);
        setIsOpen(false);
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
        updateFilingName({
          filingId,
          filingStatus: FilingStatus.WAIT_FOR_SECRETARY,
        }),
        updateDocumentStatuses(
          documents,
          DocumentStatus.DRAFT,
          DocumentStatus.WAIT_FOR_SECRETARY,
        ),
      ]);
      console.log(updatedFiling);

      if (updatedFiling) {
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
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 w-0 grow">
          <FileText className="w-5 h-5 shrink-0" />
          <div className="font-semibold text-2xl line-clamp-1">{name}</div>
        </span>
        <span className="flex gap-5">
          {status === FilingStatus.APPROVED ? (
            <>
              <Link
                href={latestPDFUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button className="mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold bg-red text-white">
                  <Info className="h-8 w-8 mr-2" />
                  อ่าน
                </Button>
              </Link>
              <Button className="pointer-events-none mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold bg-accepted text-white">
                <CircleCheck className="h-8 w-8 mr-2" />
                สำเร็จ
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                disabled={
                  status === FilingStatus.WAIT_FOR_SECRETARY ||
                  status === FilingStatus.WAIT_FOR_STUDENT_AFFAIR
                }
                onClick={() => {
                  setShowCreateDocument(true);
                }}
                className="mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] text-red font-semibold border-red disabled:bg-lightgray disabled:text-white disabled:border-none"
              >
                <Plus className="h-8 w-8 mr-2" />
                เพิ่ม
              </Button>
              {status === FilingStatus.WAIT_FOR_SECRETARY ? (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold border-black"
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
                        <button
                          className=" disabled:bg-disabled bg-red text-white rounded-lg py-1 px-4 font-semibold"
                          onClick={cancelDocumentSubmission}
                          disabled={isSubmitting}
                        >
                          ยืนยัน
                        </button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button
                  disabled={
                    status === FilingStatus.DRAFT ||
                    (status === FilingStatus.RETURNED && !documentFixed) ||
                    status === FilingStatus.WAIT_FOR_STUDENT_AFFAIR ||
                    isSubmitting
                  }
                  onClick={submitDocument}
                  className="disabled:bg-lightgray mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold bg-red text-white"
                >
                  <Send className="h-8 w-8 mr-2" />
                  ส่ง
                </Button>
              )}
            </>
          )}
        </span>
      </div>
      {showCreateDocument && (
        <div className="my-10 w-full">
          <CreateDocumentClient
            setShowCreateDocument={setShowCreateDocument}
            afterCreateDocument={(createdDocument) => {
              setDocuments((prev) => [createdDocument, ...prev]);
              setStatus(FilingStatus.DOCUMENT_CREATED);
              setDocumentFixed(true);
              setShowCreateDocument(false);
            }}
            filingId={filingId}
          />
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
