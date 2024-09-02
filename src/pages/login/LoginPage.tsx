import styles from "./style.module.scss";
import React from "react";
import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { paths } from "../../router/paths";
import { useLoginMutation } from "../../services/entities/authApi";
import { setUserAction } from "../../services/slices/authSlice";

export function LoginPage() {
  const { loginFail, isLoginSuccess } = useAppSelector((store) => store.auth);
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginUser, _] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailValue && passwordValue) {
      try {
        const response = await loginUser({
          email: emailValue,
          password: passwordValue,
        }).unwrap();
        if (response.success) {
          dispatch(
            setUserAction({
              userInfo: response.userInfo,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
              success: response.success,
            })
          );
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  React.useEffect(() => {
    if (isLoginSuccess) {
      debugger;
      navigate(`${paths.main}`, { replace: true });
    }
  }, [isLoginSuccess]);

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
          name={"email"}
          isIcon={false}
        />
        <PasswordInput
          onChange={(e) => setPasswordValue(e.target.value)}
          value={passwordValue}
          name={"password"}
        />
        {loginFail && (
          <p className="text text_type_main-default" style={{ color: "red" }}>
            Ошибка входа. Проверьте логин или пароль.
          </p>
        )}
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className={styles.actions}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?&nbsp;
          <Link to={paths.register} className={styles.actions__link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?&nbsp;
          <Link to="/forgot-password" className={styles.actions__link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </main>
  );
}
