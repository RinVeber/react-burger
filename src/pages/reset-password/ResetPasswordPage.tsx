import styles from "./style.module.scss";
import { useState } from "react";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { paths } from "../../router/paths";
import { sendResetPassRequestAction } from "../../services/actions/actions";

export function ResetPasswordPage() {
  const { forgotPassSuccess, resetPassSuccess, resetPassMessage } = useAppSelector((store) => store.auth);
  const [codeValue, setCodeValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordValue && codeValue) {
      dispatch(sendResetPassRequestAction({password: passwordValue, code: codeValue}));
    }
  };

  console.log(resetPassSuccess)

  return !forgotPassSuccess ? (
    <Navigate to={paths.forgotPassword} replace />
  ) : (
    <main className={styles.main}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput
          onChange={(e) => setPasswordValue(e.target.value)}
          placeholder={"Введите новый пароль"}
          value={passwordValue}
          name={"password"}
          //   errorText={"Ошибка. Введите другой пароль"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(e) => setCodeValue(e.target.value)}
          value={codeValue}
          name={"code"}
          errorText={"Ошибка. код введен неверно"}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
          {resetPassMessage && <span className={styles.errorText}>{resetPassMessage}</span>}
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <div className={styles.actions}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?&nbsp;
          <Link to={paths.login} className={styles.actions__link}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}
