import { useLocation, useNavigate } from 'react-router-dom';
import { useCloseModal, useTypedDispatch } from 'hooks';
import { ModalList } from 'constants/modal';
import { clearModal, setModal } from 'redux/actions/modal.action';

const useAuthWarning = (action: string) => {
  const dispatch = useTypedDispatch();
  const closeModalHandle = useCloseModal();
  const navigate = useNavigate();
  const location = useLocation();

  const showAuthWarning = () => {
    dispatch(
      setModal({
        component: ModalList.AUTH_WARNING,
        componentProps: { action },
        isLoading: false,
        isOpen: true,
        title: 'Authentication Warning',
        footerContent: {
          closeButtonContent: 'Cancel',
          submitButtonContent: 'Okay',
          submitButtonHandle: () => {
            navigate('/login', { state: { prevPath: location.pathname } });
            dispatch(clearModal());
          },
          closeButtonHandle: closeModalHandle,
        },
        closeHandle: closeModalHandle,
      }),
    );
  };
  return showAuthWarning;
};

export default useAuthWarning;
