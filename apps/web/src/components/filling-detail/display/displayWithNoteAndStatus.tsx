'use client';

import { ChevronDown, ChevronUp, CircleUserRound } from 'lucide-react';
import NameDate from './nameDate';
import Image from 'next/image';
import StatusButton from './statusButton';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../ui/collapsible';
import { useState } from 'react';
import FileDisplay from './fileDisplay';
import { DocumentType } from '@/src/interface/document';
import { TextDocumentActivity } from '@/src/styles/enumMap';
import { User } from '@/src/interface/user';
import { convertDate } from '@/src/lib/utils';

export default function DisplayWithNoteAndStatus({
  user,
  document,
}: {
  user?: User;
  document: DocumentType;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full relative">
      <Collapsible className="bg-gray-100 rounded-lg font-sukhumvit text-xl w-full">
        <div className="flex flex-row px-8">
          <NameDate
            title={user?.username ?? 'Secretary ESC'}
            date={'ส่งเอกสารเมื่อ ' + convertDate(document.createdAt)}
            activity={TextDocumentActivity[document.activity]}
          >
            <CircleUserRound size={30} className="shrink-0" />
          </NameDate>
          <div className="px-8 py-4 font-bold space-y-4 w-[35vw] grow">
            <div className="font-bold text-sm">ความคิดเห็น</div>
            <textarea
              className="bg-white rounded-lg min-h-[15vh] p-5 font-normal text-gray-600 break-words resize-none w-full text-sm"
              defaultValue={document.detail}
            ></textarea>
          </div>
          <div className="py-8 flex flex-col justify-between w-auto items-end space-y-5">
            <StatusButton status={document.status} />
            <CollapsibleTrigger
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
              <div className="space-y-2">
                <div>หมายเหตุ</div>
                <textarea
                  className="w-[40vw] bg-white rounded-lg p-5 font-normal break-words resize-none text-sm text-gray-600 font-sukhumvit h-[20vh]"
                  defaultValue={document.detail}
                />
              </div>
              <div className="pl-5">
                <div>ไฟล์แนบ</div>
                <div className="flex flex-col gap-6 pt-2">
                  <FileDisplay
                    fileName={document.pdfName}
                    fileType="pdf"
                    link=""
                  />
                  {document.docName !== '' && (
                    <FileDisplay
                      fileName={document.docName}
                      fileType="doc"
                      link=""
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
