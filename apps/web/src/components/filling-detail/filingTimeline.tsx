import { Clock } from 'lucide-react';
import type { FilingStatus } from '@repo/shared';
import type { Document } from '@/src/interface/document';
import type { User } from '@/src/interface/user';
import DocumentCard from './documentCard';

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
  documents: Document[];
  status: FilingStatus;
  showCreateDocument: boolean;
  setShowCreateDocument: (showCreateDocument: boolean) => void;
  usernameMap: Map<string, User>;
  handleDeleteDocument: (documentId: string) => Promise<void>;
  isAdmin?: boolean;
  folderName: string;
}) {
  let previousDate = '';

  const AllDocumentCards = () =>
    documents.map((document, index) => {
      const currentDate = new Date(document.createdAt).toLocaleDateString(
        'th-TH',
        {
          year: '2-digit',
          month: 'short',
          day: 'numeric',
        },
      );

      if (currentDate !== previousDate) {
        previousDate = currentDate;
        return (
          <>
            <div
              className="flex w-full pl-10 items-center text-3xl font-semibold z-10"
              key={`card-${document.id}`}
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
            <div key={document.id} className="w-full relative">
              <DocumentCard
                document={document}
                index={index}
                user={usernameMap.get(document.userId ?? '')}
                isAdmin={isAdmin}
                status={status}
                folderName={folderName}
                documents={documents}
                handleDeleteDocument={handleDeleteDocument}
                setShowCreateDocument={setShowCreateDocument}
                showCreateDocument={showCreateDocument}
              />
            </div>
          </>
        );
      }
      return (
        <div key={document.id} className="w-full relative">
          <DocumentCard
            document={document}
            index={index}
            user={usernameMap.get(document.userId ?? '')}
            isAdmin={isAdmin}
            status={status}
            folderName={folderName}
            documents={documents}
            handleDeleteDocument={handleDeleteDocument}
            setShowCreateDocument={setShowCreateDocument}
            showCreateDocument={showCreateDocument}
          />
        </div>
      );
    });

  return (
    <div className="flex flex-col items-center gap-7 mb-14">
      {/* 40+(32/2)-(3/2) = 54.5 */}
      {documents.length > 0 && (
        <div className="h-[calc(100%-2px)] w-[3px] bg-black absolute left-[54.5px] top-[2px] overflow-hidden" />
      )}
      <AllDocumentCards />
    </div>
  );
}
