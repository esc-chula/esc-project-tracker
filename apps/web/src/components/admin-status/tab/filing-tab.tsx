import { Box, Tab, Tabs } from '@mui/material';
import { ReactNode, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import SearchPanel from '../../all-projects/searchPanel';
import { FilingType } from '@/src/interface/filing';
import { Project } from '@/src/interface/project';
import SelectType from '../../filter/selectType';
import { departmentProjectItems } from '@/src/constant/filterProject';
import { typeFilingItems } from '@/src/constant/filterFiling';
import findFilingsWithFilter from '@/src/service/filing/findFilingsWithFilter';
import { FilingStatus } from '@/src/constant/enum';
import FilingTabShow from './filing-tab-show';
import { FilingsWithDocument } from '@/src/types/filing';
import { toast } from '../../ui/use-toast';
import findLatestPendingDocumentByFilingId from '@/src/service/document/findLatestPendingByFilingId';

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
  setSelectedFilingId,
  selectedFilingId,
  reviewedFilingId,
}: {
  setSelectedFilingId: (id: string) => void;
  selectedFilingId: string;
  reviewedFilingId: string;
}) {
  const [tabsValue, setTabsValue] = useState<number>(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
    setIsSortDateDESC(true);
  };
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [filingWithDocument, setFilingWithDocument] = useState<
    FilingsWithDocument[]
  >([]);
  const [filings, setFilings] = useState<FilingType[]>([]);
  const [isSortDateDESC, setIsSortDateDESC] = useState<boolean>(true);

  // get filings and documents
  useEffect(() => {
    // Reset the state before fetching new data
    setFilingWithDocument([]);
    setFilings([]);

    // Determine the selected status based on tabsValue
    const newSelectedStatus =
      tabsValue === 0
        ? FilingStatus.WAIT_FOR_SECRETARY
        : tabsValue === 1
          ? FilingStatus.RETURNED
          : FilingStatus.APPROVED;

    const fetchFiling = () => {
      setIsFetched(false);

      findFilingsWithFilter(newSelectedStatus, selectedType, selectedDepartment)
        .then((filings) => {
          const filingsArray: FilingType[] = [];
          const filingsWithDocumentArray: FilingsWithDocument[] = [];

          return Promise.all(
            (filings || []).map((filing) =>
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

  // sort date ( createdAt pendind)
  useEffect(() => {
    const sortedFilings = [...filingWithDocument].sort((a, b) =>
      isSortDateDESC
        ? new Date(b.document.createdAt).getTime() -
          new Date(a.document.createdAt).getTime()
        : new Date(a.document.createdAt).getTime() -
          new Date(b.document.createdAt).getTime(),
    );

    const isDifferent = filingWithDocument.some(
      (filing, index) =>
        filing.document.createdAt !== sortedFilings[index].document.createdAt,
    );

    if (isDifferent) {
      setFilingWithDocument(sortedFilings);
    }
  }, [isSortDateDESC, filingWithDocument]);

  const selectedSortValue = useMemo(
    () => (isSortDateDESC ? '0' : '1'),
    [isSortDateDESC],
  );

  // กรณีที่มีการ review แล้ว เอาออกจาก list
  useEffect(() => {
    if (reviewedFilingId) {
      const newFilingsWithDocuments = filingWithDocument.filter(
        (filingWithDoc) => filingWithDoc.filing.id !== reviewedFilingId,
      );

      const newFilings = filings.filter(
        (filing) => filing.id !== reviewedFilingId,
      );
      setFilingWithDocument(newFilingsWithDocuments);
      setFilings(newFilings);
    }
  }, [reviewedFilingId]);

  return (
    <div className="border-lightgray border-2 rounded-xl w-[30vw] h-[80vh] pt-3 flex flex-col">
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
            placeHolder="รหัสเอกสาร"
            filingFunc={(filing: FilingType | Project) => {}}
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
            sendValue={(value: string) => {
              setIsSortDateDESC(value === '0');
            }}
            selectedValue={selectedSortValue}
          />
        </div>
        <div className="flex flex-row space-x-5 pr-5">
          <SelectType
            title="ฝ่าย"
            items={departmentProjectItems}
            sendValue={setSelectedDepartment}
          />
          <SelectType
            title="ประเภท"
            items={typeFilingItems}
            sendValue={setSelectedType}
          />
        </div>
      </div>
      <div className="flex-grow overflow-y-scroll no-scrollbar">
        {[0, 1, 2].map((i) => (
          <CustomTabPanel value={tabsValue} index={i} key={i}>
            {isFetched && (
              <FilingTabShow
                tabValue={i}
                filingWithPendingDocuments={filingWithDocument}
                setSelectedFilingId={setSelectedFilingId}
                selectedFilingId={selectedFilingId}
              />
            )}
          </CustomTabPanel>
        ))}
      </div>
    </div>
  );
}
