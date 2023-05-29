import {call, put, delay, takeLatest} from "@redux-saga/core/effects"
import { PayloadAction } from "@reduxjs/toolkit";
import { incrementSaga, incrementSagaSuccess } from "./counterSlice";

function delayTime(miliseconds: number){
  delay(miliseconds)
}
export function* handleIncrementSaga(action: PayloadAction<number>){
    console.log("Waiting 1 seconds");
      // Wait 1 seconds
    yield call(delayTime, 1000)   
    console.log("Waiting done!");
    // Dispatch the action success 
    yield put(incrementSagaSuccess(action.payload))
}

export function* handleIncrementSagaSuccess(){
    console.log("Waiting 1 seconds");
      // Wait 1 seconds
    yield call(delay, 1000)   
    console.log("Waiting done!");
    // Dispatch the action success 
    yield put({ type: incrementSagaSuccess.toString })
}

export default function* counterSaga(){
    console.log('counterSaga');    
    yield takeLatest(incrementSaga.toString(), handleIncrementSagaSuccess);
    // yield takeEvery('counter/increment', log);
    // yield takeEvery('*', log);
}