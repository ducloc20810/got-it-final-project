import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
} from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import messageReducer from 'redux/reducers/message';
import userReducer from 'redux/reducers/user.';
import breadcrumbReducer from './reducers/breadcrumb';
import modalReducer from './reducers/modal';

export const reducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  modal: modalReducer,
  breadcrumb: breadcrumbReducer,
});
export const store = createStore(reducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type ReduxState = ReturnType<typeof reducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;
