import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import store, {useAppDispatch, useAppSelector} from '../services/store';
import {sendUserInfoRequestAction} from '../services/actions/actions';
import React from 'react';
import {paths} from './paths';

interface Props {
  page: JSX.Element;
  isNotForAuthorized?: boolean;
}

interface IOnlyUnAuth {
  page: JSX.Element;
}

export const loaderSendUserInfo = async () => {
  return await store.dispatch(sendUserInfoRequestAction());
};

export function ProtectedRouteElement({
  page,
  isNotForAuthorized = false,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const userInfoSuccess = useAppSelector((store) => store.auth.userInfoSuccess);
  React.useEffect(() => {
    if (!userInfoSuccess) {
      dispatch(sendUserInfoRequestAction());
    }
  }, [userInfoSuccess]);

  const from = location.state?.from || '/';


  if (isNotForAuthorized && userInfoSuccess) {
    return <Navigate to={from} />;
  }

  if (!isNotForAuthorized && userInfoSuccess == false) {
    return (
      <Navigate to={paths.login} />
    );
  }

  return page;
}


export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ page }: IOnlyUnAuth): JSX.Element => (
  <ProtectedRouteElement isNotForAuthorized={true} page={page} />
);