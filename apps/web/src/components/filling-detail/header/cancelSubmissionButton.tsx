import { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
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
          className="mx-auto rounded-xl text-base py-2 px-3.5 h-9 font-medium border-red text-red"
        >
          <SendHorizontal className="h-5 w-5 mr-2" />
          ยกเลิกการส่ง
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
