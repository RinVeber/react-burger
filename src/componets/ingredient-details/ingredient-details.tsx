import style from "./style.module.scss";
import React from "react";
import { useAppSelector } from "../../services/store";

export default function IngredientDetails() {
  const { selectedIngredient } = useAppSelector((store) => store.data);
  return (
    <React.Fragment>
      <div className={style.figure}>
        <img
          className={style.image}
          src={selectedIngredient?.image}
          alt={selectedIngredient?.name}
        />
      </div>
      <p className="text text_type_main-medium mt-4 mb-8">
        {selectedIngredient?.name}
      </p>
      <ul className={`${style.list} mb-5`}>
        <li className={style.item}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {selectedIngredient?.calories}
          </p>
        </li>
        <li className={style.item}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {selectedIngredient?.proteins}
          </p>
        </li>
        <li className={style.item}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {selectedIngredient?.fat}
          </p>
        </li>
        <li className={style.item}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {selectedIngredient?.carbohydrates}
          </p>
        </li>
      </ul>
    </React.Fragment>
  );
}
