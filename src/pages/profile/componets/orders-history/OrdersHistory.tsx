import {useLocation} from 'react-router-dom';
import styles from './style.module.scss';
import {useAppSelector} from '../../../../services/store';
import OrderCard from '../../../../componets/OrderCard/OrderCard';
import {Preloader} from '../../../../componets/Preloader/Preloader';


export function OrderHistory() {
  const location = useLocation();
  const state = location.state;
  const items = useAppSelector((store) => store.data.ingredients);
  const orders = useAppSelector((store) => store.socket.orders);

  if (!orders) {
    return <Preloader />;
  }

  const sortedOrders = orders
    ? [...orders].sort((a, b) => {
        return (
          new Date(b.createdAt).getMilliseconds() -
          new Date(a.createdAt).getMilliseconds()
        );
      })
    : [];

  const getOrdersMap = sortedOrders.map((order, index) => {
    const ingredientsPictures = order.ingredients.map((ingredient) => {
      return {
        image: items.filter((storeItem) => storeItem._id === ingredient)[0]
          .image,
        _id: ingredient,
      };
    });

    const totalPrice = order.ingredients
      .map(
        (ingredient) =>
          items.filter((storeItem) => storeItem._id === ingredient)[0].price,
      )
      .reduce((acc, current) => {
        return acc + current;
      }, 0);

    return (
      <OrderCard
        date={order.createdAt}
        number={order.number.toString()}
        name={order.name}
        status={order.status}
        ingredientsPictures={ingredientsPictures}
        price={totalPrice}
        state={state}
        location={location}
        key={order._id + index}
      />
    );
  });

  return (
    <section className={styles.main}>
      <h2 className={styles.title}>Лента заказов</h2>
      <ul className={`${styles.orders__list} mt-10`}>{getOrdersMap}</ul>
    </section>
  );
}
