import { put, take, fork, call, delay } from "redux-saga/effects";
import { LoginPayload, authActions } from ".";
import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { STORAGE } from "../../../../constants/storage";

function* handleLogin(payload: LoginPayload) {
  console.log("Handle Login ", payload);
  try {
    yield delay(500);
    localStorage.setItem(STORAGE.ACCESS_TOKEN, "token");
    yield put(
      authActions.loginSuccess({
        id: 1,
        username: "fake-name",
      })
    );
    // Redirect to Admin Dashboard
    yield put(push("/dashboard"));
  } catch (err) {
    yield put(authActions.loginFailed("Cannot Handle Login!"));
  }
}

function* handleLogout() {
  try {
    delay(100);
    localStorage.removeItem(STORAGE.ACCESS_TOKEN);
    // Redirect to Login
    yield put(push("/login"));
  } catch (error) {
    console.log("Faild to Logout!", error);
  }
}

function* watchLoginFlow() {
  try {
    while (true) {
      const isLoggedIn = Boolean(localStorage.getItem(STORAGE.ACCESS_TOKEN));

      if (!isLoggedIn) {
        const action: PayloadAction<LoginPayload> = yield take(
          authActions.login.type
        );
        yield fork(handleLogin, action.payload);
      }
      yield take(authActions.logout.type);
      yield call(handleLogout);
    }
  } catch (error) {
    console.log("Faild to login!", error);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
