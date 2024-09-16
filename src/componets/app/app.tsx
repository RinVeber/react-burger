import React from 'react';
import AppHeader from '../app-header/app-header';
import {Outlet} from 'react-router-dom';
import store from '../../services/store';
import {getAllIngredientsAction} from '../../services/actions/actions';

export const loaderIngredientsFull = async () => {
  const {payload} = await store.dispatch(getAllIngredientsAction());

  return payload;
};

export function App() {
  return (
    <React.Fragment>
      <AppHeader />
      <Outlet />
    </React.Fragment>
  );
}
