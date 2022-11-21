import { RootState } from "redux/store";
import { modalActions } from "redux/actions/modal.action";
import { Modal } from "types/redux";

type Action = {
  type: string;
  payload?: Modal;
};

const initialState: Modal = {
  isLoading: false,
  isOpen: false,
  children: null,
  closeHandle: () => {},
  submitHandle: () => {},
};

const modalReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case modalActions.CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
      };

    case modalActions.OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
      };

    case modalActions.LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case modalActions.LOADED:
      return {
        ...state,
        isLoading: true,
      };

    case modalActions.SET_CHILDREN:
      return {
        ...state,
        children: action.payload?.children,
      };

    case modalActions.SET_CLOSE_HANDLE:
      return {
        ...state,
        closeHandle: action.payload?.closeHandle,
      };

    case modalActions.SET_SUBMIT_HANDLE:
      return {
        ...state,
        submitHandle: action.payload?.submitHandle,
      };
  }
};

export const modalSelector = (state: RootState) => state.modal;
export default modalReducer;
