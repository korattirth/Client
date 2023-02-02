import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "../../features/account/accountSlice";
import { basketSlice } from "../../features/basket/BasketSlice";
import { catlogSlice } from "../../features/catlog/catlogSlice";

export const store = configureStore({
    reducer : {
       basket : basketSlice.reducer,
       catlog : catlogSlice.reducer,
       account : accountSlice.reducer
    }
})
 export type RootState = ReturnType<typeof store.getState>;
 export type AppDispatch = typeof store.dispatch;

 export const useAppDispatch = () => useDispatch<AppDispatch>();
 export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;
