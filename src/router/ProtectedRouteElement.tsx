import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../services/store";
import { sendUserInfoRequestAction } from "../services/actions/actions";

interface Props {
  isAuth: boolean;
}

export function ProtectedRouteElement({ isAuth }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    dispatch(sendUserInfoRequestAction());
  }, []);
  const { userInfoSuccess } = useAppSelector((store) => store.auth);

  if (isAuth === true && userInfoSuccess === false) {
    return <Navigate to={"/login"} replace />;
  }

  const protectedPaths = ["/login", "/register"];

  console.log("check", protectedPaths.includes(location.pathname));

  if (
    userInfoSuccess === true &&
    protectedPaths.includes(location.pathname)
  ) {
    navigate("/", { replace: true });
  }

  return <Outlet />;
}
