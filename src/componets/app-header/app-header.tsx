import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./style.module.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import { paths } from "../../router/paths";

const styleForHeaderWrapper = {
  width: "calc(var(--offset-base-size) * 320)",
  marginLeft: "auto",
  marginRight: "auto",
};

function AppHeader() {
  const location = useLocation();
  const userInfo = useAppSelector((store) => store.auth.userInfo);

  const setIconType = (url: string) =>
    location.pathname === url ? "primary" : "secondary";
  const setLinkStyle = (url: string) =>
    location.pathname === url
      ? `${styles.link} pt-4 pb-4 pr-5 pl-5 text text_type_main-default ${styles.link_active}`
      : `${styles.link} pt-4 pb-4 pr-5 pl-5 text text_type_main-default`;

  return (
    <header className={`${styles.appHeader} pt-4 pb-4`}>
      <div className={styles.wrapper} style={styleForHeaderWrapper}>
        <ul className={styles.navigationBar}>
          <li className={`${styles.navigationLink} p-5`}>
            <NavLink className={setLinkStyle(paths.main)} to={paths.main}>
              <BurgerIcon type={setIconType(paths.main)} />

              <span
                className={`${styles.navigationText} text text_type_main-default ml-2`}
              >
                Конструктор
              </span>
            </NavLink>
          </li>
          <li className={`${styles.navigationLink} p-5`}>
            <NavLink
              className={setLinkStyle(paths.orderHistory)}
              to={paths.orderHistory}
            >
              <ListIcon type={setIconType(paths.orderHistory)} />
              <span
                className={`${styles.navigationText} text text_type_main-default ml-2`}
              >
                Лента заказов
              </span>
            </NavLink>
          </li>
        </ul>

        <Link to={paths.main} className={styles.logoWrapper}>
          <Logo />
        </Link>

        <ul className={styles.navigationBar}>
          <li className={`${styles.navigationLink} p-5`}>
            <NavLink className={setLinkStyle(paths.profile)} to={paths.profile}>
              <ProfileIcon type={setIconType(paths.profile)} />
              <span className={`ml-2 ${styles.linkText}`}>
                {userInfo?.name || "Личный кабинет"}
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default AppHeader;
