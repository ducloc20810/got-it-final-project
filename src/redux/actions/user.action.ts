import { TypedDispatch } from "redux/store";
import AuthService from "services/auth.service";
import UserService from "services/user.service";
import { setMessage } from "redux/actions/message.action";

export const SET_USER: string = "SET_USER";
export const DELETE_USER: string = "DELETE_USER";

export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";

export const GET_USER_INFO = "FETCH_USER_INFO";

export const register =
  (name: string, email: string, password: string) =>
  (dispatch: TypedDispatch) =>
    handleAsyncAction(dispatch, LOGIN, () =>
      AuthService.register(name, email, password)
    );

export const login =
  (email: string, password: string) => (dispatch: TypedDispatch) =>
    handleAsyncAction(dispatch, LOGIN, () =>
      AuthService.login(email, password)
    );

export const logout = () => (dispatch: TypedDispatch) => {
  AuthService.logout();
  dispatch({ type: "LOGOUT" });
};

export const getUserInfo = () => (dispatch: TypedDispatch) =>
  handleAsyncAction(dispatch, GET_USER_INFO, () => UserService.getUserInfo());

export const handleAsyncAction = async (
  dispatch: TypedDispatch,
  type: string,
  promise: Function
) => {
  try {
    const res = await promise();
    const data = await res.json();

    if (res.ok) {
      // let newType = type.split("_").join(" ");
      // newType =
      //   newType.toLowerCase().charAt(0).toUpperCase() +
      //   newType.toLowerCase().slice(1);

      if (type === "LOGIN") {
        localStorage.setItem("auth", JSON.stringify(data));
      }

      // dispatch(
      //   setMessage({
      //     message: `${newType} successfully`,
      //     status: res.status,
      //   })
      // );

      dispatch({ type: `${type}_SUCCESS` });
      return Promise.resolve();
    }

    // If res is not ok
    dispatch(
      setMessage({
        status: res.status,
        error: data,
      })
    );
    return Promise.reject(data.message);
  } catch (err) {
    console.log(err);
    dispatch(
      setMessage({
        error: { message: "Something is wrong" },
      })
    );
    return Promise.reject(err);
  }
};
