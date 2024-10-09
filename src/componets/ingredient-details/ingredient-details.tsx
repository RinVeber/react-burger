import style from './style.module.scss';
import React from 'react';
import {useAppSelector} from '../../services/store';
import {useParams} from 'react-router-dom';

export default function IngredientDetails() {
  const {selectedIngredient} = useAppSelector((store) => store.data);
  const items = useAppSelector((store) => store.data.ingredients);
  const {id} = useParams();

  const selectIngredient = selectedIngredient
    ? selectedIngredient
    : items.find((item) => item._id === id);
  return (
    <React.Fragment>
      <div className={style.figure}>
        <img
          className={style.image}
          src={selectIngredient?.image}
          alt={selectIngredient?.name}
        />
      </div>
      <p className="text text_type_main-medium mt-4 mb-8">
        {selectIngredient?.name}
      </p>
      <ul className={`${style.list} mb-5`}>
        <li className={style.item}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {selectIngredient?.calories}
          </p>
        </li>
        <li className={style.item}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {selectIngredient?.proteins}
          </p>
        </li>
        <li className={style.item}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {selectIngredient?.fat}
          </p>
        </li>
        <li className={style.item}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {selectIngredient?.carbohydrates}
          </p>
        </li>
      </ul>
    </React.Fragment>
  );
}
