import React from "react";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import style from "./style.module.scss";
import { IDataItem } from "../../utils/data";
import GetIngredientsApi from "../../utils/helper-function/checkResponse";
import { useOutletContext } from "react-router-dom";

export const ingredientLoader = async () => {
  const req = await GetIngredientsApi()
    .then((res) => {
      console.log("ok");
    })
    .catch((e) => console.log(e));

  return req;
};

export interface PropsContext {
  data: IDataItem[];
}

export default function MainLayout() {
  const context = useOutletContext() as PropsContext;
  const { data } = context;

  return (
    <main className={style.main}>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data} />
    </main>
  );
}
