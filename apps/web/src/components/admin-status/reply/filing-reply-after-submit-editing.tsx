import { DocumentStatus } from '@repo/shared';
import type { Document } from '@/src/interface/document';
import FileDisplay from '../../filling-detail/display/fileDisplay';
import TextareaForDisplay from '../../filling-detail/display/textareaForDisplay';
import StatusButton from '../../filling-detail/display/statusButton';

export default function FilingReplyAfterSubmitEditing({
  documentStatus,
  folderName,
  document,
}: {
  documentStatus: DocumentStatus;
  folderName?: string;
  document: Document | null;
}) {
  return (
    <div className="bg-lightgray rounded-xl font-sukhumvit w-full px-5 pt-5 pb-3 flex text-start flex-col space-y-3">
      <div className="px-8 py-4 font-bold space-y-4 w-full grow">
        <div className="flex flex-row justify-between">
          <div className="w-[60%] truncate">
            <span>รายละเอียดเอกสาร: </span>
            <span className="font-normal">{document?.detail || '...'}</span>
          </div>
          {(documentStatus === DocumentStatus.APPROVED ||
            documentStatus === DocumentStatus.RETURNED) && (
            <div>
              <StatusButton status={documentStatus} />
            </div>
          )}
        </div>
        <div className="flex flex-row items-center gap-x-6 gap-y-2 flex-wrap">
          <div className="font-bold text-sm shrink-0">ไฟล์แนบ</div>
          {document?.pdfName !== '' && document?.pdfName !== '-' ? (
            <div className="flex flex-row space-x-4">
              <FileDisplay
                fileName={document?.pdfName || '...'}
                fileType="pdf"
                folderName={folderName}
                documentId={document?.id}
              />
              {document?.docName !== '' && document?.docName !== '-' && (
                <FileDisplay
                  fileName={document?.docName || ''}
                  fileType="doc"
                  folderName={folderName}
                  documentId={document?.id}
                />
              )}
            </div>
          ) : (
            <div className="text-sm">ไม่มีไฟล์แนบ</div>
          )}
        </div>
        <div className="flex flex-row justify-between space-x-4">
          <div className="w-[50%]">
            <div className="font-bold mb-2">หมายเหตุ</div>
            <TextareaForDisplay value={document?.detail} />
          </div>
          <div className="w-[50%]">
            <div className="font-bold mb-2 w-full">ความคิดเห็น</div>
            <TextareaForDisplay value={document?.comment} />
          </div>
        </div>
      </div>
    </div>
  );
}
