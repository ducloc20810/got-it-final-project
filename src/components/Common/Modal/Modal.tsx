import { Button, Modal as AhaModal } from '@ahaui/react';
import { useAppSelector } from 'hooks';
import { modalSelector } from 'redux/reducers/modal.reducer';
import classNames from 'classnames';
import styles from './Modal.module.scss';

function Modal() {
  const state = useAppSelector(modalSelector);

  return (
    <div
      className={classNames(
        styles.modalContainer,
        'u-positionLeft u-positionRight u-positionTop u-positionBottom ',
        state.isOpen ? styles.modalOpen : styles.modalClose,
      )}
    >
      <div
        className={classNames(
          styles.modalLayout,
          'u-positionFixed u-widthFull u-heightFull',
        )}
      />

      <AhaModal
        size="medium"
        relative
        style={{
          zIndex: '999',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        centered
      >
        <AhaModal.Header
          closeButton
          onHide={() => {
            state.closeHandle();
          }}
        >
          <AhaModal.Title>{state.title}</AhaModal.Title>
        </AhaModal.Header>
        <AhaModal.Body className="u-paddingNone">
          <div className="u-textCenter">{state.children}</div>
        </AhaModal.Body>
        {state.footer === undefined ? (
          <AhaModal.Footer>
            <Button variant="secondary" width="full">
              Cancel
            </Button>
            <Button variant="primary" width="full">
              Ok, Got It!
            </Button>
          </AhaModal.Footer>
        ) : state.footer}
      </AhaModal>
    </div>
  );
}

export default Modal;
