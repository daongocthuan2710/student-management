import counterSaga from "../app/modules/counter/counterSaga";
import { all } from "redux-saga/effects";
import { authSaga } from "../app/modules/auth/slice/saga";
import dashboardSaga from "../app/modules/Dashboard/dashboardSaga";
import studentSaga from "../app/modules/Student/studentSaga";

export default function* rootSaga() {
  yield all([authSaga(), studentSaga(), dashboardSaga(), counterSaga()]);
}
