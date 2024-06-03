"use clients";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";

import SearchPanel from "./searchPanel";
import NoData from "./noData";
import { ProjectType } from "@/src/interface/project";
import { FilingStatus, ProjectStatus } from "../../../../api/src/constant/enum"; // to be deleted later
import findAllFiling from "@/src/service/findAllFiling";
import ProjectMenu from "../project/projectMenu";
import { FilingType } from "@/src/interface/filing";
import FilingMenu from "../project/filingMenu";

interface TabPanelProps {
  children?: React.ReactNode;
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SelectTab() {
  const mockFiling = [
    {
      id: "string",
      projectId: "projectId for finding project's name",
      userId: "userId for finding user's name",
      name: "filing's name",
      FilingCode: "0001",
      status: FilingStatus.APPROVED,
      type: 1,
      projectCode: "1001",
      createdAt: "10/06/2567",
      updatedAt: "10/06/2567",
    },
  ];
  const mockProject = [
    {
      id: "1",
      name: "ชื่อโครงการ อันที่ 1",
      projectCode: "0011",
      type: 1,
      detail: "",
      reserveDate: "",
      status: ProjectStatus.CONTINUE,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "2",
      name: "ชื่อโครงการ แบบยาว มากกกกกกกกกกกกกกก",
      projectCode: "0012",
      type: 1,
      detail: "",
      reserveDate: "",
      status: ProjectStatus.WAIT_FOR_CLOSE,
      createdAt: "",
      updatedAt: "",
    },
  ];
  const [value, setValue] = React.useState(0);
  const [projects, setProjects] = React.useState<ProjectType[]>([]);
  const [filings, setFilings] = React.useState<FilingType[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  /* TODO : Fetch data from the server
  
  */
  React.useEffect(() => {
    async function fetchData() {
      try {
        // const fetchedProject = await findAllProject();
        // const fetchedFiling = await findAllFiling();
        const fetchedProject = mockProject;
        const fetchedFiling = mockFiling;
        if (fetchedFiling) {
          setFilings(fetchedFiling);
        }
        if (fetchedProject) {
          setProjects(fetchedProject);
        }
      } catch (e) {
        console.log(e);
        throw new Error("Failed to fetch data");
      }
    }

    fetchData();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <CustomTabPanel value={value} index={0}>
        <SearchPanel
          projects={projects}
          placeHolder="ค้นหาโครงการทั้งหมด"
          projectFunc={() => {}}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SearchPanel
          filings={filings}
          placeHolder="ค้นหาเอกสารทั้งหมด"
          FilingFunc={() => {}}
        />
      </CustomTabPanel>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "red",
            },
            "& .MuiTab-root": {
              "&.Mui-selected": {
                color: "red",
              },
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
          }}
        >
          <Tab label="โครงการ" {...a11yProps(0)} className="font-sukhumvit" />
          <Tab label="เอกสาร" {...a11yProps(1)} className="font-sukhumvit" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ProjectMenu projects={projects} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FilingMenu filings={filings} />
      </CustomTabPanel>
    </Box>
  );
}
