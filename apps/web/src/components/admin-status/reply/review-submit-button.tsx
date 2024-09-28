'use client';
import { IoIosAlert } from 'react-icons/io';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '../../ui/select';
import { useEffect, useState } from 'react';
import reviewSubmission from '@/src/service/document/reviewSubmission';
import { toast } from '../../ui/use-toast';

export default function ReviewSubmitButton({
  isSubmitted,
  latestReplyDocumentId,
}: {
  isSubmitted: boolean;
  latestReplyDocumentId: string;
}) {
  const [reviewButton, setReviewButton] = useState<string>('อนุมัติ');
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setIsDisabled(!isSubmitted);
    if (isSubmitting) {
      setIsDisabled(true);
    }
  }, [isSubmitted, isSubmitting]);

  const reviewDocument = async () => {
    setIsSubmitting(true);
    try {
      const updatedStatus = reviewButton === 'อนุมัติ';

      console.log('latestReplyDocumentId', latestReplyDocumentId);
      await reviewSubmission({
        id: latestReplyDocumentId,
        updatedStatus,
      });

      toast({
        title: 'ตอบกลับเอกสารสำเร็จ',
        description: `${reviewButton}เอกสารสำเร็จ`,
        isError: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'ตอบกลับเอกสารไม่สำเร็จ',
          description: error.message,
          isError: true,
        });
      }
    }
    setIsSubmitting(false);
  };

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
                onClick={() => {
                  reviewDocument();
                }}
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
