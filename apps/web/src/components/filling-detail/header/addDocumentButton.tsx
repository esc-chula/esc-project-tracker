import { Plus } from 'lucide-react';
import { FilingStatus } from '@/src/constant/enum';
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
  return (
    <Button
      variant="outline"
      disabled={
        (!isAdmin &&
          (status === FilingStatus.WAIT_FOR_SECRETARY ||
            status === FilingStatus.WAIT_FOR_STUDENT_AFFAIR)) ||
        (isAdmin &&
          (status === FilingStatus.DRAFT ||
            status === FilingStatus.DOCUMENT_CREATED))
      }
      onClick={() => {
        setShowCreateDocument(true);
      }}
      className="mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] text-red font-semibold border-red disabled:bg-lightgray disabled:text-white disabled:border-none"
    >
      <Plus className="h-8 w-8 mr-2" />
      เพิ่ม
    </Button>
  );
}
