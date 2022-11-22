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
        className="u-marginTopMedium"
        relative
        style={{
          zIndex: "999",
          marginTop: "25%",
          marginLeft: "25%",
        }}
      >
        <AhaModal.Header closeButton>
          <AhaModal.Title>{state.title}</AhaModal.Title>
        </AhaModal.Header>
        <AhaModal.Body>
          <div className="u-textCenter">{state.children}</div>
        </AhaModal.Body>
        <AhaModal.Footer>
          <Button
            variant="secondary"
            width="full"
            onClick={() => state.closeHandle()}
          >
            state.closeButtonContent
          </Button>
          <Button
            variant="primary"
            width="full"
            onClick={() => state.submitHandle()}
          >
            state.submitButtonContent
          </Button>
        </AhaModal.Footer>
      </AhaModal>
    </div>
  ) : null;
};

export default Modal;
