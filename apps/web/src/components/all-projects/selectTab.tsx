'use client';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { TbEdit } from 'react-icons/tb';
import { 
  type ReactNode, 
  type SyntheticEvent, 
  useEffect, 
  useState 
} from 'react';
import { BiSolidSave } from 'react-icons/bi';
import { 
  type Project, 
  type ProjectWithLastOpen } 
from '@/src/interface/project';
import { type FilingType } from '@/src/interface/filing';
import findAllProject from '@/src/service/project/findAllProject';
import findAllFiling from '@/src/service/filing/findAllFiling';
import getProjectsByUserId from '@/src/service/project/getProjectsByUserId';
import getFilingsByUserId from '@/src/service/filing/getFilingsByUserId';
import ProjectMenu from '../project/projectMenu';
import FilingMenu from '../project/filingMenu';
import { toast } from '../ui/use-toast';
import MyProjectData from '../project/myProjectData';
import AddNewProjectButton from './addNewProjectButton';
import SearchPanel from './searchPanel';

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

export default function SelectTab({
  isAdmin,
  userId,
}: {
  isAdmin: boolean;
  userId: string;
}) {
  const [value, setValue] = useState<number>(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filings, setFilings] = useState<FilingType[]>([]);
  const [searchedProjectID, setSearchedProjectID] = useState<string | null>(
    null,
  );
  const [searchedFilingID, setSearchedFilingID] = useState<string | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  
  const [projectsWithLastOpen, setProjectsWithLastOpen] = useState<ProjectWithLastOpen[]>([]);
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [myFilings, setMyFilings] = useState<FilingType[]>([]);

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

    async function fetchByUserId(){
      try {
        const [ projectsWithLastOpenByUserIdData, myFilingsData] = await Promise.all([
          getProjectsByUserId(userId),
          getFilingsByUserId(userId),
        ]);
        setProjectsWithLastOpen(projectsWithLastOpenByUserIdData);
        setMyProjects(projectsWithLastOpenByUserIdData.map((project) => project.project));
        setMyFilings(myFilingsData);
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
    fetchByUserId();
  }, [userId]);

  return (
    <Box sx={{ width: '100%' }}>
      <CustomTabPanel value={value} index={0}>
        <div className="flex flex-row space-x-4 w-full items-center">
            <SearchPanel
              projects={myProjects}
              placeHolder="ค้นหาโครงการของฉัน"
              projectFunc={(project: Project) => {
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
            projects={projects}
            placeHolder="ค้นหาโครงการทั้งหมด"
            projectFunc={(project: Project | FilingType) => {
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
      <CustomTabPanel value={value} index={2}>
        <div className="flex flex-row space-x-4 w-full items-center">
          <SearchPanel
            filings={filings}
            placeHolder="ค้นหาเอกสารทั้งหมด"
            filingFunc={(filing: FilingType | Project) => {
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
          <Tab label="โครงการของฉัน" {...a11yProps(0)} className="font-sukhumvit" />
          <Tab label="โครงการทั้งหมด" {...a11yProps(1)} className="font-sukhumvit" />
          <Tab label="เอกสาร" {...a11yProps(2)} className="font-sukhumvit" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <MyProjectData 
          compact
          filingsData={myFilings}
          projectsWithLastOpenData={projectsWithLastOpen}
          searchedProjectId={searchedProjectID}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ProjectMenu
          searchedProjectId={searchedProjectID}
          isAdmin={isAdmin}
          userId={userId}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <FilingMenu
          searchedFilingId={searchedFilingID}
          isUpdateMode={isUpdateMode}
        />
      </CustomTabPanel>
    </Box>
  );
}
