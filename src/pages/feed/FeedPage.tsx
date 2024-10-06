import React, { ReactNode } from 'react';
import {useAppDispatch, useAppSelector} from '../../services/store';
import {FeedWsConnect, FeedWsDisconnect} from '../../services/actions/feeds';
import styles from './style.module.scss';
import {WS_LINK} from '../../utils/data';
import FeedsSumm from '../../componets/FeedSumm/FeedSumm';
import Feeds from '../../componets/Feeds/Feeds';
import {Preloader} from '../../componets/Preloader/Preloader';

interface Props {
    children?: ReactNode;
}

export function FeedPage({children}: Props) {
  const dispatch = useAppDispatch();
  const isSuccess = useAppSelector((store) => store.feed.isSuccess);
  React.useEffect(() => {
    dispatch(FeedWsConnect(`${WS_LINK}/all`));

    return () => {
      dispatch(FeedWsDisconnect());
    };
  }, [dispatch]);

  if (!isSuccess) {
    return <Preloader />;
  }

  return (
    <main>
      <section className={styles.feed}>
        <Feeds />
        <FeedsSumm />
        {children && children}
      </section>
    </main>
  );
}
