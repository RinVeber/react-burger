import { createBrowserRouter } from "react-router-dom";
import { App, loaderIngredientsFull } from "../componets/app/app";
import MainLayout from "../componets/main-layout/main-layout";
import { paths } from "./paths";
import RegisterPage from "../pages/register/RegisterPage";
import { LoginPage } from "../pages/login/LoginPage";
import { ForgotPasswordPage } from "../pages/forgot-password/ForgotPasswordPage";
import { ResetPasswordPage } from "../pages/reset-password/ResetPasswordPage";
import { ProfilePage } from "../pages/profile/ProfilePage";
import { UserContent } from "../pages/profile/componets/user-content/UserContent";
import { OrderHistory } from "../pages/profile/componets/orders-history/OrdersHistory";
import {
  ProtectedRouteElement,
} from "./ProtectedRouteElement";
import { IngredientPage } from "../pages/ingredient/IngredientPage";

export const router = createBrowserRouter([
  {
    path: paths.main,
    element: <App />,
    loader: loaderIngredientsFull,
    children: [
      {
        path: paths.main,
        element: <MainLayout />,
      },
      {
        path: paths.ingredients,

        element: <IngredientPage />,
      },
      {
        path: paths.register,
        element: (
          <ProtectedRouteElement isAuth={false} page={<RegisterPage />} isNotForAuthorized={true} />
        ),
      },
      {
        path: paths.login,
        element: (
          <ProtectedRouteElement isAuth={false} page={<LoginPage />} isNotForAuthorized={true} />
        ),
      },
      {
        path: paths.forgotPassword,
        element: (
          <ProtectedRouteElement
            isAuth={false}
            isNotForAuthorized={true}
            page={<ForgotPasswordPage />}
          />
        ),
      },
      {
        path: paths.resetPassword,
        element: (
          <ProtectedRouteElement
            isAuth={false}
            isNotForAuthorized={true}
            page={<ResetPasswordPage />}
          />
        ),
      },
      {
        path: paths.profile,
        element: (
          <ProtectedRouteElement isAuth={true} page={<ProfilePage />} isNotForAuthorized={false}/>
        ),
        children: [
          {
            path: paths.profile,
            element: <UserContent />,
          },
          {
            path: paths.orderHistory,
            element: <OrderHistory />,
          },
        ],
      },
    ],
  },
]);
