import {Outlet, useLocation} from 'react-router-dom';
import {NavigationBar} from './componets/navigation-bar/NavigationBar';
import styles from './style.module.scss';
import {useAppDispatch} from '../../services/store';
import React, {ReactNode} from 'react';
import {getCookie} from '../../utils/helper-function/cockie';
import {WS_LINK} from '../../utils/data';
import {OrderWsConnect, OrderWsDisconnect} from '../../services/actions/order';

interface Props {
  children?: ReactNode;
}

export function ProfilePage({children}: Props) {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const token = getCookie('accessToken')!.split(' ')[1];
    dispatch(OrderWsConnect(`${WS_LINK}?token=${token}`));

    return () => {
      dispatch(OrderWsDisconnect());
    };
  }, [dispatch]);


  return (
    <main className={styles.main} data-testid="page-profile">
      <NavigationBar />
      <div className={styles.content}>
        <Outlet />
      </div>
      {children && children}
    </main>
  );
}
