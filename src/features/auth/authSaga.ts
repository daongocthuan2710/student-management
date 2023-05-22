import { put, take, fork, call, delay } from "redux-saga/effects";
import { LoginPayload, authActions } from "./authSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { Storage } from "../../constants";
import { push } from "connected-react-router";

function* handleLogin(payload: LoginPayload){
    console.log('Handle Login ', payload);  
    try{
        yield delay(500)
        localStorage.setItem(Storage.ACCESS_TOKEN, 'token')
        yield put(
            authActions.loginSuccess({
                id: 1,
                username: 'fake-name' 
            })
        )
        // Redirect to Admin Dashboard
        yield put(push('/admin'))
    } catch(err){
        yield put(authActions.loginFailed("Cannot Handle Login!"))
    }

}

function* handleLogout(){
    delay(100)
    console.log('Handle Logout'); 
    localStorage.removeItem(Storage.ACCESS_TOKEN)
    // Redirect to Login Dashboard
    yield put(push('/login'))
}

function* watchLoginFlow(){
    console.log('Watch Login');
    while(true){
        const isLoggedIn = Boolean(localStorage.getItem(Storage.ACCESS_TOKEN))
        if(!isLoggedIn){
            const action:PayloadAction<LoginPayload> = yield take(authActions.login.type)
            yield fork(handleLogin, action.payload)
        }
        yield take(authActions.logout.type)
        yield call(handleLogout)
    }
}

export function* authSaga(){
    yield fork(watchLoginFlow)
}