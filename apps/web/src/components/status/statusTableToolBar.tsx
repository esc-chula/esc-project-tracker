import type { Table } from '@tanstack/react-table';
import type { Filing } from '@/src/interface/filing';
import type { Gendoc } from '@/src/interface/gendoc';
import SearchPanel from '../all-projects/searchPanel';
import PopoverAddFiling from '../project/popoverAddFiling';

export default function StatusTableToolBar({
  table,
  filingFunc,
  gendocFunc,
  projectId,
}: {
  table: Table<Filing> | Table<Gendoc>;
  filingFunc?: (filing: Filing) => void;
  gendocFunc?: (gendoc: Gendoc) => void;
  projectId?: string;
}) {
  return (
    <div className="flex items-center gap-4 py-4">
      <SearchPanel
        placeHolder="ค้นหาเอกสาร"
        filings={filingFunc ? (table.options.data as Filing[]) : undefined}
        gendocs={gendocFunc ? (table.options.data as Gendoc[]) : undefined}
        filingFunc={filingFunc}
        gendocFunc={gendocFunc}
        clearFunc={() => {
          table.resetColumnFilters();
        }}
      />
      <PopoverAddFiling
        projectId={projectId ?? ''}
        addFilingToParent={(filing) => {
          console.log(filing);
        }}
      />
    </div>
  );
}
