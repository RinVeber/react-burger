import React from "react";
import Ingredients from "../ingredients/ingredients";
import style from "./style.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../ui/modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {
  removeCurrentIngredientAction,
  toggleIngredientsTabAction,
} from "../../services/slices/dataSlice";
import { useAppDispatch, useAppSelector } from "../../services/store";

export enum TabStatus {
  sauces = "sauce",
  mains = "main",
  buns = "bun",
}

export default function BurgerIngredients() {
  const dispatch = useAppDispatch();
  const { selectedIngredient, ingredientsCurrentTab, isModal } = useAppSelector(
    (store) => store.data,
  );

  const bunsRef = React.useRef<HTMLDivElement>(null);
  const saucesRef = React.useRef<HTMLDivElement>(null);
  const mainsRef = React.useRef<HTMLDivElement>(null);

  const scrollTo = (scrollRef: React.RefObject<HTMLDivElement>): void => {
    return scrollRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

  const handleClick = (element: string) => {
    switch (element) {
      case TabStatus.buns:
        dispatch(toggleIngredientsTabAction(TabStatus.buns));
        scrollTo(bunsRef);
        break;
      case TabStatus.sauces:
        dispatch(toggleIngredientsTabAction(TabStatus.sauces));
        scrollTo(saucesRef);
        break;
      case TabStatus.mains:
        dispatch(toggleIngredientsTabAction(TabStatus.mains));
        scrollTo(mainsRef);
        break;
      default:
        break;
    }
  };


  return (
    <React.Fragment>
      <div className={style.ingredientsList} data-testid="burger-ingredients" >
        <h2 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h2>
        <div className={style.tabs}>
          <Tab
            value={TabStatus.buns}
            active={ingredientsCurrentTab === TabStatus.buns}
            onClick={(e) => handleClick(e)}
          >
            Булки
          </Tab>
          <Tab
            value={TabStatus.sauces}
            active={ingredientsCurrentTab === TabStatus.sauces}
            onClick={handleClick}
          >
            Соусы
          </Tab>
          <Tab
            value={TabStatus.mains}
            active={ingredientsCurrentTab === TabStatus.mains}
            onClick={handleClick}
          >
            Начинки
          </Tab>
        </div>

        <Ingredients
          bunsRef={bunsRef}
          saucesRef={saucesRef}
          mainsRef={mainsRef}
        />
      </div>
    </React.Fragment>
  );
}
