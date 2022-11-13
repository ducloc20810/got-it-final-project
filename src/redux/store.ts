import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import messageReducer from "./reducers/message.reducer";
import userReducer from "./reducers/user.reducer";

const reducer = combineReducers({ user: userReducer, message: messageReducer });
export const store = createStore(reducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
