'use client';
import { FaFolderOpen } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import findLatestDocumentByFilingId from '@/src/service/document/findLatestDocumentByFilingId';
import { toast } from '../../ui/use-toast';
import getFilingByFilingId from '@/src/service/filing/getFilingByFilingId';
import { FilingType } from '@/src/interface/filing';
import { DocumentType } from '@/src/interface/document';
import FilingReplyHeader from './filing-reply-header';
export default function FilingReplyArea({
  selectedFilingId,
}: {
  selectedFilingId: string;
}) {
  const [latestDocument, setLatestDocument] = useState<DocumentType | null>(
    null,
  );
  const [filingDetail, setFilingDetail] = useState<FilingType | null>(null);

  useEffect(() => {
    const fetchFilingDetail = async () => {
      try {
        const data = await getFilingByFilingId(selectedFilingId);
        setFilingDetail(data);
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
    }
  }, [selectedFilingId]);
  return (
    <div className="h-[80vh] w-[50vw] pl-15 overflow flex justify-center">
      {selectedFilingId === '' ? (
        <div className="h-full items-center flex flex-col justify-center text-3xl text-gray-300 space-y-2">
          <FaFolderOpen size={100} />
          <div className="text-center">
            เลือกเอกสารที่<br></br>ต้องการดำเนินการ
          </div>
        </div>
      ) : (
        <div className="flex w-full">
          <FilingReplyHeader
            projectCode={filingDetail?.projectCode}
            filingCode={filingDetail?.FilingCode}
            name={filingDetail?.name}
          />
        </div>
      )}
    </div>
  );
}
