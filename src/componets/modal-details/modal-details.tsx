import style from "./style.module.scss";
import doneIcon from "../../images/done.gif";
import React from "react";

export default function ModalDetails() {
  const mockOrderData = "034536";

  return (
    <React.Fragment>
      <p className={`${style.number} text text_type_digits-large mt-4`}>
        {mockOrderData}
      </p>
      <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
      <img className="mt-15" src={doneIcon} alt="Галочка." />
      <p className={`text text_type_main-default mt-15`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`text text_type_main-default text_color_inactive mt-2 mb-20`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </React.Fragment>
  );
}
