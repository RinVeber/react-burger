import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./style.module.scss";
import { IngredientPropType } from "../../utils/data";
import Modal from "../ui/modal/modal";
import OrderDetails from "../order-details/order-details";
import React from "react";
import { useModal } from "../../utils/hooks/useModal";


export default function PriceInfo({ data }: any) {
  const sum =
    data && data.reduce((prev: any, next: any) => prev + next.price, 0);

  const { isModalOpen, openModal, closeModal } = useModal();

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

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </React.Fragment>
  );
}

PriceInfo.propTypes = {
  data: PropTypes.arrayOf(IngredientPropType.isRequired),
};
