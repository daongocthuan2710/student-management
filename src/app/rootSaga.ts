import counterSaga from '../features/counter/counterSaga';
import { put, delay, takeEvery } from 'redux-saga/effects';
import {all} from 'redux-saga/effects';
import { authSaga } from '../features/auth/authSaga';
import dashboardSaga from '../features/Dashboard/dashboardSaga';
import studentSaga from '../features/Student/studentSaga';

function* helloSaga(){
    console.log("Hello saga");   
    yield
}
 

export function* incrementAsync() {
    yield delay(1000)
    yield put({ type: 'INCREMENT' })
  }
  
  export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
  }

export default function* rootSaga(){
    console.log("rootSaga");
    yield all([
        helloSaga(), 
        authSaga(),
        studentSaga(),
        dashboardSaga(),
        watchIncrementAsync(),
        counterSaga()
    ])
}