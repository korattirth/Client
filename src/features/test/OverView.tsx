import { Typography } from "@mui/material";

interface Props {
    res: any,
    reqType: string,
  URL: string,
}

const OverView = ({res,reqType,URL} : Props) => {
  return (
    <div >
      <Typography variant="h4" color="#4A4A4A" marginBottom={"20px"} sx = {{fontWeight : "bold"}}>
        {res[reqType].operationId}
      </Typography>
      <Typography variant="body1" color="#000026" marginBottom="15px">
        {res[reqType]["summary"]}
      </Typography>
      <Typography variant="subtitle2" color="#9291ee">
        HTTP request
      </Typography>
      <Typography variant="body1" color="grey" marginBottom={"20px"}>
        ***{reqType.toUpperCase()}*** {URL}
      </Typography>
    </div>
  );
};

export default OverView;
