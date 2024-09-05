'use client';

import { useState } from 'react';
import {
  Collapsible,
  CollapsibleTrigger,
} from '@/src/components/ui/collapsible';
import {
  CircleUserRound,
  EllipsisVertical,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import Note from './note';
import NameDate from './nameDate';
import FileDisplay from './fileDisplay';
import { DocumentType } from '@/src/interface/document';
import { TextDocumentActivity } from '@/src/styles/enumMap';
import { User } from '@/src/interface/user';
import { convertDate } from '@/src/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog';
import { IoIosAlert } from 'react-icons/io';

export default function DisplayWithNote({
  document,
  user,
  handleDeleteDocument,
}: {
  document: DocumentType;
  user?: User;
  handleDeleteDocument: (documentId: string) => Promise<void>;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Collapsible className="bg-gray-100 rounded-lg font-sukhumvit text-xl w-full">
      <div className="flex flex-row px-8">
        <NameDate
          title={user?.username ?? 'นายสมชาย สายชลลลลลลลลลลลลล'}
          date={'ส่งเอกสารเมื่อ ' + convertDate(document.createdAt)}
          activity={TextDocumentActivity[document.activity]}
        >
          <CircleUserRound size={30} className="shrink-0" />
        </NameDate>

        <div className="py-8 space-y-4 px-8 w-[35vw] grow">
          <div>
            <span className="font-bold">รายละเอียดเอกสาร: </span>
            <span>{document.name}</span>
          </div>
          <div>
            <div className="font-bold text-sm">ไฟล์แนบ</div>
            <div className="flex flex-row py-2 gap-5 flex-wrap">
              <FileDisplay fileName={document.pdfName} fileType="pdf" link="" />
              {document.docName !== '' && document.docName !== '-' && (
                <FileDisplay
                  fileName={document.docName}
                  fileType="doc"
                  link=""
                />
              )}
            </div>
          </div>
        </div>
        <div className="py-8 flex flex-col justify-between w-auto items-end">
          <Popover>
            <PopoverTrigger>
              <EllipsisVertical />
            </PopoverTrigger>
            <PopoverContent
              side="left"
              align="start"
              className="w-auto flex flex-col"
            >
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger>ลบ</DialogTrigger>
                <DialogContent className="max-w-sm">
                  <div className="bg-white rounded-lg space-y-4">
                    <div className="flex justify-center">
                      <IoIosAlert size={100} className=" text-red" />
                    </div>
                    <div className="text-center font-sukhumvit font-bold text-xl">
                      ยืนยันการลบเอกสารฉบับร่าง
                    </div>
                    <div className="text-center ">
                      <button
                        className="disabled:bg-disabled bg-red text-white rounded-lg py-1 px-4 font-sukhumvit font-semibold"
                        onClick={() => {
                          setIsSubmitting(true);
                          handleDeleteDocument(document.id).then(() => {
                            setIsSubmitting(false);
                            setIsOpen(false);
                          });
                        }}
                        disabled={isSubmitting}
                      >
                        ยืนยัน
                      </button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </PopoverContent>
          </Popover>
          <CollapsibleTrigger
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </CollapsibleTrigger>
        </div>
      </div>
      <Note note={document.detail ?? '-'} />
    </Collapsible>
  );
}
