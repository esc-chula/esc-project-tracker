'use client';
import { FaFolderOpen } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { FilingStatus } from '@repo/shared';
import type { User } from '@/src/interface/user';
import { findUserByUserId } from '@/src/service/user/findUserByUserId';
import type { FilingWithDocument } from '@/src/types/filing';
import { toast } from '../../ui/use-toast';
import FilingReplyComment from './filing-reply-comment';
import FilingReplyDetail from './filing-reply-detail';
import FilingReplyHeader from './filing-reply-header';

export default function FilingReplyArea({
  selectedFilingWithDocument,
  setFilingReviewed,
}: {
  selectedFilingWithDocument?: FilingWithDocument;
  setFilingReviewed: (value: string) => void;
}) {
  const [ownerDetail, setOwnerDetail] = useState<User | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [targetFilingId, setTargetFilingId] = useState<string>('');
  const [documentCode, setDocumentCode] = useState<string>('');

  useEffect(() => {
    setIsPending(false);

    const fetchOwnerDetail = async (userId: string) => {
      try {
        // Fetch owner หลังจากเรียกข้อมูลเอกสาร
        const ownerData = await findUserByUserId(userId);
        setOwnerDetail(ownerData);
      } catch (err) {
        if (err instanceof Error) {
          toast({
            title: `ดึงข้อมูลเอกสาร ${documentCode} ไม่สำเร็จ`,
            description: err.message,
            isError: true,
          });
        }
      }
    };

    if (selectedFilingWithDocument) {
      setTargetFilingId(selectedFilingWithDocument.filing.id);
      setIsPending(
        selectedFilingWithDocument.filing.status ===
          FilingStatus.WAIT_FOR_SECRETARY,
      );
      setDocumentCode(
        `${selectedFilingWithDocument.filing.projectCode}-${selectedFilingWithDocument.filing.filingCode}`,
      );
      void fetchOwnerDetail(selectedFilingWithDocument.filing.userId);
    }
  }, [selectedFilingWithDocument]);

  return (
    <div className="basis-2/3 pl-6 overflow flex justify-center overflow-hidden">
      {!selectedFilingWithDocument ? (
        <div className="h-full items-center flex flex-col justify-center text-3xl text-gray-300 space-y-2">
          <FaFolderOpen size={100} />
          <div className="text-center">
            เลือกเอกสารที่
            <br />
            ต้องการดำเนินการ
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col space-y-4 py-4">
          <FilingReplyHeader
            projectId={selectedFilingWithDocument.filing.projectId}
            filingId={selectedFilingWithDocument.filing.id}
            name={selectedFilingWithDocument.filing.name}
            documentCode={documentCode}
          />
          <FilingReplyDetail
            documentDetail={selectedFilingWithDocument.document}
            projectId={selectedFilingWithDocument.filing.projectId}
            filingId={selectedFilingWithDocument.filing.id}
            owner={ownerDetail?.username || 'Secretary ESC'}
          />
          <FilingReplyComment
            isPending={isPending}
            filingStatus={selectedFilingWithDocument.filing.status}
            filingId={targetFilingId}
            projectId={selectedFilingWithDocument.filing.projectId}
            documentCode={documentCode}
            setFilingReviewed={setFilingReviewed}
          />
        </div>
      )}
    </div>
  );
}
