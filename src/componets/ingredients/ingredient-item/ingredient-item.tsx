import style from "./style.module.scss";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../../services/store";
import React from "react";
import { useDrag } from "react-dnd";

interface Props {
  name: string;
  price: number;
  image: string;
  onOpen: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  openId: string;
  type: string;
  index: string;
}

export default function IngredientItem({
  name,
  price,
  image,
  onOpen,
  openId,
  type,
  index,
}: Props) {
  const { selectedIngredients, selectedBun } = useAppSelector(
    (store) => store.burgerConstructor,
  );
  const count = React.useMemo(() => {
    if (type === "bun" && selectedBun) {
      return selectedBun._id === openId ? 1 : 0;
    } else {
      return selectedIngredients.reduce(
        (acc, item) => (item._id === openId ? ++acc : acc),
        0,
      );
    }
  }, [openId, selectedIngredients, selectedBun]);

  const [{ isDrag }, drag] = useDrag({
    type: "ingredient",
    item: { openId, type },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <li
      ref={drag}
      className={style.item}
      onClick={(e) => onOpen(e)}
      id={openId}
      style={isDrag ? { opacity: 0.5 } : { opacity: 1 }}
    >
      <Counter count={count} size="default" />
      <img className={`ml-4 mr-4`} src={image} alt={name} />
      <div className={style.price}>
        <p className="text text_type_digits-default mr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>

      <p className="text text_type_main-medium">{name}</p>
    </li>
  );
}
