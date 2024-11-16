import style from './style.module.scss';
import React from 'react';
import {useAppSelector} from '../../services/store';
import {useParams} from 'react-router-dom';
import {IDataItem, INGRSTATS} from '../../utils/data';

export default function IngredientDetails() {
  const {selectedIngredient} = useAppSelector((store) => store.data);
  const items = useAppSelector((store) => store.data.ingredients);
  const {id} = useParams();

  const selectIngredient = selectedIngredient
    ? selectedIngredient
    : items.find((item) => item._id === id);
  return (
    <React.Fragment>
      <div className={style.figure} data-testid='modal-ingredient-details'>
        <img
          className={style.image}
          src={selectIngredient?.image}
          alt={selectIngredient?.name}
        />
      </div>
      <p className="text text_type_main-medium mt-4 mb-8"  data-testid='modal-ingredient-details-name'>
        {selectIngredient?.name}
      </p>
      <ul className={`${style.list} mb-5`}>
        {Object.entries(INGRSTATS).map(([key, name]) => {
          return (
            <li key={key} className={style.item}>
              <div className="text text_type_main-default text_color_inactive">
                {name}
              </div>

              <div className="text text_type_digits-default text_color_inactive mt-2">
                {selectIngredient?.[key as keyof IDataItem]}
              </div>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
}
