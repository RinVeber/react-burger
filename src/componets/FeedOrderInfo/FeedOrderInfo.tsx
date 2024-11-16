import React from 'react';
import {useAppDispatch, useAppSelector} from '../../services/store';
import {useParams} from 'react-router-dom';
import {getOrderDataAction} from '../../services/actions/actions';
import {getStatusText, IDataItem, ORDER_STATUSES} from '../../utils/data';
import styles from './styles.module.scss';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {Preloader} from '../Preloader/Preloader';

export function getUniqArrayItems(arr: (IDataItem | undefined)[]) {
  return Array.from(new Set(arr));
}

export function countIngedientsInOrder(
  id: string,
  array: (IDataItem | undefined)[],
) {
  return array.filter((item) => item?._id === id).length;
}

export default function FeedOrderInfo() {
  const dispatch = useAppDispatch();
  const orderNum = useParams();
  const items = useAppSelector((store) => store.data.ingredients);
  const orders = useAppSelector((store) => store.socket.orders);
  const currentOrderDetails = useAppSelector(
    (store) => store.order.currentOrderDetails,
  );
  const statusAction = useAppSelector((store) => store.order.status);

  React.useEffect(() => {
    if (!orders.length && orderNum && !currentOrderDetails) {
      dispatch(getOrderDataAction({number: orderNum.id!}));
    }
  }, [orders, orderNum]);

  if (statusAction !== 'success') {
    return <Preloader />;
  }

  const openedOrderData = currentOrderDetails;

  const orderIngredients = openedOrderData?.ingredients.map((ingredient) =>
    items.find((storeItem) => storeItem._id === ingredient),
  );
  const totalOrderPrice = orderIngredients?.reduce(
    (acc, current) => acc + (current?.price ?? 0),
    0,
  );

  const statusText = getStatusText(openedOrderData?.status);

  const statusStyles = {
    default: `${styles.status} text text_type_main-small mb-15`,
    done: `${styles.status} text text_type_main-small mb-15 ${styles.status_done}`,
    cancelled: `${styles.status} text text_type_main-small mb-15 ${styles.status_cancelled}`,
  };

  return openedOrderData ? (
    <div className={styles.container} data-testid='modal-feed-order'>
      <p className={`${styles.ordernum} text text_type_digits-default mb-10`}>
        {openedOrderData.number}
      </p>
      <h1 className={`${styles.name} text text_type_main-medium mb-3`}>
        {openedOrderData.name}
      </h1>
      <p
        className={
          openedOrderData.status === ORDER_STATUSES.done
            ? statusStyles.done
            : openedOrderData.status === ORDER_STATUSES.canselled
              ? statusStyles.cancelled
              : statusStyles.default
        }
      >
        {statusText}
      </p>
      <h2 className={`${styles.title} text text_type_main-medium mb-6`}>
        Состав:
      </h2>
      <ul className={`${styles.ingredients} mb-10`}>
        {orderIngredients &&
          getUniqArrayItems(orderIngredients).map((item) => {
            return (
              item && (
                <li key={item._id} className={styles.item}>
                  <div className={styles.iconbox}>
                    <img
                      className={styles.ingricon}
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <p
                    className={`${styles.ingrname} text text_type_main-default`}
                  >
                    {item.name}
                  </p>
                  <div className={styles.pricebox}>
                    <p
                      className={`${styles.price} text text_type_digits-default`}
                    >
                      {countIngedientsInOrder(item._id, orderIngredients)} x{' '}
                      {item.price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              )
            );
          })}
      </ul>
      <div className={styles.orderfooter}>
        <FormattedDate
          className={`${styles.datetext} text text_type_main-default text_color_inactive`}
          date={new Date(openedOrderData.createdAt)}
        />
        <div className={styles.pricebox}>
          <p className={`${styles.price} text text_type_digits-default`}>
            {totalOrderPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  ) : null;
}
