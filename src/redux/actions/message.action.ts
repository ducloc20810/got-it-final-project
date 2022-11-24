import { Message } from 'types/redux';

export const MessageActions = {
  SET_MESSAGE: 'SET_MESSAGE',
  CLEAR_MESSAGE: 'CLEAR_MESSAGE',
};

export const setMessage = (message: Message) => ({
  type: MessageActions.SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: MessageActions.CLEAR_MESSAGE,

});
