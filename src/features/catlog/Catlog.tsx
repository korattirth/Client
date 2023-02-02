import { Grid, Paper } from "@mui/material";
import AppPaginatio from "../../app/components/AppPaginatio";
import CheckboxButton from "../../app/components/CheckboxButton";
import RadioGroupButton from "../../app/components/RadioGroupButton";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import useProduct from "../../hooks/useProduct";
import {
  productSeleectors,
  setPageNumber,
  setProductParms,
} from "./catlogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];

const Catlog = () => {
  const { types, brand, filterLoaded,metaData} = useProduct();
  const products = useAppSelector(productSeleectors.selectAll);
  const dispatch = useAppDispatch();
  const {  productParms } = useAppSelector((state) => state.catlog);

  if (!filterLoaded)
    return <LoadingComponents message="Loading products..." />;

  return (
    <>
      <Grid container columnSpacing={4}>
        <Grid item xs={3}>
          <Paper sx={{ mb: 2 }}>
            <ProductSearch />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <RadioGroupButton
              selectedValue={productParms.orderBy}
              options={sortOptions}
              onChange={(e) =>
                dispatch(setProductParms({ orderBy: e.target.value }))
              }
            />
          </Paper>
          <Paper sx={{ p: 2, mb: 2 }}>
            <CheckboxButton
              items={brand}
              checked={productParms.brands}
              onChange={(items: string[]) =>
                dispatch(setProductParms({ brands: items }))
              }
            />
          </Paper>
          <Paper sx={{ p: 2 }}>
            <CheckboxButton
              items={types}
              checked={productParms.types}
              onChange={(items: string[]) =>
                dispatch(setProductParms({ types: items }))
              }
            />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <ProductList products={products} />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={9} sx ={{mb :2}}>
          {
            metaData && <AppPaginatio
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
          }
        </Grid>
      </Grid>
    </>
  );
};

export default Catlog;
