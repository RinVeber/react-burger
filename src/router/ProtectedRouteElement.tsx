import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import store, { useAppDispatch, useAppSelector } from "../services/store";
import { sendUserInfoRequestAction } from "../services/actions/actions";
import React from "react";

interface Props {
  isAuth: boolean;
  page: JSX.Element;
}

export const loaderSendUserInfo = async () => {
  return await store.dispatch(sendUserInfoRequestAction());
};

export function ProtectedRouteElement({ isAuth, page }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { userInfoSuccess } = useAppSelector((store) => store.auth);

  React.useEffect(() => {
    if (!userInfoSuccess) {
      dispatch(sendUserInfoRequestAction());
    }
  }, [userInfoSuccess]);

  if (isAuth === true && userInfoSuccess === false) {
    navigate("/login", { replace: true });
  }

  const protectedPathsForNotAuthUser = ["/login", "/register"];

  if (
    userInfoSuccess &&
    protectedPathsForNotAuthUser.includes(location.pathname)
  ) {
    navigate(-1);
  }

  return page;
}
