import styles from "./style.module.scss";
import React from "react";
import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { paths } from "../../router/paths";
import { useLoginMutation } from "../../services/entities/authApi";
import { setUserAction } from "../../services/slices/authSlice";
import { useForm } from "../../utils/hooks/useForm";

interface FormProps {
  password: string;
  email: string;
}

export function LoginPage() {
  const { loginFail, isLoginSuccess } = useAppSelector((store) => store.auth);

  const { values, handleChange } = useForm<FormProps>({
    password: "",
    email: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginUser, _] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email && values.password) {
      try {
        const response = await loginUser({
          email: values.email,
          password: values.password,
        }).unwrap();
        if (response.success) {
          dispatch(
            setUserAction({
              userInfo: response.userInfo,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
              success: response.success,
            }),
          );
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  React.useEffect(() => {
    if (isLoginSuccess) {
      navigate(`${paths.main}`, { replace: true });
    }
  }, [isLoginSuccess]);

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput
          onChange={(e) => handleChange(e)}
          value={values.email}
          name={"email"}
          isIcon={false}
          errorText={"Введена не корректная почта"}
        />
        <PasswordInput
          onChange={(e) => handleChange(e)}
          value={values.password}
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
