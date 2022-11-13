import { Message } from "../../types/redux";

export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const setMessage = (message: Message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: SET_MESSAGE,
  payload: CLEAR_MESSAGE,
});
