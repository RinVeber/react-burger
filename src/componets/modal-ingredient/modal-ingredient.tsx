import style from "./style.module.scss";
import PropTypes from "prop-types";
import { IDataItem, IngredientPropType } from "../../utils/data";
import React from "react";

interface Props {
  id: number | string;
  data: IDataItem[];
}

export default function ModalIngredient({ id, data }: Props) {
  const item = data && data.find((el) => el._id === id);
  return (
    <React.Fragment>
      <div className={style.figure}>
        <img className={style.image} src={item?.image} alt={item?.name} />
      </div>
      <p className="text text_type_main-medium mt-4 mb-8">{item?.name}</p>
      <ul className={`${style.list} mb-5`}>
        <li className={style.item}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {item?.calories}
          </p>
        </li>
        <li className={style.item}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {item?.proteins}
          </p>
        </li>
        <li className={style.item}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {item?.fat}
          </p>
        </li>
        <li className={style.item}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {item?.carbohydrates}
          </p>
        </li>
      </ul>
    </React.Fragment>
  );
}

ModalIngredient.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(IngredientPropType).isRequired,
};
