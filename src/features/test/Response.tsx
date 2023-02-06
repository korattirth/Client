import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  res: any;
  reqType: string;
  url: string;
}

const Response = ({ res, reqType, url }: Props) => {
  console.log(url);
  const forResponseCode = (obj: any) => {
    let res = Object.keys(obj);
    return res;
  };
  return (
    res[reqType]?.responses && (
      <>
        {url === "/api/Account/register" ? (
          <>
            <Typography variant="subtitle2" color="#9291ee" gutterBottom>
              Request Example
            </Typography>
            <Box sx={{backgroundColor : "#000000",paddingLeft : "10px"}}>
              <Typography color="#fff" variant="body1">{"{"}</Typography>
              <div style={{paddingLeft : "10px"}}>
                <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"email" : <span style={{color : "#99FF99"}}>"jack@test.com"</span></Typography>
                <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"userName" : <span style={{color : "#99FF99"}}>"jack"</span></Typography>
                <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"gender" : <span style={{color : "#99FF99"}}>"Male"</span></Typography>
                <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"password" : <span style={{color : "#99FF99"}}>"Jack@123"</span></Typography>
                <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"confirmPassword" : <span style={{color : "#99FF99"}}>"Jack@123"</span></Typography>
              </div>
              <Typography color="#fff" variant="body1">{"}"}</Typography>
            </Box>
          </>
        ) : null}
        {url === "/api/Account/login" ? (
          <>
            <Typography variant="subtitle2" color="#9291ee" gutterBottom>
              Request Example
            </Typography>
            <Box sx={{backgroundColor : "#000000",paddingLeft : "10px"}}>
              <Typography color="#fff" variant="body1">{"{"}</Typography>
              <div style={{paddingLeft : "10px"}}>
                <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"email" : <span style={{color : "#99FF99"}}>"jack@test.com"</span></Typography>
                <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"password" : <span style={{color : "#99FF99"}}>"Jack@123"</span></Typography>
              </div>
              <Typography color="#fff" variant="body1">{"}"}</Typography>
            </Box>
            <Typography variant="subtitle2" color="#9291ee" marginTop="15px" gutterBottom>
              Response Example
            </Typography>
            <Box sx={{backgroundColor : "#000000",paddingLeft : "10px"}}>
              <Typography color="#fff" variant="body1">{"{"}</Typography>
              <div style={{paddingLeft : "10px"}}>
                <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"email" : <span style={{color : "#99FF99"}}>"jack@test.com"</span></Typography>
                <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"userName" : <span style={{color : "#99FF99"}}>"jack@test.com"</span></Typography>
                <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"token" : <span style={{color : "#99FF99"}}>"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.htrjsxcdvght12"</span></Typography>
              </div>
              <Typography color="#fff" variant="body1">{"}"}</Typography>
            </Box>
          </>
        ) : null}
        {url === "/api/Account/currentUser" ? (
          <>
            <Typography variant="subtitle2" color="#9291ee" gutterBottom>
              Request Example
            </Typography>
            <Box sx={{backgroundColor : "#000000",paddingLeft : "10px"}}>
              <Typography color="#fff" variant="body1">{"{"}</Typography>
              <div style={{paddingLeft : "10px"}}>
              <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"token" : <span style={{color : "#99FF99"}}>"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.htrjsxcdvght12"</span></Typography>
              </div>
              <Typography color="#fff" variant="body1">{"}"}</Typography>
            </Box>

            <Typography variant="subtitle2" color="#9291ee" marginTop="15px" gutterBottom>
              Response Example
            </Typography>
            <Box sx={{backgroundColor : "#000000",paddingLeft : "10px"}}>
              <Typography color="#fff" variant="body1">{"{"}</Typography>
              <div style={{paddingLeft : "10px"}}>
                <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"email" : <span style={{color : "#99FF99"}}>"jack@test.com"</span></Typography>
                <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"userName" : <span style={{color : "#99FF99"}}>"jack"</span></Typography>
                <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"gender" : <span style={{color : "#99FF99"}}>"Male"</span></Typography>
                <Typography color="#fff" sx={{ fontSize: "11px", fontWeight: "bold" }}>"basket" :
                  <span style={{ color: "#99FF99" }}>
                    <div style={{paddingLeft : "35px"}}>
                      <Typography color="white" variant="body1">{"{"}</Typography>
                      <div>
                      <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"paymentIntentId" : <span style={{color : "#99FF99"}}>"151654105"</span></Typography>
                      <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"clientSecret" : <span style={{color : "#99FF99"}}>"vntrgsrgeb10321sdv"</span></Typography>
                      <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"buyerId" : <span style={{color : "#99FF99"}}>"321265423"</span></Typography>
                        <Typography color="#fff" sx={{ fontSize: "11px", fontWeight: "bold" }}>"items" :
                          <span style={{ color: "#99FF99" }}>
                            <div style={{marginLeft : "25px"}}>
                              <Typography color="white" variant="body1">{"["}</Typography>
                              <div>
                              <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"productId" : <span style={{color : "#99FF99"}}>"123"</span></Typography>
                              <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"name" : <span style={{color : "#99FF99"}}>"T-shirt"</span></Typography>
                              <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"price" : <span style={{color : "#99FF99"}}>"$15.00"</span></Typography>
                              <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"pictureUrl" : <span style={{color : "#99FF99"}}>"t-shirt.png"</span></Typography>
                              <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"brand" : <span style={{color : "#99FF99"}}>"Nike"</span></Typography>
                              <Typography color="#fff" sx = {{fontSize : "11px",fontWeight :"bold"}}>"quantity" : <span style={{color : "#99FF99"}}>"2"</span></Typography>
                              </div>
                            <Typography color="white" variant="body1">{"]"}</Typography>
                            </div>
                          </span></Typography>
                      </div>
                    <Typography color = "white" variant="body1">{"}"}</Typography>
                  </div>
                </span></Typography>
              </div>
              <Typography color="#fff" variant="body1">{"}"}</Typography>
            </Box>
          </>
        ) : null}
         <Typography variant="subtitle2" color="#9291ee" gutterBottom marginTop="15px">
          Responses
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ marginBottom: "25px", backgroundColor: "#F8F8F8" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Code</TableCell>
                <TableCell align="left">Desciption</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forResponseCode(res[reqType]?.responses).map(
                (resCode, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{resCode}</TableCell>
                    <TableCell align="left">
                      {res[reqType]?.responses[resCode].description}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  );
};

export default Response;
