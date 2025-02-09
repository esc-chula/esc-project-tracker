'use client';
import type { RowModel } from '@tanstack/react-table';
import type { FilingsWithDocument } from '@/src/types/filing';
import FilingTabShowDetail from './filing-tab-show-detail';
import FilingTabNotFound from './filing-tab-not-found';

export default function FilingTabShow({
  tabValue,
  selectedFilingId,
  setSelectedFilingId,
  rowModel,
}: {
  tabValue: number;
  selectedFilingId: string;
  setSelectedFilingId: (id: string) => void;
  rowModel: RowModel<FilingsWithDocument>;
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
          setSelectedFilingId={setSelectedFilingId}
          updatedAt={filingWithDocument.getValue('updatedAt')}
          isActive={selectedFilingId === filingWithDocument.original.filing.id}
          projectName={filingWithDocument.getValue('projectName')}
        />
      ))}
    </div>
  );
}
