import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../../app/api/agent";
import { user } from "../../app/model/user";
import { setBasket } from "../basket/BasketSlice";

interface AccountState {
    User : user | null
}
const initialState : AccountState = {
    User : null
}

export const signUser = createAsyncThunk<user,FieldValues>(
    'account/signInUser',
   async (data,thunkAPI) => {
        try{
            const userdto = await agent.Account.login(data);
            const {basket , ...user} = userdto;
            if(basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user',JSON.stringify(user))
            return user;
        }
        catch(error:any){
            return thunkAPI.rejectWithValue({error : error.data})
        }
   }
)

export const fetchCurrentUser = createAsyncThunk<user>(
    'account/signInUser',
   async (_,thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))
        try{
            const userdto = await agent.Account.currentUser();
            const {basket , ...user} = userdto;
            if(basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user',JSON.stringify(user))
            return user;
        }
        catch(error:any){
            return thunkAPI.rejectWithValue({error : error.data})
        }
   },
   {
    condition : () => {
        if(!localStorage.getItem('user')) return false;
    }
   }
)

export const accountSlice = createSlice({
    name : 'Account',
    initialState,
    reducers : {
        signOut : (state) => {
            state.User = null;
            localStorage.removeItem('user');
            history.push('/')
        },
        setUser : (state , action) => {
            let claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            let roles = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            state.User = {...action.payload , roles : typeof(roles) === 'string' ? [roles] : roles}
        }
    },
    extraReducers : (builder => {
        builder.addCase(fetchCurrentUser.rejected,(state) => {
            state.User = null;
            localStorage.removeItem('user');
            toast.error('session expired - please login')
        })
        builder.addMatcher(isAnyOf(fetchCurrentUser.fulfilled,signUser.fulfilled),(state,action) => {
            let claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            let roles = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            state.User = {...action.payload , roles : typeof(roles) === 'string' ? [roles] : roles}
        });
        builder.addMatcher(isAnyOf(signUser.rejected),(state,action) => {
            throw action.payload
        });
    })
});
export const {signOut,setUser} = accountSlice.actions