import React from "react";
import AppHeader from "../app-header/app-header";
import { Outlet, useLoaderData } from "react-router-dom";
import store, { useAppSelector } from "../services/store";
import { getAllIngredientsAction } from "../services/actions/actions";

export const loaderIngredientsFull = async () => {
  const { payload } = await store.dispatch(getAllIngredientsAction());

  return payload;
};

export function App() {
  const { status } = useAppSelector((store) => store.data);

  return (
    <React.Fragment>
      <AppHeader />
      {status === "success" && <Outlet />}
    </React.Fragment>
  );
}
