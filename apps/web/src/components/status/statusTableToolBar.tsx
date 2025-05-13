import type { Table } from '@tanstack/react-table';
import type { Filing } from '@/src/interface/filing';
import type { Gendoc } from '@/src/interface/gendoc';
import SearchPanel from '../all-projects/searchPanel';
import PopoverAddGendoc from '../gendoc/popoverAddGendoc';
import PopoverAddFiling from '../project/popoverAddFiling';

export default function StatusTableToolBar({
  table,
  filingFunc,
  gendocFunc,
  projectId,
  updateFiling,
  updateTel,
  userId,
  isGendocPage = false,
  appendGendoc,
}: {
  table: Table<Filing> | Table<Gendoc>;
  filingFunc?: (filing: Filing) => void;
  gendocFunc?: (gendoc: Gendoc) => void;
  projectId?: string;
  updateFiling?: (filing: Filing) => void;
  updateTel?: (tel: string) => void;
  userId?: string;
  isGendocPage?: boolean;
  appendGendoc?: (gendoc: Gendoc) => void;
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
      {isGendocPage ? (
        <PopoverAddGendoc
          userId={userId ?? ''}
          addGendocToParent={
            appendGendoc ??
            (() => {
              console.log('No function provided');
            })
          }
        />
      ) : (
        <PopoverAddFiling
          projectId={projectId ?? ''}
          addFilingToParent={(filing, tel) => {
            if (updateFiling) {
              updateFiling(filing);
            }
            if (updateTel) {
              updateTel(tel);
            }
          }}
        />
      )}
    </div>
  );
}
