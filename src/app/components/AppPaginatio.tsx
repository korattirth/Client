import { Box, Typography, Pagination } from "@mui/material";
import React, { useState } from "react";
import { MetaData } from "../model/Pagination";

interface Props {
    metaData : MetaData;
    onPageChange : (page :number) => void;
}

const AppPaginatio = ({ metaData , onPageChange} : Props) => {
    const {pageSize,totalPages,currentPage,totalCount} = metaData;
    const [pageNumber , setPageNumber] = useState<number>(currentPage);
    const handlePageChange = (page : number) => {
      setPageNumber(page)
      onPageChange(page)
    }
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>Displaying {(currentPage-1)*pageSize+1}-{currentPage*pageSize > totalCount ? totalCount : currentPage*pageSize} of {totalCount} items</Typography>
      <Pagination color="secondary" size="large" count={totalPages} page={pageNumber} onChange = {(e,page) => handlePageChange(page)} />
    </Box>
  );
};

export default AppPaginatio;
