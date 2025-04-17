import { FilePlus, Undo2 } from 'lucide-react';
import { FilingStatus } from '@repo/shared';
import { Button } from '../../ui/button';

export default function AddDocumentButton({
  isAdmin,
  status,
  setShowCreateDocument,
}: {
  isAdmin: boolean;
  status: FilingStatus;
  setShowCreateDocument: (_: boolean) => void;
}) {
  return isAdmin ? (
    <Button
      variant="outline"
      disabled={
        status === FilingStatus.DRAFT ||
        status === FilingStatus.DOCUMENT_CREATED
      }
      onClick={() => {
        setShowCreateDocument(true);
      }}
      className="mx-auto rounded-xl text-base py-2 px-3.5 h-9 text-red font-medium disabled:bg-lightgray disabled:text-white disabled:border-none bg-red text-white"
    >
      <Undo2 className="h-5 w-5 mr-2" />
      ตอบกลับ
    </Button>
  ) : (
    <Button
      variant="outline"
      onClick={() => {
        setShowCreateDocument(true);
      }}
      className="mx-auto rounded-xl text-base py-2 px-3.5 h-9 text-red font-medium disabled:bg-lightgray disabled:text-white disabled:border-none bg-red text-white"
    >
      <FilePlus className="h-5 w-5 mr-2" />
      อัปโหลดเอกสาร
    </Button>
  );
}
