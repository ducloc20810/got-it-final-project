import { AppDispatch } from "../store";
import AuthService from "../../services/auth.service";
import { setMessage } from "./message.action";
import UserService from "../../services/user.service";

export const SET_USER: string = "SET_USER";
export const DELETE_USER: string = "DELETE_USER";

export const register =
  (name: string, email: string, password: string) =>
  async (dispatch: AppDispatch) => {
    const response: any = await AuthService.register(name, email, password);
    let data = null;
    if (response.status === 200 || response.status === 400) {
      data = await response.json();
    }
    switch (response.status) {
      case 200:
        dispatch(
          setMessage({
            message: "Register successfully",
            status: response.status,
          })
        );
        dispatch({
          type: "REGISTER_SUCCESS",
        });

        return Promise.resolve();

      case 400:
        dispatch(
          setMessage({
            status: response.status,
            message: data.message,
          })
        );

        dispatch({
          type: "REGISTER_FAILURE",
        });

        break;

      default:
        break;
    }

    return Promise.reject();
  };

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    const response: any = await AuthService.login(email, password);
    let data = null;
    if (response.status === 200 || response.status === 400) {
      data = await response.json();
    }

    switch (response.status) {
      case 200:
        localStorage.setItem("auth", JSON.stringify(data));
        dispatch(
          setMessage({
            message: "Login successfully",
            status: response.status,
          })
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: { isLoggedIn: true } });
        return Promise.resolve();

      case 400:
        dispatch(
          setMessage({
            status: response.status,
            message: data.message,
          })
        );

        dispatch({ type: "LOGIN_FAILURE" });
        break;

      default:
        break;
    }

    return Promise.reject();
  };

export const logout = () => (dispatch: AppDispatch) => {
  AuthService.logout();
  dispatch({ type: "LOGOUT" });
};

export const getUserInfo = () => async (dispatch: AppDispatch) => {
  const response = await UserService.getUserInfo();

  let data = null;
  if (
    response.status === 200 ||
    response.status === 400 ||
    response.status === 401
  ) {
    data = await response.json();
  }

  switch (response.status) {
    case 200:
      dispatch({
        type: "FETCH_USER_SUCCESS",
        payload: { ...data, isLoggedIn: true },
      });
      return Promise.resolve();

    case 400 || 404:
      dispatch(
        setMessage({
          message: data.message,
          status: response.status,
        })
      );

      dispatch({
        type: "FETCH_USER_FAILURE",
      });
      break;

    default:
      break;
  }
  return Promise.reject();
};
