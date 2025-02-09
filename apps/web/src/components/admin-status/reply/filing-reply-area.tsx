'use client';
import { FaFolderOpen } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import getFilingByFilingId from '@/src/service/filing/getFilingByFilingId';
import type { FilingType } from '@/src/interface/filing';
import type { DocumentType } from '@/src/interface/document';
import type { User } from '@/src/interface/user';
import { findUserByUserId } from '@/src/service/user/findUserByUserId';
import { FilingStatus } from '@/src/constant/enum';
import findLatestPendingDocumentByFilingId from '@/src/service/document/findLatestPendingByFilingId';
import { toast } from '../../ui/use-toast';
import FilingReplyButtons from './filing-reply-buttons';
import FilingReplyComment from './filing-reply-comment';
import FilingReplyDetail from './filing-reply-detail';
import FilingReplyHeader from './filing-reply-header';

export default function FilingReplyArea({
  selectedFilingId,
  setFilingReviewed,
}: {
  selectedFilingId: string;
  setFilingReviewed: (value: string) => void;
}) {
  const [filingDetail, setFilingDetail] = useState<FilingType | null>(null);
  const [ownerDetail, setOwnerDetail] = useState<User | null>(null);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>(
    FilingStatus.DOCUMENT_CREATED,
  );
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isShowComment, setIsShowComment] = useState<boolean>(false);
  const [targetFilingId, setTargetFilingId] =
    useState<string>(selectedFilingId);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [latestPendingDocumentDetail, setLatestPendingDocumentDetail] =
    useState<DocumentType | null>(null);
  const [projectId, setProjectId] = useState<string>('');
  const [documentCode, setDocumentCode] = useState<string>('');

  useEffect(() => {
    setIsFetched(false);
    setIsPending(false);
    setIsShowComment(false);

    const fetchFilingDetail = async () => {
      try {
        const data = await getFilingByFilingId(selectedFilingId);
        setFilingDetail(data);
        setFilingStatus(data?.status || FilingStatus.WAIT_FOR_SECRETARY);
        setIsPending(data?.status === FilingStatus.WAIT_FOR_SECRETARY);
        setProjectId(data?.projectId || '');
        setDocumentCode(`${data?.projectCode}-${data?.filingCode}`);

        // Fetch owner หลังจากเรียกข้อมูลเอกสาร
        if (data?.userId) {
          const ownerData = await findUserByUserId(data.userId);
          setOwnerDetail(ownerData);
        }
      } catch (err) {
        if (err instanceof Error) {
          toast({
            title: `ดึงข้อมูลเอกสาร ${documentCode} ไม่สำเร็จ`,
            description: err.message,
            isError: true,
          });
        }
      } finally {
        setIsFetched(true);
      }
    };

    // ใช้สำหรับแสดงข้อมูลเอกสารล่าสุดที่ไม่ใช่ reply
    const fetchLatestPendingDocumentDetail = async () => {
      try {
        const data =
          await findLatestPendingDocumentByFilingId(selectedFilingId);
        setLatestPendingDocumentDetail(data);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: `ดึงข้อมูลเอกสาร ${documentCode} ไม่สำเร็จ`,
            description: error.message,
            isError: true,
          });
        }
      }
    };

    if (selectedFilingId !== '') {
      setTargetFilingId(selectedFilingId);
      fetchFilingDetail();
      fetchLatestPendingDocumentDetail();
    }
  }, [selectedFilingId]);

  if (!isFetched) {
    return;
  }

  return (
    <div className="basis-2/3 pl-6 overflow flex justify-center overflow-hidden">
      {selectedFilingId === '' ? (
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
            projectId={filingDetail?.projectId || ''}
            filingId={selectedFilingId}
            name={filingDetail?.name}
            documentCode={documentCode}
          />
          <FilingReplyDetail
            documentDetail={latestPendingDocumentDetail}
            projectId={filingDetail?.projectId || ''}
            filingId={selectedFilingId}
            owner={ownerDetail?.username || 'Secretary ESC'}
          />
          {!isPending || isShowComment ? (
            <FilingReplyComment
              isPending={isPending}
              filingStatus={filingStatus}
              filingId={targetFilingId}
              projectId={filingDetail?.projectId || ''}
              newDocumentDetail={latestPendingDocumentDetail?.detail || ''}
              newDocumentName={latestPendingDocumentDetail?.name || ''}
              documentCode={documentCode}
              setShowComment={(value: boolean) => {
                setIsShowComment(value);
              }}
              setFilingReviewed={setFilingReviewed}
            />
          ) : (
            <FilingReplyButtons
              filingId={targetFilingId}
              projectId={projectId}
              setShowComment={(value: boolean) => {
                setIsShowComment(value);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
