import { useState } from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Button } from '../../ui/button';

export default function CancelSubmissionButton({
  isSubmitting,
  cancelDocumentSubmission,
}: {
  isSubmitting: boolean;
  cancelDocumentSubmission: () => Promise<void>;
}) {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState<boolean>(false);
  return (
    <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
      <DialogTrigger>
        <Button
          disabled={isSubmitting}
          variant="outline"
          className="mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold border-black disabled:bg-disabled"
        >
          <X className="h-8 w-8 mr-2" />
          ยกเลิก
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-semibold text-2xl">
            ยกเลิกการส่งเอกสาร
          </DialogTitle>
        </DialogHeader>
        <div className="bg-white rounded-lg space-y-4">
          ยกเลิกการส่งเอกสารเพื่อเปลี่ยนแปลงข้อมูล
          โปรดอย่าลืมส่งอีกครั้งเมื่อดำเนินการเสร็จ
          <div className="text-end">
            <DialogClose
              className=" disabled:bg-disabled bg-red text-white rounded-lg py-1 px-4 font-semibold"
              onClick={() => {
                void cancelDocumentSubmission();
              }}
              disabled={isSubmitting}
            >
              ยืนยัน
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
