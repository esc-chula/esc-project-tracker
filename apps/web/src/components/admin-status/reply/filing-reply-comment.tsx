'use client';
import { IoReturnUpBack } from 'react-icons/io5';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '../../ui/select';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { IoIosAlert } from 'react-icons/io';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import FileInputPanel from '../../filling-detail/create-edit/fileInputPanel';
import ButtonPanel from '../../filling-detail/create-edit/buttonPanel';
import { z } from 'zod';
import { zodDocumentFiles } from '@/src/constant/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { getFileType } from '@/src/lib/utils';
import uploadFileToS3 from '@/src/service/aws/uploadFileToS3';
import createDocument from '@/src/service/document/createDocument';
import { toast } from '../../ui/use-toast';

export default function FilingReplyComment() {
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null); // State to track selected value
  const [comment, setComment] = useState<string>(''); // State to store comment
  const [reviewButton, setReviewButton] = useState<string>('อนุมัติ');
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const createdFormSchema = z.object({
    file: zodDocumentFiles,
    comment: z.string().optional(),
  });

  const form = useForm<z.infer<typeof createdFormSchema>>({
    resolver: zodResolver(createdFormSchema),
  });

  const fileRef = form.register('file');

  async function onSubmit(values: z.infer<typeof createdFormSchema>) {
    // TODO: change to actual userId
    try {
      const swap = getFileType(values.file[0]) !== 'pdf';
      const pdfFile = values.file[swap ? 1 : 0];
      const docFile = values.file[swap ? 0 : 1];
      //const folderName = `${projectId}/${filingId}`;
      const folderName = 'test/1';

      const [pdfName, docName] = await Promise.all([
        uploadFileToS3({
          file: pdfFile,
          folderName,
        }),
        docFile &&
          uploadFileToS3({
            file: docFile,
            folderName,
          }),
      ]);

      if (!pdfName || (docFile && !docName))
        throw new Error('Upload file failed');

      /* const newDocument = await createDocument({
        document: {
          name: values.detail,
          filingId,
          pdfName: pdfName,
          docName: docName ?? '',
          activity: values.activity as DocumentActivity,
          userId: 'd1c0d106-1a4a-4729-9033-1b2b2d52e98a',
          detail: values.note,
          comment: values.comment,
        },
      });
      afterCreateDocument(newDocument); */
      toast({
        title: 'แก้ไขเอกสารสำเร็จ',
        //description: `แก้ไขเอกสาร ${newDocument.name} สำเร็จ`,
        description: `แก้ไขเอกสารสำเร็จ`,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'แก้ไขเอกสารไม่สำเร็จ',
          description: error.message,
          isError: true,
        });
      }
    }
  }

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  const ReviewSubmissionButton = () => {
    /* const isDisabled = useMemo(
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
    ); */
    const isDisabled = false;
    return (
      <div className="flex">
        <Select
          disabled={isDisabled}
          value={reviewButton}
          onValueChange={setReviewButton}
        >
          <Dialog
            open={isReviewDialogOpen}
            onOpenChange={setIsReviewDialogOpen}
          >
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
                    /* reviewDocument(); */
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
  };

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex justify-between w-full items-center">
        <div className="font-bold text-xl">
          <IoReturnUpBack className="h-8 w-8 mr-2 inline-block" />
          ตอบกลับ
        </div>
        <ReviewSubmissionButton />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-lightgray rounded-xl font-sukhumvit w-full px-5 pt-5 pb-3 flex text-start flex-col space-y-3"
        >
          <div className="flex flex-row justify-between">
            <div className="w-[45%] justify-between space-x-5">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold text-sm block">
                      ความคิดเห็น
                    </FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="เพิ่มความคิดเห็น"
                        {...field}
                        className="border-2 rounded-lg p-4 w-full h-[20vh] resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[45%]">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="h-full flex flex-col">
                    <FormLabel className="font-bold text-sm ">
                      อัปโหลดเอกสาร<span className="text-red">*</span>
                    </FormLabel>
                    <FileInputPanel fileRef={fileRef} fileList={field.value} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <ButtonPanel
              isDisabled={form.formState.isSubmitting}
              //setShowCreateDocument={setShowCreateDocument}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
