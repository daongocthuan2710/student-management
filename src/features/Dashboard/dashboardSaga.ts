import { all, call, put, takeLatest } from "redux-saga/effects";
import { RankingByCity, dashboardActions } from "./dashboardSlice";
import { City, ListResponse, Student } from "../../models";
import studentApi from "../../api/studentApi";
import cityApi from "../../api/cityApi";


function* fetchStatisttics(){
    const responseList: Array<ListResponse<Student>> = yield all([
        call(studentApi.getAll, {_page: 1,_limit: 5, gender: "male"}),
        call(studentApi.getAll, {_page: 1,_limit: 5, gender: "female"}),
        call(studentApi.getAll, {_page: 1,_limit: 5, mark_gte: 8}),
        call(studentApi.getAll, {_page: 1,_limit: 5, mark_lte: 5}),
    ]);
    
    const statisticList = responseList.map((item) => item.pagination._totalRows)
    const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticList
    yield put(
        dashboardActions.setStatistics({maleCount, femaleCount, highMarkCount, lowMarkCount})
    )
}    

function* fetchHighestStudentList(){
    const {data}: ListResponse<Student> = yield call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _order: "desc",
        _sort: "mark"
    })
    yield put(dashboardActions.setHighestStudentList(data))
}    

function* fetchLowestStudentList(){
    const {data}: ListResponse<Student> = yield call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _order: "asc",
        _sort: "mark"
    })
    yield put(dashboardActions.setLowestStudentList(data))
}    

function* fetchRankingbyCity(){
    // Fetch city List
    const {data: cityList}: ListResponse<City> = yield call(cityApi.getAll)

    // Fetch ranking per city
    const callList = cityList.map((item) => call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _order: "desc",
        _sort: "mark",
        city: item.code
    }))
    const responseList: Array<ListResponse<Student>> = yield all(callList)
    const rankingByCityList: Array<RankingByCity> = responseList.map((item, index) => ({
        cityId: cityList[index].code,
        rankingList: item.data
    }))

    // Update State
    yield put(dashboardActions.setRankingByCityList(rankingByCityList))
}    

function* fetchDashboardData(){
    try{
        yield all([
            call(fetchStatisttics),
            call(fetchHighestStudentList),
            call(fetchLowestStudentList),
            call(fetchRankingbyCity)
        ]);

        yield put(dashboardActions.fetchSuccess())
    }catch(err){
        console.log("Failed to fetch dashboard data", err);      
        yield put(dashboardActions.fetchFailed()) 
    }
}    

export default function* dashboardSaga(){
    yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData)
}