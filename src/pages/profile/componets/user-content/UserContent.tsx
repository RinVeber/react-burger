import React from "react";
import styles from "./style.module.scss";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../../../services/store";
import { sendChangeUserInfoRequestAction } from "../../../../services/actions/actions";
import { useForm } from "../../../../utils/hooks/useForm";
import { IUserInfo } from "../../../../services/entities/authApi";
import { getUserInfo } from "../../../../services/slices/authSlice";

export function UserContent() {
  const userInfo = useAppSelector(getUserInfo);
  const dispatch = useAppDispatch();
  const { values, setValues, handleChange } = useForm<IUserInfo>({
    name: "",
    email: "",
    password: "",
  });
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passRef = React.useRef<HTMLInputElement>(null);

  const [nameFieldState, setNameFieldState] = React.useState(true);
  const [emailFieldState, setEmailFieldState] = React.useState(true);
  const [passFieldState, setPassFieldState] = React.useState(true);

  const [isProfileEditing, setProfileEditing] = React.useState(false);

  React.useEffect(() => {
    userInfo && setValues(userInfo);
  }, [userInfo]);

  const onNameEditIconClick = (e: React.MouseEvent) => {
    setProfileEditing(true);
    setNameFieldState(false);
    setTimeout(() => nameRef.current && nameRef.current.focus(), 0);
    setEmailFieldState(true);
    setPassFieldState(true);
  };

  const onEmailIconClick = (e: React.MouseEvent) => {
    setProfileEditing(true);
    setEmailFieldState(false);
    setTimeout(() => emailRef.current && emailRef.current.focus(), 0);
    setNameFieldState(true);
    setPassFieldState(true);
  };

  const onPassIconClick = (e: React.MouseEvent) => {
    setProfileEditing(true);
    setPassFieldState(false);
    setTimeout(() => passRef.current && passRef.current.focus(), 0);
    setNameFieldState(true);
    setEmailFieldState(true);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      sendChangeUserInfoRequestAction({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    );
    stopEditoring();
  };

  const cancelEdit = () => {
    stopEditoring();
  };

  const stopEditoring = () => {
    if (userInfo) {
      setValues(userInfo);
    }
    setProfileEditing(false);
    setPassFieldState(true);
    setNameFieldState(true);
    setEmailFieldState(true);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Input
        type={"text"}
        placeholder={"Ваше имя"}
        onChange={(e) => handleChange(e)}
        value={values.name}
        error={false}
        name={"name"}
        errorText={"Ошибка. Проверьте корректность ввода имени"}
        icon={"EditIcon"}
        onIconClick={onNameEditIconClick}
        ref={nameRef}
        disabled={nameFieldState}
      />
      <Input
        type={'email'}
        onChange={(e) => handleChange(e)}
        value={values.email}
        name={"email"}
        errorText={"Ошибка. проверьте правильность почты"}
        placeholder={"Ваша почта"}
        icon={"EditIcon"}
        onIconClick={onEmailIconClick}
        ref={emailRef}
        disabled={emailFieldState}
      
      />
      <Input
        type="password"
        onChange={(e) => handleChange(e)}
        value={values.password || ''}
        name={"password"}
        errorText={"Ошибка. Введите другой пароль"}
        icon={"EditIcon"}
        placeholder={"Ваш пароль"}
        ref={passRef}
        onIconClick={onPassIconClick}
        disabled={passFieldState}
      />
      {isProfileEditing && (
        <div className={styles.handlers}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={cancelEdit}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}
