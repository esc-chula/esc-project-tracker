import { useMemo, useState } from 'react';
import { IoIosAlert } from 'react-icons/io';
import type { DocumentType } from '@/src/interface/document';
import { DocumentStatus, FilingStatus } from '@/src/constant/enum';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '../../ui/select';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Button } from '../../ui/button';

export default function ReviewButton({
  isSubmitting,
  documents,
  status,
  reviewButton,
  setReviewButton,
  reviewDocument,
}: {
  isSubmitting: boolean;
  documents: DocumentType[];
  status: FilingStatus;
  reviewButton: string;
  setReviewButton: (_: string) => void;
  reviewDocument: () => Promise<void>;
}) {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState<boolean>(false);
  const isDisabled = useMemo(
    () =>
      isSubmitting ||
      !(
        (status === FilingStatus.WAIT_FOR_SECRETARY ||
          status === FilingStatus.WAIT_FOR_STUDENT_AFFAIR ||
          status === FilingStatus.RETURNED) &&
        documents.length &&
        documents[0].status === DocumentStatus.DRAFT
      ),
    [isSubmitting, status, documents],
  );
  return (
    <div className="flex">
      <Select
        disabled={isDisabled}
        value={reviewButton}
        onValueChange={setReviewButton}
      >
        <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogTrigger disabled={isDisabled}>
            <Button
              disabled={isDisabled}
              className={`${reviewButton === 'อนุมัติ' ? 'bg-accepted' : 'bg-red'} disabled:bg-lightgray border-r-white border-r-2 mx-auto rounded-none rounded-l-2xl text-2xl p-4 h-[52px] font-semibold text-white`}
            >
              {reviewButton}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <div className="flex flex-col items-center">
                <IoIosAlert size={150} className="text-center text-red" />
                <DialogTitle className="font-bold text-2xl">
                  ยืนยันการตอบกลับเอกสาร
                </DialogTitle>
              </div>
            </DialogHeader>
            <div className="bg-white rounded-lg space-y-4 flex flex-col items-center text-center ">
              การอนุมัติหรือตีกลับเอกสารจะไม่สามารถยกเลิกหรือแก้ไขได้
              หากต้องการแก้ไขเอกสารโปรดตอบกลับใหม่อีกครั้ง
              <DialogClose
                className=" disabled:bg-disabled bg-red text-white rounded-lg p-2 px-4 font-bold text-2xl mt-4"
                onClick={() => reviewDocument}
                disabled={isSubmitting}
              >
                ยืนยัน
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
        <SelectTrigger
          className={`${reviewButton === 'อนุมัติ' ? 'bg-accepted' : 'bg-red'} disabled:bg-lightgray mx-auto rounded-none border-none rounded-r-2xl text-2xl px-2 py-4 h-[52px] font-semibold  text-white`}
        />
        <SelectContent className="min-w-0">
          <SelectItem
            value="อนุมัติ"
            className=" font-semibold text-accepted focus:text-accepted"
          >
            อนุมัติ
          </SelectItem>
          <SelectItem
            value="ตีกลับ"
            className="font-semibold text-rejected focus:text-rejected"
          >
            ตีกลับ
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
