// Redux
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../../../store/store";

// Types
import { Card, List } from "../../../../../models";

export interface TodoListState {
  lists: List[];
  cards: Card[];
}
const initialState: TodoListState = {
  lists: [],
  cards: [],
};

const todoListSlice = createSlice({
  name: "todoList",
  initialState: initialState,
  reducers: {
    setLists(state, action: PayloadAction<List[]>) {
      state.lists = action.payload;
    },
    setCards(state, action: PayloadAction<Card[]>) {
      state.cards = action.payload;
    },
  },
});

// Actions
export const todoListActions = todoListSlice.actions;

// Selectors
export const selectList = (state: RootState) => state.todoList.lists;
export const selectCard = (state: RootState) => state.todoList.cards;

// Reducer
const todoListReducer = todoListSlice.reducer;
export default todoListReducer;
