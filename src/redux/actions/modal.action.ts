import { Modal } from "types/redux";

export const modalActions = {
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",
  LOADED: "LOADED",
  LOADING: "LOADING",
  SET_CHILDREN: "SET_CHILDREN",
  SET_TITLE: "SET_TITLE",
  SET_MODAL: "SET_MODAL",
  SET_CLOSE_BUTTON_CONTENT: "SET_CLOSE_BUTTON_CONTENT",
  SET_SUBMIT_BUTTON_CONTENT: "SET_SUBMIT_BUTTON_CONTENT",
  SET_CLOSE_HANDLE: "SET_CLOSE_HANDLE",
  SET_SUBMIT_HANDLE: "SET_SUBMIT_HANDLE",
};

export const openModal = () => ({
  type: modalActions.OPEN_MODAL,
});

export const closeModal = () => ({
  type: modalActions.CLOSE_MODAL,
});

export const hideLoading = () => ({
  type: modalActions.LOADED,
});

export const setLoading = () => ({
  type: modalActions.LOADING,
});

export const setTitle = (payload: string) => ({
  type: modalActions.SET_TITLE,
  payload,
});

export const setCloseButtonContent = (payload: string) => ({
  type: modalActions.SET_CLOSE_BUTTON_CONTENT,
  payload,
});

export const setSubmitButtonContent = (payload: string) => ({
  type: modalActions.SET_SUBMIT_BUTTON_CONTENT,
  payload,
});

export const setChildren = (payload: React.ReactNode) => ({
  type: modalActions.SET_CHILDREN,
  payload,
});

export const setModal = (payload: Modal) => ({
  type: modalActions.SET_MODAL,
  payload,
});

export const setCloseHandle = (payload: Function) => ({
  type: modalActions.SET_CLOSE_HANDLE,
  payload,
});

export const setSubmitHandle = (payload: Function) => ({
  type: modalActions.SET_SUBMIT_HANDLE,
  payload,
});
