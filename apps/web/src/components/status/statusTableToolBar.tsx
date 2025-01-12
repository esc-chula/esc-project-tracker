import { Table } from '@tanstack/react-table';
import { FilingType } from '@/src/interface/filing';
import { filterStatus } from '@/src/styles/enumMap';
import { DataTableFacetedFilter } from './statusTableFacetedFilter';
import SearchPanel from '../all-projects/searchPanel';
import { statusFilingItems } from '@/src/constant/filterFiling';

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
          const fullCodeSearch = `${filing.projectCode}-${filing.FilingCode}`;
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
      <DataTableFacetedFilter
        column={table.getColumn('status')}
        title="สถานะ"
        options={statusFilingItems.filter((status) => status.value !== 'ALL')}
      />
    </div>
  );
}
