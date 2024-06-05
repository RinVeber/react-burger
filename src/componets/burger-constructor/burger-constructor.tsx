import { IDataItem } from "../../utils/data";
import BurgerIngredientsChoice from "../burger-ingredients-choice/burger-ingredients-choice";
import PriceInfo from "../price-info/price-info";
import { mockChoices } from "./mockIngredient";
import style from "./style.module.scss";

interface Props {
  data: IDataItem[],
}

export default function BurgerConstructor({data}: Props) {
  return (
    <div className={`pt-25 ${style.constructor}`}>
      <BurgerIngredientsChoice data={mockChoices as IDataItem[]} />
      <PriceInfo data={mockChoices as IDataItem[]}/>
    </div>
  );
}
