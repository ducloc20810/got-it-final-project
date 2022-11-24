import { RootState } from 'redux/store';
import { Message } from 'types/redux';
import { SET_MESSAGE, CLEAR_MESSAGE } from 'redux/actions/message.action';

type Action = {
  type: string;
  payload: Message;
};

const initialState: Message = {
  message: '',
  error: null,
  status: null,
};

const messageReducer = (state = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return payload;

    case CLEAR_MESSAGE:
      return {
        message: '',
        error: null,
        status: null,
      };

    default:
      return state;
  }
};

export const messageSelector = (state: RootState) => state.message;

export default messageReducer;
