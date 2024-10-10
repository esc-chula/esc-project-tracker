import { Send } from 'lucide-react';
import { DocumentStatus, FilingStatus } from '@/src/constant/enum';
import type { DocumentType } from '@/src/interface/document';
import { Button } from '../../ui/button';

export default function SubmissionButton({
  isSubmitting,
  status,
  documents,
  submitDocument,
  isAdmin,
}: {
  isSubmitting: boolean;
  status: FilingStatus;
  documents: DocumentType[];
  submitDocument: () => Promise<void>;
  isAdmin: boolean;
}) {
  return (
    <Button
      disabled={
        isSubmitting ||
        !(
          (status === FilingStatus.DOCUMENT_CREATED ||
            status === FilingStatus.RETURNED ||
            (status === FilingStatus.APPROVED && isAdmin)) &&
          documents.length &&
          documents[0].status === DocumentStatus.DRAFT
        )
      }
      onClick={() => submitDocument}
      className="disabled:bg-lightgray mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold bg-red text-white"
    >
      <Send className="h-8 w-8 mr-2" />
      ส่ง
    </Button>
  );
}
