import DisplayWithNote from './display/displayWithNote';
import DisplayWithStatus from './display/displayWithStatus';
import { Clock } from 'lucide-react';
import DisplayWithNoteAndStatus from './display/displayWithNoteAndStatus';
import UpdateDocumentAdmin from './create-edit/updateDocumentAdmin';
import CreateDocumentAdmin from './create-edit/createDocumentAdmin';
import { Document } from '@/src/interface/document';
import { DocumentStatus, FilingStatus } from '@/src/constant/enum';
import { DocumentActivity } from '../../../../api/src/constant/enum';

export default function FilingTimeline({
  documents,
  status,
  showCreateDocument,
  setShowCreateDocument,
}: {
  documents: Document[];
  status: FilingStatus;
  showCreateDocument: boolean;
  setShowCreateDocument: (showCreateDocument: boolean) => void;
}) {
  let previousDate = '';
  return (
    <div className="flex flex-col items-center gap-7">
      {/* 60+40+(32/2)-(3/2) = 114.5 */}
      {documents.length > 0 && (
        <div className="h-[calc(100%-2px)] w-[3px] bg-black absolute left-[114.5px] -z-10 top-[2px] overflow-hidden" />
      )}
      {documents.map((document, index) => {
        const currentDate = new Date(document.createdAt).toLocaleDateString(
          'th-TH',
          {
            year: '2-digit',
            month: 'short',
            day: 'numeric',
          },
        );
        const display =
          document.activity === DocumentActivity.REPLY ? (
            <DisplayWithStatus
              document={document}
              warning={status === FilingStatus.RETURNED && !showCreateDocument}
              displayEditButton={
                status === FilingStatus.RETURNED &&
                documents[0] &&
                documents[0].status !== DocumentStatus.DRAFT
              }
              setShowCreateDocument={setShowCreateDocument}
            />
          ) : document.status === DocumentStatus.DRAFT ? (
            <DisplayWithNote document={document} />
          ) : (
            <DisplayWithNoteAndStatus
              setShowCreateDocument={setShowCreateDocument}
              document={document}
            />
          );
        if (currentDate !== previousDate) {
          previousDate = currentDate;
          return (
            <>
              <div
                className="flex w-full pl-10 items-center text-3xl font-semibold"
                key={index}
              >
                <Clock className="w-8 h-8 bg-gray-100 p-1.5 rounded-full mr-5" />
                {currentDate ===
                new Date().toLocaleDateString('th-TH', {
                  year: '2-digit',
                  month: 'short',
                  day: 'numeric',
                })
                  ? 'วันนี้'
                  : currentDate}
              </div>
              {display}
            </>
          );
        }
        return display;
      })}
      <div className="flex w-full pl-10 items-center text-3xl font-semibold">
        <Clock className="w-8 h-8 bg-gray-100 p-1.5 rounded-full mr-5" />
        10 มิ.ย. 67
      </div>
      <CreateDocumentAdmin />
      <UpdateDocumentAdmin />
    </div>
  );
}
