// Saga
import { all, call, put, takeLatest } from "redux-saga/effects";

// Slices
import { TODOLIST_ACTIONS } from "./sagaActions";

// Constants
import { todoListActions } from ".";

// Types
import {
  TAction,
  TChangePositionCardPayload,
  TChangePositionListPayload,
} from "../types";
import { Card } from "../../../../../models";

// Call Apis
import { listApi } from "../../../../../../api/todoList";
import { cardApi } from "../../../../../../api/todoList/cardApi";

function* handleChangePositionList(
  action: TAction<TChangePositionListPayload>
) {
  try {
    yield put(todoListActions.setLists(action.payload.lists));

    yield all([
      call(listApi.update, action.payload.dataChange[0]),
      call(listApi.update, action.payload.dataChange[1]),
    ]);

    // const response: List[] = yield call(listApi.getAll);
    // if (response) yield put(todoListActions.setLists(response));
  } catch (error) {
    console.log("Failed to get list", error);
  }
}

function* handleChangePositionCard(
  action: TAction<TChangePositionCardPayload>
) {
  try {
    yield put(todoListActions.setCards(action.payload.cards));

    // yield all([
    //   call(cardApi.update, action.payload.dataChange[0]),
    //   action.payload.dataChange[1]
    //     ? call(cardApi.update, action.payload.dataChange[1])
    //     : "",
    // ]);

    // const response: Card[] = yield call(cardApi.getAll, { status: true });
    // if (response) yield put(todoListActions.setCards(response));
  } catch (error) {
    console.log("Failed to get list", error);
  }
}

export default function* todoListSaga() {
  yield takeLatest(
    TODOLIST_ACTIONS.CHANGE_POSITION_LIST,
    handleChangePositionList
  );
  yield takeLatest(
    TODOLIST_ACTIONS.CHANGE_POSITION_CARD,
    handleChangePositionCard
  );
}
