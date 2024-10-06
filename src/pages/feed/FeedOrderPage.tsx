import React from 'react';
import styles from './style.module.scss';
import FeedOrderInfo from '../../componets/FeedOrderInfo/FeedOrderInfo';
import {useAppSelector} from '../../services/store';
import {Preloader} from '../../componets/Preloader/Preloader';

export default function FeedOrderPage() {
  const isSuccess = useAppSelector((state) => state.data.success);

  if (!isSuccess) {
    return <Preloader />;
  }

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <FeedOrderInfo />
      </section>
    </main>
  );
}
