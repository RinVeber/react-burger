import style from "./style.module.scss";

export const ModalOverlay = ({ close }: { close: () => void }): JSX.Element => {
  return <div className={style.overlay} onClick={close}></div>;
};
