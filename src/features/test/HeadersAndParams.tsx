import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Parameter from "./Parameter";

interface Props {
  res: any;
  reqType: string;
  jsonData: any;
}

const HeadersAndParams = ({ res, reqType, jsonData }: Props) => {
  const forSecurityHeader = (data: any) => {
    return Object.keys(data);
  };
  return (
    <div>
      {res[reqType]?.parameters &&
        res[reqType]?.parameters.some(
          (x: { in: string }) => x.in === "header"
        ) && (
          <>
            <Typography variant="subtitle2" color="#9291ee" gutterBottom>
              HTTP Headers
            </Typography>
            <TableContainer component={Paper} sx = {{backgroundColor : "#F8F8F8"}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Required</TableCell>
                    <TableCell align="left">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {res[reqType]?.parameters.map((params: any, index: number) =>
                    params.in === "header" ? (
                      <>
                        <TableRow>
                          <TableCell align="left">{params.name}</TableCell>
                          <TableCell align="left">
                            {params.schema && params.schema.nullable
                              ? "Yes"
                              : "No"}
                          </TableCell>
                          <TableCell align="left">
                            {params.description}
                          </TableCell>
                        </TableRow>
                      </>
                    ) : null
                  )}
                  {/* {jsonData.components.securitySchemes &&
                    forSecurityHeader(jsonData.components.securitySchemes).map(
                      (header, idx) =>
                        jsonData.components.securitySchemes[header].in ===
                        "header" ? (
                          <>
                            <TableRow key={idx}>
                              <TableCell align="left">
                                {
                                  jsonData.components.securitySchemes[header]
                                    .name
                                }
                              </TableCell>
                              <TableCell align="left">-</TableCell>
                              <TableCell align="left">
                                {
                                  jsonData.components.securitySchemes[header]
                                    .description
                                }
                              </TableCell>
                            </TableRow>
                          </>
                        ) : null
                    )} */}
                </TableBody>
              </Table>
            </TableContainer>

            <Parameter res={res} reqType={reqType} />
          </>
        )}
      
      {!res[reqType]?.parameters && <Typography>This API does't have any Headers or Parameter</Typography>}
    </div>
  );
};

export default HeadersAndParams;
