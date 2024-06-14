import style from "./style.module.scss";
import BurgerItem from "./burger-item/burger-item";
import React from "react";
import { useAppDispatch, useAppSelector } from "../services/store";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { DefaultBun, findElement, getRandom } from "./helper";
import {
  addIngredientAction,
  sortIngredientsAction,
} from "../services/constructorSlice";

function BurgerIngredientsChoice() {
  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector((store) => store.data);
  const { selectedIngredients, selectedBun } = useAppSelector(
    (store) => store.burgerConstructor
  );

  const [_, drop] = useDrop({
    accept: "ingredient",
    collect: (
      monitor: DropTargetMonitor<{ openId: string; type: string }, unknown>
    ) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      const target = { ...findElement(item, ingredients), index: getRandom() };
      dispatch(addIngredientAction(target));
    },
  });

  const moveListItem = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(
        sortIngredientsAction({
          componentsArray: [...selectedIngredients],
          dragIndex: dragIndex,
          hoverIndex: hoverIndex,
        })
      );
    },
    [dispatch, selectedIngredients]
  );

  return (
    <ul className={style.primaryList} ref={drop}>
      <BurgerItem
        item={selectedBun ? selectedBun : DefaultBun}
        position="top"
        isVisibility={false}
        key={selectedBun ? selectedBun._id : getRandom()}
      />
      <ul className={style.secondaryList}>
        {selectedIngredients.length > 0 &&
          selectedIngredients.map((item, index) => (
            <BurgerItem
              item={item}
              isVisibility={true}
              key={item._id + index}
              index={index}
              moveListItem={moveListItem}
            />
          ))}
      </ul>
      <BurgerItem
        item={selectedBun ? selectedBun : DefaultBun}
        position="bottom"
        isVisibility={false}
        key={selectedBun && selectedBun._id + getRandom()}
      />
    </ul>
  );
}

export default BurgerIngredientsChoice;
