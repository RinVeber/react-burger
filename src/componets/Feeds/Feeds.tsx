import {ReactNode} from 'react';
import {useLocation} from 'react-router-dom';
import {useAppSelector} from '../../services/store';
import OrderCard from '../OrderCard/OrderCard';
import styles from './styles.module.scss';
import {Preloader} from '../Preloader/Preloader';

interface Props {
  children?: ReactNode;
}

export default function Feeds({children}: Props) {
  const location = useLocation();
  const state = location.state;

  const items = useAppSelector((store) => store.data.ingredients);
  const orders = useAppSelector((store) => store.feed.orders);

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

  const ordersMap = sortedOrders.map((order) => {
    const ingredientsPictures = order?.ingredients?.map((ingredient) => {
      return {
        image:
          items.filter((storeItem) => storeItem._id === ingredient)[0]?.image,
        _id: ingredient,
      };
    });

    if (!ingredientsPictures) {
      return null;
    }

    if (ingredientsPictures.some((item) => item.image === '')) {
      return null;
    }
    const totalPrice = order?.ingredients
      ?.map(
        (ingredient) =>
          items.filter((storeItem) => storeItem._id === ingredient)[0].price,
      )
      .reduce((acc, current) => {
        return acc + current;
      }, 0);

    if (!totalPrice) {
      return null;
    }

    return (
      <OrderCard
        date={order.createdAt}
        number={order.number}
        name={order.name}
        ingredientsPictures={ingredientsPictures}
        price={totalPrice}
        state={state}
        key={order.number}
        location={location}
      ></OrderCard>
    );
  });

  return (
    <div className={styles.feeds}>
      <h2 className="text text_type_main-large mt-10 mb-5">Лента заказов</h2>
      <ul className={`${styles.feeds__list} mt-10`}>{ordersMap}</ul>
      {children && children}
    </div>
  );
}
