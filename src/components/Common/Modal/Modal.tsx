import { useEffect, useRef } from 'react';
import { Button, Modal as AhaModal } from '@ahaui/react';
import classNames from 'classnames';
import { modalSelector } from 'redux/reducers/modal';
import { ModalLookUp } from 'constants/modal';
import { useAppSelector } from 'hooks';
import styles from './Modal.module.scss';

function Modal() {
  const state = useAppSelector(modalSelector);
  const ModalContent = state.component ? ModalLookUp[state.component] : null;
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        state.closeHandle();
        return;
      }

      if (submitButtonRef.current && event.key === 'Enter') {
        submitButtonRef.current.click();
      }
    };

    if (state.isOpen) {
      window.addEventListener('keyup', handleKeyPress);
    }

    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, [state]);

  return (
    <div
      className={classNames(
        styles.modalContainer,
        'u-positionLeft u-positionRight u-positionTop u-positionBottom ',
        state.isOpen ? styles.modalOpen : styles.modalClose,
      )}
    >
      <div className={classNames(styles.modalLayout, 'u-positionFixed u-widthFull u-heightFull')} />

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
          <div className="u-textCenter">
            {ModalContent ? <ModalContent {...state.componentProps} /> : null}
          </div>
        </AhaModal.Body>

        {state.footerContent && (
          <AhaModal.Footer>
            <Button
              variant="secondary"
              width="full"
              onClick={state.footerContent.closeButtonHandle}

            >
              {state.footerContent.closeButtonContent}
            </Button>
            <Button
              variant="primary"
              width="full"
              disabled={state.isLoading}
              onClick={state.footerContent.submitButtonHandle}
              ref={submitButtonRef}
            >
              {state.isLoading ? 'Loading...' : state.footerContent.submitButtonContent}
            </Button>
          </AhaModal.Footer>
        )}

      </AhaModal>
    </div>
  );
}

export default Modal;
