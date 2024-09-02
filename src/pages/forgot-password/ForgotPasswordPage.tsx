import styles from "./style.module.scss";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { paths } from "../../router/paths";
import { sendEmailAction } from "../../services/actions/actions";

export function ForgotPasswordPage() {
  const [emailValue, setEmailValue] = React.useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { forgotPassMessage, forgotPassSuccess } = useAppSelector(
    (store) => store.auth
  );

  React.useEffect(() => {
    console.log(forgotPassMessage);
    if (forgotPassMessage && forgotPassSuccess) {
      navigate(`${paths.resetPassword}`, { replace: true });
    }
  }, [forgotPassMessage, forgotPassSuccess, navigate]);

  const handleForSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailValue) {
      dispatch(sendEmailAction({ email: emailValue }));
    } else return;
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleForSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <EmailInput
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="Укажите e-mail "
          value={emailValue}
          name={"email"}
          isIcon={false}
          // errorText={'Введена не правильная почта'}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
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
