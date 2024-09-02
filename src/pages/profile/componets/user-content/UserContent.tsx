import React from "react";
import styles from "./style.module.scss";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../services/store";
import {
  sendChangeUserInfoRequestAction,
} from "../../../../services/actions/actions";

export function UserContent() {
  const { userInfo } = useAppSelector((store) => store.auth);

  const dispatch = useAppDispatch();
  const [nameValue, setNameValue] = React.useState(userInfo?.name || 'Your name');
  const [emailValue, setEmailValue] = React.useState(userInfo?.email || 'test@mailmail.ru');
  const [passwordValue, setPasswordValue] = React.useState("test123");
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passRef = React.useRef<HTMLInputElement>(null);

  const [nameFieldState, setNameFieldState] = React.useState(true);
  const [emailFieldState, setEmailFieldState] = React.useState(true);
  const [passFieldState, setPassFieldState] = React.useState(true);

  const [isProfileEditing, setProfileEditing] = React.useState(false);


  const setData = (userInfo: any) => {
    setNameValue(userInfo.name);
    setEmailValue(userInfo.email);
    setPasswordValue(userInfo.password);
  };

  React.useEffect(() => {
    if (userInfo) {
      setData(userInfo);
    }
  }, []);

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
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      })
    );
    stopEditoring();
  };

  const cancelEdit = () => {
    stopEditoring();
  };

  const stopEditoring = () => {
    setData(userInfo);
    setProfileEditing(false);
    setPassFieldState(true);
    setNameFieldState(true);
    setEmailFieldState(true);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => setNameValue(e.target.value)}
        value={nameValue}
        error={false}
        name={"name"}
        errorText={"Ошибка. Проверьте корректность ввода имени"}
        icon={"EditIcon"}
        onIconClick={onNameEditIconClick}
        ref={nameRef}
        disabled={nameFieldState}
        onPointerEnterCapture={false}
        onPointerLeaveCapture={false}
      />
      <Input
        onChange={(e) => setEmailValue(e.target.value)}
        value={emailValue}
        name={"email"}
        errorText={"Ошибка. проверьте правильность почты"}
        placeholder={"Логин"}
        icon={"EditIcon"}
        onIconClick={onEmailIconClick}
        ref={emailRef}
        disabled={emailFieldState}
        onPointerEnterCapture={false}
        onPointerLeaveCapture={false}
      />
      <Input
        type="password"
        onChange={(e) => setPasswordValue(e.target.value)}
        value={passwordValue}
        name={"password"}
        errorText={"Ошибка. Введите другой пароль"}
        icon={"EditIcon"}
        placeholder={"Пароль"}
        ref={passRef}
        onIconClick={onPassIconClick}
        disabled={passFieldState}
        onPointerEnterCapture={false}
        onPointerLeaveCapture={false}
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
