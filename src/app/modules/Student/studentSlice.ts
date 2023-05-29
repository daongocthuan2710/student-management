// Redux
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";

// Types
import { City, ListResponse, Student } from "../../models";

export interface StudentState {
  loading: {
    list: boolean;
    update: boolean;
    delete: boolean;
    create: boolean;
    get: boolean;
  };
  studentList: ListResponse<Student>;
  studentUpdate: Student;
  cityList: ListResponse<City>;
}
const initialState: StudentState = {
  loading: {
    list: false,
    update: false,
    delete: false,
    create: false,
    get: true,
  },
  studentList: {
    data: [],
    pagination: {
      _limit: 10,
      _page: 1,
      _totalRows: 0,
    },
  },
  studentUpdate: {
    name: "",
    age: 0,
    mark: 0,
    gender: "male",
    city: "",
    id: "",
    tags: [],
    createdAt: "",
    updatedAt: "",
    model: {},
  },
  cityList: {
    data: [],
    pagination: {
      _limit: 10,
      _page: 1,
      _totalRows: 0,
    },
  },
};

const studentSlice = createSlice({
  name: "student",
  initialState: initialState,
  reducers: {
    setListLoading(state, action: PayloadAction<boolean>) {
      state.loading.list = action.payload;
    },
    setGetLoading(state, action: PayloadAction<boolean>) {
      state.loading.get = action.payload;
    },
    setCreateLoading(state, action: PayloadAction<boolean>) {
      state.loading.create = action.payload;
    },
    setUpdateLoading(state, action: PayloadAction<boolean>) {
      state.loading.update = action.payload;
    },
    setDeleteLoading(state, action: PayloadAction<boolean>) {
      state.loading.delete = action.payload;
    },
    setStudentList(state, action: PayloadAction<ListResponse<Student>>) {
      state.studentList = action.payload;
    },
    setStudentEdit(state, action: PayloadAction<Student>) {
      state.studentUpdate = action.payload;
    },
    setCityList(state, action: PayloadAction<ListResponse<City>>) {
      state.cityList = action.payload;
    },
  },
});

// Actions
export const studentActions = studentSlice.actions;

// Selectors
export const selectStudentListLoading = (state: RootState) =>
  state.student.loading.list;
export const selectStudentGetLoading = (state: RootState) =>
  state.student.loading.get;
export const selectStudentUpdateLoading = (state: RootState) =>
  state.student.loading.update;
export const selectStudentCreateLoading = (state: RootState) =>
  state.student.loading.create;
export const selectStudentDeleteLoading = (state: RootState) =>
  state.student.loading.delete;
export const selectStudentList = (state: RootState) =>
  state.student.studentList;
export const selectStudentUpdate = (state: RootState) =>
  state.student.studentUpdate;
export const selectCityList = (state: RootState) => state.student.cityList;

// Reducer
const studentReducer = studentSlice.reducer;
export default studentReducer;
