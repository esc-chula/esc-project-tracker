'use client';
import type { RowModel } from '@tanstack/react-table';
import type { FilingWithDocument } from '@/src/types/filing';
import FilingTabShowDetail from './filing-tab-show-detail';
import FilingTabNotFound from './filing-tab-not-found';

export default function FilingTabShow({
  tabValue,
  selectedFilingId,
  setSelectedFilingWithDocument,
  rowModel,
}: {
  tabValue: number;
  selectedFilingId: string;
  setSelectedFilingWithDocument: (
    filingWithDocument: FilingWithDocument,
  ) => void;
  rowModel: RowModel<FilingWithDocument>;
}) {
  if (rowModel.rows.length === 0) {
    return <FilingTabNotFound value={tabValue} />;
  }
  return (
    <div className="w-full h-full flex flex-col font-sukhumvit pt-2">
      {rowModel.rows.map((filingWithDocument) => (
        <FilingTabShowDetail
          key={filingWithDocument.id}
          filingWithDocument={filingWithDocument.original}
          setSelectedFilingWithDocument={setSelectedFilingWithDocument}
          updatedAt={filingWithDocument.getValue('updatedAt')}
          isActive={selectedFilingId === filingWithDocument.original.filing.id}
          projectName={filingWithDocument.getValue('projectName')}
        />
      ))}
    </div>
  );
}
