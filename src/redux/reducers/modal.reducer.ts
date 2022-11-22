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
  title: "",
  closeButtonContent: "Close",
  submitButtonContent: "Submit",
  closeHandle: () => {},
  submitHandle: () => {},
};

const modalReducer = (state: Modal = initialState, action: Action): Modal => {
  switch (action.type) {
    case modalActions.SET_MODAL:
      return {
        ...state,
        ...action.payload,
      };

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

    case modalActions.SET_TITLE:
      return {
        ...state,
        title: action.payload?.title ? action.payload.title : "Close",
      };

    case modalActions.SET_CLOSE_BUTTON_CONTENT:
      return {
        ...state,
        closeButtonContent: action.payload?.closeButtonContent
          ? action.payload.closeButtonContent
          : "Close",
      };

    case modalActions.SET_SUBMIT_BUTTON_CONTENT:
      return {
        ...state,
        submitButtonContent: action.payload?.submitButtonContent
          ? action.payload.submitButtonContent
          : "Submit",
      };

    case modalActions.SET_CHILDREN:
      return {
        ...state,
        children: action.payload?.children,
      };

    case modalActions.SET_CLOSE_HANDLE:
      return {
        ...state,
        closeHandle: action.payload?.closeHandle
          ? action.payload.closeHandle
          : state.closeHandle,
      };

    case modalActions.SET_SUBMIT_HANDLE:
      return {
        ...state,
        submitHandle: action.payload?.submitHandle
          ? action.payload.submitHandle
          : state.closeHandle,
      };
    default:
      return state;
  }
};

export const modalSelector = (state: RootState) => state.modal;
export default modalReducer;
