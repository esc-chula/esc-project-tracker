'use client';
import { DocumentType } from '@/src/interface/document';
import FileDisplay from '../../filling-detail/display/fileDisplay';
import TextareaForDisplay from '../../filling-detail/display/textareaForDisplay';
import { useEffect, useState } from 'react';
import { FilingStatus } from '@/src/constant/enum';

export default function FilingReplyAfterSubmit({
  filingStatus,
  pdfName,
  folderName,
  comment,
  filingId,
  isContinueStatus,
  latestDocument,
}: {
  filingStatus: FilingStatus;
  pdfName: string;
  folderName?: string;
  comment: string;
  filingId: string;
  isContinueStatus: boolean;
  latestDocument: DocumentType | null;
}) {
  const [pdfNameChild, setPdfNameChild] = useState<string>(pdfName);
  const [commentChild, setCommentChild] = useState<string>(comment);

  useEffect(() => {
    if (!isContinueStatus) {
      setPdfNameChild(latestDocument?.pdfName || '');
      setCommentChild(latestDocument?.comment || '');
    }
    console.log('test', latestDocument);
  }, [filingId]);

  return (
    <div className="bg-lightgray rounded-xl font-sukhumvit w-full px-5 pt-5 pb-3 flex text-start flex-col space-y-3">
      <div>{filingId}</div>
      <div className="px-8 py-4 font-bold space-y-4 w-full grow">
        <div className="flex flex-row items-center gap-x-6 gap-y-2 flex-wrap">
          <div className="font-bold text-sm shrink-0">ไฟล์แนบ</div>
          {pdfName !== '' && pdfName !== '-' ? (
            <FileDisplay
              fileName={pdfNameChild}
              fileType="pdf"
              folderName={folderName}
            />
          ) : (
            <div className="text-sm">ไม่มีไฟล์แนบ</div>
          )}
        </div>
        <div className="font-bold text-sm">ความคิดเห็น</div>
        <TextareaForDisplay value={commentChild} />
      </div>
    </div>
  );
}
