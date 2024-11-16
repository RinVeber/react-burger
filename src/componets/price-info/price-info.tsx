import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./style.module.scss";
import Modal from "../ui/modal/modal";
import OrderDetails from "../order-details/order-details";
import React from "react";
import { useModal } from "../../utils/hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { clearConstructorAction } from "../../services/slices/constructorSlice";
import { sendOrderAction } from "../../services/actions/actions";
import { useNavigate } from "react-router-dom";
import { paths } from "../../router/paths";

export default function PriceInfo() {
  const dispatch = useAppDispatch();
  const { selectedBun, selectedIngredients } = useAppSelector(
    (store) => store.burgerConstructor,
  );

  const { userInfo } = useAppSelector((store) => store.auth);
  const navigate = useNavigate();

  const fullOrder = React.useMemo(() => {
    const fullArray = [...selectedIngredients];
    if (selectedBun) {
      fullArray.unshift(selectedBun);
    }
    return fullArray;
  }, [selectedBun, selectedIngredients]);

  const orderClick = () => {
    if (userInfo) {
      const dataIds = fullOrder.map((item) => item._id);
      dispatch(sendOrderAction({ ingredients: dataIds }));
      openModal();
    } else {
      navigate(paths.login, { replace: true });
    }
  };

  const sum = React.useMemo(() => {
    return fullOrder.reduce(
      (acc, currentItem) =>
        currentItem.type === "bun"
          ? acc + currentItem.price * 2
          : acc + currentItem.price,
      0,
    );
  }, [fullOrder]);

  const { isModalOpen, closeModal, openModal } = useModal();

  const removeOrder = () => {
    dispatch(clearConstructorAction());
    closeModal();
  };

  return (
    <React.Fragment>
      <div className={`${style.handlers} mt-10`}>
        <div className={`${style.price} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
        data-testid="button-order"
          type="primary"
          size="large"
          htmlType="button"
          onClick={orderClick}
          disabled={selectedIngredients.length < 3}
        >
          Оформить заказ
        </Button>
      </div>

      {isModalOpen && (
        <Modal onClose={removeOrder}>
          <OrderDetails />
        </Modal>
      )}
    </React.Fragment>
  );
}
