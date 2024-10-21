'use client';

import { useState } from 'react';
import {
  Collapsible,
  CollapsibleTrigger,
} from '@/src/components/ui/collapsible';
import { CircleUserRound, ChevronDown, ChevronUp } from 'lucide-react';
import Note from './note';
import NameDate from './nameDate';
import FileDisplay from './fileDisplay';
import { DocumentType } from '@/src/interface/document';
import { TextDocumentActivity } from '@/src/styles/enumMap';
import { User } from '@/src/interface/user';
import { convertDate } from '@/src/lib/utils';
import DraftDocumentPopover from './draftDocumentPopover';

export default function DisplayWithNote({
  document,
  user,
  handleDeleteDocument,
  folderName,
}: {
  document: DocumentType;
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
              <FileDisplay
                fileName={document.pdfName}
                fileType="pdf"
                folderName={folderName}
              />
              {document.docName !== '' && document.docName !== '-' && (
                <FileDisplay
                  fileName={document.docName}
                  fileType="doc"
                  folderName={folderName}
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
              handleDeleteDocument(document.id);
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
      <Note note={document.detail} />
    </Collapsible>
  );
}
