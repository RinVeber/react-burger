import React from "react";
import { IDataItem } from "../../utils/data";
import Ingredients from "../ingredients/ingredients";
import style from "./style.module.scss";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../ui/modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useModal } from "../../utils/hooks/useModal";

enum TabStatus {
  sauces = "sauces",
  mains = "mains",
  buns = "buns",
}

export interface Props {
  data: IDataItem[];
}

export default function BurgerIngredients({ data }: Props) {
  const [current, setCurrent] = React.useState<string>(TabStatus.buns);
  const [currentIngredient, setCurrentIngredient] = React.useState(null);

  const openIngredientPop = (e: any) =>
    setCurrentIngredient(e.currentTarget.id);
  const closeIngredientPop = (e: any) => setCurrentIngredient(null);

  return (
    <React.Fragment>
      <div className={style.ingredientsList}>
        <h2 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h2>
        <div className={style.tabs}>
          <Tab
            value={TabStatus.buns}
            active={current === TabStatus.buns}
            onClick={setCurrent}
          >
            Булки
          </Tab>
          <Tab
            value={TabStatus.sauces}
            active={current === TabStatus.sauces}
            onClick={setCurrent}
          >
            Соусы
          </Tab>
          <Tab
            value={TabStatus.mains}
            active={current === TabStatus.mains}
            onClick={setCurrent}
          >
            Начинки
          </Tab>
        </div>

        <Ingredients data={data} onOpen={openIngredientPop} />
      </div>
      {currentIngredient && (
        <Modal header="Детали ингредиента" onClose={closeIngredientPop}>
          <IngredientDetails id={currentIngredient} data={data} />
        </Modal>
      )}
    </React.Fragment>
  );
}
