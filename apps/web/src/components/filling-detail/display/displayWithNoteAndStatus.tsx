'use client';

import { CircleUserRound } from 'lucide-react';
import { useState } from 'react';
import type { DocumentType } from '@/src/interface/document';
import { TextDocumentActivity } from '@/src/styles/enumMap';
import type { User } from '@/src/interface/user';
import { convertDate } from '@/src/lib/utils';
import FileDisplay from './fileDisplay';
import StatusButton from './statusButton';
import NameDate from './nameDate';
import DraftDocumentPopover from './draftDocumentPopover';
import TextareaForDisplay from './textareaForDisplay';

export default function DisplayWithNoteAndStatus({
  user,
  document,
  showReplyButton,
  setShowCreateDocument,
  handleDeleteDocument,
  folderName,
}: {
  user?: User;
  document: DocumentType;
  showReplyButton: boolean;
  setShowCreateDocument: (showCreateDocument: boolean) => void;
  handleDeleteDocument?: (documentId: string) => Promise<void>;
  folderName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-100 rounded-lg font-sukhumvit text-xl w-full">
      <div className="flex flex-row pl-8 pr-6">
        <NameDate
          title={user?.username ?? 'Secretary ESC'}
          date={`ส่งเอกสารเมื่อ ${convertDate(document.createdAt)}`}
          activity={TextDocumentActivity[document.activity]}
        >
          <CircleUserRound size={30} className="shrink-0" />
        </NameDate>
        <div className="px-8 py-4 font-bold space-y-4 w-[35vw] grow">
          <div className="flex gap-6 items-center text-base">
            <div className="shrink-0">ไฟล์แนบ</div>
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
          <div className="font-bold text-sm">ความคิดเห็น</div>
          <TextareaForDisplay value={document.comment} />
        </div>
        <div className="py-8 flex flex-col justify-between w-auto items-end space-y-5">
          {handleDeleteDocument ? (
            <DraftDocumentPopover
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleDeleteButton={() => {
                void handleDeleteDocument(document.id);
              }}
            />
          ) : (
            <StatusButton
              status={document.status}
              showReplyButton={showReplyButton}
              setShowCreateDocument={setShowCreateDocument}
            />
          )}
          {/* <CollapsibleTrigger
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </CollapsibleTrigger>
        </div>
      </div>
        <CollapsibleContent>
        <div className="border-t-2 px-8 py-4 font-bold text-sm flex flex-col space-y-4 ">
          <div>
            <span className="font-bold">รายละเอียดเอกสาร: </span>
            <span className="font-normal">{document.name}</span>
          </div>
          <div className="flex flex-row">
            <div className="space-y-2 w-[40vw]">
              <div>หมายเหตุ</div>
              <TextareaForDisplay value={document.detail} />
            </div>
            <div className="pl-5">
              <div>ไฟล์แนบ</div>
              <div className="flex flex-col gap-6 pt-2">
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
              </div> */}
        </div>
      </div>
    </div>
  );
}
