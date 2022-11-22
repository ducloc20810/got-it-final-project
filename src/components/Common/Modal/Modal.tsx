import React, { useRef } from "react";
import { Modal as AhaModal } from "@ahaui/react";
import { useAppSelector } from "hooks";
import { modalSelector } from "redux/reducers/modal.reducer";
import styles from "./Modal.module.scss";
import classNames from "classnames";
const Modal = () => {
  const state = useAppSelector(modalSelector);
  const buttonsRef = useRef<HTMLDivElement>();

  return state.isOpen ? (
    <div
      className={classNames(
        styles.modalContainer,
        "u-positionLeft u-positionRight u-positionTop u-positionBottom "
      )}
    >
      <div
        className={classNames(
          styles.modalLayout,
          "u-positionFixed u-widthFull u-heightFull"
        )}
      ></div>

      <form>
        <AhaModal
          size="medium"
          relative
          className="abcd"
          style={{
            zIndex: "999",
            position: "fixed",
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
          <AhaModal.Body>
            <div className="u-textCenter">{state.Children}</div>
          </AhaModal.Body>
          <AhaModal.Footer ref={buttonsRef}>
            {state.CloseButton}
            {state.SubmitButton}
          </AhaModal.Footer>
        </AhaModal>
      </form>
    </div>
  ) : null;
};

export default Modal;
