import React from "react";
import styles from "./style.module.scss";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { paths } from "../../router/paths";
import { useRegisterMutation } from "../../services/entities/authApi";

export default function RegisterPage() {
  const [nameValue, setNameValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const location = useLocation()

  const [registerUser, _] = useRegisterMutation();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nameValue && emailValue && passwordValue) {
      registerUser({
        email: emailValue,
        name: nameValue,
        password: passwordValue,
      });
    }
  }

  return (
    <main className={styles.main}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form} data-testid="auth-form-register">
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
        data-testid="auth-input-name"
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setNameValue(e.target.value)}
          value={nameValue}
          name={"name"}
          errorText={"Введите корректное имя пользователя"}
        />
        <EmailInput
          data-testid="auth-input-email"
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
          name={"email"}
          isIcon={false}
          // errorText={"Проверьте правильность почты"}
        />
        <PasswordInput
          data-testid="auth-input-password"
          onChange={(e) => setPasswordValue(e.target.value)}
          value={passwordValue}
          name={"password"}
          // errorText={"Введите другой пароль"}
        />
        <Button htmlType="submit" type="primary" size="medium" data-testid='button-submit-register'>
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.actions}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегситрированы?&nbsp;
          <Link to={paths.login} className={styles.actions__link}  state={{from: location}}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}
