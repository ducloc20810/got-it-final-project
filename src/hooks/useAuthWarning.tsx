import { useLocation, useNavigate } from 'react-router-dom';
import { useCloseModal, useTypedDispatch } from 'hooks';
import { ModalList } from 'constants/modal';
import { clearModal, setModal } from 'redux/actions/modal.action';

const useAuthWarning = () => {
  const dispatch = useTypedDispatch();
  const closeModalHandle = useCloseModal();
  const navigate = useNavigate();
  const location = useLocation();

  const showAuthWarning = (
    action: string,
    actionType?: 'edit' | 'create' | 'delete',
    id?: number | string,
  ) => {
    const pathName = location.pathname;
    let hashString = '';
    const queryString = location.search;
    if (actionType && id) {
      hashString = `#action=${actionType}&id=${id}`;
    }
    if (actionType && !id) {
      hashString = `#action=${actionType}`;
    }

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
            navigate('/login', {
              state: { prevPath: `${pathName}${queryString}${hashString}` },
            });
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
