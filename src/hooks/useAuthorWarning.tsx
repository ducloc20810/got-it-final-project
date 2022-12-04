import { useCloseModal, useTypedDispatch } from 'hooks';
import { ModalList } from 'constants/modal';
import { setModal } from 'redux/actions/modal.action';

const useAuthorWarning = () => {
  const dispatch = useTypedDispatch();
  const closeModalHandle = useCloseModal();

  const showAuthorWarning = (itemName: string) => {
    dispatch(
      setModal({
        component: ModalList.AUTHOR_WARNING,
        componentProps: { itemName, confirmHandle: closeModalHandle },
        isLoading: false,
        isOpen: true,
        title: 'Authorization Warning',
        footerContent: undefined,
        closeHandle: closeModalHandle,
      }),
    );
  };
  return showAuthorWarning;
};

export default useAuthorWarning;
