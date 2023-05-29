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
    yield put(push("/admin/dashboard"));
  } catch (err) {
    yield put(authActions.loginFailed("Cannot Handle Login!"));
  }
}

function* handleLogout() {
  delay(100);
  console.log("Handle Logout");
  localStorage.removeItem(STORAGE.ACCESS_TOKEN);
  // Redirect to Login Dashboard
  yield put(push("/login"));
}

function* watchLoginFlow() {
  console.log("Watch Login");
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
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
