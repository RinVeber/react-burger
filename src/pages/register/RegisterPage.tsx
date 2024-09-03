import React from "react";
import styles from "./style.module.scss";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { paths } from "../../router/paths";
import { useRegisterMutation } from "../../services/entities/authApi";

export default function RegisterPage() {
  const [nameValue, setNameValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");

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
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setNameValue(e.target.value)}
          value={nameValue}
          name={"name"}
          errorText={"Введите корректное имя пользователя"}
        />
        <EmailInput
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
          name={"email"}
          isIcon={false}
          errorText={"Проверьте правильность почты"}
        />
        <PasswordInput
          onChange={(e) => setPasswordValue(e.target.value)}
          value={passwordValue}
          name={"password"}
          // errorText={"Введите другой пароль"}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.actions}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегситрированы?&nbsp;
          <Link to={paths.login} className={styles.actions__link}>
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}
