import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

interface Props {
    res: any;
    reqType: string;
  }

const Parameter = ({ res, reqType }: Props) => {
  return (
    <div>
      {res[reqType]?.parameters &&
        res[reqType]?.parameters.some(
          (x: { in: string }) => x.in === "query" || x.in === "path"
        ) && (
          <>
            <Typography variant="subtitle2" color="#9291ee" gutterBottom>
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
};

export default Parameter;
