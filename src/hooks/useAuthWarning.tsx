import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Modal } from '@ahaui/react';
import { useCloseModal, useTypedDispatch } from 'hooks';
import { clearModal, setModal } from 'redux/actions/modal.action';
import { AuthWarning } from 'components/Common';

const useAuthWarning = (action:string) => {
  const dispatch = useTypedDispatch();
  const closeModalHandle = useCloseModal();
  const navigate = useNavigate();
  const location = useLocation();

  const showAuthWarning = () => {
    dispatch(
      setModal({
        children: <AuthWarning action={action} />,
        isLoading: false,
        isOpen: true,
        title: 'Authentication Warning',
        footer: (
          <Modal.Footer>
            <Button variant="secondary" width="full" onClick={() => closeModalHandle()}>
              Cancel
            </Button>
            <Button
              variant="primary"
              width="full"
              onClick={() => {
                navigate('/login', { state: { prevPath: location.pathname } });
                dispatch(clearModal());
              }}
            >
              Okay
            </Button>
          </Modal.Footer>
        ),
        closeHandle: closeModalHandle,
      }),
    );
  };
  return showAuthWarning;
};

export default useAuthWarning;
