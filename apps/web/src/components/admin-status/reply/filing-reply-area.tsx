'use client';
import { FaFolderOpen } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import findLatestDocumentByFilingId from '@/src/service/document/findLatestDocumentByFilingId';
import { toast } from '../../ui/use-toast';
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
export default function FilingReplyArea({
  selectedFilingId,
}: {
  selectedFilingId: string;
}) {
  const [latestDocument, setLatestDocument] = useState<DocumentType | null>(
    null,
  );
  const [filingDetail, setFilingDetail] = useState<FilingType | null>(null);
  const [ownerDetail, setOwnerDetail] = useState<User | null>(null);
  const [isShowComment, setIsShowComment] = useState<boolean>(false);
  const [isContinueStatus, setIsContinueStatus] = useState<boolean>(false);
  const [targetFilingId, setTargetFilingId] =
    useState<string>(selectedFilingId);

  useEffect(() => {
    const fetchFilingDetail = async () => {
      try {
        const data = await getFilingByFilingId(selectedFilingId);
        setFilingDetail(data);
        if (
          data?.status == FilingStatus.APPROVED ||
          data?.status == FilingStatus.RETURNED
        ) {
          setIsContinueStatus(false);
          setIsShowComment(true);
        } else {
          setIsContinueStatus(true);
          setIsShowComment(false);
        }
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

    const fetchLatestDocument = async () => {
      try {
        const docs = await findLatestDocumentByFilingId(selectedFilingId);
        setLatestDocument(docs);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: 'ดึงเอกสาร ID ' + selectedFilingId + ' ไม่สำเร็จ',
            description: error.message,
            isError: true,
          });
        }
      }
    };

    if (selectedFilingId !== '') {
      fetchFilingDetail();
      fetchLatestDocument();
      setTargetFilingId(selectedFilingId);
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
  }, [filingDetail]);

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
            latestDocument={latestDocument}
            projectId={filingDetail?.projectId || ''}
            filingId={selectedFilingId}
            owner={ownerDetail?.username || 'Secretary ESC'}
          />
          {isShowComment ? (
            <FilingReplyComment
              filingId={targetFilingId}
              isContinueStatus={isContinueStatus}
              latestDocument={latestDocument}
              projectId={filingDetail?.projectId || ''}
              setShowComment={(value: boolean) => {
                setIsShowComment(value);
              }}
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
