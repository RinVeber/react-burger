import { Outlet, useLocation, useNavigate } from "react-router-dom";
import store, { useAppSelector } from "../services/store";
import { sendUserInfoRequestAction } from "../services/actions/actions";
import React from "react";

interface Props {
  isAuth: boolean;
}

export const loaderSendUserInfo = async () => {
  return await store.dispatch(sendUserInfoRequestAction());
};

export function ProtectedRouteElement({ isAuth }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfoSuccess } = useAppSelector((store) => store.auth);

  if (isAuth === true && userInfoSuccess === false) {
    navigate("/login", { replace: true });
  }

  const protectedPathsForNotAuthUser = ["/login", "/register"];

  React.useEffect(() => {
    if (
      userInfoSuccess &&
      protectedPathsForNotAuthUser.includes(location.pathname)
    ) {
      navigate(-1);
    }
  }, [userInfoSuccess, location.pathname]);

  return <Outlet />;
}
