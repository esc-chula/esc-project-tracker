import { Box, Tab, Tabs } from '@mui/material';
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import SearchPanel from '../all-projects/searchPanel';
import { FilingType } from '@/src/interface/filing';
import { Project } from '@/src/interface/project';
import RecentlyFiling from './recently-filing';
import SelectType from '../filter/selectType';
import { departmentProjectItems } from '@/src/constant/filterProject';
import { typeFilingItems } from '@/src/constant/filterFiling';
import findFilingsWithFilter from '@/src/service/filing/findFilingsWithFilter';
import { FilingStatus } from '@/src/constant/enum';
import FilingNotFound from './filing-tab-not-found';
import FilingTabShow from './filing-tab-show';

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

export default function FilingTab() {
  const [tabsValue, setTabsValue] = useState<number>(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };
  const [TargetFilings, setTargetFilings] = useState<FilingType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<FilingStatus>(
    FilingStatus.WAIT_FOR_SECRETARY,
  );
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');

  useEffect(() => {
    const newSelectedStatus =
      tabsValue === 0
        ? FilingStatus.WAIT_FOR_SECRETARY
        : tabsValue === 1
          ? FilingStatus.RETURNED
          : FilingStatus.APPROVED;
    setSelectedStatus(newSelectedStatus);

    const fetchFiling = async () => {
      try {
        const filings = await findFilingsWithFilter(
          newSelectedStatus || 'ALL',
          selectedType,
          selectedDepartment,
        );
        setTargetFilings(filings || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFiling();
  }, [tabsValue, selectedType, selectedDepartment]);

  return (
    <div className="border-lightgray border-2 rounded-3xl w-[80%] h-[80vh] pt-3 flex flex-col">
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
        <div className="w-full flex flex-row">
          <SearchPanel
            filings={TargetFilings}
            placeHolder="รหัสเอกสาร"
            FilingFunc={(filing: FilingType | Project) => {}}
          />
          <RecentlyFiling />
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
      <div className="flex-grow overflow-y-scroll">
        <CustomTabPanel value={tabsValue} index={0}>
          <FilingTabShow tabValue={0} filings={TargetFilings} />
        </CustomTabPanel>
        <CustomTabPanel value={tabsValue} index={1}>
          <FilingTabShow tabValue={1} filings={TargetFilings} />
        </CustomTabPanel>
        <CustomTabPanel value={tabsValue} index={2}>
          <FilingTabShow tabValue={2} filings={TargetFilings} />
        </CustomTabPanel>
      </div>
    </div>
  );
}
