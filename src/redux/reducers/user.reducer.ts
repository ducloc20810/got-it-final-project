import { User } from "../../types/redux";
import { RootState } from "../store";

type Action = {
  type: string;
  payload?: User;
};

const initialState: User = {
  name: "",
  id: "",
  isLoggedIn: false,
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoggedIn: false,
      };

    case "REGISTER_FAILURE":
      return {
        ...state,
        isLoggedIn: false,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoggedIn: false,
      };

    case "LOGOUT":
      return {
        name: "",
        id: "",
        isLoggedIn: false,
      };

    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        ...action.payload,
      };

    case "FETCH_USER_FAILURE":
      return state;

    default:
      return state;
  }
};

export const userSelector = (state: RootState) => state.user;
export default userReducer;
