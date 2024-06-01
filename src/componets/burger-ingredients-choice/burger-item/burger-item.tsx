import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./style.module.scss";
import { IDataItem, IngredientPropType } from "../../../utils/data";

interface Props {
  item: IDataItem;
  position?: "top" | "bottom";
  isVisibility: boolean;
}

export default function BurgerItem({ item, position, isVisibility }: Props) {
  return (
    <li className={style.item}>
      <div
        className={`${
          isVisibility ? style.dragIcon_visible : style.dragIcon_hidden
        } mr-2`}
      >
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        type={position}
        isLocked={position !== "top" && position !== "bottom"}
        text={
          item.name +
          (position === "top" ? " (верх)" : "") +
          (position === "bottom" ? " (низ)" : "")
        }
        price={item.price}
        thumbnail={item.image}
      />
    </li>
  );
}

BurgerItem.propTypes = {
  item: IngredientPropType.isRequired,
  position: PropTypes.string.isRequired,
  isVisibility: PropTypes.bool.isRequired,
};
