import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/store/configureStore";
import { productSeleectors, fetchProductsAsync, fetchFilter } from "../features/catlog/catlogSlice";

export default function useProduct() {
    const products = useAppSelector(productSeleectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded, status, types, brand, filterLoaded, productParms ,metaData} =
      useAppSelector((state) => state.catlog);
  
    useEffect(() => {
      if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);
  
    useEffect(() => {
      if (!filterLoaded) dispatch(fetchFilter());
    }, [filterLoaded, dispatch]);

    return {
        productsLoaded,
        products,status,types,brand,filterLoaded,productParms,metaData
    }
}