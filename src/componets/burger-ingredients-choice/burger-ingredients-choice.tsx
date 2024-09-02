import style from "./style.module.scss";
import BurgerItem from "./burger-item/burger-item";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { DefaultBun, findElement, getRandom } from "./helper";
import {
  addIngredientAction,
  sortIngredientsAction,
} from "../../services/slices/constructorSlice";
import { IDataItem } from "../../utils/data";

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
      const target = {
        ...findElement(item, ingredients),
        index: getRandom(),
      } as IDataItem;
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
      />
      <ul className={style.secondaryList}>
        {selectedIngredients.length > 0 &&
          selectedIngredients.map((item, index) => (
            <BurgerItem
              key={item.uniqueId}
              item={item}
              isVisibility={true}
              index={index}
              moveListItem={moveListItem}
            />
          ))}
      </ul>
      <BurgerItem
        item={selectedBun ? selectedBun : DefaultBun}
        position="bottom"
        isVisibility={false}
      />
    </ul>
  );
}

export default BurgerIngredientsChoice;
