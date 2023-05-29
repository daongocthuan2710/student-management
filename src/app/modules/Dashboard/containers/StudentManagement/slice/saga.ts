// Librarys
import { message } from "antd";

// Navigation from saga
import { push } from "connected-react-router";

// Saga
import { call, put, takeLatest } from "redux-saga/effects";

// Slices
import { studentActions } from ".";

// Constants
import { ACTIONS } from "./sagaActions";
import { MESSAGE } from "../../../../../../constants";

// Types
import {
  TCreateStudentPayload,
  TFetchStudentListPayload,
  TAction,
  TUpdateStudentListPayload,
  TDeleteStudentListPayload,
  TGetStudentListPayload,
} from "../types";
import {
  City,
  ListResponse,
  Student,
  TCity,
  TStudent,
} from "../../../../../models";

// Call Apis
import cityApi from "../../../../../../api/cityApi";
import studentApi from "../../../../../../api/studentApi";

function* createStudent(action: TAction<TCreateStudentPayload>) {
  try {
    yield put(studentActions.setCreateLoading(true));
    const data: Student = yield call(studentApi.add, action.payload);
    if (data !== undefined) {
      yield put(push("/dashboard/students"));
      message.success(MESSAGE.CREATE_SUCCESS, MESSAGE.DURATION);
    }
    yield put(studentActions.setCreateLoading(false));
  } catch (error) {
    console.log("Failed to create new student", error);
    yield put(studentActions.setCreateLoading(false));
    message.success(MESSAGE.CREATE_FAILED, MESSAGE.DURATION);
  }
}

function* deleteStudent(action: TAction<TDeleteStudentListPayload>) {
  try {
    yield put(studentActions.setDeleteLoading(true));
    const data: Student = yield call(studentApi.delete, action.payload.id);
    if (data !== undefined) {
      yield put({ type: ACTIONS.FETCH_STUDENT_DATA, payload: {}});
      message.success(MESSAGE.DELETE_SUCCESS, MESSAGE.DURATION);
    }
    yield put(studentActions.setDeleteLoading(false));
  } catch (err) {
    console.log("Failed to fetch student data", err);
    message.error(MESSAGE.DELETE_FAILED, MESSAGE.DURATION);
    yield put(studentActions.setDeleteLoading(false));
  }
}

function* updateStudent(action: TAction<TUpdateStudentListPayload>) {
  try {
    yield put(studentActions.setUpdateLoading(true));
    const data: Student = yield call(studentApi.update, action.payload);
    if (data !== undefined) {
      yield put(push("/dashboard/students"));
      message.success(MESSAGE.UPDATE_SUCCESS, MESSAGE.DURATION);
    }
    yield put(studentActions.setUpdateLoading(false));
  } catch (error) {
    console.log("Failed to update student", error);
    yield put(studentActions.setUpdateLoading(false));
    message.success(MESSAGE.UPDATE_FAILED, MESSAGE.DURATION);
  }
}

function* fetchStudentList(action: TAction<TFetchStudentListPayload>) {
  try {
    yield put(studentActions.setListLoading(true));
    const {
      page = 1,
      limit = 10,
      order = "desc",
      sort = "updatedAt",
    } = action.payload;

    const response: ListResponse<TStudent> = yield call(studentApi.getAll, {
      _page: page,
      _limit: limit,
      _order: order,
      _sort: sort,
    });
    // Map type TStudent to class Student
    if (response && response.data) {
      const data: ListResponse<Student> = {
        data: response.data.map((student) => new Student(student)),
        pagination: response.pagination,
      };
      yield put(studentActions.setStudentList(data));
    }
    yield put(studentActions.setListLoading(false));
  } catch (err) {
    console.log("Failed to fetch student data", err);
    yield put(studentActions.setListLoading(false));
  }
}

function* fetchCityList() {
  try {
    const response: ListResponse<TCity> = yield call(cityApi.getAll);
    // Map type TStudent to class Student
    if (response && response.data) {
      const data: ListResponse<City> = {
        data: response.data.map((city) => new City(city)),
        pagination: response.pagination,
      };
      yield put(studentActions.setCityList(data));
    }
  } catch (error) {
    console.log("Failed to fetch student data", error);
    yield put(studentActions.setListLoading(false));
  }
}

function* fetchStudentById(action: TAction<TGetStudentListPayload>) {
  try {
    yield put(studentActions.setGetLoading(true));
    const data: Student = yield call(studentApi.getById, action.payload.id);
    if (data !== undefined) {
      yield put(studentActions.setStudentEdit(data));
    }
    yield put(studentActions.setGetLoading(false));
  } catch (error) {
    console.log("Failed to get student", error);
    yield put(studentActions.setGetLoading(false));
  }
}

export default function* studentSaga() {
  yield takeLatest(ACTIONS.FETCH_STUDENT_DATA, fetchStudentList);
  yield takeLatest(ACTIONS.DELETE_STUDENT, deleteStudent);
  yield takeLatest(ACTIONS.CREATE_NEW_STUDENT, createStudent);
  yield takeLatest(ACTIONS.UPDATE_STUDENT, updateStudent);
  yield takeLatest(ACTIONS.FETCH_STUDENT_BY_ID, fetchStudentById);
  yield takeLatest(ACTIONS.FETCH_CITY_DATA, fetchCityList);
}
