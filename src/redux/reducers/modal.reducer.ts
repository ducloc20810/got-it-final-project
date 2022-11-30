import { RootState } from 'redux/store';
import { ModalActions } from 'redux/actions/modal.action';
import { Modal } from 'types/redux';

type Action = {
  type: string;
  payload?: Modal;
};

const initialState: Modal = {
  isLoading: false,
  isOpen: false,
  component: '',
  componentProps: {},
  title: '',
  closeHandle: () => null,
};

const modalReducer = (
  state: Modal = initialState,
  action: Action,
): Modal => {
  switch (action.type) {
    case ModalActions.SET_MODAL:
      return {
        ...state,
        ...action.payload,
      };

    case ModalActions.CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
      };

    case ModalActions.OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
      };

    case ModalActions.LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case ModalActions.LOADED:
      return {
        ...state,
        isLoading: false,
      };

    case ModalActions.CLEAR_MODAL:
      return {
        isLoading: false,
        isOpen: false,
        component: '',
        componentProps: {},
        title: '',
        closeHandle: () => null,
      };

    default:
      return state;
  }
};

export const modalSelector = (state: RootState) => state.modal;
export default modalReducer;
