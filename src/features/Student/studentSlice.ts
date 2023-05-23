import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Student} from "../../models";
import { RootState } from "../../app/store";

export interface StudentState{
    loading: boolean,
    studentList: Student[]
}
const initialState: StudentState = {
    loading: false,
    studentList: []
}

const studentSlice = createSlice({
    name: 'student',
    initialState: initialState,
    reducers:{
        fetchData(state){
            state.loading = true;
        },
        fetchSuccess(state){
            state.loading = false;
        },
        fetchFailed(state){
            state.loading = false;
        },
        setStudentList(state, action: PayloadAction<Student[]>){
            state.studentList = action.payload;
        },
    }
})

// Actions
export const studentActions = studentSlice.actions;

// Selectors
export const selectStudentLoading = (state :RootState) => state.student.loading
export const selectStudentList = (state :RootState) => state.student.studentList

// Reducer  
const studentReducer = studentSlice.reducer;
export default studentReducer;