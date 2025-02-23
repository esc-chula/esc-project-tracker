'use client';
import { Document } from '@/src/interface/document';
import { convertDate } from '@/src/lib/utils';
import { TextDocumentActivity } from '@/src/styles/enumMap';
import Image from 'next/image';
import NameDateStatus from './name-date-status';
import FilingReplyNoteAndFile from './filing-reply-note-and-file';

export default function FilingReplyDetail({
  projectId,
  filingId,
  owner,
  documentDetail,
}: {
  projectId: string;
  filingId: string;
  owner: string;
  documentDetail: Document | null;
}) {
  return (
    <div className="w-full bg-lightgray p-5 rounded-xl space-y-2 ">
      <NameDateStatus
        title={owner}
        date={'ส่งเอกสารเมื่อ ' + convertDate(documentDetail?.createdAt || '')}
        activity={TextDocumentActivity[documentDetail?.activity || 'CREATE']}
      >
        <Image src="/icons/esc-red.svg" width={30} height={30} alt="esc-icon" />
      </NameDateStatus>
      <FilingReplyNoteAndFile
        latestDocument={documentDetail}
        projectId={projectId}
        filingId={filingId}
      />
    </div>
  );
}
