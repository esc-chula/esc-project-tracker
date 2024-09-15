import DisplayWithNote from './display/displayWithNote';
import DisplayWithStatus from './display/displayWithStatus';
import { Clock } from 'lucide-react';
import DisplayWithNoteAndStatus from './display/displayWithNoteAndStatus';
import { DocumentType } from '@/src/interface/document';
import { DocumentStatus, FilingStatus } from '@/src/constant/enum';
import { DocumentActivity } from '../../../../api/src/constant/enum';
import { User } from '@/src/interface/user';
import Display from './display/display';

export default function FilingTimeline({
  documents,
  status,
  showCreateDocument,
  setShowCreateDocument,
  usernameMap,
  handleDeleteDocument,
  isAdmin = false,
  folderName,
}: {
  documents: DocumentType[];
  status: FilingStatus;
  showCreateDocument: boolean;
  setShowCreateDocument: (showCreateDocument: boolean) => void;
  usernameMap: Map<string, User>;
  handleDeleteDocument: (documentId: string) => Promise<void>;
  isAdmin?: boolean;
  folderName: string;
}) {
  let previousDate = '';

  let returnedDocumentIndex = documents.length;
  for (let i = 0; i < documents.length; i++) {
    if (documents[i].status === DocumentStatus.RETURNED)
      returnedDocumentIndex = i;
    else if (returnedDocumentIndex !== documents.length) break;
  }
  return (
    <div className="flex flex-col items-center gap-7 mb-14">
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
        const user = usernameMap.get(document.userId ?? '');
        const showEditButton =
          !isAdmin &&
          document.status === DocumentStatus.RETURNED &&
          status === FilingStatus.RETURNED &&
          documents.length > 0 &&
          documents[0].status !== DocumentStatus.DRAFT &&
          index <= returnedDocumentIndex;
        const showReplyButton =
          document.status === DocumentStatus.WAIT_FOR_SECRETARY &&
          isAdmin &&
          status === FilingStatus.WAIT_FOR_SECRETARY &&
          documents.length > 0 &&
          documents[0].status !== DocumentStatus.DRAFT &&
          index < returnedDocumentIndex;
        const display =
          isAdmin &&
          document.status === DocumentStatus.DRAFT &&
          document.activity === DocumentActivity.REPLY &&
          !(
            status === FilingStatus.DRAFT ||
            status === FilingStatus.DOCUMENT_CREATED
          ) ? (
            <Display
              document={document}
              user={user}
              handleDeleteDocument={handleDeleteDocument}
              folderName={folderName}
            />
          ) : document.activity === DocumentActivity.REPLY ? (
            <DisplayWithStatus
              document={document}
              user={user}
              warning={showEditButton && !showCreateDocument}
              showEditButton={showEditButton}
              setShowCreateDocument={setShowCreateDocument}
              folderName={folderName}
            />
          ) : document.status === DocumentStatus.DRAFT &&
            (status === FilingStatus.DRAFT ||
              status === FilingStatus.DOCUMENT_CREATED ||
              (status === FilingStatus.RETURNED &&
                index < returnedDocumentIndex)) ? (
            <DisplayWithNote
              document={document}
              user={user}
              handleDeleteDocument={handleDeleteDocument}
              folderName={folderName}
            />
          ) : (
            <DisplayWithNoteAndStatus
              document={document}
              user={user}
              showReplyButton={showReplyButton}
              setShowCreateDocument={setShowCreateDocument}
              handleDeleteDocument={
                isAdmin &&
                status === FilingStatus.APPROVED &&
                document.status === DocumentStatus.DRAFT
                  ? handleDeleteDocument
                  : undefined
              }
              folderName={folderName}
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
    </div>
  );
}
