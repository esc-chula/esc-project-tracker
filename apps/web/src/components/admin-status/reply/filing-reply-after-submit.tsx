import { DocumentStatus } from '@repo/shared';
import type { Document } from '@/src/interface/document';
import FileDisplay from '../../filling-detail/display/fileDisplay';
import TextareaForDisplay from '../../filling-detail/display/textareaForDisplay';
import StatusButton from '../../filling-detail/display/statusButton';
import EditAndDeleteReply from './edit-and-delete-reply';

export default function FilingReplyAfterSubmit({
  documentStatus,
  folderName,
  document,
  isPendingReviewed,
  documentCode,
  setIsSubmitted,
  setIsEditingAfterSubmit,
}: {
  documentStatus: DocumentStatus;
  folderName?: string;
  document: Document | null;
  isPendingReviewed: boolean;
  documentCode: string;
  setIsSubmitted: (value: boolean) => void;
  setIsEditingAfterSubmit: (value: boolean) => void;
}) {
  return (
    <div className="bg-lightgray rounded-xl font-sukhumvit w-full p-5 flex text-start flex-col space-y-3">
      <div className="font-bold space-y-4 w-full grow">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-x-6 gap-y-2 flex-wrap">
            <div className="font-bold text-sm shrink-0">ไฟล์แนบ</div>
            {document?.pdfName !== '' && document?.pdfName !== '-' ? (
              <FileDisplay
                fileName={document?.pdfName || ''}
                fileType="pdf"
                folderName={folderName}
                documentId={document?.id}
              />
            ) : (
              <div className="text-sm">ไม่มีไฟล์แนบ</div>
            )}
          </div>

          {document?.status === DocumentStatus.APPROVED ||
          document?.status === DocumentStatus.RETURNED ||
          (document?.status === DocumentStatus.DRAFT && isPendingReviewed) ? (
            <div>
              <StatusButton status={documentStatus} />
            </div>
          ) : (
            <EditAndDeleteReply
              documentCode={documentCode}
              documentId={document?.id || ''}
              setIsSubmitted={setIsSubmitted}
              setIsEditingAfterSubmit={setIsEditingAfterSubmit}
            />
          )}
        </div>
        <div className="font-bold text-sm">ความคิดเห็น</div>
        <TextareaForDisplay value={document?.comment} />
      </div>
    </div>
  );
}
