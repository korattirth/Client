import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { MetaData } from "../../app/model/Pagination";
import { Product, ProductParms } from "../../app/model/product";
import { RootState } from "../../app/store/configureStore";

interface CatalogState {
    productsLoaded : boolean,
        filterLoaded : boolean,
        status : string,
        brand : string[],
        types : string[],
        productParms : ProductParms,
        metaData : null | MetaData

}

const getAxiosParams = (productParams : ProductParms) => {
    const parms = new URLSearchParams();
    parms.append('pageNumber' , productParams.pageNumber.toString());
    parms.append('pageSize' , productParams.pageSize.toString());
    parms.append('orderBy' , productParams.orderBy);
    if(productParams.searchTerm) parms.append('searchTerm' , productParams.searchTerm);
    if(productParams.brands.length > 0 ) {
        parms.append('brand' , productParams.brands.toString());
    }
    if(productParams.types.length > 0) parms.append('type' , productParams.types.toString());
    return parms;
}

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[],void,{state : RootState}>(
    'catlog/fetchProductsAsync',
   async (_ , thunkAPI) => {
        const parms = getAxiosParams(thunkAPI.getState().catlog.productParms);
        try{
            const response = await agent.Catalog.list(parms);
            thunkAPI.dispatch(setMeteData(response.metaData))
            return response.item;
        }
        catch(error:any){
            return thunkAPI.rejectWithValue({error : error.data})
        }
   }
)

export const fetchProductAsync = createAsyncThunk<Product,number>(
    'catlog/fetchProductAsync',
   async (productId,thunkAPI) => {
        try{
            return await agent.Catalog.details(productId);
        }
        catch(error:any){
            return thunkAPI.rejectWithValue({error : error.data})
        }
   }
)

export const fetchFilter = createAsyncThunk(
    'catlog/fetchFilter',
   async (_,thunkAPI) => {
        try{
            return await agent.Catalog.fetchFilters();
        }
        catch(error:any){
            return thunkAPI.rejectWithValue({error : error.data})
        }
   }
)

const initParms = () => {
    return{
        pageNumber : 1,
        pageSize : 6,
        orderBy : 'name',
        brands : [],
        types : []
    }
}

export const catlogSlice = createSlice({
    name : 'catlog',
    initialState : productsAdapter.getInitialState<CatalogState>({
        productsLoaded : false,
        filterLoaded : false,
        status : 'idel',
        brand : [],
        types : [],
        productParms : initParms(),
        metaData : null
    }),
    reducers : {
        setProductParms : (state , action) => {
            state.productsLoaded = false;
            state.productParms = {...state.productParms , ...action.payload,pageNumber : 1}
        },
        setPageNumber : (state,action) => {
            state.productsLoaded = false;
            state.productParms = {...state.productParms , ...action.payload}
        },
        setMeteData : (state , action) => {
            state.metaData = action.payload;
        },
        resetProductParams : (state) => {
            state.productParms = initParms()
        },
        setProduct : (state,action) => {
            productsAdapter.upsertOne(state,action.payload);
            state.productsLoaded = false;
        },
        removeProduct : (state , action ) => {
            productsAdapter.removeOne(state,action.payload);
            state.productsLoaded = false;
        }
    },
    extraReducers : (builder => {
        builder.addCase(fetchProductsAsync.pending , (state) => {
            state.status = 'pendingFetchProducts'
        })
        builder.addCase(fetchProductsAsync.fulfilled , (state,action) => {
            productsAdapter.setAll(state,action.payload);
            state.status = 'idel';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected , (state,action) => {
            console.log(action.payload)
            state.status = 'idel'
        })
        builder.addCase(fetchProductAsync.pending , (state) => {
            state.status = 'pendingFetchProduct'
        })
        builder.addCase(fetchProductAsync.fulfilled , (state,action) => {
            productsAdapter.upsertOne(state , action.payload)
            state.status = 'idel';
        });
        builder.addCase(fetchProductAsync.rejected , (state,action) => {
            console.log(action.payload)
            state.status = 'idel'
        })
        builder.addCase(fetchFilter.pending , (state) => {
            state.status = 'pendingFetchingFilter'
        })
        builder.addCase(fetchFilter.fulfilled , (state,action) => {
            state.brand = action.payload.brands;
            state.types = action.payload.type;
            state.status = 'idel';
            state.filterLoaded = true;
        });
        builder.addCase(fetchFilter.rejected , (state,action) => {
            console.log(action.payload)
            state.status = 'idel'
        })
    })
})

export const productSeleectors = productsAdapter.getSelectors((state : RootState) => state.catlog)
export const {setProductParms , resetProductParams , setMeteData , setPageNumber , setProduct , removeProduct} = catlogSlice.actions;

