import { RootState } from 'redux/store';
import { Message } from 'types/redux';
import { MessageActions } from 'redux/actions/message';

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
    case MessageActions.SET_MESSAGE:
      return payload;

    case MessageActions.CLEAR_MESSAGE:
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
