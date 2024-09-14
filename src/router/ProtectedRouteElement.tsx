import { useLocation, useNavigate } from "react-router-dom";
import store, { useAppDispatch, useAppSelector } from "../services/store";
import { sendUserInfoRequestAction } from "../services/actions/actions";
import React from "react";
import { paths } from "./paths";

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

  React.useEffect(() => {
    if (!userInfoSuccess) {
      dispatch(sendUserInfoRequestAction());
    }
  }, [userInfoSuccess]);

  React.useEffect(() => {
    if (isAuth && userInfoSuccess === false) {
      navigate(paths.login, { replace: true, state: { from: location } });
    }

    if (isNotForAuthorized && isAuth) {
      navigate(-1);
    }
  }, [isAuth, userInfoSuccess, isNotForAuthorized, navigate, location]);

  if (isUserInfoLoading) {
    return <div>Loading...</div>;
  }

  return page;
}
