import BurgerIngredientsChoice from "../burger-ingredients-choice/burger-ingredients-choice";
import PriceInfo from "../price-info/price-info";
import style from "./style.module.scss";

export default function BurgerConstructor() {
  return (
    <div data-testid="burger-constructor"  className={`pt-25 ${style.constructor}`}>
      <BurgerIngredientsChoice />
      <PriceInfo />
    </div>
  );
}
