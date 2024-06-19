"use clients";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";

import SearchPanel from "./searchPanel";
import { Project } from "@/src/interface/project";
import ProjectMenu from "../project/projectMenu";
import { FilingType } from "@/src/interface/filing";
import FilingMenu from "../project/filingMenu";
import { findAllProject } from "@/src/service/findAllProject";
import findAllFiling from "@/src/service/findAllFiling";

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
  const [value, setValue] = React.useState<number>(0);
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [filings, setFilings] = React.useState<FilingType[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProject = await findAllProject();
        const fetchedFiling = await findAllFiling();
        setFilings(fetchedFiling);
        setProjects(fetchedProject);
      } catch (error) {
        console.log(error);
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
        <ProjectMenu />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FilingMenu />
      </CustomTabPanel>
    </Box>
  );
}
