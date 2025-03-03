'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Document } from '@/src/interface/document';
import { TextDocumentActivity } from '@/src/styles/enumMap';
import type { User } from '@/src/interface/user';
import { convertDate } from '@/src/lib/utils';
import { Collapsible } from '../../ui/collapsible';
import NameDate from './nameDate';
import FileDisplay from './fileDisplay';
import DraftDocumentPopover from './draftDocumentPopover';
import TextareaForDisplay from './textareaForDisplay';

export default function Display({
  document,
  user,
  handleDeleteDocument,
  folderName,
}: {
  document: Document;
  user?: User;
  handleDeleteDocument: (documentId: string) => Promise<void>;
  folderName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible className="bg-gray-100 rounded-lg font-sukhumvit text-xl w-full">
      <div className="flex flex-row px-8">
        <NameDate
          title={user?.username ?? 'Secretary ESC'}
          date={`ส่งเอกสารเมื่อ ${convertDate(document.createdAt)}`}
          activity={TextDocumentActivity[document.activity]}
        >
          <Image
            src="/icons/esc-red.svg"
            width={30}
            height={30}
            alt="esc-icon"
          />
        </NameDate>
        <div className="px-8 py-4 font-bold space-y-4 w-[35vw] grow">
          <div className="flex flex-row items-center gap-x-6 gap-y-2 flex-wrap">
            <div className="font-bold text-sm shrink-0">ไฟล์แนบ</div>
            {document.pdfName !== '' && document.pdfName !== '-' ? (
              <FileDisplay
                fileName={document.pdfName}
                fileType="pdf"
                folderName={folderName}
                documentId={document.id}
              />
            ) : (
              <div className="text-sm">ไม่มีไฟล์แนบ</div>
            )}
          </div>
          <div className="font-bold text-sm">ความคิดเห็น</div>
          <TextareaForDisplay value={document.comment} />
        </div>
        <div className="py-8 flex flex-col justify-between w-auto items-end">
          <DraftDocumentPopover
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleDeleteButton={() => {
              void handleDeleteDocument(document.id);
            }}
          />
        </div>
      </div>
    </Collapsible>
  );
}
