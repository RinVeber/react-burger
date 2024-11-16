import ReactDOM from "react-dom";
import React, { ReactNode, useEffect } from "react";
import style from "./style.module.scss";
import ModalHeader from "./modal-header/modal-header";
import { ModalOverlay } from "./modal-overlay/modal-overlay";

interface PropsModal {
  children?: ReactNode;
  header?: ReactNode;
  onClose?: () => void;
}

const modalRoot = document.getElementById("modalRoot") as
  | Element
  | DocumentFragment;

function Modal({ children, header, onClose }: PropsModal) {
  useEffect(() => {
    const keyClose = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    document.addEventListener("keydown", keyClose);
    return () => {
      document.removeEventListener("keydown", keyClose);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <React.Fragment>
      <div className={`${style.modal} p-10`} data-testid='modal'>
        <ModalHeader close={onClose}>{header}</ModalHeader>
     <div data-testid='modal-body' className={style.modalBody}>
        {children}
        </div>
      </div>
      <ModalOverlay close={onClose} />
    </React.Fragment>,
    modalRoot,
  );
}

export default Modal;
