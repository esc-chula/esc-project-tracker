import { Document } from '@/src/interface/document';
import FileDisplay from '../../filling-detail/display/fileDisplay';
import TextareaForDisplay from '../../filling-detail/display/textareaForDisplay';

export default function FilingReplyNoteAndFile({
  projectId,
  filingId,
  latestDocument,
}: {
  projectId: string;
  filingId: string;
  latestDocument: Document | null;
}) {
  return (
    <div className="border-t-2 py-4 font-bold flex flex-col space-y-4 ">
      <div>
        <span className="font-bold">รายละเอียดเอกสาร: </span>
        <span className="font-normal">{latestDocument?.name}</span>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="">
          <div className="text-sm">ไฟล์แนบ</div>
          <div className="flex flex-row gap-6 pt-2">
            {latestDocument?.docName !== '' &&
              latestDocument?.docName !== '-' && (
                <FileDisplay
                  fileName={latestDocument?.docName || ''}
                  fileType="doc"
                  folderName={`${projectId}/${filingId}`}
                />
              )}
            {latestDocument?.pdfName !== '' &&
              latestDocument?.pdfName !== '-' && (
                <FileDisplay
                  fileName={latestDocument?.pdfName || ''}
                  fileType="pdf"
                  folderName={`${projectId}/${filingId}`}
                />
              )}
          </div>
        </div>
        <div className="space-y-2">
          <div>หมายเหตุ</div>
          <TextareaForDisplay value={latestDocument?.detail} />
        </div>
      </div>
    </div>
  );
}
