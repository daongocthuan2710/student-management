import counterSaga from "../app/modules/Dashboard/containers/counter/counterSaga";
import { all } from "redux-saga/effects";
import { authSaga } from "../app/modules/auth/slice/saga";
import dashboardSaga from "../app/modules/Dashboard/containers/dasboardTemp/slice/saga";
import studentSaga from "../app/modules/Dashboard/containers/StudentManagement/slice/saga";
import todoListSaga from "../app/modules/Dashboard/containers/TodoList/slice/saga";

export default function* rootSaga() {
  yield all([
    studentSaga(),
    todoListSaga(),
    authSaga(),
    dashboardSaga(),
    counterSaga(),
  ]);
}
