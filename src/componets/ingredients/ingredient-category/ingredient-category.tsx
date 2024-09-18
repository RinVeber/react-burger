import { ReactNode } from "react";
import style from "./style.module.scss";

interface Props {
  title: string;
  children: ReactNode;
  refTab: React.RefObject<HTMLDivElement>;
  id: string;
}

export default function IngredientCategory({
  title,
  children,
  refTab,
  id,
}: Props) {
  return (
    <div ref={refTab} className={`${style.row} row mt-10`} id={id}>
      <h3 className={`text text_type_main-medium`}>{title}</h3>
      <ul className={`${style.list} mt-6 pl-4 pr-4`}>{children}</ul>
    </div>
  );
}
