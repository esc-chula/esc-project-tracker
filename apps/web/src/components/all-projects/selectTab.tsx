import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";

import SearchPanel from "./searchPanel";
import NoData from "./noData";

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  /* TODO : Fetch data from the server
  
  */

  return (
    <Box sx={{ width: "100%" }}>
      <CustomTabPanel value={value} index={0}>
        <SearchPanel
          projects={[]}
          placeHolder="ค้นหาโครงการทั้งหมด"
          projectFunc={() => {}}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SearchPanel
          filings={[]}
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
        <NoData
          firstLine="ยังไม่มีโครงการ"
          secondLine="เริ่มเปิดโครงกันเลย !"
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <NoData firstLine="ยังไม่มีเอกสาร" secondLine="เริ่มเปิดโครงกันเลย !" />
      </CustomTabPanel>
    </Box>
  );
}
