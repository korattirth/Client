import { debounce, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParms } from "./catlogSlice";

const ProductSearch = () => {
  const { productParms } = useAppSelector((state) => state.catlog);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState(productParms.searchTerm);

  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParms({ searchTerm: event.target.value }));
  }, 1000);

  return (
    <>
      <TextField
        label="Search products"
        variant="outlined"
        fullWidth
        value={searchTerm || ""}
        onChange={(event: any) => {
          setSearchTerm(event.target.value);
          debouncedSearch(event);
        }}
      />
    </>
  );
};

export default ProductSearch;
