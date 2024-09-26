import {
  DocumentActivity,
  DocumentStatus,
  FilingStatus,
} from '@/src/constant/enum';
import type { DocumentType } from '@/src/interface/document';
import type { User } from '@/src/interface/user';
import DisplayWithNoteAndStatus from './display/displayWithNoteAndStatus';
import DisplayWithStatus from './display/displayWithStatus';
import DisplayWithNote from './display/displayWithNote';
import Display from './display/display';

export default function DocumentCard({
  document,
  index,
  user,
  isAdmin,
  status,
  folderName,
  documents,
  handleDeleteDocument,
  setShowCreateDocument,
  showCreateDocument,
}: {
  document: DocumentType;
  index: number;
  user: User | undefined;
  isAdmin: boolean;
  status: FilingStatus;
  folderName: string;
  documents: DocumentType[];
  handleDeleteDocument: (documentId: string) => Promise<void>;
  setShowCreateDocument: (showCreateDocument: boolean) => void;
  showCreateDocument: boolean;
}) {
  // find rightmost index of first RETURNED documents group
  let returnedDocumentIndex = documents.length;
  for (let i = 0; i < documents.length; i++) {
    if (documents[i].status === DocumentStatus.RETURNED)
      returnedDocumentIndex = i;
    else if (returnedDocumentIndex !== documents.length) break;
  }
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
  return isAdmin &&
    document.status === DocumentStatus.DRAFT &&
    document.activity === DocumentActivity.REPLY &&
    !(
      status === FilingStatus.DRAFT || status === FilingStatus.DOCUMENT_CREATED
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
      warning={showEditButton ? !showCreateDocument : false}
      showEditButton={showEditButton}
      setShowCreateDocument={setShowCreateDocument}
      folderName={folderName}
    />
  ) : document.status === DocumentStatus.DRAFT &&
    (status === FilingStatus.DRAFT ||
      status === FilingStatus.DOCUMENT_CREATED ||
      (status === FilingStatus.RETURNED && index < returnedDocumentIndex)) ? (
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
}
