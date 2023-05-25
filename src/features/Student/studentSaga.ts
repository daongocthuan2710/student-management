import { all, call, put, takeLatest } from "redux-saga/effects";
import { studentActions } from "./studentSlice";
import { ListResponse, Student } from "../../models";
import studentApi from "../../api/studentApi";
import { ACTIONS } from "./sagaActions";
import { push } from "connected-react-router";

function* createStudent(action: { payload: Student, type: string}){
    yield put(studentActions.setCreateLoading(true))
    const data: Student = yield call(studentApi.add, action.payload)
    if(data !== undefined){
        yield put(push('/admin/students'))
    }
    yield put(studentActions.setCreateLoading(false))
}    

function* deleteStudent(action: { payload: string, type: string}){
    yield put(studentActions.setDeleteLoading(true))
    const data: Student = yield call(studentApi.delete, action.payload)
    if(data !== undefined){
        yield put(push('/admin/students'))
    }
    yield put(studentActions.setDeleteLoading(false))
}    

function* updateStudent(action: { payload: {data: {}, id: String}, type: string}){
    yield put(studentActions.setUpdateLoading(true))
    const data: Student = yield call(studentApi.update, action.payload)
    if(data !== undefined){
        yield put(push('/admin/students'))
    }
    yield put(studentActions.setUpdateLoading(false))
}    

function* fetchStudentList(action: { payload : Record<string, any>, type: string}){ 
    try{
        yield put(studentActions.setListLoading(true))
        const {page = 1 , limit = 10, order = 'desc', sort = "updatedAt"} = action.payload
        const data: ListResponse<Student> = yield call(studentApi.getAll, {
            _page: page,
            _limit: limit,
            _order: order,
            _sort: sort 
        })
        
        yield put(studentActions.setStudentList(data))
        yield put(studentActions.setListLoading(false))
    }catch(err){
        console.log("Failed to fetch student data", err);      
        yield put(studentActions.setListLoading(false))
    }
}    

function* fetchStudentById(action: { payload: string; type: string}){
    yield put(studentActions.setGetLoading(true))
    const data: Student = yield call(studentApi.getById, action.payload)
    if(data !== undefined){
        yield put(studentActions.setStudentEdit(data))
    }
    yield put(studentActions.setGetLoading(false))
}

export default function* studentSaga(){
    yield takeLatest(ACTIONS.FETCH_STUDENT_DATA, fetchStudentList)
    yield takeLatest(ACTIONS.DELETE_STUDENT, deleteStudent)
    yield takeLatest(ACTIONS.CREATE_NEW_STUDENT, createStudent)
    yield takeLatest(ACTIONS.UPDATE_STUDENT, updateStudent)
    yield takeLatest(ACTIONS.FETCH_STUDENT_BY_ID, fetchStudentById)
}