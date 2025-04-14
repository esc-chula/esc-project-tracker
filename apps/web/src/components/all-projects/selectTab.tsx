'use client';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  type ReactNode,
  type SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { type Project } from '@/src/interface/project';
import { type Filing } from '@/src/interface/filing';
import findAllProject from '@/src/service/project/findAllProject';
import findJoinedProjectsByUserId from '@/src/service/user-proj/findJoinedProjectsByUserId';
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
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
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
  const [value, setValue] = useState<number>(Number(isAdmin));

  // Fetch all projects and filings
  const [projects, setProjects] = useState<Project[]>([]);

  const [searchedProjectId, setSearchedProjectId] = useState<string | null>(
    null,
  );

  // Fetch by userId
  const [joinedProjects, setJoinedProjects] = useState<Set<string>>(new Set());
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const router = useRouter();
  const redirectToProject = (project: Project | Filing) => {
    if (isAdmin) router.push(`/admin/project/${project.id}/info`);
    else router.push(`/project/${project.id}`);
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setSearchedProjectId(null);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedProject, joinedProjectsData] = await Promise.all([
          findAllProject(),
          findJoinedProjectsByUserId(userId),
        ]);
        fetchedProject.sort((a, b) =>
          a.projectCode.localeCompare(b.projectCode),
        );
        const joinedProjectsSet = new Set(joinedProjectsData);
        setJoinedProjects(joinedProjectsSet);
        setProjects(fetchedProject);
        setMyProjects(
          fetchedProject.filter((project) => joinedProjectsSet.has(project.id)),
        );
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

    void fetchData();
  }, [userId]);

  return (
    <Box sx={{ width: '100%' }}>
      <CustomTabPanel value={value} index={0}>
        <div className="flex flex-row space-x-4 w-full items-center">
          <SearchPanel
            projects={myProjects}
            placeHolder="ค้นหาโครงการของฉัน"
            projectFunc={redirectToProject}
            clearFunc={() => {
              setSearchedProjectId(null);
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
            projectFunc={(project: Project | Filing) => {
              redirectToProject(project);
            }}
            clearFunc={() => {
              setSearchedProjectId(null);
            }}
          />
          <div className="items-center flex text-center">
            <AddNewProjectButton />
          </div>
        </div>
      </CustomTabPanel>
      {!isAdmin ? (
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
            <Tab
              label="โครงการของฉัน"
              {...a11yProps(0)}
              className="font-sukhumvit"
            />
            <Tab
              label="โครงการทั้งหมด"
              {...a11yProps(1)}
              className="font-sukhumvit"
            />
          </Tabs>
        </Box>
      ) : null}
      <CustomTabPanel value={value} index={0}>
        <MyProjectData
          compact
          projects={myProjects}
          joinedProjects={joinedProjects}
          searchedProjectId={searchedProjectId}
          userId={userId}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MyProjectData
          compact
          projects={projects}
          joinedProjects={joinedProjects}
          searchedProjectId={searchedProjectId}
          userId={userId}
        />
      </CustomTabPanel>
    </Box>
  );
}
