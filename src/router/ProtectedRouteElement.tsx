import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import store, {useAppDispatch, useAppSelector} from '../services/store';
import {sendUserInfoRequestAction} from '../services/actions/actions';
import React from 'react';
import {paths} from './paths';
import { Preloader } from '../componets/Preloader/Preloader';

interface Props {
  isAuth: boolean;
  page: JSX.Element;
  isNotForAuthorized: boolean;
}

export const loaderSendUserInfo = async () => {
  return await store.dispatch(sendUserInfoRequestAction());
};

export function ProtectedRouteElement({
  isAuth,
  page,
  isNotForAuthorized,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const userInfoSuccess = useAppSelector((store) => store.auth.userInfoSuccess);
  const isUserInfoLoading = useAppSelector(
    (store) => store.auth.isUserInfoLoading,
  );

  const from = location.state?.from || '/';
  React.useEffect(() => {
    if (!userInfoSuccess) {
      dispatch(sendUserInfoRequestAction());
    }
  }, [userInfoSuccess]);

  if (userInfoSuccess && isNotForAuthorized) {
    return <Navigate to={from} />;
  }

  if (isAuth && userInfoSuccess === false) {
    return (
      <Navigate to={paths.login} replace={true} state={{from: location}} />
    );
  }

  if (isUserInfoLoading) {
    return <Preloader />
  }

  return page;
}
