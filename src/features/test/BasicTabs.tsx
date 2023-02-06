import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import OverView from "./OverView";
import HeadersAndParams from "./HeadersAndParams";
import Response from "./Response";
import { Image } from "@mui/icons-material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Props {
  res: any;
  reqType: string;
  URL: string;
  id: string;
  jsonData: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  res,
  reqType,
  URL,
  id,
  jsonData,
}: Props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" ,marginBottom : '20px'}} id = {id}>
      <Box sx={{ borderBottom: 1, borderColor: "divider",margin : "20px 0px"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="OverView" {...a11yProps(0)} sx = {{width : "25%"}} />
          <Tab label="Headers/Parameter" {...a11yProps(1)}sx = {{width : "25%"}} />
          <Tab label="Request/Response" {...a11yProps(2)} sx = {{width : "25%"}}/>
          <Tab label="Try It Out" {...a11yProps(3)} sx = {{width : "25%"}} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OverView res={res} reqType={reqType} URL={URL}  />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HeadersAndParams
          res={res}
          reqType={reqType}
          jsonData={jsonData}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Response
          res={res}
          reqType={reqType} 
          url = {URL}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Box textAlign="center">
        <img src="https://www.webinsight.in/wp-content/uploads/2021/09/IMG_20210820_091858.jpg" height="auto" width="250px" />
       </Box>
      </TabPanel>
    </Box>
  );
}
