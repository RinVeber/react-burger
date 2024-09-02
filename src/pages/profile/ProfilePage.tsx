import { Outlet } from "react-router-dom";
import { NavigationBar } from "./componets/navigation-bar/NavigationBar";
import styles from "./style.module.scss";

export function ProfilePage() {
  return (
    <main className={styles.main}>
      <NavigationBar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </main>
  );
}
