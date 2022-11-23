import React from "react";
import { Button, Modal as AhaModal } from "@ahaui/react";
import { useAppSelector } from "hooks";
import { modalSelector } from "redux/reducers/modal.reducer";
import styles from "./Modal.module.scss";
import classNames from "classnames";
const Modal = () => {
  const state = useAppSelector(modalSelector);

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
        ) : (
          state.footer
        )}
      </AhaModal>
    </div>
  ) : null;
};

export default Modal;
