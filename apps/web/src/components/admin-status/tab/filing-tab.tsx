import { Box, Tab, Tabs } from '@mui/material';
import type { ReactNode, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { Filing } from '@/src/interface/filing';
import { typeFilingItemsV2 } from '@/src/constant/filterFiling';
import findFilingsWithFilter from '@/src/service/filing/findFilingsWithFilter';
import { FilingStatus } from '@/src/constant/enum';
import type { FilingWithDocument } from '@/src/types/filing';
import findLatestPendingDocumentByFilingId from '@/src/service/document/findLatestPendingByFilingId';
import { projectTypeMap } from '@/src/constant/map';
import { toast } from '../../ui/use-toast';
import SelectType from '../../filter/selectType';
import SearchPanel from '../../all-projects/searchPanel';
import { DataTableFacetedFilter } from '../../filter/dataTableFacetedFilter';
import FilingTabShow from './filing-tab-show';
import { filingTabColumns } from './filing-tab-columns';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="h-full"
    >
      {value === index && <div className="h-full">{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function FilingTab({
  setSelectedFilingWithDocument,
  selectedFilingWithDocument,
  reviewedFilingId,
}: {
  setSelectedFilingWithDocument: (
    filingWithDocument: FilingWithDocument,
  ) => void;
  selectedFilingWithDocument?: FilingWithDocument;
  reviewedFilingId: string;
}) {
  const [tabsValue, setTabsValue] = useState<number>(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [filingWithDocument, setFilingWithDocument] = useState<
    FilingWithDocument[]
  >([]);
  const [filings, setFilings] = useState<Filing[]>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'updatedAt', desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data: filingWithDocument,
    columns: filingTabColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // get filings and documents
  useEffect(() => {
    setFilingWithDocument([]);
    setFilings([]);

    const newSelectedStatus =
      tabsValue === 0
        ? FilingStatus.WAIT_FOR_SECRETARY
        : tabsValue === 1
          ? FilingStatus.RETURNED
          : FilingStatus.APPROVED;

    const fetchFiling = () => {
      setIsFetched(false);

      findFilingsWithFilter(newSelectedStatus, selectedType, selectedDepartment)
        .then((filingsData) => {
          const filingsArray: Filing[] = [];
          const filingsWithDocumentArray: FilingWithDocument[] = [];

          return Promise.all(
            (filingsData || []).map((filing) =>
              findLatestPendingDocumentByFilingId(filing.id)
                .then((pendingDocuments) => {
                  if (pendingDocuments) {
                    filingsWithDocumentArray.push({
                      filing,
                      document: pendingDocuments,
                    });
                    filingsArray.push(filing);
                  }
                })
                .catch((err) => {
                  if (err instanceof Error) {
                    toast({
                      title: 'ดึงข้อมูลเอกสารไม่สำเร็จ',
                      description: err.message,
                      isError: true,
                    });
                  }
                }),
            ),
          ).then(() => {
            setFilingWithDocument(filingsWithDocumentArray);
            setFilings(filingsArray);
          });
        })
        .catch((err) => {
          if (err instanceof Error) {
            toast({
              title: 'ดึงข้อมูลเอกสารไม่สำเร็จ',
              description: err.message,
              isError: true,
            });
          }
        })
        .finally(() => {
          setIsFetched(true);
        });
    };

    fetchFiling();
  }, [tabsValue, selectedType, selectedDepartment]);

  // กรณีที่มีการ review แล้ว เอาออกจาก list
  useEffect(() => {
    if (reviewedFilingId) {
      const newFilingWithDocuments = filingWithDocument.filter(
        (filingWithDoc) => filingWithDoc.filing.id !== reviewedFilingId,
      );

      const newFilings = filings.filter(
        (filing) => filing.id !== reviewedFilingId,
      );
      setFilingWithDocument(newFilingWithDocuments);
      setFilings(newFilings);
    }
  }, [reviewedFilingId]);

  return (
    <div className="border-lightgray border-2 rounded-xl basis-1/3 pt-3 flex flex-col h-[80vh]">
      <div className="w-full flex justify-center border-b-lightgray border-b-2">
        <Box sx={{ borderColor: 'divider' }}>
          <Tabs
            value={tabsValue}
            onChange={handleChange}
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor:
                  tabsValue === 1 ? 'red' : tabsValue === 2 ? 'green' : 'black',
              },
              '& .MuiTab-root': {
                '&.Mui-selected': {
                  color:
                    tabsValue === 1
                      ? 'red'
                      : tabsValue === 2
                        ? 'green'
                        : 'black',
                },
                '&:hover': {
                  backgroundColor: 'transparent',
                },
                fontFamily: 'var(--sukhumvit-set-font)',
              },
            }}
          >
            <Tab
              label="ดำเนินการ"
              {...a11yProps(0)}
              sx={{
                fontFamily: 'Sukhumvit',
                fontWeight: 'bold',
              }}
            />
            <Tab
              label="ตีกลับ"
              {...a11yProps(1)}
              sx={{
                fontFamily: 'Sukhumvit',
                fontWeight: 'bold',
              }}
            />
            <Tab
              label="อนุมัติ"
              {...a11yProps(2)}
              sx={{
                fontFamily: 'Sukhumvit',
                fontWeight: 'bold',
              }}
            />
          </Tabs>
        </Box>
      </div>
      <div className="w-full mt-5 pl-5 flex flex-col space-y-5">
        <div className="w-full flex flex-row space-x-4 pr-5 items-center">
          <SearchPanel
            filings={filings}
            placeHolder="ค้นหาเอกสาร"
            filingFunc={(filing: Filing) => {
              for (const filingWithDocumentItem of filingWithDocument) {
                if (filingWithDocumentItem.filing.id === filing.id) {
                  setSelectedFilingWithDocument(filingWithDocumentItem);
                  break;
                }
              }
            }}
          />
        </div>
        <div className="flex flex-row space-x-5 pr-5">
          <DataTableFacetedFilter
            column={table.getColumn('projectType')}
            title="ฝ่าย"
            options={projectTypeMap}
          />
          <DataTableFacetedFilter
            column={table.getColumn('type')}
            title="ประเภทเอกสาร"
            options={typeFilingItemsV2}
          />
          <SelectType
            title="ล่าสุด"
            items={[
              { value: '0', label: 'ล่าสุด' },
              {
                value: '1',
                label: 'เก่าสุด',
              },
            ]}
            sendValue={(_: string) => {
              const column = table.getColumn('updatedAt');
              if (!column) return;
              column.toggleSorting(column.getIsSorted() === 'asc');
            }}
            selectedValue="0"
          />
        </div>
      </div>
      <div className="flex-grow overflow-y-scroll no-scrollbar">
        {[0, 1, 2].map((i) => (
          <CustomTabPanel value={tabsValue} index={i} key={i}>
            {isFetched ? (
              <FilingTabShow
                tabValue={i}
                rowModel={table.getRowModel()}
                setSelectedFilingWithDocument={setSelectedFilingWithDocument}
                selectedFilingId={selectedFilingWithDocument?.filing.id ?? ''}
              />
            ) : null}
          </CustomTabPanel>
        ))}
      </div>
    </div>
  );
}
