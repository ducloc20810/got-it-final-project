import { Modal } from 'types/redux';

export const ModalActions = {
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  LOADED: 'LOADED',
  LOADING: 'LOADING',
  SET_MODAL: 'SET_MODAL',
  CLEAR_MODAL: 'CLEAR_MODAL',
};

export const openModal = () => ({
  type: ModalActions.OPEN_MODAL,
});

export const closeModal = () => ({
  type: ModalActions.CLOSE_MODAL,
});

export const hideLoading = () => ({
  type: ModalActions.LOADED,
});

export const setLoading = () => ({
  type: ModalActions.LOADING,
});

export const setModal = (payload: Modal) => ({
  type: ModalActions.SET_MODAL,
  payload,
});

export const clearModal = () => ({
  type: ModalActions.CLEAR_MODAL,
});
