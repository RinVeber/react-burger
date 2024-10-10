import { useAppSelector } from '../../services/store';
import { ORDER_STATUSES } from '../../utils/data';
import styles from './styles.module.scss'

export default function FeedsSumm() {
  const { total, totalToday, orders } = useAppSelector((store) => store.feed);
  const readyOrders = orders?.map(
    (order) =>
      order.status === ORDER_STATUSES.done && (
        <li
          className={`${styles.orderscol__num} ${styles.orderscol__num_ready} text_type_digits-default`}
          key={order.number}
        >
          {order.number}
        </li>
      )
  );
  const pendingOrders = orders?.map(
    (order) =>
      (order.status === ORDER_STATUSES.pending || order.status === ORDER_STATUSES.created) && (
        <li className={`${styles.orderscol__num} text_type_digits-default`} key={order.number}>
          {order.number}
        </li>
      )
  );
  return (
    <div className={`${styles.summary} mt-10`}>
      <div className={styles.summary__orders}>
        <div className={styles.orderscol}>
          <p className={`${styles.orderscol__title} text text_type_main-medium`}>Готовы:</p>
          <ul className={styles.orderscol__list}>{readyOrders}</ul>
        </div>
        <div className={styles.orderscol}>
          <p className={`${styles.orderscol__title} text text_type_main-medium`}>В работе:</p>
          <ul className={styles.orderscol__list}>{pendingOrders}</ul>
        </div>
      </div>
      <div className={styles.summary__statwidget}>
        <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
        <p className={`${styles.statdigits} text text_type_digits-large`}>{total}</p>
      </div>
      <div className={styles.summary__statwidget}>
        <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
        <p className={`${styles.statdigits} text text_type_digits-large`}>{totalToday}</p>
      </div>
    </div>
  );
}
