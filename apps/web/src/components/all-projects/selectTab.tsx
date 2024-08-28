'use client';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import SearchPanel from './searchPanel';
import { Project } from '@/src/interface/project';
import ProjectMenu from '../project/projectMenu';
import { Filing } from '@/src/interface/filing';
import FilingMenu from '../project/filingMenu';
import { findAllProject } from '@/src/service/project/findAllProject';
import findAllFiling from '@/src/service/filing/findAllFiling';
import { useToast } from '../ui/use-toast';
import { TbEdit } from 'react-icons/tb';
import { BiSolidSave } from 'react-icons/bi';
import AddNewProjectButton from './addNewProjectButton';
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react';

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
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SelectTab({ isAdmin }: { isAdmin: boolean }) {
  const [value, setValue] = useState<number>(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filings, setFilings] = useState<Filing[]>([]);
  const [searchedProjectID, setSearchedProjectID] = useState<string | null>(
    null,
  );
  const [searchedFilingID, setSearchedFilingID] = useState<string | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const { toast } = useToast();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setSearchedProjectID(null);
    setSearchedFilingID(null);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedProject, fetchedFiling] = await Promise.all([
          findAllProject(),
          findAllFiling(),
        ]);

        setFilings(fetchedFiling);
        setProjects(fetchedProject);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: 'ไม่สำเร็จ',
            description: error.message,
            isError: true,
          });
        }
      }
    }

    fetchData();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <CustomTabPanel value={value} index={0}>
        <div className="flex flex-row space-x-4 w-full items-center">
          <SearchPanel
            projects={projects}
            placeHolder="ค้นหาโครงการทั้งหมด"
            projectFunc={(project: Project | Filing) => {
              setSearchedProjectID(project.id);
            }}
            clearFunc={() => {
              setSearchedProjectID(null);
            }}
          />
          <div className="items-center flex text-center">
            <AddNewProjectButton />
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="flex flex-row space-x-4 w-full items-center">
          <SearchPanel
            filings={filings}
            placeHolder="ค้นหาเอกสารทั้งหมด"
            FilingFunc={(filing: Filing | Project) => {
              setSearchedFilingID(filing.id);
            }}
            clearFunc={() => {
              setSearchedFilingID(null);
            }}
          />
          {isAdmin &&
            (isUpdateMode ? (
              <BiSolidSave
                size={25}
                className="font-bold hover:cursor-pointer"
                onClick={() => {
                  setIsUpdateMode(false);
                }}
              />
            ) : (
              <TbEdit
                size={25}
                className="font-bold hover:cursor-pointer"
                onClick={() => {
                  setIsUpdateMode(true);
                }}
              />
            ))}

          <div className="items-center flex text-center">
            <AddNewProjectButton />
          </div>
        </div>
      </CustomTabPanel>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'red',
            },
            '& .MuiTab-root': {
              '&.Mui-selected': {
                color: 'red',
              },
              '&:hover': {
                backgroundColor: 'transparent',
              },
            },
          }}
        >
          <Tab label="โครงการ" {...a11yProps(0)} className="font-sukhumvit" />
          <Tab label="เอกสาร" {...a11yProps(1)} className="font-sukhumvit" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ProjectMenu searchedProjectId={searchedProjectID} isAdmin={isAdmin} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FilingMenu
          searchedFilingId={searchedFilingID}
          isUpdateMode={isUpdateMode}
        />
      </CustomTabPanel>
    </Box>
  );
}
