import React from 'react';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import style from './style.module.scss';
import {IDataItem} from '../../utils/data';
import {Outlet, useOutletContext} from 'react-router-dom';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import store, {useAppSelector} from '../../services/store';
import { getAllIngredientsAction } from '../../services/actions/actions';

export interface PropsContext {
  data: IDataItem[];
}

interface Props {
  children?: React.ReactNode;
}

export const loaderIngredientsFull = async () => {
  const {payload} = await store.dispatch(getAllIngredientsAction());

  return payload;
};

export default function MainLayout({children}: Props) {
  const {ingredients, status, selectedIngredient} = useAppSelector(
    (store) => store.data,
  );

  return (
    <main className={style.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
        {children && children}
      </DndProvider>
    </main>
  );
}
