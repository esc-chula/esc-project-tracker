'use client';

import type { Row } from '@tanstack/react-table';
import type { FilingWithDocument } from '@/src/types/filing';
import FileDisplay from '../../filling-detail/display/fileDisplay';
import { Checkbox } from '../../ui/checkbox';

export default function FilingTabShowDetail({
  filingWithDocument,
  row,
  setSelectedFilingWithDocument,
  updatedAt,
  isActive,
  projectName,
}: {
  filingWithDocument: FilingWithDocument;
  row: Row<FilingWithDocument>;
  isActive: boolean;
  setSelectedFilingWithDocument: (
    filingWithDocument: FilingWithDocument,
  ) => void;
  updatedAt: string;
  projectName: string;
}) {
  const noFile =
    filingWithDocument.document.pdfName === '' ||
    filingWithDocument.document.pdfName === '-';
  return (
    <button
      type="button"
      className={`hover:cursor-pointer w-full p-2 border-y-lightgray border-y-2 px-4 space-y-2 hover:bg-orange-50 text-start ${
        isActive ? 'bg-orange-50' : ''
      } `}
      onClick={() => {
        setSelectedFilingWithDocument(filingWithDocument);
      }}
    >
      <div className="flex gap-4">
        <Checkbox
          checked={row.getIsSelected()}
          onClick={(e) => {
            e.stopPropagation();
            row.toggleSelected();
          }}
          className={`mt-1 data-[state=checked]:bg-intania ${noFile ? ' opacity-0' : ''}`}
        />
        <div className="grow">
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
          {!noFile ? (
            <div className="flex flex-row space-x-4">
              <FileDisplay
                fileName={filingWithDocument.document.pdfName || ''}
                fileType="pdf"
                folderName={`${filingWithDocument.filing.projectId}/${filingWithDocument.filing.id}`}
                documentId={filingWithDocument.document.id}
              />
            </div>
          ) : (
            <div className="text-red">ไม่พบเอกสาร</div>
          )}
        </div>
      </div>
    </button>
  );
}
