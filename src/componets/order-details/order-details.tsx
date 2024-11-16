import style from './style.module.scss';
import doneIcon from '../../images/done.gif';
import React from 'react';
import {useAppSelector} from '../../services/store';

export default function OrderDetails() {
  const {orderDetails, orderNumber} = useAppSelector(
    (store) => store.burgerConstructor,
  );
  return (
    <div data-testid="modal-order" className={style.modalContent}>
      <p
        className={`${style.number} text text_type_digits-large mt-4`}
        data-testid="order-number"
      >
        {orderNumber}
      </p>
      <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
      <img className="mt-15" src={doneIcon} alt="Галочка." />
      <p className={` ${style.name} text text_type_main-default mt-15`}>
        Ваш заказ "{orderDetails?.name}" начали готовить
      </p>
      <p
        className={`text text_type_main-default text_color_inactive mt-2 mb-20`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
