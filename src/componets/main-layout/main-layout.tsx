import React from "react";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import style from "./style.module.scss";
import { IDataItem } from "../../utils/data";
import { useOutletContext } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppSelector } from "../../services/store";

export interface PropsContext {
  data: IDataItem[];
}

export default function MainLayout() {
  const { ingredients, status } = useAppSelector((store) => store.data);

  const data = useAppSelector((store) => store.authApi);
  console.log('data', data)

  return (
    <main className={style.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
}
