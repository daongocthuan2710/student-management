import { all, call, put, takeLatest } from "redux-saga/effects";
import { studentActions } from "./studentSlice";
import { ListResponse, Student } from "../../models";
import studentApi from "../../api/studentApi";

function* fetchStudentList(){
    const {data}: ListResponse<Student> = yield call(studentApi.getAll, {
        _page: 1,
        _limit: 15,
    })
    yield put(studentActions.setStudentList(data))
}    

function* fetchStudentData(){
    try{
        yield all([
         call(fetchStudentList)
        ]);

        yield put(studentActions.fetchSuccess())
    }catch(err){
        console.log("Failed to fetch student data", err);      
        yield put(studentActions.fetchFailed()) 
    }
}    

export default function* studentSaga(){
    yield takeLatest(studentActions.fetchData.type, fetchStudentData)
}