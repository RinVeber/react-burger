import PropTypes from "prop-types";
import style from "./style.module.scss";

import { IDataItem, IngredientPropType, PropsData } from "../../utils/data";
import IngredientCategory from "./ingredient-category/ingredient-category";
import { getIngredientCards } from "../../utils/helper-function/getCard";

export interface Props {
  data: IDataItem[];
  onOpen: any;
}

export default function Ingredients({ data, onOpen }: Props) {
  const separatedData = getIngredientCards(data, onOpen);
  return (
    <div className={`${style.rowsContainer} mt-10`}>
      <IngredientCategory title="Булки">{separatedData.buns}</IngredientCategory>
      <IngredientCategory title="Соусы">{separatedData.sauces}</IngredientCategory>
      <IngredientCategory title="Начинки">{separatedData.mains}</IngredientCategory>
    </div>
  );
}

Ingredients.propTypes = {
  data: PropTypes.arrayOf(IngredientPropType).isRequired,
};


