import { NavLink, useLocation } from "react-router-dom";
import styles from "./style.module.scss";
import { cleanTokenCookies, getCookie } from "../../../../utils/helper-function/cockie";
import { sendLogoutRequestAction } from "../../../../services/actions/actions";
import { useAppDispatch } from "../../../../services/store";
import { paths } from "../../../../router/paths";
import { useLogoutMutation } from "../../../../services/entities/authApi";
import { clearUserAction } from "../../../../services/slices/authSlice";

export function NavigationBar() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [logoutUser, _] = useLogoutMutation();
  const logout = async () => {
    try {
      await logoutUser({ token: getCookie("refreshToken") }).unwrap();
      cleanTokenCookies(["accessToken", "refreshToken"]);
      dispatch(clearUserAction())
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const setLinkStyle = (url: string) =>
    location.pathname === url
      ? `${styles.link} text text_type_main-medium ${styles.link_active}`
      : `${styles.link} text text_type_main-medium`;

  return (
    <aside className={styles.navbar}>
      <nav>
        <ul className={`${styles.links}`}>
          <li className={styles.links__item}>
            <NavLink className={setLinkStyle("/profile")} to={`/profile`}>
              Профиль
            </NavLink>
          </li>
          <li className={`${styles.links__item} text text_type_main-medium`}>
            <NavLink className={setLinkStyle("/profile/orders")} to={"/profile/orders"}>
              История заказов
            </NavLink>
          </li>
          <li className={styles.links__item}>
            <NavLink className={`${styles.link} text text_type_main-medium`} to={paths.main} onClick={logout}>
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={`mt-20 text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
    </aside>
  );
}
