import { useTypedDispatch } from 'hooks';
import { clearModal, closeModal } from 'redux/actions/modal.action';

const useCloseModal = () => {
  const dispatch = useTypedDispatch();
  const closeModalHandle = () => {
    dispatch(closeModal());
    setTimeout(() => dispatch(clearModal()), 600);
  };

  return closeModalHandle;
};

export default useCloseModal;
