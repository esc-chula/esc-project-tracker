'use client';
import { FaFolderOpen } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import getFilingByFilingId from '@/src/service/filing/getFilingByFilingId';
import { FilingType } from '@/src/interface/filing';
import { DocumentType } from '@/src/interface/document';
import FilingReplyHeader from './filing-reply-header';
import FilingReplyDetail from './filing-reply-detail';
import { User } from '@/src/interface/user';
import { findUserByUserId } from '@/src/service/user/findUserByUserId';
import FilingReplyComment from './filing-reply-comment';
import FilingReplyButtons from './filing-reply-buttons';
import { FilingStatus } from '@/src/constant/enum';
import findLatestPendingDocumentByFilingId from '@/src/service/document/findLatestPendingByFilingId';
import { toast } from '../../ui/use-toast';

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
      } catch (err) {
        if (err instanceof Error) {
          toast({
            title: 'ดึงเอกสาร ID ' + selectedFilingId + ' ไม่สำเร็จ',
            description: err.message,
            isError: true,
          });
        }
      }
    };

    // ใช้สำหรับแสดงข้อมูลเอกสารล่าสุดที่ไม่ใช่ reply
    const fetchLatestPendingDocumentDetail = async () => {
      try {
        console.log('fetchLatestPendingDocumentDetail id:', selectedFilingId);
        const data =
          await findLatestPendingDocumentByFilingId(selectedFilingId);
        setLatestPendingDocumentDetail(data);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: 'ดึงข้อมูลเอกสาร ID: ' + selectedFilingId + ' ไม่สำเร็จ',
            description: error.message,
            isError: true,
          });
        }
      }
    };

    if (selectedFilingId !== '') {
      fetchFilingDetail();
      setTargetFilingId(selectedFilingId);
      fetchLatestPendingDocumentDetail();
    }
  }, [selectedFilingId]);

  useEffect(() => {
    const fetchOwnerDetail = async () => {
      try {
        const data = await findUserByUserId(filingDetail?.userId || '');
        setOwnerDetail(data);
      } catch (err) {
        if (err instanceof Error) {
          toast({
            title: 'ดึงข้อมูลเจ้าของเอกสาร ' + filingDetail?.id + ' ไม่สำเร็จ',
            description: err.message,
            isError: true,
          });
        }
      }
    };
    if (filingDetail?.userId) {
      fetchOwnerDetail();
    }
    setIsFetched(true);
  }, [filingDetail]);

  if (!isFetched) {
    return;
  }

  return (
    <div className="min-h-full w-[50vw] pl-15 overflow flex justify-center overflow-hidden">
      {selectedFilingId === '' ? (
        <div className="h-full items-center flex flex-col justify-center text-3xl text-gray-300 space-y-2">
          <FaFolderOpen size={100} />
          <div className="text-center">
            เลือกเอกสารที่<br></br>ต้องการดำเนินการ
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col space-y-4 py-4">
          <FilingReplyHeader
            projectId={filingDetail?.projectId || ''}
            filingId={selectedFilingId}
            projectCode={filingDetail?.projectCode}
            filingCode={filingDetail?.FilingCode}
            name={filingDetail?.name}
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
              setShowComment={(value: boolean) => {
                setIsShowComment(value);
              }}
              setFilingReviewed={setFilingReviewed}
            />
          ) : (
            <FilingReplyButtons
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
