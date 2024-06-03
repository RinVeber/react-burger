import PropTypes from "prop-types";
import style from "./style.module.scss";
import BurgerItem from "./burger-item/burger-item";
import { IDataItem, IngredientPropType } from "../../utils/data";
import React from "react";

interface Props {
  data: IDataItem[]
}

function BurgerIngredientsChoice({ data }: Props) {
  let first;
  let last;
  const components: JSX.Element[] = [];
  data.forEach((element: IDataItem, index: number, arr: any) => {
    switch (index) {
      case 0:
        first = (
          <BurgerItem
            item={element}
            position="top"
            isVisibility={false}
            key={element._id + index}
          />
        );
        break;
      case arr.length - 1:
        last = (
          <BurgerItem
            item={element}
            position="bottom"
            isVisibility={false}
            key={element._id + index}
          />
        );
        break;
      default:
        components.push(
          <BurgerItem
            item={element}
            isVisibility={true}
            key={element._id + index}
          />
        );
    }
  });
  return (
    <ul className={style.primaryList}>
      {first}
      <ul className={style.secondaryList}>{components}</ul>
      {last}
    </ul>
  );
}

export default React.memo(BurgerIngredientsChoice)
