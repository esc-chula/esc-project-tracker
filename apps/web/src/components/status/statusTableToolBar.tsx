import type { Table } from '@tanstack/react-table';
import type { FilingType } from '@/src/interface/filing';
import SearchPanel from '../all-projects/searchPanel';

export default function StatusTableToolBar({
  table,
}: {
  table: Table<FilingType>;
}) {
  return (
    <div className="flex items-center gap-4 py-4">
      <SearchPanel
        placeHolder="ค้นหาเอกสาร"
        filings={table.options.data}
        filingFunc={(filing: FilingType) => {
          const fullCodeSearch = `${filing.projectCode}-${filing.filingCode}`;
          const nameSearch = filing.name;
          table.setColumnFilters([
            { id: 'รหัสเอกสาร', value: fullCodeSearch || '' },
            { id: 'name', value: nameSearch || '' },
          ]);
        }}
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
