import { Modal } from 'types/redux';

export const modalActions = {
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  LOADED: 'LOADED',
  LOADING: 'LOADING',
  SET_MODAL: 'SET_MODAL',
  CLEAR_MODAL: 'CLEAR_MODAL',
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

export const setModal = (payload: Modal) => ({
  type: modalActions.SET_MODAL,
  payload,
});

export const clearModal = () => ({
  type: modalActions.CLEAR_MODAL,
});
