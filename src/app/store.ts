// Toolkit
import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';

// Reducers
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/Dashboard/dashboardSlice';
import studentReducer from '../features/Student/studentSlice';

// Saga
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga';

//  Connected React Router
import { connectRouter, routerMiddleware } from 'connected-react-router';

// Constants
import { history } from '../utils';

const rootReducer = combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  student: studentReducer,
})

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    thunk: true,
    serializableCheck: true,
    immutableCheck: true,
  }).concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
