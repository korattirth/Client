import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  Paper,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import BasicTabs from "./BasicTabs";
import SideBarItems from "./SideBarItems";

const Test = () => {
  const [jsonData, setJsonData] = useState<any>();
  const [selectedId, setSelectedId] = useState<string>("02");

  const onSideBarChange = (id: string) => {
    setSelectedId(id)
  }

  const requestType = ["get", "put", "post", "delete"];

  useEffect(() => {
    axios
      .get(`http://localhost:7539/api/Test?test=${"Testing"}`)
      .then((res) => {
        const data = JSON.parse(res.data);
        setJsonData(data);
      });
  }, []);
  console.log(jsonData);

  const forPath = () => {
    let paths = Object.keys(jsonData.paths);
    return paths;
  };

  const drawerWidth = 260;

  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={2} md = {2}>
            {jsonData && (
              <>
                <Drawer
                  sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    color : 'white',
                    "& .MuiDrawer-paper": {
                      width: drawerWidth,
                      boxSizing: "border-box",
                      backgroundColor: "#152238",
                      
                    },
                  }}
                  variant="permanent"
                  anchor="left"
                >
                  <Toolbar />
                  <Divider />
                  <List>
                    {forPath().map((path, index1) =>
                      requestType.map((req, index2) =>
                        req in jsonData.paths[path] ? (
                          <SideBarItems
                            res={jsonData.paths[path]}
                            reqType={req}
                            id={`${index1}${index2}`}
                            selectedId={selectedId}
                            onSideBarChange = {onSideBarChange}
                          />
                        ) : null
                      )
                    )}
                  </List>
                </Drawer>
              </>
            )}
          </Grid>
          <Grid item xs={10} md = {10}>
            {/* {jsonData && (
              <Typography variant="h4" gutterBottom>
                {jsonData.info.title}
              </Typography>
            )} */}
            {jsonData &&
              forPath().map((path, index1) => (
                <>
                  {requestType.map((req, index2) => (
                    <>
                      {req in jsonData.paths[path] ? (
                        <Box component={Paper}  sx = {{height : "auto"}}>
                          <BasicTabs
                            res={jsonData.paths[path]}
                            reqType={req}
                            URL={path}
                            id={`${index1}${index2}`}
                            key={`${index1}${index2}`}
                            jsonData={jsonData}
                          />
                        </Box>
                      ) : null}
                    </>
                  ))}
                </>
              ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Test;
