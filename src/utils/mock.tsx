import {
  GET_USER_INFO,
  handleAsyncAction,
  LOGIN,
} from "redux/actions/user.action";
import { TypedDispatch } from "redux/store";

export const loginMockSuccess = () => (dispatch: TypedDispatch) =>
  handleAsyncAction(
    dispatch,
    LOGIN,
    () =>
      new Promise((resolve) =>
        resolve({
          status: 200,
          ok: true,
          json: () =>
            new Promise((resolve) => resolve({ access_token: "123456" })),
        })
      )
  );

export const getUserInfoMockSuccess = () => (dispatch: TypedDispatch) =>
  handleAsyncAction(
    dispatch,
    GET_USER_INFO,
    () =>
      new Promise((resolve) =>
        resolve({
          status: 200,
          ok: true,
          json: () =>
            new Promise((resolve) =>
              resolve({
                id: "1",
                name: "Loc",
              })
            ),
        })
      )
  );
