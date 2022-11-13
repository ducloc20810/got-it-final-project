import { Message } from "../../types/redux";
import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/message.action";

const initialState: Message = {
  message: "",
  data: {},
  status: NaN,
};

type Action = {
  type: string;
  payload: Message;
};

const messageReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return payload;

    case CLEAR_MESSAGE:
      return {};

    default:
      return state;
  }
};

export default messageReducer;
