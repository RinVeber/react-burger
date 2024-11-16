import { ReactNode } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import style from "./style.module.scss";

interface Props {
  close?: () => void;
  children: ReactNode;
}

export default function ModalHeader({ close, children }: Props) {
  return (
    <div className={style.header} data-testid='modal-header'>
      <p className={`${style.title} text text_type_main-large`}>{children}</p>
      <div className={`${style.closeBox}`}>
        <CloseIcon type="primary" onClick={close} />
      </div>
    </div>
  );
}
