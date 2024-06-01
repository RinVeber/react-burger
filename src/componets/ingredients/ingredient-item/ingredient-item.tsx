import style from "./style.module.scss";
import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface Props {
name: string,
price: number,
image: string,
openId: string,
onOpen: () => void
}
export default function IngredientItem({ name, price, image, onOpen, openId }: Props) {
  return (
    <li className={style.item} onClick={onOpen} id={openId}>
      <Counter count={1} size="default" />
      <img className={`ml-4 mr-4`} src={image} alt={name} />
      <div className={style.price}>
        <p className="text text_type_digits-default mr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>

      <p className="text text_type_main-medium">{name}</p>
    </li>
  );
}

IngredientItem.propTypes = {
  openId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
};
