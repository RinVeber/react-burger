import ReactDOM from "react-dom";
import React, { ReactNode, useEffect } from "react";
import style from "./style.module.scss";
import PropTypes from "prop-types";
import ModalHeader from "./modal-header/modal-header";

interface PropsModal {
  children?: ReactNode;
  header?: ReactNode;
  onClose: (e?: any) => void;
}

const modalRoot = document.getElementById("modalRoot") as
  | Element
  | DocumentFragment;

function WrapperModal({ children, header, onClose }: PropsModal) {
  useEffect(() => {
    const keyClose = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", keyClose);
    return () => {
      document.removeEventListener("keydown", keyClose);
    };
  }, [onClose]);

  const ModalOverlay = ({ close }: { close: () => void }): JSX.Element => {
    return <div className={style.overlay} onClick={close}></div>;
  };

  return ReactDOM.createPortal(
    <React.Fragment>
      <div className={`${style.modal} p-10`}>
        <ModalHeader close={onClose}>{header}</ModalHeader>
        {children}
      </div>
      <ModalOverlay close={onClose} />
    </React.Fragment>,
    modalRoot
  );
}

WrapperModal.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default WrapperModal;
