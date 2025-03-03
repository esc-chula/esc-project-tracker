'use client';

import type { FilingWithDocument } from '@/src/types/filing';
import FileDisplay from '../../filling-detail/display/fileDisplay';

export default function FilingTabShowDetail({
  filingWithDocument,
  setSelectedFilingWithDocument,
  updatedAt,
  isActive,
  projectName,
}: {
  filingWithDocument: FilingWithDocument;
  isActive: boolean;
  setSelectedFilingWithDocument: (
    filingWithDocument: FilingWithDocument,
  ) => void;
  updatedAt: string;
  projectName: string;
}) {
  return (
    <div
      className={`hover:cursor-pointer w-full p-2 border-y-lightgray border-y-2 px-4 space-y-2 hover:bg-orange-50 ${
        isActive ? 'bg-orange-50' : ''
      }`}
      onClick={() => {
        setSelectedFilingWithDocument(filingWithDocument);
      }}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold text-black truncate overflow-hidden whitespace-nowrap w-[50%]">
          {projectName || '...'}
        </div>
        <div className="flex-shrink-0">{updatedAt || '--'}</div>
      </div>

      <div className="flex flex-row space-x-2 items-center">
        <div className="flex-shrink-0">
          {filingWithDocument.filing.projectCode || '....'}-
          {filingWithDocument.filing.filingCode || '....'}
        </div>
        <div className="truncate overflow-hidden whitespace-nowrap w-[50%] pr-5">
          {filingWithDocument.filing.name || '...'}
        </div>
      </div>

      {filingWithDocument.document.pdfName !== '' &&
      filingWithDocument.document.pdfName !== '-' ? (
        <div className="flex flex-row space-x-4">
          <FileDisplay
            fileName={filingWithDocument.document.pdfName || ''}
            fileType="pdf"
            folderName={`${filingWithDocument.filing.projectId}/${filingWithDocument.filing.id}`}
          />
        </div>
      ) : (
        <div className="text-red">ไม่พบเอกสาร</div>
      )}
    </div>
  );
}
