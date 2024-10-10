import styles from "./style.module.scss";
export function Preloader() {
  return (
    <div className={styles.preloader}>
      <h1 className={`text text_type_main-large`}>Загрузка...</h1>
    </div>
  );
}
