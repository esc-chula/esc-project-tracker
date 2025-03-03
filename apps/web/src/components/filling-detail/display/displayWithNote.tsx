'use client';

import { useState } from 'react';
import { CircleUserRound, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Collapsible,
  CollapsibleTrigger,
} from '@/src/components/ui/collapsible';
import type { Document } from '@/src/interface/document';
import { TextDocumentActivity } from '@/src/styles/enumMap';
import type { User } from '@/src/interface/user';
import { convertDate } from '@/src/lib/utils';
import FileDisplay from './fileDisplay';
import Note from './note';
import NameDate from './nameDate';
import DraftDocumentPopover from './draftDocumentPopover';

export default function DisplayWithNote({
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
  const [expanded, setExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible className="bg-gray-100 rounded-lg font-sukhumvit text-xl w-full">
      <div className="flex flex-row px-8">
        <NameDate
          title={user?.username ?? 'ไม่มีชื่อผู้ใช้'}
          date={`ส่งเอกสารเมื่อ ${convertDate(document.createdAt)}`}
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
              <FileDisplay
                fileName={document.pdfName}
                fileType="pdf"
                folderName={folderName}
                documentId={document.id}
              />
              {document.docName !== '' && document.docName !== '-' && (
                <FileDisplay
                  fileName={document.docName}
                  fileType="doc"
                  folderName={folderName}
                  documentId={document.id}
                />
              )}
            </div>
          </div>
        </div>
        <div className="py-8 flex flex-col justify-between w-auto items-end">
          <DraftDocumentPopover
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleDeleteButton={() => {
              void handleDeleteDocument(document.id);
            }}
          />
          <CollapsibleTrigger
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </CollapsibleTrigger>
        </div>
      </div>
      <Note note={document.detail ?? ''} />
    </Collapsible>
  );
}
