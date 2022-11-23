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
  footer: null,
  title: "",
  closeHandle: () => {},
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

    case modalActions.CLEAR_MODAL:
      return {
        isLoading: false,
        isOpen: false,
        children: null,
        footer: null,
        title: "",
        closeHandle: () => {},
      };

    default:
      return state;
  }
};

export const modalSelector = (state: RootState) => state.modal;
export default modalReducer;
