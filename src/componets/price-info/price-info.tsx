import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./style.module.scss";
import { IDataItem, IngredientPropType } from "../../utils/data";
import WrapperModal from "../ui/modal/modal";
import ModalDetails from "../modal-details/modal-details";
import React from "react";

type NonNullableDataItem = NonNullable<IDataItem>;

interface PriceInfoProps {
  data: NonNullableDataItem[];
}

export default function PriceInfo({ data }: PriceInfoProps) {
  const sum =
    data && data.reduce((prev: any, next: any) => prev + next.price, 0);
  const [isOrderVisible, setOrderVisibility] = React.useState(false);

  const openModal = () => setOrderVisibility(!isOrderVisible);

  return (
    <React.Fragment>
      <div className={`${style.handlers} mt-10`}>
        <div className={`${style.price} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          htmlType="button"
          onClick={openModal}
        >
          Оформить заказ
        </Button>
      </div>

      {isOrderVisible && (
        <WrapperModal onClose={openModal}>
          <ModalDetails />
        </WrapperModal>
      )}
    </React.Fragment>
  );
}

PriceInfo.propTypes = {
  data: PropTypes.arrayOf(IngredientPropType.isRequired),
};
