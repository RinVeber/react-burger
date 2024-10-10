import styles from './styles.module.scss';
import ingredientsImagesMap from './helpers';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {getStatusText, ORDER_STATUSES} from '../../utils/data';
import {Link, Location} from 'react-router-dom';
import {useAppDispatch} from '../../services/store';
import {getOrderDataAction} from '../../services/actions/actions';

export interface IOrderCard {
  date: string | Date;
  number: number | string;
  ingredientsPictures: {
    _id: string;
    image: string;
  }[];
  name: string;
  price: number;
  status?: string;
  state: {
    from: Location;
  };
  location: Location;
}

export default function OrderCard({
  date,
  number,
  name,
  ingredientsPictures,
  price,
  state,
  location,
  status,
}: IOrderCard) {
  state = {...state, from: location};

  const dispatch = useAppDispatch();

  const getLinkAdress = () => {
    return location.pathname.startsWith('/feed')
      ? `/feed/${number}`
      : `/profile/orders/${number}`;
  };

  const images = ingredientsImagesMap(ingredientsPictures);
  const statusStyles = {
    default: `${styles.card__status} text text_type_main-small mt-2`,
    done: `${styles.card__status} text text_type_main-small mt-2 ${styles.card__status_done}`,
    cancelled: `${styles.card__status} text text_type_main-small mt-2 ${styles.card__status_canselled}`,
  };

  function handleLoadOrderDetails() {
    dispatch(getOrderDataAction({number: `${number}`}));
  }

  return (
    <li className={`${styles.feeds__card} mr-2`}>
      <Link
        to={getLinkAdress()}
        className={styles.card}
        state={state}
        onClick={() => handleLoadOrderDetails()}
      >
        <div className={styles.card__header}>
          <p className={`text text_type_digits-default`}>{number}</p>
          <FormattedDate
            className={`text text_type_main-default text_color_inactive`}
            date={new Date(date)}
          />
        </div>
        <p className={`text text_type_main-medium mt-6`}>{name}</p>
        {status ? (
          <p
            className={
              status === ORDER_STATUSES.done
                ? statusStyles.done
                : status === ORDER_STATUSES.canselled
                  ? statusStyles.cancelled
                  : statusStyles.default
            }
          >
            {getStatusText(status)}
          </p>
        ) : (
          <></>
        )}
        <div className={`${styles.card__total} mt-6`}>
          <ul className={styles.card__ingredients}>{images.slice(0, 3)}</ul>
          <div className={styles.card__pricebox}>
            <p className={`text text_type_digits-default`}>{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
}
