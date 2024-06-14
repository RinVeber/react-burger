import React from "react";
import AppHeader from "../app-header/app-header";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../services/store";
import { getAllIngredientsAction } from "../services/dataSlice";

export function App() {
  const { ingredients, status } = useAppSelector((store) => store.data);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllIngredientsAction());
  }, []);

  return (
    <React.Fragment>
      <AppHeader />
      {status === "success" && <Outlet />}
    </React.Fragment>
  );
}
