import { AUTH_STORAGE_KEY } from 'constants/storage';
import { TypedDispatch } from 'redux/store';
import helper from 'services/helper';
import { EndPoints } from 'constants/api';
import { handleAsyncAction } from './utils';

export const UserActions = {
  SET_USER: 'SET_USER',
  DELETE_USER: 'DELETE_USER',
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  FETCH_USER_INFO: 'FETCH_USER_INFO',
  LOGOUT: 'LOGOUT',
};

export const register = (name: string, email: string, password: string) =>
  (dispatch: TypedDispatch) =>
    handleAsyncAction(dispatch, UserActions.REGISTER, () =>
      helper.post(EndPoints.REGISTER, { email, name, password }));

export const login = (email: string, password: string) => (dispatch: TypedDispatch) =>
  handleAsyncAction(dispatch, UserActions.LOGIN, () =>
    helper.post(EndPoints.LOGIN, { email, password }));

export const logout = () => (dispatch: TypedDispatch) => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  dispatch({ type: UserActions.LOGOUT });
};

export const getUserInfo = () => (dispatch: TypedDispatch) =>
  handleAsyncAction(dispatch, UserActions.FETCH_USER_INFO, () =>
    helper.getWithAuthentication(EndPoints.GET_USER_INFO));
