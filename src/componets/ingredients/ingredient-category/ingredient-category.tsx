import { ReactNode } from "react";
import style from "./style.module.scss";
import PropTypes from "prop-types";

interface Props {
  title: string,
  children: ReactNode;
}

export default function IngredientCategory({ title, children }: Props) {
  return (
    <div className={`${style.row} row mt-10`}>
      <h3 className={`text text_type_main-medium`}>{title}</h3>
      <ul className={`${style.list} mt-6 pl-4 pr-4`}>{children}</ul>
    </div>
  );
}

IngredientCategory.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};