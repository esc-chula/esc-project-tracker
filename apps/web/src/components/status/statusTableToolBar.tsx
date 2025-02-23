import type { Table } from '@tanstack/react-table';
import type { Filing } from '@/src/interface/filing';
import SearchPanel from '../all-projects/searchPanel';

export default function StatusTableToolBar({
  table,
  filingFunc,
}: {
  table: Table<Filing>;
  filingFunc: (filing: Filing) => void;
}) {
  return (
    <div className="flex items-center gap-4 py-4">
      <SearchPanel
        placeHolder="ค้นหาเอกสาร"
        filings={table.options.data}
        filingFunc={filingFunc}
        clearFunc={() => {
          table.resetColumnFilters();
        }}
      />
      {/* <PopoverAddFiling
        projectId=""
        addFilingToParent={(filing) => {
          console.log(filing);
        }}
      /> */}
    </div>
  );
}
