import style from "./style.module.scss";
import { IDataItem } from "../../utils/data";
import IngredientCategory from "./ingredient-category/ingredient-category";
import { getIngredientCards } from "../../utils/helper-function/getCard";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { currentRow } from "./ingredient-item/helper";
import { getCurrentIngredientAction, toggleIngredientsTabAction } from "../../services/slices/dataSlice";
import { TabStatus } from "../burger-ingredients/burger-ingredients";

interface Props {

  bunsRef: React.RefObject<HTMLDivElement>;
  saucesRef: React.RefObject<HTMLDivElement>;
  mainsRef: React.RefObject<HTMLDivElement>;
}

const findElement = (
  target: EventTarget & HTMLDivElement,
  items: IDataItem[]
) => {
  return items.find((item) => item._id === target.id);
};

export default function Ingredients({
  bunsRef,
  saucesRef,
  mainsRef,
}: Props) {
  const dispatch = useAppDispatch();
  const { ingredients, ingredientsCurrentTab } = useAppSelector((store) => store.data);

  const openIngredientPop = (e: any) => {
    dispatch(getCurrentIngredientAction(findElement(e.currentTarget, ingredients)));
  };
  const separatedData = getIngredientCards(ingredients, openIngredientPop);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const newRow = currentRow(e.currentTarget);
    newRow && newRow !== ingredientsCurrentTab && dispatch(toggleIngredientsTabAction(newRow));
  };
  return (
    <div
      className={`${style.rowsContainer} mt-10`}
      onScroll={(e) => scrollHandler(e)}
    >
      <IngredientCategory title="Булки" refTab={bunsRef} id={TabStatus.buns}>
        {separatedData.buns}
      </IngredientCategory>
      <IngredientCategory title="Соусы" refTab={saucesRef} id={TabStatus.sauces}>
        {separatedData.sauces}
      </IngredientCategory>
      <IngredientCategory title="Начинки" refTab={mainsRef} id={TabStatus.mains}>
        {separatedData.mains}
      </IngredientCategory>
    </div>
  );
}
