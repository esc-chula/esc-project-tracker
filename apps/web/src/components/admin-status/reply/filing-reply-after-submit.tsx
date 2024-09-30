import FileDisplay from '../../filling-detail/display/fileDisplay';
import TextareaForDisplay from '../../filling-detail/display/textareaForDisplay';

export default function FilingReplyAfterSubmit({
  pdfName,
  folderName,
  comment,
}: {
  pdfName: string;
  folderName?: string;
  comment: string;
}) {
  return (
    <div className="bg-lightgray rounded-xl font-sukhumvit w-full px-5 pt-5 pb-3 flex text-start flex-col space-y-3">
      <div className="px-8 py-4 font-bold space-y-4 w-full grow">
        <div className="flex flex-row items-center gap-x-6 gap-y-2 flex-wrap">
          <div className="font-bold text-sm shrink-0">ไฟล์แนบ</div>
          {pdfName !== '' && pdfName !== '-' ? (
            <FileDisplay
              fileName={pdfName}
              fileType="pdf"
              folderName={folderName}
            />
          ) : (
            <div className="text-sm">ไม่มีไฟล์แนบ</div>
          )}
        </div>
        <div className="font-bold text-sm">ความคิดเห็น</div>
        <TextareaForDisplay value={comment} />
      </div>
    </div>
  );
}
