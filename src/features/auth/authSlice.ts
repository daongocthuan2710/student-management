import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models";

export interface LoginPayload{
    username: string;
    password: string;
}

export interface AuthState{
    isLoggedIn: boolean,
    logging?: boolean,
    currentUser?: User
}
const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers:{
        login(state, action: PayloadAction<LoginPayload>){
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<User>){
            state.isLoggedIn = true;
            state.logging = false;
            state.currentUser = action.payload;
        },
        loginFailed(state, action: PayloadAction<String>){
            state.logging = false;
        },     
        logout(state){
            state.isLoggedIn = false;
            state.currentUser = undefined;
        }
    }
})

// Actions
export const authActions = authSlice.actions;

// Selectors
 export const selectIsloggIn = (state: any) => state.auth.isLoggedIn;
 export const selectIslogging = (state: any) => state.auth.logging;

// Reducer  
const authReducer = authSlice.reducer;
export default authReducer;