import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Test = () => {
  const [jsonData, setJsonData] = useState<any>();

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

  const forResponseCode = (obj: any) => {
    let res = Object.keys(obj);
    return res;
  };

  const forPath = () => {
    let paths = Object.keys(jsonData.paths);
    return paths;
  };

  const forContentType = (contentType: any) => {
    const cType = Object.keys(contentType);
    return cType[0];
  };

  const forResData = (data: any) => {
    return Object.keys(data);
  };

  const forSecurityHeader = (data: any) => {
    return Object.keys(data);
  };

  const displayAPIInfo = (
    res: any,
    reqType: string,
    URL: string,
    id: string
  ) => {
    return (
      <div id={id} style={{ scrollBehavior: "smooth" }}>
        <Typography variant="h5" color="primary" marginBottom={"20px"}>
          {res[reqType].operationId}
        </Typography>
        <Typography variant="body1" color="grey" marginBottom="15px">
          {res[reqType]["summary"]}
        </Typography>
        <Typography variant="subtitle2" color="green">
          HTTP request
        </Typography>
        <Typography variant="body1" color="grey" marginBottom={"20px"}>
          ***{reqType.toUpperCase()}*** {URL}
        </Typography>
      </div>
    );
  };
  const displayHeader = (res: any, reqType: string) => {
    return (
      <div>
        {res[reqType]?.parameters &&
          res[reqType]?.parameters.some(
            (x: { in: string }) => x.in === "header"
          ) && (
            <>
              <Typography variant="subtitle2" color="green">
                HTTP Headers
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Required</TableCell>
                      <TableCell align="center">Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {res[reqType]?.parameters.map(
                      (params: any, index: number) =>
                        params.in === "header" ? (
                          <>
                            <TableRow>
                              <TableCell align="center">
                                {params.name}
                              </TableCell>
                              <TableCell align="center">
                                {params.schema && params.schema.nullable
                                  ? "Yes"
                                  : "No"}
                              </TableCell>
                              <TableCell align="center">
                                {params.description}
                              </TableCell>
                            </TableRow>
                          </>
                        ) : null
                    )}
                    {jsonData.components.securitySchemes &&
                      forSecurityHeader(
                        jsonData.components.securitySchemes
                      ).map((header, idx) =>
                        jsonData.components.securitySchemes[header].in ===
                        "header" ? (
                          <>
                            <TableRow key={idx}>
                              <TableCell align="center">
                                {jsonData.components.securitySchemes[header].name}
                              </TableCell>
                              <TableCell align="center">
                                -
                              </TableCell>
                              <TableCell align="center">
                                {jsonData.components.securitySchemes[header].description}
                              </TableCell>
                            </TableRow>
                          </>
                        ) : null
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
      </div>
    );
  };

  function displatParameter(res: any, reqType: string): any {
    return (
      <div>
        {res[reqType]?.parameters &&
          res[reqType]?.parameters.some(
            (x: { in: string }) => x.in === "query" || x.in === "path"
          ) && (
            <>
              <Typography variant="subtitle2" color="green">
                parameters
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Located</TableCell>
                      <TableCell align="center">Required</TableCell>
                      <TableCell align="center">Type</TableCell>
                      <TableCell align="center">Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {res[reqType]?.parameters.map((params: any) =>
                      params.in === "query" || params.in === "path" ? (
                        <>
                          <TableRow>
                            <TableCell align="center">{params.name}</TableCell>
                            <TableCell align="center">{params.in}</TableCell>
                            <TableCell align="center">
                              {params.schema && params.schema.nullable
                                ? "Yes"
                                : "No"}
                            </TableCell>
                            <TableCell align="center">
                              {params.schema && params.schema.type}
                            </TableCell>
                            <TableCell align="center">
                              {params.schema && params.schema.description}
                            </TableCell>
                          </TableRow>
                        </>
                      ) : null
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
      </div>
    );
  }

  const displayResponse = (res: any, reqType: string) => {
    return (
      res[reqType]?.responses && (
        <>
          <Typography variant="subtitle2" color="green">
            responses
          </Typography>
          <TableContainer component={Paper} sx={{ marginBottom: "25px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Code</TableCell>
                  <TableCell align="center">Desciption</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {forResponseCode(res[reqType]?.responses).map(
                  (resCode, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{resCode}</TableCell>
                      <TableCell align="center">
                        {res[reqType]?.responses[resCode].description}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider />
        </>
      )
    );
  };

  const drawerWidth = 260;
  const displaySidebar = (res: any, reqType: string, id: string) => {
    return (
      res[reqType].operationId && (
        <ListItem sx={{ padding: "0" }} key={id} component="a" href={`#${id}`}>
          <ListItemButton>
            <ListItemText>{res[reqType].operationId}</ListItemText>
          </ListItemButton>
        </ListItem>
      )
    );
  };

  const returnResponse = (res: any, reqType: string) => {
    return (
      <>
        {forResponseCode(res[reqType].responses).map((resCode) =>
          resCode.startsWith("2") &&
          res[reqType].responses[resCode].content &&
          res[reqType].responses[resCode].content[
            forContentType(res[reqType].responses[resCode].content)
          ].example ? (
            <>
              {forResData(
                res[reqType].responses[resCode].content[
                  forContentType(res[reqType].responses[resCode].content)
                ].example
              ).map((data, idx) => (
                <Typography key={idx} variant="subtitle1" color="white">
                  {data} :{" "}
                  {
                    res[reqType].responses[resCode].content[
                      forContentType(res[reqType].responses[resCode].content)
                    ].example[data]
                  }
                </Typography>
              ))}
            </>
          ) : null
        )}
      </>
    );
  };

  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={2}>
            {jsonData && (
              <>
                <Drawer
                  sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                      width: drawerWidth,
                      boxSizing: "border-box",
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
                        req in jsonData.paths[path]
                          ? displaySidebar(
                              jsonData.paths[path],
                              req,
                              `${index1}${index2}`
                            )
                          : null
                      )
                    )}
                  </List>
                </Drawer>
              </>
            )}
          </Grid>
          <Grid item xs={10}>
            {jsonData && (
              <Typography variant="h4" gutterBottom>
                {jsonData.info.title}
              </Typography>
            )}
            {jsonData &&
              forPath().map((path, index1) => (
                <>
                  {requestType.map((req, index2) => (
                    <>
                      {req in jsonData.paths[path] ? (
                        <>
                          <Grid container columnGap={2}>
                            <Grid item xs={7}>
                              <div>
                                {displayAPIInfo(
                                  jsonData.paths[path],
                                  req,
                                  path,
                                  `${index1}${index2}`
                                )}
                                {displayHeader(jsonData.paths[path], req)}
                                {displatParameter(jsonData.paths[path], req)}
                                {displayResponse(jsonData.paths[path], req)}
                              </div>
                            </Grid>
                            <Grid
                              item
                              xs={4}
                              sx={{ backgroundColor: "#454545" }}
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <div style={{ backgroundColor: "#000000" }}>
                                {returnResponse(jsonData.paths[path], req)}
                              </div>
                            </Grid>
                          </Grid>
                        </>
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
