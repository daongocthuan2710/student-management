import { call, put, delay, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { incrementSaga, incrementSagaSuccess } from "./counterSlice";

function delayTime(miliseconds: number) {
  delay(miliseconds);
}
export function* handleIncrementSaga(action: PayloadAction<number>) {
  // Wait 1 seconds
  yield call(delayTime, 1000);
  // Dispatch the action success
  yield put(incrementSagaSuccess(action.payload));
}

export function* handleIncrementSagaSuccess() {
  // Wait 1 seconds
  yield call(delay, 1000);
  // Dispatch the action success
  yield put({ type: incrementSagaSuccess.toString });
}

export default function* counterSaga() {
  yield takeLatest(incrementSaga.toString(), handleIncrementSagaSuccess);
  // yield takeEvery('counter/increment', log);
  // yield takeEvery('*', log);
}
